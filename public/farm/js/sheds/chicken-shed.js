 DEC.chickenshed=function(p){var x=p[0],y=p[1],lu=40,lv=30,h=20,f=BFp(x,y,lu,lv),k,a,b,q,F,L,R,B,aF,aR,M,r=13,c0,q2,q3,u,
 Lp=function(t,z){return LPt(f,lv,t,z)},Rp=function(t,z){return RPt(f,lu,t,z)},
 ql=function(t0,t1,z0,z1,fl,st,lw){poly([Lp(t0,z0),Lp(t1,z0),Lp(t1,z1),Lp(t0,z1)],fl,st,lw)},
 qr=function(t0,t1,z0,z1,fl,st,lw){poly([Rp(t0,z0),Rp(t1,z0),Rp(t1,z1),Rp(t0,z1)],fl,st,lw)},
 ln=function(p1,p2,c,w){X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.moveTo(p1[0],p1[1]);X.lineTo(p2[0],p2[1]);X.stroke()},
 lerp=function(a1,b1,t1){return[a1[0]+(b1[0]-a1[0])*t1,a1[1]+(b1[1]-a1[1])*t1]},
 chick=function(cx2,cy2,s){dot(cx2,cy2-3*s,3.1*s,"#ffe27a");dot(cx2+2.6*s,cy2-5.6*s,2.1*s,"#ffee9a");poly([[cx2+4.4*s,cy2-5.8*s],[cx2+6.4*s,cy2-5*s],[cx2+4.4*s,cy2-4.4*s]],"#f08a1a");dot(cx2+3.2*s,cy2-6.2*s,.5*s,"#222");X.strokeStyle="#e8902a";X.lineWidth=.8;X.beginPath();X.moveTo(cx2-.6*s,cy2-.4*s);X.lineTo(cx2-.6*s,cy2);X.moveTo(cx2+1*s,cy2-.4*s);X.lineTo(cx2+1*s,cy2);X.stroke()};
 shade(p,50,17,.32);
 ibx(x,y,lu+3,lv+3,3,"#7e7a70","#a29e92","#b8b4a8");
 ibx(x,y-3,lu,lv,h-3,"#c9a05a","#e2bd78","#f0d598");
 X.strokeStyle="rgba(90,55,15,.32)";X.lineWidth=1;X.beginPath();
 for(k=1;k<14;k++){a=Lp(k/14,3);b=Lp(k/14,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(k/14,3);b=Rp(k/14,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 ql(0,1,3,8,"rgba(0,0,0,.10)");qr(0,1,h-5,h,"rgba(0,0,0,.16)");ql(0,1,h-5,h,"rgba(0,0,0,.2)");
 /* left wall: two shuttered windows */
 [[.18,.4],[.6,.82]].forEach(function(w){ql(w[0],w[1],9,17,"#4a2e14","#fff4dc",1.4);ql(w[0]+.025,w[1]-.025,9.8,16.2,"#a9d8ee");
  ln(Lp((w[0]+w[1])/2,9.8),Lp((w[0]+w[1])/2,16.2),"#fff4dc",1);ln(Lp(w[0]+.025,13),Lp(w[1]-.025,13),"#fff4dc",1);
  ql(w[0]-.07,w[0],9,17,"#c9473f","rgba(0,0,0,.3)",.7);ql(w[1],w[1]+.07,9,17,"#c9473f","rgba(0,0,0,.3)",.7)});
 /* right wall: big double door with white braces */
 qr(.06,.46,3,17.2,"#7a3a1e","#fff4dc",1.4);
 qr(.08,.26,3.6,16.6,"#a85a32");qr(.26,.44,3.6,16.6,"#a85a32");
 ln(Rp(.08,3.6),Rp(.26,16.6),"#fff4dc",1.2);ln(Rp(.08,16.6),Rp(.26,3.6),"#fff4dc",1.2);
 ln(Rp(.26,3.6),Rp(.44,16.6),"#fff4dc",1.2);ln(Rp(.26,16.6),Rp(.44,3.6),"#fff4dc",1.2);
 ln(Rp(.26,3),Rp(.26,17),"#3a1a0a",1.5);
 q=Rp(.24,10);dot(q[0],q[1],1.1,"#e0cb82");q=Rp(.28,10);dot(q[0],q[1],1.1,"#e0cb82");
 /* right wall: pop-hole + ramp */
 q2=Rp(.62,0);q3=Rp(.76,0);
 poly([Rp(.62,6),Rp(.76,6),[q3[0]+12,q3[1]+6],[q2[0]+12,q2[1]+6]],"#b88650","#5a3a1c",1);
 for(k=1;k<4;k++)ln(lerp(Rp(.62,6),[q2[0]+12,q2[1]+6],k/4),lerp(Rp(.76,6),[q3[0]+12,q3[1]+6],k/4),"#5a3a1c",1);
 poly([Rp(.62,6),Rp(.76,6),Rp(.76,12),Rp(.69,14.6),Rp(.62,12)],"#1a0c06","#fff4dc",1.3);
 /* roof geometry */
 q=BFp(x,y,lu+4,lv+4);F=[q[0],q[1]-(h+1)];L=[F[0]-(lv+4),F[1]-(lv+4)/2];R=[F[0]+lu+4,F[1]-(lu+4)/2];B=[R[0]-(lv+4),R[1]-(lv+4)/2];
 aF=[(F[0]+L[0])/2,(F[1]+L[1])/2-r];aR=[(R[0]+B[0])/2,(R[1]+B[1])/2-r];
 /* gable with planks + egg vent */
 poly([F,L,aF],"#e8c887","rgba(0,0,0,.35)",.9);
 X.strokeStyle="rgba(90,55,15,.35)";X.lineWidth=.9;X.beginPath();
 for(k=1;k<10;k++){a=lerp(F,L,k/10);b=k<5?lerp(F,aF,k/5):lerp(L,aF,(10-k)/5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 poly([F,L,aF],lg(0,aF[1],0,F[1],[[0,"rgba(255,240,200,.1)"],[1,"rgba(60,30,0,.3)"]]));
 c0=[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.45];
 X.fillStyle="#fff7e6";X.beginPath();X.ellipse(c0[0],c0[1],4,4.8,0,0,7);X.fill();X.fillStyle="#3a2210";X.beginPath();X.ellipse(c0[0],c0[1]+.4,2.6,3.3,0,0,7);X.fill();
 /* roof slope: terracotta shingles */
 poly([F,R,aR,aF],lg((F[0]+R[0])/2,(F[1]+R[1])/2,(aF[0]+aR[0])/2,(aF[1]+aR[1])/2,[[0,"#a8452f"],[1,"#dc7650"]]),"rgba(0,0,0,.35)",.9);
 for(k=1;k<6;k++)ln(lerp(F,aF,k/6),lerp(R,aR,k/6),"rgba(70,20,10,.4)",1);
 for(k=0;k<6;k++)for(a=0;a<10;a++){u=(a+(k%2?.5:0))/10;if(u>1)continue;ln(lerp(lerp(F,aF,k/6),lerp(R,aR,k/6),u),lerp(lerp(F,aF,(k+1)/6),lerp(R,aR,(k+1)/6),u),"rgba(70,20,10,.26)",.8)}
 poly([F,R,[R[0],R[1]+2.6],[F[0],F[1]+2.6]],"#fff4dc","rgba(0,0,0,.3)",.6);
 ln(F,aF,"#fff4dc",2);ln(L,aF,"#e8dcc0",2);ln(aF,aR,"#fff0d0",2.8);
 /* little cupola + rooster weathervane */
 M=lerp(aF,aR,.55);ibx(M[0],M[1]+2,10,8,7,"#d9c9a0","#f2e6c4","#fff6dc");groof(M[0],M[1]+2,12,10,7,5,"#a8452f","#c9603f");
 ln([M[0],M[1]-10],[M[0],M[1]-19],"#2a1a0c",1.2);ln([M[0]-5,M[1]-15],[M[0]+5,M[1]-15],"#2a1a0c",1);
 poly([[M[0]+5,M[1]-15],[M[0]+7.5,M[1]-18],[M[0]+7.5,M[1]-14]],"#d9322a");
 /* in front: hens, chicks and an egg basket */
 X.fillStyle="#9a6a30";X.beginPath();X.ellipse(x-4,y+27,7,3.4,0,0,Math.PI);X.fill();X.strokeStyle="#5a3a1c";X.lineWidth=.8;X.beginPath();X.ellipse(x-4,y+27,7,2.2,0,0,7);X.stroke();
 dot(x-6.5,y+26,2,"#fff7e6");dot(x-2.5,y+25.5,2,"#f4e2c0");dot(x-4.2,y+24.4,1.9,"#fff");
 hen2(x+24,y+18,1.15);hen2(x-26,y+14,1);chick(x+7,y+26,1.2);chick(x+14,y+28,1);chick(x-13,y+24,1.1)};
function chickDlg(shId){var sd=dcById(shId),dlg=$("dlg"),body=$("dlgBody"),W=640,H=Math.min(1300,Math.round(640*Math.max(300,innerHeight-252)/Math.min(innerWidth-32,560))),FY0=H*.4,FY1=H*.95,cv,cx,bgM,bgL,bgR,hens=[],raf=0,last=0,alive=true,shPt=[],sig="",lastSig=0,seed=11,rm=0,pos=0,swp=0,kids={},tx0=0,ty0=0,tOn=false,Z=1.4,ZK=1.9,
 CK=["#ffe27a","#fff0a8","#f6c85a","#ffd966","#f0d8a8"],
 PAL=[{m:"#f7f3e8",d:"#d8d0bb",l:"#ffffff",w:"#e6dec8",t:"#cfc6ae",sp:null},{m:"#b8602a",d:"#7a3a14",l:"#d8863a",w:"#8f4418",t:"#4a2a14",sp:null},{m:"#8a8378",d:"#4e4a42",l:"#b8b0a0",w:"#6a645a",t:"#2a2824",sp:"#f2eee2"},{m:"#2e2c30",d:"#141316",l:"#4a4850",w:"#1c1a1e",t:"#0e0d10",sp:null},{m:"#e2b26a",d:"#b08040",l:"#f2cf8c",w:"#c4924c",t:"#8a5c28",sp:null}];
 if(!sd)return;
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
 function SH(){return dcById(shId)||sd}
 function close(){alive=false;cancelAnimationFrame(raf);document.removeEventListener("keydown",kh,true);dlg.style.display="none";body.style.cssText="";dlg.onclick=null}
 function ripe(c){var f=FTD[c.k];return !!f&&nowT()-(c.t||0)>=f.ms}
 function hensIn(){var o=[];(SH().cw||[]).forEach(function(id){var c=dcById(id);if(c&&c.s&&o.length<5)o.push(c)});return o}
 function barnHens(){return stored().filter(function(s){var o=s.t==="d"&&dcById(s.id);return o&&o.k==="a_chicken"})}
 function henK(c){return Z*(1.25+(c.y-FY0)/(FY1-FY0)*.55)}
 function newHen(c,i){return{id:c.id,x:90+rnd()*(W-180),y:FY0+14+rnd()*(FY1-FY0-18),dir:rnd()<.5?-1:1,st:"idle",t:rnd()*2,tx:0,ty:0,ph:rnd()*6,hd:0,tp:rnd()*6,pal:PAL[i%PAL.length],hop:0}}
 /* ---------- the room: wooden coop with nest boxes, perch, straw floor, window light ---------- */
 function mkBg(ew){var b=document.createElement("canvas"),g=b.getContext("2d"),ix=0,iy=36,by=FY0-4,n,i,x,y,t,gg,bw=(W-2*ix)/5,px;b.width=W;b.height=H;
  function poly(p,f){g.beginPath();p.forEach(function(q,j){j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fillStyle=f;g.fill()}
  function ln(x1,y1,x2,y2,c,w){if((x1<1&&x2<1)||(x1>W-1&&x2>W-1))return;g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
  function vg(y1,y2,a,c){var q=g.createLinearGradient(0,y1,0,y2);q.addColorStop(0,a);q.addColorStop(1,c);return q}
  function hg(x1,x2,a,c){var q=g.createLinearGradient(x1,0,x2,0);q.addColorStop(0,a);q.addColorStop(1,c);return q}
  function hs(k){var v=Math.sin(k*12.9898)*43758.5453;return v-Math.floor(v)}
  g.fillStyle=vg(by,H,"#dcc078","#c9a24c");g.fillRect(0,by-2,W,H-by+2);
  for(n=0;n<=12;n++){x=ix+(W-2*ix)*n/12;ln(x,by,x,H,"rgba(110,75,20,.18)",2)}
  for(i=0;i<420;i++){x=hs(i)*W;y=by+hs(i+700)*(H-by);ln(x,y,x+7+hs(i+9)*9,y+(hs(i+3)-.5)*4,i%3?"rgba(250,230,150,.6)":"rgba(130,90,25,.5)",1.3)}
  poly([[0,0],[W,0],[W-ix,iy],[ix,iy]],vg(0,iy,"#2a1a0c","#6a4524"));
  [.12,.3,.5,.7,.88].forEach(function(f){ln(W*f,0,ix+(W-2*ix)*f,iy,"#3a2411",10);ln(W*f-3,0,ix+(W-2*ix)*f-1.5,iy,"rgba(255,215,150,.25)",2)});
  g.fillStyle=vg(0,16,"#6a4524","#3a2411");g.fillRect(0,0,W,16);
  g.fillStyle=vg(iy,by,"#d6b97a","#b48e52");g.fillRect(ix,iy,W-2*ix,by-iy);
  for(x=ix;x<=W-ix;x+=24){ln(x,iy,x,by,"rgba(70,40,10,.3)",1.6);ln(x+2,iy,x+2,by,"rgba(255,240,200,.18)",1)}
  g.fillStyle=hg(ix,ix+120,"rgba(30,15,0,.32)","rgba(0,0,0,0)");g.fillRect(ix,iy,120,by-iy);
  g.fillStyle=hg(W-ix-120,W-ix,"rgba(0,0,0,0)","rgba(30,15,0,.32)");g.fillRect(W-ix-120,iy,120,by-iy);
  endWall(g,W,H,by,ew,"hen");poly([[0,0],[ix,iy],[ix,by],[0,by+46]],hg(0,ix,"#3a2412","#9a7442"));
  poly([[W,0],[W-ix,iy],[W-ix,by],[W,by+46]],hg(W-ix,W,"#9a7442","#3a2412"));
  for(n=1;n<8;n++){t=n/8;ln(0,(by+46)*t,ix,iy+(by-iy)*t,"rgba(30,15,0,.45)",2);ln(W,(by+46)*t,W-ix,iy+(by-iy)*t,"rgba(30,15,0,.45)",2)}
  ln(0,by+46,ix,by,"#2a1a0c",5);ln(W,by+46,W-ix,by,"#2a1a0c",5);
  g.fillStyle=vg(by,by+60,"rgba(60,35,5,.4)","rgba(60,35,5,0)");g.fillRect(0,by,W,60);
  /* window + light shaft */
  poly([[120,40],[220,40],[340,FY0+70],[170,FY0+70]],"rgba(255,236,170,.15)");
  g.fillStyle="#bfe0f2";g.fillRect(126,40,88,58);g.fillStyle="#8fbf5a";g.fillRect(126,80,88,18);
  g.strokeStyle="#5a3a1c";g.lineWidth=7;g.strokeRect(122,36,96,66);ln(170,38,170,100,"#5a3a1c",5);ln(124,69,216,69,"#5a3a1c",4);
  g.fillStyle=vg(102,112,"#8a5c30","#3a2411");g.fillRect(114,102,112,9);
  /* perch beam */
  y=by-176;g.fillStyle="rgba(0,0,0,.3)";g.fillRect(ix-2,y+8,W-2*ix+4,8);g.fillStyle=vg(y,y+10,"#c4915a","#6a4524");g.fillRect(ix-2,y,W-2*ix+4,10);ln(ix-2,y+1,W-ix+2,y+1,"rgba(255,235,190,.6)",1.5);
  [ix+16,W-ix-24].forEach(function(p2){g.fillStyle=hg(p2,p2+8,"#7a5230","#3a2411");g.fillRect(p2,y,8,by-y)});
  /* 5 nest boxes with numbers, straw and eggs */
  g.font="bold 15px sans-serif";g.textAlign="center";g.textBaseline="middle";
  for(n=0;n<5;n++){x=ix+bw*n+9;y=by-104;px=bw-12;
   g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x+4,y+6,px,64);
   g.fillStyle=vg(y,y+62,"#b0793c","#6a4524");g.fillRect(x,y,px,62);g.strokeStyle="#3a2411";g.lineWidth=2;g.strokeRect(x,y,px,62);
   g.fillStyle=vg(y+8,y+48,"#150b04","#4a3418");g.fillRect(x+7,y+9,px-14,40);
   g.fillStyle="#e6c46a";g.fillRect(x+7,y+39,px-14,10);
   for(i=0;i<10;i++)ln(x+9+hs(n*20+i)*(px-20),y+40+hs(n*20+i+5)*8,x+16+hs(n*20+i)*(px-20),y+42+hs(n*20+i+9)*6,i%2?"rgba(255,240,170,.8)":"rgba(140,95,20,.6)",1.3);
   if(hs(n+3)>.35){g.fillStyle="#f6efe0";g.beginPath();g.ellipse(x+px*.35,y+39,6,7.5,0,0,7);g.fill();g.fillStyle="rgba(120,90,50,.3)";g.beginPath();g.ellipse(x+px*.35+2,y+41,3,4,0,0,7);g.fill()}
   if(hs(n+9)>.55){g.fillStyle="#f2e2c0";g.beginPath();g.ellipse(x+px*.65,y+40,5.5,7,0,0,7);g.fill()}
   g.fillStyle=vg(y+49,y+59,"#9a6a38","#5a3a1c");g.fillRect(x-3,y+49,px+6,10);ln(x-3,y+50,x+px+3,y+50,"rgba(255,235,190,.5)",1.4);
   poly([[x-6,y],[x+px/2,y-14],[x+px+6,y]],"#a8452f");ln(x-6,y,x+px/2,y-14,"#fff0d0",1.5);ln(x+px/2,y-14,x+px+6,y,"#5a2010",1.5);
   g.fillStyle="#fff4dc";g.fillText(String(n+1),x+px/2,y-4)}
  g.textBaseline="alphabetic";
  /* hay bale (left) + feeder + water fount (right) */
  g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(52,FY0+52,48,8,0,0,7);g.fill();
  g.fillStyle=vg(FY0+10,FY0+46,"#ecc760","#c9992f");g.fillRect(14,FY0+10,70,36);
  for(i=0;i<22;i++)ln(14+hs(i)*70,FY0+10+hs(i+50)*36,22+hs(i)*70,FY0+10+hs(i+50)*36+(hs(i+3)-.5)*3,i%2?"rgba(120,80,15,.35)":"rgba(255,235,150,.45)",1.2);
  ln(36,FY0+10,36,FY0+46,"#6b4a14",2);ln(64,FY0+10,64,FY0+46,"#6b4a14",2);
  poly([[14,FY0+10],[28,FY0-3],[98,FY0-3],[84,FY0+10]],"#f7e08a");
  g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(W-192,FY0+34,40,8,0,0,7);g.fill();
  g.fillStyle="#8a9096";g.beginPath();g.ellipse(W-192,FY0+28,36,9,0,0,7);g.fill();g.fillStyle="#e8c040";g.beginPath();g.ellipse(W-192,FY0+26,29,6,0,0,7);g.fill();
  poly([[W-200,FY0-34],[W-184,FY0-34],[W-182,FY0+24],[W-202,FY0+24]],hg(W-200,W-184,"#cfd4da","#8a9096"));
  poly([[W-206,FY0-34],[W-178,FY0-34],[W-192,FY0-52]],"#c9473f");
  g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(W-96,FY0+36,30,6,0,0,7);g.fill();
  g.fillStyle="#7a8086";g.fillRect(W-124,FY0+26,56,9);g.fillStyle="rgba(190,225,245,.85)";g.fillRect(W-116,FY0-14,40,42);g.fillStyle="#5aa6d4";g.fillRect(W-116,FY0+8,40,20);
  g.fillStyle="#c9473f";g.beginPath();g.ellipse(W-96,FY0-14,22,10,0,Math.PI,0);g.fill();ln(W-110,FY0-8,W-110,FY0+24,"rgba(255,255,255,.55)",2);
  /* lantern + vignette */
  ln(W/2,0,W/2,42,"#1a0f06",2.5);poly([[W/2-5,40],[W/2+5,40],[W/2+14,53],[W/2-14,53]],vg(40,53,"#5a3a1c","#2a1a0c"));
  gg=g.createRadialGradient(W/2-3,55,1,W/2,57,10);gg.addColorStop(0,"#fffbe0");gg.addColorStop(1,"#f2b84a");g.fillStyle=gg;g.beginPath();g.arc(W/2,57,9,0,7);g.fill();
  gg=g.createRadialGradient(W/2,56,6,W/2,56,270);gg.addColorStop(0,"rgba(255,215,130,.34)");gg.addColorStop(1,"rgba(255,215,130,0)");g.fillStyle=gg;g.fillRect(0,0,W,FY0+150);
  gg=g.createLinearGradient(0,0,0,H);gg.addColorStop(0,"rgba(0,0,0,.3)");gg.addColorStop(.35,"rgba(0,0,0,0)");gg.addColorStop(.7,"rgba(0,0,0,0)");gg.addColorStop(1,"rgba(0,0,0,.34)");g.fillStyle=gg;g.fillRect(0,0,W,H);
  return b}
 /* ---------- a 3D-shaded hen (also used for growing chicks) ---------- */
 function drawHen(c,t,kk,rp){var wk=c.st==="walk",P=c.pal,bob=wk?Math.abs(Math.sin(c.ph))*1.4:Math.sin(t*2+c.tp)*.3,pk=c.hd,ta=pk*.3,rx=-2+9*Math.cos(ta)+11*Math.sin(ta),ry=-10+9*Math.sin(ta)-11*Math.cos(ta),nA=-1.24+pk*2.3,nL=10.6+pk*1.4,hx=rx+Math.cos(nA)*nL,hy=ry+Math.sin(nA)*nL+(wk?Math.sin(c.ph*2)*1.1:0),br=1+Math.sin(t*2.3+c.tp)*.015,tw=Math.sin(t*3+c.tp)*.05,g,i;
  function leg(lx,ph,col){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph))*3:0,kx=lx+s*2.2,fx=lx+s*4.2,fy=-1-l;
   cx.lineCap="round";cx.lineJoin="round";cx.strokeStyle=col;cx.lineWidth=2;cx.beginPath();cx.moveTo(lx,-10);cx.lineTo(kx,-5-l*.3);cx.lineTo(fx,fy);cx.stroke();
   cx.lineWidth=1.4;cx.beginPath();cx.moveTo(fx,fy);cx.lineTo(fx+4.4,fy+.3);cx.moveTo(fx,fy);cx.lineTo(fx+2.6,fy+2);cx.moveTo(fx,fy);cx.lineTo(fx-2.4,fy+.6);cx.stroke()}
  cx.save();cx.translate(c.x,c.y);cx.scale(c.dir*kk,kk);
  cx.save();cx.scale(1,.2);g=cx.createRadialGradient(0,0,1,0,0,20);g.addColorStop(0,"rgba(0,0,0,.45)");g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,20,0,7);cx.fill();cx.restore();
  cx.translate(0,-bob);
  leg(-4.5,c.ph+Math.PI,"#c78a1c");
  cx.save();cx.translate(-2,-10);cx.rotate(ta);cx.translate(2,10);
  for(i=0;i<4;i++){cx.save();cx.translate(-12,-21);cx.rotate(-2.5+i*.3+tw);cx.fillStyle=i%2?P.t:P.d;cx.beginPath();cx.ellipse(8,0,9,3.6,0,0,7);cx.fill();cx.restore()}
  cx.save();cx.translate(0,-17);cx.scale(br,br);cx.translate(0,17);
  g=cx.createLinearGradient(0,-28,0,-7);g.addColorStop(0,P.l);g.addColorStop(.45,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.beginPath();cx.ellipse(0,-17,14.5,10,-.1,0,7);cx.fill();
  g=cx.createRadialGradient(8,-18,1,8,-18,9);g.addColorStop(0,P.l);g.addColorStop(1,"rgba(255,255,255,0)");cx.fillStyle=g;cx.beginPath();cx.ellipse(8,-17,8,8.5,0,0,7);cx.fill();
  if(P.sp){cx.fillStyle=P.sp;for(i=0;i<16;i++)cx.fillRect(-11+(i*7)%22,-24+(i*5)%13,1.3,1.3)}
  cx.fillStyle=P.w;cx.beginPath();cx.ellipse(-1.5,-17,8.5,5.8,-.25,0,7);cx.fill();
  cx.strokeStyle="rgba(0,0,0,.22)";cx.lineWidth=.8;for(i=0;i<3;i++){cx.beginPath();cx.moveTo(-8+i*1.5,-15+i*2.4);cx.quadraticCurveTo(-1,-14+i*2.6,5,-17+i*1.8);cx.stroke()}
  cx.fillStyle="rgba(255,255,255,.16)";cx.beginPath();cx.ellipse(1,-23,9,2.6,-.1,0,7);cx.fill();
cx.restore();cx.restore();
leg(3.5,c.ph,"#e0a028");
  cx.lineCap="round";cx.strokeStyle=P.m;cx.lineWidth=8;cx.beginPath();cx.moveTo(rx,ry);cx.quadraticCurveTo(rx+Math.cos(nA)*nL*.5+Math.sin(nA)*2.5*(1-pk),ry+Math.sin(nA)*nL*.5-Math.cos(nA)*2.5*(1-pk),hx-1,hy+2);cx.stroke();
  cx.strokeStyle=P.l;cx.lineWidth=3.2;cx.beginPath();cx.moveTo(rx+1,ry);cx.quadraticCurveTo(rx+1+Math.cos(nA)*nL*.5+Math.sin(nA)*2.5*(1-pk),ry+Math.sin(nA)*nL*.5-Math.cos(nA)*2.5*(1-pk),hx,hy+2);cx.stroke();
  cx.save();cx.translate(hx,hy);cx.rotate(pk*1.0);cx.translate(-hx,-hy);
  g=cx.createRadialGradient(hx-1.3,hy-1.5,.5,hx,hy,5.4);g.addColorStop(0,P.l);g.addColorStop(1,P.m);cx.fillStyle=g;cx.beginPath();cx.arc(hx,hy,4.7,0,7);cx.fill();
  cx.fillStyle="#d9322a";[[-2.5,-5],[.3,-6.3],[3,-5.2]].forEach(function(o){cx.beginPath();cx.arc(hx+o[0],hy+o[1],2.1,0,7);cx.fill()});
  cx.fillStyle="#f0a21a";cx.beginPath();cx.moveTo(hx+4,hy-1.4);cx.lineTo(hx+9.6,hy+.6);cx.lineTo(hx+4,hy+1.4);cx.closePath();cx.fill();
  cx.fillStyle="#cf8410";cx.beginPath();cx.moveTo(hx+4,hy+.8);cx.lineTo(hx+8.4,hy+1.1);cx.lineTo(hx+4,hy+2.4);cx.closePath();cx.fill();
  cx.fillStyle="#d9322a";cx.beginPath();cx.ellipse(hx+3.4,hy+4,1.5,2.4,0,0,7);cx.fill();
  cx.fillStyle="#f4efe6";cx.beginPath();cx.ellipse(hx-1.4,hy+1.6,1.4,1,0,0,7);cx.fill();
  cx.fillStyle="#1a1208";cx.beginPath();cx.arc(hx+1.7,hy-1,1.05,0,7);cx.fill();cx.fillStyle="#fff";cx.beginPath();cx.arc(hx+2,hy-1.35,.38,0,7);cx.fill();
  cx.restore();cx.restore();
  if(rp){cx.font="22px sans-serif";cx.textAlign="center";cx.fillText("\uD83E\uDD5A",c.x,c.y-50*kk+Math.sin(t*4+c.tp)*3)}}
 /* ---------- a fluffy baby chick ---------- */
 function drawChick(c,t,kk){var wk=c.st==="walk",pk=c.hd,hop=wk?Math.abs(Math.sin(c.ph*1.3))*3.5:(c.st==="idle"?Math.abs(Math.sin(t*2.6+c.tp))*.6:0),hx=6.5+pk*3,hy=-15+pk*8,cc=c.cc||"#ffe27a",g;
  cx.save();cx.translate(c.x,c.y);cx.scale(c.dir*kk,kk);
  cx.save();cx.scale(1,.22);g=cx.createRadialGradient(0,0,1,0,0,11);g.addColorStop(0,"rgba(0,0,0,.42)");g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,11,0,7);cx.fill();cx.restore();
  cx.translate(0,-hop);
  cx.strokeStyle="#f09a2a";cx.lineWidth=1.5;cx.lineCap="round";[-2,2.5].forEach(function(lx,j){var s=wk?Math.sin(c.ph*1.3+j*Math.PI)*2:0;cx.beginPath();cx.moveTo(lx,-5);cx.lineTo(lx+s,0);cx.lineTo(lx+s+2.6,0);cx.stroke()});
  cx.fillStyle=cc;cx.beginPath();cx.moveTo(-6,-9);cx.lineTo(-10.5,-12);cx.lineTo(-7,-6);cx.closePath();cx.fill();
  g=cx.createRadialGradient(-1.5,-12,1,0,-8,9);g.addColorStop(0,"#fffbe0");g.addColorStop(.45,cc);g.addColorStop(1,"#d9a838");cx.fillStyle=g;cx.beginPath();cx.ellipse(0,-8,8.2,7.4,0,0,7);cx.fill();
  cx.fillStyle="rgba(214,160,40,.55)";cx.beginPath();cx.ellipse(-1.5,-8.5,4.6,3.2,-.3,0,7);cx.fill();
  g=cx.createRadialGradient(hx-1.5,hy-2,.5,hx,hy,6);g.addColorStop(0,"#fffbe0");g.addColorStop(.5,cc);g.addColorStop(1,"#e0b040");cx.fillStyle=g;cx.beginPath();cx.arc(hx,hy,5.2,0,7);cx.fill();
  cx.strokeStyle=cc;cx.lineWidth=1.3;cx.beginPath();cx.moveTo(hx-1,hy-5);cx.lineTo(hx-2.4,hy-8);cx.moveTo(hx+1,hy-5);cx.lineTo(hx+1.6,hy-8.2);cx.stroke();
  cx.fillStyle="#f08a1a";cx.beginPath();cx.moveTo(hx+4.5,hy-1);cx.lineTo(hx+8.6,hy+.8);cx.lineTo(hx+4.5,hy+2);cx.closePath();cx.fill();
  cx.fillStyle="rgba(255,140,120,.45)";cx.beginPath();cx.arc(hx+1.2,hy+2.3,1.5,0,7);cx.fill();
  cx.fillStyle="#1a1208";cx.beginPath();cx.arc(hx+2,hy-1,1.15,0,7);cx.fill();cx.fillStyle="#fff";cx.beginPath();cx.arc(hx+2.35,hy-1.4,.4,0,7);cx.fill();
  cx.restore()}
 function upd(arr,dt,t,sp){arr.forEach(function(c){var dx,dy,d,r;c.t-=dt;if(c.hop>0)c.hop=Math.max(0,c.hop-dt);
  if(c.st==="walk"){dx=c.tx-c.x;dy=c.ty-c.y;d=Math.hypot(dx,dy);if(d<3){c.st="idle";c.t=1+rnd()*2.5}else{c.x+=dx/d*sp*dt;c.y+=dy/d*sp*.64*dt;c.dir=dx>=0?1:-1;c.ph+=dt*9}}
  else if(c.t<=0){r=rnd();if(r<.4){c.st="walk";c.tx=60+rnd()*(W-120);c.ty=FY0+14+rnd()*(FY1-FY0-18)}else if(r<.8){c.st="graze";c.t=1.5+rnd()*2.5}else{c.st="idle";c.t=1+rnd()*2}}
  c.hd+=((c.st==="graze"?(Math.sin(t*11+c.tp)>-.2?1:.15):0)-c.hd)*Math.min(1,dt*10)})}
 function sync(){var L=hensIn(),old={};hens.forEach(function(c){old[c.id]=c});hens=L.map(function(c,i){return old[c.id]||newHen(c,i)})}
 /* ---------- chicks (side rooms) ---------- */
 function chickList(r){var h=SH();return h.cc?(h.cf||[]).filter(function(q){return q.r===r}):[]}
 function chickTick(){var h=SH(),c=h.cc,L,l,now=nowT();if(!c)return;L=h.cf=h.cf||[];
  if(hensIn().length<1||L.length>=10){h.nx=0;return}
  if(!h.nx)h.nx=now+c.b;
  while(h.nx<=now&&L.length<10){l=L.filter(function(q){return q.r<0}).length;h.cn=(h.cn||0)+1;L.push({i:"c"+h.cn,b:h.nx,r:l<=L.length-l?-1:1,m:0});h.nx+=c.b}
  if(L.length>=10)h.nx=0}
 function kid(q){var k=kids[q.i],n,num=parseInt(q.i.slice(1),10)||0;if(!k){k=kids[q.i]=newHen({id:"k_"+q.i},num);k.cc=CK[num%CK.length];
  n=(SH().cf||[]).filter(function(z){return z.r===q.r&&(parseInt(z.i.slice(1),10)||0)<num}).length;
  k.hx=W*(n%5+.5)/5;k.hy=FY0+(FY1-FY0)*(.3+.4*(n%2));k.x=k.hx;k.y=k.hy}return k}
 function kidsUpd(dt,t){var a=(SH().cf||[]).map(kid);function cl(){a.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))})}cl();upd(a,dt,t,34);cl()}
 function kidGrow(q){return Math.min(1,Math.max(0,(nowT()-q.b)/SH().cc.g))}
 function drawKid(q,t){var c=SH().cc,k=kid(q),now=nowT(),g=kidGrow(q),rdy=g>=1&&(!q.m||now-q.m>=c.m),kk=1.25+(k.y-FY0)/(FY1-FY0)*.55,by,nm=g<.5?"Chick":"Young";
  if(g<.5){by=k.y-26*ZK*kk*(.9+g*.5)-14;drawChick(k,t,ZK*kk*(.9+g*.5))}
  else{k.pal=PAL[(parseInt(q.i.slice(1),10)||0)%PAL.length];drawHen(k,t,Z*kk*(.55+.45*g),rdy);by=k.y-44*Z*kk*(.55+.45*g)-16}
  if(g<1){cx.save();cx.textAlign="center";cx.fillStyle="rgba(0,0,0,.55)";cx.fillRect(k.x-20,by,40,6);cx.fillStyle="#8be37f";cx.fillRect(k.x-19,by+1,38*g,4);cx.font="bold 11px sans-serif";cx.lineWidth=3;cx.strokeStyle="rgba(0,0,0,.7)";cx.fillStyle="#fff";cx.strokeText(nm,k.x,by-3);cx.fillText(nm,k.x,by-3);cx.restore()}}
 function milkKid(q){var c=SH().cc,now=nowT(),k=kid(q);
  if(now-q.b<c.g){toast("\uD83D\uDC25 Still growing: grown-up in "+fmtDur(c.g-(now-q.b)));return}
  if(q.m&&now-q.m<c.m){toast("Next egg in "+fmtDur(c.m-(now-q.m)));return}
  invAdd("y:"+sd.k,1);S.xp+=c.x;q.m=now;lvlUp();paint();toast("\uD83E\uDD5A Egg collected! +"+c.x+" XP, stored in barn");shBurst(k,c.y,rm*W);send("farmCalfMilk",[TOKEN,shId,q.i]);tm()}
 function kidTap(px,py){var best=null,bd=1e9;chickList(rm).forEach(function(q){var k=kid(q),g=kidGrow(q),kk=1.25+(k.y-FY0)/(FY1-FY0)*.55,s=g<.5?ZK*kk*(.9+g*.5):Z*kk*(.55+.45*g),w=Math.max(34,22*s),hh=Math.max(46,38*s),d=Math.abs(px-k.x)+Math.abs(py-(k.y-hh*.5));
   if(Math.abs(px-k.x)<w&&py>k.y-hh&&py<k.y+12&&d<bd){bd=d;best=q}});
  if(best)milkKid(best)}
   function grownKids(){var c=SH().cc,now=nowT();return c?chickList(rm).filter(function(q){return now-q.b>=c.g}).length:0}
 function kidHarvest(){var c=SH().cc,now=nowT(),n=0;if(!c)return;chickList(rm).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){n++;milkKid(q)}});if(!n)toast("No eggs ready yet.")}
 function kidMove(toShed){var h=SH(),c=h.cc,now=nowT(),L=chickList(rm),q=null,i,m=1e18,id2,o;if(!c)return;
  for(i=0;i<L.length;i++){if(now-L[i].b>=c.g){q=L[i];break}m=Math.min(m,c.g-(now-L[i].b))}
  if(!q){toast(L.length?"\uD83D\uDC25 No fully grown chick yet. Next grown-up in "+fmtDur(m):"No chicks in this room.");return}
  if(toShed&&hensIn().length>=5){toast("The chicken shed is full (5 chickens).");return}
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  o={id:id2,k:"a_chicken",c:0,r:0,s:1,t:now};S.dc.push(o);
  h.cf=(h.cf||[]).filter(function(z){return z!==q});kids={};
  if(toShed)h.cw=(h.cw||[]).concat([id2]);
  send("farmCalfOut",[TOKEN,shId,q.i,id2,toShed?1:0]);
  paint();sync();rows();toast(toShed?"\uD83D\uDC14 Grown chick moved into the chicken room ("+hensIn().length+"/5)":"\uD83D\uDC14 Grown chick moved to your barn")}
 function tmSide(){var c=SH().cc,L=chickList(rm),now=nowT(),rdy=0,nm=1e18,ng=1e18,a;if(!c)return"";
  L.forEach(function(q){a=now-q.b;if(a<c.g)ng=Math.min(ng,c.g-a);else if(!q.m||now-q.m>=c.m)rdy++;else nm=Math.min(nm,c.m-(now-q.m))});
  if(rdy)return"\uD83E\uDD5A Egg ready: "+rdy+" (tap the chick)";
  if(ng<1e18)return"Next grown-up in "+fmtDur(ng);
  if(nm<1e18)return"Next egg in "+fmtDur(nm);
  return SH().nx?"Next chick in "+fmtDur(Math.max(0,SH().nx-now)):"Put a chicken in the shed to start a family"}
 function tm(){chickTick();var L=hensIn(),f=FTD.a_chicken,best=1e18,rp=0,e=$("ckTime");if(!e)return;
  if(rm){e.textContent=tmSide();return}
  L.forEach(function(c){var el=nowT()-(c.t||0);if(f&&el>=f.ms)rp++;else if(f)best=Math.min(best,f.ms-el)});
  e.textContent=!L.length?"":rp?"\uD83E\uDD5A Eggs ready: "+rp:"Next eggs in "+fmtDur(best)}
 function rows(){var L=hensIn(),nb=barnHens().length;$("ckSub").textContent=rm?(chickList(rm).length?"Chick room \u00B7 "+chickList(rm).length+"/5":"Empty room \u00B7 0/5"):L.length+"/5 chickens";
$("ckPlus").style.opacity=rm?((grownKids()&&L.length<5)?"1":".35"):((L.length>=5||!nb)?".35":"1");$("ckMinus").style.opacity=rm?(grownKids()?"1":".35"):(L.length?"1":".35");sig=L.map(function(c){return c.id+ripe(c)}).join();tm()}
 /* ---------- effects ---------- */
 function shBurst(cc,sell,ox){var i,a,s,bx=cc.x+(ox||0),by=cc.y-34*Z*(1.25+(cc.y-FY0)/(FY1-FY0)*.55);cc.hop=.5;
  shPt.push({ty:"glow",x:bx,y:by,r:80,a:1});shPt.push({ty:"ring",x:bx,y:by,r:8,a:.9,w:5,g:150});
  for(i=0;i<9;i++){a=-Math.PI/2+(Math.random()-.5)*2.2;s=110+Math.random()*150;shPt.push({ty:"egg",x:bx,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:3.5+Math.random()*2,a:1,life:.9+Math.random()*.4})}
  for(i=0;i<10;i++){a=Math.random()*6.283;s=40+Math.random()*110;shPt.push({ty:"spark",x:bx,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,r:5+Math.random()*5,a:1,life:.7+Math.random()*.5,rot:Math.random()*3})}
  for(i=0;i<4;i++)shPt.push({ty:"coin",x:bx+(Math.random()-.5)*30,y:by-10,vx:(Math.random()-.5)*120,vy:-190-Math.random()*90,r:8,a:1,life:1.2,ph:Math.random()*6});
  shPt.push({ty:"txt",x:bx,y:by-50,txt:"+1 \uD83D\uDCE6",a:1.6,age:0})}
 function shFx(dt){var i,j,p,rr,sc,g;cx.save();shPt=shPt.filter(function(p2){return p2.a>0});
  for(i=0;i<shPt.length;i++){p=shPt[i];cx.globalAlpha=1;
   if(p.ty==="glow"){p.a-=dt*1.8;g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,"rgba(255,244,190,"+Math.max(0,p.a*.8)+")");g.addColorStop(1,"rgba(255,244,190,0)");cx.fillStyle=g;cx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2)}
   else if(p.ty==="ring"){p.r+=p.g*dt;p.a-=dt*1.5;cx.globalAlpha=Math.max(0,p.a);cx.strokeStyle="#fff6c8";cx.lineWidth=Math.max(.5,p.w*p.a);cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.stroke()}
   else if(p.ty==="egg"){p.vy+=460*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#fffaf0";cx.strokeStyle="rgba(150,120,70,.9)";cx.lineWidth=1.2;cx.beginPath();cx.ellipse(p.x,p.y,p.r*.8,p.r,0,0,7);cx.fill();cx.stroke()}
   else if(p.ty==="spark"){p.vx*=.97;p.vy=p.vy*.97+50*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.rot+=dt*3;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.globalAlpha=Math.max(0,p.a);cx.globalCompositeOperation="lighter";cx.fillStyle="#ffe58a";cx.beginPath();for(j=0;j<8;j++){rr=j%2?p.r*.28:p.r;cx.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}cx.closePath();cx.fill();cx.restore()}
   else if(p.ty==="coin"){p.vy+=560*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.ph+=dt*11;rr=Math.max(.8,Math.abs(Math.cos(p.ph))*p.r);cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#ffd23f";cx.strokeStyle="#a8740a";cx.lineWidth=1.6;cx.beginPath();cx.ellipse(p.x,p.y,rr,p.r,0,0,7);cx.fill();cx.stroke()}
   else if(p.ty==="txt"){p.age+=dt;p.a-=dt*.8;p.y-=36*dt;sc=p.age<.2?.5+p.age*4.5:1.4-Math.min(.4,(p.age-.2)*1.2);cx.save();cx.translate(p.x,p.y);cx.scale(sc,sc);cx.globalAlpha=Math.min(1,Math.max(0,p.a));cx.font="bold 26px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="#7a4a10";cx.fillStyle="#fff6c2";cx.strokeText(p.txt,0,0);cx.fillText(p.txt,0,0);cx.restore()}}
  cx.restore()}
 function nightFx(){if(!document.body.classList.contains("night"))return;cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var g2=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);g2.addColorStop(0,"rgba(255,200,90,.55)");g2.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=g2;cx.fillRect(0,0,W,H);cx.fillStyle="#070d26";cx.fillRect(126,40,88,58);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
 function drawSides(t){[-1,1].forEach(function(r){var im=r<0?bgL:bgR,n,x,y=FY0+(FY1-FY0)*.42,L;if(!im||Math.abs(r-pos)>=1)return;
  cx.save();cx.translate((r-pos)*W,0);cx.drawImage(im,0,0);
  
  L=chickList(r);
  if(!L.length){cx.font="bold 28px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="rgba(40,20,5,.8)";cx.fillStyle="#fff";cx.strokeText("Empty room",W/2,FY0+(FY1-FY0)*.75);cx.fillText("Empty room",W/2,FY0+(FY1-FY0)*.75)}
  else L.slice().sort(function(p,q){return kid(p).y-kid(q).y}).forEach(function(q){drawKid(q,t)});
  nightFx();cx.restore()})}
 function frame(ts){var t=ts/1000,dt;if(!alive)return;if(dlg.style.display!=="flex"||!$("ckCv")){alive=false;return}
  dt=Math.min(.05,(ts-last)/1000||.016);last=ts;upd(hens,dt,t,24);if(pos)kidsUpd(dt,t);pos+=(rm-pos)*Math.min(1,dt*9);if(Math.abs(rm-pos)<.003)pos=rm;
  cx.clearRect(0,0,W,H);drawSides(t);cx.save();cx.translate(-pos*W,0);cx.drawImage(bgM,0,0);
  hens.slice().sort(function(a,b){return a.y-b.y}).forEach(function(c){var hp=c.hop>0?Math.sin((1-c.hop/.5)*Math.PI)*14:0,cd=dcById(c.id);cx.save();cx.translate(0,-hp);drawHen(c,t,henK(c),!!cd&&ripe(cd));cx.restore()});
  nightFx();shFx(dt);cx.restore();
  if(ts-lastSig>500){lastSig=ts;if(sig!==hensIn().map(function(c){return c.id+ripe(c)}).join()){sync();rows()}else if(rm)rows();else tm()}
  raf=requestAnimationFrame(frame)}
 function collect(id){var c=dcById(id),f=c&&FTD[c.k],was=c&&ripe(c),cc;if(!c)return;tapTree(c);
  if(was){cc=hens.filter(function(q){return q.id===id})[0];if(cc)shBurst(cc,f.sell,0)}rows()}
 /* ---------- dialog layout ---------- */
 body.style.cssText="max-width:560px;margin-top:100px;margin-bottom:120px;padding:0;background:transparent!important;border:0;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;overflow:hidden";
 var BS="border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;text-shadow:0 2px 6px #000;";
 body.innerHTML="<div style='position:relative'><canvas id='ckCv' style='width:100%;display:block;border-radius:18px;touch-action:manipulation'></canvas><button id='ckX' style='position:absolute;top:8px;right:8px;z-index:5;min-width:84px;height:46px;padding:0 16px;border-radius:23px;background:rgba(0,0,0,.3);font:bold 18px sans-serif;"+BS+"'>Close</button><div id='ckSub' style='position:absolute;top:10px;left:0;right:0;text-align:center;font:bold 22px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div id='ckTime' style='position:absolute;top:42px;left:0;right:0;text-align:center;font:bold 14px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div style='position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:20px'><button id='ckMinus' style='width:56px;height:56px;border-radius:50%;font:bold 32px sans-serif;line-height:1;"+BS+"'>-</button><button id='ckHarv' style='height:56px;padding:0 18px;border-radius:28px;font:bold 16px sans-serif;"+BS+"'>Collect</button><button id='ckPlus' style='width:56px;height:56px;border-radius:50%;font:bold 32px sans-serif;line-height:1;"+BS+"'>+</button></div></div>";
 dlg.style.display="flex";cv=$("ckCv");var dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cx=cv.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 bgM=mkBg();bgL=mkBg(-1);bgR=mkBg(1);sync();rows();
 var wrap=body.firstChild,ctl=$("ckMinus").parentNode,dots=document.createElement("div"),aL=document.createElement("button"),aR=document.createElement("button"),ast="position:absolute;top:46%;z-index:4;width:42px;height:64px;padding:0;border-radius:21px;border:2px solid rgba(255,255,255,.85);background:rgba(0,0,0,.3);color:#fff;font:bold 30px sans-serif;line-height:1;text-shadow:0 2px 6px #000;transition:opacity .2s";
 aL.id="ckL";aL.textContent="\u2039";aL.style.cssText=ast+";left:6px";aR.id="ckR";aR.textContent="\u203A";aR.style.cssText=ast+";right:6px";
 dots.style.cssText="position:absolute;top:68px;left:0;right:0;display:flex;justify-content:center;gap:8px;pointer-events:none";dots.innerHTML="<i></i><i></i><i></i>";
 wrap.appendChild(aL);wrap.appendChild(aR);wrap.appendChild(dots);ctl.style.transition="opacity .2s";
 function roomUI(){aL.style.opacity=rm>-1?"1":"0";aL.style.pointerEvents=rm>-1?"auto":"none";aR.style.opacity=rm<1?"1":"0";aR.style.pointerEvents=rm<1?"auto":"none";
  ctl.style.opacity="1";ctl.style.pointerEvents="auto";
  [].forEach.call(dots.children,function(d,i){d.style.cssText="width:9px;height:9px;border-radius:50%;box-shadow:0 1px 4px #000;background:"+(i===rm+1?"#fff":"rgba(255,255,255,.4)")})}
 function goRoom(d){var n=Math.max(-1,Math.min(1,rm+d));if(n===rm)return;rm=n;roomUI();rows()}
 aL.onclick=function(){goRoom(-1)};aR.onclick=function(){goRoom(1)};
 wrap.addEventListener("touchstart",function(ev){if(ev.touches.length!==1||(ev.target.closest&&ev.target.closest("button"))){tOn=false;return}tOn=true;tx0=ev.touches[0].clientX;ty0=ev.touches[0].clientY},{passive:true});
 wrap.addEventListener("touchend",function(ev){var t0,dx,dy;if(!tOn)return;tOn=false;t0=ev.changedTouches[0];dx=t0.clientX-tx0;dy=t0.clientY-ty0;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swp=Date.now();goRoom(dx<0?1:-1)}},{passive:true});
 function kh(ev){if(!alive||dlg.style.display!=="flex"||!$("ckCv")){document.removeEventListener("keydown",kh,true);return}
  if(ev.key==="ArrowLeft"){ev.preventDefault();ev.stopPropagation();goRoom(-1)}else if(ev.key==="ArrowRight"){ev.preventDefault();ev.stopPropagation();goRoom(1)}}
 document.addEventListener("keydown",kh,true);roomUI();
 cv.onclick=function(e){if(Math.abs(pos-rm)>.01||Date.now()-swp<400)return;var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W,py=(e.clientY-r.top)/r.height*H,best=null,bd=1e9;
  if(rm){kidTap(px,py);return}
  hens.forEach(function(c){var kk=henK(c),d=Math.abs(px-c.x)+Math.abs(py-(c.y-20*kk));if(Math.abs(px-c.x)<Math.max(30,20*kk)&&py>c.y-44*kk&&py<c.y+8&&d<bd){bd=d;best=c}});
  if(best)collect(best.id)};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),id,o,L,bc;if(ev.target===dlg){close();return}if(!b)return;
   if(rm&&(b.id==="ckHarv"||b.id==="ckPlus"||b.id==="ckMinus")){if(b.id==="ckHarv")kidHarvest();else kidMove(b.id==="ckPlus");return}
  if(b.id==="ckX"){close();return}
  if(b.id==="ckPlus"){L=hensIn();bc=barnHens();if(L.length>=5){toast("The chicken shed is full (5 chickens).");return}if(!bc.length){toast("No chickens in your barn. Buy a chicken in the Market.");return}
   o=dcById(bc[0].id);SH().cw=(SH().cw||[]).concat([o.id]);send("farmCowIn",[TOKEN,o.id,shId]);paint();sync();rows();toast("\uD83D\uDC14 Chicken moved into the shed ("+hensIn().length+"/5)");return}
  if(b.id==="ckHarv"){var n=0;hensIn().forEach(function(c){if(ripe(c)){n++;collect(c.id)}});if(!n)toast("No eggs ready yet.");return}
  if(b.id==="ckMinus"){L=hensIn();if(!L.length){toast("No chickens in the shed.");return}id=L[L.length-1].id;SH().cw=(SH().cw||[]).filter(function(q){return q!==id});send("farmCowOut",[TOKEN,id]);paint();sync();rows();toast("Chicken moved to your barn")}};
 raf=requestAnimationFrame(frame)}
