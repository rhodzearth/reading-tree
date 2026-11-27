// ===================== ISOMETRIC RENDERER =====================
var X,G,NIGHT=false;
function mk(s){return function(){s=(s*16807)%2147483647;return s/2147483647}}
var GPREV=null;
function gridPath(a){var i,x,y,hw=G.TW/2,hh=G.TH/2;X.beginPath();for(i=0;i<a.length;i+=2){x=G.ox+(a[i]-a[i+1])*hw;y=G.oy+(a[i]+a[i+1])*hh;X.moveTo(x,y);X.lineTo(x+hw,y+hh);X.lineTo(x,y+2*hh);X.lineTo(x-hw,y+hh);X.closePath()}}
function Pp(c,r,z){return[G.ox+(c-r)*G.TW/2,G.oy+(c+r)*G.TH/2-(z||0)]}
function poly(a,f,s,lw){X.beginPath();for(var i=0;i<a.length;i++)i?X.lineTo(a[i][0],a[i][1]):X.moveTo(a[i][0],a[i][1]);X.closePath();if(f){X.fillStyle=f;X.fill()}if(s){X.strokeStyle=s;X.lineWidth=lw||1;X.stroke()}}
function lg(x0,y0,x1,y1,st){var g=X.createLinearGradient(x0,y0,x1,y1);st.forEach(function(q){g.addColorStop(q[0],q[1])});return g}
function shade(p,rx,ry,al){X.fillStyle="rgba(10,20,5,"+(al||.28)+")";X.beginPath();X.ellipse(p[0]+rx*.35,p[1],rx,ry||rx*.4,0,0,7);X.fill()}
function blob(x,y,r,c){var g=X.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,c[0]);g.addColorStop(1,c[1]);X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,7);X.fill()}
function dot(x,y,r,c){X.fillStyle=c;X.beginPath();X.arc(x,y,r,0,7);X.fill()}
function leaf(x,y,rx,ry,rot,c){X.save();X.translate(x,y);X.rotate(rot);X.fillStyle=c;X.beginPath();X.ellipse(0,0,rx,ry,0,0,7);X.fill();X.restore()}

function tree(p,s,pal){var x=p[0],y=p[1],rn=mk(21),i,o,a,r,B=[[-.62,-1.05,.52,0],[.62,-1.0,.5,0],[0,-1.3,.6,0],[-.3,-1.7,.48,1],[.38,-1.55,.44,1],[0,-1.95,.38,1]];
 shade(p,s*1.05,s*.38,.32);
 X.fillStyle=lg(x-s*.28,0,x+s*.28,0,[[0,"#3b2512"],[.45,"#80562f"],[1,"#472d16"]]);
 X.beginPath();X.moveTo(x-s*.28,y+1);X.quadraticCurveTo(x-s*.1,y-s*.2,x-s*.1,y-s*.85);X.lineTo(x+s*.1,y-s*.85);X.quadraticCurveTo(x+s*.1,y-s*.2,x+s*.28,y+1);X.closePath();X.fill();
 X.strokeStyle="rgba(30,15,5,.35)";X.lineWidth=1;for(i=0;i<4;i++){X.beginPath();X.moveTo(x-s*.06+i*s*.04,y-2);X.lineTo(x-s*.05+i*s*.03,y-s*.8);X.stroke()}
 X.strokeStyle="#5a3b20";X.lineCap="round";X.lineWidth=s*.09;[[-.5,-1.15],[.5,-1.1],[0,-1.4]].forEach(function(o2){X.beginPath();X.moveTo(x,y-s*.8);X.lineTo(x+o2[0]*s,y+o2[1]*s);X.stroke()});X.lineCap="butt";
 B.forEach(function(o3){blob(x+o3[0]*s,y+o3[1]*s,o3[2]*s,o3[3]?(pal?pal[0]:["#8bd05a","#3f8a2c"]):(pal?pal[1]:["#4f9f33","#1d5a1c"]))});
 for(i=0;i<60;i++){o=B[Math.floor(rn()*B.length)];a=rn()*6.283;r=rn()*o[2]*.85;dot(x+(o[0]+Math.cos(a)*r)*s,y+(o[1]+Math.sin(a)*r*.9)*s,s*(.05+rn()*.04),rn()<.5?"rgba(200,245,120,.55)":"rgba(10,60,10,.35)")}}
function bush(p,s){var rn=mk(9),i;shade(p,s*1.1,s*.38,.28);
 [[-.62,-.38,.58],[.62,-.38,.55],[0,-.72,.66],[-.25,-.25,.5],[.3,-.2,.48]].forEach(function(o){blob(p[0]+o[0]*s,p[1]+o[1]*s,s*o[2],["#74c446","#2a6c22"])});
 for(i=0;i<22;i++)dot(p[0]+(rn()-.5)*s*1.8,p[1]-s*(.2+rn()*.75),s*.07,rn()<.5?"rgba(190,240,110,.6)":"rgba(10,60,10,.35)");
 for(i=0;i<6;i++)dot(p[0]+(rn()-.5)*s*1.5,p[1]-s*(.25+rn()*.55),s*.1,"#e0405a")}
var VW={x0:0,x1:0,y0:0,y1:0},VT={c0:0,c1:0,r0:0,r1:0},LOD=1;
function fence(a,b,n,front){var dx=b[0]-a[0],dy=b[1]-a[1],kA=(VW.x0-a[0])*n/dx,kB=(VW.x1-a[0])*n/dx,k0=Math.max(0,Math.floor(Math.min(kA,kB))-1),k1=Math.min(n,Math.ceil(Math.max(kA,kB))+1),k,px,py,H,e;
 if(k1<k0)return;var A=[a[0]+dx*k0/n,a[1]+dy*k0/n],B=[a[0]+dx*k1/n,a[1]+dy*k1/n];
 X.strokeStyle="rgba(10,25,5,.25)";X.lineWidth=6;X.lineCap="round";X.beginPath();X.moveTo(A[0]+4,A[1]+3);X.lineTo(B[0]+4,B[1]+3);X.stroke();X.lineCap="butt";
 function rails(){[6,13,20].forEach(function(z){poly([[A[0],A[1]-z-1.8],[B[0],B[1]-z-1.8],[B[0],B[1]-z+1.8],[A[0],A[1]-z+1.8]],"#a07440");
   X.strokeStyle="#d2ab6c";X.lineWidth=1;X.beginPath();X.moveTo(A[0],A[1]-z-1.8);X.lineTo(B[0],B[1]-z-1.8);X.stroke();
   X.strokeStyle="#55381b";X.lineWidth=1.3;X.beginPath();X.moveTo(A[0],A[1]-z+1.8);X.lineTo(B[0],B[1]-z+1.8);X.stroke();
   if(LOD===1)for(k=k0;k<=k1;k++)dot(a[0]+dx*k/n,a[1]+dy*k/n-z,.9,"#2e2012")})}
 function posts(){for(k=k0;k<=k1;k++){px=a[0]+dx*k/n;py=a[1]+dy*k/n;if(py<VW.y0-40||py>VW.y1+40)continue;e=(k===0||k===n);H=e?30:25;
   X.fillStyle="rgba(10,25,5,.3)";X.beginPath();X.ellipse(px+2,py+1,4,1.8,0,0,7);X.fill();
   X.fillStyle="#8c6334";X.fillRect(px-3,py-H,3,H+1);X.fillStyle="#5f4122";X.fillRect(px,py-H,3,H+1);
   poly([[px-3,py-H],[px,py-H-1.7],[px+3,py-H],[px,py-H+1.7]],"#d6b070","#7a5630",.8)}}
 if(front){rails();posts()}else{posts();rails()}}
function barn(c0,r0,c1,r1){var h=38,rh=24,fz=5,rm=(r0+r1)/2,hw=(r1-r0)/2,i,c,r,
 e=Pp(c0,r1,fz),d=Pp(c1,r1,fz),b=Pp(c1,r0,fz),eh=Pp(c0,r1,h),dh=Pp(c1,r1,h),bh=Pp(c1,r0,h),g1=Pp(c1,rm,h+rh),
 E=Pp(c0-.07,r1+.08,h-2),D=Pp(c1+.07,r1+.08,h-2),B2=Pp(c1+.07,r0-.08,h-2),G0=Pp(c0-.07,rm,h+rh+1),G1=Pp(c1+.07,rm,h+rh+1);
 function ln(p,q,col,lw){X.strokeStyle=col;X.lineWidth=lw;X.beginPath();X.moveTo(p[0],p[1]);X.lineTo(q[0],q[1]);X.stroke()}
 function lp(p,q,t){return[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]}
 shade(Pp((c0+c1)/2+.1,(r0+r1)/2+.2),72,24,.32);
 poly([Pp(c0,r1,0),Pp(c1,r1,0),d,e],"#7a766c");poly([Pp(c1,r1,0),Pp(c1,r0,0),b,d],"#9a968a");
 ln(Pp(c0,r1,2.5),Pp(c1,r1,2.5),"rgba(0,0,0,.25)",1);ln(Pp(c1,r1,2.5),Pp(c1,r0,2.5),"rgba(0,0,0,.2)",1);
 poly([e,d,dh,eh],lg(e[0],0,d[0],0,[[0,"#74201a"],[1,"#952b24"]]));
 for(i=1;i<10;i++){c=c0+(c1-c0)*i/10;ln(Pp(c,r1,fz),Pp(c,r1,h),"rgba(0,0,0,.22)",1)}
 poly([eh,dh,[dh[0],dh[1]+6],[eh[0],eh[1]+6]],"rgba(0,0,0,.25)");
 [.27,.74].forEach(function(t){var cc=c0+(c1-c0)*t,w=.07;
  poly([Pp(cc-w,r1,17),Pp(cc+w,r1,17),Pp(cc+w,r1,29),Pp(cc-w,r1,29)],"#24384a","#f2eee2",1.6);
  ln(Pp(cc,r1,17),Pp(cc,r1,29),"#f2eee2",1);ln(Pp(cc-w,r1,23),Pp(cc+w,r1,23),"#f2eee2",1)});
 poly([d,b,bh,g1,dh],lg(d[0],0,b[0],0,[[0,"#c9413a"],[1,"#ab342a"]]));
 for(i=1;i<8;i++){r=r1-(r1-r0)*i/8;ln(Pp(c1,r,fz),Pp(c1,r,h+rh*(1-Math.abs(r-rm)/hw)),"rgba(0,0,0,.2)",1)}
 ln(e,eh,"#f2eee2",2.2);ln(d,dh,"#f2eee2",2.2);ln(b,bh,"#f2eee2",2.2);
 poly([Pp(c1,rm+.2,fz),Pp(c1,rm-.2,fz),Pp(c1,rm-.2,28),Pp(c1,rm+.2,28)],"#6e1d16","#f2eee2",2);
 ln(Pp(c1,rm,fz),Pp(c1,rm,28),"#f2eee2",1.4);
 [[rm+.2,rm],[rm,rm-.2]].forEach(function(o){ln(Pp(c1,o[0],fz),Pp(c1,o[1],28),"#f2eee2",1.3);ln(Pp(c1,o[1],fz),Pp(c1,o[0],28),"#f2eee2",1.3)});
 var hp=Pp(c1,rm+.05,16),hq=Pp(c1,rm-.05,16);dot(hp[0],hp[1],1.2,"#e0cb82");dot(hq[0],hq[1],1.2,"#e0cb82");
 poly([Pp(c1,rm+.1,36),Pp(c1,rm-.1,36),Pp(c1,rm-.1,48),Pp(c1,rm+.1,48)],"#2a100c","#f2eee2",1.6);
 poly([Pp(c1,rm+.1,36),Pp(c1,rm-.1,36),Pp(c1,rm-.1,40),Pp(c1,rm+.1,40)],"#d9b55a");
 ln(Pp(c1,rm,53),Pp(c1+.17,rm,53),"#d8c8a0",2.4);ln(Pp(c1+.17,rm,53),Pp(c1+.17,rm,48),"#444",1);
 poly([E,D,[D[0],D[1]+3],[E[0],E[1]+3]],"#34383e");
 poly([E,D,G1,G0],lg(0,Math.min(G0[1],G1[1]),0,Math.max(E[1],D[1]),[[0,"#929aa4"],[1,"#59616b"]]),"#33373d",1);
 for(i=1;i<7;i++)ln(lp(E,G0,i/7),lp(D,G1,i/7),"rgba(0,0,0,.22)",1);
 ln(G0,G1,"#2b2f34",2.6);ln(D,G1,"#f2eee2",3);ln(G1,B2,"#f2eee2",3)}
