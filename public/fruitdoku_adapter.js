// Fruitdoku adapter: lets the old Apps Script game page talk to Supabase.
// PASTE YOUR ANON KEY on the line below (the same one you used in farm_adapter.js).
var FD_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cGpjcWlsbHpzZGtxZ3ZqaXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MjQ4NDgsImV4cCI6MjEwOTUwMDg0OH0.Z7HpXfDN4MxQV0Ef68DSxrWtauII1PxwYvohEqZT06c";
var FD_URL = "https://dvpjcqillzsdkqgvjiyr.supabase.co";
(function () {
  var sb = null;
  try { sb = window.supabase.createClient(FD_URL, FD_KEY); } catch (e) {}
  // who is logged in? (read from the saved Reading Tree session, so each reader has their own game progress)
  try {
    var raw = window.localStorage.getItem("sb-dvpjcqillzsdkqgvjiyr-auth-token");
    var s = raw ? JSON.parse(raw) : null;
    if (s && s.user && s.user.id) { window.FD_UID = s.user.id; window.FD_TOKEN = "sb"; }
  } catch (e) {}
  function msg(e) { return (e && e.message) ? e.message : String(e); }
  function call(fn, args, ok, bad) {
    if (!sb) { bad({ message: "Game could not connect. Please refresh." }); return; }
    sb.rpc(fn, args || {}).then(function (r) {
      if (r.error) bad({ message: msg(r.error) }); else ok(r.data);
    }, function (e) { bad({ message: msg(e) }); });
  }
  function Runner(ok, bad) { this.ok = ok || function () {}; this.bad = bad || function () {}; }
  Runner.prototype.withSuccessHandler = function (f) { return new Runner(f, this.bad); };
  Runner.prototype.withFailureHandler = function (f) { return new Runner(this.ok, f); };
  Runner.prototype.authEnergy = function () { call("energy_get", {}, this.ok, this.bad); };
  Runner.prototype.authEnergySpend = function (token, force, times) {
    call("energy_spend", { p_force: !!force, p_times: times || 1 }, this.ok, this.bad);
  };
  Runner.prototype.getServerDate = function () { call("fd_today", {}, this.ok, this.bad); };
  Runner.prototype.getAppUrl = function () { this.ok("index.html"); };
  window.google = { script: { run: new Runner() } };
})();
