/* ===== BASKETBALL COURT: a full court (28 x 15 m) with two hoops. 11 x 6 tiles, or 6 x 11 the other way. ===== */
var DRAWV={bb_court:1,bb_court2:1};
HB.bb_court=[0,0,0,0];HB.bb_court2=[0,0,0,0];
function courtDraw(P,fw,fh,ZP,lk){
 var al=fw>=fh;
 function K(x,y,z){return al?P(x/28*fw,y/15*fh,(z||0)*ZP):P(y/15*fw,x/28*fh,(z||0)*ZP)}
 function pl(a,fill,stroke,lw){X.beginPath();a.forEach(function(q,i){if(i)X.lineTo(q[0],q[1]);else X.moveTo(q[0],q[1])});if(fill){X.fillStyle=fill;X.fill()}if(stroke){X.strokeStyle=stroke;X.lineWidth=(lw||1.6)*lk;X.stroke()}}
 function arc(cx,cy,r,a0,a1,n){var a=[],i,t;for(i=0;i<=n;i++){t=a0+(a1-a0)*i/n;a.push(K(cx+r*Math.cos(t),cy+r*Math.sin(t),0))}return a}
 var A=K(0,0),B=K(28,0),C=K(28,15),D=K(0,15),W="#f6f6f2",PI=Math.PI,side,i,y;
 X.save();X.lineJoin="round";X.lineCap="round";
 pl([[A[0],A[1]+5*lk],[B[0],B[1]+5*lk],[C[0],C[1]+5*lk],[D[0],D[1]+5*lk]],"#1d4a63");
 pl([A,B,C,D],"#d9a460");
 for(i=1;i<25;i++){y=i*.6;pl([K(0,y),K(28,y)],0,"rgba(110,64,20,.13)",1)}
 pl([K(0,5.05),K(5.8,5.05),K(5.8,9.95),K(0,9.95)],"#2d62ad");pl([K(28,5.05),K(22.2,5.05),K(22.2,9.95),K(28,9.95)],"#2d62ad");
 pl(arc(14,7.5,1.8,0,2*PI,30),"rgba(45,98,173,.92)");
 pl([A,B,C,D,A],0,W,2);pl([K(14,0),K(14,15)],0,W,2);pl(arc(14,7.5,1.8,0,2*PI,30),0,W,2);
 [0,1].forEach(function(s){var sg=s?-1:1,X0=s?28:0;
  function Q(x,yy){return K(s?28-x:x,yy)}
  pl([Q(0,5.05),Q(5.8,5.05),Q(5.8,9.95),Q(0,9.95)],0,W,2);
  var fa=[],t,k;for(k=0;k<=18;k++){t=-PI/2+PI*k/18;fa.push(Q(5.8+1.8*Math.cos(t),7.5+1.8*Math.sin(t)))}pl(fa,0,W,2);
  var th=Math.asin(6.6/6.75),tp=[Q(0,.9),Q(1.575+6.75*Math.cos(th),.9)];for(k=0;k<=24;k++){t=-th+2*th*k/24;tp.push(Q(1.575+6.75*Math.cos(t),7.5+6.75*Math.sin(t)))}tp.push(Q(1.575+6.75*Math.cos(th),14.1),Q(0,14.1));pl(tp,0,W,2);
  var ra=[];for(k=0;k<=14;k++){t=-PI/2+PI*k/14;ra.push(Q(1.575+1.25*Math.cos(t),7.5+1.25*Math.sin(t)))}pl(ra,0,W,1.6)});
 [0,1].forEach(function(s){
  function H(x,yy,z){return K(s?28-x:x,yy,z)}
  var ring=[],k,t,a,b;
  pl([H(.35,7.5,0),H(.35,7.5,3.35)],0,"#4b505a",4);pl([H(.35,7.5,3.3),H(1.2,7.5,3.3)],0,"#4b505a",3);
  pl([H(1.2,6.6,2.9),H(1.2,8.4,2.9),H(1.2,8.4,3.95),H(1.2,6.6,3.95)],"rgba(238,246,255,.93)","#8995a6",1.4);
  pl([H(1.2,7.2,3.05),H(1.2,7.8,3.05),H(1.2,7.8,3.5),H(1.2,7.2,3.5)],0,"#e0572a",1.3);
  pl([H(1.2,7.5,3.05),H(1.35,7.5,3.05)],0,"#ee6a1f",2.2);
  for(k=0;k<=20;k++){t=2*PI*k/20;ring.push(H(1.575+.225*Math.cos(t),7.5+.225*Math.sin(t),3.05))}pl(ring,0,"#ee6a1f",2.4);
  for(k=0;k<8;k++){t=2*PI*k/8;a=H(1.575+.225*Math.cos(t),7.5+.225*Math.sin(t),3.05);b=H(1.575+.12*Math.cos(t+.4),7.5+.12*Math.sin(t+.4),2.65);pl([a,b],0,"rgba(255,255,255,.85)",1)}
 });
 X.restore()}
function drawCourt(it,fw,fh){courtDraw(function(u,v,z){return Pp(it.c+u,it.r+v,z)},fw,fh,27.8,1)}
DEC.bb_court=function(){var s=.115;courtDraw(function(u,v,z){return[130+(u-v)*56*s,112+(u+v)*28*s-z*s]},11,6,27.8,.55)};
DEC.bb_court2=function(){var s=.115;courtDraw(function(u,v,z){return[130+(u-v)*56*s,112+(u+v)*28*s-z*s]},6,11,27.8,.55)};
