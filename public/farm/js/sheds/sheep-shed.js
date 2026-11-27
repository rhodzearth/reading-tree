/* ===== SHEEP SHED: same logic as the cow shed (5 sheep inside, lambs in the side rooms, wool) ===== */
FOOT.sheepshed=2;HB.sheepshed=[-37,-56,37,22];
DEC.sheepshed=function(p){var x=p[0],y=p[1],lu=40,lv=30,h=22,f=BFp(x,y,lu,lv),k,a,b,q,t,s,F,L,R,B,aF,aR,M,r=9,
 Lp=function(t,z){return LPt(f,lv,t,z)},Rp=function(t,z){return RPt(f,lu,t,z)},
 ql=function(t0,t1,z0,z1,fl,st,lw){poly([Lp(t0,z0),Lp(t1,z0),Lp(t1,z1),Lp(t0,z1)],fl,st,lw)},
 qr=function(t0,t1,z0,z1,fl,st,lw){poly([Rp(t0,z0),Rp(t1,z0),Rp(t1,z1),Rp(t0,z1)],fl,st,lw)},
 ln=function(p1,p2,c,w){X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.moveTo(p1[0],p1[1]);X.lineTo(p2[0],p2[1]);X.stroke()},
 hs=function(i){var v=Math.sin(i*12.9898)*43758.5453;return v-Math.floor(v)},
 puff=function(px,py,pr){var g=X.createRadialGradient(px-pr*.35,py-pr*.4,pr*.1,px,py,pr);g.addColorStop(0,"#ffffff");g.addColorStop(.6,"#efe9db");g.addColorStop(1,"#c9c1ae");X.fillStyle=g;X.beginPath();X.arc(px,py,pr,0,7);X.fill()},
 face=function(px,py,sc){X.save();X.translate(px,py);X.transform(1,-.5,0,1,0,0);X.scale(sc,sc);
  puff(-10,8,8);puff(10,8,8);puff(0,12,10);puff(-7,-12,6);puff(0,-15,7);puff(7,-12,6);
  X.fillStyle="#4a3e44";X.beginPath();X.ellipse(-11,-4,5.5,2.6,.5,0,7);X.ellipse(11,-4,5.5,2.6,-.5,0,7);X.fill();
  X.fillStyle="#d89a94";X.beginPath();X.ellipse(-10.4,-3.8,3.4,1.2,.5,0,7);X.ellipse(10.4,-3.8,3.4,1.2,-.5,0,7);X.fill();
  X.fillStyle=lg(0,-10,0,12,[[0,"#5a4e54"],[1,"#2a2428"]]);X.beginPath();X.ellipse(0,0,7.4,10,0,0,7);X.fill();
  X.fillStyle="#6a5c62";X.beginPath();X.ellipse(0,6,4.8,4.4,0,0,7);X.fill();
  X.fillStyle="#d89a94";X.beginPath();X.ellipse(0,8.6,2.8,1.8,0,0,7);X.fill();
  X.fillStyle="#fff";X.beginPath();X.arc(-3.8,-2.4,1.8,0,7);X.arc(3.8,-2.4,1.8,0,7);X.fill();
  X.fillStyle="#120c0e";X.beginPath();X.arc(-3.6,-2.2,.95,0,7);X.arc(4,-2.2,.95,0,7);X.fill();
  X.restore()},
 sack=function(px,py,w,hh){X.fillStyle=lg(px-w,0,px+w,0,[[0,"#c4b283"],[.5,"#e6d8ae"],[1,"#a89868"]]);X.beginPath();X.moveTo(px-w,py);X.quadraticCurveTo(px-w*1.15,py-hh*.55,px-w*.45,py-hh*.92);X.lineTo(px+w*.45,py-hh*.92);X.quadraticCurveTo(px+w*1.15,py-hh*.55,px+w,py);X.closePath();X.fill();
  X.strokeStyle="rgba(80,60,20,.5)";X.lineWidth=.7;X.stroke();X.fillStyle="#b3a070";X.beginPath();X.moveTo(px-w*.5,py-hh*.92);X.lineTo(px-w*.3,py-hh*1.12);X.lineTo(px+w*.3,py-hh*1.12);X.lineTo(px+w*.5,py-hh*.92);X.closePath();X.fill();
  puff(px,py-hh*1.1,w*.55)};
 shade(p,50,17,.32);
 /* stone foundation + plaster walls */
 ibx(x,y,lu+3,lv+3,3,"#6c675c","#8f897b","#a59f90");
 ibx(x,y-3,lu,lv,h-3,"#e0d3b4","#f2e9d2","#cdbf9e");
 ql(0,1,3,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,3)[0],Lp(.5,3)[1],[[0,"rgba(255,240,200,.10)"],[1,"rgba(60,40,10,.30)"]]));
 qr(0,1,3,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,3)[0],Rp(.5,3)[1],[[0,"rgba(255,250,220,.22)"],[1,"rgba(60,40,10,.20)"]]));
 /* plaster speckle */
 for(k=0;k<46;k++){s=hs(k+3);t=hs(k+90);a=k%2?Rp(s,10+t*(h-12)):Lp(s,10+t*(h-12));X.fillStyle=k%3?"rgba(120,95,50,.16)":"rgba(255,255,240,.28)";X.fillRect(a[0],a[1],1.6,1)}
 /* stone footing course on both walls */
 ql(0,1,3,9,"#8d8778","rgba(0,0,0,.25)",.6);qr(0,1,3,9,"#a8a191","rgba(0,0,0,.25)",.6);
 X.strokeStyle="rgba(40,34,24,.5)";X.lineWidth=.9;X.beginPath();
 [5,7].forEach(function(z,j){a=Lp(0,z);b=Lp(1,z);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(0,z);b=Rp(1,z);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});
 for(k=0;k<14;k++){[[3,5],[5,7],[7,9]].forEach(function(zz,j){t=(k+(j%2?.5:0))/13;if(t>.99)return;a=Lp(t,zz[0]);b=Lp(t,zz[1]);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(t,zz[0]);b=Rp(t,zz[1]);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])})}X.stroke();
 X.strokeStyle="rgba(255,255,235,.22)";X.beginPath();[3.8,5.8,7.8].forEach(function(z){a=Rp(0,z);b=Rp(1,z);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});X.stroke();
 /* ---- LEFT WALL: plank door, window, sheep plaque ---- */
 ql(.16,.5,3,15.6,"#4a3018","rgba(0,0,0,.4)",.8);
 ql(.19,.47,3,14.8,lg(Lp(.19,3)[0],Lp(.19,3)[1],Lp(.47,3)[0],Lp(.47,3)[1],[[0,"#9a6a3c"],[1,"#7a5128"]]));
 X.strokeStyle="rgba(30,15,5,.5)";X.lineWidth=.8;X.beginPath();for(k=1;k<5;k++){a=Lp(.19+.28*k/5,3);b=Lp(.19+.28*k/5,14.8);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 ln(Lp(.19,4),Lp(.47,14),"#3a2412",1.4);ln(Lp(.19,14),Lp(.47,4),"#3a2412",1.4);
 ln(Lp(.19,6),Lp(.47,6),"#2a1a0c",1.5);ln(Lp(.19,12),Lp(.47,12),"#2a1a0c",1.5);
 a=Lp(.44,9);X.fillStyle="#e8c24a";X.beginPath();X.arc(a[0],a[1],1,0,7);X.fill();
 ql(.62,.88,10.5,18,"#4a3018","rgba(0,0,0,.4)",.8);ql(.65,.85,11.4,17.2,lg(Lp(.75,17)[0],Lp(.75,17)[1],Lp(.75,11)[0],Lp(.75,11)[1],[[0,"#bfe0f2"],[1,"#6f9fba"]]));
 ln(Lp(.75,11.4),Lp(.75,17.2),"#4a3018",1);ln(Lp(.65,14.3),Lp(.85,14.3),"#4a3018",1);
 ql(.56,.64,10.5,18,"#5f8f6a","rgba(0,0,0,.35)",.6);ql(.86,.94,10.5,18,"#5f8f6a","rgba(0,0,0,.35)",.6);
 ql(.6,.9,8.6,10.6,"#6b4a24","rgba(0,0,0,.4)",.6);
 for(k=0;k<6;k++){a=Lp(.63+k*.05,10.9);dot(a[0],a[1]-1,1.2,k%2?"#e2557a":"#f2b84a")}
 ql(.2,.46,16.4,19.8,"#7a5230","rgba(0,0,0,.45)",.8);
 q=Lp(.33,18.1);X.save();X.translate(q[0],q[1]);X.transform(1,.5,0,1,0,0);puff(-2.4,0,2.3);puff(.4,-1,2.6);puff(2.6,.2,2.2);X.fillStyle="#2e2428";X.beginPath();X.ellipse(5,.4,1.8,1.4,0,0,7);X.fill();X.restore();
 /* ---- RIGHT WALL: open pen with sheep, half door, window ---- */
 qr(.12,.62,3,16.6,"#4a3018","rgba(0,0,0,.4)",.8);
 qr(.15,.59,3,15.4,lg(Rp(.37,15.4)[0],Rp(.37,15.4)[1],Rp(.37,3)[0],Rp(.37,3)[1],[[0,"#0e0804"],[1,"#4a3320"]]));
 qr(.15,.4,3,15.4,"rgba(255,230,160,.12)");
 X.save();X.beginPath();[Rp(.15,3),Rp(.59,3),Rp(.59,15.4),Rp(.15,15.4)].forEach(function(c,i){i?X.lineTo(c[0],c[1]):X.moveTo(c[0],c[1])});X.closePath();X.clip();
 q=Rp(.28,11.2);face(q[0],q[1],.55);q=Rp(.47,10.4);face(q[0],q[1],.5);X.restore();
 qr(.15,.59,3,8.2,"#8a5a30","rgba(0,0,0,.45)",.8);
 qr(.15,.59,3,5,"rgba(0,0,0,.16)");
 X.strokeStyle="rgba(40,20,5,.5)";X.lineWidth=.9;X.beginPath();for(k=1;k<7;k++){a=Rp(.15+.44*k/7,3);b=Rp(.15+.44*k/7,8.2);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 qr(.15,.59,7.4,8.4,"#c4915a");ln(Rp(.15,8.4),Rp(.59,8.4),"rgba(255,235,190,.6)",.8);ln(Rp(.15,3.6),Rp(.59,7.6),"rgba(40,20,5,.4)",1);
 a=Rp(.55,6);X.fillStyle="#d8d0b8";X.beginPath();X.arc(a[0],a[1],1,0,7);X.fill();
 qr(.7,.92,10.5,18,"#4a3018","rgba(0,0,0,.4)",.8);qr(.73,.89,11.4,17.2,lg(Rp(.8,17)[0],Rp(.8,17)[1],Rp(.8,11)[0],Rp(.8,11)[1],[[0,"#cfe9f6"],[1,"#7fa9c2"]]));
 ln(Rp(.81,11.4),Rp(.81,17.2),"#4a3018",1);ln(Rp(.73,14.3),Rp(.89,14.3),"#4a3018",1);
 qr(.66,.72,10.5,18,"#5f8f6a","rgba(0,0,0,.35)",.6);qr(.9,.96,10.5,18,"#5f8f6a","rgba(0,0,0,.35)",.6);
 qr(.68,.94,8.6,10.6,"#6b4a24","rgba(0,0,0,.4)",.6);
 for(k=0;k<7;k++){a=Rp(.7+k*.035,10.9);dot(a[0],a[1]-1,1.2,k%2?"#f0f0f0":"#e2557a")}
 /* timber frame */
 X.strokeStyle="#4a3018";X.lineWidth=2.2;X.beginPath();
 [0,.5,1].forEach(function(tt){a=Lp(tt,3);b=Lp(tt,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});
 [0,.12,.62,.5,1].forEach(function(tt){a=Rp(tt,3);b=Rp(tt,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});
 a=Lp(0,9);b=Lp(1,9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(0,9);b=Rp(1,9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);
 a=Lp(0,h-1.5);b=Lp(1,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(0,h-1.5);b=Rp(1,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke();
 X.lineWidth=1.6;X.beginPath();
 a=Lp(0,9);b=Lp(.16,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Lp(1,9);b=Lp(.9,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);
 a=Lp(.5,9);b=Lp(.62,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);
 a=Rp(.62,16.6);b=Rp(.72,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(1,9);b=Rp(.92,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);
 a=Rp(.12,16.6);b=Rp(0,h-1.5);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke();
 ln(Rp(.12,16.6),Rp(.62,16.6),"#3a2410",2.4);
 X.strokeStyle="rgba(255,220,160,.28)";X.lineWidth=.7;X.beginPath();[0,.5,1].forEach(function(tt){a=Lp(tt,3);b=Lp(tt,h);X.moveTo(a[0]-.9,a[1]);X.lineTo(b[0]-.9,b[1])});X.stroke();
 /* eave shadows */
 qr(0,1,h-6,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,h-6)[0],Rp(.5,h-6)[1],[[0,"rgba(30,15,0,.45)"],[1,"rgba(30,15,0,0)"]]));
 ql(0,1,h-5,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,h-5)[0],Lp(.5,h-5)[1],[[0,"rgba(30,15,0,.42)"],[1,"rgba(30,15,0,0)"]]));
 /* roof geometry (thatch, lower pitch, big overhang) */
 q=BFp(x,y,lu+6,lv+6);F=[q[0],q[1]-(h+1)];L=[F[0]-(lv+6),F[1]-(lv+6)/2];R=[F[0]+lu+6,F[1]-(lu+6)/2];B=[R[0]-(lv+6),R[1]-(lv+6)/2];
 aF=[(F[0]+L[0])/2,(F[1]+L[1])/2-r];aR=[(R[0]+B[0])/2,(R[1]+B[1])/2-r];
 /* gable: plaster with timber and a hay window */
 poly([F,L,aF],"#e6d9ba","rgba(0,0,0,.35)",.9);
 poly([F,L,aF],lg((F[0]+L[0])/2,aF[1],(F[0]+L[0])/2,(F[1]+L[1])/2,[[0,"rgba(255,240,200,.06)"],[1,"rgba(60,35,5,.32)"]]));
 ln(F,L,"#4a3018",2.4);ln([(F[0]+L[0])/2,(F[1]+L[1])/2],aF,"#4a3018",2);
 ln([F[0]+(L[0]-F[0])*.2,F[1]+(L[1]-F[1])*.2],[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.55],"#4a3018",1.4);
 ln([F[0]+(L[0]-F[0])*.8,F[1]+(L[1]-F[1])*.8],[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.55],"#4a3018",1.4);
 q=[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.42];
 X.save();X.translate(q[0],q[1]);X.transform(1,.5,0,1,0,0);X.fillStyle="#4a3018";X.fillRect(-4.2,-3.6,8.4,7.2);X.fillStyle="#1a0f08";X.fillRect(-3.2,-2.6,6.4,5.2);X.fillStyle="#d8b44a";X.fillRect(-3.2,0,6.4,2.6);X.strokeStyle="rgba(120,80,10,.6)";X.lineWidth=.5;for(k=0;k<4;k++){X.beginPath();X.moveTo(-3+k*1.6,.4);X.lineTo(-2.4+k*1.6,2.4);X.stroke()}X.restore();
 /* thatch roof slope */
 poly([F,R,aR,aF],lg((F[0]+R[0])/2,(F[1]+R[1])/2,(aF[0]+aR[0])/2,(aF[1]+aR[1])/2,[[0,"#8d6c34"],[.5,"#b8954c"],[1,"#d3b266"]]),"rgba(0,0,0,.35)",.9);
 X.save();X.beginPath();X.moveTo(F[0],F[1]);X.lineTo(R[0],R[1]);X.lineTo(aR[0],aR[1]);X.lineTo(aF[0],aF[1]);X.closePath();X.clip();
 for(k=0;k<190;k++){t=hs(k+11);s=hs(k+201);a=[F[0]+(R[0]-F[0])*t+(aF[0]-F[0])*s,F[1]+(R[1]-F[1])*t+(aF[1]-F[1])*s];
  X.strokeStyle=k%3?"rgba(70,45,10,.34)":"rgba(255,235,160,.42)";X.lineWidth=.9;X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(a[0]+(aF[0]-F[0])*.16,a[1]+(aF[1]-F[1])*.16);X.stroke()}
 for(k=1;k<5;k++){s=k/5;ln([F[0]+(aF[0]-F[0])*s,F[1]+(aF[1]-F[1])*s],[R[0]+(aR[0]-R[0])*s,R[1]+(aR[1]-R[1])*s],"rgba(60,38,8,.28)",1.5);ln([F[0]+(aF[0]-F[0])*s,F[1]+(aF[1]-F[1])*s+1.6],[R[0]+(aR[0]-R[0])*s,R[1]+(aR[1]-R[1])*s+1.6],"rgba(255,235,170,.22)",1)}
 X.restore();
 /* thick thatch eave, ragged */
 poly([F,R,[R[0],R[1]+5],[F[0],F[1]+5]],lg(0,F[1],0,F[1]+5,[[0,"#a07e3c"],[1,"#5d4219"]]),"rgba(0,0,0,.3)",.6);
 X.strokeStyle="rgba(50,32,8,.55)";X.lineWidth=.9;X.beginPath();for(k=0;k<40;k++){t=k/40;a=[F[0]+(R[0]-F[0])*t,F[1]+(R[1]-F[1])*t+5];X.moveTo(a[0],a[1]-3.4);X.lineTo(a[0]+(hs(k)-.5)*1.4,a[1]+.6+hs(k+5)*1.4)}X.stroke();
 ln([F[0],F[1]+.8],[R[0],R[1]+.8],"rgba(255,235,170,.4)",.8);
 /* thatch on the rakes */
 ln(F,aF,"#a38240",3.4);ln(L,aF,"#8d6c34",3.4);ln([F[0]+1,F[1]],[aF[0]+1,aF[1]],"rgba(255,235,170,.35)",.8);
 /* ridge roll with crossed spars */
 ln(aF,aR,"#7d5d2a",4.4);ln([aF[0],aF[1]-1.4],[aR[0],aR[1]-1.4],"#c9a65a",1.6);
 for(k=1;k<9;k++){t=k/9;a=[aF[0]+(aR[0]-aF[0])*t,aF[1]+(aR[1]-aF[1])*t];ln([a[0]-1.6,a[1]-2],[a[0]+1.6,a[1]+2],"#4a3018",.9)}
 ln([aF[0]-2,aF[1]-3],[aF[0]+3,aF[1]+3],"#4a3018",1.4);ln([aF[0]+2,aF[1]-3],[aF[0]-3,aF[1]+3],"#4a3018",1.4);
 /* weathervane with a tiny sheep */
 M=[aF[0]+(aR[0]-aF[0])*.62,aF[1]+(aR[1]-aF[1])*.62-2];
 ln(M,[M[0],M[1]-15],"#2a1a0c",1.3);ln([M[0]-6,M[1]-9],[M[0]+6,M[1]-9],"#2a1a0c",1);
 puff(M[0]-1.6,M[1]-18,2.6);puff(M[0]+1.2,M[1]-19,2.8);puff(M[0]+3.2,M[1]-17.6,2.4);dot(M[0]+6,M[1]-17.4,1.5,"#2e2428");
 ln([M[0]-1.5,M[1]-15.5],[M[0]-1.5,M[1]-13.6],"#2e2428",.9);ln([M[0]+2.5,M[1]-15.5],[M[0]+2.5,M[1]-13.6],"#2e2428",.9);
 /* trough and wool sacks outside the pen */
 ibx(x+24,y+11,15,5,4,"#5a3a1c","#7a5230","#4f9cc8");
 X.fillStyle="rgba(255,255,255,.35)";a=TPt(BFp(x+24,y+11,15,5),15,5,4,.12,.5);X.fillRect(a[0],a[1]-.6,6,1);
 sack(x+41,y+7,5,9);sack(x+46,y+4,4.4,8.2);sack(x+44,y+11,4.2,7.4);
};

function buySheepShed(i){var sd=shedWithRoom("sheepshed"),id2,tl,o2;if(!sd)return false;
 tl=freeTile(i.id)||[0,0];id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
 o2={id:id2,k:i.id,c:tl[0],r:tl[1],s:1,t:nowT()};S.coins-=i.cost;S.dc.push(o2);sd.cw=(sd.cw||[]).concat([id2]);
 send("farmBuyAt",[TOKEN,id2,i.id,tl[0],tl[1]]);send("farmDecor",[TOKEN,id2,0,0,1]);send("farmCowIn",[TOKEN,id2,sd.id]);
 paint();toast("\uD83D\uDC11 New sheep moved into your sheep shed ("+sd.cw.length+"/5)");return true}
function sheepDlg(shId){var dlg=$("dlg"),sd=dcById(shId),FA=FTD.a_sheep;if(!sd)return;
 function shut(){dlg.style.display="none"}
 function SH(){return dcById(shId)||sd}
 function sheepIn(){var o=[];(SH().cw||[]).forEach(function(id){var c=dcById(id);if(c&&c.s&&o.length<5)o.push(c)});return o}
 function barnSheep(){return stored().filter(function(s){var o=s.t==="d"&&dcById(s.id);return o&&o.k==="a_sheep"})}
 function ripeSheep(c){return !!FA&&nowT()-(c.t||0)>=FA.ms}
 function grownLambs(){var c=SH().cc,now=nowT();return c?(SH().cf||[]).filter(function(q){return now-q.b>=c.g}):[]}
 function moveIn(){var bc=barnSheep(),h=SH(),o;
  if(sheepIn().length>=5){toast("The sheep shed is full (5 sheep).");return}
  if(!bc.length){toast("No sheep in your barn. Buy a sheep in the Market.");return}
  o=dcById(bc[0].id);h.cw=(h.cw||[]).concat([o.id]);send("farmCowIn",[TOKEN,o.id,shId]);paint();show();toast("\uD83D\uDC11 Sheep moved into the shed ("+sheepIn().length+"/5)")}
 function moveOut(){var L=sheepIn(),h=SH(),id;
  if(!L.length){toast("No sheep in the shed.");return}
  id=L[L.length-1].id;h.cw=(h.cw||[]).filter(function(q){return q!==id});send("farmCowOut",[TOKEN,id]);paint();show();toast("Sheep moved to your barn")}
 function harvest(){var n=0,c=SH().cc,now=nowT();
  sheepIn().forEach(function(x){if(ripeSheep(x)){n++;S.coins+=FA.sell;S.xp+=FA.xp;x.t=now;send("farmTreeHarvest",[TOKEN,x.id])}});
  if(c)(SH().cf||[]).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){n++;S.coins+=c.y;S.xp+=c.x;q.m=now;send("farmCalfMilk",[TOKEN,shId,q.i])}});
  if(!n){toast("No wool ready yet.");return}
  lvlUp();paint();show();toast("\uD83E\uDDF6 Wool collected! ("+n+")")}
 function moveLamb(toShed){var h=SH(),c=h.cc,now=nowT(),q,id2,o;
  if(!c){toast("No lambs yet.");return}
  if(toShed&&sheepIn().length>=5){toast("The sheep shed is full (5 sheep).");return}
  q=grownLambs()[0];
  if(!q){toast("No fully grown lamb yet.");return}
  h.cf=(h.cf||[]).filter(function(z){return z!==q});
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  o={id:id2,k:"a_sheep",c:0,r:0,s:1,t:now};S.dc.push(o);
  if(toShed)h.cw=(h.cw||[]).concat([id2]);
  send("farmCalfOut",[TOKEN,shId,q.i,id2,toShed?1:0]);
  paint();show();toast(toShed?"\uD83D\uDC11 Grown lamb moved into the sheep room ("+sheepIn().length+"/5)":"\uD83D\uDC11 Grown lamb moved to your barn")}
 function show(){var L=sheepIn(),bc=barnSheep(),c=SH().cc,now=nowT(),cf=SH().cf||[],ready=0,k=L.filter(ripeSheep).length;
  if(c)cf.forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m))ready++});
  $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDC11</div><div class='dtitle'>Sheep Shed</div>"+
   "<div class='dsub'>Sheep in shed: "+L.length+"/5 &middot; Sheep in barn: "+bc.length+"<br>Lambs: "+cf.length+"/10 &middot; Grown lambs: "+grownLambs().length+"</div>"+
   "<div class='dbtns' style='flex-wrap:wrap'><button class='btn alt' id='shP'>+ Sheep in</button><button class='btn alt' id='shM'>- Sheep out</button><button class='btn ok' id='shH'>Harvest wool ("+(k+ready)+")</button></div>"+
   "<div class='dbtns' style='flex-wrap:wrap'><button class='btn alt' id='shG'>Lamb to barn</button><button class='btn alt' id='shGS'>Lamb into shed</button><button class='btn alt' id='dNo'>Close</button></div>";
  $("shP").onclick=moveIn;$("shM").onclick=moveOut;$("shH").onclick=harvest;
  $("shG").onclick=function(){moveLamb(0)};$("shGS").onclick=function(){moveLamb(1)};$("dNo").onclick=shut}
 show();dlg.style.display="flex";dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
 /* SHEEP PEN: a full animated sheep pen, same behaviour as the cow shed.
   Replace your old sheepDlg function (from my last message) with this whole block.
   It sits in the same place: above function shedList(k){...}. */