function silo(p){var x=p[0],y=p[1],w=13,h=72,k,j,ang,yy;shade(p,24,9,.32);
 X.fillStyle=lg(x-w-2,0,x+w+2,0,[[0,"#85857f"],[.5,"#cbcbc4"],[1,"#66665f"]]);X.fillRect(x-w-2,y-6,w*2+4,6);X.beginPath();X.ellipse(x,y,w+2,5.5,0,0,7);X.fill();
 X.fillStyle=lg(x-w,0,x+w,0,[[0,"#7f8890"],[.22,"#cfd6db"],[.42,"#f4f7f9"],[.75,"#a3acb3"],[1,"#68717a"]]);X.fillRect(x-w,y-h,w*2,h-6);X.beginPath();X.ellipse(x,y-6,w,5,0,0,7);X.fill();
 for(k=1;k<6;k++){yy=y-6-k*(h-6)/6;X.strokeStyle="rgba(35,45,55,.4)";X.lineWidth=1.4;X.beginPath();X.ellipse(x,yy,w,4.6,0,0,Math.PI);X.stroke();X.strokeStyle="rgba(255,255,255,.4)";X.lineWidth=1;X.beginPath();X.ellipse(x,yy+1.6,w,4.6,0,0,Math.PI);X.stroke();
  for(j=0;j<7;j++){ang=.25+j*.44;dot(x+Math.cos(ang)*(w-1.5),yy+Math.sin(ang)*4.2+.3,.6,"rgba(35,45,55,.55)")}}
 X.strokeStyle="#434a52";X.lineWidth=1.3;X.beginPath();X.moveTo(x+3,y-8);X.lineTo(x+3,y-h+4);X.moveTo(x+9,y-8);X.lineTo(x+9,y-h+4);X.stroke();
 X.lineWidth=1;for(k=0;k<13;k++){X.beginPath();X.moveTo(x+3,y-12-k*4.8);X.lineTo(x+9,y-12-k*4.8);X.stroke()}
 X.fillStyle=lg(x-w,0,x+w,0,[[0,"#8f332c"],[.35,"#e8776a"],[.6,"#c9493e"],[1,"#7a2a24"]]);
 X.beginPath();X.ellipse(x,y-h,w+1.5,5.5,0,0,7);X.fill();X.beginPath();X.moveTo(x-w-1,y-h);X.quadraticCurveTo(x,y-h-30,x+w+1,y-h);X.fill();
 X.fillStyle="#6b737a";X.fillRect(x-2.5,y-h-18,5,4);X.beginPath();X.ellipse(x,y-h-18,2.5,1.2,0,0,7);X.fill();
 leaf(x-5,y-h-7,2.2,5.5,.5,"rgba(255,255,255,.3)")}
function pond(p){var x=p[0],y=p[1],k,a,rn=mk(3),R=[];
 X.fillStyle="#6e5b30";X.beginPath();X.ellipse(x,y+3,37,17.5,0,0,7);X.fill();
 for(k=0;k<20;k++){a=k/20*6.283;R.push([x+Math.cos(a)*34,y+2+Math.sin(a)*15.5,3+rn()*2.4,Math.sin(a)])}
 R.forEach(function(o){if(o[3]<0)blob(o[0],o[1]-1,o[2],["#cfcbbf","#7c786c"])});
 X.fillStyle=lg(0,y-14,0,y+14,[[0,"#8fd6f0"],[.55,"#3a8fbd"],[1,"#1f6a96"]]);X.beginPath();X.ellipse(x,y,31,13.5,0,0,7);X.fill();
 X.fillStyle="rgba(255,255,255,.22)";X.beginPath();X.ellipse(x-10,y-5,11,2.6,-.1,0,7);X.fill();
 X.strokeStyle="rgba(255,255,255,.55)";X.lineWidth=1.1;[[-8,0,9],[7,4,7],[12,-4,5]].forEach(function(o){X.beginPath();X.ellipse(x+o[0],y+o[1],o[2],o[2]*.35,0,0,Math.PI*1.3);X.stroke()});
 leaf(x+14,y+3,5,2.6,0,"#3f9a2c");leaf(x+13.5,y+2.6,2.4,1.2,0,"#5fba3a");dot(x+15,y+1.6,1.7,"#ff9ac0");dot(x+15,y+1.6,.6,"#ffe14d");leaf(x-16,y-1,4,2.2,.1,"#3f9a2c");
 X.lineCap="round";for(k=0;k<5;k++){X.strokeStyle="#5a8a2a";X.lineWidth=1.3;X.beginPath();X.moveTo(x-29+k*2.4,y-4);X.lineTo(x-32+k*2.8,y-18-(k%3)*3);X.stroke();if(k%2===0)leaf(x-32+k*2.8,y-19-(k%3)*3,1.3,3.2,0,"#6b4423")}X.lineCap="butt";
 R.forEach(function(o){if(o[3]>=0)blob(o[0],o[1]-1,o[2],["#d8d4c8","#827e72"])})}
function bale(p){var x=p[0],y=p[1]-9,k;shade(p,15,6,.3);
 X.fillStyle=lg(0,y-9,0,y+9,[[0,"#f6df94"],[.5,"#dcb862"],[1,"#a67c2c"]]);X.fillRect(x-8,y-9,16,18);
 X.fillStyle="#c79a3e";X.beginPath();X.ellipse(x+8,y,4,9,0,-Math.PI/2,Math.PI/2);X.fill();
 X.strokeStyle="rgba(120,80,20,.35)";X.lineWidth=1;for(k=-6;k<=6;k+=3){X.beginPath();X.moveTo(x-8,y+k);X.lineTo(x+8,y+k);X.stroke()}
 X.fillStyle="#f0d27a";X.beginPath();X.ellipse(x-8,y,4,9,0,0,7);X.fill();X.strokeStyle="#a8802e";X.lineWidth=.9;X.stroke();
 for(k=1;k<4;k++){X.beginPath();X.ellipse(x-8,y,k,k*2.2,0,0,7);X.stroke()}
 [-2,4].forEach(function(o){X.strokeStyle="#6b4d18";X.lineWidth=1.2;X.beginPath();X.moveTo(x+o,y-9);X.quadraticCurveTo(x+o+1.5,y,x+o,y+9);X.stroke()})}
function tractor(p,s){var x=p[0],y=p[1],i;function q(a,b){return[x+a*s,y+b*s]}shade(p,30*s,10*s,.32);
 function wheel(a,b,r){var c=q(a,b),an;dot(c[0],c[1],r*s,"#131313");X.strokeStyle="#2e2e2e";X.lineWidth=1.5;
  for(i=0;i<16;i++){an=i/16*6.283;X.beginPath();X.moveTo(c[0]+Math.cos(an)*r*s*.78,c[1]+Math.sin(an)*r*s*.78);X.lineTo(c[0]+Math.cos(an)*r*s,c[1]+Math.sin(an)*r*s);X.stroke()}
  dot(c[0],c[1],r*s*.6,"#e6b422");dot(c[0],c[1],r*s*.48,"#c99a14");dot(c[0],c[1],r*s*.18,"#8c8c8c");dot(c[0]-r*s*.28,c[1]-r*s*.3,r*s*.1,"rgba(255,255,255,.6)")}
 X.fillStyle="#4a4a4a";X.fillRect(x-19*s,y-42*s,3*s,16*s);X.fillStyle="#222";X.fillRect(x-20*s,y-43*s,5*s,2*s);
 poly([q(-29,-10),q(-29,-26),q(2,-27),q(2,-10)],lg(0,y-27*s,0,y-10*s,[[0,"#5ac458"],[.55,"#32902f"],[1,"#1f6a22"]]),"#154a17",1);
 X.strokeStyle="rgba(0,0,0,.35)";X.lineWidth=1;for(i=0;i<4;i++){X.beginPath();X.moveTo(x-27*s,y-(13+i*3)*s);X.lineTo(x-20*s,y-(13+i*3)*s);X.stroke()}
 X.strokeStyle="rgba(255,255,255,.35)";X.lineWidth=1.2;X.beginPath();X.moveTo(x-26*s,y-25*s);X.lineTo(x-2*s,y-25.5*s);X.stroke();
 var hl=q(-28,-20);dot(hl[0],hl[1],2.4*s,"#fff4b0");dot(hl[0],hl[1],1.2*s,"#ffd83a");
 poly([q(2,-14),q(2,-46),q(25,-46),q(25,-14)],lg(0,y-46*s,0,y-14*s,[[0,"#5ac458"],[1,"#2a7a2c"]]),"#1d5a20",1);
 poly([q(5,-43),q(22,-43),q(22,-22),q(5,-22)],lg(0,y-43*s,0,y-22*s,[[0,"#e0f4fc"],[1,"#7fb7d0"]]),"#143a20",1);
 var g1=q(8,-41),g2=q(13,-27);X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1.4;X.beginPath();X.moveTo(g1[0],g1[1]);X.lineTo(g2[0],g2[1]);X.stroke();
 X.fillStyle="#262626";X.fillRect(x-1*s,y-50*s,28*s,4*s);
 wheel(-19,-7,7.5);wheel(13,-11,12)}
