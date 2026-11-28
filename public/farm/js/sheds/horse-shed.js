/* ===== MAP =====
FILE: farm/js/sheds/horse-shed.js
WHAT: The Horse Shed (a stable). Footprint, the outside 3D stable picture (red barn, slate roof, cupola with weathervane, horses at the door), the buy rule for horses, and the inside window: 5 horses with 3D shading that walk, trot, graze, toss their heads and swish their tails, two foal rooms (swipe or use the arrows), and Horse hair as the product to harvest.
DEFINES: FOOT.horseshed, HB.horseshed, DEC.horseshed, buyHorseShed, horseDlg
USES: render/iso-engine.js (X, poly, lg, dot, shade, ibx, BFp, LPt, RPt, DEC), sheds/shed-sizes.js (FOOT), game/decorate-mode.js (HB, dcById, stored, freeTile), game/game-screen.js (S, paint, nowT, fmtDur, invAdd, lvlUp), core/02-helpers-api.js (toast), game/save-queue.js (send), market/market-core.js (tapTree, FTD), sheds/shed-helpers.js (shedWithRoom, shedCows)
USED BY: market/market-core.js (buyItem calls buyHorseShed when a horse is bought), render/trees-art.js (tapping a horse shed opens horseDlg), sheds/big-building-tiles.js (draws DEC.horseshed at its big size), addons/harvest-dialog.js and addons/harvest-button.js (harvest all)
LOAD: farm.html: after sheds/chicken-shed.js and BEFORE sheds/big-building-tiles.js (the footprint must exist first)
BACK END: data/items.ts (horseshed item), logic/items-and-placement.ts (FARM_FOOT.horseshed), logic/sheds-core.ts (isShed_, calfCfg_), actions/sheds.ts (farmCowIn, farmCalfOut)
===== */
/* ===== HORSE SHED: same logic as the pig shed (5 horses inside, foals in the side rooms, Horse hair to harvest) ===== */
/* ===== HORSE SHED: footprint + realistic 3D picture (red barn boards, fieldstone base, slate roof, cupola, horses at the door) ===== */
FOOT.horseshed=2;HB.horseshed=[-37,-68,37,22];
DEC.horseshed=function(p){var x=p[0],y=p[1],lu=40,lv=30,h=22,f=BFp(x,y,lu,lv),k,a,b,q,t,F,L,R,B,aF,aR,M,r=12,
 Lp=function(t,z){return LPt(f,lv,t,z)},Rp=function(t,z){return RPt(f,lu,t,z)},
 ql=function(t0,t1,z0,z1,fl,st,lw){poly([Lp(t0,z0),Lp(t1,z0),Lp(t1,z1),Lp(t0,z1)],fl,st,lw)},
 qr=function(t0,t1,z0,z1,fl,st,lw){poly([Rp(t0,z0),Rp(t1,z0),Rp(t1,z1),Rp(t0,z1)],fl,st,lw)},
 ln=function(p1,p2,c,w){X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.moveTo(p1[0],p1[1]);X.lineTo(p2[0],p2[1]);X.stroke()},
  /* a horse looking out of the stable door: long face, white blaze, ears up, mane, halter */
  horseHead=function(px,py,sc,P){X.save();X.translate(px,py);X.scale(sc,sc);
   X.fillStyle=lg(-17,0,17,0,[[0,P.d],[.5,P.m],[1,P.d]]);X.beginPath();X.moveTo(-18,64);X.lineTo(-12,8);X.lineTo(12,8);X.lineTo(18,64);X.closePath();X.fill();
   X.fillStyle=P.k;[-1,1].forEach(function(s){X.beginPath();X.moveTo(s*13,-19);X.quadraticCurveTo(s*25,0,s*20,36);X.lineTo(s*9,12);X.closePath();X.fill()});
   [-1,1].forEach(function(s){X.fillStyle=lg(0,-24,0,-42,[[0,P.m],[1,P.d]]);X.beginPath();X.moveTo(s*5,-23);X.lineTo(s*12,-41);X.lineTo(s*14,-22);X.closePath();X.fill();X.fillStyle=P.n;X.beginPath();X.moveTo(s*7.4,-25);X.lineTo(s*11.6,-36);X.lineTo(s*12.4,-24);X.closePath();X.fill()});
   X.fillStyle=lg(-14,0,14,0,[[0,P.d],[.32,P.m],[.68,P.m],[1,P.d]]);X.beginPath();X.moveTo(-10,-24);X.bezierCurveTo(-16,-8,-12,14,-9,26);X.bezierCurveTo(-7,36,7,36,9,26);X.bezierCurveTo(12,14,16,-8,10,-24);X.bezierCurveTo(5,-29,-5,-29,-10,-24);X.closePath();X.fill();
   if(P.b){X.fillStyle="#f6efe2";X.beginPath();X.moveTo(-3,-26);X.lineTo(3,-26);X.bezierCurveTo(5,-6,5.4,12,6.6,28);X.lineTo(-6.6,28);X.bezierCurveTo(-5.4,12,-5,-6,-3,-26);X.closePath();X.fill()}
   X.fillStyle=lg(-14,0,14,0,[[0,"rgba(20,6,0,.3)"],[.3,"rgba(0,0,0,0)"],[.7,"rgba(0,0,0,0)"],[1,"rgba(20,6,0,.3)"]]);X.beginPath();X.moveTo(-10,-24);X.bezierCurveTo(-16,-8,-12,14,-9,26);X.bezierCurveTo(-7,36,7,36,9,26);X.bezierCurveTo(12,14,16,-8,10,-24);X.bezierCurveTo(5,-29,-5,-29,-10,-24);X.closePath();X.fill();
   X.fillStyle="#1a0f0a";[-10.4,10.4].forEach(function(u){X.beginPath();X.ellipse(u,-9,2.5,3.2,0,0,7);X.fill()});X.fillStyle="#fff";[-9.6,11.2].forEach(function(u){X.beginPath();X.arc(u,-10,.9,0,7);X.fill()});
   X.fillStyle=lg(0,18,0,36,[[0,P.b?"#e9dccb":P.m],[1,P.d]]);X.beginPath();X.ellipse(0,27,8.6,7.4,0,0,7);X.fill();
   X.fillStyle="#2a1410";[-3.6,3.6].forEach(function(u){X.beginPath();X.ellipse(u,27,1.7,2.6,u<0?.3:-.3,0,7);X.fill()});
   X.strokeStyle="#6a3d1c";X.lineWidth=2.4;X.beginPath();X.moveTo(-9.5,-4);X.quadraticCurveTo(0,6,9.5,-4);X.moveTo(-8,20);X.quadraticCurveTo(0,26,8,20);X.stroke();
   X.fillStyle="#d8b24a";X.beginPath();X.arc(-9.5,-4,1.6,0,7);X.arc(9.5,-4,1.6,0,7);X.fill();
   X.strokeStyle=P.k;X.lineWidth=2.6;X.lineCap="round";for(k=-2;k<=2;k++){X.beginPath();X.moveTo(k*2.6,-27);X.quadraticCurveTo(k*3.4,-20,k*2.2,-12);X.stroke()}
   X.fillStyle="rgba(255,255,255,.4)";X.beginPath();X.ellipse(-2.6,-17,1.3,5,.2,0,7);X.fill();X.restore()};
 shade(p,50,17,.32);
 /* stone slab + fieldstone base + red barn boards with white trim */
 ibx(x,y,lu+3,lv+3,3,"#7e7a70","#a29e92","#b8b4a8");
 ibx(x,y-3,lu,lv,6,"#6f6a60","#8a8478","#a09a8c");
 ibx(x,y-9,lu,lv,h-9,"#8c2d24","#b03a2e","#c9483a");
 /* stone courses on the base */
 X.strokeStyle="rgba(40,12,6,.42)";X.lineWidth=.8;X.beginPath();
 [5,7].forEach(function(z){a=Lp(0,z);b=Lp(1,z);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(0,z);b=Rp(1,z);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});
 for(k=1;k<14;k++){a=Lp(k/14,3);b=Lp(k/14,5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(k/14,3);b=Rp(k/14,5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Lp((k+.5)/14,5);b=Lp((k+.5)/14,7);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp((k+.5)/14,5);b=Rp((k+.5)/14,7);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Lp(k/14,7);b=Lp(k/14,9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(k/14,7);b=Rp(k/14,9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 ln(Lp(0,9),Lp(1,9),"#4a463e",1.4);ln(Rp(0,9),Rp(1,9),"#4a463e",1.4);
 /* wall light and shadow */
 ql(0,1,9,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,9)[0],Lp(.5,9)[1],[[0,"rgba(255,240,210,.12)"],[1,"rgba(40,25,10,.32)"]]));
 qr(0,1,9,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,9)[0],Rp(.5,9)[1],[[0,"rgba(255,245,220,.2)"],[1,"rgba(40,25,10,.22)"]]));
 ql(0,1,3,9,"rgba(0,0,0,.14)");
 /* board and batten lines */
 X.strokeStyle="rgba(50,8,4,.4)";X.lineWidth=1;X.beginPath();
 for(k=1;k<16;k++){a=Lp(k/16,9);b=Lp(k/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(k/16,9);b=Rp(k/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 X.strokeStyle="rgba(255,205,185,.22)";X.beginPath();
 for(k=1;k<16;k++){a=Lp((k+.16)/16,9);b=Lp((k+.16)/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp((k+.16)/16,9);b=Rp((k+.16)/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 /* left wall: two white-framed windows with a flower box, and a horseshoe sign */
 [[.12,.38],[.62,.88]].forEach(function(w){ql(w[0],w[1],11,19,"#f7f2e6","rgba(0,0,0,.4)",.9);ql(w[0]+.022,w[1]-.022,11.9,18.1,lg(Lp(.5,18)[0],Lp(.5,18)[1],Lp(.5,12)[0],Lp(.5,12)[1],[[0,"#c9e6f4"],[1,"#7fb2cc"]]));
  ln(Lp((w[0]+w[1])/2,11.9),Lp((w[0]+w[1])/2,18.1),"#f7f2e6",1);ln(Lp(w[0]+.022,15),Lp(w[1]-.022,15),"#f7f2e6",1);
  ql(w[0]+.03,w[0]+.11,12,14.5,"rgba(255,255,255,.28)");
  ql(w[0]-.02,w[1]+.02,9.2,11,"#6b4a2a","rgba(0,0,0,.4)",.7);
  for(k=0;k<5;k++){q=Lp(w[0]+.02+k*(w[1]-w[0]-.04)/4,11.6);dot(q[0],q[1],1.3,k%2?"#e0485a":"#f08aa0");dot(q[0]-1,q[1]+.8,.9,"#4f8a3a")}});
  q=Lp(.5,15.4);dot(q[0],q[1],4.8,"#5a3a1a");dot(q[0],q[1],4,"#e9cf86");X.strokeStyle="#7a5a1c";X.lineWidth=1.5;X.lineCap="round";X.beginPath();X.arc(q[0],q[1]+.4,2.2,Math.PI*1.25,Math.PI*1.75,true);X.stroke();X.beginPath();X.arc(q[0],q[1]+.4,2.2,-.25*Math.PI,1.25*Math.PI,false);X.stroke();X.lineCap="butt";
 /* right wall: closed brown door, open stable door with horses */
 qr(.05,.35,3.2,17.4,"#f7f2e6","rgba(0,0,0,.35)",.8);
 qr(.075,.325,3.5,16.9,lg(Rp(.2,17)[0],Rp(.2,17)[1],Rp(.2,3.5)[0],Rp(.2,3.5)[1],[[0,"#7a5430"],[1,"#4a3020"]]));
 X.strokeStyle="rgba(30,14,4,.55)";X.lineWidth=.8;X.beginPath();for(k=1;k<6;k++){a=Rp(.075+.25*k/6,3.5);b=Rp(.075+.25*k/6,16.9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 ln(Rp(.075,3.8),Rp(.325,16.6),"#f7f2e6",1.2);ln(Rp(.075,10),Rp(.325,10),"#f7f2e6",1.2);ln(Rp(.075,16.6),Rp(.325,16.6),"#f7f2e6",1.2);ln(Rp(.075,3.8),Rp(.325,3.8),"#f7f2e6",1.2);
 q=Rp(.31,10);dot(q[0],q[1],1.1,"#c9b25a");
 qr(.40,.95,3.2,h-1,"#f7f2e6","rgba(0,0,0,.35)",.8);
 qr(.43,.92,6.6,h-3.2,lg(Rp(.5,h-3.2)[0],Rp(.5,h-3.2)[1],Rp(.5,6.6)[0],Rp(.5,6.6)[1],[[0,"#0e0907"],[1,"#4a3220"]]));
 qr(.43,.7,6.6,h-3.2,"rgba(255,215,140,.16)");
 X.save();X.beginPath();[Rp(.43,6.6),Rp(.92,6.6),Rp(.92,h-3.2),Rp(.43,h-3.2)].forEach(function(c,i){i?X.lineTo(c[0],c[1]):X.moveTo(c[0],c[1])});X.closePath();X.clip();
 q=Rp(.55,11.6);horseHead(q[0],q[1],.27,{m:"#8d4f2b",d:"#5b3017",k:"#1c120a",n:"#d9a08a",b:1});
 q=Rp(.79,11.4);horseHead(q[0],q[1],.26,{m:"#dcae62",d:"#ab7a35",k:"#f6ecd2",n:"#e8b8a2",b:0});X.restore();
 qr(.43,.92,h-6.6,h-3.2,lg(Rp(.5,h-3.2)[0],Rp(.5,h-3.2)[1],Rp(.5,h-6.6)[0],Rp(.5,h-6.6)[1],[[0,"rgba(0,0,0,.5)"],[1,"rgba(0,0,0,0)"]]));
 qr(.43,.92,3.2,6.8,lg(Rp(.5,6.8)[0],Rp(.5,6.8)[1],Rp(.5,3.2)[0],Rp(.5,3.2)[1],[[0,"#7a5430"],[1,"#4a3020"]]),"rgba(0,0,0,.4)",.8);
 X.strokeStyle="rgba(30,14,4,.55)";X.lineWidth=.8;X.beginPath();for(k=1;k<9;k++){a=Rp(.43+.49*k/9,3.2);b=Rp(.43+.49*k/9,6.8);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 ln(Rp(.43,6.8),Rp(.92,6.8),"#f7f2e6",1.3);ln(Rp(.43,3.4),Rp(.92,6.6),"rgba(247,242,230,.7)",1);
 q=Rp(.66,5.4);dot(q[0],q[1],.9,"#c9b25a");
 /* dark corner posts */
 X.strokeStyle="#5a4630";X.lineWidth=2.2;X.beginPath();
 [0,.37,1].forEach(function(tt){a=Rp(tt,9);b=Rp(tt,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});X.stroke();
 /* white corner trim */
 ql(0,.035,3,h,"#f4eee0","rgba(0,0,0,.25)",.6);qr(0,.03,3,h,"#ddd3bd","rgba(0,0,0,.25)",.6);
 ql(.965,1,3,h,"#d3c9b2","rgba(0,0,0,.25)",.6);qr(.97,1,3,h,"#f4eee0","rgba(0,0,0,.25)",.6);
 /* eave shadows */
 qr(0,1,h-6,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,h-6)[0],Rp(.5,h-6)[1],[[0,"rgba(0,0,0,.42)"],[1,"rgba(0,0,0,0)"]]));
 ql(0,1,h-4,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,h-4)[0],Lp(.5,h-4)[1],[[0,"rgba(0,0,0,.4)"],[1,"rgba(0,0,0,0)"]]));
 /* roof geometry */
 q=BFp(x,y,lu+4,lv+4);F=[q[0],q[1]-(h+1)];L=[F[0]-(lv+4),F[1]-(lv+4)/2];R=[F[0]+lu+4,F[1]-(lu+4)/2];B=[R[0]-(lv+4),R[1]-(lv+4)/2];
 aF=[(F[0]+L[0])/2,(F[1]+L[1])/2-r];aR=[(R[0]+B[0])/2,(R[1]+B[1])/2-r];
 /* gable end with planks and a louvred vent */
 poly([F,L,aF],"#a8392c","rgba(0,0,0,.35)",.9);
 X.strokeStyle="rgba(50,8,4,.42)";X.lineWidth=.9;X.beginPath();
 for(k=1;k<12;k++){t=k/12;a=[F[0]+(L[0]-F[0])*t,F[1]+(L[1]-F[1])*t];b=t<.5?[F[0]+(aF[0]-F[0])*2*t,F[1]+(aF[1]-F[1])*2*t]:[L[0]+(aF[0]-L[0])*2*(1-t),L[1]+(aF[1]-L[1])*2*(1-t)];X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 poly([F,L,aF],lg((F[0]+L[0])/2,aF[1],(F[0]+L[0])/2,(F[1]+L[1])/2,[[0,"rgba(255,240,200,.1)"],[1,"rgba(40,25,0,.34)"]]));
 q=[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.5];
 X.fillStyle="#f7f2e6";X.beginPath();X.ellipse(q[0],q[1],4,3.6,0,0,7);X.fill();X.fillStyle="#3a2a1c";X.beginPath();X.ellipse(q[0],q[1],2.9,2.5,0,0,7);X.fill();
 X.strokeStyle="rgba(247,242,230,.8)";X.lineWidth=.6;X.beginPath();for(k=-1;k<=1;k++){X.moveTo(q[0]-2.8,q[1]+k*1.2);X.lineTo(q[0]+2.8,q[1]+k*1.2)}X.stroke();
 /* roof slope: dark slate */
 poly([F,R,aR,aF],lg((F[0]+R[0])/2,(F[1]+R[1])/2,(aF[0]+aR[0])/2,(aF[1]+aR[1])/2,[[0,"#2f3542"],[.55,"#4a5466"],[1,"#7886a0"]]),"rgba(0,0,0,.35)",.9);
 X.lineWidth=1;for(k=1;k<20;k++){t=k/20;ln([F[0]+(R[0]-F[0])*t,F[1]+(R[1]-F[1])*t],[aF[0]+(aR[0]-aF[0])*t,aF[1]+(aR[1]-aF[1])*t],k%2?"rgba(255,255,255,.24)":"rgba(0,0,0,.22)",1)}
 poly([F,R,[R[0],R[1]+2.6],[F[0],F[1]+2.6]],"#f4eee0","rgba(0,0,0,.3)",.6);
 ln([F[0],F[1]+2.6],[R[0],R[1]+2.6],"#9a9488",1.3);
 ln([F[0],F[1]],[aF[0],aF[1]],"#f4eee0",2);ln(L,aF,"#ddd3bd",2);
 ln(aF,aR,"#c9cfda",2.8);ln([aF[0],aF[1]-1.2],[aR[0],aR[1]-1.2],"rgba(255,255,255,.75)",.8);
 /* downspout */
 a=f[0]+lu*.97;ln([a,f[1]-lu*.97/2-h+1.8],[a,f[1]-lu*.97/2],"#8a9098",1.7);ln([a-.6,f[1]-lu*.97/2-h+2],[a-.6,f[1]-lu*.97/2],"rgba(255,255,255,.45)",.6);
 /* cupola with a weathervane on the ridge */
  M=[(aF[0]+aR[0])/2,(aF[1]+aR[1])/2+1.5];
  X.fillStyle="rgba(0,0,0,.25)";X.beginPath();X.ellipse(M[0]+1,M[1]+1.5,8,2.6,0,0,7);X.fill();
  poly([M,[M[0]-5.5,M[1]-2.75],[M[0]-5.5,M[1]-12.75],[M[0],M[1]-10]],"#8c2d24","rgba(0,0,0,.35)",.6);
  poly([M,[M[0]+5.5,M[1]-2.75],[M[0]+5.5,M[1]-12.75],[M[0],M[1]-10]],"#b03a2e","rgba(0,0,0,.35)",.6);
  X.strokeStyle="rgba(247,242,230,.85)";X.lineWidth=.9;X.beginPath();for(k=0;k<3;k++){X.moveTo(M[0]+1,M[1]-3.6-k*2.6+.5);X.lineTo(M[0]+4.6,M[1]-5.4-k*2.6);}X.stroke();
  poly([[M[0],M[1]-10],[M[0]-7,M[1]-13.5],[M[0],M[1]-17],[M[0]+7,M[1]-13.5]],"#f4eee0","rgba(0,0,0,.3)",.6);
  poly([[M[0],M[1]-10.8],[M[0]-7.4,M[1]-14],[M[0],M[1]-25]],"#363c48","rgba(0,0,0,.35)",.6);
  poly([[M[0],M[1]-10.8],[M[0]+7.4,M[1]-14],[M[0],M[1]-25]],"#56627a","rgba(0,0,0,.35)",.6);
  ln([M[0],M[1]-25],[M[0],M[1]-33],"#2a2a2e",1.2);
  X.fillStyle="#d8b24a";X.beginPath();X.moveTo(M[0]-5,M[1]-30.6);X.lineTo(M[0]+4,M[1]-30.6);X.lineTo(M[0]+6.2,M[1]-32);X.lineTo(M[0]+4,M[1]-33.4);X.lineTo(M[0]-5,M[1]-33.4);X.closePath();X.fill();
  X.fillStyle="#2a2a2e";X.beginPath();X.arc(M[0]-.4,M[1]-32,.8,0,7);X.fill();
  /* yard: hay bale, water trough, a horseshoe on a post */
  q=Rp(.62,0);a=[q[0]+10,q[1]+5];
  X.fillStyle="rgba(0,0,0,.2)";X.beginPath();X.ellipse(a[0]+1,a[1]+1,15,5,0,0,7);X.fill();
  ibx(a[0],a[1],12,9,6,"#b5862a","#d9ac45","#f0d06e");
  X.strokeStyle="rgba(120,80,10,.45)";X.lineWidth=.8;X.beginPath();for(k=0;k<7;k++){X.moveTo(a[0]-9+k*2.5,a[1]-9+k*.4);X.lineTo(a[0]-5+k*2.5,a[1]-7.4+k*.4)}X.stroke();
  ln([a[0]-6,a[1]-6.6],[a[0]+3,a[1]-11],"#7a5a20",1);
  q=Rp(.18,0);a=[q[0]+12,q[1]+6];
  ibx(a[0],a[1],13,5,3.2,"#6a4a2c","#8a6438","#6fb4d6");
  X.fillStyle="rgba(255,255,255,.5)";X.fillRect(a[0]-4,a[1]-4.8,6,.8);
  q=Lp(1,0);ln([q[0]-2,q[1]+1],[q[0]+3,q[1]-1],"rgba(0,0,0,.25)",1);
};
function buyHorseShed(i){var sd=shedWithRoom("horseshed"),id2,tl,o2;if(!sd)return false;
 tl=freeTile(i.id)||[0,0];id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
 o2={id:id2,k:i.id,c:tl[0],r:tl[1],s:1,t:nowT()};S.coins-=i.cost;S.dc.push(o2);sd.cw=(sd.cw||[]).concat([id2]);
 send("farmBuyAt",[TOKEN,id2,i.id,tl[0],tl[1]]);send("farmDecor",[TOKEN,id2,0,0,1]);send("farmCowIn",[TOKEN,id2,sd.id]);
 paint();toast("\uD83D\uDC0E New horse moved into your horse shed ("+sd.cw.length+"/5)");return true}
function horseDlg(shId){var sd=dcById(shId),dlg=$("dlg"),body=$("dlgBody"),W=640,H=Math.min(1300,Math.round(640*Math.max(300,innerHeight-252)/Math.min(innerWidth-32,560))),FY0=H*.4,FY1=H*.95,Z=1.5,cv,cx,bg,cows=[],raf=0,last=0,alive=true,fx=[],shPt=[],sig="",lastSig=0,seed=13;
 if(!sd)return;
   var rm=0,pos=0,swp=0,bgL,bgR,kids={};
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
function close(){alive=false;cancelAnimationFrame(raf);dlg.style.display="none";body.style.cssText="";dlg.onclick=null}
 function ripe(c){var f=FTD[c.k];return !!f&&nowT()-(c.t||0)>=f.ms}
 function barnCows(){return stored().filter(function(s){var o=s.t==="d"&&dcById(s.id);return o&&o.k==="a_horse"})}
 function mkBg(ew){var b=document.createElement("canvas"),g=b.getContext("2d"),i,x,y,gr,ix=56,iy=36,by=FY0-4,gg,n,t,hs=function(k){var v=Math.sin(k*12.9898)*43758.5453;return v-Math.floor(v)};b.width=W;b.height=H;
   function poly(p,f){g.beginPath();p.forEach(function(q,j){j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fillStyle=f;g.fill()}
   function ln(x1,y1,x2,y2,c,w){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
   function vg(y1,y2,a,c){var q=g.createLinearGradient(0,y1,0,y2);q.addColorStop(0,a);q.addColorStop(1,c);return q}
   function hg(x1,x2,a,c){var q=g.createLinearGradient(x1,0,x2,0);q.addColorStop(0,a);q.addColorStop(1,c);return q}
   function bale(x,y,w,h,d){var q;g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x+w/2+d/2,y+h+2,w*.7,7,0,0,7);g.fill();
    g.fillStyle=vg(y,y+h,"#ecc760","#c9992f");g.fillRect(x,y,w,h);
    for(q=0;q<26;q++){ln(x+hs(q)*w,y+hs(q+50)*h,x+hs(q)*w+8+hs(q+9)*10,y+hs(q+50)*h+(hs(q+3)-.5)*3,q%2?"rgba(120,80,15,.35)":"rgba(255,235,150,.45)",1.2)}
    ln(x+w*.25,y,x+w*.25,y+h,"#6b4a14",2.2);ln(x+w*.72,y,x+w*.72,y+h,"#6b4a14",2.2);
    poly([[x,y],[x+d,y-d*.85],[x+w+d,y-d*.85],[x+w,y]],"#f7e08a");poly([[x+w,y],[x+w+d,y-d*.85],[x+w+d,y+h-d*.85],[x+w,y+h]],"#a37a22");
    ln(x,y,x+w,y,"rgba(255,255,255,.5)",1.4)}
   function sack(x,y,w,h){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x+w/2+4,y+h+1,w*.65,5,0,0,7);g.fill();
    g.fillStyle=hg(x,x+w,"#c9a96a","#9a7a42");g.beginPath();g.moveTo(x+3,y+h);g.quadraticCurveTo(x-4,y+h*.5,x+4,y+10);g.lineTo(x+w-4,y+10);g.quadraticCurveTo(x+w+4,y+h*.5,x+w-3,y+h);g.closePath();g.fill();
    g.fillStyle="#b89458";g.beginPath();g.moveTo(x+4,y+10);g.lineTo(x+7,y);g.lineTo(x+w-7,y+1);g.lineTo(x+w-4,y+10);g.closePath();g.fill();
    ln(x+5,y+10,x+w-5,y+10,"#6b4a20",2);g.fillStyle="#8a2a24";g.font="bold 9px sans-serif";g.textAlign="center";g.fillText("FEED",x+w/2,y+h*.62);
    for(i=0;i<9;i++)ln(x+4+hs(i)*(w-8),y+12+hs(i+30)*(h-16),x+4+hs(i)*(w-8)+3,y+12+hs(i+30)*(h-16)+1,"rgba(80,55,20,.35)",1)}
  /* ceiling with timber trusses */
  poly([[0,0],[W,0],[W-ix,iy],[ix,iy]],vg(0,iy,"#171009","#3a2a1a"));
  [.1,.28,.5,.72,.9].forEach(function(f){var xt=W*f,xb=ix+(W-2*ix)*f;ln(xt,0,xb,iy,"#22160b",12);ln(xt-3,0,xb-1.5,iy,"rgba(255,215,150,.2)",2)});
  g.fillStyle=vg(0,18,"#5a3f22","#2a1c0e");g.fillRect(0,0,W,18);ln(0,1,W,1,"rgba(255,225,170,.32)",2);
  g.fillStyle=vg(iy-8,iy,"#4a3520","#2a1c0e");g.fillRect(ix,iy-8,W-2*ix,8);
   /* back wall: warm timber boards */
   g.fillStyle=vg(iy,by,"#6f4526","#a8763f");g.fillRect(ix,iy,W-2*ix,by-iy);
   for(n=0;ix+n*24<W-ix;n++){x=ix+n*24;ln(x,iy,x,by,"rgba(30,14,4,.55)",2);ln(x+2.2,iy,x+2.2,by,"rgba(255,210,150,.15)",1.2)}
   for(i=0;i<80;i++){x=ix+hs(i)*(W-2*ix);y=iy+hs(i+70)*(by-iy-30);ln(x,y,x+(hs(i+4)-.5)*3,y+8+hs(i+3)*34,"rgba(40,20,6,"+(.1+hs(i+9)*.14)+")",1.2)}
   for(i=0;i<14;i++){x=ix+hs(i+300)*(W-2*ix);y=iy+hs(i+310)*(by-iy-40)+10;g.fillStyle="rgba(40,18,4,.5)";g.beginPath();g.ellipse(x,y,2.6,4,0,0,7);g.fill()}
  g.fillStyle=vg(iy,by,"rgba(0,0,0,.42)","rgba(0,0,0,.1)");g.fillRect(ix,iy,W-2*ix,by-iy);
  g.fillStyle=hg(ix,ix+110,"rgba(0,0,0,.38)","rgba(0,0,0,0)");g.fillRect(ix,iy,110,by-iy);
  g.fillStyle=hg(W-ix-110,W-ix,"rgba(0,0,0,0)","rgba(0,0,0,.38)");g.fillRect(W-ix-110,iy,110,by-iy);
   /* dark oak wainscot + stone curb */
   g.fillStyle=vg(by-74,by-14,"#4c2f19","#2f1b0d");g.fillRect(ix,by-74,W-2*ix,60);ln(ix,by-74,W-ix,by-74,"rgba(255,215,150,.4)",1.6);
   for(x=ix;x<W-ix;x+=24){ln(x,by-74,x,by-14,"rgba(0,0,0,.35)",1.4);ln(x+2,by-74,x+2,by-14,"rgba(255,200,130,.1)",1)}
   g.fillStyle=vg(by-14,by+8,"#8b8578","#5e5a50");g.fillRect(ix-4,by-14,W-2*ix+8,22);ln(ix-4,by-14,W-ix+4,by-14,"rgba(255,255,255,.45)",1.6);
  /* side walls: oak boards */
  poly([[0,0],[ix,iy],[ix,by],[0,by+46]],hg(0,ix,"#4a3320","#8a6240"));
  poly([[W,0],[W-ix,iy],[W-ix,by],[W,by+46]],hg(W-ix,W,"#8a6240","#4a3320"));
  for(n=1;n<9;n++){t=n/9;ln(0,(by+46)*t,ix,iy+(by-iy)*t,"rgba(40,30,15,.4)",1.6);ln(W,(by+46)*t,W-ix,iy+(by-iy)*t,"rgba(40,30,15,.4)",1.6)}
  ln(0,by+46,ix,by,"#1e140a",5);ln(W,by+46,W-ix,by,"#1e140a",5);
  /* packed earth and plank floor */
  gr=g.createLinearGradient(0,FY0,0,H);gr.addColorStop(0,"#8a6a43");gr.addColorStop(1,"#b89763");g.fillStyle=gr;g.fillRect(0,FY0-4,W,H-FY0+4);
  for(n=0;n<=12;n++){x=ix+(W-2*ix)*n/12;ln(x,by,n/12*W-(n/12-.5)*0,H,"rgba(50,45,35,.2)",1.6)}
  for(n=1;n<=9;n++){t=Math.pow(n/9,1.6);ln(0,FY0+(H-FY0)*t,W,FY0+(H-FY0)*t,"rgba(50,45,35,.24)",1.6)}
  for(i=0;i<420;i++){x=hs(i)*W;y=FY0+hs(i+200)*(H-FY0);g.fillStyle="rgba(60,55,40,"+(.04+hs(i+5)*.07)+")";g.fillRect(x,y,3+hs(i+8)*10,1.5+hs(i+3)*3)}
  /* straw scattered on the floor */
  for(i=0;i<240;i++){x=hs(i+400)*W;y=FY0+4+hs(i+500)*(H-FY0-8);ln(x,y,x+7+hs(i+7)*9,y+(hs(i+2)-.5)*3,i%3?"rgba(232,196,96,.75)":"rgba(255,235,150,.6)",1.4)}
  /* window + sunbeam (same place as the night overlay) */
  g.fillStyle="rgba(255,240,190,.13)";g.beginPath();g.moveTo(120,34);g.lineTo(220,34);g.lineTo(370,FY0+60);g.lineTo(190,FY0+60);g.closePath();g.fill();
  g.fillStyle="#efe8d4";g.fillRect(120,34,100,70);g.fillStyle="#bfe0f2";g.fillRect(126,40,41,58);g.fillRect(173,40,41,58);g.fillStyle="#8fbf5a";g.fillRect(126,78,41,20);g.fillRect(173,78,41,20);
  ln(130,46,150,46,"rgba(255,255,255,.7)",2);
  g.strokeStyle="#f4eee0";g.lineWidth=7;g.strokeRect(120,34,100,70);g.fillStyle="#f4eee0";g.fillRect(166,36,8,66);g.fillStyle="#9a9488";g.fillRect(112,102,116,9);
   /* oak stall rails along the back wall */
   [by-64,by-38].forEach(function(ry){g.fillStyle=vg(ry-4,ry+4,"#9a6a3a","#4c2f19");g.fillRect(ix-4,ry-4,W-2*ix+8,8);ln(ix-4,ry-3,W-ix+4,ry-3,"rgba(255,225,170,.5)",1.2)});
   for(x=ix+8;x<W-ix;x+=30){g.fillStyle=hg(x,x+6,"#8a5c30","#3c2411");g.fillRect(x,by-68,6,56);ln(x+1.5,by-68,x+1.5,by-12,"rgba(255,225,170,.25)",1)}
   /* brass stable lanterns */
   [[W*.14,46],[W*.86,46]].forEach(function(l){ln(l[0],0,l[0],l[1]-8,"#1a0f06",2);
    gg=g.createRadialGradient(l[0],l[1]+8,1,l[0],l[1]+8,70);gg.addColorStop(0,"rgba(255,190,90,.5)");gg.addColorStop(1,"rgba(255,190,90,0)");g.fillStyle=gg;g.fillRect(l[0]-80,l[1]-30,160,170);
    poly([[l[0]-6,l[1]-8],[l[0]+6,l[1]-8],[l[0]+9,l[1]+14],[l[0]-9,l[1]+14]],vg(l[1]-8,l[1]+14,"#7a5a1a","#3a2a0a"));
    g.fillStyle=vg(l[1]-4,l[1]+12,"#fff3c0","#ffb84a");g.fillRect(l[0]-5,l[1]-3,10,14);
    ln(l[0]-9,l[1]+14,l[0]+9,l[1]+14,"#c9a23a",2);ln(l[0]-6,l[1]-8,l[0]+6,l[1]-8,"#c9a23a",2);ln(l[0],l[1]-3,l[0],l[1]+11,"rgba(90,60,10,.6)",1)});
  /* brass stall plates 1-5, horseshoes above and rosettes between */
  g.font="bold 17px sans-serif";g.textAlign="center";g.textBaseline="middle";
  for(n=0;n<5;n++){x=W*(n+.5)/5;y=FY0-110;
   g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x-19,y+4,42,28);
   g.fillStyle=vg(y,y+26,"#f0d78a","#b58a2e");g.fillRect(x-21,y,42,26);g.strokeStyle="#5a3c12";g.lineWidth=2;g.strokeRect(x-21,y,42,26);
   g.fillStyle="#7a5a1a";g.beginPath();g.arc(x-14,y+5,1.6,0,7);g.arc(x+14,y+5,1.6,0,7);g.fill();g.fillStyle="#3a2608";g.fillText(String(n+1),x,y+14)}
  g.textBaseline="alphabetic";
   function shoe(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineCap="round";g.strokeStyle="rgba(0,0,0,.4)";g.lineWidth=6;g.beginPath();g.arc(1,2,9,-.25*Math.PI,1.25*Math.PI,false);g.stroke();
    g.strokeStyle=hg(-10,10,"#cfd5db","#6c747c");g.lineWidth=5;g.beginPath();g.arc(0,0,9,-.25*Math.PI,1.25*Math.PI,false);g.stroke();g.fillStyle="#2a2e34";for(var q=0;q<6;q++){var a2=Math.PI*(.05+q*.18);g.beginPath();g.arc(Math.cos(a2)*9,Math.sin(a2)*9,.9,0,7);g.fill()}g.restore()}
   for(n=0;n<5;n++)shoe(W*(n+.5)/5,FY0-132,1.1);
   for(n=1;n<5;n++){x=W*n/5;y=FY0-92;g.fillStyle="#2f6fc4";g.beginPath();g.arc(x,y,9,0,7);g.fill();g.fillStyle="#f4eee0";g.beginPath();g.arc(x,y,5,0,7);g.fill();g.fillStyle="#d23a3a";g.beginPath();g.moveTo(x-4,y+8);g.lineTo(x-8,y+22);g.lineTo(x-3,y+18);g.lineTo(x,y+9);g.fill();g.beginPath();g.moveTo(x+4,y+8);g.lineTo(x+8,y+22);g.lineTo(x+3,y+18);g.lineTo(x,y+9);g.fill()}
  /* timber posts */
  [W/3,2*W/3].forEach(function(px){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(px+22,FY0+4,22,5,0,0,7);g.fill();
   g.fillStyle=hg(px,px+14,"#7a5530","#33200f");g.fillRect(px,iy,14,by-iy+4);ln(px+2,iy,px+2,by,"rgba(255,225,170,.3)",1.5)});
  bale(14,FY0+10,70,36,14);bale(20,FY0-24,58,32,12);sack(96,FY0-8,34,44);sack(128,FY0-2,32,40);
   /* saddle on a wooden stand (left) */
   (function(x,y){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x+4,y+40,34,6,0,0,7);g.fill();
    g.strokeStyle="#4c2f19";g.lineWidth=5;g.lineCap="round";g.beginPath();g.moveTo(x-22,y+38);g.lineTo(x-14,y+12);g.moveTo(x+22,y+38);g.lineTo(x+14,y+12);g.moveTo(x-18,y+12);g.lineTo(x+18,y+12);g.stroke();
    g.fillStyle=vg(y-10,y+14,"#9a5a2a","#5e3416");g.beginPath();g.moveTo(x-24,y+14);g.quadraticCurveTo(x-26,y,x-14,y-3);g.quadraticCurveTo(x-10,y-16,x-2,y-12);g.quadraticCurveTo(x+4,y-4,x+12,y-4);g.quadraticCurveTo(x+26,y-2,x+26,y+14);g.quadraticCurveTo(x,y+19,x-24,y+14);g.closePath();g.fill();
    g.strokeStyle="rgba(255,220,170,.35)";g.lineWidth=1.2;g.beginPath();g.moveTo(x-20,y+6);g.quadraticCurveTo(x,y+10,x+22,y+6);g.stroke();
    g.fillStyle="#2f6fc4";g.fillRect(x-20,y+14,40,5);g.strokeStyle="#c9a23a";g.lineWidth=1.6;g.beginPath();g.arc(x+8,y+22,4,0,7);g.stroke();g.lineCap="butt"})(230,FY0-2);
   /* wooden water trough with fresh water (right) + a hay bale */
   bale(556,FY0-30,64,34,12);
   (function(x,y,w,h,d){g.fillStyle="rgba(0,0,0,.35)";g.beginPath();g.ellipse(x+w/2+8,y+h+9,w*.58,9,0,0,7);g.fill();
    poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],"#5b3a1c");
    poly([[x+6,y-1],[x+d+4,y-d+3],[x+w+d-4,y-d+3],[x+w-6,y-1]],vg(y-d,y,"#4f9ac6","#8cc8e6"));
    for(i=0;i<3;i++)ln(x+30+i*40,y-3-i%2*3,x+48+i*40,y-3-i%2*3,"rgba(255,255,255,.55)",1.3);
    poly([[x+w,y],[x+w+d,y-d],[x+w+d,y+h-d],[x+w,y+h]],"#4a2e14");
    g.fillStyle=vg(y,y+h,"#a2703c","#6a4220");g.fillRect(x,y,w,h);ln(x,y+1,x+w,y+1,"rgba(255,225,170,.6)",2);
    for(i=1;i<5;i++)ln(x+w*i/5,y,x+w*i/5,y+h,"rgba(0,0,0,.28)",1.4);
    g.fillStyle="#2a2a2e";g.fillRect(x+w*.2-2,y,4,h);g.fillRect(x+w*.8-2,y,4,h);
    g.fillStyle="#3a2410";g.fillRect(x+8,y+h,8,8);g.fillRect(x+w-16,y+h,8,8)})(440,FY0+6,170,24,12);
  /* hanging lamp + light + vignette */
  gg=g.createRadialGradient(W/2,56,6,W/2,56,270);gg.addColorStop(0,"rgba(255,215,130,.34)");gg.addColorStop(1,"rgba(255,215,130,0)");g.fillStyle=gg;g.fillRect(0,0,W,FY0+150);
  gg=g.createRadialGradient(W/2,H*.5,Math.min(W,H)*.3,W/2,H*.5,Math.max(W,H)*.78);gg.addColorStop(0,"rgba(0,0,0,0)");gg.addColorStop(1,"rgba(0,0,0,.4)");g.fillStyle=gg;g.fillRect(0,0,W,H);
  ln(W/2,0,W/2,42,"#1a0f06",2.5);poly([[W/2-5,40],[W/2+5,40],[W/2+14,53],[W/2-14,53]],vg(40,53,"#5a3a1c","#2a1a0c"));
  gg=g.createRadialGradient(W/2-3,55,1,W/2,57,10);gg.addColorStop(0,"#fffbe0");gg.addColorStop(1,"#f2b84a");g.fillStyle=gg;g.beginPath();g.arc(W/2,57,9,0,7);g.fill();
  return b}
 /* ---- HORSE ART (inside horseDlg): 5 coats, shaded 3D body, jointed legs, flowing mane and tail ---- */
 function newHorse(c,i){var K=[
   {m:"#8d4f2b",d:"#5b3017",k:"#1c120a",t:"#1c120a",n:"#d9a08a",b:1,sock:1},
   {m:"#b3622b",d:"#74391a",k:"#d49a43",t:"#d49a43",n:"#e3a58f",b:0,sock:0},
   {m:"#34323a",d:"#161519",k:"#0a090b",t:"#0a090b",n:"#9a746c",b:0,sock:1},
   {m:"#dcae62",d:"#ab7a35",k:"#f6ecd2",t:"#f6ecd2",n:"#e8b8a2",b:1,sock:0},
   {m:"#d8dadf",d:"#9b9ea9",k:"#7d808c",t:"#7d808c",n:"#d8a9a0",b:0,sock:0}],
  P=K[i%5],dp=[],j;
  for(j=0;j<8;j++)dp.push([-30+rnd()*62,-78+rnd()*24,4+rnd()*4,rnd()]);
  return{id:c.id,x:90+rnd()*(W-180),y:FY0+14+rnd()*(FY1-FY0-18),dir:rnd()<.5?-1:1,st:"idle",t:rnd()*2,tx:0,ty:0,ph:rnd()*6,hd:0,tp:rnd()*6,gait:1,sp:dp,pal:P}}
 /* a little tuft of horse hair, shown above a horse when its hair is ready */
 function tuft(x,y,sz,t){var i,s;cx.save();cx.translate(x,y);cx.scale(sz,sz);
  s=cx.createRadialGradient(0,0,2,0,0,17);s.addColorStop(0,"rgba(255,240,170,.75)");s.addColorStop(1,"rgba(255,240,170,0)");cx.fillStyle=s;cx.beginPath();cx.arc(0,0,17,0,7);cx.fill();
  cx.lineCap="round";
  for(i=-3;i<=3;i++){cx.strokeStyle="#5a3416";cx.lineWidth=2.6;cx.beginPath();cx.moveTo(i*1.1,5);cx.quadraticCurveTo(i*3.2+Math.sin(t*3+i)*1.2,-3,i*4.6,-11+Math.abs(i));cx.stroke();
   cx.strokeStyle=i%2?"#e9c987":"#b98a4a";cx.lineWidth=1.3;cx.beginPath();cx.moveTo(i*1.1,5);cx.quadraticCurveTo(i*3.2+Math.sin(t*3+i)*1.2,-3,i*4.6,-11+Math.abs(i));cx.stroke()}
  cx.fillStyle="#d23a3a";cx.strokeStyle="#7a1818";cx.lineWidth=.8;cx.beginPath();cx.roundRect?cx.roundRect(-5.5,3,11,4.6,2):cx.rect(-5.5,3,11,4.6);cx.fill();cx.stroke();
  cx.restore()}
 function drawHorse(c,t){var wk=c.st==="walk",P=c.pal,k=Z*.95*(1.25+(c.y-FY0)/(FY1-FY0)*.55)*.55,cd=dcById(c.id),rp=cd?ripe(cd):false,g,j,
  gt=c.gait||1,bob=wk?-Math.abs(Math.sin(c.ph))*1.8*gt:0,br=1+Math.sin(t*1.6+c.tp)*.012,hd=c.hd,
  ts=c.st==="toss"?Math.sin(t*10)*.13:0,
  na=hd*1.3+ts-(wk?Math.sin(c.ph*2)*.035*gt:0)+Math.sin(t*.9+c.tp)*.012*(1-hd),ha=.34-hd*.22-ts*.7,
  tw=Math.sin(t*2.1+c.tp)*5+(wk?Math.sin(c.ph)*3:0),
  ef=Math.sin(t*3.1+c.tp)*.05+(Math.sin(t*.8+c.tp*2)>.94?.4:0),bl=((t*.55+c.tp)%3.9)<.11?.12:1;
  function stroke2(a,b,w,col){cx.strokeStyle=col;cx.lineWidth=w;cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.stroke()}
  function leg(x0,ph,far,hind){var s=wk?Math.sin(ph)*gt:0,l=wk?Math.max(0,Math.cos(ph))*gt:0,hy=hind?-68:-66,kx,ky,fx,fy,col=far?P.d:P.m,hp=[x0,hy],kp,fp;
   if(hind){kx=x0-8+s*8;ky=-34-l*9;fx=x0-2+s*16-l*9;fy=-1.5-l*14}else{kx=x0+3+s*9;ky=-36-l*11;fx=x0+2+s*16-l*8;fy=-1.5-l*16}
   kp=[kx,ky];fp=[fx,fy-4];cx.lineCap="round";cx.lineJoin="round";
   stroke2(hp,kp,hind?15:12,col);stroke2(kp,fp,7.4,col);cx.fillStyle=col;cx.beginPath();cx.arc(kx,ky,hind?5.6:5,0,7);cx.fill();
   if(P.sock)stroke2([kx+(fx-kx)*.5,ky+(fy-4-ky)*.5],fp,7.8,"#f1ece2");
   if(far){stroke2(hp,kp,hind?15:12,"rgba(20,8,2,.34)");stroke2(kp,fp,7.4,"rgba(20,8,2,.34)")}
   else{stroke2([hp[0]+2.6,hp[1]+2],[kp[0]+2,kp[1]],hind?4:3,"rgba(255,238,215,.2)");stroke2([kp[0]+1.8,kp[1]+3],[fp[0]+1.6,fp[1]-2],2,"rgba(255,238,215,.18)")}
   cx.fillStyle="#2a1f1a";cx.beginPath();cx.moveTo(fx-4.2,fy-5.4);cx.lineTo(fx+4.4,fy-5.4);cx.lineTo(fx+6.4,fy+1.4);cx.lineTo(fx-5,fy+1.4);cx.closePath();cx.fill();
   cx.fillStyle="rgba(255,255,255,.2)";cx.fillRect(fx-3,fy-4.6,2,3)}
  cx.save();cx.translate(c.x,c.y+bob);cx.scale(c.dir*k,k);
  /* ground shadow */
  cx.save();cx.translate(2,1-bob);cx.scale(1,.17);g=cx.createRadialGradient(0,0,2,0,0,60);g.addColorStop(0,"rgba(0,0,0,.5)");g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,60,0,7);cx.fill();cx.restore();
  /* far legs (darker), then the tail behind the body */
  leg(-23,c.ph+Math.PI,1,1);leg(18,c.ph+Math.PI*1.5,1,0);
  cx.save();cx.translate(0,-12);cx.lineCap="round";
  for(j=0;j<6;j++){cx.strokeStyle=j%2?P.t:P.d;cx.lineWidth=3.6-j*.35;cx.beginPath();cx.moveTo(-43,-70+j*.8);cx.bezierCurveTo(-52+tw*.2,-64,-58+tw*.7+j*1.1,-48,-56+tw*1.1+j*1.5,-26+j*2);cx.stroke();
   cx.strokeStyle="rgba(255,255,255,.12)";cx.lineWidth=.9;cx.beginPath();cx.moveTo(-43,-70+j*.8);cx.bezierCurveTo(-52+tw*.2,-64,-58+tw*.7+j*1.1,-48,-56+tw*1.1+j*1.5,-26+j*2);cx.stroke()}
  cx.restore();
  /* barrel body */
  cx.save();cx.translate(0,-12);cx.save();cx.translate(0,-54);cx.scale(1,br);cx.translate(0,54);
  cx.beginPath();cx.moveTo(-44,-64);cx.bezierCurveTo(-47,-78,-37,-85,-22,-83);cx.bezierCurveTo(-10,-81,4,-79,20,-85);cx.bezierCurveTo(30,-87,37,-80,36,-70);cx.bezierCurveTo(40,-58,38,-47,30,-41);cx.bezierCurveTo(16,-35,-10,-34,-24,-38);cx.bezierCurveTo(-38,-42,-46,-52,-44,-64);cx.closePath();
  g=cx.createLinearGradient(0,-88,0,-34);g.addColorStop(0,P.m);g.addColorStop(.55,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
  cx.save();cx.clip();
  if(P.m==="#d8dadf"){cx.fillStyle="rgba(120,124,138,.35)";for(j=0;j<c.sp.length;j++){cx.beginPath();cx.ellipse(c.sp[j][0],c.sp[j][1]+4,c.sp[j][2]*1.5,c.sp[j][2]*1.2,c.sp[j][3]*3,0,7);cx.fill()}}
  g=cx.createLinearGradient(0,-88,0,-34);g.addColorStop(0,"rgba(255,245,225,.34)");g.addColorStop(.28,"rgba(255,245,225,0)");g.addColorStop(.7,"rgba(0,0,0,.05)");g.addColorStop(1,"rgba(25,8,0,.55)");cx.fillStyle=g;cx.fillRect(-50,-90,92,58);
  g=cx.createLinearGradient(-46,0,40,0);g.addColorStop(0,"rgba(25,8,0,.3)");g.addColorStop(.2,"rgba(0,0,0,0)");g.addColorStop(.8,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(25,8,0,.3)");cx.fillStyle=g;cx.fillRect(-50,-90,92,58);
  [[-31,-62,15,12],[19,-64,13,14]].forEach(function(m){cx.save();cx.translate(m[0],m[1]);cx.scale(m[2],m[3]);g=cx.createRadialGradient(-.2,-.3,0,0,0,1);g.addColorStop(0,"rgba(255,240,215,.32)");g.addColorStop(1,"rgba(255,240,215,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,1,0,7);cx.fill();cx.restore()});
  cx.strokeStyle="rgba(30,10,0,.2)";cx.lineWidth=1.2;cx.beginPath();cx.moveTo(8,-74);cx.bezierCurveTo(12,-62,10,-52,3,-44);cx.moveTo(-14,-76);cx.bezierCurveTo(-18,-64,-20,-52,-16,-40);cx.stroke();
  cx.strokeStyle="rgba(255,255,255,.07)";cx.lineWidth=.8;cx.beginPath();for(j=0;j<90;j++){var fx0=-44+(Math.sin(j*12.989)*43758.5%1+1)%1*84,fy0=-86+(Math.sin(j*78.23)*12345.6%1+1)%1*46;cx.moveTo(fx0,fy0);cx.lineTo(fx0+3,fy0+1.2)}cx.stroke();
  cx.restore();
  cx.strokeStyle="rgba(40,12,0,.4)";cx.lineWidth=1.1;cx.beginPath();cx.moveTo(-44,-64);cx.bezierCurveTo(-47,-78,-37,-85,-22,-83);cx.bezierCurveTo(-10,-81,4,-79,20,-85);cx.bezierCurveTo(30,-87,37,-80,36,-70);cx.stroke();
  cx.restore();cx.restore();
  /* near legs */
  leg(-30,c.ph,0,1);leg(26,c.ph+Math.PI*.5,0,0);
  /* neck + mane + head, swinging together from the withers */
  cx.save();cx.translate(0,-12);cx.translate(24,-80);cx.rotate(na);cx.translate(-24,80);
  cx.beginPath();cx.moveTo(14,-80);cx.bezierCurveTo(20,-100,32,-114,48,-122);cx.lineTo(58,-112);cx.bezierCurveTo(54,-98,52,-82,45,-60);cx.lineTo(32,-50);cx.bezierCurveTo(24,-58,16,-68,14,-80);cx.closePath();
  g=cx.createLinearGradient(14,-100,58,-62);g.addColorStop(0,P.m);g.addColorStop(.65,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
  cx.save();cx.clip();g=cx.createLinearGradient(0,-124,0,-50);g.addColorStop(0,"rgba(255,245,225,.3)");g.addColorStop(.4,"rgba(255,245,225,0)");g.addColorStop(1,"rgba(25,8,0,.42)");cx.fillStyle=g;cx.fillRect(10,-126,58,78);
  cx.strokeStyle="rgba(30,10,0,.22)";cx.lineWidth=1.1;cx.beginPath();cx.moveTo(33,-98);cx.bezierCurveTo(38,-88,40,-74,36,-60);cx.stroke();cx.restore();
  /* flowing mane: a ribbon along the crest with strands on top */
  (function(){var pts=[],u,bx,by,nx,ny,sw,len,i;
   for(i=0;i<=12;i++){u=i/12;bx=14+u*34+Math.sin(u*3.1)*3;by=-80-u*42+Math.sin(u*3.1)*-3;
    sw=Math.sin(t*1.9+i*.6+c.tp)*(1.2+u*1.4)+(wk?Math.sin(c.ph*2+i*.5)*1.6:0)-hd*2.5;len=11+(1-u)*9;
    pts.push([bx,by,bx-len*.72+sw,by-len*.55+Math.abs(sw)*.3+2])}
   cx.beginPath();cx.moveTo(pts[0][0],pts[0][1]);for(i=1;i<pts.length;i++)cx.lineTo(pts[i][0],pts[i][1]);
   for(i=pts.length-1;i>=0;i--)cx.lineTo(pts[i][2],pts[i][3]);cx.closePath();
   g=cx.createLinearGradient(8,-90,56,-122);g.addColorStop(0,P.d);g.addColorStop(.5,P.k);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
   cx.lineCap="round";for(i=0;i<pts.length;i+=1){cx.strokeStyle=i%2?"rgba(255,255,255,.18)":"rgba(0,0,0,.25)";cx.lineWidth=.9;cx.beginPath();cx.moveTo(pts[i][0],pts[i][1]);cx.lineTo(pts[i][2]-1,pts[i][3]+1);cx.stroke()}})();
  /* head (larger, longer face) */
  cx.save();cx.translate(54,-118);cx.rotate(ha);cx.scale(1.28,1.28);
  cx.save();cx.translate(-3,-8);cx.rotate(-.05+ef);g=cx.createLinearGradient(0,-1,0,-12);g.addColorStop(0,P.d);g.addColorStop(1,P.m);cx.fillStyle=g;cx.beginPath();cx.moveTo(-3,0);cx.quadraticCurveTo(-4,-8,1,-13);cx.quadraticCurveTo(5,-6,4,0);cx.closePath();cx.fill();cx.fillStyle=P.n;cx.globalAlpha=.55;cx.beginPath();cx.moveTo(-1,-1);cx.quadraticCurveTo(-1.5,-6,1,-10);cx.quadraticCurveTo(2.6,-5,2.8,-1);cx.closePath();cx.fill();cx.globalAlpha=1;cx.restore();
  cx.beginPath();cx.moveTo(-10,-8);cx.bezierCurveTo(0,-13,12,-9,24,2);cx.bezierCurveTo(30,6,35,12,34,19);cx.bezierCurveTo(33,25,26,26,21,23);cx.bezierCurveTo(14,22,8,17,3,15);cx.bezierCurveTo(-5,17,-12,13,-13,4);cx.bezierCurveTo(-14,-2,-13,-6,-10,-8);cx.closePath();
  g=cx.createLinearGradient(0,-12,0,26);g.addColorStop(0,P.m);g.addColorStop(.6,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
  cx.save();cx.clip();
  if(P.b){cx.fillStyle="#f6efe2";cx.beginPath();cx.moveTo(-4,-12);cx.bezierCurveTo(4,-14,14,-8,24,1);cx.lineTo(34,16);cx.lineTo(31,19);cx.bezierCurveTo(22,6,10,-2,-5,-6);cx.closePath();cx.fill()}
  g=cx.createLinearGradient(0,-12,0,26);g.addColorStop(0,"rgba(255,245,225,.3)");g.addColorStop(.5,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(25,8,0,.4)");cx.fillStyle=g;cx.fillRect(-16,-16,56,46);
  cx.fillStyle="rgba(25,8,0,.18)";cx.beginPath();cx.ellipse(-6,9,9,8,.3,0,7);cx.fill();
  cx.fillStyle=P.d;cx.globalAlpha=.55;cx.beginPath();cx.ellipse(29,19,7,6,0,0,7);cx.fill();cx.globalAlpha=1;
  cx.restore();
  cx.strokeStyle="rgba(40,12,0,.42)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(-10,-8);cx.bezierCurveTo(0,-13,12,-9,24,2);cx.bezierCurveTo(30,6,35,12,34,19);cx.stroke();
  /* leather halter */
  cx.strokeStyle="#6a3d1c";cx.lineWidth=2;cx.beginPath();cx.moveTo(-6,-5);cx.quadraticCurveTo(-2,8,8,12);cx.moveTo(21,6);cx.quadraticCurveTo(24,14,22,22);cx.stroke();
  cx.strokeStyle="rgba(255,210,150,.4)";cx.lineWidth=.6;cx.beginPath();cx.moveTo(-5,-4);cx.quadraticCurveTo(-1,8,9,11);cx.stroke();
  cx.fillStyle="#d8b24a";cx.beginPath();cx.arc(8,12,1.6,0,7);cx.arc(22,14,1.4,0,7);cx.fill();
  /* nostril, mouth */
  cx.fillStyle="#2a1410";cx.beginPath();cx.ellipse(31,13,1.5,2.5,.5,0,7);cx.fill();cx.strokeStyle="rgba(30,10,4,.65)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(30,22);cx.quadraticCurveTo(25,21,21,19);cx.stroke();
  /* eye */
  cx.save();cx.translate(8,-1);cx.scale(1,bl);cx.fillStyle="#1a0f0a";cx.beginPath();cx.ellipse(0,0,3,2.5,0,0,7);cx.fill();cx.fillStyle="#6a4020";cx.beginPath();cx.ellipse(.3,.2,1.8,1.6,0,0,7);cx.fill();cx.fillStyle="#fff";cx.beginPath();cx.arc(1.1,-.9,.8,0,7);cx.fill();cx.restore();
  cx.strokeStyle="rgba(30,10,0,.7)";cx.lineWidth=.9;cx.beginPath();cx.moveTo(4.5,-4);cx.quadraticCurveTo(8,-6.4,12,-3.4);cx.stroke();
  /* forelock + far ear */
  cx.strokeStyle=P.k;cx.lineWidth=2.2;cx.lineCap="round";for(j=0;j<4;j++){cx.beginPath();cx.moveTo(-4+j*1.5,-9);cx.quadraticCurveTo(3+j*2+Math.sin(t*2.3+j)*.8,-8+j,6+j*2.4,2+j*2.2);cx.stroke()}
  cx.save();cx.translate(-5,-9);cx.rotate(.2+ef*.8);g=cx.createLinearGradient(0,0,0,-12);g.addColorStop(0,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.beginPath();cx.moveTo(-3.4,1);cx.quadraticCurveTo(-3.6,-8,2,-13);cx.quadraticCurveTo(5,-6,5,1);cx.closePath();cx.fill();cx.strokeStyle="rgba(40,12,0,.4)";cx.lineWidth=.6;cx.stroke();cx.restore();
  cx.restore();
  cx.restore();
  cx.restore();
  if(rp)tuft(c.x,c.y-142*k+Math.sin(t*4+c.tp)*3,Math.max(.8,k*.75),t)}
 function sync(){var L=shedCows(sd),old={};cows.forEach(function(c){old[c.id]=c});cows=L.map(function(c,i){return old[c.id]||newHorse(c,i)})}
  function upd(dt,t){cows.forEach(function(c){var dx,dy,d,r,sp;c.t-=dt;if(c.hop>0)c.hop=Math.max(0,c.hop-dt);
  if(c.st==="walk"){dx=c.tx-c.x;dy=c.ty-c.y;d=Math.hypot(dx,dy);if(d<3){c.st="idle";c.t=1.5+rnd()*3}else{sp=c.gait>1?54:32;c.x+=dx/d*sp*dt;c.y+=dy/d*sp*.64*dt;c.dir=dx>=0?1:-1;c.ph+=dt*(c.gait>1?7.6:4.8)}}
  else if(c.t<=0){r=rnd();if(r<.4){c.st="walk";c.gait=rnd()<.25?1.35:1;c.tx=60+rnd()*(W-120);c.ty=FY0+14+rnd()*(FY1-FY0-18)}else if(r<.68){c.st="graze";c.t=2.5+rnd()*3}else if(r<.82){c.st="toss";c.t=1.1}else{c.st="idle";c.t=1.5+rnd()*2.5}}
  c.hd+=((c.st==="graze"?1:0)-c.hd)*Math.min(1,dt*3.2)})}
 function status(c){var f=FTD[c.k],el;if(!f)return"";el=nowT()-(c.t||0);return el>=f.ms?"Horse hair ready! +"+f.sell+"\uD83E\uDE99":"Next horse hair in "+fmtDur(f.ms-el)}
  function tm(){calfTick();var L=shedCows(sd),f=FTD.a_horse,best=1e18,rp=0,e;L.forEach(function(c){var el=nowT()-(c.t||0);if(f&&el>=f.ms)rp++;else if(f)best=Math.min(best,f.ms-el)});e=$("shTime");if(!e)return;e.textContent=rm?tmSide():!L.length?"":rp?"\u2702\uFE0F Horse hair ready: "+rp:"Next harvest in "+fmtDur(best)}
 function rows(){var L=shedCows(sd),nb=barnCows().length;$("shSub").textContent=rm?(calfList(rm).length?"Foal room \u00B7 "+calfList(rm).length+"/5":"Empty room \u00B7 0/5"):L.length+"/5 horses";$("shPlus").style.opacity=rm?((grownKids()&&L.length<5)?"1":".35"):((L.length>=5||!nb)?".35":"1");$("shMinus").style.opacity=rm?(grownKids()?"1":".35"):(L.length?"1":".35");sig=L.map(function(c){return c.id+ripe(c)}).join();tm()}
 function frame(ts){var t=ts/1000,dt,fy;if(!alive)return;if(dlg.style.display!=="flex"||!$("shCv")){alive=false;return}
  dt=Math.min(.05,(ts-last)/1000||.016);last=ts;upd(dt,t);if(pos)kidsUpd(dt);pos+=(rm-pos)*Math.min(1,dt*9);if(Math.abs(rm-pos)<.003)pos=rm;
  cx.clearRect(0,0,W,H);drawSides(t);cx.save();cx.translate(-pos*W,0);cx.drawImage(bg,0,0);
  cows.slice().sort(function(a,b){return a.y-b.y}).forEach(function(c){var hp=c.hop>0?Math.sin((1-c.hop/.55)*Math.PI)*16:0;cx.save();cx.translate(0,-hp);drawHorse(c,t);cx.restore()});
    if(document.body.classList.contains("night")){cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var lg=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);lg.addColorStop(0,"rgba(255,200,90,.55)");lg.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=lg;cx.fillRect(0,0,W,H)}
    if(document.body.classList.contains("night")){cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
    shFx(dt);fx=fx.filter(function(e){return e.a>0});fx.forEach(function(e){e.y-=26*dt;e.a-=dt*.7;cx.globalAlpha=Math.max(0,e.a);cx.font="bold 20px sans-serif";cx.textAlign="center";cx.fillStyle="#fff";cx.strokeStyle="#7a4a10";cx.lineWidth=3;cx.strokeText(e.txt,e.x,e.y);cx.fillText(e.txt,e.x,e.y);cx.globalAlpha=1});
  cx.restore();
  if(ts-lastSig>500){lastSig=ts;if(sig!==shedCows(sd).map(function(c){return c.id+ripe(c)}).join()){sync();rows()}else if(rm)rows();else tm()}
  raf=requestAnimationFrame(frame)}
   function shBurst(cc,sell){var i,a,s,k=1.25+(cc.y-FY0)/(FY1-FY0)*.55,bx=cc.x,by=cc.y-52*k;
  cc.hop=.55;
  shPt.push({ty:"glow",x:bx,y:by,r:90,a:1});
  shPt.push({ty:"ring",x:bx,y:by,r:10,a:.9,w:6,g:170,d:0});
  shPt.push({ty:"ring",x:bx,y:by,r:4,a:.7,w:3,g:105,d:.12});
  for(i=0;i<16;i++){a=-Math.PI/2+(Math.random()-.5)*2.2;s=110+Math.random()*170;shPt.push({ty:"drop",x:bx+(Math.random()-.5)*24,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:2.6+Math.random()*3.2,a:1,life:.9+Math.random()*.5})}
  for(i=0;i<12;i++){a=Math.random()*6.283;s=40+Math.random()*120;shPt.push({ty:"spark",x:bx,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,r:5+Math.random()*6,a:1,life:.7+Math.random()*.5,rot:Math.random()*3})}
  for(i=0;i<5;i++)shPt.push({ty:"coin",x:bx+(Math.random()-.5)*30,y:by-10,vx:(Math.random()-.5)*120,vy:-190-Math.random()*90,r:8,a:1,life:1.2,ph:Math.random()*6});
  shPt.push({ty:"txt",x:bx,y:by-55,txt:"+"+sell+"\uD83E\uDE99",a:1.6,age:0})}
 function shFx(dt){var i,j,p,rr,sc,g;cx.save();
  shPt=shPt.filter(function(p){return p.a>0});
  for(i=0;i<shPt.length;i++){p=shPt[i];cx.globalAlpha=1;
   if(p.d>0){p.d-=dt;continue}
   if(p.ty==="glow"){p.a-=dt*1.8;g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,"rgba(255,244,190,"+Math.max(0,p.a*.8)+")");g.addColorStop(1,"rgba(255,244,190,0)");cx.fillStyle=g;cx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2)}
   else if(p.ty==="ring"){p.r+=p.g*dt;p.a-=dt*1.5;cx.globalAlpha=Math.max(0,p.a);cx.strokeStyle="#fff6c8";cx.lineWidth=Math.max(.5,p.w*p.a);cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.stroke()}
   else if(p.ty==="drop"){p.vy+=380*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;cx.globalAlpha=Math.max(0,p.a);cx.lineCap="round";cx.strokeStyle=p.r>4?"#6a3d1a":"#d9b36a";cx.lineWidth=1.8;cx.beginPath();cx.moveTo(p.x,p.y);cx.quadraticCurveTo(p.x-p.vx*.04,p.y-6,p.x-p.vx*.07,p.y-p.vy*.05-10);cx.stroke();cx.strokeStyle="rgba(255,255,255,.55)";cx.lineWidth=.6;cx.stroke()}
   else if(p.ty==="spark"){p.vx*=.97;p.vy=p.vy*.97+50*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.rot+=dt*3;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.globalAlpha=Math.max(0,p.a);cx.globalCompositeOperation="lighter";cx.fillStyle="#ffe58a";cx.beginPath();for(j=0;j<8;j++){rr=j%2?p.r*.28:p.r;cx.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}cx.closePath();cx.fill();cx.restore()}
   else if(p.ty==="coin"){p.vy+=560*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.ph+=dt*11;rr=Math.max(.8,Math.abs(Math.cos(p.ph))*p.r);cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#ffd23f";cx.strokeStyle="#a8740a";cx.lineWidth=1.6;cx.beginPath();cx.ellipse(p.x,p.y,rr,p.r,0,0,7);cx.fill();cx.stroke();cx.fillStyle="rgba(255,255,255,.55)";cx.beginPath();cx.ellipse(p.x-rr*.25,p.y-p.r*.3,rr*.3,p.r*.3,0,0,7);cx.fill()}
   else if(p.ty==="txt"){p.age+=dt;p.a-=dt*.8;p.y-=36*dt;sc=p.age<.2?.5+p.age*4.5:1.4-Math.min(.4,(p.age-.2)*1.2);cx.save();cx.translate(p.x,p.y);cx.scale(sc,sc);cx.globalAlpha=Math.min(1,Math.max(0,p.a));cx.font="bold 26px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="#7a4a10";cx.fillStyle="#fff6c2";cx.strokeText(p.txt,0,0);cx.fillText(p.txt,0,0);cx.restore()}}
  cx.restore()}
 function collect(id){var c=dcById(id),f=c&&FTD[c.k],was=c&&ripe(c),cc;if(!c)return;tapTree(c);
  if(was){cc=cows.filter(function(q){return q.id===id})[0];if(cc)shBurst(cc,f.sell)}rows()}
 body.style.cssText="max-width:560px;margin-top:100px;margin-bottom:120px;padding:0;background:transparent!important;border:0;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;overflow:hidden";
 body.innerHTML="<div style='position:relative'><canvas id='shCv' style='width:100%;display:block;border-radius:18px;touch-action:manipulation'></canvas><button id='shX' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';document.getElementById('dlgBody').style.cssText=''\" style='position:absolute;top:8px;right:8px;z-index:5;min-width:84px;height:46px;padding:0 16px;border-radius:23px;border:2px solid rgba(255,255,255,.9);background:rgba(0,0,0,.3);color:#fff;font:bold 18px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>Close</button><div id='shSub' style='position:absolute;top:10px;left:0;right:0;text-align:center;font:bold 22px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div id='shTime' style='position:absolute;top:42px;left:0;right:0;text-align:center;font:bold 14px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div style='position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:20px'><button id='shMinus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>-</button><button id='shHarv' style='height:56px;padding:0 18px;border-radius:28px;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 16px sans-serif;text-shadow:0 2px 6px #000'>Harvest</button><button id='shPlus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>+</button></div></div>";
 dlg.style.display="flex";cv=$("shCv");var dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cx=cv.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 bg=mkBg();sync();rows();
  bgL=mkBg();bgR=mkBg();
 function nightFx(){if(!document.body.classList.contains("night"))return;cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var g2=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);g2.addColorStop(0,"rgba(255,200,90,.55)");g2.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=g2;cx.fillRect(0,0,W,H);cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
 function drawSides(t){[-1,1].forEach(function(r){var im=r<0?bgL:bgR,n,x,y=FY0+(FY1-FY0)*.42,L;if(!im||Math.abs(r-pos)>=1)return;
  cx.save();cx.translate((r-pos)*W,0);cx.drawImage(im,0,0);
  
  L=calfList(r);
  if(!L.length){cx.font="bold 28px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="rgba(40,20,5,.8)";cx.fillStyle="#fff";cx.strokeText("Empty room",W/2,FY0+(FY1-FY0)*.75);cx.fillText("Empty room",W/2,FY0+(FY1-FY0)*.75)}
  else L.slice().sort(function(p,q){return kid(p).y-kid(q).y}).forEach(function(q){drawKid(q,t)});
  nightFx();cx.restore()})}
 var wrap=body.firstChild,ctl=$("shMinus").parentNode,dots=document.createElement("div"),aL=document.createElement("button"),aR=document.createElement("button"),ast="position:absolute;top:46%;z-index:4;width:42px;height:64px;padding:0;border-radius:21px;border:2px solid rgba(255,255,255,.85);background:rgba(0,0,0,.3);color:#fff;font:bold 30px sans-serif;line-height:1;text-shadow:0 2px 6px #000;transition:opacity .2s",tx0=0,ty0=0,tOn=false;
 aL.id="shL";aL.textContent="\u2039";aL.style.cssText=ast+";left:6px";aR.id="shR";aR.textContent="\u203A";aR.style.cssText=ast+";right:6px";
 dots.style.cssText="position:absolute;top:68px;left:0;right:0;display:flex;justify-content:center;gap:8px;pointer-events:none";dots.innerHTML="<i></i><i></i><i></i>";
 wrap.appendChild(aL);wrap.appendChild(aR);wrap.appendChild(dots);
 ctl.style.transition="opacity .2s";
 function roomUI(){aL.style.opacity=rm>-1?"1":"0";aL.style.pointerEvents=rm>-1?"auto":"none";aR.style.opacity=rm<1?"1":"0";aR.style.pointerEvents=rm<1?"auto":"none";
  ctl.style.opacity="1";ctl.style.pointerEvents="auto";
  [].forEach.call(dots.children,function(d,i){d.style.cssText="width:9px;height:9px;border-radius:50%;box-shadow:0 1px 4px #000;background:"+(i===rm+1?"#fff":"rgba(255,255,255,.4)")})}
 function goRoom(d){var n=Math.max(-1,Math.min(1,rm+d));if(n===rm)return;rm=n;roomUI();rows()}
 aL.onclick=function(){goRoom(-1)};aR.onclick=function(){goRoom(1)};
 wrap.addEventListener("touchstart",function(ev){if(ev.touches.length!==1||(ev.target.closest&&ev.target.closest("button"))){tOn=false;return}tOn=true;tx0=ev.touches[0].clientX;ty0=ev.touches[0].clientY},{passive:true});
 wrap.addEventListener("touchend",function(ev){var t0,dx,dy;if(!tOn)return;tOn=false;t0=ev.changedTouches[0];dx=t0.clientX-tx0;dy=t0.clientY-ty0;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swp=Date.now();goRoom(dx<0?1:-1)}},{passive:true});
 function kh(ev){if(!alive||dlg.style.display!=="flex"||!$("shCv")){document.removeEventListener("keydown",kh,true);return}
  if(ev.key==="ArrowLeft"){ev.preventDefault();ev.stopPropagation();goRoom(-1)}else if(ev.key==="ArrowRight"){ev.preventDefault();ev.stopPropagation();goRoom(1)}}
 document.addEventListener("keydown",kh,true);roomUI();
  function SH(){return dcById(sd.id)||sd}
 function calfList(r){var h=SH();return h.cc?(h.cf||[]).filter(function(q){return q.r===r}):[]}
 function calfTick(){var h=SH(),c=h.cc,L,l,now=nowT();if(!c)return;L=h.cf=h.cf||[];
  if(shedCows(sd).length<1||L.length>=10){h.nx=0;return}
  if(!h.nx)h.nx=now+c.b;
  while(h.nx<=now&&L.length<10){l=L.filter(function(q){return q.r<0}).length;h.cn=(h.cn||0)+1;L.push({i:"c"+h.cn,b:h.nx,r:l<=L.length-l?-1:1,m:0});h.nx+=c.b}
  if(L.length>=10)h.nx=0}
 function kid(q){var k=kids[q.i],n;if(!k){k=kids[q.i]=newHorse({id:"k_"+q.i},parseInt(q.i.slice(1),10)||0);
  n=(SH().cf||[]).filter(function(z){return z.r===q.r&&(parseInt(z.i.slice(1),10)||0)<(parseInt(q.i.slice(1),10)||0)}).length;
  k.hx=W*(n%5+.5)/5;k.hy=FY0+(FY1-FY0)*(.3+.4*(n%2));k.x=k.hx;k.y=k.hy}return k}
 function kidsUpd(dt){var s=cows;cows=(SH().cf||[]).map(function(q){return kid(q)});cows.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});upd(dt);cows.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});cows=s}
 function kidGrow(q){return Math.min(1,Math.max(0,(nowT()-q.b)/SH().cc.g))}
 function drawKid(q,t){var c=SH().cc,k=kid(q),now=nowT(),g=kidGrow(q),sc=.42+.58*g,oz=Z,rdy=g>=1&&(!q.m||now-q.m>=c.m),by=k.y-84*oz*sc*(1.25+(k.y-FY0)/(FY1-FY0)*.55)-8,nm=g<.34?"Foal":g<.67?"Foal":"Young";
  Z=oz*sc;try{drawHorse(k,t)}finally{Z=oz}
  cx.save();cx.textAlign="center";
  if(g<1){cx.fillStyle="rgba(0,0,0,.55)";cx.fillRect(k.x-20,by,40,6);cx.fillStyle="#8be37f";cx.fillRect(k.x-19,by+1,38*g,4);cx.font="bold 11px sans-serif";cx.lineWidth=3;cx.strokeStyle="rgba(0,0,0,.7)";cx.fillStyle="#fff";cx.strokeText(nm,k.x,by-3);cx.fillText(nm,k.x,by-3)}
  else if(rdy)tuft(k.x,by+8+Math.sin(t*4+k.tp)*3,.85,t)
  cx.restore()}
 function milkKid(q){var c=SH().cc,now=nowT(),k=kid(q);
  if(now-q.b<c.g){toast("\uD83D\uDC0E Still growing: grown-up in "+fmtDur(c.g-(now-q.b)));return}
  if(q.m&&now-q.m<c.m){toast("Next horse hair in "+fmtDur(c.m-(now-q.m)));return}
  invAdd("y:"+sd.k,1);S.xp+=c.x;q.m=now;lvlUp();paint();toast("\u2702\uFE0F Horse hair collected! +"+c.x+" XP, stored in barn");fx.push({x:k.x+rm*W,y:k.y-100,txt:"+1 \uD83D\uDCE6",a:1.2});send("farmCalfMilk",[TOKEN,sd.id,q.i]);tm()}
 function kidTap(px,py){var best=null,bd=1e9;calfList(rm).forEach(function(q){var k=kid(q),sc=Math.max(.75,.42+.58*kidGrow(q)),kk=1.25+(k.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-k.x)+Math.abs(py-(k.y-30*kk));
   if(Math.abs(px-k.x)<58*kk*sc&&py>k.y-84*kk*sc&&py<k.y+10&&d<bd){bd=d;best=q}});
  if(best)milkKid(best)}
   function grownKids(){var c=SH().cc,now=nowT();return c?calfList(rm).filter(function(q){return now-q.b>=c.g}).length:0}
 function kidHarvest(){var c=SH().cc,now=nowT(),n=0;if(!c)return;calfList(rm).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){n++;milkKid(q)}});if(!n)toast("No horse hair ready yet.")}
 function kidMove(toShed){var h=SH(),c=h.cc,now=nowT(),L=calfList(rm),q=null,i,m=1e18,id2,o;if(!c)return;
  for(i=0;i<L.length;i++){if(now-L[i].b>=c.g){q=L[i];break}m=Math.min(m,c.g-(now-L[i].b))}
  if(!q){toast(L.length?"\uD83D\uDC0E No fully grown foal yet. Next grown-up in "+fmtDur(m):"No foals in this room.");return}
  if(toShed&&shedCows(sd).length>=5){toast("The horse shed is full (5 horses).");return}
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  o={id:id2,k:"a_horse",c:0,r:0,s:1,t:now};S.dc.push(o);
  h.cf=(h.cf||[]).filter(function(z){return z!==q});kids={};
  if(toShed)sd.cw=(sd.cw||[]).concat([id2]);
  send("farmCalfOut",[TOKEN,sd.id,q.i,id2,toShed?1:0]);
  paint();sync();rows();toast(toShed?"\uD83D\uDC0E Grown foal moved into the horse shed ("+shedCows(sd).length+"/5)":"\uD83D\uDC0E Grown foal moved to your barn")}
 function tmSide(){var c=SH().cc,L=calfList(rm),now=nowT(),rdy=0,nm=1e18,ng=1e18,a;if(!c)return"";
  L.forEach(function(q){a=now-q.b;if(a<c.g)ng=Math.min(ng,c.g-a);else if(!q.m||now-q.m>=c.m)rdy++;else nm=Math.min(nm,c.m-(now-q.m))});
  if(rdy)return"\u2702\uFE0F Horse hair ready: "+rdy+" (tap the horse)";
  if(ng<1e18)return"Next grown-up in "+fmtDur(ng);
  if(nm<1e18)return"Next horse hair in "+fmtDur(nm);
  return SH().nx?"Next foal in "+fmtDur(Math.max(0,SH().nx-now)):"Put a horse in the shed to start a family"}
 cv.onclick=function(e){if(Math.abs(pos-rm)>.01||Date.now()-swp<400)return;var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W,py=(e.clientY-r.top)/r.height*H,best=null,bd=1e9;
   if(rm){kidTap(px,py);return}
  cows.forEach(function(c){var k=1.25+(c.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-c.x)+Math.abs(py-(c.y-30*k));if(Math.abs(px-c.x)<58*k&&py>c.y-84*k&&py<c.y+8&&d<bd){bd=d;best=c}});
  if(best)collect(best.id)};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),id;if(ev.target===dlg){close();return}if(!b)return;
   if(rm&&(b.id==="shHarv"||b.id==="shPlus"||b.id==="shMinus")){if(b.id==="shHarv")kidHarvest();else kidMove(b.id==="shPlus");return}
  if(b.id==="shPlus"){var L=shedCows(sd),bc=barnCows(),o;if(L.length>=5){toast("The horse shed is full (5 horses).");return}if(!bc.length){toast("No horses in your barn. Buy a horse in the Market.");return}
   o=dcById(bc[0].id);sd.cw=(sd.cw||[]).concat([o.id]);send("farmCowIn",[TOKEN,o.id,sd.id]);paint();sync();rows();toast("\uD83D\uDC0E Horse moved into the shed ("+shedCows(sd).length+"/5)");return}
   if(b.id==="shX"){close();return}
   if(b.id==="shHarv"){var n=0;shedCows(sd).forEach(function(c){if(ripe(c)){n++;collect(c.id)}});if(!n)toast("No horse hair ready yet.");return}
   if(b.id==="shMinus"){var L2=shedCows(sd);if(!L2.length){toast("No horses in the shed.");return}id=L2[L2.length-1].id;sd.cw=(sd.cw||[]).filter(function(q){return q!==id});send("farmCowOut",[TOKEN,id]);paint();sync();rows();toast("Horse moved to your barn")}};
 raf=requestAnimationFrame(frame)}
/* END of farm/js/sheds/horse-shed.js */