function sheepDlg(shId){var sd=dcById(shId),dlg=$("dlg"),body=$("dlgBody"),W=640,H=Math.min(1300,Math.round(640*Math.max(300,innerHeight-252)/Math.min(innerWidth-32,560))),FY0=H*.4,FY1=H*.95,Z=1.5,cv,cx,bg,sheep=[],raf=0,last=0,alive=true,fx=[],shPt=[],sig="",lastSig=0,seed=7;
 if(!sd)return;
   var rm=0,pos=0,swp=0,bgL,bgR,kids={};
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
function close(){alive=false;cancelAnimationFrame(raf);dlg.style.display="none";body.style.cssText="";dlg.onclick=null}
 function ripe(c){var f=FTD[c.k];return !!f&&nowT()-(c.t||0)>=f.ms}
 function barnSheep(){return stored().filter(function(s){var o=s.t==="d"&&dcById(s.id);return o&&o.k==="a_sheep"})}
 function mkBg(){var b=document.createElement("canvas"),g=b.getContext("2d"),i,x,y,gr;b.width=W;b.height=H;
  gr=g.createLinearGradient(0,0,0,FY0);gr.addColorStop(0,"#5e4026");gr.addColorStop(1,"#86602f");g.fillStyle=gr;g.fillRect(0,0,W,FY0);
  g.strokeStyle="rgba(30,15,5,.4)";g.lineWidth=2;for(x=0;x<W;x+=44){g.beginPath();g.moveTo(x,0);g.lineTo(x,FY0);g.stroke()}
  g.strokeStyle="rgba(255,220,150,.07)";for(x=22;x<W;x+=44){g.beginPath();g.moveTo(x,0);g.lineTo(x,FY0);g.stroke()}
  g.fillStyle="#3f2814";g.fillRect(0,0,W,18);g.fillRect(0,FY0-12,W,12);
  [0,W/3,2*W/3].forEach(function(px){g.fillStyle="#3a2411";g.fillRect(px,0,14,FY0)});
  g.fillStyle="rgba(255,236,170,.14)";g.beginPath();g.moveTo(120,18);g.lineTo(220,18);g.lineTo(330,FY0+40);g.lineTo(170,FY0+40);g.closePath();g.fill();
  g.fillStyle="#d9c9a0";g.fillRect(120,34,100,70);g.fillStyle="#bfe0f2";g.fillRect(126,40,41,58);g.fillRect(173,40,41,58);
  g.fillStyle="#8fbf5a";g.fillRect(126,78,41,20);g.fillRect(173,78,41,20);
  gr=g.createLinearGradient(0,FY0,0,H);gr.addColorStop(0,"#b99350");gr.addColorStop(1,"#d3ae66");g.fillStyle=gr;g.fillRect(0,FY0-4,W,H-FY0+4);
  g.strokeStyle="rgba(120,80,20,.5)";g.lineWidth=1.3;for(i=0;i<260;i++){x=rnd()*W;y=FY0+rnd()*(H-FY0);g.beginPath();g.moveTo(x,y);g.lineTo(x+6+rnd()*8,y+(rnd()-.5)*3);g.stroke()}
  g.strokeStyle="rgba(250,225,140,.55)";for(i=0;i<160;i++){x=rnd()*W;y=FY0+rnd()*(H-FY0);g.beginPath();g.moveTo(x,y);g.lineTo(x+5+rnd()*8,y+(rnd()-.5)*3);g.stroke()}
  g.fillStyle="#6a4422";g.fillRect(470,FY0+6,150,22);g.fillStyle="#4a2e14";g.fillRect(470,FY0+24,150,6);g.fillStyle="#5aa6d4";g.fillRect(476,FY0+10,138,8);
  g.fillStyle="#e0b84a";g.fillRect(14,FY0+10,70,36);g.fillStyle="#f0d36a";g.fillRect(14,FY0+10,70,10);g.strokeStyle="#9a7a20";g.lineWidth=1.4;g.strokeRect(14,FY0+10,70,36);
  g.beginPath();g.moveTo(14,FY0+28);g.lineTo(84,FY0+28);g.stroke();
  g.strokeStyle="#2a1a0c";g.lineWidth=2;g.beginPath();g.moveTo(W*.5,18);g.lineTo(W*.5,48);g.stroke();g.fillStyle="#f2b84a";g.beginPath();g.arc(W*.5,56,9,0,7);g.fill();g.fillStyle="rgba(255,200,80,.18)";g.beginPath();g.arc(W*.5,56,26,0,7);g.fill();
    (function(){var ix=70,iy=36,by=FY0-4,gg,n,t,hs=function(k){var v=Math.sin(k*12.9898)*43758.5453;return v-Math.floor(v)};
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
   /* ceiling */
   poly([[0,0],[W,0],[W-ix,iy],[ix,iy]],vg(0,iy,"#1a1007","#3b2610"));
   [.12,.3,.5,.7,.88].forEach(function(f){var xt=W*f,xb=ix+(W-2*ix)*f;ln(xt,0,xb,iy,"#24150a",11);ln(xt-3,0,xb-1.5,iy,"rgba(255,210,140,.22)",2)});
   g.fillStyle=vg(0,18,"#5a3a1c","#2a1a0c");g.fillRect(0,0,W,18);ln(0,1,W,1,"rgba(255,220,160,.35)",2);
   g.fillStyle=vg(iy-8,iy,"#4a2f16","#2a1a0c");g.fillRect(ix,iy-8,W-2*ix,8);
   /* back wall shading */
   g.fillStyle=vg(iy,by,"rgba(0,0,0,.45)","rgba(0,0,0,.12)");g.fillRect(ix,iy,W-2*ix,by-iy);
   g.fillStyle=hg(ix,ix+110,"rgba(0,0,0,.4)","rgba(0,0,0,0)");g.fillRect(ix,iy,110,by-iy);
   g.fillStyle=hg(W-ix-110,W-ix,"rgba(0,0,0,0)","rgba(0,0,0,.4)");g.fillRect(W-ix-110,iy,110,by-iy);
   /* side walls */
   endWall(g,W,H,by,ew,"cow");poly([[0,0],[ix,iy],[ix,by],[0,by+46]],hg(0,ix,"#1b1008","#4d321a"));
   poly([[W,0],[W-ix,iy],[W-ix,by],[W,by+46]],hg(W-ix,W,"#4d321a","#1b1008"));
   for(n=1;n<8;n++){t=n/8;ln(0,(by+46)*t,ix,iy+(by-iy)*t,"rgba(0,0,0,.5)",2);ln(0,(by+46)*t+2,ix,iy+(by-iy)*t+2,"rgba(255,220,150,.1)",1.2);ln(W,(by+46)*t,W-ix,iy+(by-iy)*t,"rgba(0,0,0,.5)",2);ln(W,(by+46)*t+2,W-ix,iy+(by-iy)*t+2,"rgba(255,220,150,.1)",1.2)}
   ln(0,by+46,ix,by,"#1a0f06",5);ln(W,by+46,W-ix,by,"#1a0f06",5);
   /* floor perspective */
   for(n=0;n<=12;n++){var xb=ix+(W-2*ix)*n/12;ln(xb,by,W/2+(xb-W/2)*2.6,H,"rgba(60,35,10,.26)",2)}
   for(n=1;n<=9;n++){t=Math.pow(n/9,1.6);ln(0,FY0+(H-FY0)*t,W,FY0+(H-FY0)*t,"rgba(60,35,10,.22)",1.5);ln(0,FY0+(H-FY0)*t+2,W,FY0+(H-FY0)*t+2,"rgba(255,230,160,.12)",1.2)}
   g.fillStyle=vg(by,by+70,"rgba(0,0,0,.4)","rgba(0,0,0,0)");g.fillRect(0,by,W,70);
   g.fillStyle=hg(0,110,"rgba(0,0,0,.35)","rgba(0,0,0,0)");g.fillRect(0,by,110,H-by);
   g.fillStyle=hg(W-110,W,"rgba(0,0,0,0)","rgba(0,0,0,.35)");g.fillRect(W-110,by,110,H-by);
   /* posts */
   [W/3,2*W/3].forEach(function(px){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(px+22,FY0+4,22,5,0,0,7);g.fill();
    g.fillStyle=hg(px,px+14,"#6a4524","#2a1a0c");g.fillRect(px,iy,14,by-iy+4);ln(px+2,iy,px+2,by,"rgba(255,220,160,.3)",1.5);
    g.fillStyle=hg(px-4,px+18,"#5a3a1c","#241509");g.fillRect(px-4,by-6,22,10);ln(px-4,by-6,px+18,by-6,"rgba(255,220,160,.35)",1.5)});
   /* hay rack on back wall */
   g.fillStyle=vg(by-32,by-4,"#9a7424","#d3ad55");g.fillRect(ix,by-32,W-2*ix,28);
   for(n=0;n<140;n++){var sx=ix+hs(n)*(W-2*ix),sy=by-32+hs(n+300)*28;ln(sx,sy,sx+8+hs(n+7)*8,sy+(hs(n+9)-.5)*5,n%2?"rgba(255,235,150,.55)":"rgba(110,75,15,.45)",1.3)}
   for(x=ix+10;x<W-ix;x+=26){g.fillStyle=hg(x,x+6,"#7a5230","#3a2411");g.fillRect(x,by-34,6,32)}
   g.fillStyle=vg(by-38,by-30,"#8a5c30","#4a2e14");g.fillRect(ix-4,by-38,W-2*ix+8,9);ln(ix-4,by-38,W-ix+4,by-38,"rgba(255,225,170,.5)",1.5);
   g.fillStyle=vg(by-4,by+6,"#5a3a1c","#241509");g.fillRect(ix-4,by-4,W-2*ix+8,9);
   g.fillStyle="rgba(0,0,0,.28)";g.fillRect(ix-4,by+5,W-2*ix+8,6);
   /* window frame */
   g.strokeStyle="#5a3a1c";g.lineWidth=7;g.strokeRect(120,34,100,70);ln(123,37,217,37,"rgba(255,225,170,.4)",1.5);
   g.fillStyle="#4a2e14";g.fillRect(166,36,8,66);g.fillStyle=vg(102,112,"#8a5c30","#3a2411");g.fillRect(112,102,116,10);ln(112,102,228,102,"rgba(255,230,180,.55)",1.5);
   g.fillStyle="rgba(0,0,0,.25)";g.fillRect(116,112,108,5);
   /* stall plates 1-5 */
   g.font="bold 17px sans-serif";g.textAlign="center";g.textBaseline="middle";
   for(n=0;n<5;n++){x=W*(n+.5)/5;y=FY0-92;ln(x-14,y-14,x-14,y,"#2a1a0c",2);ln(x+14,y-14,x+14,y,"#2a1a0c",2);
    g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x-19,y+4,42,28);
    g.fillStyle=vg(y,y+26,"#b98a50","#7a5228");g.fillRect(x-21,y,42,26);g.strokeStyle="#3a2411";g.lineWidth=2;g.strokeRect(x-21,y,42,26);ln(x-20,y+1.5,x+20,y+1.5,"rgba(255,235,190,.5)",1.5);
    g.fillStyle="#2a1a0c";g.beginPath();g.arc(x-16,y+5,1.6,0,7);g.arc(x+16,y+5,1.6,0,7);g.fill();g.fillText(String(n+1),x,y+14)}
   g.textBaseline="alphabetic";
   /* hay bales (left) */
   bale(14,FY0+10,70,36,14);bale(20,FY0-24,58,32,12);
   /* water trough (right) */
   (function(x,y,w,h,d){g.fillStyle="rgba(0,0,0,.35)";g.beginPath();g.ellipse(x+w/2+8,y+h+9,w*.58,9,0,0,7);g.fill();
    g.fillStyle=hg(x,x+w,"#4a2e14","#3a2411");poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],"#2e1c0c");
    poly([[x+7,y-1],[x+d+5,y-d+3],[x+w+d-5,y-d+3],[x+w-7,y-1]],vg(y-d,y,"#8fd0f4","#4f9cc8"));ln(x+d+8,y-d+5,x+w-6,y-d+5,"rgba(255,255,255,.55)",1.5);
    poly([[x+w,y],[x+w+d,y-d],[x+w+d,y+h-d],[x+w,y+h]],"#3b2511");
    g.fillStyle=vg(y,y+h,"#9a6836","#5a3a1c");g.fillRect(x,y,w,h);ln(x+w/3,y,x+w/3,y+h,"rgba(0,0,0,.4)",2);ln(x+2*w/3,y,x+2*w/3,y+h,"rgba(0,0,0,.4)",2);
    ln(x,y+1,x+w,y+1,"rgba(255,230,180,.6)",2);g.fillStyle="#2e1c0c";g.fillRect(x+10,y+h,10,8);g.fillRect(x+w-20,y+h,10,8)})(470,FY0+6,150,24,12);
   /* light + vignette */
   gg=g.createRadialGradient(W/2,56,6,W/2,56,270);gg.addColorStop(0,"rgba(255,215,130,.38)");gg.addColorStop(1,"rgba(255,215,130,0)");g.fillStyle=gg;g.fillRect(0,0,W,FY0+150);
gg=g.createLinearGradient(0,0,0,H);gg.addColorStop(0,"rgba(0,0,0,.3)");gg.addColorStop(.35,"rgba(0,0,0,0)");gg.addColorStop(.7,"rgba(0,0,0,0)");gg.addColorStop(1,"rgba(0,0,0,.34)");g.fillStyle=gg;g.fillRect(0,0,W,H);
   /* hanging lamp */
   ln(W/2,0,W/2,42,"#1a0f06",2.5);poly([[W/2-5,40],[W/2+5,40],[W/2+14,53],[W/2-14,53]],vg(40,53,"#5a3a1c","#2a1a0c"));
   gg=g.createRadialGradient(W/2-3,55,1,W/2,57,10);gg.addColorStop(0,"#fffbe0");gg.addColorStop(1,"#f2b84a");g.fillStyle=gg;g.beginPath();g.arc(W/2,57,9,0,7);g.fill()})();
  return b}
  /* ===== NEW SHEEP BARN INTERIOR (stone + whitewash + timber, straw floor, hay manger, wool sacks, spinning wheel) ===== */
 function mkBg(ew){var b=document.createElement("canvas"),g=b.getContext("2d"),i,x,y,n,t,gg,ix=0,iy=36,by=FY0-4,sy=by-64,
  hs=function(k){var v=Math.sin(k*12.9898)*43758.5453;return v-Math.floor(v)};
  b.width=W;b.height=H;
  function poly(p,f){g.beginPath();p.forEach(function(q,j){j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fillStyle=f;g.fill()}
  function ln(x1,y1,x2,y2,c,w){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
  function vg(y1,y2,a,c){var q=g.createLinearGradient(0,y1,0,y2);q.addColorStop(0,a);q.addColorStop(1,c);return q}
  function hg(x1,x2,a,c){var q=g.createLinearGradient(x1,0,x2,0);q.addColorStop(0,a);q.addColorStop(1,c);return q}
  function wMixBg(c){return c}
  function wpuff(px,py,r){var q=g.createRadialGradient(px-r*.3,py-r*.35,r*.1,px,py,r);q.addColorStop(0,"#ffffff");q.addColorStop(.6,"#f1ecdf");q.addColorStop(1,"#c9c1ae");g.fillStyle=q;g.beginPath();g.arc(px,py,r,0,7);g.fill()}
  function sack(px,py,w,h){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(px+4,py+2,w*.95,6,0,0,7);g.fill();
   g.fillStyle=hg(px-w,px+w,"#b3a070","#e8dcb4");g.beginPath();g.moveTo(px-w,py);g.quadraticCurveTo(px-w*1.2,py-h*.55,px-w*.45,py-h*.9);g.lineTo(px+w*.45,py-h*.9);g.quadraticCurveTo(px+w*1.2,py-h*.55,px+w,py);g.closePath();g.fill();
   g.strokeStyle="rgba(80,60,20,.5)";g.lineWidth=1.4;g.stroke();g.strokeStyle="rgba(90,70,30,.22)";g.lineWidth=1;for(n=1;n<6;n++){g.beginPath();g.moveTo(px-w+n*w/3,py-3);g.lineTo(px-w*.8+n*w*.3,py-h*.8);g.stroke()}
   g.fillStyle="#9c8858";g.beginPath();g.moveTo(px-w*.5,py-h*.9);g.lineTo(px-w*.3,py-h*1.12);g.lineTo(px+w*.3,py-h*1.12);g.lineTo(px+w*.5,py-h*.9);g.closePath();g.fill();ln(px-w*.5,py-h*.92,px+w*.5,py-h*.92,"#6b4a24",2.4);
   wpuff(px,py-h*1.12,w*.5);wpuff(px-w*.3,py-h*1.02,w*.34);wpuff(px+w*.3,py-h*1.02,w*.34)}
  /* floor */
  gg=vg(FY0-4,H,"#8a6334","#aa8148");g.fillStyle=gg;g.fillRect(0,FY0-4,W,H-FY0+4);
  for(n=0;n<=12;n++){x=ix+(W-2*ix)*n/12;ln(x,by,x,H,"rgba(50,28,8,.3)",2)}
  for(n=1;n<=9;n++){t=Math.pow(n/9,1.6);ln(0,FY0+(H-FY0)*t,W,FY0+(H-FY0)*t,"rgba(50,28,8,.26)",1.5);ln(0,FY0+(H-FY0)*t+2,W,FY0+(H-FY0)*t+2,"rgba(255,225,160,.14)",1.2)}
  for(i=0;i<14;i++){x=hs(i)*W;y=FY0+hs(i+40)*(H-FY0);g.fillStyle="rgba(50,28,8,.08)";g.beginPath();g.ellipse(x,y,26+hs(i+9)*30,7+hs(i+3)*8,0,0,7);g.fill()}
  /* back wall: whitewash above, fieldstone below */
  g.fillStyle=vg(iy,sy,"#e6dcc3","#cfc2a2");g.fillRect(ix,iy,W-2*ix,sy-iy);
  for(i=0;i<260;i++){g.fillStyle=i%3?"rgba(120,95,50,.14)":"rgba(255,255,245,.22)";g.fillRect(ix+hs(i)*(W-2*ix),iy+hs(i+70)*(sy-iy),1+hs(i+5)*2,1)}
  g.save();g.beginPath();g.rect(ix,iy+9,W-2*ix,sy-iy-9);g.clip();
  [ix,W/3,2*W/3].forEach(function(px,j){var pw=(W-2*ix)/3;ln(px+14,sy,px+pw*.5,iy+9,"#5b3b1e",7);ln(px+pw-14,sy,px+pw*.5,iy+9,"#5b3b1e",7);ln(px+16,sy,px+pw*.5+2,iy+9,"rgba(255,220,160,.18)",1.6)});g.restore();
  g.fillStyle=vg(sy,by,"#7d776b","#575247");g.fillRect(ix,sy,W-2*ix,by-sy);
  for(n=0;n<4;n++){x=ix-(n%2?20:0);y=sy+n*16;while(x<W-ix){t=34+hs(n*40+x)*26;g.fillStyle=hg(x,x+t,"rgba(255,255,240,"+(.05+hs(x+n)*.12)+")","rgba(0,0,0,"+(.05+hs(x+n*3)*.14)+")");g.strokeStyle="rgba(25,20,12,.6)";g.lineWidth=1.8;g.beginPath();g.moveTo(x+4,y+1);g.lineTo(x+t-4,y+1);g.quadraticCurveTo(x+t,y+1,x+t,y+5);g.lineTo(x+t,y+11);g.quadraticCurveTo(x+t,y+15,x+t-4,y+15);g.lineTo(x+4,y+15);g.quadraticCurveTo(x,y+15,x,y+11);g.lineTo(x,y+5);g.quadraticCurveTo(x,y+1,x+4,y+1);g.closePath();g.fill();g.stroke();ln(x+5,y+3,x+t-6,y+3,"rgba(255,255,235,.25)",1.2);x+=t}}
  g.fillStyle=vg(by-26,by,"rgba(0,0,0,0)","rgba(0,0,0,.4)");g.fillRect(ix,by-26,W-2*ix,26);
  g.fillStyle=vg(0,1,"#6a4524","#6a4524");g.fillStyle=hg(0,1,"#5b3b1e","#5b3b1e");g.fillRect(ix,sy-6,W-2*ix,10);ln(ix,sy-6,W-ix,sy-6,"rgba(255,220,160,.35)",1.6);g.fillStyle="rgba(0,0,0,.3)";g.fillRect(ix,sy+4,W-2*ix,5);
  g.fillStyle=vg(iy,iy+14,"#5b3b1e","#3a2411");g.fillRect(ix,iy,W-2*ix,14);
  g.fillStyle=vg(iy,by,"rgba(0,0,0,.25)","rgba(0,0,0,.05)");g.fillRect(ix,iy,W-2*ix,sy-iy);
  g.fillStyle=hg(ix,ix+110,"rgba(0,0,0,.35)","rgba(0,0,0,0)");g.fillRect(ix,iy,110,by-iy);g.fillStyle=hg(W-ix-110,W-ix,"rgba(0,0,0,0)","rgba(0,0,0,.35)");g.fillRect(W-ix-110,iy,110,by-iy);
  /* ceiling with beams and hanging wool skeins */
  poly([[0,0],[W,0],[W-ix,iy],[ix,iy]],vg(0,iy,"#1a1007","#3b2610"));
  [.12,.3,.5,.7,.88].forEach(function(f){var xt=W*f,xb=ix+(W-2*ix)*f;ln(xt,0,xb,iy,"#24150a",11);ln(xt-3,0,xb-1.5,iy,"rgba(255,210,140,.22)",2)});
  g.fillStyle=vg(0,18,"#5a3a1c","#2a1a0c");g.fillRect(0,0,W,18);ln(0,1,W,1,"rgba(255,220,160,.35)",2);
  [[96,"#d9534f"],[262,"#5b8fd9"],[388,"#e6c34a"],[520,"#7bb661"],[582,"#c07ad9"]].forEach(function(s,j){var sx=s[0],l=34+hs(j+4)*16;ln(sx,16,sx,30,"#2a1a0c",1.6);ln(sx-7,30,sx+7,30,"#4a2e14",2.4);
   for(n=0;n<4;n++){g.strokeStyle=n%2?s[1]:wMixBg(s[1]);g.lineWidth=3.6;g.beginPath();g.ellipse(sx+(n-1.5)*.9,30+l*.5,5.2-n*.4,l*.5,0,0,7);g.stroke()}g.strokeStyle="rgba(255,255,255,.4)";g.lineWidth=1.2;g.beginPath();g.ellipse(sx-1.8,30+l*.5,4,l*.46,0,3.5,5.3);g.stroke();g.fillStyle=s[1];g.fillRect(sx-4,30+l*.45,8,3)});
  /* side walls */
  endWall(g,W,H,by,ew,"sheep");poly([[0,0],[ix,iy],[ix,by],[0,by+46]],hg(0,ix,"#2a2014","#8f805f"));poly([[W,0],[W-ix,iy],[W-ix,by],[W,by+46]],hg(W-ix,W,"#8f805f","#2a2014"));
  for(n=1;n<6;n++){t=n/6;ln(0,(by+46)*t,ix,iy+(by-iy)*t,"rgba(30,16,4,.55)",4);ln(W,(by+46)*t,W-ix,iy+(by-iy)*t,"rgba(30,16,4,.55)",4)}
  ln(0,by+46,ix,by,"#1a0f06",5);ln(W,by+46,W-ix,by,"#1a0f06",5);
  g.fillStyle=vg(by,by+70,"rgba(0,0,0,.4)","rgba(0,0,0,0)");g.fillRect(0,by,W,70);
  g.fillStyle=hg(0,110,"rgba(0,0,0,.35)","rgba(0,0,0,0)");g.fillRect(0,by,110,H-by);g.fillStyle=hg(W-110,W,"rgba(0,0,0,0)","rgba(0,0,0,.35)");g.fillRect(W-110,by,110,H-by);
  /* straw on the floor + loose wool tufts */
  for(i=0;i<420;i++){x=hs(i+500)*W;y=FY0+hs(i+900)*(H-FY0);t=7+hs(i+1300)*11+(y-FY0)/(H-FY0)*8;n=(hs(i+60)-.5)*.9;g.strokeStyle=i%3?"rgba(246,215,120,.8)":(i%3===1?"rgba(150,105,40,.6)":"rgba(255,240,170,.9)");g.lineWidth=1.3+(y-FY0)/(H-FY0)*.8;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(n)*t,y+Math.sin(n)*t);g.stroke()}
  for(i=0;i<9;i++){x=40+hs(i+7)*(W-80);y=FY0+30+hs(i+19)*(H-FY0-60);g.fillStyle="rgba(0,0,0,.14)";g.beginPath();g.ellipse(x+2,y+5,9,3,0,0,7);g.fill();wpuff(x,y,5+hs(i)*3);wpuff(x+6,y+2,3+hs(i+4)*2)}
  /* posts */
  [W/3,2*W/3].forEach(function(px){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(px+22,FY0+4,22,5,0,0,7);g.fill();g.fillStyle=hg(px,px+14,"#6a4524","#2a1a0c");g.fillRect(px,iy,14,by-iy+4);ln(px+2,iy,px+2,by,"rgba(255,220,160,.3)",1.5);g.fillStyle=hg(px-4,px+18,"#5a3a1c","#241509");g.fillRect(px-4,by-6,22,10);ln(px-4,by-6,px+18,by-6,"rgba(255,220,160,.35)",1.5)});
  /* hay manger with slats */
  (function(x0,w){var top=by-70,j,hh;g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x0+w/2+6,by+4,w*.55,7,0,0,7);g.fill();
   g.fillStyle=vg(top,by-8,"#e9c764","#b98a2c");g.beginPath();g.moveTo(x0+6,by-8);g.lineTo(x0+2,top+24);g.quadraticCurveTo(x0+w*.25,top-6,x0+w*.5,top+4);g.quadraticCurveTo(x0+w*.78,top-8,x0+w-2,top+22);g.lineTo(x0+w-6,by-8);g.closePath();g.fill();
   for(j=0;j<170;j++){x=x0+6+hs(j+600)*(w-12);y=top+14+hs(j+700)*(by-top-24);ln(x,y,x+9+hs(j+9)*9,y+(hs(j+3)-.5)*8,j%2?"rgba(255,238,160,.7)":"rgba(120,80,15,.45)",1.4)}
   for(x=x0+2;x<x0+w;x+=22){g.fillStyle=hg(x,x+7,"#7a5230","#3a2411");g.fillRect(x,by-62,7,56)}
   g.fillStyle=vg(by-66,by-56,"#8a5c30","#4a2e14");g.fillRect(x0-6,by-66,w+12,10);ln(x0-6,by-66,x0+w+6,by-66,"rgba(255,225,170,.5)",1.5);
   g.fillStyle=vg(by-12,by-2,"#6a4524","#241509");g.fillRect(x0-6,by-12,w+12,12);g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x0-6,by,w+12,5)})(300,230);
  /* wool sacks + hay bale (left) */
  (function(){var x0=22,y0=FY0+8,k;g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x0+40,y0+24,56,10,0,0,7);g.fill();
   g.fillStyle=vg(y0-8,y0+22,"#ecc760","#c9992f");g.fillRect(x0,y0-8,64,30);for(k=0;k<20;k++){ln(x0+hs(k)*64,y0-8+hs(k+30)*30,x0+hs(k)*64+8+hs(k+9)*8,y0-8+hs(k+30)*30+(hs(k+3)-.5)*3,k%2?"rgba(120,80,15,.35)":"rgba(255,235,150,.5)",1.2)}ln(x0+16,y0-8,x0+16,y0+22,"#6b4a14",2.2);ln(x0+46,y0-8,x0+46,y0+22,"#6b4a14",2.2);
   poly([[x0,y0-8],[x0+14,y0-20],[x0+78,y0-20],[x0+64,y0-8]],"#f7e08a");poly([[x0+64,y0-8],[x0+78,y0-20],[x0+78,y0+10],[x0+64,y0+22]],"#a37a22");
   sack(x0+18,y0-18,19,34);sack(x0+50,y0-20,17,30)})();
  /* spinning wheel (right) */
  (function(cxw,cyw,R){var k,a;g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(cxw+4,cyw+R+34,R*1.15,8,0,0,7);g.fill();
   ln(cxw-R*.5,cyw+R+30,cxw-R*.1,cyw+R*.1,"#4a2e14",5);ln(cxw+R*.6,cyw+R+30,cxw+R*.1,cyw+R*.1,"#4a2e14",5);ln(cxw-R*.6,cyw+R+30,cxw+R*.7,cyw+R+30,"#3a2411",5);
   g.strokeStyle="#6a4524";g.lineWidth=5;g.beginPath();g.arc(cxw,cyw,R,0,7);g.stroke();g.strokeStyle="rgba(255,220,160,.35)";g.lineWidth=1.4;g.beginPath();g.arc(cxw,cyw,R-1.5,3.6,5.2);g.stroke();
   for(k=0;k<8;k++){a=k*Math.PI/4+.3;ln(cxw,cyw,cxw+Math.cos(a)*R,cyw+Math.sin(a)*R,"#5a3a1c",2.4)}g.fillStyle="#2a1a0c";g.beginPath();g.arc(cxw,cyw,5,0,7);g.fill();
   ln(cxw+R*.1,cyw-R*.1,cxw+R*1.25,cyw-R*.55,"#4a2e14",4);g.fillStyle="#3a2411";g.fillRect(cxw+R*1.2,cyw-R*.75,6,14);wpuff(cxw+R*1.35,cyw-R*.6,6);wpuff(cxw+R*1.25,cyw-R*.45,4)})(556,FY0-12,24);
  /* water trough */
  (function(x,y,w,h,d){g.fillStyle="rgba(0,0,0,.35)";g.beginPath();g.ellipse(x+w/2+8,y+h+9,w*.58,9,0,0,7);g.fill();poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],"#2e1c0c");
   poly([[x+7,y-1],[x+d+5,y-d+3],[x+w+d-5,y-d+3],[x+w-7,y-1]],vg(y-d,y,"#8fd0f4","#4f9cc8"));ln(x+d+8,y-d+5,x+w-6,y-d+5,"rgba(255,255,255,.55)",1.5);
   poly([[x+w,y],[x+w+d,y-d],[x+w+d,y+h-d],[x+w,y+h]],"#3b2511");g.fillStyle=vg(y,y+h,"#9a6836","#5a3a1c");g.fillRect(x,y,w,h);ln(x+w/3,y,x+w/3,y+h,"rgba(0,0,0,.4)",2);ln(x+2*w/3,y,x+2*w/3,y+h,"rgba(0,0,0,.4)",2);ln(x,y+1,x+w,y+1,"rgba(255,230,180,.6)",2);
   g.fillStyle="#2e1c0c";g.fillRect(x+10,y+h,10,8);g.fillRect(x+w-20,y+h,10,8)})(330,FY0+30,130,22,12);
  /* window (same spot as before so the night sky still lines up) */
  g.fillStyle="rgba(255,236,170,.14)";g.beginPath();g.moveTo(120,18);g.lineTo(220,18);g.lineTo(330,FY0+40);g.lineTo(170,FY0+40);g.closePath();g.fill();
  g.fillStyle="#d9c9a0";g.fillRect(120,34,100,70);g.fillStyle="#bfe0f2";g.fillRect(126,40,41,58);g.fillRect(173,40,41,58);g.fillStyle="#8fbf5a";g.fillRect(126,78,41,20);g.fillRect(173,78,41,20);
  g.fillStyle="#5aa05a";g.beginPath();g.arc(146,78,9,Math.PI,0);g.arc(160,78,7,Math.PI,0);g.fill();wpuff(196,86,3);wpuff(201,88,2.4);
  g.strokeStyle="#5a3a1c";g.lineWidth=7;g.strokeRect(120,34,100,70);ln(123,37,217,37,"rgba(255,225,170,.4)",1.5);g.fillStyle="#4a2e14";g.fillRect(166,36,8,66);g.fillStyle=vg(102,112,"#8a5c30","#3a2411");g.fillRect(112,102,116,10);ln(112,102,228,102,"rgba(255,230,180,.55)",1.5);
  g.fillStyle="#5f8f6a";poly([[104,32],[120,32],[120,106],[104,112]],"#5f8f6a");poly([[236,32],[220,32],[220,106],[236,112]],"#5f8f6a");ln(112,34,112,104,"rgba(0,0,0,.25)",1.5);ln(228,34,228,104,"rgba(0,0,0,.25)",1.5);
  g.fillStyle="#6b4a24";g.fillRect(114,108,112,10);for(n=0;n<9;n++){wpuff(120+n*12.5,106,3.2);g.fillStyle=n%2?"#e2557a":"#f2b84a";g.beginPath();g.arc(120+n*12.5,103,2,0,7);g.fill()}
  /* number plaques (1-5) with a tiny sheep */
  g.font="bold 15px sans-serif";g.textAlign="center";g.textBaseline="middle";
  for(n=0;n<5;n++){x=W*(n+.5)/5;y=sy-34;g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x-19,y+4,42,24);g.fillStyle=vg(y,y+24,"#b98a50","#7a5228");g.fillRect(x-21,y,42,24);g.strokeStyle="#3a2411";g.lineWidth=2;g.strokeRect(x-21,y,42,24);ln(x-20,y+1.5,x+20,y+1.5,"rgba(255,235,190,.5)",1.5);
   wpuff(x-10,y+12,5);wpuff(x-6,y+10,4.4);g.fillStyle="#2e2428";g.beginPath();g.ellipse(x-1,y+13,2.6,2.2,0,0,7);g.fill();g.fillStyle="#2a1a0c";g.fillText(String(n+1),x+11,y+13)}
  g.textBaseline="alphabetic";
  /* shears + lantern light + vignette */
  ln(W*.5,18,W*.5,48,"#2a1a0c",2);g.fillStyle="#f2b84a";g.beginPath();g.arc(W*.5,56,9,0,7);g.fill();g.fillStyle="rgba(255,200,80,.18)";g.beginPath();g.arc(W*.5,56,26,0,7);g.fill();
  gg=g.createRadialGradient(W/2,56,6,W/2,56,270);gg.addColorStop(0,"rgba(255,215,130,.38)");gg.addColorStop(1,"rgba(255,215,130,0)");g.fillStyle=gg;g.fillRect(0,0,W,FY0+150);
  gg=g.createRadialGradient(W/2,H*.5,Math.min(W,H)*.3,W/2,H*.5,Math.max(W,H)*.78);gg.addColorStop(0,"rgba(0,0,0,0)");gg.addColorStop(1,"rgba(0,0,0,.42)");g.fillStyle=gg;g.fillRect(0,0,W,H);
  ln(W/2,0,W/2,42,"#1a0f06",2.5);poly([[W/2-5,40],[W/2+5,40],[W/2+14,53],[W/2-14,53]],vg(40,53,"#5a3a1c","#2a1a0c"));
  gg=g.createRadialGradient(W/2-3,55,1,W/2,57,10);gg.addColorStop(0,"#fffbe0");gg.addColorStop(1,"#f2b84a");g.fillStyle=gg;g.beginPath();g.arc(W/2,57,9,0,7);g.fill();
  return b}

