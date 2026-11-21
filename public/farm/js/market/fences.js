// ---------- ANIMAL FENCES (stand on the EDGE of a tile and take no space) ----------
var FO=[[28,-14],[-28,-14],[-28,14],[28,14]]; // middle of the 4 tile edges: 0 back-right, 1 back-left, 2 front-left, 3 front-right
function isF(k){return typeof k==="string"&&(k.indexOf("f_")===0||k==="stoplight")}
function fOff(it){var r=(it.rot||0)&3;if(it.k==="stoplight")return[[0,-28],[56,0],[0,28],[-56,0]][r];return isCorner(it.k)?[[0,-14],[28,0],[0,14],[-28,0]][r]:FO[r]}
function fKey(it){var r=(it.rot||0)&3;if(it.k==="stoplight")return[-.9,0,.9,0][r];return isCorner(it.k)?[-.5,0,.5,0][r]:(r<2?-.5:.5)}
function fRot(k,t){var fx=t[0]-Math.floor(t[0]),fy=t[1]-Math.floor(t[1]),d=[fy,fx,1-fy,1-fx],b=0,i; // the edge (or corner) nearest to where you tapped
 if(isCorner(k)||k==="stoplight")return fy<.5?(fx<.5?0:1):(fx<.5?3:2);
 for(i=1;i<4;i++)if(d[i]<d[b])b=i;return b}
function fpost(x,y,h){X.fillStyle="rgba(10,25,5,.3)";X.beginPath();X.ellipse(x+2,y+1,4,1.8,0,0,7);X.fill();
 X.fillStyle="#8c6334";X.fillRect(x-3,y-h,3,h+1);X.fillStyle="#5f4122";X.fillRect(x,y-h,3,h+1);
 poly([[x-3,y-h],[x,y-h-1.7],[x+3,y-h],[x,y-h+1.7]],"#d6b070","#7a5630",.8)}
function frail(a,b){[8,16].forEach(function(z){poly([[a[0],a[1]-z-1.8],[b[0],b[1]-z-1.8],[b[0],b[1]-z+1.8],[a[0],a[1]-z+1.8]],"#a07440");
 X.strokeStyle="#d2ab6c";X.lineWidth=1;X.beginPath();X.moveTo(a[0],a[1]-z-1.8);X.lineTo(b[0],b[1]-z-1.8);X.stroke();
 X.strokeStyle="#55381b";X.lineWidth=1.3;X.beginPath();X.moveTo(a[0],a[1]-z+1.8);X.lineTo(b[0],b[1]-z+1.8);X.stroke()})}
function fseg(x,y,e,gate){var o=FO[e],ax=x+o[0],ay=y+o[1],s=e&1?-1:1,A=[ax-28*s,ay-14],B=[ax+28*s,ay+14],M=[ax,ay],k,P;
 P=function(t,z){return[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t-z]};
 if(!gate){frail(A,B);[A,M,B].sort(function(a,b){return a[1]-b[1]}).forEach(function(q){fpost(q[0],q[1],25)});return}
 poly([P(.06,5),P(.94,5),P(.94,24),P(.06,24)],"#efe0b6","#7a5630",1.2);
 X.strokeStyle="#a07440";X.lineWidth=1;X.beginPath();
 for(k=1;k<6;k++){X.moveTo(P(k/6,5)[0],P(k/6,5)[1]);X.lineTo(P(k/6,24)[0],P(k/6,24)[1])}
 X.moveTo(P(.06,5)[0],P(.06,5)[1]);X.lineTo(P(.94,24)[0],P(.94,24)[1]);X.stroke();
 [A,B].sort(function(a,b){return a[1]-b[1]}).forEach(function(q){fpost(q[0],q[1],30)})}
