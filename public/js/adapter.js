// =============================================================================
// adapter.js - connects your Reading Tree page to Supabase (Phase 6)
// Your page still calls its old function names (authStart, authComplete, ...).
// This file turns each one into the matching Supabase function from Phase 5.
// Needs config.js and the Supabase library to be loaded before it (index.html does that).
// =============================================================================
(function () {
  var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  var MARK = "sb"; // the page keeps a "login token" in the browser; here it is only a marker, Supabase holds the real login

  function emailOf(u) { return String(u).trim().toLowerCase() + "@" + HIDDEN_DOMAIN; }

  function msgOf(e) { // turns technical messages into reader-friendly ones
    var m = (e && e.message) || String(e);
    if (/invalid login credentials/i.test(m)) return "Wrong username or password.";
    if (/already registered|already exists/i.test(m) && /regist|user/i.test(m)) return "Username already exists. Please try creating again with a different username.";
    if (/jwt|auth session missing|invalid.*token|not authenticated/i.test(m)) return "Please log in again.";
    if (/rate limit/i.test(m)) return "Too many tries. Please wait a few minutes and try again.";
    if (/failed to fetch|networkerror|load failed/i.test(m)) return "Connection problem. Please check your internet and try again.";
    return m;
  }

  async function rpc(name, args) {
    var r = await sb.rpc(name, args || {});
    if (r.error) throw r.error;
    return r.data;
  }
  async function stateNow() { return rpc("get_state"); }

  var H = { // old function name -> what it does now (the first argument "t" is the old token, no longer needed)
    authSignup: async function (d) {
      d = d || {};
      var user = String(d.username || "").trim(), pw = String(d.password || "");
      var chk = await rpc("signup_check", { p_username: user, p_country: d.country || "", p_city: d.city || "", p_agree: d.agree === true });
      if (chk) throw new Error(chk);
      if (pw.length < 6 || pw.length > 72) throw new Error("Password must be 6 to 72 characters.");
      var r = await sb.auth.signUp({ email: emailOf(user), password: pw,
        options: { data: { username: user, country: d.country || "", city: d.city || "", area: d.area || "", agree: true } } });
      if (r.error) throw r.error;
      if (!r.data.session) throw new Error('Account created but not logged in. In Supabase turn OFF Authentication > Sign In / Providers > Email > "Confirm email".');
      return { token: MARK, state: await stateNow() };
    },
    authLogin: async function (d) {
      var user = String((d && d.username) || "").trim(), pw = String((d && d.password) || "");
      var e = await sb.rpc("login_email", { p_username: user });
      var r = await sb.auth.signInWithPassword({ email: e.data || ("nobody-" + Date.now() + "@" + HIDDEN_DOMAIN), password: pw });
      if (r.error) throw r.error;
      await sb.rpc("touch_login");
      return { token: MARK, state: await stateNow() };
    },
    authState: async function () {
      var s = await sb.auth.getSession();
      if (!s.data.session) throw new Error("Please log in again.");
      return stateNow();
    },
    authSave: async function (t, s) { await rpc("set_night", { p_night: !!(s && s.night) }); return true; },
    authSetLanguage: function (t, l) { return rpc("set_language", { p_lang: l }); },
    authChangePassword: async function (t, oldPw, newPw) {
      oldPw = String(oldPw || ""); newPw = String(newPw || "");
      if (newPw.length < 6 || newPw.length > 72) throw new Error("The new password must be 6 to 72 characters.");
      if (newPw === oldPw) throw new Error("Please choose a password that is different from the current one.");
      var st = await stateNow(), em = await sb.rpc("login_email", { p_username: st.username });
      var chk = await sb.auth.signInWithPassword({ email: em.data, password: oldPw }); // proves they know the current password
      if (chk.error) throw new Error("Your current password is not correct.");
      var up = await sb.auth.updateUser({ password: newPw });
      if (up.error) throw up.error;
      await rpc("password_changed");
      return { token: MARK };
    },
    authNameInfo: function () { return rpc("auth_name_info"); },
    authChangeUsername: function (t, name) { return rpc("auth_change_username", { p_name: name }); },

    authChapter: async function (t, i, lang) { // the book text is a plain file on the website, not in the database
      var l = lang === "tgl" ? "tgl" : "eng", n = Math.max(0, Math.min(238, parseInt(i, 10) || 0));
      var r = await fetch("book/" + l + "/" + n + ".json");
      if (!r.ok) throw new Error("Could not load this chapter. Are the book files in the public/book folder?");
      return (await r.json()).map(function (x) { return { t: x, y: "verse" }; });
    },
    authStart: function (t, i) { return rpc("auth_start", { p_i: i }); },
    authCheckpoint: function (t, i, v, p, a) { return rpc("auth_checkpoint", { p_i: i, p_v: v, p_p: p, p_a: a }); },
    authComplete: function (t, i, proof) { return rpc("auth_complete", { p_i: i, p_proof: proof || {} }); },
    authHarvest: function () { return rpc("auth_harvest"); },

    authNotes: function (t, ch, lang) { return rpc("auth_notes", { p_ch: ch, p_lang: lang || "eng" }); },
    authSaveNote: function (t, ch, verse, color, note, ranges, lang) {
      var r = typeof ranges === "string" ? JSON.parse(ranges || "[]") : (ranges || []);
      return rpc("auth_save_note", { p_ch: ch, p_verse: verse, p_color: color || "", p_note: note || "", p_ranges: r, p_lang: lang || "eng" });
    },
    authBuyItem: function (t, id) { return rpc("auth_buy_item", { p_id: id }); },
    authLookup: function (t, to) { return rpc("auth_lookup", { p_to: to }); },
    authGift: function (t, to, n) { return rpc("auth_gift", { p_to: to, p_amount: n }); },

    getCountries: function () { return rpc("get_countries"); },
    getCities: function (c) { return rpc("get_cities", { p_country: c }); },
    getAppUrl: async function () { return location.href.split("?")[0].split("#")[0]; }
  };

  // the page calls this instead of google.script.run
  window.SB_CALL = function (name, args, ok, bad) {
    var h = H[name];
    if (!h) { bad("Unknown action: " + name); return; }
    Promise.resolve().then(function () { return h.apply(null, args || []); })
      .then(function (r) { ok(r); }, function (e) { bad(msgOf(e)); });
  };
  window.sbSignOut = function () { return sb.auth.signOut(); };
})();
