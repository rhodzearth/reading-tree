/* ===== COW SHED: footprint, picture, helpers, and the cow dialog ===== */
FOOT.cowshed=2;HB.cowshed=[-37,-56,37,22];FOOT.chickenshed=2;HB.chickenshed=[-37,-56,37,22];
DEC.cowshed=function(p){var x=p[0],y=p[1],lu=40,lv=30,h=22,f=BFp(x,y,lu,lv),k,n,a,b,q,t,F,L,R,B,aF,aR,M,fc,r=12,
 Lp=function(t,z){return LPt(f,lv,t,z)},Rp=function(t,z){return RPt(f,lu,t,z)},
 ql=function(t0,t1,z0,z1,fl,st,lw){poly([Lp(t0,z0),Lp(t1,z0),Lp(t1,z1),Lp(t0,z1)],fl,st,lw)},
 qr=function(t0,t1,z0,z1,fl,st,lw){poly([Rp(t0,z0),Rp(t1,z0),Rp(t1,z1),Rp(t0,z1)],fl,st,lw)},
 ln=function(p1,p2,c,w){X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.moveTo(p1[0],p1[1]);X.lineTo(p2[0],p2[1]);X.stroke()},
 hb=function(cx,cy,w,d,hh){var ff=BFp(cx,cy,w,d),j;ibx(cx,cy,w,d,hh,"#b8892a","#dcb246","#f2d878");
  X.strokeStyle="rgba(110,70,10,.45)";X.lineWidth=.8;X.beginPath();for(j=1;j<4;j++){a=RPt(ff,w,j/4,hh*.25);b=RPt(ff,w,j/4,hh*.25);X.moveTo(a[0]-2,a[1]+(j%2));X.lineTo(a[0]+2.5,a[1]+(j%2)-.5)}X.stroke();
  ln(RPt(ff,w,.3,0),RPt(ff,w,.3,hh),"#6b4a14",1);ln(RPt(ff,w,.7,0),RPt(ff,w,.7,hh),"#6b4a14",1);ln(LPt(ff,d,.5,0),LPt(ff,d,.5,hh),"rgba(90,60,10,.6)",.9)};
 /* ground shadow + trampled dirt in front */
 shade(p,50,17,.32);
  function cowHead(px,py,sc,P){var g;X.save();X.translate(px,py);X.transform(1,-.5,0,1,0,0);X.scale(sc,sc);
  X.beginPath();X.moveTo(-7,-6);X.bezierCurveTo(-16,-10,-24,-4,-26,8);X.lineTo(-26,32);X.lineTo(-4,32);X.bezierCurveTo(-4,20,0,12,2,8);X.closePath();
  X.fillStyle=lg(0,-8,0,32,[[0,P.m],[1,P.d]]);X.fill();X.save();X.clip();X.fillStyle=P.s;X.beginPath();X.ellipse(-17,12,7,6,.3,0,7);X.fill();X.restore();
  X.rotate(.3);X.fillStyle=lg(0,-9,0,9,[[0,P.m],[.6,P.m],[1,P.d]]);
  X.beginPath();X.moveTo(-9,-7);X.bezierCurveTo(-4,-11,3,-10,9,-6);X.bezierCurveTo(14,-4,19,-2,19,2);X.bezierCurveTo(19,6,16,8,12,8);X.bezierCurveTo(6,10,-2,10,-7,7);X.bezierCurveTo(-11,4,-11,-3,-9,-7);X.closePath();X.fill();
  X.strokeStyle="rgba(40,30,20,.35)";X.lineWidth=.9;X.stroke();
  X.save();X.clip();X.fillStyle=P.s;X.strokeStyle="rgba(0,0,0,.25)";X.lineWidth=2;X.beginPath();X.ellipse(-3,-5,7,4.6,-.3,0,7);X.fill();X.stroke();
  X.fillStyle=lg(0,-10,0,10,[[0,"rgba(255,255,255,.16)"],[.5,"rgba(0,0,0,0)"],[1,"rgba(40,28,18,.4)"]]);X.fillRect(-12,-12,34,24);X.restore();
  X.fillStyle=lg(0,-3,0,9,[[0,"#f0b9b1"],[1,"#c98a84"]]);X.beginPath();X.ellipse(15.5,2.4,5.4,5.5,0,0,7);X.fill();
  X.fillStyle="#8a4a48";X.beginPath();X.ellipse(18,.4,1.1,1.6,.3,0,7);X.ellipse(18,4.6,1.1,1.6,-.3,0,7);X.fill();
  X.fillStyle="rgba(255,255,255,.55)";X.beginPath();X.ellipse(14.2,-.8,1.8,.9,-.4,0,7);X.fill();
  X.strokeStyle="rgba(90,45,40,.55)";X.lineWidth=.8;X.beginPath();X.moveTo(11,6.4);X.quadraticCurveTo(15,8.4,19,5.6);X.stroke();
  X.fillStyle="#3a2418";X.beginPath();X.ellipse(3.6,-3.4,2.3,1.9,0,0,7);X.fill();X.fillStyle="#fff";X.beginPath();X.arc(4.3,-4.1,.75,0,7);X.fill();
  X.strokeStyle="rgba(20,12,8,.75)";X.lineWidth=1;X.beginPath();X.moveTo(1,-4.6);X.quadraticCurveTo(3.6,-6.6,6.6,-4.2);X.stroke();
  X.strokeStyle="rgba(90,60,40,.4)";X.lineWidth=.8;X.beginPath();X.moveTo(3.4,-1.2);X.quadraticCurveTo(3.8,1.4,2.4,3);X.stroke();
  X.save();X.translate(-8,-5.5);X.rotate(-.5);X.fillStyle=P.s;X.beginPath();X.ellipse(-5,0,8,3.4,0,0,7);X.fill();X.fillStyle="#d89a94";X.beginPath();X.ellipse(-4.6,.2,5.4,1.7,0,0,7);X.fill();X.restore();
  X.strokeStyle="#e9dec4";X.lineWidth=2.6;X.lineCap="round";X.beginPath();X.moveTo(-3.5,-9.5);X.quadraticCurveTo(-5.5,-14,-1.5,-15);X.stroke();X.strokeStyle="rgba(120,100,70,.5)";X.lineWidth=.8;X.beginPath();X.moveTo(-3,-10.5);X.lineTo(-4.4,-13);X.stroke();
  X.fillStyle=P.s;X.beginPath();X.ellipse(-1,-10,4,2.2,.2,0,7);X.fill();X.restore()}
 /* stone foundation + walls */
 ibx(x,y,lu+3,lv+3,3,"#7e7a70","#a29e92","#b8b4a8");
 ibx(x,y-3,lu,lv,h-3,"#a8322a","#c4473a","#8c2a22");
 /* wall light and shadow */
 ql(0,1,3,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,3)[0],Lp(.5,3)[1],[[0,"rgba(255,170,140,.10)"],[1,"rgba(30,0,0,.40)"]]));
 qr(0,1,3,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,3)[0],Rp(.5,3)[1],[[0,"rgba(255,200,150,.18)"],[1,"rgba(30,0,0,.30)"]]));
 /* board and batten lines on both walls */
 X.strokeStyle="rgba(40,8,4,.32)";X.lineWidth=1;X.beginPath();
 for(k=1;k<16;k++){a=Lp(k/16,3);b=Lp(k/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp(k/16,3);b=Rp(k/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 X.strokeStyle="rgba(255,190,160,.13)";X.beginPath();
 for(k=1;k<16;k++){a=Lp((k+.18)/16,3);b=Lp((k+.18)/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=Rp((k+.18)/16,3);b=Rp((k+.18)/16,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 /* hay loft door (left wall) */
 ql(.26,.74,9.4,h-.6,"#efe4d0","rgba(0,0,0,.35)",.8);
 ql(.3,.7,10.8,h-2,lg(Lp(.5,h-2)[0],Lp(.5,h-2)[1],Lp(.5,10.8)[0],Lp(.5,10.8)[1],[[0,"#120a05"],[1,"#3a2412"]]));
 ql(.3,.7,10.8,14.6,"#d8b44a");X.strokeStyle="rgba(120,80,10,.55)";X.lineWidth=.8;X.beginPath();
 for(k=0;k<7;k++){a=Lp(.31+k*.055,11.4+(k%3)*.9);X.moveTo(a[0],a[1]);X.lineTo(a[0]-2.2,a[1]-.9)}X.stroke();
 ql(.3,.7,h-2.6,h-2,"rgba(0,0,0,.45)");
 /* big opening (right wall) with cows */
 qr(.02,.98,3.2,h-1,"#efe4d0","rgba(0,0,0,.35)",.8);
 qr(.06,.94,6.2,h-3.4,lg(Rp(.5,h-3.4)[0],Rp(.5,h-3.4)[1],Rp(.5,6.2)[0],Rp(.5,6.2)[1],[[0,"#100804"],[1,"#4a2e18"]]));
 qr(.06,.4,6.2,h-3.4,"rgba(255,225,150,.14)");
qr(.445,.475,6.2,h-3.4,"#2a190c");
 X.save();X.beginPath();[Rp(.06,6.2),Rp(.94,6.2),Rp(.94,h-3.4),Rp(.06,h-3.4)].forEach(function(c,i){i?X.lineTo(c[0],c[1]):X.moveTo(c[0],c[1])});X.closePath();X.clip();
 q=Rp(.23,11.4);cowHead(q[0],q[1],.46,{m:"#f6f2ea",d:"#d6d0c2",s:"#2a2a2e"});
 q=Rp(.56,11.4);cowHead(q[0],q[1],.46,{m:"#f1e8da",d:"#d2c6b0",s:"#7b4a2a"});X.restore();
 qr(.06,.94,h-6.6,h-3.4,lg(Rp(.5,h-3.4)[0],Rp(.5,h-3.4)[1],Rp(.5,h-6.6)[0],Rp(.5,h-6.6)[1],[[0,"rgba(0,0,0,.5)"],[1,"rgba(0,0,0,0)"]]));
 /* half door */
 qr(.02,.98,3,7,"#8a5a30","rgba(0,0,0,.4)",.8);
 qr(.02,.98,3,5,"rgba(0,0,0,.18)");
 X.strokeStyle="rgba(40,20,5,.45)";X.lineWidth=.9;X.beginPath();for(k=1;k<10;k++){a=Rp(.02+.96*k/10,3);b=Rp(.02+.96*k/10,7);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 qr(.02,.98,6.2,7.2,"#c4915a");ln(Rp(.02,7.2),Rp(.98,7.2),"rgba(255,235,190,.6)",.8);
 ln(Rp(.02,3.4),Rp(.98,6.8),"rgba(40,20,5,.35)",1);
 /* dark corner posts */
 X.strokeStyle="#4a2e16";X.lineWidth=2.4;X.beginPath();
 [0,.5,1].forEach(function(tt){a=Rp(tt,3);b=Rp(tt,h);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])});X.stroke();
 /* white corner trim */
 ql(0,.035,3,h,"#efe4d0","rgba(0,0,0,.25)",.6);qr(0,.03,3,h,"#d9ccb4","rgba(0,0,0,.25)",.6);
 ql(.965,1,3,h,"#cfc2aa","rgba(0,0,0,.25)",.6);qr(.97,1,3,h,"#efe4d0","rgba(0,0,0,.25)",.6);
 /* eave shadows on the walls */
 qr(0,1,h-6,h,lg(Rp(.5,h)[0],Rp(.5,h)[1],Rp(.5,h-6)[0],Rp(.5,h-6)[1],[[0,"rgba(0,0,0,.42)"],[1,"rgba(0,0,0,0)"]]));
 ql(0,1,h-4,h,lg(Lp(.5,h)[0],Lp(.5,h)[1],Lp(.5,h-4)[0],Lp(.5,h-4)[1],[[0,"rgba(0,0,0,.4)"],[1,"rgba(0,0,0,0)"]]));
 /* roof geometry */
 q=BFp(x,y,lu+4,lv+4);F=[q[0],q[1]-(h+1)];L=[F[0]-(lv+4),F[1]-(lv+4)/2];R=[F[0]+lu+4,F[1]-(lu+4)/2];B=[R[0]-(lv+4),R[1]-(lv+4)/2];
 aF=[(F[0]+L[0])/2,(F[1]+L[1])/2-r];aR=[(R[0]+B[0])/2,(R[1]+B[1])/2-r];
 /* gable end with planks and round vent */
 poly([F,L,aF],"#c9a46a","rgba(0,0,0,.35)",.9);
 X.strokeStyle="rgba(60,35,10,.38)";X.lineWidth=.9;X.beginPath();
 for(k=1;k<12;k++){t=k/12;a=[F[0]+(L[0]-F[0])*t,F[1]+(L[1]-F[1])*t];b=t<.5?[F[0]+(aF[0]-F[0])*2*t,F[1]+(aF[1]-F[1])*2*t]:[L[0]+(aF[0]-L[0])*2*(1-t),L[1]+(aF[1]-L[1])*2*(1-t)];X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 poly([F,L,aF],lg((F[0]+L[0])/2,aF[1],(F[0]+L[0])/2,(F[1]+L[1])/2,[[0,"rgba(255,230,180,.08)"],[1,"rgba(40,15,0,.38)"]]));
 q=[(F[0]+L[0])/2,(F[1]+L[1])/2-r*.5];
 X.fillStyle="#efe4d0";X.beginPath();X.ellipse(q[0],q[1],3.6,4.2,0,0,7);X.fill();X.fillStyle="#2a160c";X.beginPath();X.ellipse(q[0],q[1],2.5,3.1,0,0,7);X.fill();
 X.strokeStyle="rgba(239,228,208,.7)";X.lineWidth=.6;X.beginPath();for(k=-1;k<=1;k++){X.moveTo(q[0]-2.4,q[1]+k*1.4);X.lineTo(q[0]+2.4,q[1]+k*1.4)}X.stroke();
 /* roof slope: corrugated metal */
 poly([F,R,aR,aF],lg((F[0]+R[0])/2,(F[1]+R[1])/2,(aF[0]+aR[0])/2,(aF[1]+aR[1])/2,[[0,"#69707a"],[.55,"#8d949c"],[1,"#b4bbc2"]]),"rgba(0,0,0,.35)",.9);
 X.lineWidth=1;for(k=1;k<20;k++){t=k/20;ln([F[0]+(R[0]-F[0])*t,F[1]+(R[1]-F[1])*t],[aF[0]+(aR[0]-aF[0])*t,aF[1]+(aR[1]-aF[1])*t],k%2?"rgba(255,255,255,.22)":"rgba(0,0,0,.2)",1)}
 poly([F,R,[R[0],R[1]+2.6],[F[0],F[1]+2.6]],"#efe4d0","rgba(0,0,0,.3)",.6);
 ln([F[0],F[1]+2.6],[R[0],R[1]+2.6],"#7a7f86",1.3);
 ln([F[0],F[1]],[aF[0],aF[1]],"#efe4d0",2);ln(L,aF,"#d9ccb4",2);
 ln(aF,aR,"#d9dee3",2.8);ln([aF[0],aF[1]-1.2],[aR[0],aR[1]-1.2],"rgba(255,255,255,.75)",.8);
 /* downspout */
 a=f[0]+lu*.97;ln([a,f[1]-lu*.97/2-h+1.8],[a,f[1]-lu*.97/2],"#8a9098",1.7);ln([a-.6,f[1]-lu*.97/2-h+2],[a-.6,f[1]-lu*.97/2],"rgba(255,255,255,.45)",.6);
 /* hay hoist beam on the gable */
 ln(aF,[aF[0]-9,aF[1]+4.5],"#3a2411",2.2);X.fillStyle="#9aa0a8";X.beginPath();X.arc(aF[0]-8,aF[1]+4.6,1.8,0,7);X.fill();ln([aF[0]-8,aF[1]+6],[aF[0]-8,aF[1]+13],"#6b4a14",.8);
 /* cupola on the ridge */
 M=[(aF[0]+aR[0])/2,(aF[1]+aR[1])/2];ibx(M[0],M[1]+2,11,9,8,"#cfc2aa","#efe4d0","#f4eadb");fc=BFp(M[0],M[1]+2,11,9);
 X.strokeStyle="rgba(60,40,20,.55)";X.lineWidth=1;X.beginPath();for(k=1;k<4;k++){a=RPt(fc,11,.15,k*1.9);b=RPt(fc,11,.85,k*1.9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);a=LPt(fc,9,.15,k*1.9);b=LPt(fc,9,.85,k*1.9);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 groof(M[0],M[1]+2,15,13,8,5,"#6d747b","#a88652");
 ln([M[0],M[1]-11],[M[0],M[1]-20],"#2a1a0c",1.2);ln([M[0]-5,M[1]-17],[M[0]+5,M[1]-17],"#2a1a0c",1);poly([[M[0]+5,M[1]-17],[M[0]+2.4,M[1]-18.6],[M[0]+2.4,M[1]-15.4]],"#2a1a0c");

};