DEC.f_fence=function(p,st){fseg(p[0],p[1],(st||0)&3,0)};
DEC.f_gate=function(p,st){fseg(p[0],p[1],(st||0)&3,1)};
DEC.f_corner=function(p,st){[[0,1],[0,3],[2,3],[2,1]][(st||0)&3].slice().sort(function(a,b){return FO[a][1]-FO[b][1]}).forEach(function(e){fseg(p[0],p[1],e,0)})};
HB.f_fence=[-16,-38,16,8];HB.f_gate=[-16,-40,16,8];HB.f_corner=[-30,-38,30,8];
// ===== FENCE DESIGNS =====
function isCorner(k){return k==="f_corner"||/_c$/.test(k)}
function FPt(A,B,t,z){return[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t-z]}
function fQ(A,B,t0,t1,z0,z1,f,s,lw){poly([FPt(A,B,t0,z0),FPt(A,B,t1,z0),FPt(A,B,t1,z1),FPt(A,B,t0,z1)],f,s,lw)}
function fL(A,B,t0,z0,t1,z1,c,w){var a=FPt(A,B,t0,z0),b=FPt(A,B,t1,z1);X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke()}
function fPost(x,y,h,w,c1,c2,cap){X.fillStyle="rgba(10,25,5,.3)";X.beginPath();X.ellipse(x+2,y+1,w+1.5,1.8,0,0,7);X.fill();
 X.fillStyle=c1;X.fillRect(x-w,y-h,w,h+1);X.fillStyle=c2;X.fillRect(x,y-h,w,h+1);
 if(cap)poly([[x-w,y-h],[x,y-h-w*.6],[x+w,y-h],[x,y-h+w*.6]],cap,"rgba(0,0,0,.25)",.6)}
function fUp(q,h){return[q[0],q[1]-h]}
function fWall(A,B,h,top,front){var k=.13,tx=-(B[0]-A[0])*k/2,ty=(B[1]-A[1])*k/2,Af=[A[0]+tx,A[1]+ty],Bf=[B[0]+tx,B[1]+ty],Ar=[A[0]-tx,A[1]-ty],Br=[B[0]-tx,B[1]-ty];
 X.fillStyle="rgba(10,25,5,.28)";poly([Ar,Br,[Bf[0]+3,Bf[1]+2],[Af[0]+3,Af[1]+2]],"rgba(10,25,5,.28)");
 front(Af,Bf,h);
 poly([Br,Bf,fUp(Bf,h),fUp(Br,h)],cmul(top,.72),"rgba(0,0,0,.25)",.6);
 poly([fUp(Ar,h),fUp(Br,h),fUp(Bf,h),fUp(Af,h)],top,"rgba(0,0,0,.25)",.6)}
function stoneFront(A,B,h){var rn=mk(5),r,t,w,pal=["#a8a398","#948f84","#b8b2a4","#8a857b","#9f9a8c"];
 fQ(A,B,0,1,0,h,"#6a665c");
 for(r=0;r<3;r++){t=0;while(t<.98){w=.2+rn()*.16;if(t+w>.94)w=1-t;fQ(A,B,t+.01,t+w-.01,r*h/3+.6,(r+1)*h/3-.6,pal[Math.floor(rn()*5)],"rgba(40,35,28,.5)",.6);
  fL(A,B,t+.02,(r+1)*h/3-1.2,t+w-.02,(r+1)*h/3-1.2,"rgba(255,255,255,.22)",.8);t+=w}}}
function brickFront(A,B,h){var r,i,o,t,tt,bw=.25;fQ(A,B,0,1,0,h,"#d8cdb8");
 for(r=0;r<5;r++){o=r%2?-bw/2:0;for(i=0;i<5;i++){t=Math.max(0,o+i*bw);tt=Math.min(1,o+i*bw+bw);if(tt-t<.03)continue;
  fQ(A,B,t+.012,tt-.012,r*h/5+.5,(r+1)*h/5-.5,((r*3+i)%3===0)?"#a84a36":((r+i)%2?"#b5543f":"#c0604a"))}}
 fL(A,B,0,h-.5,1,h-.5,"rgba(255,255,255,.2)",.8)}
function concFront(A,B,h){var y0=Math.min(A[1],B[1])-h,y1=Math.max(A[1],B[1]);fQ(A,B,0,1,0,h,lg(0,y0,0,y1,[[0,"#d3d6da"],[1,"#a5a9af"]]));
 fQ(A,B,.07,.93,2.5,h-2.5,"rgba(0,0,0,.07)","rgba(0,0,0,.18)",.8);
 fL(A,B,.07,h-2.5,.93,h-2.5,"rgba(255,255,255,.45)",.8);
 fL(A,B,0,h*.5,1,h*.5,"rgba(0,0,0,.14)",.8)}
