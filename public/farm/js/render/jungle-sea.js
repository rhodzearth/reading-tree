// ===== PURE-CODE JUNGLE SEA =====
// The top-left and top-right sea is covered by a jungle with a ragged edge.
// Plants hang out over the water, and a soft shadow falls on the sea.
// The jungle is drawn before the land, so the land covers any jungle behind it.
// Called from drawSea() in decorations-art.js as jungleOverlay(G.P).

var JG=null;            // cached plant list and edge lines, rebuilt only when the land layout changes
var JS0=-160,JS1=200;   // how far along the coast the jungle is planned (tile numbers)

// how far the back-left jungle reaches into the sea, for each row (in tiles)
function jgDL(s){return 11+2.6*Math.sin(s*.19)+1.8*Math.sin(s*.53+1.3)+.9*Math.sin(s*1.1+.4)}
// how far the back-right jungle reaches into the sea, for each column (in tiles)
function jgDR(s){return 11+2.6*Math.sin(s*.17+2.1)+1.8*Math.sin(s*.61+.7)+.9*Math.sin(s*1.3+2.2)}

// bounding box of all your land (tile numbers)
function jgLayout(P){
 var L={c0:1e9,c1:-1e9,r0:1e9,r1:-1e9},i;
 for(i=0;i<P.length;i++){L.c0=Math.min(L.c0,P[i].c0);L.c1=Math.max(L.c1,P[i].c1);L.r0=Math.min(L.r0,P[i].r0);L.r1=Math.max(L.r1,P[i].r1)}
 return L}

// build the coast edges and the plant list once per land layout (same random spots every time)
function jgBuild(L){
 var rn=mk(77),list=[],EL=[],ER=[],s,k,dd,base,i,t,
  types=["palm","palm","tree","tree","banana","fern","bush","bush","bamboo","flower","flower","patch","patch","patch","patch"];
 for(s=JS0;s<=JS1;s+=1){EL.push([L.c0-jgDL(s),s]);ER.push([s,L.r0-jgDR(s)])}
 for(i=0;i<700;i++){
  k=rn()<.5?0:1;
  s=JS0+rn()*(JS1-JS0);
  dd=-2.5+28.5*Math.pow(rn(),1.8);        // a few plants reach over the water, most sit further back
  base=k===0?[L.c0-jgDL(s)-dd,s]:[s,L.r0-jgDR(s)-dd];
  t=types[Math.floor(rn()*types.length)];
  list.push({t:t,c:base[0],r:base[1],s:.8+rn()*.6,a:(rn()-.5)*1.2,ph:rn()*6.28,k:Math.floor(rn()*4)})}
 list.sort(function(a,b){return(a.c+a.r)-(b.c+b.r)}); // back to front
 return{list:list,EL:EL,ER:ER}}

// draw a closed polygon given in tile numbers
function jgPathClosed(arr){
 var j,z;X.beginPath();
 for(j=0;j<arr.length;j++){z=Pp(arr[j][0],arr[j][1]);j?X.lineTo(z[0],z[1]):X.moveTo(z[0],z[1])}
 X.closePath()}

// draw an open line given in tile numbers
function jgPathOpen(arr){
 var j,z;X.beginPath();
 for(j=0;j<arr.length;j++){z=Pp(arr[j][0],arr[j][1]);j?X.lineTo(z[0],z[1]):X.moveTo(z[0],z[1])}}

// one leaf (frond): base -> control point -> tip, with a midrib
function jgFrond(x0,y0,cx,cy,ex,ey,w,col){
 var nx=-(ey-y0),ny=ex-x0,d=Math.sqrt(nx*nx+ny*ny)||1;nx/=d;ny/=d;
 X.fillStyle=col;X.beginPath();X.moveTo(x0,y0);
 X.quadraticCurveTo(cx+nx*w,cy+ny*w,ex,ey);
 X.quadraticCurveTo(cx-nx*w*.6,cy-ny*w*.6,x0,y0);X.closePath();X.fill();
 X.strokeStyle="rgba(10,40,15,.45)";X.lineWidth=.8;X.beginPath();X.moveTo(x0,y0);X.quadraticCurveTo(cx,cy,ex,ey);X.stroke()}