function fruit(k,x,y,r,ripe){if(fruit2(k,x,y,r,ripe))return;
 function ov(c1,c2,rx,ry,rot){X.fillStyle=c1;X.beginPath();X.ellipse(x,y,rx,ry,rot||0,0,7);X.fill();X.fillStyle=c2;X.beginPath();X.ellipse(x-rx*.15,y-ry*.18,rx*.72,ry*.72,rot||0,0,7);X.fill()}
 function stem(h){X.strokeStyle="#5a3b20";X.lineWidth=1;X.beginPath();X.moveTo(x,y-r*.8);X.lineTo(x+r*.12,y-r*.8-h);X.stroke()}
 function hi(){leaf(x-r*.42,y-r*.42,r*.17,r*.3,.6,"rgba(255,255,255,.6)")}
 if(!ripe&&k!=="cherry"){ov("#6fa63a","#a6d36a",r,r);leaf(x+r*.4,y-r*.9,r*.5,r*.22,-.3,"#3a8a2c");return}
 if(k==="apple"){ov("#b8141c","#ee3c36",r,r);hi();stem(r*.6);leaf(x+r*.55,y-r*1.2,r*.55,r*.25,-.4,"#3a9a2e");return}
 if(k==="orange"){ov("#d9660a","#f59a1e",r,r*.96);[[-.4,-.1],[.3,-.35],[.25,.35],[-.2,.45],[.5,.05]].forEach(function(o){dot(x+o[0]*r,y+o[1]*r,r*.07,"rgba(140,55,0,.4)")});hi();leaf(x+r*.15,y-r*.95,r*.5,r*.22,-.3,"#3a9a2e");dot(x,y-r*.88,r*.12,"#5a7a2a");return}
 if(k==="lemon"){ov("#d6b90c","#f7e43a",r*1.2,r*.85);leaf(x+r*1.22,y,r*.3,r*.2,0,"#e8cf18");leaf(x-r*1.2,y,r*.25,r*.17,0,"#e8cf18");hi();leaf(x+r*.1,y-r*.8,r*.5,r*.22,-.3,"#3a9a2e");return}
 if(k==="cherry"){var c1=ripe?"#7d0c20":"#78ad3e",c2=ripe?"#d8304c":"#b3d977";X.strokeStyle="#6b8f32";X.lineWidth=1;
  [-.95,.95].forEach(function(o){X.beginPath();X.moveTo(x,y-r*2.1);X.quadraticCurveTo(x+o*.4*r,y-r,x+o*r,y-r*.1);X.stroke()});
  [-.95,.95].forEach(function(o){dot(x+o*r,y+r*.1,r*.82,c1);dot(x+o*r-r*.2,y-r*.1,r*.45,c2);dot(x+o*r-r*.3,y-r*.25,r*.16,"rgba(255,255,255,.7)")});
  leaf(x+r*.4,y-r*2.1,r*.6,r*.25,-.3,"#3a9a2e");return}
 if(k==="peach"){ov("#ee7f43","#f7b27a",r,r);X.fillStyle="rgba(235,70,70,.42)";X.beginPath();X.ellipse(x+r*.3,y+r*.2,r*.55,r*.7,0,0,7);X.fill();
  X.strokeStyle="rgba(150,50,20,.5)";X.lineWidth=.9;X.beginPath();X.moveTo(x,y-r*.9);X.quadraticCurveTo(x+r*.35,y,x,y+r*.9);X.stroke();hi();leaf(x+r*.5,y-r*1.05,r*.6,r*.25,-.4,"#3a9a2e");return}
 if(k==="mango"){ov("#e99a14","#f6c248",r*1.3,r*.92,.45);leaf(x+r*.4,y+r*.35,r*.55,r*.38,.45,"rgba(220,60,40,.45)");leaf(x-r*.75,y-r*.55,r*.45,r*.3,.45,"rgba(110,160,40,.6)");hi();stem(r*.4);return}
 if(k==="pear"){blob(x,y+r*.35,r*.95,["#dbe663","#9fb21e"]);blob(x,y-r*.55,r*.66,["#dbe663","#a9bb24"]);
  poly([[x-r*.62,y-r*.5],[x+r*.62,y-r*.5],[x+r*.9,y+r*.3],[x-r*.9,y+r*.3]],"#b8c929");hi();
  X.strokeStyle="#5a3b20";X.lineWidth=1;X.beginPath();X.moveTo(x,y-r*1.15);X.lineTo(x+r*.15,y-r*1.7);X.stroke();leaf(x+r*.6,y-r*1.45,r*.55,r*.25,-.4,"#3a9a2e");return}
 ov("#4b2278","#7a4fa8",r*.98,r*.9);X.strokeStyle="rgba(20,5,40,.5)";X.lineWidth=.9;X.beginPath();X.moveTo(x,y-r*.85);X.quadraticCurveTo(x+r*.3,y,x,y+r*.85);X.stroke();hi();stem(r*.5)}
function fruit2(k,x,y,r,ripe){var i;
 function ov(c1,c2,rx,ry,rot){X.fillStyle=c1;X.beginPath();X.ellipse(x,y,rx,ry,rot||0,0,7);X.fill();X.fillStyle=c2;X.beginPath();X.ellipse(x-rx*.15,y-ry*.18,rx*.72,ry*.72,rot||0,0,7);X.fill()}
 function hi(){leaf(x-r*.42,y-r*.42,r*.17,r*.3,.6,"rgba(255,255,255,.55)")}
 function sh(c1,c2,rb,rt){blob(x,y+r*.35,rb,[c2,c1]);blob(x,y-r*.5,rt,[c2,c1]);poly([[x-rt*.95,y-r*.5],[x+rt*.95,y-r*.5],[x+rb*.9,y+r*.3],[x-rb*.9,y+r*.3]],c1)}
 if(k==="mango"){
  if(ripe){ov("#d8841a","#f5c242",r*1.25,r*.88,.5);leaf(x+r*.5,y+r*.3,r*.6,r*.4,.5,"rgba(215,55,40,.5)");leaf(x-r*.7,y-r*.5,r*.45,r*.28,.5,"rgba(130,175,40,.55)")}
  else ov("#4d8c28","#86bf44",r*1.25,r*.88,.5);
  leaf(x+r*1.15,y+r*.75,r*.3,r*.2,.5,ripe?"#d8841a":"#4d8c28");leaf(x-r*.1,y-r*.35,r*.12,r*.5,.5,"rgba(255,255,255,.35)");dot(x-r*.95,y-r*.6,r*.17,ripe?"#6a8a2a":"#2f6a22");return true}
 if(k==="orange"){
  if(ripe){ov("#e0610a","#ffa028",r,r*.97);for(i=0;i<8;i++)dot(x+Math.sin(i*2.1)*r*.6,y+Math.cos(i*1.7)*r*.6,r*.06,"rgba(150,50,0,.35)");hi();dot(x+r*.1,y+r*.9,r*.12,"#a84a00")}
  else{ov("#6f9e30","#b0d05a",r,r*.97);hi()}
  leaf(x+r*.1,y-r*.95,r*.55,r*.24,-.3,"#2f8a28");dot(x,y-r*.88,r*.13,"#3a7a22");return true}
 if(k==="avocado"){sh(ripe?"#26331a":"#5f9a2a",ripe?"#4c5f30":"#98c64e",r*.95,r*.66);hi();dot(x,y-r*1.15,r*.1,"#5a3b20");return true}
 if(k==="fig"){sh(ripe?"#4a2046":"#6c9c3c",ripe?"#8a4e82":"#b2d27c",r*.9,r*.5);hi();dot(x,y-r*1.1,r*.1,ripe?"#2a1228":"#4a6a22");return true}
 if(k==="guava"){if(ripe){ov("#b9c93a","#e4ea82",r,r*.95);leaf(x+r*.4,y+r*.15,r*.5,r*.6,0,"rgba(235,110,90,.4)")}else ov("#4f8a2e","#86bd52",r,r*.95);hi();for(i=0;i<4;i++)leaf(x+(i-1.5)*r*.35,y+r*.92,r*.14,r*.3,(i-1.5)*.4,ripe?"#5a6a1a":"#2f5a1c");return true}
 if(k==="pomegranate"){ov(ripe?"#9a0e1c":"#8aaa34",ripe?"#da323e":"#cadd6a",r,r*.95);if(!ripe)leaf(x+r*.4,y+r*.1,r*.5,r*.6,0,"rgba(220,90,60,.35)");hi();
  X.fillStyle=ripe?"#7a0a14":"#6a8a24";X.beginPath();X.moveTo(x-r*.4,y-r*.82);X.lineTo(x-r*.3,y-r*1.25);X.lineTo(x-r*.12,y-r*.95);X.lineTo(x,y-r*1.32);X.lineTo(x+r*.12,y-r*.95);X.lineTo(x+r*.3,y-r*1.25);X.lineTo(x+r*.4,y-r*.82);X.closePath();X.fill();return true}
 if(k==="calamansi"){if(ripe){ov("#e89a22","#f6c24a",r,r*.97);leaf(x+r*.3,y+r*.25,r*.5,r*.5,0,"rgba(120,170,40,.35)")}else ov("#3f8a24","#6fb840",r,r*.97);hi();dot(x,y-r*.9,r*.14,"#2f6a1c");leaf(x+r*.2,y-r,r*.45,r*.2,-.3,"#2f8a28");return true}
 if(k==="jackfruit"){var rx=r*.85,ry=r*1.15;ov(ripe?"#8a7220":"#4f7a22",ripe?"#c9aa3c":"#7aa83e",rx,ry,.15);for(i=0;i<22;i++)dot(x+Math.sin(i*2.7)*rx*.72,y+Math.cos(i*1.9)*ry*.72,r*.1,ripe?"rgba(90,70,10,.55)":"rgba(30,70,15,.5)");hi();dot(x,y-ry*.98,r*.14,"#5a3b20");return true}
 if(k==="lychee"){ov(ripe?"#c8182c":"#8cb84a",ripe?"#ee4a58":"#c4dd84",r,r*.95);for(i=0;i<14;i++)dot(x+Math.sin(i*2.3)*r*.7,y+Math.cos(i*1.7)*r*.7,r*.07,ripe?"rgba(255,200,190,.55)":"rgba(80,120,30,.4)");hi();dot(x,y-r*.9,r*.12,"#5a3b20");return true}
 return false}
function bleaf(x,y,dx,dy,wd,c1,c2){var mx=x+dx*.5,my=y+dy*.5-Math.abs(dx)*.28,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;
 X.fillStyle=c1;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(mx+nx*wd,my+ny*wd,x+dx,y+dy);X.quadraticCurveTo(mx-nx*wd,my-ny*wd,x,y);X.fill();
 X.fillStyle=c2;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(mx+nx*wd,my+ny*wd,x+dx,y+dy);X.quadraticCurveTo(mx,my,x,y);X.fill();
 X.strokeStyle="rgba(20,80,20,.55)";X.lineWidth=1;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(mx,my,x+dx,y+dy);X.stroke()}
function bananaF(x,y,L,ripe,d){X.lineCap="round";X.strokeStyle=ripe?"#c9a014":"#4f8a2a";X.lineWidth=ripe?4:3;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+d*L*.35,y+L*.55,x+d*L*.2,y+L);X.stroke();
 X.strokeStyle=ripe?"#f6d230":"#86c04a";X.lineWidth=ripe?2.6:1.9;X.beginPath();X.moveTo(x,y+.5);X.quadraticCurveTo(x+d*L*.35,y+L*.55,x+d*L*.2,y+L);X.stroke();
 dot(x+d*L*.2,y+L+.5,1,"#4a3a14");X.lineCap="butt"}