var FSTY={
rope:{n:"Rope",gc:["#d9b878","#7a5630"],lc:"#c8a45e",
 seg:function(A,B){[17,9].forEach(function(z){var a=FPt(A,B,0,z),b=FPt(A,B,1,z),m=FPt(A,B,.5,z-10);X.lineCap="round";X.strokeStyle="#9a7a3a";X.lineWidth=2.4;X.beginPath();X.moveTo(a[0],a[1]);X.quadraticCurveTo(m[0],m[1],b[0],b[1]);X.stroke();
   X.strokeStyle="#e0c27a";X.lineWidth=1;X.beginPath();X.moveTo(a[0],a[1]-.6);X.quadraticCurveTo(m[0],m[1]-.6,b[0],b[1]-.6);X.stroke();X.lineCap="butt"})},
 post:function(x,y,g){fPost(x,y,g?26:21,2.6,"#9a6e3a","#6a4a28","#c9a060")}},
bamboo:{n:"Bamboo",gc:["#c9d46a","#7a8a2c"],lc:"#a9bf4a",
 seg:function(A,B){var i,t;
  for(i=0;i<9;i++){t=(i+.5)/9;fL(A,B,t,1,t,26,"#9bb043",2.6);fL(A,B,t-.006,2,t-.006,25,"#d8e68e",.8);fL(A,B,t-.02,8,t+.02,8,"rgba(70,90,20,.7)",.8);fL(A,B,t-.02,17,t+.02,17,"rgba(70,90,20,.7)",.8)}
  fQ(A,B,0,1,9,11.5,"#8fa63a","#5f7020",.6);fQ(A,B,0,1,20,22.5,"#8fa63a","#5f7020",.6)},
 post:function(x,y,g){fPost(x,y,g?32:29,3,"#a9bf4a","#85992f","#d7e68a")}},
picket:{n:"Picket",gc:["#fbf8f0","#9a927c"],lc:"#f4efe2",
 seg:function(A,B){var i,t;fQ(A,B,0,1,5,8,"#e2dac6");fQ(A,B,0,1,15,18,"#e2dac6");
  for(i=0;i<8;i++){t=(i+.5)/8;poly([FPt(A,B,t-.042,2),FPt(A,B,t+.042,2),FPt(A,B,t+.042,21),FPt(A,B,t,24.5),FPt(A,B,t-.042,21)],"#fbf8f0","#b9b19b",.7);fL(A,B,t-.02,3,t-.02,20,"rgba(255,255,255,.7)",.8)}},
 post:function(x,y,g){fPost(x,y,g?30:26,3,"#fbf8f0","#d6cdb8","#ffffff")}},
log:{n:"Log",gc:["#9a6a38","#4a2e16"],lc:"#8a5a2e",
 seg:function(A,B){[5,12,19].forEach(function(z){var a=FPt(A,B,0,z),b=FPt(A,B,1,z);X.lineCap="round";
   X.strokeStyle="#5a3a1c";X.lineWidth=7;X.beginPath();X.moveTo(a[0],a[1]+.8);X.lineTo(b[0],b[1]+.8);X.stroke();
   X.strokeStyle="#8a5a2e";X.lineWidth=5.6;X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke();
   X.strokeStyle="#b98a52";X.lineWidth=1.6;X.beginPath();X.moveTo(a[0],a[1]-1.6);X.lineTo(b[0],b[1]-1.6);X.stroke();X.lineCap="butt"})},
 post:function(x,y,g){fPost(x,y,g?30:26,3.8,"#7a4e26","#5a3a1c","#c79a62")}},
hedge:{n:"Hedge",gc:["#3f8a2e","#1f5a1c"],lc:"#2f7a28",
 seg:function(A,B){var i,t,p,rn=mk(9);
  for(i=0;i<9;i++){t=(i+.5)/9;p=FPt(A,B,t,6);blob(p[0],p[1],8,["#3f8a2e","#1d5a1c"])}
  for(i=0;i<9;i++){t=(i+.5)/9;p=FPt(A,B,t,13);blob(p[0],p[1]-1,7.5,["#5fb040","#287a26"])}
  for(i=0;i<18;i++){p=FPt(A,B,rn(),5+rn()*13);dot(p[0],p[1],.9,rn()<.5?"rgba(190,240,120,.65)":"rgba(10,60,10,.4)")}
  for(i=0;i<3;i++){p=FPt(A,B,.15+i*.35,15+rn()*3);dot(p[0],p[1],1.5,i%2?"#ff7aa0":"#ffe14d")}},
 post:function(){}},
chain:{n:"Chain-link",gc:["#c4ccd3","#6a747d"],lc:"#9aa5af",
 seg:function(A,B){var i,rr;fQ(A,B,0,1,2,22,"rgba(190,200,210,.14)");
  for(rr=0;rr<2;rr++)for(i=0;i<10;i++){fL(A,B,i/10,2+rr*10,(i+1)/10,12+rr*10,"rgba(205,214,222,.8)",.7);fL(A,B,i/10,12+rr*10,(i+1)/10,2+rr*10,"rgba(205,214,222,.8)",.7)}
  fQ(A,B,0,1,21.2,23,"#8d98a3");fQ(A,B,0,1,1.5,3,"#8d98a3")},
 post:function(x,y,g){fPost(x,y,g?28:25,1.9,"#b4bec7","#7d8892","#d4dbe1")}},
iron:{n:"Iron",gc:["#2b2e35","#c9a84a"],lc:"#2a2d33",
 seg:function(A,B){var i,t,a;fQ(A,B,0,1,5.5,7.5,"#2a2d33");fQ(A,B,0,1,20,22,"#2a2d33");
  for(i=0;i<10;i++){t=(i+.5)/10;fL(A,B,t,2,t,25,"#2a2d33",1.5);a=FPt(A,B,t,25);poly([[a[0]-1.6,a[1]],[a[0],a[1]-4.5],[a[0]+1.6,a[1]]],"#2a2d33");fL(A,B,t-.006,3,t-.006,24,"rgba(255,255,255,.2)",.6)}},
 post:function(x,y,g){fPost(x,y,g?34:30,2.6,"#3a3e46","#1f2227","#2f333a");dot(x,y-(g?36:32),2.2,"#c9a84a")}},
stone:{n:"Stone Wall",gc:["#8f8a7e","#4e4a42"],lc:"#9a958a",
 seg:function(A,B){fWall(A,B,14,"#bdb8aa",stoneFront)},
 post:function(x,y,g){fPost(x,y,g?22:18,3.8,"#a39e92","#7d786d","#c4bfb1")}},
brick:{n:"Brick Wall",gc:["#a84a36","#4a2a22"],lc:"#b5543f",
 seg:function(A,B){fWall(A,B,14,"#a44b38",brickFront)},
 post:function(x,y,g){fPost(x,y,g?22:18,3.8,"#b5543f","#8f3f2e","#c9604a")}},
concrete:{n:"Concrete Wall",gc:["#b7bbc0","#5f646b"],lc:"#b4b8be",
 seg:function(A,B){fWall(A,B,16,"#e1e4e7",concFront)},
 post:function(x,y,g){fPost(x,y,g?24:20,4,"#c7cace","#9a9ea5","#e8ebee")}}
};
function fGate(A,B,S){var k,a,b,h=S.gh||22,c=S.gc;
 fQ(A,B,.06,.94,4,h+2,c[0],c[1],1.2);
 X.strokeStyle=c[1];X.lineWidth=1;X.beginPath();
 for(k=1;k<6;k++){a=FPt(A,B,.06+.88*k/6,4);b=FPt(A,B,.06+.88*k/6,h+2);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}
 a=FPt(A,B,.06,4);b=FPt(A,B,.94,h+2);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke()}
