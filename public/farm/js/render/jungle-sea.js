// ===== JUNGLE SEA: the sea corners when the farm's scenery is "jungle" =====
// Used by drawSea() in decorations-art.js. The texture is built once and reused.
var JUNG_TILE=null;
function jungleFill(){
 if(!JUNG_TILE){
  var c=document.createElement("canvas"),x,rn=mk(41),i,px,py,r,S0=240;
  c.width=c.height=S0;x=c.getContext("2d");
  x.fillStyle="#1f5a2a";x.fillRect(0,0,S0,S0);
  for(i=0;i<70;i++){px=rn()*S0;py=rn()*S0;r=14+rn()*16;
   x.fillStyle=rn()<.5?"#2f7a34":"#3f8f3a";x.beginPath();x.arc(px,py,r,0,7);x.fill();
   x.fillStyle="rgba(255,255,255,.08)";x.beginPath();x.arc(px-r*.3,py-r*.3,r*.5,0,7);x.fill()}
  for(i=0;i<60;i++){px=rn()*S0;py=rn()*S0;x.fillStyle=rn()<.5?"#2a6e2e":"#5aa84a";
   x.beginPath();x.ellipse(px,py,9,3.5,rn()*6.28,0,7);x.fill()}
  JUNG_TILE=X.createPattern(c,"repeat")}
 return JUNG_TILE}