// ===================== SCENERY: the back two sides of the sea (ocean or jungle) =====================
// Ocean is free. Jungle is bought once (100 white fruits), then you can switch any time.
// You always preview first. Prices must match data/scenery.ts on the server.
var SCENERY=[
 {id:"ocean",name:"Ocean",wf:0,desc:"The default sea."},
 {id:"jungle",name:"Jungle",wf:100,desc:"Jungle along the top-left and top-right sea."}
];
var SCPREV=null; // the scenery being previewed (not bought yet); null = no preview

function sceneryOwned(id){return (S.sco||["ocean"]).indexOf(id)>=0}

// the bar with Cancel / Buy shown during a preview
function sceneryBar(){var b=$("scPrev");
 if(!b){
  b=document.createElement("div");b.id="scPrev";
  b.style.cssText="position:fixed;left:50%;transform:translateX(-50%);z-index:60;display:none;align-items:center;gap:8px;background:rgba(255,255,255,.94);padding:8px 12px;border-radius:14px;box-shadow:0 4px 14px rgba(0,0,0,.25);font-size:14px;white-space:nowrap";
  b.innerHTML="<span id='scPrevTxt'></span><button class='btn alt' id='scPrevNo'>&#10006; Cancel</button><button class='btn ok' id='scPrevYes'>&#10004; Buy</button>";
  document.body.appendChild(b);
  $("scPrevNo").onclick=scenePreviewCancel;
  $("scPrevYes").onclick=scenePreviewBuy}
 b.style.bottom=($("botBar").offsetHeight+14)+"px";
 return b}

function scenePreviewStart(s){
 SCPREV=s.id;
 $("mkt").style.display="none";
 var b=sceneryBar();
 $("scPrevTxt").textContent="Preview: "+s.name+" \u00B7 "+s.wf+" \u26AA";
 b.style.display="flex";
 drawAll()}

function scenePreviewCancel(){
 SCPREV=null;
 $("scPrev").style.display="none";
 drawAll();
 $("mkt").style.display="flex";
 renderMkt()}

function scenePreviewBuy(){
 var s=SCENERY.filter(function(x){return x.id===SCPREV})[0];
 if(!s)return;
 if((S.wf||0)<s.wf){toast(s.name+" costs "+s.wf+" white fruits. You have "+(S.wf||0)+".");return}
 SCPREV=null;
 $("scPrev").style.display="none";
 landCall("farmScenery",s.id,"Buying scenery...",function(){toast("Bought "+s.name+" scenery")})}

// owned scenery (or the free ocean) is applied at once; a new one is previewed first
function useScenery(s){
 if(sceneryOwned(s.id)||s.wf===0){
  landCall("farmScenery",s.id,"Changing scenery...",function(){toast("Scenery: "+s.name)});
  return}
 scenePreviewStart(s)}

function renderScenery(){var box=$("mList"),frag=document.createDocumentFragment();
 $("mtSc").className="btn";
 SCENERY.forEach(function(s){
  var own=sceneryOwned(s.id),on=(S.sc||"ocean")===s.id,
   d=document.createElement("div"),t=document.createElement("b"),sm=document.createElement("div"),b=document.createElement("button");
  d.className="mc";t.textContent=s.name;sm.className="small";
  sm.innerHTML=s.desc+"<br>"+(own?"Owned":s.wf+" white fruits");
  b.className="btn"+(on?" alt":"");
  b.textContent=on?"In use":own?"Use":"Preview & buy";
  b.disabled=on;
  b.onclick=function(){useScenery(s)};
  d.appendChild(t);d.appendChild(sm);d.appendChild(b);frag.appendChild(d)});
 box.appendChild(frag)}

$("mtSc").onclick=function(){MK="scenery";renderMkt()};