function banana(p,s,stage){var x=p[0],y=p[1],ty=y-s*1.55,k,h,i,sc=s/32,LV=[[-50,-8],[-42,-28],[-22,-42],[2,-46],[24,-40],[43,-26],[51,-6],[-36,10],[36,12]];
 shade(p,s*.95,s*.32,.3);
 X.fillStyle=lg(x-s*.18,0,x+s*.18,0,[[0,"#6a8a38"],[.4,"#aac85c"],[1,"#587a30"]]);
 X.beginPath();X.moveTo(x-s*.19,y);X.lineTo(x-s*.12,ty);X.lineTo(x+s*.12,ty);X.lineTo(x+s*.19,y);X.closePath();X.fill();
 X.strokeStyle="rgba(40,70,20,.35)";X.lineWidth=1;for(k=1;k<6;k++){X.beginPath();X.moveTo(x-s*.17,y-k*s*.25);X.lineTo(x+s*.17,y-k*s*.25+2);X.stroke()}
 LV.forEach(function(o){if(o[1]<=-20)bleaf(x,ty,o[0]*sc,o[1]*sc,9*sc+1,"#2c8a2c","#4aa83c")});
 if(stage===0){X.strokeStyle="#6a7a30";X.lineWidth=2;X.beginPath();X.moveTo(x+s*.04,ty+2);X.quadraticCurveTo(x+s*.16,ty+s*.2,x+s*.12,ty+s*.5);X.stroke();
  X.fillStyle="#6e1448";X.beginPath();X.ellipse(x+s*.12,ty+s*.58,s*.1,s*.19,.12,0,7);X.fill();X.fillStyle="#a83a78";X.beginPath();X.ellipse(x+s*.1,ty+s*.54,s*.06,s*.13,.12,0,7);X.fill();
  for(k=0;k<4;k++)dot(x+s*.04+k*s*.04,ty+s*.14+k*s*.07,s*.025,"#f4ecc0")}
 else{X.strokeStyle="#6a7a30";X.lineWidth=2.2;X.beginPath();X.moveTo(x+s*.04,ty+2);X.quadraticCurveTo(x+s*.14,ty+s*.15,x+s*.1,ty+s*.7);X.stroke();
  for(h=0;h<4;h++)for(i=-2;i<=2;i++)bananaF(x+s*.1+i*s*.06,ty+s*.2+h*s*.16+Math.abs(i)*.8,stage===2?s*.3:s*.18,stage===2,i<0?-1:i>0?1:.3)}
 LV.forEach(function(o){if(o[1]>-20)bleaf(x,ty,o[0]*sc,o[1]*sc,9*sc+1,"#2c8a2c","#4aa83c")})}
function frond(tx,ty,a,len){var ex=tx+Math.cos(a)*len,ey=ty+Math.sin(a)*len*.5+len*.38,Cx=tx+Math.cos(a)*len*.5,Cy=ty+Math.sin(a)*len*.5-len*.32,k,t,u,px,py,dx,dy,l,nx,ny,sg,ll;
 X.strokeStyle="#4a6a28";X.lineWidth=1.6;X.beginPath();X.moveTo(tx,ty);X.quadraticCurveTo(Cx,Cy,ex,ey);X.stroke();
 for(k=1;k<=11;k++){t=k/11;u=1-t;px=u*u*tx+2*u*t*Cx+t*t*ex;py=u*u*ty+2*u*t*Cy+t*t*ey;dx=2*u*(Cx-tx)+2*t*(ex-Cx);dy=2*u*(Cy-ty)+2*t*(ey-Cy);l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;nx=-dy;ny=dx;ll=len*.26*(1-t*.55);
  for(sg=-1;sg<=1;sg+=2){X.strokeStyle=sg>0?"#2f8a2a":"#3f9e36";X.lineWidth=1.7;X.beginPath();X.moveTo(px,py);X.lineTo(px+sg*nx*ll+dx*ll*.45,py+sg*ny*ll+dy*ll*.45+ll*.35);X.stroke()}}}
function nut(x,y,r,c1,c2){dot(x,y,r,c1);blob(x-r*.2,y-r*.25,r*.7,[c2,c1]);dot(x-r*.25,y-r*.15,r*.1,"rgba(30,15,5,.55)");dot(x+r*.15,y-r*.2,r*.1,"rgba(30,15,5,.55)");dot(x-r*.05,y+r*.1,r*.1,"rgba(30,15,5,.55)")}
function coconut(p,s,stage){var x=p[0],y=p[1],P0=[x-s*.12,y],C=[x-s*.2,y-s*1.1],P2=[x+s*.34,y-s*2.1],i,a,b,q,k,FA=[-3.05,-2.55,-2.05,-1.57,-1.09,-.59,-.09,2.75,.4];
 function qp(t){var u=1-t;return[u*u*P0[0]+2*u*t*C[0]+t*t*P2[0],u*u*P0[1]+2*u*t*C[1]+t*t*P2[1]]}
 shade(p,s*.9,s*.3,.3);X.lineCap="round";
 for(i=0;i<12;i++){a=qp(i/12);b=qp((i+1)/12);X.strokeStyle="#6a4521";X.lineWidth=s*(.34-.17*i/12);X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke();
  X.strokeStyle="#9a6e3a";X.lineWidth=s*(.17-.08*i/12);X.beginPath();X.moveTo(a[0]-1,a[1]);X.lineTo(b[0]-1,b[1]);X.stroke()}
 X.lineCap="butt";
 for(i=1;i<15;i++){q=qp(i/15);k=s*(.15-.07*i/15);X.strokeStyle="rgba(40,22,8,.4)";X.lineWidth=1.2;X.beginPath();X.moveTo(q[0]-k,q[1]+1);X.quadraticCurveTo(q[0],q[1]+3,q[0]+k,q[1]+1);X.stroke()}
 FA.forEach(function(an){frond(P2[0],P2[1],an,s*1.25)});
 q=[P2[0],P2[1]+s*.1];
 if(stage===0){for(k=-2;k<=2;k++){X.strokeStyle="#efe6a6";X.lineWidth=1.3;X.beginPath();X.moveTo(q[0],q[1]);X.quadraticCurveTo(q[0]+k*3,q[1]+s*.1,q[0]+k*4,q[1]+s*.2);X.stroke();dot(q[0]+k*4,q[1]+s*.2,1,"#f6d44a")}}
 else[[-4,2],[4,3],[0,6],[-1,-1]].forEach(function(o){nut(q[0]+o[0]*s/32,q[1]+o[1]*s/32+2,stage===2?s*.12:s*.07,stage===2?"#7a5226":"#6f9a30",stage===2?"#b8884a":"#a2c860")})}
function pleaf(x,y,r){var j,a;for(j=0;j<7;j++){a=j*.8976-1.35;leaf(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.38,r*.5,r*.2,a,j%2?"#3f9a3a":"#55b44a")}blob(x,y,r*.38,["#66c45a","#2f8a30"])}
function papaya(p,s,stage){var x=p[0],y=p[1],ty=y-s*1.5,k,sc=s/32,LV=[[-31,-17],[-16,-30],[2,-35],[19,-29],[32,-16],[-37,-1],[37,0]],FR=[[-6,.08],[6,.16],[-4.5,.34],[5,.46],[0,.25]];
 shade(p,s*.8,s*.28,.3);
 X.fillStyle=lg(x-s*.13,0,x+s*.13,0,[[0,"#76865a"],[.45,"#b6c58c"],[1,"#66764a"]]);
 X.beginPath();X.moveTo(x-s*.15,y);X.quadraticCurveTo(x-s*.1,y-s*.8,x-s*.08,ty);X.lineTo(x+s*.08,ty);X.quadraticCurveTo(x+s*.1,y-s*.8,x+s*.15,y);X.closePath();X.fill();
 X.strokeStyle="rgba(50,60,30,.45)";X.lineWidth=1;for(k=1;k<9;k++){X.beginPath();X.moveTo(x-s*.12,y-k*s*.16);X.lineTo(x+s*.05,y-k*s*.16+1.5);X.stroke()}
 X.strokeStyle="#7a9a4a";X.lineWidth=1.7;LV.forEach(function(o){X.beginPath();X.moveTo(x,ty);X.lineTo(x+o[0]*sc,ty+o[1]*sc);X.stroke()});
 LV.forEach(function(o){pleaf(x+o[0]*sc,ty+o[1]*sc,s*.4)});
 FR.forEach(function(o){var fx=x+o[0]*sc,fy=ty+o[1]*s+s*.1;
  if(stage===0){dot(fx,fy,s*.05,"#fff4c8");dot(fx,fy,s*.02,"#e8c84a")}
  else if(stage===1){X.fillStyle="#5f9a30";X.beginPath();X.ellipse(fx,fy,s*.07,s*.11,.1,0,7);X.fill();X.fillStyle="#8cc454";X.beginPath();X.ellipse(fx-1,fy-1,s*.045,s*.07,.1,0,7);X.fill()}
  else{X.fillStyle="#e07a1c";X.beginPath();X.ellipse(fx,fy,s*.12,s*.19,.1,0,7);X.fill();X.fillStyle="#f8b84c";X.beginPath();X.ellipse(fx-s*.02,fy-s*.02,s*.08,s*.14,.1,0,7);X.fill();leaf(fx,fy-s*.16,s*.06,s*.04,0,"#7a9a30");leaf(fx-s*.05,fy-s*.05,s*.02,s*.07,.3,"rgba(255,255,255,.5)")}})}
var TP={orange:[["#a4e05c","#4a9a2c"],["#3f9a2a","#14541a"]],lemon:[["#bde070","#62a634"],["#5aaa3a","#226a22"]],cherry:[["#92d070","#3a8a3a"],["#3a8a38","#17501f"]],pear:[["#b0d884","#5a9a4a"],["#4f9a40","#1f5a2a"]],peach:[["#b0dc88","#5a9a50"],["#5f9f48","#2a6a30"]],plum:[["#6aa860","#2f6a40"],["#2f6a3a","#123f24"]],mango:[["#4a9a40","#1b5a2a"],["#1f6a2c","#0b3716"]],avocado:[["#5aa850","#206a30"],["#2a7a34","#0f4020"]],guava:[["#9ad06a","#4a8a3a"],["#4a9a3a","#1c5a22"]],pomegranate:[["#8ed068","#3f8a30"],["#3f8f32","#175019"]],calamansi:[["#8cd05a","#3a8a2a"],["#2f8a2a","#104a18"]],jackfruit:[["#5aa44a","#1f6a2a"],["#2a7a30","#0e4020"]],lychee:[["#7cc460","#2f7a30"],["#2f7a32","#0f461c"]],fig:[["#8cc860","#3a8a38"],["#3a8e36","#14501a"]]};
var HANG={mango:1,pear:1,avocado:1,jackfruit:1,fig:1,lychee:1},FSZ={apple:.14,orange:.15,lemon:.14,cherry:.13,pear:.16,peach:.14,plum:.12,mango:.2,avocado:.17,guava:.14,pomegranate:.14,calamansi:.1,jackfruit:.3,lychee:.1,fig:.13},TSC={mango:1.12,avocado:1.06,jackfruit:1.1};
function ftree(p,s,k,stage){
 if(k==="banana"){banana(p,s,stage);return}if(k==="coconut"){coconut(p,s,stage);return}if(k==="papaya"){papaya(p,s,stage);return}
 var ss=s*(TSC[k]||1),rn=mk(77),B=[[-.62,-1.05,.52],[.62,-1.0,.5],[0,-1.3,.6],[-.3,-1.7,.48],[.38,-1.55,.44],[0,-1.95,.38]],i,o,a,r,fx,fy,rr,fr=FSZ[k]||.14,n=stage===0?16:(fr>.18?7:11),
  bl=(k==="cherry"||k==="peach")?"#ffc4d6":k==="pomegranate"?"#ff6a3a":k==="avocado"?"#e8f0a0":"#fff";
 tree(p,ss,TP[k]);
 for(i=0;i<n;i++){o=B[Math.floor(rn()*B.length)];a=rn()*6.283;r=Math.sqrt(rn())*o[2]*.82;fx=p[0]+(o[0]+Math.cos(a)*r)*ss;fy=p[1]+(o[1]+Math.sin(a)*r*.9)*ss;
  if(stage===0){dot(fx,fy,ss*.07,bl);dot(fx,fy,ss*.03,"#f7d44a")}
  else{rr=ss*(stage===2?fr:fr*.6);if(HANG[k]){X.strokeStyle="#4a6a28";X.lineWidth=1;X.beginPath();X.moveTo(fx,fy-rr*2.2);X.lineTo(fx,fy-rr*.6);X.stroke()}fruit(k,fx,fy,rr,stage===2)}}}
