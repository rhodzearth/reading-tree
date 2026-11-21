// ---- 2 NEW DECORATION DESIGNS ----
DEC.gazebo=function(p){
 var x=p[0],y=p[1];
 shade(p,38,13,.3);

 // Wooden support posts
 poly([[x-25,y-2],[x-21,y-2],[x-21,y-43],[x-25,y-43]],"#80502d");
 poly([[x+21,y-2],[x+25,y-2],[x+25,y-43],[x+21,y-43]],"#80502d");
 poly([[x-2,y+8],[x+2,y+8],[x+2,y-43],[x-2,y-43]],"#80502d");

 // Roof
 poly([[x,y-65],[x-34,y-43],[x,y-28],[x+34,y-43]],"#a64b35","#713326",1.5);
 poly([[x-34,y-43],[x,y-28],[x,y-22],[x-34,y-37]],"#75412b");
 poly([[x,y-28],[x+34,y-43],[x+34,y-37],[x,y-22]],"#8d4a30");

 // Floor
 poly([[x-30,y-3],[x,y+12],[x+30,y-3],[x,y-18]],"#c9a36b","#76502d",1);
};

DEC.stonebridge=function(p){
 var x=p[0],y=p[1],k;
 shade(p,42,12,.3);

 // Stone bridge base
 X.fillStyle="#9a9488";
 X.beginPath();
 X.moveTo(x-39,y-2);
 X.lineTo(x-32,y-18);
 X.quadraticCurveTo(x,y-48,x+32,y-18);
 X.lineTo(x+39,y-2);
 X.lineTo(x+30,y+5);
 X.lineTo(x-30,y+5);
 X.closePath();
 X.fill();

 // Bridge top
 X.fillStyle="#c5bdae";
 X.beginPath();
 X.moveTo(x-39,y-5);
 X.quadraticCurveTo(x,y-42,x+39,y-5);
 X.lineTo(x+30,y+1);
 X.quadraticCurveTo(x,y-30,x-30,y+1);
 X.closePath();
 X.fill();

 // Stone details
 X.strokeStyle="#777268";
 X.lineWidth=1;
 X.beginPath();
 X.moveTo(x-30,y-9);X.lineTo(x-20,y-11);
 X.moveTo(x-12,y-19);X.lineTo(x-3,y-21);
 X.moveTo(x+8,y-20);X.lineTo(x+18,y-17);
 X.moveTo(x+25,y-8);X.lineTo(x+33,y-6);
 X.stroke();
};