function newSheep(c,i){var pal=i%3===1?{m:"#efeae0",d:"#cdc5b2",l:"#3a3436",s:"#2e2a2c"}:{m:"#fbf9f3",d:"#dad4c5",l:"#3a3436",s:"#3a3436"};
  return{id:c.id,x:90+rnd()*(W-180),y:FY0+14+rnd()*(FY1-FY0-18),dir:rnd()<.5?-1:1,st:"idle",t:rnd()*2,tx:0,ty:0,ph:rnd()*6,hd:0,tp:rnd()*6,sp:[],pal:pal}}
 function sync(){var L=shedCows(sd),old={};sheep.forEach(function(c){old[c.id]=c});sheep=L.map(function(c,i){return old[c.id]||newSheep(c,i)})}
 function leg(hx,ph,wk,col){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph))*5:0,kx=hx+s*5,ky=-14-l*.4,fx2=hx+s*9,fy=-1-l;
  cx.lineCap="round";cx.strokeStyle=col;cx.lineWidth=6;cx.beginPath();cx.moveTo(hx,-27);cx.lineTo(kx,ky);cx.stroke();
  cx.lineWidth=4.4;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx2,fy);cx.stroke();
  cx.fillStyle="#2a1f1a";cx.beginPath();cx.moveTo(fx2-3,fy-3);cx.lineTo(fx2+3,fy-3);cx.lineTo(fx2+3.6,fy+2);cx.lineTo(fx2-3.6,fy+2);cx.closePath();cx.fill()}
 function drawSheep(c,t){var wk=c.st==="walk",k=Z*(1.25+(c.y-FY0)/(FY1-FY0)*.55),P=c.pal,cd=dcById(c.id),rp=cd?ripe(cd):false,bob=wk?Math.sin(c.ph*2)*1:Math.sin(t*1.7+c.tp)*.3,tw=Math.sin(t*2.4+c.tp)*1.5,ch=c.st==="idle"?Math.sin(t*9+c.tp):c.st==="graze"?Math.sin(t*7+c.tp)*1.2:0,hx=31+c.hd*5,hy=-40+c.hd*17,g,j;
  function hs(n){var v=Math.sin(n*12.9898)*43758.5453;return v-Math.floor(v)}
  function puff(x,y,r,col){cx.fillStyle=col;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()}
  function leg(lx,ph,far){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph))*4:0,kx=lx+s*3,ky=-12-l*.4,fx2=lx+s*5,fy=-1-l,col=far?"rgba(30,26,26,.5)":P.l;
   cx.lineCap="round";cx.strokeStyle=col;cx.lineWidth=4.2;cx.beginPath();cx.moveTo(lx,-18);cx.lineTo(kx,ky);cx.stroke();
   cx.lineWidth=3.2;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx2,fy);cx.stroke()}
  var FLEECE=[[-22,-30,10],[-10,-40,12],[4,-42,12],[16,-34,11],[-18,-22,9],[-2,-26,12],[12,-24,10],[24,-26,8]];
  cx.save();cx.translate(c.x,c.y+bob);cx.scale(c.dir*k,k);
  cx.save();cx.translate(3,1-bob);cx.scale(1,.17);g=cx.createRadialGradient(0,0,2,0,0,44);g.addColorStop(0,"rgba(0,0,0,.45)");g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,44,0,7);cx.fill();cx.restore();
  leg(-16,c.ph+Math.PI,1);leg(10,c.ph,1);leg(-8,c.ph,0);leg(18,c.ph+Math.PI,0);
  FLEECE.forEach(function(p){puff(p[0],p[1]+1.2,p[2]+1.2,P.d)});
  FLEECE.forEach(function(p){puff(p[0],p[1],p[2],P.m)});
  for(j=0;j<22;j++)puff(-30+hs(j)*58,-52+hs(j+40)*28,.7+hs(j+9)*.7,"rgba(255,255,255,.4)");
  puff(-27+tw*.2,-26,3.2,P.d);
  puff(hx-7,hy+7,8,P.m);
  cx.save();cx.translate(hx,hy+ch*.4);
  cx.fillStyle=P.s;cx.beginPath();cx.ellipse(-8,-3,4.5,2.4,-.5,0,7);cx.fill();
  puff(-1,-8,6,P.m);
  cx.fillStyle=P.s;cx.beginPath();cx.ellipse(0,0,8.5,9,.15,0,7);cx.fill();
  cx.fillStyle="rgba(255,255,255,.18)";cx.beginPath();cx.ellipse(-2,-4,3,4,0,0,7);cx.fill();
  cx.fillStyle="#fff";cx.beginPath();cx.arc(3.2,-2.2,2,0,7);cx.fill();
  cx.fillStyle="#1a1416";cx.beginPath();cx.arc(3.8,-2,1,0,7);cx.fill();
  cx.fillStyle="#c98b84";cx.beginPath();cx.ellipse(6.8,4.2,2.6,1.9,0,0,7);cx.fill();
  cx.restore();
  cx.restore();
  if(rp){cx.font="22px sans-serif";cx.textAlign="center";cx.fillText("\uD83E\uDDF6",c.x,c.y-88*k+Math.sin(t*4+c.tp)*3)}}
 /* ===== NEW 3D-LOOK SHEEP (shaded wool sprites, real gait, wool grows back, lambs) ===== */
 function wHs(n){var v=Math.sin(n*12.9898)*43758.5453;return v-Math.floor(v)}
 function wRgb(h){return[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)]}
 function wMix(a,b,t){var p=wRgb(a),q=wRgb(b);return"rgb("+Math.round(p[0]+(q[0]-p[0])*t)+","+Math.round(p[1]+(q[1]-p[1])*t)+","+Math.round(p[2]+(q[2]-p[2])*t)+")"}
 function wSprite(P,tone){var WS=window._WS=window._WS||{},key=P.m+P.d+tone,c=WS[key],g,gr,i,a,x,y,tp,md,ed;if(c)return c;
  c=document.createElement("canvas");c.width=c.height=72;g=c.getContext("2d");
  tp=[wMix(P.m,"#ffffff",.6),wMix(P.m,"#ffffff",.2),wMix(P.m,P.d,.55)][tone];md=[P.m,wMix(P.m,P.d,.45),P.d][tone];ed=[wMix(P.m,P.d,.6),wMix(P.d,"#000000",.12),wMix(P.d,"#2a2418",.45)][tone];
  gr=g.createRadialGradient(26,24,2,36,36,33);gr.addColorStop(0,tp);gr.addColorStop(.55,md);gr.addColorStop(1,ed);
  g.fillStyle=gr;g.beginPath();g.arc(36,36,28,0,7);g.fill();
  for(i=0;i<11;i++){a=i/11*6.2832+i*.37;x=36+Math.cos(a)*23;y=36+Math.sin(a)*23;g.beginPath();g.arc(x,y,8+(i%3),0,7);g.fill()}
  g.lineCap="round";g.lineWidth=2;
  for(i=0;i<9;i++){a=wHs(i)*6.28;x=36+Math.cos(a)*wHs(i+9)*20;y=36+Math.sin(a)*wHs(i+9)*20;g.strokeStyle=i%2?"rgba(255,255,255,.4)":ed.replace("rgb","rgba").replace(")",",.3)");g.beginPath();g.arc(x,y,4+wHs(i+3)*3,wHs(i)*6,wHs(i)*6+2.6);g.stroke()}
  if(tone<2){g.fillStyle="rgba(255,255,255,.3)";g.beginPath();g.ellipse(25,23,8,5,-.6,0,7);g.fill()}
  WS[key]=c;return c}
 function wClumps(){var o=window._WC,i,a;if(o)return o;o=[];
  for(i=0;i<18;i++){a=i/18*6.2832+wHs(i)*.25;o.push([Math.cos(a)*1.02,Math.sin(a),.36+wHs(i+30)*.1,0,i])}
  for(i=0;i<14;i++){a=i/14*6.2832+.2+wHs(i+60)*.3;o.push([Math.cos(a)*.62,Math.sin(a)*.62,.36+wHs(i+90)*.1,1,i+30])}
  for(i=0;i<8;i++){a=i/8*6.2832+.4;o.push([Math.cos(a)*.28,Math.sin(a)*.28-.12,.34+wHs(i+120)*.08,2,i+60])}
  o.sort(function(p,q){return p[3]-q[3]||q[1]-p[1]});window._WC=o;return o}
 function wWool(c){var f=FTD.a_sheep,cd;if(c.wf!==undefined)return c.wf;cd=dcById(c.id);if(!cd||!f)return 1;return Math.max(0,Math.min(1,(nowT()-(cd.t||0))/f.ms))}
 function drawSheep(c,t){var wk=c.st==="walk",k=Z*(1.25+(c.y-FY0)/(FY1-FY0)*.55),P=c.pal,cd=dcById(c.id),rp=cd?ripe(cd):false,
   lamb=c.gr!==undefined,lb=lamb?1-c.gr:0,tg=wWool(c),th,gx,gy,RX,RY,cy,bob,roll,hsc,hx,hy,hd=c.hd,tilt,ch,bl,wag,i,e,x,y,rr,tn,am,WC=wClumps(),sk,hp;
  if(c.wv===undefined)c.wv=tg;else if(tg<c.wv-.25){c.wv+=(tg-c.wv)*.1;if(!c.shr||t-c.shr>1.5)c.shr=t}else c.wv+=(tg-c.wv)*(tg<c.wv?.1:1);
  th=.14+.86*c.wv;gx=.8+.3*th;gy=.7+.4*th;RX=24*(1-.16*lb);RY=13*(1-.08*lb);cy=-(33+3*lb);hsc=1+.4*lb;hp=17+4*lb;
  bob=wk?Math.sin(c.ph*2)*1.1:Math.sin(t*1.9+c.tp)*.35;roll=wk?Math.sin(c.ph)*.03:0;
  ch=c.st==="graze"?Math.sin(t*8+c.tp):c.st==="idle"?Math.max(0,Math.sin(t*.8+c.tp*2)-.7)*Math.sin(t*14):0;
  bl=Math.floor(((t+c.tp*3)%4.5)*10)===0?1:0;wag=Math.sin(t*(lamb?10:2.6)+c.tp)*(lamb?.5:.2);
  hx=40+hd*3-3*lb;hy=-43-3*lb+hd*21+(wk?Math.sin(c.ph*2+.6)*1.3:0);
  function skin(a,b,r){var g=cx.createLinearGradient(0,a,0,b);g.addColorStop(0,"#f4e0d4");g.addColorStop(1,"#c6a898");return g}
  function leg(lx,ph,far,front){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph)):0,fx=lx+s*9,fy=-l*5.5,kx=(lx+fx)/2+(front?2.2:-3),ky=-hp*.5-l*2.5,col=far?"#241f21":P.l;
   cx.lineCap="round";cx.lineJoin="round";cx.strokeStyle=col;cx.lineWidth=6.4;cx.beginPath();cx.moveTo(lx,-hp-3);cx.lineTo(kx,ky);cx.stroke();
   cx.lineWidth=4.2;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx,fy-1);cx.stroke();
   if(!far){cx.strokeStyle="rgba(255,255,255,.14)";cx.lineWidth=1.3;cx.beginPath();cx.moveTo(lx-1.6,-hp+1);cx.lineTo(kx-1.4,ky);cx.lineTo(fx-1,fy-1);cx.stroke()}
   cx.fillStyle="#150f11";cx.beginPath();cx.ellipse(fx+.8,fy,3.4,1.9,0,0,7);cx.fill()}
  cx.save();cx.translate(c.x,c.y+bob);cx.scale(c.dir*k,k);
  /* soft ground shadow */
  cx.save();cx.translate(3,1-bob);cx.scale(1,.17);e=cx.createRadialGradient(0,0,2,0,0,46);e.addColorStop(0,"rgba(0,0,0,.5)");e.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=e;cx.beginPath();cx.arc(0,0,46,0,7);cx.fill();cx.restore();
  /* legs (far pair first) */
  leg(-16*(1-.12*lb),c.ph+Math.PI,1,0);leg(14,c.ph,1,1);leg(-9,c.ph,0,0);leg(22*(1-.1*lb),c.ph+Math.PI,0,1);
  /* body */
  cx.save();cx.translate(0,cy);cx.rotate(roll);
  cx.fillStyle=skin(-RY,RY);cx.beginPath();cx.ellipse(0,0,RX*gx*.95,RY*gy*.95,0,0,7);cx.fill();
  am=th*(wk?1.3:.45)+.12;
  for(i=0;i<WC.length;i++){e=WC[i];if(th<.3&&e[3]===2)continue;rr=e[2]*30*(.3+.7*th)*(1-.22*lb);
   x=e[0]*RX*gx*(e[3]?1:1.04)+Math.sin(t*2.7+e[4]*1.7+(wk?c.ph*2:0))*am;y=e[1]*RY*gy*(1+Math.sin(t*1.9+c.tp)*.012)+Math.cos(t*3.1+e[4])*am*.7;
   tn=e[1]<-.35?0:e[1]>.4?2:1;if(e[3]===2)tn=0;if(e[3]===1&&tn===2)tn=1;
   cx.drawImage(wSprite(P,tn),x-rr,y-rr,rr*2,rr*2)}
  cx.restore();
  /* tail */
  cx.save();cx.translate(-RX*gx-2,-35-3*lb+bob*0);cx.rotate(-.5+wag);
  if(lamb){cx.strokeStyle=P.d;cx.lineWidth=3.6;cx.lineCap="round";cx.beginPath();cx.moveTo(0,0);cx.lineTo(-8,3);cx.stroke();cx.drawImage(wSprite(P,1),-15,-1,8,8)}
  else cx.drawImage(wSprite(P,1),-8,-6,12,12);
  cx.restore();
  /* throat wool */
  rr=(5+4*th)*hsc*.9;cx.drawImage(wSprite(P,1),hx-13*hsc-rr,hy+3-rr,rr*2,rr*2);cx.drawImage(wSprite(P,2),hx-8*hsc-rr*.9,hy+9-rr*.9,rr*1.8,rr*1.8);
  /* head */
  cx.save();cx.translate(hx,hy);cx.scale(hsc,hsc);cx.rotate(hd*.7-.12+Math.sin(t*.7+c.tp)*.03);
  cx.save();cx.rotate(-.35+Math.max(0,Math.sin(t*.9+c.tp*3)-.88)*Math.sin(t*38)*2.2);cx.fillStyle="#1d181b";cx.beginPath();cx.ellipse(-7,-9,6.2,2.2,0,0,7);cx.fill();cx.restore();
  e=cx.createLinearGradient(0,-11,0,10);e.addColorStop(0,"#625560");e.addColorStop(.55,P.s);e.addColorStop(1,"#171214");cx.fillStyle=e;
  cx.beginPath();cx.moveTo(-7,-3);cx.bezierCurveTo(-7,-10,3,-11,8,-8);cx.bezierCurveTo(13,-6,17,-1,17,3);cx.bezierCurveTo(17,7,12,9+ch*.7,7,9+ch*.7);cx.bezierCurveTo(1,10,-7,8,-7,-3);cx.closePath();cx.fill();
  cx.strokeStyle="rgba(255,255,255,.16)";cx.lineWidth=1.3;cx.lineCap="round";cx.beginPath();cx.moveTo(1,-8.4);cx.quadraticCurveTo(9,-7,15,-1);cx.stroke();
  cx.fillStyle="rgba(120,100,108,.55)";cx.beginPath();cx.ellipse(13,4,4.6,3.8,.1,0,7);cx.fill();
  cx.fillStyle="#d99c96";cx.beginPath();cx.ellipse(16.4,2,2,1.6,0,0,7);cx.fill();cx.fillStyle="#5a2f2f";cx.beginPath();cx.arc(16.8,1.4,.6,0,7);cx.fill();
  cx.strokeStyle="rgba(0,0,0,.55)";cx.lineWidth=.9;cx.beginPath();cx.moveTo(8,6.6+ch*.5);cx.quadraticCurveTo(12,7.4+ch*.9,16,5.4);cx.stroke();
  cx.fillStyle=bl?"#120c0e":"#e7d79a";cx.beginPath();cx.ellipse(3.8,-2.2,2.3,bl?.3:1.7,0,0,7);cx.fill();
  if(!bl){cx.fillStyle="#120c0e";cx.beginPath();cx.ellipse(3.9,-2.2,1.4,.75,0,0,7);cx.fill();cx.fillStyle="rgba(255,255,255,.9)";cx.beginPath();cx.arc(3.2,-3,.55,0,7);cx.fill()}
  cx.save();cx.rotate(.5+Math.max(0,Math.sin(t*.9+c.tp*3+1)-.88)*Math.sin(t*38)*2.2+Math.sin(t*1.3+c.tp)*.05);cx.fillStyle="#2c2528";cx.beginPath();cx.ellipse(-9,-2,7.4,2.7,0,0,7);cx.fill();cx.fillStyle="rgba(217,156,150,.65)";cx.beginPath();cx.ellipse(-8.6,-1.8,4.6,1.2,0,0,7);cx.fill();cx.restore();
  rr=(4+4*th)*(1-.15*lb);cx.drawImage(wSprite(P,0),-2.5-rr,-9.5-rr,rr*2,rr*2);cx.drawImage(wSprite(P,1),-8-rr*.7,3-rr*.7,rr*1.4,rr*1.4);
  cx.restore();
  /* wool tufts falling right after shearing */
  if(c.shr&&t-c.shr<1){e=t-c.shr;cx.globalAlpha=Math.max(0,1-e);for(i=0;i<9;i++){rr=5+wHs(i)*4;cx.drawImage(wSprite(P,i%3),(wHs(i+4)*2-1)*30-rr+Math.sin(e*5+i)*4,cy+(wHs(i+8)*2-1)*10+e*(20+wHs(i+2)*40)-rr,rr*2,rr*2)}cx.globalAlpha=1}
  cx.restore();
  if(rp){cx.font="22px sans-serif";cx.textAlign="center";cx.fillText("\uD83E\uDDF6",c.x,c.y-88*k+Math.sin(t*4+c.tp)*3)}}