function pine(p,s){var x=p[0],y=p[1],i,w,t;shade(p,s*.9,s*.32,.3);
 X.fillStyle=lg(x-s*.12,0,x+s*.12,0,[[0,"#3b2512"],[.5,"#7a532c"],[1,"#452c16"]]);X.fillRect(x-s*.1,y-s*.5,s*.2,s*.5);
 for(i=0;i<4;i++){w=s*(.95-i*.2);t=y-s*(.3+i*.45);
  X.fillStyle=lg(x-w,0,x+w,0,[[0,"#1d5a2a"],[.5,"#3a9a48"],[1,"#164a22"]]);
  X.beginPath();X.moveTo(x-w,t);X.lineTo(x,t-s*.85);X.lineTo(x+w,t);X.quadraticCurveTo(x,t+s*.18,x-w,t);X.closePath();X.fill();
  X.strokeStyle="rgba(190,240,150,.25)";X.lineWidth=1;X.beginPath();X.moveTo(x-w*.8,t-s*.05);X.lineTo(x,t-s*.8);X.stroke()}}
function flowers(p){var x=p[0],y=p[1],rn=mk(15),i,fx,fy,L=[],cs=["#ff5a7a","#ffd23a","#ffffff","#b07cff","#ff9a3c"];
 poly([[x-30,y],[x,y-15],[x+30,y],[x,y+15]],"#7d5430","#8a6234",2);
 for(i=0;i<30;i++){fx=x+(rn()-.5)*50;fy=y+(rn()-.5)*24;if(Math.abs(fx-x)/26+Math.abs(fy-y)/13<=1)L.push([fx,fy,cs[i%5]])}
 L.sort(function(a,b){return a[1]-b[1]});
 L.forEach(function(o){var h=6+(o[0]*7%4),k,an;X.strokeStyle="#3a8a2c";X.lineWidth=1.2;X.beginPath();X.moveTo(o[0],o[1]);X.lineTo(o[0],o[1]-h);X.stroke();leaf(o[0]-2,o[1]-h*.5,2.2,1,-.5,"#4aa83a");
  for(k=0;k<5;k++){an=k*1.2566;dot(o[0]+Math.cos(an)*1.9,o[1]-h+Math.sin(an)*1.9,1.5,o[2])}dot(o[0],o[1]-h,1.2,"#f7d44a")})}
function bench(p){var x=p[0],y=p[1];shade(p,24,8,.3);
 X.fillStyle="#6b4a24";X.fillRect(x-19,y-31,3,17);X.fillRect(x+16,y-31,3,17);
 poly([[x-19,y-19],[x+19,y-19],[x+19,y-23],[x-19,y-23]],"#b88650","#6b4a24",.8);
 poly([[x-19,y-26],[x+19,y-26],[x+19,y-30],[x-19,y-30]],"#c9975a","#6b4a24",.8);
 X.fillStyle="#5a3b1e";X.fillRect(x-20,y-11,3,12);X.fillRect(x+17,y-11,3,12);
 poly([[x-22,y-12],[x+22,y-12],[x+19,y-16],[x-19,y-16]],"#d6a766","#8a6234",.8);
 X.fillStyle="#8f6535";X.fillRect(x-22,y-12,44,3.5);X.fillStyle="rgba(255,255,255,.25)";X.fillRect(x-20,y-15.5,38,1)}
function well(p){var x=p[0],y=p[1],k,j;shade(p,24,9,.32);
 X.fillStyle=lg(x-17,0,x+17,0,[[0,"#7c776c"],[.4,"#cfc9bb"],[1,"#69645a"]]);X.fillRect(x-17,y-20,34,20);X.beginPath();X.ellipse(x,y,17,7,0,0,7);X.fill();
 X.strokeStyle="rgba(40,35,25,.45)";X.lineWidth=1;
 for(j=0;j<3;j++){X.beginPath();X.moveTo(x-17,y-5-j*6);X.quadraticCurveTo(x,y+2-j*6,x+17,y-5-j*6);X.stroke()}
 for(k=0;k<6;k++){X.beginPath();X.moveTo(x-14+k*5.6,y-18);X.lineTo(x-14+k*5.6,y-4);X.stroke()}
 X.fillStyle="#cfc9bb";X.beginPath();X.ellipse(x,y-20,17,7,0,0,7);X.fill();X.fillStyle="#1d4f6a";X.beginPath();X.ellipse(x,y-20,13,5,0,0,7);X.fill();X.fillStyle="#4aa3cf";X.beginPath();X.ellipse(x,y-19,10,3.5,0,0,7);X.fill();
 X.fillStyle="#6b4a24";X.fillRect(x-15,y-48,3,30);X.fillRect(x+12,y-48,3,30);
 X.strokeStyle="#4a3418";X.lineWidth=2;X.beginPath();X.moveTo(x-12,y-40);X.lineTo(x+12,y-40);X.stroke();
 X.strokeStyle="#c8b07a";X.lineWidth=1;X.beginPath();X.moveTo(x,y-40);X.lineTo(x,y-28);X.stroke();
 poly([[x-4,y-28],[x+4,y-28],[x+3,y-22],[x-3,y-22]],"#8a5a2a","#4a2e14",.8);
 poly([[x-22,y-46],[x,y-64],[x+22,y-46]],lg(x-22,0,x+22,0,[[0,"#a8322a"],[1,"#c9413a"]]),"#7a2420",1);
 X.strokeStyle="rgba(0,0,0,.25)";X.lineWidth=1;for(k=1;k<5;k++){X.beginPath();X.moveTo(x-22+k*4,y-46-k*3.6);X.lineTo(x+22-k*4,y-46-k*3.6);X.stroke()}}
function scarecrow(p){var x=p[0],y=p[1],k;shade(p,12,5,.3);
 X.strokeStyle="#6b4a24";X.lineWidth=3;X.lineCap="round";X.beginPath();X.moveTo(x,y+1);X.lineTo(x,y-48);X.stroke();
 X.lineWidth=2.6;X.beginPath();X.moveTo(x-20,y-34);X.lineTo(x+20,y-34);X.stroke();X.lineCap="butt";
 X.strokeStyle="#e6c25a";X.lineWidth=1;[-20,20].forEach(function(o){for(k=-2;k<=2;k++){X.beginPath();X.moveTo(x+o,y-34);X.lineTo(x+o+(o>0?5:-5),y-34+k*2.5);X.stroke()}});
 poly([[x-12,y-37],[x+12,y-37],[x+9,y-16],[x-9,y-16]],lg(x-12,0,x+12,0,[[0,"#c9413a"],[1,"#8f2a24"]]),"#5f1c18",1);
 X.strokeStyle="rgba(255,255,255,.22)";X.lineWidth=1;for(k=-2;k<=2;k++){X.beginPath();X.moveTo(x+k*4,y-36);X.lineTo(x+k*3,y-17);X.stroke()}
 poly([[x-6,y-30],[x-1,y-30],[x-1,y-25],[x-6,y-25]],"#3a7ac0","#1d4a80",.8);
 blob(x,y-44,7,["#e8cf8a","#b8975a"]);dot(x-2.5,y-45,1,"#222");dot(x+2.5,y-45,1,"#222");
 X.strokeStyle="#222";X.lineWidth=.8;X.beginPath();X.moveTo(x-2.5,y-41.5);X.lineTo(x+2.5,y-41.5);X.stroke();
 X.fillStyle="#6b4a24";X.beginPath();X.ellipse(x,y-49,12,3.2,0,0,7);X.fill();
 poly([[x-6.5,y-49],[x+6.5,y-49],[x+5,y-58],[x-5,y-58]],"#7d5430");X.fillStyle="#c9413a";X.fillRect(x-6,y-52,12,2)}
var DEC={};
function BFp(cx,cy,lu,lv){return[cx-(lu-lv)/2,cy+(lu+lv)/4]}
function LPt(f,lv,t,z){return[f[0]-lv*t,f[1]-lv*t/2-z]}
function RPt(f,lu,t,z){return[f[0]+lu*t,f[1]-lu*t/2-z]}
function TPt(f,lu,lv,h,a,b){return[f[0]+lu*a-lv*b,f[1]-h-lu*a/2-lv*b/2]}
function ibx(cx,cy,lu,lv,h,cL,cR,cT){var F=BFp(cx,cy,lu,lv),L=[F[0]-lv,F[1]-lv/2],R=[F[0]+lu,F[1]-lu/2],B=[R[0]-lv,R[1]-lv/2];
 function up(q){return[q[0],q[1]-h]}
 poly([F,L,up(L),up(F)],cL,"rgba(0,0,0,.3)",.8);poly([F,R,up(R),up(F)],cR,"rgba(0,0,0,.3)",.8);poly([up(F),up(L),up(B),up(R)],cT,"rgba(0,0,0,.3)",.8)}
