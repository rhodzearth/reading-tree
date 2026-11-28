// ===================== SCENERY: the top-left and top-right sea (ocean or jungle) =====================
// Ocean is free and always yours. Jungle is bought once (100 white fruits), then you can switch any time.
// Prices must match data/scenery.ts on the server.
var SCENERY=[
 {id:"ocean",name:"Ocean",wf:0,desc:"The default sea."},
 {id:"jungle",name:"Jungle",wf:100,desc:"Jungle plants in the top corners."}
];
function sceneryOwned(id){return (S.sco||["ocean"]).indexOf(id)>=0}
function useScenery(s){
 if(!sceneryOwned(s.id)&&(S.wf||0)<s.wf){toast(s.name+" costs "+s.wf+" white fruits. You have "+(S.wf||0)+".");return}
 landCall("farmScenery",s.id,"Changing scenery...",function(){toast(sceneryOwned(s.id)?"Scenery: "+s.name:"Bought "+s.name+" scenery")})}
function renderScenery(){var box=$("mList"),frag=document.createDocumentFragment();
 $("mtSc").className="btn";
 SCENERY.forEach(function(s){var own=sceneryOwned(s.id),on=(S.sc||"ocean")===s.id,d=document.createElement("div"),t=document.createElement("b"),sm=document.createElement("div"),b=document.createElement("button");
  d.className="mc";t.textContent=s.name;sm.className="small";
  sm.innerHTML=s.desc+"<br>"+(own?"Owned":s.wf+" white fruits");
  b.className="btn"+(on?" alt":"");
  b.textContent=on?"In use":own?"Use":"Buy "+s.wf+" \u26AA";
  b.disabled=on;
  b.onclick=function(){useScenery(s)};
  d.appendChild(t);d.appendChild(sm);d.appendChild(b);frag.appendChild(d)});
 box.appendChild(frag)}
$("mtSc").onclick=function(){MK="scenery";renderMkt()};