// tapped tile -> top corner tile, so the tap lands in the MIDDLE of big buildings (1x1 things are unchanged)
function anch(c,r,k){var w=footW(k),h=footH(k);if(OUTI[k]||isF(k)||w*h<2)return[c,r];return[c-((w-1)>>1),r-((h-1)>>1)]}
(function(){
var pad=document.createElement("div"),D=[["\u2196",-1,0],["\u2197",0,-1],["\u2199",0,1],["\u2198",1,0]];
pad.style.cssText="position:fixed;right:10px;z-index:21;display:none;grid-template-columns:repeat(2,48px);gap:6px";
D.forEach(function(d){var b=document.createElement("button");b.className="btn alt";b.textContent=d[0];
 b.style.cssText="width:48px;height:48px;padding:0;font-size:24px;line-height:1;border-radius:14px;background:rgba(20,30,25,.6);color:#fff;border:1px solid rgba(255,255,255,.45);box-shadow:0 2px 8px rgba(0,0,0,.4)";
 b.onclick=function(){nudge(d[1],d[2])};pad.appendChild(b)});
document.body.appendChild(pad);
function nudge(dc,dr){var nc,nr,o,it;
 if(GMOVE){gShift(dc,dr);return}
 if(typeof LGMOVE!=="undefined"&&LGMOVE){lShift(dc,dr);return}
 if(PEND){if(isF(PEND.k))return;nc=PEND.c+dc;nr=PEND.r+dr;
  if(tileFree(nc,nr,null,PEND.k)){PEND.c=nc;PEND.r=nr;HOVT=null;drawAll()}else badTile(nc,nr);return}
 if(!SEL)return;o=getPos(SEL);if(!o)return;
 if(SEL.t==="d"){it=dcById(SEL.id);if(!it||isF(it.k))return}
 nc=o[0]+dc;nr=o[1]+dr;
 if(!tileFree(nc,nr,SEL)){badTile(nc,nr);return}
 setPos(SEL,nc,nr);
 if(SEL.t==="p")send("farmPlotMove",[TOKEN,SEL.i,nc,nr,0]);else send("farmDecor",[TOKEN,SEL.id,nc,nr,0]);
 drawAll()}
function show(){var on=false,it,ly=false;
 if(typeof LGMOVE!=="undefined"&&LGMOVE&&$("lay").style.display!=="none"){on=true;ly=true}
 else if(typeof EDIT!=="undefined"&&EDIT&&!CAM&&!PAINT){
  if(GMOVE)on=true;
  else if(!PLACING){
   if(PEND)on=!isF(PEND.k);
   else if(SEL){if(SEL.t==="p")on=true;else{it=dcById(SEL.id);on=!!it&&!isF(it.k)}}}}
 pad.style.display=on?"grid":"none";
 pad.style.zIndex=ly?"44":"21";
 if(on)pad.style.bottom=((ly?$("lBar").offsetHeight:$("botBar").offsetHeight)+14)+"px"}
setInterval(show,200);
})();