// Selection and placement hitboxes
HB.gazebo=[-42,-70,42,16];
HB.stonebridge=[-44,-48,44,12];
DEC.nipahut=function(p){
 var x=p[0],y=p[1],Af=27,Aw=22,Ar=31,Hf=31,Hw=48,Hr=42,ze=Hf+Hw,k,i,s0,t0,
 P=function(a,b,z){return[x+a-b,y-(a+b)/2-z]},
 mv=function(q){X.moveTo(q[0],q[1])},ln=function(q){X.lineTo(q[0],q[1])},
 Fl=function(s,t){return P(-Aw,-Aw+2*Aw*s,Hf+Hw*t)},
 Fr=function(s,t){return P(-Aw+2*Aw*s,-Aw,Hf+Hw*t)},
 ap=P(0,0,ze+Hr),
 post=function(a,b,c1,c2){X.strokeStyle=c1;X.lineWidth=3.6;X.beginPath();mv(P(a,b,0));ln(P(a,b,Hf));X.stroke();X.strokeStyle=c2;X.lineWidth=1;X.beginPath();mv(P(a,b,0));ln(P(a,b,Hf));X.stroke()},
 clipPoly=function(a){X.beginPath();a.forEach(function(q,j){j?ln(q):mv(q)});X.closePath();X.clip()},
 weave=function(F,col){X.save();clipPoly([F(0,0),F(1,0),F(1,1),F(0,1)]);X.strokeStyle=col;X.lineWidth=.8;
  for(s0=-.6;s0<=1.6;s0+=.1){X.beginPath();mv(F(s0,0));ln(F(s0+.5,1));mv(F(s0,0));ln(F(s0-.5,1));X.stroke()}X.restore()},
 lerp=function(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]},
 thatch=function(c0,c1,col1,col2,dark){var e0=c0,e1=c1,j,q0,q1;
  X.save();clipPoly([c0,c1,ap]);X.fillStyle=lg(0,ap[1],0,Math.max(c0[1],c1[1]),[[0,col1],[1,col2]]);X.fillRect(x-80,y-160,160,200);
  X.lineWidth=1;for(j=0;j<=26;j++){q0=lerp(e0,e1,j/26);q1=lerp(q0,ap,.86);X.strokeStyle=j%2?"rgba(255,225,140,.22)":dark;X.beginPath();mv(q0);ln(q1);X.stroke()}
  X.strokeStyle=dark;X.lineWidth=1.3;for(j=1;j<5;j++){X.beginPath();mv(lerp(e0,ap,j*.17));ln(lerp(e1,ap,j*.17));X.stroke()}
  X.restore();
  X.strokeStyle="#6e4c18";X.lineWidth=1.6;X.beginPath();for(j=0;j<=24;j++){q0=lerp(e0,e1,j/24);mv(q0);ln([q0[0]-.5,q0[1]+2.6+(j%3)*.7])}X.stroke()};
 shade(p,54,19,.3);
 poly([P(-Af,-Af,0),P(-Af,Af,0),P(Af,Af,0),P(Af,-Af,0)],"rgba(25,15,5,.25)");
 post(Af,Af,"#4a3318","#6b4e2a");post(Af,0,"#52391c","#735430");post(0,Af,"#52391c","#735430");post(Af,-Af,"#5c4123","#85643a");post(-Af,Af,"#5c4123","#85643a");
 dot(x+13,y+8,4.2,"#a85a30");dot(x+13,y+6.2,2.6,"#c4713f");dot(x+13,y+4.6,1.6,"#2a160a");
 post(0,-Af,"#6e4f2b","#a07a46");post(-Af,0,"#6e4f2b","#a07a46");post(-Af,-Af,"#7b5a33","#b08a52");
 X.strokeStyle="#8a6a3c";X.lineWidth=1.5;X.beginPath();mv(P(-Af,-Af,13));ln(P(-Af,0,13));ln(P(-Af,Af,13));mv(P(-Af,-Af,13));ln(P(0,-Af,13));ln(P(Af,-Af,13));X.stroke();
 poly([P(-Af,-Af,Hf-4),P(-Af,Af,Hf-4),P(-Af,Af,Hf),P(-Af,-Af,Hf)],"#8a6a3c","#4a3318",.8);
 poly([P(-Af,-Af,Hf-4),P(Af,-Af,Hf-4),P(Af,-Af,Hf),P(-Af,-Af,Hf)],"#6f5230","#4a3318",.8);
 poly([P(-Af,-Af,Hf),P(-Af,Af,Hf),P(Af,Af,Hf),P(Af,-Af,Hf)],"#cfab70");
 X.strokeStyle="rgba(90,60,25,.45)";X.lineWidth=.8;X.beginPath();for(i=1;i<10;i++){mv(P(-Af+i*Af*.2,-Af,Hf));ln(P(-Af+i*Af*.2,Af,Hf))}X.stroke();
 var b0=-6.4,lt=[P(-Af,b0-6,Hf),P(-Af,b0+6,Hf)],lb=[P(-Af-17,b0-6,0),P(-Af-17,b0+6,0)];
 X.strokeStyle="#7b5a33";X.lineWidth=2.2;X.beginPath();mv(lt[0]);ln(lb[0]);mv(lt[1]);ln(lb[1]);X.stroke();
 X.strokeStyle="#a07a46";X.lineWidth=1.8;X.beginPath();for(i=1;i<6;i++){mv(lerp(lt[0],lb[0],i/6));ln(lerp(lt[1],lb[1],i/6))}X.stroke();
 poly([Fl(0,0),Fl(1,0),Fl(1,1),Fl(0,1)],lg(0,y-Hf-Hw,0,y-Hf,[[0,"#e0c386"],[1,"#c9a566"]]));weave(Fl,"rgba(95,62,22,.38)");
 poly([Fr(0,0),Fr(1,0),Fr(1,1),Fr(0,1)],lg(0,y-Hf-Hw,0,y-Hf,[[0,"#bf9d5e"],[1,"#a07f46"]]));weave(Fr,"rgba(70,44,14,.42)");
 X.strokeStyle="#6b4a24";X.lineWidth=2.2;X.beginPath();mv(Fl(0,0));ln(Fl(0,1));mv(Fl(1,0));ln(Fl(1,1));mv(Fr(1,0));ln(Fr(1,1));
 [0,.5,1].forEach(function(t){mv(Fl(0,t));ln(Fl(1,t));mv(Fr(0,t));ln(Fr(1,t))});X.stroke();
 poly([Fl(.15,0),Fl(.56,0),Fl(.56,.85),Fl(.15,.85)],lg(0,0,0,y,[[0,"#1c0f06"],[1,"#3a2412"]]),"#5a3b1e",2);
 var wa=Fr(.46,.38),wb=Fr(.84,.38),wc=Fr(.84,.74),wd=Fr(.46,.74),za=Hf+Hw*.74,a0=-Aw+2*Aw*.46,a1=-Aw+2*Aw*.84;
 poly([wa,wb,wc,wd],"#22160a","#5a3b1e",1.6);
 poly([wd,wc,P(a1,-Aw-9,za+8),P(a0,-Aw-9,za+8)],"#d3b074","#6b4a24",1.2);
 X.strokeStyle="#6b4a24";X.lineWidth=1.3;X.beginPath();mv(P((a0+a1)/2,-Aw-9,za+8));ln(P((a0+a1)/2,-Aw-2,Hf+Hw*.34));X.stroke();
 var rf=P(-Ar,-Ar,ze-2),rl=P(-Ar,Ar,ze-2),rr=P(Ar,-Ar,ze-2);
 poly([rf,rl,P(-Ar,Ar,ze-5),P(-Ar,-Ar,ze-5)],"rgba(30,18,6,.55)");
 thatch(rf,rl,"#d8b25a","#a98030","rgba(80,50,10,.38)");
 thatch(rf,rr,"#b48c3e","#876021","rgba(60,36,6,.45)");
 X.strokeStyle="#6e4c18";X.lineWidth=1.5;X.beginPath();mv(rf);ln(ap);X.stroke();
 X.strokeStyle="#5a3b1e";X.lineWidth=1.7;X.beginPath();mv([ap[0]-4,ap[1]-10]);ln([ap[0]+4,ap[1]+1]);mv([ap[0]+4,ap[1]-10]);ln([ap[0]-4,ap[1]+1]);X.stroke()};
HB.nipahut=[-62,-128,62,14];
