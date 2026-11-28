// ===== JUNGLE SEA: the top-left and top-right sea (the two back sides of the farm) =====
// Uses the picture farm/img/jungle-sea.jpg, stretched so its green diamond sits on your land.
var JUNG_IMG=new Image();JUNG_IMG.src="farm/img/jungle-sea.jpg";
// Corners of the green diamond inside the picture (pixels, the picture is 1376 x 768).
var JIMG={top:[690,165],left:[222,405],right:[1135,390]};
var JUNG_TILE=null;

// Fallback texture (dark jungle green), used beyond the picture's edges and if the picture is not loaded yet
function jungleFill(){
 if(!JUNG_TILE){
  var c=document.createElement("canvas"),x,rn=mk(41),i,px,py,r,S0=240;
  c.width=c.height=S0;x=c.getContext("2d");
  x.fillStyle="#1f5a2a";x.fillRect(0,0,S0,S0);
  for(i=0;i<70;i++){px=rn()*S0;py=rn()*S0;r=14+rn()*16;
   x.fillStyle=rn()<.5?"#2f7a34":"#3f8f3a";x.beginPath();x.arc(px,py,r,0,7);x.fill()}
  JUNG_TILE=X.createPattern(c,"repeat")}
 return JUNG_TILE}

// Draw the picture so its diamond sits exactly on the land (c0..c1, r0..r1 = bounding box of all your land)
function jungleDrawPic(c0,c1,r0,r1){
 var T=Pp(c0,r0),L=Pp(c0,r1),R=Pp(c1,r0),
  ax=JIMG.left[0]-JIMG.top[0],ay=JIMG.left[1]-JIMG.top[1],
  bx=JIMG.right[0]-JIMG.top[0],by=JIMG.right[1]-JIMG.top[1],
  det=ax*by-bx*ay,
  wlx=L[0]-T[0],wly=L[1]-T[1],wrx=R[0]-T[0],wry=R[1]-T[1],
  m11=(wlx*by-wrx*ay)/det,m12=(wrx*ax-wlx*bx)/det,
  m21=(wly*by-wry*ay)/det,m22=(wry*ax-wly*bx)/det,
  tx=JIMG.top[0],ty=JIMG.top[1];
 X.save();
 X.transform(m11,m21,m12,m22,T[0]-(m11*tx+m12*ty),T[1]-(m21*tx+m22*ty));
 X.drawImage(JUNG_IMG,0,0);
 X.restore()}

// Paint the top-left sea (beyond the c = c0 side) and the top-right sea (beyond the r = r0 side)
function jungleOverlay(P){
 var c0=1e9,c1=-1e9,r0=1e9,r1=-1e9,i,q,k,Z=900,pic=JUNG_IMG.complete&&JUNG_IMG.naturalWidth>0,
  regs;
 for(i=0;i<P.length;i++){q=P[i];c0=Math.min(c0,q.c0);c1=Math.max(c1,q.c1);r0=Math.min(r0,q.r0);r1=Math.max(r1,q.r1)}
 regs=[[[c0,-Z],[c0,Z],[-Z,Z],[-Z,-Z]],[[-Z,r0],[Z,r0],[Z,-Z],[-Z,-Z]]];
 for(k=0;k<regs.length;k++){
  X.save();X.beginPath();
  regs[k].forEach(function(p,j){var z=Pp(p[0],p[1]);j?X.lineTo(z[0],z[1]):X.moveTo(z[0],z[1])});
  X.closePath();X.clip();
  X.fillStyle=jungleFill();X.fillRect(VW.x0-400,VW.y0-400,VW.x1-VW.x0+800,VW.y1-VW.y0+800);
  if(pic)jungleDrawPic(c0,c1,r0,r1);
  X.restore()}}