function fsegS(x,y,e,gate,S){var o=FO[e],ax=x+o[0],ay=y+o[1],s=e&1?-1:1,A=[ax-28*s,ay-14],B=[ax+28*s,ay+14];
 if(!gate)S.seg(A,B);else fGate(A,B,S);
 [A,B].sort(function(a,b){return a[1]-b[1]}).forEach(function(q){S.post(q[0],q[1],gate)})}
Object.keys(FSTY).forEach(function(id){var S=FSTY[id];
 DEC["f_"+id]=function(p,st){fsegS(p[0],p[1],(st||0)&3,0,S)};
 DEC["f_"+id+"_g"]=function(p,st){fsegS(p[0],p[1],(st||0)&3,1,S)};
 DEC["f_"+id+"_c"]=function(p,st){[[0,1],[0,3],[2,3],[2,1]][(st||0)&3].slice().sort(function(a,b){return FO[a][1]-FO[b][1]}).forEach(function(e){fsegS(p[0],p[1],e,0,S)})};
 HB["f_"+id]=[-16,-38,16,8];HB["f_"+id+"_g"]=[-16,-40,16,8];HB["f_"+id+"_c"]=[-30,-38,30,8]});

// ---------- PERIMETER FENCE: one picture per design, stamped along the edge (fast) ----------
var PFN="wood",PSP={};
function pfOf(cv){return(cv&&cv.id==="vCanvas"?(V&&V.pf):(S&&S.pf))||"wood"}
function pseg(sid,o,dpr){var key=sid+"|"+o+"|"+dpr,r=PSP[key],Sy,c,cx,oX,m=12,H=50,W=56+2*m,A,B;if(r)return r;
 Sy=FSTY[sid];c=document.createElement("canvas");c.width=Math.round(W*dpr);c.height=Math.round((H+36)*dpr);
 cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);oX=X;X=cx;
 A=o?[m+56,H]:[m,H];B=o?[m,H+28]:[m+56,H+28];
 try{Sy.seg(A,B);[A,B].sort(function(a,b){return a[1]-b[1]}).forEach(function(q){Sy.post(q[0],q[1],0)})}finally{X=oX}
 return PSP[key]={c:c,ax:A[0],ay:A[1],w:W,h:H+36}}