function plank(f,lu,lv,h,n){var k,a,b;X.strokeStyle="rgba(40,20,5,.3)";X.lineWidth=1;X.beginPath();
 for(k=1;k<n;k++){a=RPt(f,lu,k/n,0);b=RPt(f,lu,k/n,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=LPt(f,lv,k/n,0);b=LPt(f,lv,k/n,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke()}
function groof(cx,cy,lu,lv,h,r,cS,cG,st){var f=BFp(cx,cy,lu,lv),F=[f[0],f[1]-h],L=[F[0]-lv,F[1]-lv/2],R=[F[0]+lu,F[1]-lu/2],B=[R[0]-lv,R[1]-lv/2],aF=[(F[0]+L[0])/2,(F[1]+L[1])/2-r],aR=[(R[0]+B[0])/2,(R[1]+B[1])/2-r];st=st||"rgba(0,0,0,.3)";
 poly([F,L,aF],cG,st,.9);poly([F,R,aR,aF],cS,st,.9);X.strokeStyle="rgba(255,255,255,.4)";X.lineWidth=1;X.beginPath();X.moveTo(aF[0],aF[1]);X.lineTo(aR[0],aR[1]);X.stroke()}
function hen2(x,y,s){X.fillStyle="#f4f0e6";X.beginPath();X.ellipse(x,y-4*s,5*s,3.6*s,0,0,7);X.fill();X.fillStyle="#d9d2bd";X.beginPath();X.ellipse(x-s,y-3.4*s,3*s,2*s,.2,0,7);X.fill();
 dot(x+4*s,y-8*s,2.4*s,"#f4f0e6");dot(x+4.6*s,y-10.4*s,.9*s,"#d23a2a");X.fillStyle="#f2a21a";X.beginPath();X.moveTo(x+6.2*s,y-8*s);X.lineTo(x+8.2*s,y-7.4*s);X.lineTo(x+6.2*s,y-7*s);X.fill();dot(x+4.8*s,y-8.4*s,.4*s,"#222");
 X.strokeStyle="#e0a020";X.lineWidth=.8;X.beginPath();X.moveTo(x-s,y-s);X.lineTo(x-s,y);X.moveTo(x+1.5*s,y-s);X.lineTo(x+1.5*s,y);X.stroke();leaf(x-4.6*s,y-6*s,2*s,1.2*s,-.6,"#f4f0e6")}
function crate(cx,cy,lu,lv,h){var f=BFp(cx,cy,lu,lv),k,a,b;ibx(cx,cy,lu,lv,h,"#a47642","#c0905a","#d8ae74");
 X.strokeStyle="rgba(60,35,10,.45)";X.lineWidth=1;X.beginPath();
 for(k=1;k<3;k++){a=RPt(f,lu,0,h*k/3);b=RPt(f,lu,1,h*k/3);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=LPt(f,lv,0,h*k/3);b=LPt(f,lv,1,h*k/3);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}
 X.moveTo(f[0],f[1]);X.lineTo(f[0],f[1]-h);X.stroke()}

DEC.windmill=function(p){var x=p[0],y=p[1],k,j;shade(p,26,9,.32);
 X.fillStyle=lg(x-20,0,x+20,0,[[0,"#bba98a"],[.4,"#f0e6cf"],[1,"#9c8c68"]]);X.beginPath();X.moveTo(x-20,y);X.lineTo(x-11,y-62);X.lineTo(x+11,y-62);X.lineTo(x+20,y);X.closePath();X.fill();
 X.strokeStyle="rgba(90,70,40,.3)";X.lineWidth=1;for(k=1;k<6;k++){X.beginPath();X.moveTo(x-20+1.5*k,y-k*10.3);X.lineTo(x+20-1.5*k,y-k*10.3);X.stroke()}
 poly([[x-6,y],[x+6,y],[x+5,y-18],[x-5,y-18]],"#6b4a24","#3a2a14",1);dot(x+3,y-9,.9,"#e0cb82");
 poly([[x-3.5,y-38],[x+3.5,y-38],[x+3.5,y-46],[x-3.5,y-46]],"#27394a","#f2eee2",1);
 X.fillStyle=lg(x-14,0,x+14,0,[[0,"#8f332c"],[.5,"#d9564a"],[1,"#7a2a24"]]);X.beginPath();X.moveTo(x-14,y-62);X.quadraticCurveTo(x,y-68,x+14,y-62);X.lineTo(x,y-84);X.closePath();X.fill();
 for(k=0;k<4;k++){X.save();X.translate(x+6,y-65);X.transform(.9,-.45,0,1,0,0);X.rotate(.4+k*1.5708);X.fillStyle="#7a5a30";X.fillRect(0,-1.4,36,2.8);X.fillStyle="rgba(250,245,232,.95)";X.fillRect(8,-11,28,10);
  X.strokeStyle="#9a8a6a";X.lineWidth=.8;X.beginPath();for(j=0;j<4;j++){X.moveTo(8+j*7,-11);X.lineTo(8+j*7,-1)}X.moveTo(8,-6);X.lineTo(36,-6);X.stroke();X.restore()}
 X.strokeStyle="#4a3418";X.lineWidth=4;X.beginPath();X.moveTo(x,y-68);X.lineTo(x+6,y-65);X.stroke();dot(x+6,y-65,3.2,"#4a3418");dot(x+5.2,y-65.8,1.2,"#b89a60")};
DEC.windmill=function(p){
var x=p[0],y=p[1]-2,H=60,rb=20,rt=12,k,j,a,px,py,r,hx=x+10,hy=y-68.5,ps;
shade(p,30,11,.32);
X.fillStyle=lg(x-rb,0,x+rb,0,[[0,"#a94f47"],[.38,"#f0a597"],[1,"#8a3a34"]]);
X.beginPath();X.ellipse(x,y,rb,rb*.5,0,Math.PI,0,true);X.lineTo(x+rt,y-H);X.ellipse(x,y-H,rt,rt*.5,0,0,Math.PI);X.closePath();X.fill();
X.strokeStyle="rgba(80,30,25,.35)";X.lineWidth=.9;
for(k=1;k<9;k++){r=rb+(rt-rb)*k/9;X.beginPath();X.ellipse(x,y-H*k/9,r,r*.5,0,0,Math.PI);X.stroke()}
poly([[x-12,y-37],[x-6,y-34.5],[x-6,y-26],[x-12,y-28.5]],"#27394a","#f6ecd8",1);
poly([[x+6,y-34.5],[x+12,y-37],[x+12,y-28.5],[x+6,y-26]],"#27394a","#f6ecd8",1);
X.fillStyle="#5a3220";X.strokeStyle="#f6ecd8";X.lineWidth=1;X.beginPath();X.moveTo(x-5,y+9.5);X.lineTo(x-5,y-3);X.quadraticCurveTo(x,y-11,x+5,y-3);X.lineTo(x+5,y+9.5);X.closePath();X.fill();X.stroke();
poly([[x-10,y-7],[x+10,y-7],[x,y-19]],"#c9413a","#f6ecd8",1);
X.strokeStyle="#b5763d";X.lineWidth=1.8;X.beginPath();
for(k=0;k<=9;k++){a=k*Math.PI/9;if(Math.abs(a-Math.PI/2)<.2)continue;px=x+27*Math.cos(a);py=y+1+13.5*Math.sin(a);X.moveTo(px,py);X.lineTo(px,py-8)}X.stroke();
X.lineWidth=1.3;[3.5,6.5].forEach(function(h){X.beginPath();X.ellipse(x,y+1-h,27,13.5,0,0,Math.PI/2-.2);X.stroke();X.beginPath();X.ellipse(x,y+1-h,27,13.5,0,Math.PI/2+.2,Math.PI);X.stroke()});
X.fillStyle=lg(x-15,0,x+15,0,[[0,"#8f332c"],[.5,"#e0675a"],[1,"#7a2a24"]]);
X.beginPath();X.moveTo(x-15,y-H);X.quadraticCurveTo(x-14,y-H-17,x+1,y-H-25);X.quadraticCurveTo(x+14,y-H-17,x+15,y-H);X.ellipse(x,y-H,15,7.5,0,0,Math.PI);X.closePath();X.fill();
X.strokeStyle="rgba(60,15,10,.4)";X.lineWidth=.9;
for(j=1;j<4;j++){r=15-j*2.4;X.beginPath();X.ellipse(x,y-H-j*5.5,r,r*.5,0,0,Math.PI);X.stroke()}
X.save();X.lineCap="round";X.strokeStyle="#4a3418";X.lineWidth=4.5;X.beginPath();X.moveTo(x+3,y-72);X.lineTo(hx,hy);X.stroke();X.restore();
for(ps=0;ps<2;ps++){for(k=0;k<4;k++){X.save();X.translate(hx-(ps?0:1.6),hy-(ps?0:.8));X.transform(1,-.5,0,1,0,0);X.rotate(.75+k*1.5708);
 X.fillStyle=ps?"#7a5a30":"#4e3a1e";X.fillRect(0,-1.5,36,3);
 X.fillStyle=ps?"#e6b89a":"#9a5f4a";X.fillRect(8,-13,27,10);
 if(ps){X.strokeStyle="#7a4a3a";X.lineWidth=.8;X.strokeRect(8,-13,27,10);X.beginPath();for(j=1;j<8;j++){X.moveTo(8+j*3.4,-13);X.lineTo(8+j*3.4,-3)}X.moveTo(8,-8);X.lineTo(35,-8);X.stroke()}
 X.restore()}}
dot(hx,hy,4,"#4a3418");dot(hx-.8,hy-.9,1.5,"#b89a60")};
DEC.greenhouse=function(p){var x=p[0],y=p[1],lu=32,lv=24,k,a,f=BFp(x,y-3,lu,lv),L=[f[0]-lv,f[1]-lv/2],R=[f[0]+lu,f[1]-lu/2];shade(p,34,13,.3);
 ibx(x,y,lu,lv,3,"#8c8a80","#aaa89c","#c4c2b6");
 for(k=0;k<9;k++){blob(x+(k-4)*5.2,y-9+(k%3)*3,5.5,["#6cc04a","#2f7a2c"]);if(k%2)dot(x+(k-4)*5.2+1,y-8+(k%3)*3,1.5,"#e0342a")}
 ibx(x,y-3,lu,lv,19,"rgba(176,222,240,.5)","rgba(200,236,248,.45)","rgba(220,244,252,.4)");
 X.strokeStyle="rgba(255,255,255,.9)";X.lineWidth=1.3;X.beginPath();
 [f,L,R].forEach(function(q){X.moveTo(q[0],q[1]);X.lineTo(q[0],q[1]-19)});
 for(k=1;k<3;k++){a=RPt(f,lu,k/3,0);X.moveTo(a[0],a[1]);X.lineTo(a[0],a[1]-19);a=LPt(f,lv,k/3,0);X.moveTo(a[0],a[1]);X.lineTo(a[0],a[1]-19)}
 X.stroke();
 groof(x,y-3,lu,lv,19,12,"rgba(170,216,236,.62)","rgba(196,232,244,.6)","rgba(255,255,255,.9)");
 poly([RPt(f,lu,.38,0),RPt(f,lu,.62,0),RPt(f,lu,.62,15),RPt(f,lu,.38,15)],"rgba(255,255,255,.35)","#fff",1.2)};

DEC.coop=function(p){var x=p[0],y=p[1],lu=22,lv=18,h=15,k,a,f=BFp(x,y-6,lu,lv),L=[f[0]-lv,f[1]-lv/2],R=[f[0]+lu,f[1]-lu/2],B=[R[0]-lv,R[1]-lv/2];shade(p,28,10,.3);
 X.strokeStyle="#5a3b1e";X.lineWidth=2.6;X.beginPath();[f,L,R,B].forEach(function(q){X.moveTo(q[0],q[1]);X.lineTo(q[0],q[1]+7)});X.stroke();
 ibx(x,y-6,lu,lv,h,"#a8452f","#c4573c","#7a3022");plank(f,lu,lv,h,6);
 groof(x,y-6,lu,lv,h,9,"#6b4a2c","#8a5a38");
 poly([LPt(f,lv,.34,0),LPt(f,lv,.66,0),LPt(f,lv,.66,8),LPt(f,lv,.5,12),LPt(f,lv,.34,8)],"#1a0c06","#f2e2c0",1);
 poly([RPt(f,lu,.3,6),RPt(f,lu,.7,6),RPt(f,lu,.7,12),RPt(f,lu,.3,12)],"#27394a","#f2e2c0",1);
 a=LPt(f,lv,.5,0);X.strokeStyle="#8a5e30";X.lineWidth=5;X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(a[0]-10,a[1]+9);X.stroke();
 X.strokeStyle="#4a3018";X.lineWidth=1;X.beginPath();for(k=1;k<4;k++){X.moveTo(a[0]-k*2.5-2,a[1]+k*2.25+1);X.lineTo(a[0]-k*2.5+2,a[1]+k*2.25-1)}X.stroke();
 hen2(x-28,y+10,1.1)};

DEC.doghouse=function(p){var x=p[0],y=p[1],lu=20,lv=18,h=13,f=BFp(x,y,lu,lv);shade(p,24,9,.3);
 ibx(x,y,lu,lv,h,"#b3622f","#cf7a40","#8a4a22");plank(f,lu,lv,h,5);
 groof(x,y,lu,lv,h,8,"#a02c28","#c9473f");
 poly([LPt(f,lv,.3,0),LPt(f,lv,.7,0),LPt(f,lv,.7,7),LPt(f,lv,.5,11),LPt(f,lv,.3,7)],"#24160c","#f2e2c0",1.1);
 X.fillStyle="#d9322a";X.beginPath();X.ellipse(x-20,y+9,5,2.2,0,0,7);X.fill();X.fillStyle="#7a1a14";X.beginPath();X.ellipse(x-20,y+8.4,3.6,1.3,0,0,7);X.fill();
 X.fillStyle="#f6f0e0";X.fillRect(x-25,y+13,7,1.8);dot(x-25,y+13.9,1.3,"#f6f0e0");dot(x-18,y+13.9,1.3,"#f6f0e0")};

DEC.mailbox=function(p){var x=p[0],y=p[1];shade(p,10,4,.3);
 X.fillStyle=lg(x-2,0,x+2,0,[[0,"#5a3b1e"],[.5,"#a07440"],[1,"#5a3b1e"]]);X.fillRect(x-2,y-30,4,30);
 X.fillStyle=lg(0,y-45,0,y-30,[[0,"#4a78c0"],[1,"#2a4a8a"]]);X.beginPath();X.moveTo(x-11,y-30);X.lineTo(x-11,y-38);X.quadraticCurveTo(x-11,y-45,x-4,y-45);X.lineTo(x+7,y-45);X.quadraticCurveTo(x+14,y-45,x+14,y-38);X.lineTo(x+14,y-30);X.closePath();X.fill();
 X.fillStyle="rgba(255,255,255,.28)";X.fillRect(x-9,y-43,16,2);
 X.fillStyle="#1f3a70";X.beginPath();X.ellipse(x+14,y-37.5,2.2,7,0,0,7);X.fill();
 X.strokeStyle="#6a6a6a";X.lineWidth=1.4;X.beginPath();X.moveTo(x-3,y-45);X.lineTo(x-3,y-54);X.stroke();X.fillStyle="#d9322a";X.fillRect(x-3,y-54,8,5)};

DEC.lamp=function(p){var x=p[0],y=p[1],g;shade(p,12,4.5,.3);
 X.fillStyle="#2c3238";X.beginPath();X.ellipse(x,y-1,7,3,0,0,7);X.fill();X.fillRect(x-4,y-6,8,5);
 X.fillStyle=lg(x-2,0,x+2,0,[[0,"#23282d"],[.5,"#566069"],[1,"#23282d"]]);X.fillRect(x-1.8,y-62,3.6,58);
 g=X.createRadialGradient(x,y-70,2,x,y-70,26);g.addColorStop(0,"rgba(255,235,150,.55)");g.addColorStop(1,"rgba(255,235,150,0)");X.fillStyle=g;X.beginPath();X.arc(x,y-70,26,0,7);X.fill();
 poly([[x-6,y-62],[x+6,y-62],[x+7,y-76],[x-7,y-76]],lg(0,y-76,0,y-62,[[0,"#fff6c0"],[1,"#f5c43a"]]),"#23282d",1.6);
 poly([[x-9,y-76],[x+9,y-76],[x,y-86]],"#23282d");dot(x,y-88,1.6,"#566069")};

DEC.signpost=function(p){var x=p[0],y=p[1];shade(p,12,4.5,.3);
 X.fillStyle=lg(x-3,0,x+3,0,[[0,"#4a3016"],[.5,"#9a6e3a"],[1,"#4a3016"]]);X.fillRect(x-3,y-60,6,60);
 function sgn(yy,dir,txt,c){var a=dir>0;poly(a?[[x-22,yy-6],[x+16,yy-6],[x+26,yy],[x+16,yy+6],[x-22,yy+6]]:[[x+22,yy-6],[x-16,yy-6],[x-26,yy],[x-16,yy+6],[x+22,yy+6]],c,"#3a2410",1.2);
  X.fillStyle="#fff7e0";X.font="bold 8px system-ui,sans-serif";X.textAlign="center";X.textBaseline="middle";X.fillText(txt,x+(a?-2:2),yy+.5)}
 sgn(y-50,1,"FARM","#b8884a");sgn(y-34,-1,"BARN","#c9472f");sgn(y-18,1,"MARKET","#6aa04a")};

DEC.hedge=function(p){var x=p[0],y=p[1],lu=30,lv=14,h=16,f=BFp(x,y,lu,lv),k,t,z,q,rn=mk(6);shade(p,26,10,.28);
 ibx(x,y,lu,lv,h,"#2a6a24","#3a8a30","#52a83e");
 for(k=0;k<70;k++){t=rn();z=rn()*h;q=k%3===0?LPt(f,lv,t,z):k%3===1?RPt(f,lu,t,z):TPt(f,lu,lv,h,t,rn());dot(q[0],q[1],1.2+rn()*.8,rn()<.5?"rgba(170,235,110,.55)":"rgba(10,60,10,.35)")}
 for(k=0;k<5;k++){q=TPt(f,lu,lv,h,rn(),rn());dot(q[0],q[1],1.4,k%2?"#ff7aa0":"#ffe14d")}};

DEC.rocks=function(p){var x=p[0],y=p[1],k,rn=mk(4),R=[[-1,-14,8,6.5],[-12,-5,9,7],[8,-4,11,8],[17,2,5,4],[-20,1,5,4]];shade(p,26,9,.3);
 R.forEach(function(o){X.fillStyle=lg(0,y+o[1]-o[3],0,y+o[1]+o[3],[[0,"#c4c4bc"],[1,"#6a6a64"]]);X.beginPath();X.ellipse(x+o[0],y+o[1],o[2],o[3],0,0,7);X.fill();
  X.fillStyle="rgba(255,255,255,.25)";X.beginPath();X.ellipse(x+o[0]-o[2]*.25,y+o[1]-o[3]*.35,o[2]*.5,o[3]*.35,0,0,7);X.fill();
  X.strokeStyle="rgba(40,40,36,.35)";X.lineWidth=.8;X.beginPath();X.moveTo(x+o[0]-o[2]*.2,y+o[1]-o[3]*.3);X.lineTo(x+o[0]+o[2]*.1,y+o[1]+o[3]*.5);X.stroke()});
 leaf(x-12,y-10,5,2,0,"rgba(90,150,50,.7)");leaf(x+10,y-10,4,1.6,.2,"rgba(90,150,50,.7)");
 for(k=0;k<8;k++){X.strokeStyle=k%2?"#4f9a2e":"#a6e066";X.lineWidth=1.2;X.beginPath();X.moveTo(x-24+k*7,y+4);X.lineTo(x-25+k*7,y-2-rn()*3);X.stroke()}};

DEC.logs=function(p){var x=p[0],y=p[1];shade(p,28,9,.3);
 function lgE(cx,cy,r){X.fillStyle="#4a301a";X.beginPath();X.arc(cx+14,cy-7,r,0,7);X.fill();X.fillStyle="#6a4624";X.beginPath();X.moveTo(cx,cy-r);X.lineTo(cx+14,cy-r-7);X.lineTo(cx+14,cy+r-7);X.lineTo(cx,cy+r);X.closePath();X.fill();
  X.strokeStyle="rgba(30,15,5,.4)";X.lineWidth=1;X.beginPath();X.moveTo(cx+4,cy-r+1);X.lineTo(cx+18,cy-r-6);X.moveTo(cx+4,cy+r-1);X.lineTo(cx+18,cy+r-8);X.stroke();
  dot(cx,cy,r,"#e3bf86");X.strokeStyle="#b88c52";X.lineWidth=.9;[.7,.4].forEach(function(m){X.beginPath();X.arc(cx,cy,r*m,0,7);X.stroke()});dot(cx,cy,r*.12,"#a87a45");X.strokeStyle="#5a3b1e";X.lineWidth=1.5;X.beginPath();X.arc(cx,cy,r,0,7);X.stroke()}
 lgE(x-20,y-6.5,6.5);lgE(x-7,y-6.5,6.5);lgE(x+6,y-6.5,6.5);lgE(x-13.5,y-18,6.5);lgE(x-.5,y-18,6.5);lgE(x-7,y-29.5,6.5)};

DEC.pumpkins=function(p){var x=p[0],y=p[1];shade(p,26,9,.3);X.save();X.translate(x,y);X.scale(1.7,1.7);pump(0,-3);pump(-8,1);pump(7,2);X.restore();leaf(x-22,y-2,4,1.6,.3,"#3f9a2c");leaf(x+24,y,4,1.6,-.3,"#3f9a2c")};

DEC.crates=function(p){var x=p[0],y=p[1],tp;shade(p,30,11,.3);
 crate(x-10,y-1,15,13,13);crate(x+9,y+3,15,13,13);crate(x-1,y-12,15,13,12);
 tp=[x-1,y-24];[[-5,-1],[4,-3],[1,2],[-2,-4],[6,1]].forEach(function(o){dot(tp[0]+o[0],tp[1]+o[1],3.3,"#d9322a");dot(tp[0]+o[0]-1,tp[1]+o[1]-1,1,"rgba(255,255,255,.6)")})};

DEC.haystack=function(p){var x=p[0],y=p[1],k,rn=mk(8),yy,w2,xx;shade(p,26,9,.3);
 X.fillStyle=lg(x-22,0,x+22,0,[[0,"#c79a3e"],[.45,"#f2d77a"],[1,"#a87e2a"]]);X.beginPath();X.moveTo(x-22,y);X.quadraticCurveTo(x-20,y-24,x-4,y-44);X.quadraticCurveTo(x,y-50,x+4,y-44);X.quadraticCurveTo(x+20,y-24,x+22,y);X.quadraticCurveTo(x,y+7,x-22,y);X.closePath();X.fill();
 for(k=0;k<46;k++){yy=y-rn()*42;w2=22*(1-(y-yy)/50);xx=x+(rn()-.5)*2*w2*.92;X.strokeStyle=k%2?"rgba(248,229,152,.8)":"rgba(150,105,30,.55)";X.lineWidth=1;X.beginPath();X.moveTo(xx,yy);X.lineTo(xx+(rn()-.5)*6,yy+5);X.stroke()}
 X.strokeStyle="#7a5a20";X.lineWidth=1.6;X.beginPath();X.moveTo(x-15,y-17);X.quadraticCurveTo(x,y-12,x+15,y-17);X.stroke();
 for(k=-2;k<=2;k++){X.strokeStyle="#e8c860";X.lineWidth=1.2;X.beginPath();X.moveTo(x+k,y-47);X.lineTo(x+k*3,y-54);X.stroke()}};

DEC.trough=function(p){var x=p[0],y=p[1],lu=34,lv=12,h=9,f=BFp(x,y,lu,lv);function pt(a,b){return TPt(f,lu,lv,h,a,b)}shade(p,28,10,.3);
 ibx(x,y,lu,lv,h,"#7e5630","#9a6c3c","#5a3b1e");plank(f,lu,lv,h,5);
 poly([pt(.06,.14),pt(.94,.14),pt(.94,.86),pt(.06,.86)],lg(0,y-20,0,y-8,[[0,"#7ccbf0"],[1,"#2a6a9a"]]),"#3a2410",.8);
 X.strokeStyle="rgba(255,255,255,.6)";X.lineWidth=1;X.beginPath();var a1=pt(.2,.5),a2=pt(.45,.5);X.moveTo(a1[0],a1[1]);X.lineTo(a2[0],a2[1]);X.stroke();
 poly([RPt(f,lu,0,0),RPt(f,lu,.07,0),RPt(f,lu,.07,h),RPt(f,lu,0,h)],"#4a3018");poly([RPt(f,lu,.93,0),RPt(f,lu,1,0),RPt(f,lu,1,h),RPt(f,lu,.93,h)],"#4a3018")};

DEC.beehive=function(p){var x=p[0],y=p[1],k,w,yy;shade(p,18,7,.3);
 X.fillStyle="#7a5430";X.fillRect(x-14,y-14,2.6,14);X.fillRect(x+11.4,y-14,2.6,14);X.fillRect(x-10,y-7,20,2);
 poly([[x-17,y-14],[x+17,y-14],[x+15,y-18],[x-15,y-18]],"#a07440","#5a3b1e",1);
 for(k=0;k<5;k++){w=[13,12,10.5,8,5][k];yy=y-21-k*5.4;X.fillStyle=lg(x-w,0,x+w,0,[[0,"#b8841c"],[.4,"#f0c850"],[1,"#8a5e10"]]);X.beginPath();X.ellipse(x,yy,w,4.4,0,0,7);X.fill();X.strokeStyle="rgba(90,55,10,.5)";X.lineWidth=.9;X.beginPath();X.ellipse(x,yy,w,4.4,0,.1,3.05);X.stroke()}
 dot(x,y-47,2.6,"#a87418");X.fillStyle="#2a1a08";X.beginPath();X.ellipse(x,y-21,3.4,2.4,0,0,7);X.fill();
 [[-16,-34],[15,-28],[10,-42]].forEach(function(o){dot(x+o[0],y+o[1],1.6,"#f4c21a");dot(x+o[0]+.6,y+o[1],.9,"#222");leaf(x+o[0]-1,y+o[1]-1.8,1.6,.8,-.5,"rgba(255,255,255,.7)")})};

DEC.birdhouse=function(p){var x=p[0],y=p[1];shade(p,10,4,.3);
 X.fillStyle=lg(x-2,0,x+2,0,[[0,"#4a3016"],[.5,"#8a5e30"],[1,"#4a3016"]]);X.fillRect(x-2,y-44,4,44);X.fillRect(x-6,y-3,12,3);
 poly([[x-12,y-58],[x+12,y-58],[x+12,y-38],[x-12,y-38]],lg(x-12,0,x+12,0,[[0,"#4a90c9"],[1,"#2f6a9a"]]),"#1d4a70",1.2);
 dot(x,y-50,4,"#1a1208");X.strokeStyle="#f2e2c0";X.lineWidth=1.2;X.beginPath();X.arc(x,y-50,4,0,7);X.stroke();
 X.strokeStyle="#8a5e30";X.lineWidth=1.6;X.beginPath();X.moveTo(x-5,y-43);X.lineTo(x+5,y-43);X.stroke();
 poly([[x-16,y-58],[x,y-72],[x+16,y-58]],"#c9473f","#7a2420",1.2);dot(x+11,y-62,2.2,"#f4c21a");dot(x+13,y-62.6,.8,"#222")};

DEC.wheelbarrow=function(p){var x=p[0],y=p[1];shade(p,28,8,.3);
 X.strokeStyle="#7a5430";X.lineWidth=2.6;X.lineCap="round";X.beginPath();X.moveTo(x+6,y-14);X.lineTo(x+30,y-20);X.moveTo(x+10,y-9);X.lineTo(x+30,y-14);X.moveTo(x+8,y-9);X.lineTo(x+8,y);X.moveTo(x+17,y-11);X.lineTo(x+17,y-1);X.stroke();X.lineCap="butt";
 dot(x-18,y-7,7,"#1d1d1d");dot(x-18,y-7,4.4,"#9aa0a6");dot(x-18,y-7,1.4,"#444");
 poly([[x-24,y-24],[x+14,y-24],[x+9,y-8],[x-14,y-8]],lg(0,y-24,0,y-8,[[0,"#e85a48"],[1,"#a92a1e"]]),"#6a1810",1.2);
 X.strokeStyle="#f08a78";X.lineWidth=1.4;X.beginPath();X.moveTo(x-24,y-24);X.lineTo(x+14,y-24);X.stroke();
 X.fillStyle="#6b4524";X.beginPath();X.ellipse(x-5,y-25,18,5,0,0,7);X.fill();
 [[-12,-28],[-4,-30],[4,-28],[-8,-32],[0,-33]].forEach(function(o){dot(x+o[0],y+o[1],4,"#d9322a");dot(x+o[0]-1.2,y+o[1]-1.2,1.2,"rgba(255,255,255,.6)")})};

DEC.campfire=function(p){var x=p[0],y=p[1],k,an,sx,sy,g;shade(p,24,9,.3);
 function stone(a){sx=x+Math.cos(a)*17;sy=y+Math.sin(a)*7;blob(sx,sy-2,4.4,["#c4c0b4","#6a665c"])}
 for(k=0;k<9;k++){an=k*.698;if(Math.sin(an)<0)stone(an)}
 X.fillStyle="#2a1a10";X.beginPath();X.ellipse(x,y,14,5.6,0,0,7);X.fill();
 X.lineCap="round";X.strokeStyle="#5a3b1e";X.lineWidth=5;X.beginPath();X.moveTo(x-13,y-3);X.lineTo(x+11,y-9);X.moveTo(x+13,y-3);X.lineTo(x-11,y-9);X.stroke();
 X.strokeStyle="#8a5e30";X.lineWidth=2;X.beginPath();X.moveTo(x-13,y-4.5);X.lineTo(x+11,y-10.5);X.moveTo(x+13,y-4.5);X.lineTo(x-11,y-10.5);X.stroke();X.lineCap="butt";
 g=X.createRadialGradient(x,y-12,2,x,y-12,28);g.addColorStop(0,"rgba(255,170,60,.38)");g.addColorStop(1,"rgba(255,170,60,0)");X.fillStyle=g;X.beginPath();X.arc(x,y-12,28,0,7);X.fill();
 function fl(cx,h,w,c1,c2){X.fillStyle=lg(0,y-h,0,y-4,[[0,c1],[1,c2]]);X.beginPath();X.moveTo(cx-w,y-6);X.quadraticCurveTo(cx-w*1.1,y-h*.5,cx+w*.1,y-h);X.quadraticCurveTo(cx+w*.5,y-h*.5,cx+w,y-6);X.quadraticCurveTo(cx,y-2,cx-w,y-6);X.closePath();X.fill()}
 fl(x-6,20,5,"#ffb830","#e8421a");fl(x+6,22,5,"#ffb830","#e8421a");fl(x,30,8,"#ffd23a","#e8421a");fl(x,17,4,"#fff6b0","#ffb020");
 [[-9,-34],[8,-38],[2,-44],[-4,-40]].forEach(function(o){dot(x+o[0],y+o[1],.9,"#ffd23a")});
 for(k=0;k<9;k++){an=k*.698;if(Math.sin(an)>=0)stone(an)}};

DEC.picnic=function(p){var x=p[0],y=p[1],f=BFp(x,y-10,30,16),k,a,b,c;shade(p,38,13,.3);
 ibx(x-13,y-6.5,30,6,5,"#8a5e30","#a87a42","#c4935a");
 X.strokeStyle="#5a3b1e";X.lineWidth=2.4;X.beginPath();[[x-7,y+1.5],[x-23,y-6.5],[x+23,y-13.5],[x+7,y-21.5]].forEach(function(q){X.moveTo(q[0],q[1]);X.lineTo(q[0],q[1]+10)});X.stroke();
 ibx(x,y-10,30,16,3,"#a8352a","#c0402f","#d24a3c");
 X.strokeStyle="rgba(255,255,255,.55)";X.lineWidth=1;X.beginPath();
 for(k=1;k<6;k++){a=TPt(f,30,16,3,0,k/6);b=TPt(f,30,16,3,1,k/6);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=TPt(f,30,16,3,k/6,0);b=TPt(f,30,16,3,k/6,1);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 c=TPt(f,30,16,3,.5,.5);X.fillStyle="#b8884a";X.beginPath();X.ellipse(c[0],c[1],6,2.8,0,0,7);X.fill();dot(c[0]-2,c[1]-2.6,2.2,"#d9322a");dot(c[0]+2,c[1]-2.4,2.2,"#f0b020");
 ibx(x+13,y+6.5,30,6,5,"#8a5e30","#a87a42","#c4935a")};

DEC.fountain=function(p){var x=p[0],y=p[1];shade(p,36,13,.32);
 X.fillStyle="#6e6b62";X.beginPath();X.ellipse(x,y,32,14.5,0,0,7);X.fill();
 X.fillStyle=lg(x-32,0,x+32,0,[[0,"#8b887e"],[.4,"#d8d4c8"],[1,"#706d64"]]);X.fillRect(x-32,y-12,64,12);
 X.fillStyle="#e2ded2";X.beginPath();X.ellipse(x,y-12,32,14.5,0,0,7);X.fill();
 X.fillStyle=lg(0,y-24,0,y,[[0,"#8fd6f0"],[1,"#2f84b4"]]);X.beginPath();X.ellipse(x,y-12,27,11.5,0,0,7);X.fill();
 X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1;[[-14,-6,8],[12,-9,6],[8,-3,9]].forEach(function(o){X.beginPath();X.ellipse(x+o[0],y+o[1],o[2],o[2]*.38,0,0,6.28);X.stroke()});
 X.fillStyle=lg(x-4,0,x+4,0,[[0,"#8b887e"],[.5,"#e2ded2"],[1,"#706d64"]]);X.fillRect(x-4,y-34,8,22);
 X.fillStyle="#e2ded2";X.beginPath();X.ellipse(x,y-34,13,5.2,0,0,7);X.fill();
 X.fillStyle=lg(0,y-39,0,y-29,[[0,"#8fd6f0"],[1,"#3a8cba"]]);X.beginPath();X.ellipse(x,y-34,10.5,4,0,0,7);X.fill();
 X.fillStyle=lg(x-2.4,0,x+2.4,0,[[0,"#8b887e"],[.5,"#e2ded2"],[1,"#706d64"]]);X.fillRect(x-2.4,y-48,4.8,15);dot(x,y-50,4,"#e2ded2");dot(x-1,y-51,1.5,"#fff");
 X.strokeStyle="rgba(255,255,255,.8)";X.lineWidth=1.5;X.lineCap="round";
 [-1,1].forEach(function(s){X.beginPath();X.moveTo(x,y-53);X.quadraticCurveTo(x+s*13,y-58,x+s*19,y-35);X.stroke();X.beginPath();X.moveTo(x+s*10,y-34);X.quadraticCurveTo(x+s*23,y-40,x+s*25,y-14);X.stroke()});X.lineCap="butt";
 [[-20,-12],[22,-11],[-6,-34],[8,-33]].forEach(function(o){dot(x+o[0],y+o[1],1.4,"rgba(255,255,255,.8)")})};
 
