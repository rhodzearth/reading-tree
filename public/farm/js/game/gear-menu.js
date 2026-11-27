// ===================== GEAR MENU (seeds + actions) =====================
function dock(on){$("dock").classList.toggle("open",on);if(on)side(false)}
$("gearBtn").onclick=$("seedChip").onclick=function(e){e.stopPropagation();if(PEND)return;dock(!$("dock").classList.contains("open"))};
$("dock").addEventListener("click",function(e){var b=e.target.closest("button");if(b&&!b.classList.contains("lock")&&!b.classList.contains("stab"))setTimeout(function(){dock(false)},0)});
document.addEventListener("click",function(e){if($("dock").classList.contains("open")&&!e.target.closest("#dock,#gearBtn,#seedChip")){dock(false);e.stopPropagation();e.preventDefault()}},true);
function chip(){var c=S&&cr(sel);$("seedChip").innerHTML=c?iconOf(c):"\uD83C\uDF31"}
function load(){call("farmState",[TOKEN],setState)}
document.addEventListener("visibilitychange",function(){if(document.hidden)kick();else if(TOKEN&&!V)freshLoad_()});
function freshLoad_(){if(!V)flush(load)} // wait for any queued saves, then always fetch the farm so pending reads are applied at once
window.addEventListener("pagehide",kick);window.addEventListener("beforeunload",kick);
