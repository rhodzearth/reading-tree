// =============================================================================
// patch_index.js - turns your old Apps Script Index.html into a Supabase-ready index.html
// Run it from the reading-tree folder (it needs Node.js, which you already installed):
//     node patch_index.js Index.html public/index.html
// It never changes your original file. It prints one line per change: OK or MISSING.
// =============================================================================
const fs = require("fs");

const src = process.argv[2] || "Index.html";
const out = process.argv[3] || "public/index.html";
if (!fs.existsSync(src)) { console.error("Cannot find " + src + ". Put your original Index.html next to this script."); process.exit(1); }

let html = fs.readFileSync(src, "utf8");
let missing = 0;

function patch(name, regex, replacement, expected) {
  const found = (html.match(new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g")) || []).length;
  if (found === 0) { console.log("MISSING  " + name); missing++; return; }
  html = html.replace(regex, replacement);
  console.log("OK       " + name + (expected && found !== expected ? "  (found " + found + ", expected " + expected + ")" : ""));
}

// 1. load config, the Supabase library and the adapter before the page's own scripts
patch("load Supabase + adapter",
  /<\/head>/i,
  '<script src="js/config.js"></script>\n' +
  '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n' +
  '<script src="js/adapter.js"></script>\n</head>', 1);

// 2. the Apps Script frame setting is not needed on a normal website
patch("remove <base target>", /<base target="_top">\s*/i, "", 1);

// 3. "are we inside Apps Script?" is now always yes, so real chapters load instead of sample text
patch("real mode on (hasGas)", /function hasGas\(\)\s*\{[^}]*\}/, "function hasGas() { return true; }", 1);

// 4. the page's call() now goes through the Supabase adapter
patch("call() uses Supabase",
  /function call\(name, args, ok, bad\)\s*\{[\s\S]*?r\[name\]\.apply\(r, args\);\s*\}/,
  "function call(name, args, ok, bad) { SB_CALL(name, args, ok, bad); }", 1);

// 5. log out also signs out of Supabase
patch("logout signs out", /function logout\(\)\s*\{/, "function logout() { try { if (window.sbSignOut) sbSignOut(); } catch (e) {}", 1);

// 6. games are not moved yet: show "coming soon" instead of opening a missing page
patch("game buttons: coming soon",
  /setTimeout\(function \(\) \{ window\.open\(appUrl \+ "\?page=\w+", "_top"\); \}, \d+\);/g,
  'setTimeout(function () { $("goLoading").style.display = "none"; toast("This game is coming soon."); }, 400);', 4);

// 7. forgot-password note on the login screen
patch("forgot-password note",
  /(<p class="small" style="margin-top:10px"><a href="#" id="aboutLink">About &amp; privacy<\/a><\/p>)/,
  '$1\n<p class="small" id="forgotNote">Forgot your password? Please contact the site owner and you will get a temporary one.</p>', 1);

// 8. the privacy text no longer mentions Google Sheets
patch("privacy text", /in the project's Google Sheet/g, "in the project's database", 1);

fs.mkdirSync(require("path").dirname(out), { recursive: true });
fs.writeFileSync(out, html, "utf8");
console.log("\nWrote " + out + (missing ? "  (" + missing + " change(s) MISSING - tell Claude which ones)" : "  - all changes applied."));
process.exit(missing ? 2 : 0);