function jgPalm(x,y,s,a,ph){
 var h=110*s,lean=Math.sin(ph)*16*s,tx=x+lean,ty=y-h,mx=x+lean*.25,my=y-h*.55,k,ang,L,ex,ey,cx,cy,u,qx,qy;
 X.lineCap="round";
 X.strokeStyle="#3e2a16";X.lineWidth=9*s;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(mx,my,tx,ty);X.stroke();
 X.strokeStyle="#8a6a3c";X.lineWidth=5*s;X.beginPath();X.moveTo(x-1.5*s,y);X.quadraticCurveTo(mx-1.5*s,my,tx-1*s,ty);X.stroke();
 X.strokeStyle="rgba(50,32,14,.6)";X.lineWidth=1*s;X.beginPath();
 for(k=1;k<8;k++){u=k/8;qx=(1-u)*(1-u)*x+2*(1-u)*u*mx+u*u*tx;qy=(1-u)*(1-u)*y+2*(1-u)*u*my+u*u*ty;X.moveTo(qx-3.5*s,qy+s);X.lineTo(qx+3.5*s,qy-s)}
 X.stroke();X.lineCap="butt";
 for(k=0;k<9;k++){
  ang=-Math.PI*.9+k*Math.PI*.23+a*.5;L=(48+(k%3)*9)*s;
  ex=tx+Math.cos(ang)*L;ey=ty+Math.sin(ang)*L*.45+L*.35;
  cx=tx+Math.cos(ang)*L*.5;cy=ty+Math.sin(ang)*L*.35-6*s;
  jgFrond(tx,ty,cx,cy,ex,ey,7*s,k%2?"#2c8a38":"#3fa34a")}
 X.fillStyle="#5a3d1e";X.beginPath();X.arc(tx-3*s,ty+5*s,3.4*s,0,7);X.fill();
 X.beginPath();X.arc(tx+3.5*s,ty+6*s,3.4*s,0,7);X.fill()}

function jgTree(x,y,s,ph){
 var cx=x+Math.sin(ph)*4*s,cy=y-70*s,i,ang,dx,dy,r,vx;
 X.strokeStyle="#4a3420";X.lineWidth=7*s;X.lineCap="round";X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+2*s,y-35*s,cx,cy);X.stroke();X.lineCap="butt";
 X.strokeStyle="#2e5a24";X.lineWidth=1.4*s;
 for(i=0;i<4;i++){vx=cx-22*s+i*15*s;X.beginPath();X.moveTo(vx,cy+10*s);X.quadraticCurveTo(vx+4*s,cy+30*s,vx-2*s,cy+52*s);X.stroke()}
 for(i=0;i<18;i++){
  ang=i*.35+ph;dx=cx+Math.cos(ang)*(20+(i%4)*3)*s;dy=cy+Math.sin(ang)*(13+(i%3)*2)*s*.8;r=(12+(i*5)%7)*s;
  X.fillStyle=i%3===0?"#2a7a34":i%3===1?"#1f6a2c":"#17521f";X.beginPath();X.arc(dx,dy,r,0,7);X.fill()}
 for(i=0;i<9;i++){ang=-2.2+i*.35;dx=cx+Math.cos(ang)*16*s;dy=cy+Math.sin(ang)*10*s-6*s;
  X.fillStyle="rgba(120,200,90,.5)";X.beginPath();X.arc(dx,dy,4*s,0,7);X.fill()}}

function jgBanana(x,y,s,a){
 var k,ang,L,ex,ey,cx,cy;
 for(k=0;k<7;k++){
  ang=-Math.PI*.5+(k-3)*.36+a*.2;L=(40+(k%2)*10)*s;
  ex=x+Math.cos(ang)*L;ey=y-4*s+Math.sin(ang)*L;
  cx=x+Math.cos(ang)*L*.5;cy=y-4*s+Math.sin(ang)*L*.5+10*s;
  jgFrond(x,y-4*s,cx,cy,ex,ey,6*s,k%2?"#3f9a3a":"#55b048")}}

function jgFern(x,y,s,a){
 var k,ang,L,ex,ey,cx,cy;
 for(k=0;k<7;k++){
  ang=-Math.PI*.5+(k-3)*.42+a*.3;L=26*s;
  ex=x+Math.cos(ang)*L;ey=y+Math.sin(ang)*L*.6+4*s;
  cx=x+Math.cos(ang)*L*.5;cy=y+Math.sin(ang)*L*.5-4*s;
  jgFrond(x,y,cx,cy,ex,ey,3.5*s,k%2?"#2f7d3a":"#3f9448")}}

function jgBush(x,y,s,k){
 var i,dx,dy,r;
 for(i=0;i<9;i++){
  dx=x+Math.sin(i*2.1+k)*14*s;dy=y-6*s+Math.cos(i*1.7)*5*s-(i%3)*2*s;r=(8+(i*3)%5)*s;
  X.fillStyle=i%2?"#1f6a2c":"#2e8a3a";X.beginPath();X.arc(dx,dy,r,0,7);X.fill()}
 X.fillStyle="rgba(150,220,110,.35)";X.beginPath();X.arc(x-4*s,y-12*s,4*s,0,7);X.fill()}