function fenceP(s,front){var q=s.q,Sy=FSTY[PFN],o=(s.ed==="r0"||s.ed==="r1")?0:1,n=s.b-s.a,A0,k,k0,k1,r,px,py,sg=o?-1:1,lo,hi,a,b;
 A0=o===0?Pp(s.a,s.ed==="r0"?q.r0:q.r1):Pp(s.ed==="c0"?q.c0:q.c1,s.a);
 if(LOD>1){a=A0;b=[A0[0]+sg*56*n,A0[1]+28*n];if(Math.max(a[0],b[0])<VW.x0||Math.min(a[0],b[0])>VW.x1||b[1]<VW.y0||a[1]>VW.y1)return;
  X.strokeStyle=Sy.lc;X.lineWidth=4;X.beginPath();X.moveTo(a[0],a[1]-8);X.lineTo(b[0],b[1]-8);X.stroke();return}
 lo=o?(A0[0]-VW.x1-80)/56:(VW.x0-80-A0[0])/56;hi=o?(A0[0]-VW.x0+80)/56:(VW.x1+80-A0[0])/56;
 lo=Math.max(lo,(VW.y0-40-A0[1])/28);hi=Math.min(hi,(VW.y1+60-A0[1])/28);
 k0=Math.max(0,Math.floor(lo)-1);k1=Math.min(n-1,Math.ceil(hi)+1);
 r=pseg(PFN,o,CSD);
 for(k=k0;k<=k1;k++){px=A0[0]+sg*56*k;py=A0[1]+28*k;X.drawImage(r.c,px-r.ax,py-r.ay,r.w,r.h)}}
function pthumb(id){var key="pt|"+id,u=PSP[key],dpr=2,c,cx,oX,ow,r,k;if(u)return u;
 c=document.createElement("canvas");c.width=Math.round(120*dpr);c.height=Math.round(84*dpr);cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 cx.fillStyle="#79bd45";cx.fillRect(0,0,120,84);
 if(id==="wood"){oX=X;X=cx;ow=VW;VW={x0:-999,x1:999,y0:-999,y1:999};cx.save();cx.translate(10,40);cx.scale(.7,.7);try{fence([0,0],[56,28],2,0);fence([56,28],[112,56],2,0)}finally{cx.restore();X=oX;VW=ow}}
 else{r=pseg(id,0,dpr);cx.save();cx.translate(10,6);cx.scale(.7,.7);for(k=0;k<2;k++)cx.drawImage(r.c,56*k,28*k,r.w,r.h);cx.restore()}
 return PSP[key]=c.toDataURL()}

