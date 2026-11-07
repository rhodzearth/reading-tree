// Connects the Reading Farm screen to the Supabase "farm" function.
// STEP FOR YOU: replace PASTE_YOUR_ANON_KEY_HERE below with your anon key (the same one in config.js).
var FARM_URL = "https://dvpjcqillzsdkqgvjiyr.supabase.co";
var FARM_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cGpjcWlsbHpzZGtxZ3ZqaXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MjQ4NDgsImV4cCI6MjEwOTUwMDg0OH0.Z7HpXfDN4MxQV0Ef68DSxrWtauII1PxwYvohEqZT06c";

(function () {
  var sb = supabase.createClient(FARM_URL, FARM_KEY);

  // who is logged in? (read from the saved login, so each reader gets their own saved farm copy on this phone)
  window.FARM_TOKEN = "";
  try {
    var ref = FARM_URL.replace("https://", "").split(".")[0];
    var sess = JSON.parse(localStorage.getItem("sb-" + ref + "-auth-token") || "null");
    if (sess && sess.user && sess.user.id) window.FARM_TOKEN = "sb" + sess.user.id;
  } catch (e) {}

  // old page call name -> farm function request (a[0] is the old token and is ignored)
  var MAP = {
    farmState:          function (a) { return { op: "state" }; },
    farmSync:           function (a) { return { op: "sync", ops: a[1] }; },
    farmPlant:          function (a) { return { op: "plant", i: a[1], crop: a[2] }; },
    farmHarvest:        function (a) { return { op: "harvest", i: a[1] }; },
    farmBuyPlot:        function (a) { return { op: "buyplot" }; },
    farmDecor:          function (a) { return { op: "decor", id: a[1], c: a[2], r: a[3], stored: a[4] }; },
    farmPlotMove:       function (a) { return { op: "plotmove", i: a[1], c: a[2], r: a[3], stored: a[4] }; },
    farmRotate:         function (a) { return { op: "rotate", id: a[1], rot: a[2] }; },
    farmSell:           function (a) { return { op: "sell", id: a[1] }; },
    farmFenceSwap:      function (a) { return { op: "fenceswap", style: a[1], ids: a[2] }; },
    farmBuy:            function (a) { return { op: "buy", item: a[1] }; },
    farmBuyAt:          function (a) { return { op: "buyat", cid: a[1], item: a[2], c: a[3], r: a[4] }; },
    farmTreeHarvest:    function (a) { return { op: "treeharvest", id: a[1] }; },
    farmFloor:          function (a) { return { op: "floor", id: a[1], keys: a[2] }; },
    farmPerim:          function (a) { return { op: "perim", id: a[1] }; },
    farmLayoutSave:     function (a) { return { op: "layoutsave", slot: a[1], data: a[2] }; },
    farmLayoutClear:    function (a) { return { op: "layoutclear", slot: a[1] }; },
    farmLayoutApply:    function (a) { return { op: "layoutapply", slot: a[1] }; },
    farmBoost:          function (a) { return { op: "boost", count: a[1] }; },
    farmExpand:         function (a) { return { op: "expand" }; },
    farmBuyLand:        function (a) { return { op: "buyland", cell: a[1] }; },
    farmExpandLand:     function (a) { return { op: "expandland", i: a[1] }; },
    farmAddNeighbor:    function (a) { return { op: "addnb", who: a[1] }; },
    farmRemoveNeighbor: function (a) { return { op: "removenb", nid: a[1] }; },
    farmVisit:          function (a) { return { op: "visit", nid: a[1] }; },
    farmHelp:           function (a) { return { op: "help", nid: a[1], i: a[2] }; }
  };

  window.FARM_CALL = async function (name, args) {
    if (!MAP[name]) throw new Error("Unknown farm action.");
    var s = await sb.auth.getSession();
    if (!s.data.session) throw new Error("Please log in again.");
    var r = await sb.functions.invoke("farm", { body: MAP[name](args || []) });
    if (r.error) {
      var m = r.error.message || "Something went wrong.";
      try { var j = await r.error.context.json(); if (j && j.error) m = j.error; } catch (e) {}
      throw new Error(m);
    }
    return r.data.farm;
  };
})();