function jgBamboo(x,y,s,ph){
 var i,j,bx,h;
 for(i=0;i<5;i++){
  bx=x+(i-2)*6*s+Math.sin(ph+i)*2*s;h=(78+(i%2)*18)*s;
  X.strokeStyle="#5f8f3a";X.lineWidth=3.2*s;X.beginPath();X.moveTo(bx,y);X.lineTo(bx+Math.sin(ph+i)*2*s,y-h);X.stroke();
  X.strokeStyle="rgba(30,60,20,.6)";X.lineWidth=.9*s;X.beginPath();
  for(j=1;j<6;j++){X.moveTo(bx-2*s,y-h*j/6);X.lineTo(bx+2*s,y-h*j/6)}
  X.stroke();
  for(j=0;j<3;j++)jgFrond(bx,y-h,bx+(j-1)*10*s,y-h-8*s,bx+(j-1)*18*s,y-h-14*s+j*3*s,4.5*s,j%2?"#4f9a3a":"#6ab84a")}}

function jgFlower(x,y,s,k){
 var cols=["#e066c8","#9b59d0","#ff5a5a","#ffd23a"],i;
 for(i=0;i<5;i++){X.fillStyle=cols[(k+i)%4];X.beginPath();X.arc(x+Math.sin(i*2.3)*8*s,y+Math.cos(i*1.9)*4*s-3*s,2.4*s,0,7);X.fill()}}

function jgPatch(x,y,s,k){
 X.fillStyle=k%2?"rgba(20,80,28,.55)":"rgba(70,50,28,.35)";
 X.beginPath();X.ellipse(x,y,30*s,13*s,0,0,7);X.fill();
 X.fillStyle="rgba(120,190,90,.25)";X.beginPath();X.ellipse(x-6*s,y-2*s,12*s,4*s,0,0,7);X.fill()}

function jgDraw(it){
 var p=Pp(it.c,it.r),x=p[0],y=p[1],s=it.s;
 switch(it.t){
  case "patch":  jgPatch(x,y,s,it.k);break;
  case "palm":   jgPalm(x,y,s,it.a,it.ph);break;
  case "tree":   jgTree(x,y,s,it.ph);break;
  case "banana": jgBanana(x,y,s,it.a);break;
  case "fern":   jgFern(x,y,s,it.a);break;
  case "bush":   jgBush(x,y,s,it.k);break;
  case "bamboo": jgBamboo(x,y,s,it.ph);break;
  case "flower": jgFlower(x,y,s,it.k);break;
 }}

// Paint the back jungle: first the shadow and ground, then the plants (back to front)
function jungleOverlay(P){
 var L=jgLayout(P),key=L.c0+","+L.c1+","+L.r0+","+L.r1+","+P.length,
  x0=VW.x0-260,x1=VW.x1+260,y0=VW.y0-260,y1=VW.y1+260,i,it,p,lod=LOD>1,k,
  regs,far=-400;
 if(!JG||JG.key!==key){var B=jgBuild(L);JG={key:key,list:B.list,EL:B.EL,ER:B.ER}}
 // each region is the sea beyond a wavy coast line, closed off at the far corners
 regs=[
  JG.EL.concat([[far,JS1],[far,JS0]]),        // back-left jungle: left of the coast line
  JG.ER.concat([[JS1,far],[JS0,far]])         // back-right jungle: above the coast line
 ];
 // 1. soft shadow on the sea just outside the jungle edge
 X.save();X.lineJoin="round";X.lineCap="round";
 X.strokeStyle="rgba(4,30,36,.45)";X.lineWidth=12;
 jgPathOpen(JG.EL);X.stroke();
 jgPathOpen(JG.ER);X.stroke();
 X.restore();
 // 2. jungle ground, clipped to each region so it stops at the wavy edge
 for(k=0;k<2;k++){
  X.save();jgPathClosed(regs[k]);X.clip();
  X.fillStyle="#245c26";X.fillRect(x0,y0,x1-x0,y1-y0);
  X.restore()}
 // 3. plants, not clipped, so they can hang out over the water. Land is drawn later, so it covers them.
 for(i=0;i<JG.list.length;i++){
  it=JG.list[i];
  p=Pp(it.c,it.r);
  if(p[0]<x0||p[0]>x1||p[1]<y0||p[1]>y1)continue;   // skip what is off screen
  if(lod&&it.t!=="patch")continue;                  // zoomed far out: ground only
  jgDraw(it)}}