function upd(dt,t){sheep.forEach(function(c){var dx,dy,d,r;c.t-=dt;if(c.hop>0)c.hop=Math.max(0,c.hop-dt);
  if(c.st==="walk"){dx=c.tx-c.x;dy=c.ty-c.y;d=Math.hypot(dx,dy);if(d<3){c.st="idle";c.t=1.5+rnd()*3}else{c.x+=dx/d*28*dt;c.y+=dy/d*18*dt;c.dir=dx>=0?1:-1;c.ph+=dt*5.4}}
  else if(c.t<=0){r=rnd();if(r<.45){c.st="walk";c.tx=60+rnd()*(W-120);c.ty=FY0+14+rnd()*(FY1-FY0-18)}else if(r<.78){c.st="graze";c.t=2.5+rnd()*3}else{c.st="idle";c.t=1.5+rnd()*2.5}}
  c.hd+=((c.st==="graze"?1:0)-c.hd)*Math.min(1,dt*4)})}
 function status(c){var f=FTD[c.k],el;if(!f)return"";el=nowT()-(c.t||0);return el>=f.ms?"Wool ready! +"+f.sell+"\uD83E\uDE99":"Next wool in "+fmtDur(f.ms-el)}
  function tm(){lambTick();var L=shedCows(sd),f=FTD.a_sheep,best=1e18,rp=0,e;L.forEach(function(c){var el=nowT()-(c.t||0);if(f&&el>=f.ms)rp++;else if(f)best=Math.min(best,f.ms-el)});e=$("shTime");if(!e)return;e.textContent=rm?tmSide():!L.length?"":rp?"\uD83E\uDDF6 Wool ready: "+rp:"Next harvest in "+fmtDur(best)}
 function rows(){var L=shedCows(sd),nb=barnSheep().length;$("shSub").textContent=rm?(lambList(rm).length?"Lamb room \u00B7 "+lambList(rm).length+"/5":"Empty room \u00B7 0/5"):L.length+"/5 sheep";$("shPlus").style.opacity=rm?((grownKids()&&L.length<5)?"1":".35"):((L.length>=5||!nb)?".35":"1");$("shMinus").style.opacity=rm?(grownKids()?"1":".35"):(L.length?"1":".35");sig=L.map(function(c){return c.id+ripe(c)}).join();tm()}
 function frame(ts){var t=ts/1000,dt,fy;if(!alive)return;if(dlg.style.display!=="flex"||!$("shCv")){alive=false;return}
  dt=Math.min(.05,(ts-last)/1000||.016);last=ts;upd(dt,t);if(pos)kidsUpd(dt);pos+=(rm-pos)*Math.min(1,dt*9);if(Math.abs(rm-pos)<.003)pos=rm;
  cx.clearRect(0,0,W,H);drawSides(t);cx.save();cx.translate(-pos*W,0);cx.drawImage(bg,0,0);
  sheep.slice().sort(function(a,b){return a.y-b.y}).forEach(function(c){var hp=c.hop>0?Math.sin((1-c.hop/.55)*Math.PI)*16:0;cx.save();cx.translate(0,-hp);drawSheep(c,t);cx.restore()});
    if(document.body.classList.contains("night")){cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var lg=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);lg.addColorStop(0,"rgba(255,200,90,.55)");lg.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=lg;cx.fillRect(0,0,W,H)}
    if(document.body.classList.contains("night")){cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
    shFx(dt);fx=fx.filter(function(e){return e.a>0});fx.forEach(function(e){e.y-=26*dt;e.a-=dt*.7;cx.globalAlpha=Math.max(0,e.a);cx.font="bold 20px sans-serif";cx.textAlign="center";cx.fillStyle="#fff";cx.strokeStyle="#7a4a10";cx.lineWidth=3;cx.strokeText(e.txt,e.x,e.y);cx.fillText(e.txt,e.x,e.y);cx.globalAlpha=1});
  cx.restore();
  if(ts-lastSig>500){lastSig=ts;if(sig!==shedCows(sd).map(function(c){return c.id+ripe(c)}).join()){sync();rows()}else if(rm)rows();else tm()}
  raf=requestAnimationFrame(frame)}
   function shBurst(cc,sell){var i,a,s,k=1.25+(cc.y-FY0)/(FY1-FY0)*.55,bx=cc.x,by=cc.y-34*k;
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
   else if(p.ty==="drop"){p.vy+=460*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#fffdf5";cx.strokeStyle="rgba(180,205,230,.9)";cx.lineWidth=1.2;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.stroke();cx.fillStyle="#fff";cx.beginPath();cx.arc(p.x-p.r*.3,p.y-p.r*.3,p.r*.32,0,7);cx.fill()}
   else if(p.ty==="spark"){p.vx*=.97;p.vy=p.vy*.97+50*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.rot+=dt*3;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.globalAlpha=Math.max(0,p.a);cx.globalCompositeOperation="lighter";cx.fillStyle="#ffe58a";cx.beginPath();for(j=0;j<8;j++){rr=j%2?p.r*.28:p.r;cx.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}cx.closePath();cx.fill();cx.restore()}
   else if(p.ty==="coin"){p.vy+=560*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.ph+=dt*11;rr=Math.max(.8,Math.abs(Math.cos(p.ph))*p.r);cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#ffd23f";cx.strokeStyle="#a8740a";cx.lineWidth=1.6;cx.beginPath();cx.ellipse(p.x,p.y,rr,p.r,0,0,7);cx.fill();cx.stroke();cx.fillStyle="rgba(255,255,255,.55)";cx.beginPath();cx.ellipse(p.x-rr*.25,p.y-p.r*.3,rr*.3,p.r*.3,0,0,7);cx.fill()}
   else if(p.ty==="txt"){p.age+=dt;p.a-=dt*.8;p.y-=36*dt;sc=p.age<.2?.5+p.age*4.5:1.4-Math.min(.4,(p.age-.2)*1.2);cx.save();cx.translate(p.x,p.y);cx.scale(sc,sc);cx.globalAlpha=Math.min(1,Math.max(0,p.a));cx.font="bold 26px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="#7a4a10";cx.fillStyle="#fff6c2";cx.strokeText(p.txt,0,0);cx.fillText(p.txt,0,0);cx.restore()}}
  cx.restore()}
 function collect(id){var c=dcById(id),f=c&&FTD[c.k],was=c&&ripe(c),cc;if(!c)return;tapTree(c);
  if(was){cc=sheep.filter(function(q){return q.id===id})[0];if(cc)shBurst(cc,f.sell)}rows()}
 body.style.cssText="max-width:560px;margin-top:100px;margin-bottom:120px;padding:0;background:transparent!important;border:0;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;overflow:hidden";
 body.innerHTML="<div style='position:relative'><canvas id='shCv' style='width:100%;display:block;border-radius:18px;touch-action:manipulation'></canvas><button id='shX' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';document.getElementById('dlgBody').style.cssText=''\" style='position:absolute;top:8px;right:8px;z-index:5;min-width:84px;height:46px;padding:0 16px;border-radius:23px;border:2px solid rgba(255,255,255,.9);background:rgba(0,0,0,.3);color:#fff;font:bold 18px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>Close</button><div id='shSub' style='position:absolute;top:10px;left:0;right:0;text-align:center;font:bold 22px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div id='shTime' style='position:absolute;top:42px;left:0;right:0;text-align:center;font:bold 14px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div style='position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:20px'><button id='shMinus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>-</button><button id='shHarv' style='height:56px;padding:0 18px;border-radius:28px;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 16px sans-serif;text-shadow:0 2px 6px #000'>Harvest</button><button id='shPlus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>+</button></div></div>";
 dlg.style.display="flex";cv=$("shCv");var dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cx=cv.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 bg=mkBg();sync();rows();
  bgL=mkBg();bgR=mkBg();
 function nightFx(){if(!document.body.classList.contains("night"))return;cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var g2=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);g2.addColorStop(0,"rgba(255,200,90,.55)");g2.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=g2;cx.fillRect(0,0,W,H);cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
 function drawSides(t){[-1,1].forEach(function(r){var im=r<0?bgL:bgR,n,x,y=FY0+(FY1-FY0)*.42,L;if(!im||Math.abs(r-pos)>=1)return;
  cx.save();cx.translate((r-pos)*W,0);cx.drawImage(im,0,0);
  
  L=lambList(r);
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
 function lambList(r){var h=SH();return h.cc?(h.cf||[]).filter(function(q){return q.r===r}):[]}
 function lambTick(){var h=SH(),c=h.cc,L,l,now=nowT();if(!c)return;L=h.cf=h.cf||[];
  if(shedCows(sd).length<1||L.length>=10){h.nx=0;return}
  if(!h.nx)h.nx=now+c.b;
  while(h.nx<=now&&L.length<10){l=L.filter(function(q){return q.r<0}).length;h.cn=(h.cn||0)+1;L.push({i:"c"+h.cn,b:h.nx,r:l<=L.length-l?-1:1,m:0});h.nx+=c.b}
  if(L.length>=10)h.nx=0}
 function kid(q){var k=kids[q.i],n;if(!k){k=kids[q.i]=newSheep({id:"k_"+q.i},parseInt(q.i.slice(1),10)||0);
  n=(SH().cf||[]).filter(function(z){return z.r===q.r&&(parseInt(z.i.slice(1),10)||0)<(parseInt(q.i.slice(1),10)||0)}).length;
  k.hx=W*(n%5+.5)/5;k.hy=FY0+(FY1-FY0)*(.3+.4*(n%2));k.x=k.hx;k.y=k.hy}return k}
 function kidsUpd(dt){var s=sheep;sheep=(SH().cf||[]).map(function(q){return kid(q)});sheep.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});upd(dt);sheep.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});sheep=s}
 function kidGrow(q){return Math.min(1,Math.max(0,(nowT()-q.b)/SH().cc.g))}
 function drawKid(q,t){var c=SH().cc,k=kid(q),now=nowT(),g=kidGrow(q),sc=.42+.58*g,oz=Z,rdy=g>=1&&(!q.m||now-q.m>=c.m),by=k.y-66*oz*sc*(1.25+(k.y-FY0)/(FY1-FY0)*.55)-8,nm=g<.34?"Baby":g<.67?"Lamb":"Young";
  k.gr=g;k.wf=g<1?.8:(!q.m?1:Math.min(1,(now-q.m)/c.m));Z=oz*sc;try{drawSheep(k,t)}finally{Z=oz}
  cx.save();cx.textAlign="center";
  if(g<1){cx.fillStyle="rgba(0,0,0,.55)";cx.fillRect(k.x-20,by,40,6);cx.fillStyle="#8be37f";cx.fillRect(k.x-19,by+1,38*g,4);cx.font="bold 11px sans-serif";cx.lineWidth=3;cx.strokeStyle="rgba(0,0,0,.7)";cx.fillStyle="#fff";cx.strokeText(nm,k.x,by-3);cx.fillText(nm,k.x,by-3)}
  else if(rdy){cx.font="24px sans-serif";cx.fillText("\uD83E\uDDF6",k.x,by-2+Math.sin(t*4+k.tp)*3)}
  cx.restore()}
 function woolKid(q){var c=SH().cc,now=nowT(),k=kid(q);
  if(now-q.b<c.g){toast("\uD83D\uDC11 Still growing: grown-up in "+fmtDur(c.g-(now-q.b)));return}
  if(q.m&&now-q.m<c.m){toast("Next wool in "+fmtDur(c.m-(now-q.m)));return}
  invAdd("y:"+sd.k,1);S.xp+=c.x;q.m=now;lvlUp();paint();toast("\uD83E\uDDF6 Wool collected! +"+c.x+" XP, stored in barn");fx.push({x:k.x+rm*W,y:k.y-100,txt:"+1 \uD83D\uDCE6",a:1.2});send("farmCalfMilk",[TOKEN,sd.id,q.i]);tm()}
 function kidTap(px,py){var best=null,bd=1e9;lambList(rm).forEach(function(q){var k=kid(q),sc=Math.max(.75,.42+.58*kidGrow(q)),kk=1.25+(k.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-k.x)+Math.abs(py-(k.y-30*kk));
   if(Math.abs(px-k.x)<58*kk*sc&&py>k.y-70*kk*sc&&py<k.y+10&&d<bd){bd=d;best=q}});
  if(best)woolKid(best)}
   function grownKids(){var c=SH().cc,now=nowT();return c?lambList(rm).filter(function(q){return now-q.b>=c.g}).length:0}
 function kidHarvest(){var c=SH().cc,now=nowT(),n=0;if(!c)return;lambList(rm).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){n++;woolKid(q)}});if(!n)toast("No wool ready yet.")}
 function kidMove(toShed){var h=SH(),c=h.cc,now=nowT(),L=lambList(rm),q=null,i,m=1e18,id2,o;if(!c)return;
  for(i=0;i<L.length;i++){if(now-L[i].b>=c.g){q=L[i];break}m=Math.min(m,c.g-(now-L[i].b))}
  if(!q){toast(L.length?"\uD83D\uDC11 No fully grown lamb yet. Next grown-up in "+fmtDur(m):"No calves in this room.");return}
  if(toShed&&shedCows(sd).length>=5){toast("The sheep shed is full (5 sheep).");return}
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  o={id:id2,k:"a_sheep",c:0,r:0,s:1,t:now};S.dc.push(o);
  h.cf=(h.cf||[]).filter(function(z){return z!==q});kids={};
  if(toShed)sd.cw=(sd.cw||[]).concat([id2]);
  send("farmCalfOut",[TOKEN,sd.id,q.i,id2,toShed?1:0]);
  paint();sync();rows();toast(toShed?"\uD83D\uDC11 Grown lamb moved into the sheep room ("+shedCows(sd).length+"/5)":"\uD83D\uDC11 Grown lamb moved to your barn")}
 function tmSide(){var c=SH().cc,L=lambList(rm),now=nowT(),rdy=0,nm=1e18,ng=1e18,a;if(!c)return"";
  L.forEach(function(q){a=now-q.b;if(a<c.g)ng=Math.min(ng,c.g-a);else if(!q.m||now-q.m>=c.m)rdy++;else nm=Math.min(nm,c.m-(now-q.m))});
  if(rdy)return"\uD83E\uDDF6 Wool ready: "+rdy+" (tap the sheep)";
  if(ng<1e18)return"Next grown-up in "+fmtDur(ng);
  if(nm<1e18)return"Next wool in "+fmtDur(nm);
  return SH().nx?"Next lamb in "+fmtDur(Math.max(0,SH().nx-now)):"Put a sheep in the shed to start a family"}
 cv.onclick=function(e){if(Math.abs(pos-rm)>.01||Date.now()-swp<400)return;var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W,py=(e.clientY-r.top)/r.height*H,best=null,bd=1e9;
   if(rm){kidTap(px,py);return}
  sheep.forEach(function(c){var k=1.25+(c.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-c.x)+Math.abs(py-(c.y-30*k));if(Math.abs(px-c.x)<58*k&&py>c.y-70*k&&py<c.y+8&&d<bd){bd=d;best=c}});
  if(best)collect(best.id)};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),id;if(ev.target===dlg){close();return}if(!b)return;
   if(rm&&(b.id==="shHarv"||b.id==="shPlus"||b.id==="shMinus")){if(b.id==="shHarv")kidHarvest();else kidMove(b.id==="shPlus");return}
  if(b.id==="shPlus"){var L=shedCows(sd),bc=barnSheep(),o;if(L.length>=5){toast("The sheep shed is full (5 sheep).");return}if(!bc.length){toast("No sheep in your barn. Buy a sheep in the Market.");return}
   o=dcById(bc[0].id);sd.cw=(sd.cw||[]).concat([o.id]);send("farmCowIn",[TOKEN,o.id,sd.id]);paint();sync();rows();toast("\uD83D\uDC11 Sheep moved into the shed ("+shedCows(sd).length+"/5)");return}
   if(b.id==="shX"){close();return}
   if(b.id==="shHarv"){var n=0;shedCows(sd).forEach(function(c){if(ripe(c)){n++;collect(c.id)}});if(!n)toast("No wool ready yet.");return}
   if(b.id==="shMinus"){var L2=shedCows(sd);if(!L2.length){toast("No sheep in the shed.");return}id=L2[L2.length-1].id;sd.cw=(sd.cw||[]).filter(function(q){return q!==id});send("farmCowOut",[TOKEN,id]);paint();sync();rows();toast("Sheep moved to your barn")}};
 raf=requestAnimationFrame(frame)}
