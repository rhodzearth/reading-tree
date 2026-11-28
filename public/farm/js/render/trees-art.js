// ===== 2 NEW TREES: Rambutan + Durian =====
TP.durian=[["#7ab85a","#2f6a3a"],["#2f6a34","#124020"]];
TP.rambutan=[["#8cc860","#3a8a38"],["#2f7a30","#0f4a1c"]];
HANG.durian=1;FSZ.durian=.3;FSZ.rambutan=.11;TSC.durian=1.1;
var _fr2=fruit2;
fruit2=function(k,x,y,r,ripe){var i,a,d,px,py,rx,ry;
 if(k==="durian"){rx=r;ry=r*1.2;
  X.fillStyle=ripe?"#8e8a34":"#4f7e2a";X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);X.fill();
  X.fillStyle=ripe?"#bdb653":"#7aa844";X.beginPath();X.ellipse(x-rx*.15,y-ry*.15,rx*.75,ry*.75,0,0,7);X.fill();
  for(i=0;i<18;i++){a=i*2.4;d=Math.sqrt((i+1)/18)*.82;px=x+Math.cos(a)*rx*d;py=y+Math.sin(a)*ry*d;
   poly([[px-r*.14,py+r*.1],[px,py-r*.26],[px+r*.14,py+r*.1]],ripe?"#6a6422":"#355c1c")}
  dot(x,y-ry*1.02,r*.1,"#5a3b20");return true}
 if(k==="rambutan"){
  X.strokeStyle=ripe?"#ee4a60":"#9acb5a";X.lineWidth=Math.max(.7,r*.12);X.lineCap="round";
  for(i=0;i<16;i++){a=i*.3927;X.beginPath();X.moveTo(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8);X.lineTo(x+Math.cos(a)*r*1.5,y+Math.sin(a)*r*1.5);X.stroke()}
  X.lineCap="butt";
  X.fillStyle=ripe?"#c8182c":"#78a83a";X.beginPath();X.arc(x,y,r,0,7);X.fill();
  X.fillStyle=ripe?"#ee5266":"#a8d070";X.beginPath();X.arc(x-r*.2,y-r*.2,r*.62,0,7);X.fill();
  leaf(x-r*.4,y-r*.4,r*.16,r*.28,.6,"rgba(255,255,255,.5)");return true}
 return _fr2(k,x,y,r,ripe)};
// ===== 30 NEW FRUIT TREES (look) =====
var G1=[["#a4e05c","#4a9a2c"],["#3f9a2a","#14541a"]],G2=[["#8cc860","#3a8a38"],["#3a8e36","#14501a"]],G3=[["#7ab85a","#2f6a3a"],["#2f6a34","#124020"]],
 G4=[["#a8c070","#6a8a4a"],["#6a8a50","#3a5a30"]],G5=[["#c8d060","#7a9a3a"],["#6a8a30","#2f5a1c"]],G6=[["#b0d884","#5a9a4a"],["#4f9a40","#1f5a2a"]];
// s = fruit shape, r = ripe colours [outer,inner], u = unripe colours, z = fruit size, h = hangs on a stem, sc = tree size, p = leaf colours
var NFR={
apricot:{s:"round",r:["#e3801e","#f9c46a"],u:["#7fa844","#b8d47a"],z:.12,b:"rgba(225,80,50,.4)",p:G6},
nectarine:{s:"round",r:["#c8281e","#f2a23a"],u:["#6e9e3a","#a8cc6a"],z:.13,b:"rgba(200,30,30,.35)",p:G6},
kumquat:{s:"oval",r:["#e08a10","#ffc84a"],u:["#6f9e30","#a8cc58"],z:.09,p:G1},
lime:{s:"round",fy:.92,r:["#5aa81e","#9ad84a"],u:["#3f8a1e","#76bc3c"],z:.11,p:G1},
tangerine:{s:"round",fx:1.1,fy:.88,r:["#e56a0a","#ffa030"],u:["#6f9e30","#b0d05a"],z:.14,p:G1},
grapefruit:{s:"round",r:["#d98a2a","#f7d36a"],u:["#7aa83a","#b4d46a"],z:.18,b:"rgba(235,110,90,.35)",p:G1},
pomelo:{s:"pear",r:["#b8c43a","#e8ee7a"],u:["#6a9a30","#a8cc58"],z:.22,h:1,sc:1.05,p:G1},
mulberry:{s:"cluster",q:1.4,o:[[-.9,.3],[.9,.3],[0,-.6]],r:["#3a1450","#7a3a9a"],u:["#a8504a","#d89a8a"],z:.07,p:G2},
loquat:{s:"oval",r:["#e88a14","#ffc050"],u:["#9ab84a","#c8dc84"],z:.11,p:G3},
persimmon:{s:"round",fx:1.12,fy:.88,cap:"#3a8a2a",r:["#e8600a","#ff9a3a"],u:["#9ab040","#c8d878"],z:.15,p:G5},
crabapple:{s:"round",r:["#b8141c","#ee4a3a"],u:["#7aa844","#b0d070"],z:.09,p:G6},
kamias:{s:"cluster",q:1.7,o:[[-1,.2],[0,.9],[1,.2]],r:["#b8c83a","#e4ee80"],u:["#3f8a2c","#76bc50"],z:.07,p:G2},
quince:{s:"pear",r:["#d8b818","#f4e45a"],u:["#7aa83a","#b4d46a"],z:.17,p:G6},
acerola:{s:"cluster",q:1,o:[[-.8,.3],[.8,.3]],r:["#c8102a","#f04a5a"],u:["#8ab040","#c0d870"],z:.08,p:G2},
jujube:{s:"cluster",q:1.3,o:[[-1,.3],[1,.3],[0,-.5]],r:["#8a3414","#c4683a"],u:["#7aa83a","#b4d46a"],z:.08,p:G6},
santol:{s:"round",pc:"rgba(120,80,10,.4)",r:["#d8a020","#f6d46a"],u:["#8aa83a","#bcd470"],z:.17,sc:1.05,p:G3},
starfruit:{s:"ridge",r:["#e0b010","#fbe65a"],u:["#5f9a2c","#98c85a"],z:.14,p:G3},
longan:{s:"cluster",q:1,o:[[-1,.3],[1,.3],[0,-.5],[0,.7]],r:["#b88a4a","#e4c38a"],u:["#9aa86a","#c8d094"],z:.07,p:G3},
tamarind:{s:"pod",r:["#6a4224","#a67c4a"],u:["#6f9a3a","#a4c85a"],z:.2,h:1,p:G3},
chico:{s:"round",fx:1.08,fy:.95,pc:"rgba(70,40,10,.4)",r:["#8a5a2a","#c49458"],u:["#a89a60","#c8bc84"],z:.13,p:G3},
olive:{s:"oval",r:["#1f2a14","#4a5a2c"],u:["#6f8a34","#a4c05a"],z:.08,p:G4},
atis:{s:"bumpy",r:["#7aa83a","#b0d070"],u:["#5a8a2c","#8cbc54"],z:.15,h:1,p:G2},
soursop:{s:"spiky",r:["#3f7a24","#76b04a"],u:["#4f8a2c","#86bc54"],z:.22,h:1,sc:1.06,p:G3},
mangosteen:{s:"round",cap:"#3a7a2a",r:["#4a1450","#8a4a8a"],u:["#6a8a3a","#a4c070"],z:.13,p:G3},
date:{s:"cluster",q:1.8,o:[[-1,.4],[0,.9],[1,.4],[0,-.3]],r:["#8a3a14","#c4703a"],u:["#d8b02a","#f0d870"],z:.07,p:G5},
almond:{s:"oval",r:["#8a6a3a","#d4b47a"],u:["#7a9a3a","#b0cc68"],z:.1,p:G4},
walnut:{s:"round",w:1,r:["#6a4a24","#a68450"],u:["#5f8a2c","#98bc54"],z:.13,sc:1.05,p:G3},
cashew:{s:"cashew",r:["#d8381e","#f8a03a"],u:["#8ab040","#c0d870"],z:.15,h:1,p:G3},
chestnut:{s:"burr",r:["#5a3a1a","#8a6a3a"],u:["#5f8a2c","#8cb84a"],z:.13,p:G2},
breadfruit:{s:"round",pc:"rgba(60,90,20,.45)",r:["#a8b828","#d8e468"],u:["#5f8a2c","#98bc54"],z:.22,h:1,sc:1.1,p:G3}
};
Object.keys(NFR).forEach(function(k){var F=NFR[k];TP[k]=F.p;FSZ[k]=F.z;if(F.h)HANG[k]=1;if(F.sc)TSC[k]=F.sc});
var _fr3=fruit2;
fruit2=function(k,x,y,r,ripe){var F=NFR[k],c,i,a,o,q,rr;
 if(!F)return _fr3(k,x,y,r,ripe);
 c=ripe?F.r:F.u;
 function ov(c1,c2,rx,ry,rot){X.fillStyle=c1;X.beginPath();X.ellipse(x,y,rx,ry,rot||0,0,7);X.fill();X.fillStyle=c2;X.beginPath();X.ellipse(x-rx*.15,y-ry*.18,rx*.72,ry*.72,rot||0,0,7);X.fill()}
 function hi(){leaf(x-r*.42,y-r*.42,r*.17,r*.3,.6,"rgba(255,255,255,.55)")}
 function lf(){leaf(x+r*.3,y-r*.95,r*.5,r*.22,-.3,"#2f8a28")}
 switch(F.s){
 case "round":
  ov(c[0],c[1],r*(F.fx||1),r*(F.fy||.96));
  if(ripe&&F.b)leaf(x+r*.3,y+r*.2,r*.5,r*.6,0,F.b);
  if(F.pc)for(i=0;i<12;i++)dot(x+Math.sin(i*2.3)*r*.62,y+Math.cos(i*1.7)*r*.6,r*.07,F.pc);
  if(F.w){X.strokeStyle="rgba(40,20,5,.4)";X.lineWidth=.8;X.beginPath();X.arc(x,y,r*.6,.6,2.6);X.stroke();X.beginPath();X.arc(x,y,r*.35,3.6,5.6);X.stroke()}
  hi();
  if(F.cap){for(i=0;i<4;i++)leaf(x+(i-1.5)*r*.4,y-r*(F.fy||.96)*.85,r*.38,r*.17,(i-1.5)*.5,F.cap)}
  else{dot(x,y-r*.9,r*.12,"#4a6a22");lf()}
  break;
 case "oval":ov(c[0],c[1],r*1.2,r*.85,.2);hi();lf();break;
 case "pear":
  blob(x,y+r*.35,r*.95,[c[1],c[0]]);blob(x,y-r*.5,r*.66,[c[1],c[0]]);
  poly([[x-r*.62,y-r*.5],[x+r*.62,y-r*.5],[x+r*.9,y+r*.3],[x-r*.9,y+r*.3]],c[0]);
  hi();dot(x,y-r*1.1,r*.1,"#5a3b20");leaf(x+r*.5,y-r*1.25,r*.5,r*.22,-.4,"#3a9a2e");break;
 case "ridge":
  ov(c[0],c[1],r*1.3,r*.8,.35);
  X.save();X.translate(x,y);X.rotate(.35);X.strokeStyle="rgba(120,70,0,.4)";X.lineWidth=.8;
  for(i=-1;i<=1;i++){X.beginPath();X.moveTo(-r*(1.2-Math.abs(i)*.2),i*r*.3);X.lineTo(r*(1.2-Math.abs(i)*.2),i*r*.3);X.stroke()}
  X.restore();hi();break;
 case "cluster":
  o=F.o;q=F.q||1;rr=r*.62;
  X.strokeStyle="#5a4a28";X.lineWidth=1;
  o.forEach(function(p){X.beginPath();X.moveTo(x,y-r*1.1);X.lineTo(x+p[0]*r*.8,y+p[1]*r*.6-rr);X.stroke()});
  o.forEach(function(p){var bx=x+p[0]*r*.8,by=y+p[1]*r*.6,rx=rr/Math.sqrt(q),ry=rr*Math.sqrt(q);
   X.fillStyle=c[0];X.beginPath();X.ellipse(bx,by,rx,ry,0,0,7);X.fill();
   X.fillStyle=c[1];X.beginPath();X.ellipse(bx-rx*.2,by-ry*.2,rx*.6,ry*.6,0,0,7);X.fill();
   dot(bx-rx*.35,by-ry*.4,Math.max(.5,rx*.2),"rgba(255,255,255,.6)")});
  break;
 case "pod":
  X.lineCap="round";X.strokeStyle=c[0];X.lineWidth=r*.85;X.beginPath();X.moveTo(x-r*.6,y-r*1.4);X.quadraticCurveTo(x+r*1.2,y-r*.2,x-r*.1,y+r*1.5);X.stroke();
  X.strokeStyle=c[1];X.lineWidth=r*.4;X.beginPath();X.moveTo(x-r*.65,y-r*1.35);X.quadraticCurveTo(x+r*1.1,y-r*.2,x-r*.15,y+r*1.4);X.stroke();X.lineCap="butt";
  for(i=0;i<4;i++)dot(x+Math.sin(i*1.1)*r*.5+r*.15,y-r*1+i*r*.7,r*.1,"rgba(40,20,5,.45)");break;
 case "bumpy":
  ov(c[0],c[1],r,r*.95);
  for(i=0;i<9;i++){dot(x+Math.sin(i*2.3)*r*.6,y+Math.cos(i*1.7)*r*.6,r*.2,c[1]);dot(x+Math.sin(i*2.3)*r*.6+r*.04,y+Math.cos(i*1.7)*r*.6+r*.05,r*.08,"rgba(40,70,20,.45)")}
  hi();break;
 case "spiky":
  ov(c[0],c[1],r*.95,r*1.2,.35);
  X.strokeStyle="#2a5a18";X.lineWidth=Math.max(.6,r*.08);
  for(i=0;i<12;i++){a=x+Math.sin(i*2.4)*r*.6;q=y+Math.cos(i*1.9)*r*.85;X.beginPath();X.moveTo(a,q);X.lineTo(a+r*.12,q-r*.2);X.stroke()}
  hi();break;
 case "cashew":
  ov(c[0],c[1],r*.85,r*1.05);hi();
  X.fillStyle="#6a7a4a";X.beginPath();X.ellipse(x+r*.1,y+r*1.25,r*.55,r*.3,.4,0,7);X.fill();
  X.fillStyle="rgba(255,255,255,.3)";X.beginPath();X.ellipse(x,y+r*1.15,r*.25,r*.1,.4,0,7);X.fill();break;
 case "burr":
  X.strokeStyle=c[0];X.lineWidth=Math.max(.7,r*.12);X.lineCap="round";
  for(i=0;i<14;i++){a=i*.449;X.beginPath();X.moveTo(x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7);X.lineTo(x+Math.cos(a)*r*1.35,y+Math.sin(a)*r*1.35);X.stroke()}
  X.lineCap="butt";ov(c[0],c[1],r,r*.95);hi();break;
 }
 return true};

function fhead(F,x,y,r){var i,an,n=F.n||6,t,m,yy,ww,rr,d,q,st=F.st;
 if(st==="daisy"){for(i=0;i<n;i++){an=i*6.2832/n;leaf(x+Math.cos(an)*r*.8,y+Math.sin(an)*r*.8,r*.6,r*.26,an,i%2?F.c1:F.c2)}dot(x,y,r*.4,F.cn);dot(x-r*.12,y-r*.12,r*.14,"rgba(255,255,255,.45)");return}
 if(st==="ruff"){for(q=0;q<3;q++){d=r*(.62-q*.2);for(i=0;i<n;i++){an=i*6.2832/n+q*.35;leaf(x+Math.cos(an)*d,y+Math.sin(an)*d,r*(.5-q*.1),r*(.22-q*.03),an,q===1?F.c2:F.c1)}}dot(x,y,r*.2,F.cn);dot(x-r*.07,y-r*.07,r*.07,"rgba(255,255,255,.4)");return}
 if(st==="tulip"){leaf(x-r*.5,y,r*.45,r,-.18,F.c1);leaf(x+r*.5,y,r*.45,r,.18,F.c1);leaf(x,y-r*.1,r*.5,r*1.1,0,F.c2);return}
 if(st==="rose"){for(i=0;i<5;i++){an=i*1.2566+.4;leaf(x+Math.cos(an)*r*.8,y+Math.sin(an)*r*.8,r*.45,r*.34,an,F.c1)}blob(x,y,r*.8,[F.c2,F.c1]);X.strokeStyle=F.cn;X.lineWidth=Math.max(.6,r*.1);X.beginPath();X.arc(x,y,r*.45,.5,4.6);X.stroke();X.beginPath();X.arc(x+r*.05,y,r*.2,3,6.6);X.stroke();return}
 if(st==="poppy"){for(i=0;i<4;i++){an=i*1.5708+.8;leaf(x+Math.cos(an)*r*.55,y+Math.sin(an)*r*.5,r*.62,r*.55,an,i%2?F.c1:F.c2)}dot(x,y,r*.3,F.cn);for(i=0;i<8;i++){an=i*.785;dot(x+Math.cos(an)*r*.42,y+Math.sin(an)*r*.42,Math.max(.4,r*.06),F.cn)}return}
 if(st==="pansy"){leaf(x-r*.5,y-r*.45,r*.55,r*.5,-.4,F.c1);leaf(x+r*.5,y-r*.45,r*.55,r*.5,.4,F.c1);leaf(x-r*.6,y+r*.25,r*.5,r*.5,.3,F.c2);leaf(x+r*.6,y+r*.25,r*.5,r*.5,-.3,F.c2);leaf(x,y+r*.6,r*.55,r*.5,0,F.c2);dot(x,y,r*.28,F.cn);dot(x,y,r*.1,"#3a1a5a");return}
 if(st==="trumpet"){for(i=0;i<5;i++){an=i*1.2566-1.57;leaf(x+Math.cos(an)*r*.55,y+Math.sin(an)*r*.55,r*.62,r*.5,an,i%2?F.c1:F.c2)}dot(x,y,r*.36,F.c1);dot(x,y,r*.2,F.cn);if(F.stam){X.strokeStyle="#f5d020";X.lineWidth=Math.max(.8,r*.1);X.beginPath();X.moveTo(x,y);X.lineTo(x+r*.8,y-r*.7);X.stroke();dot(x+r*.8,y-r*.7,Math.max(.6,r*.14),"#d8a010")}return}
 if(st==="star"){for(i=0;i<n;i++){an=i*6.2832/n-1.57;poly([[x,y],[x+Math.cos(an-.28)*r*.7,y+Math.sin(an-.28)*r*.7],[x+Math.cos(an)*r*1.15,y+Math.sin(an)*r*1.15],[x+Math.cos(an+.28)*r*.7,y+Math.sin(an+.28)*r*.7]],i%2?F.c1:F.c2)}dot(x,y,r*.18,F.cn);if(n>5)for(i=0;i<4;i++){an=i*1.5+.3;X.strokeStyle=F.cn;X.lineWidth=.7;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(an)*r*.6,y+Math.sin(an)*r*.6);X.stroke()}return}
 if(st==="iris"){leaf(x,y-r*.5,r*.4,r*.9,0,F.c2);leaf(x-r*.5,y-r*.3,r*.4,r*.8,-.5,F.c2);leaf(x+r*.5,y-r*.3,r*.4,r*.8,.5,F.c2);leaf(x-r*.7,y+r*.35,r*.5,r*.36,.5,F.c1);leaf(x+r*.7,y+r*.35,r*.5,r*.36,-.5,F.c1);leaf(x,y+r*.55,r*.36,r*.5,0,F.c1);dot(x,y+r*.1,r*.14,F.cn);return}
 if(st==="orchid"){leaf(x-r*.7,y-r*.3,r*.7,r*.45,-.5,F.c2);leaf(x+r*.7,y-r*.3,r*.7,r*.45,.5,F.c2);leaf(x,y-r*.7,r*.4,r*.65,0,F.c2);leaf(x-r*.35,y+r*.5,r*.4,r*.5,.4,F.c2);leaf(x+r*.35,y+r*.5,r*.4,r*.5,-.4,F.c2);leaf(x,y+r*.1,r*.42,r*.5,0,F.c1);dot(x,y,r*.16,F.cn);return}
 if(st==="lotus"){leaf(x,y+r*.7,r*1.5,r*.5,0,"#2f8a3a");[-1.05,-.55,0,.55,1.05].forEach(function(a,z){leaf(x+Math.sin(a)*r*.7,y-Math.cos(a)*r*.2,r*.32,r*.95,a*.9,z%2?F.c2:F.c1)});leaf(x,y-r*.3,r*.34,r*.9,0,F.c2);dot(x,y+r*.1,r*.2,F.cn);return}
 if(st==="cluster"){for(i=0;i<26;i++){an=i*2.4;rr=Math.sqrt((i+1)/26)*r;dot(x+Math.cos(an)*rr*1.1,y+Math.sin(an)*rr*.85,r*.26,i%3?F.c1:F.c2);dot(x+Math.cos(an)*rr*1.1-.4,y+Math.sin(an)*rr*.85-.4,r*.1,"rgba(255,255,255,.5)")}return}
 if(st==="spike"){m=Math.round(4+r*1.1);for(i=0;i<m;i++){t=i/m;yy=y+r*.4-t*r*2.2;ww=r*.55*(1-t*.65);rr=r*.3*(1-t*.45);dot(x-ww,yy+(i%2),rr,i%2?F.c1:F.c2);dot(x+ww,yy+((i+1)%2),rr,i%2?F.c2:F.c1);dot(x,yy-rr*.5,rr*.8,F.c1)}return}
 dot(x,y,r,F.c1)}
function flower(id,x,y,pr,ripe,w,s){var F=FLW[id],h=F.h*s+2,hx=x+w,hy=y-h,k,r,sd,A="#3f9a2c",B="#62b83e";
 X.strokeStyle="#4f8a2a";X.lineWidth=1.4+s*.8;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+w*.3,y-h*.5,hx,hy);X.stroke();
 leaf(x-4*s-1,y-1,4.4*s+1,1.5*s+.6,-.25,A);leaf(x+4*s+1,y-1,4.4*s+1,1.5*s+.6,.25,B);
 for(k=0;k<3;k++){sd=k%2?1:-1;leaf(x+w*(.1+k*.12)+sd*(3.6*s+1),y-h*(.22+k*.2),3.8*s+1,1.6*s+.6,sd*-.5,k%2?A:B)}
 r=ripe?7:(pr>.75?2+(pr-.75)*18:0);
 if(r>0){if(F.st==="tulip")fhead(F,hx,hy-r*.5,r);else fhead(F,hx,hy,r)}
 else if(pr>.45){r=1.2+(pr-.45)*5;blob(hx,hy-1,r,["#a8dc78","#4f9a2c"]);leaf(hx-r*.6,hy+r*.3,r*.7,r*.3,-.5,A);leaf(hx+r*.6,hy+r*.3,r*.7,r*.3,.5,A)}}
function rtops(x,y,s,w,n,len,cs,c1,c2){var k,an,ex,ey;for(k=0;k<n;k++){an=-1.57+(k-(n-1)/2)*.4;ex=x+Math.cos(an)*len*s+w;ey=y-1+Math.sin(an)*len*s;stem2(x,y-1,ex,ey,cs,1.2);leaf(ex,ey,3.6*s+1.2,2*s+.7,an,k%2?c2:c1)}}
function tubers(x,y,pr,ripe,c1,c2,m){if(pr<=.4)return;[[-3.5,1.5,-.3],[3.5,2,.3],[0,3.2,.05]].forEach(function(o){var L=(ripe?4.6:2+pr*2.4)*m;X.fillStyle=c1;X.beginPath();X.ellipse(x+o[0],y+o[1],L,L*.5,o[2],0,7);X.fill();X.fillStyle=c2;X.beginPath();X.ellipse(x+o[0]-.6,y+o[1]-.6,L*.7,L*.28,o[2],0,7);X.fill()})}
function newCrop2(id,x,y,pr,ripe,w,s){var k,j,an,ex,ey,h,r,pu,kk,R,A="#3f9a2c",B="#62b83e";
 if(FLW[id]){flower(id,x,y,pr,ripe,w,s);return true}
 if(NEWV[id]){NEWV[id](x,y,pr,ripe,w,s);return true}
 if(id==="spinach"||id==="kale"){kk=id==="kale";R=3+5.5*s;rosette(x,y,kk?10:8,R,R*.5,kk?"#3a5a3a":"#2a7a2c",kk?"#5a3a6a":"#48a838",1);rosette(x,y-1.5,6,R*.7,R*.38,kk?"#4a7a4a":"#58b840",kk?"#6a4a7a":"#3a9a34",2.5);
  if(kk&&pr>.5)for(k=0;k<8;k++){an=k*.785;dot(x+Math.cos(an)*R*.5,y-3+Math.sin(an)*R*.25,.9,"rgba(200,240,160,.6)")}
  if(ripe)dot(x,y-4,R*.22,"#b8f08a");return true}
 if(id==="pechay"){h=14*s+2;for(k=0;k<7;k++){an=-1.57+(k-3)*.28;ex=x+Math.cos(an)*h*.55+w*.3;ey=y+Math.sin(an)*h;poly([[x-1.6,y],[x+1.6,y],[ex+1.2,ey],[ex-1.2,ey]],"#e8f4d0","#a8c88a",.6);leaf(ex,ey-h*.18,3.2*s+1.4,h*.34+1,an+1.57,k%2?"#3f9a3a":"#52b048")}return true}
 if(id==="kangkong"){h=20*s+3;for(k=0;k<4;k++){ex=x+(k-1.5)*5*s+w*(.4+k*.1);ey=y-h*(.7+(k%2)*.3);X.strokeStyle="#9ccc5a";X.lineWidth=1.5;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+(ex-x)*.2,y-h*.5,ex,ey);X.stroke();for(j=1;j<4;j++)leaf(x+(ex-x)*(j/3.5)+(j%2?2.5:-2.5)*s,y+(ey-y)*(j/3.5),3.6*s+.8,1.9*s+.5,j%2?-.5:.5,j%2?"#2f8a2e":"#4aa83c")}return true}
 if(id==="celery"){h=26*s+3;for(k=0;k<6;k++){ex=x+(k-2.5)*2.4+w*.3*(k/5);ey=y-h*(.75+(k%3)*.12);X.strokeStyle=k%2?"#a8d878":"#8cc860";X.lineWidth=2.4;X.beginPath();X.moveTo(x+(k-2.5)*.8,y);X.lineTo(ex,ey);X.stroke();blob(ex,ey-1,3*s+1.2,["#5ab048","#2f7a2c"])}return true}
 if(id==="leek"){h=24*s+3;for(k=0;k<5;k++){ex=x+(k-2)*3*s+w*.3;X.strokeStyle="#f2f4e0";X.lineWidth=3.2;X.beginPath();X.moveTo(x+(k-2)*1.1,y);X.lineTo(x+(k-2)*1.1,y-h*.45);X.stroke();leaf(ex+(k-2)*1.2,y-h*.8,2.2*s+1,h*.4,(k-2)*.22,k%2?"#2f8a4a":"#46a85c")}return true}
 if(id==="asparagus"){h=26*s+3;for(k=0;k<5;k++){ex=x+(k-2)*3.4+w*.4*(k/4);ey=y-h*(.7+(k%3)*.15);X.strokeStyle=ripe?"#4a9a2a":"#7ac04a";X.lineWidth=2;X.beginPath();X.moveTo(x+(k-2)*1.4,y);X.lineTo(ex,ey);X.stroke();
   if(pr>.5)for(j=0;j<4;j++){X.strokeStyle="#5aaa3a";X.lineWidth=.9;X.beginPath();X.moveTo(ex,ey+j*3);X.lineTo(ex+(j%2?3:-3),ey+j*3-2);X.stroke()}dot(ex,ey-1,1.8,"#3a8a2a")}return true}
 if(id==="turnip"){rtops(x,y,s,w,5,12,"#4a9a2a","#4a9a2a","#5ab838");
  if(pr>.4){r=ripe?4.4:1.5+pr*3;blob(x,y-r*.3,r,["#f4eef6","#c8b8d0"]);X.fillStyle="#9a3a8a";X.beginPath();X.ellipse(x,y-r*.9,r*.9,r*.45,0,Math.PI,0);X.fill();X.strokeStyle="#e8e0ea";X.lineWidth=1;X.beginPath();X.moveTo(x,y+r*.5);X.lineTo(x+1,y+r*1.7);X.stroke()}return true}
 if(id==="sweet_potato"||id==="ube"){pu=id==="ube";tubers(x,y,pr,ripe,pu?"#5a2a8a":"#b0482e",pu?"#8a52c0":"#d8745a",1);for(k=0;k<6;k++){an=k*1.05;leaf(x+Math.cos(an)*5*s+w*.3,y-3*s+Math.sin(an)*2*s-1,4.6*s+.8,3*s+.5,an,k%2?(pu?"#2f8a4a":"#3a8a3a"):(pu?"#48a85a":"#58a846"))}return true}
 if(id==="cassava"){tubers(x,y,pr,ripe,"#7a5230","#b8936a",1.5);rtops(x,y,s,w,5,15,"#8a6a3a","#3f9a2c","#62b83e");return true}
 if(id==="taro"){for(k=0;k<3;k++){ex=x+(k-1)*7*s+w*(.4+k*.2);ey=y-(15+(k%2)*5)*s-3;stem2(x+(k-1)*1.5,y,ex,ey+3,"#6a9a4a",1.4);X.save();X.translate(ex,ey);X.rotate((k-1)*.25);poly([[0,3*s+1],[-7*s-2,-1],[-5*s-1,-6*s-2],[0,-3*s],[5*s+1,-6*s-2],[7*s+2,-1]],k%2?"#2a7a3a":"#3a9a4a");X.strokeStyle="rgba(200,240,180,.4)";X.lineWidth=.7;X.beginPath();X.moveTo(0,3*s+1);X.lineTo(0,-3*s);X.stroke();X.restore()}
  if(pr>.5){r=ripe?3.6:1.4+pr*2.4;blob(x,y-r*.2,r,["#c8a878","#7a5a38"]);X.strokeStyle="rgba(60,40,20,.5)";X.lineWidth=.7;X.beginPath();X.arc(x,y-r*.2,r*.6,3.6,5.8);X.stroke()}return true}
 if(id==="okra"){h=24*s;X.strokeStyle="#5a8a2a";X.lineWidth=2;X.beginPath();X.moveTo(x,y);X.lineTo(x+w*.6,y-h);X.stroke();
  for(k=0;k<4;k++){ex=x+w*(.1+k*.14);leaf(ex+(k%2?5:-5)*s,y-h*(.25+k*.19),4.4*s+1,3*s+.7,k%2?-.5:.5,k%2?A:"#2f7d2c")}
  if(pr>.5&&pr<=.7)dot(x+w*.4+3,y-h*.55,1.6,"#fff3a0");
  if(pr>.7)[[-3.5,-.45,-.15],[3.5,-.62,.15],[-2.5,-.8,-.1]].forEach(function(o){var L=ripe?8:3+(pr-.7)*16,cx=x+o[0]+w*.4,cy=y+o[1]*h;X.save();X.translate(cx,cy);X.rotate(o[2]);poly([[-1.8,0],[1.8,0],[.6,-L],[-.6,-L]],ripe?"#4a9a2a":"#8cc454","#2f6a1c",.6);X.restore();dot(cx,cy,1.4,"#3a7a24")});return true}
 if(id==="ampalaya"||id==="sitaw"){h=(id==="sitaw"?28:24)*s;stem2(x-5,y+1,x-5,y-h-3,"#a98a55",1.4);stem2(x+5,y+1,x+5,y-h-3,"#a98a55",1.4);X.strokeStyle="#4f8a2a";X.lineWidth=1.3;X.beginPath();X.moveTo(x,y);X.bezierCurveTo(x-5+w,y-h*.3,x+5+w,y-h*.6,x+w,y-h);X.stroke();
  for(k=0;k<5;k++)leaf(x+w*(k/5)+(k%2?3.5:-3.5)*s,y-h*(.12+k*.17),3.6*s+.8,2.4*s+.5,k%2?-.5:.5,k%2?A:B);
  if(pr>.5&&pr<=.7)dot(x+w*.3,y-h*.5,1.5,id==="sitaw"?"#e8d0f8":"#ffd23a");
  if(pr>.7)(id==="sitaw"?[[-4,-.8],[3.5,-.7],[-2,-.55],[5,-.45]]:[[-3.5,-.3],[4,-.5]]).forEach(function(o){var cx=x+o[0]+w*.3,cy=y+o[1]*h,L,d=o[0]>0?1:-1;
   if(id==="sitaw"){L=ripe?15:4+(pr-.7)*36;X.strokeStyle=ripe?"#3a9a28":"#8acc54";X.lineWidth=1.6;X.lineCap="round";X.beginPath();X.moveTo(cx,cy);X.quadraticCurveTo(cx+d*2,cy+L*.5,cx+d,cy+L);X.stroke();X.lineCap="butt"}
   else{L=ripe?9:3+(pr-.7)*20;X.fillStyle=ripe?"#3a8a24":"#7cb844";X.beginPath();X.moveTo(cx-1.8,cy);X.quadraticCurveTo(cx-2.4,cy+L*.6,cx,cy+L);X.quadraticCurveTo(cx+2.4,cy+L*.6,cx+1.8,cy);X.closePath();X.fill();for(j=1;j<5;j++)dot(cx+(j%2?-1:1)*.8,cy+L*j/5,.6,"rgba(190,235,140,.8)")}});return true}
 if(id==="zucchini"){for(k=0;k<6;k++){an=k*1.05;leaf(x+Math.cos(an)*5*s+w*.3,y-3*s+Math.sin(an)*2*s,5.4*s+.8,3.4*s+.5,an,k%2?"#2f7a2c":"#4aa03a")}
  if(pr>.55){r=ripe?9:2.5+(pr-.55)*15;X.save();X.translate(x+1,y+.5);X.rotate(-.4);X.fillStyle="#2a6a24";X.beginPath();X.ellipse(0,0,r,r*.36,0,0,7);X.fill();X.fillStyle="#58a83e";X.beginPath();X.ellipse(-r*.1,-r*.1,r*.8,r*.2,0,0,7);X.fill();dot(r,0,Math.max(.6,r*.1),"#7a5a20");X.restore()}return true}
 if(id==="mushroom"){[[0,-1,1.25],[-6,2,.8],[5,3,1],[-2,5,.7]].forEach(function(o){var m=o[2]*(.5+.5*pr)*(ripe?1.1:1),mx=x+o[0],my=y+o[1];if(pr<.3){dot(mx,my,1.3,"#e8e0d0");return}
   X.fillStyle="#efe6d2";X.fillRect(mx-1.8*m,my-5*m,3.6*m,5*m);X.fillStyle="#d8cbb0";X.beginPath();X.ellipse(mx,my-5*m,5.6*m,1.5*m,0,0,7);X.fill();X.fillStyle=ripe?"#b8663a":"#c8a878";X.beginPath();X.ellipse(mx,my-5*m,5.6*m,4*m,0,Math.PI,0);X.fill();dot(mx-2*m,my-7.4*m,.9*m,"rgba(255,255,255,.7)");dot(mx+1.8*m,my-8*m,.7*m,"rgba(255,255,255,.6)")});return true}
 return false}
var WOVR=null;
function plant0(id,q,pr,ripe,t){var s=.3+.7*pr,x=q[0],y=q[1],w=(WOVR!==null?WOVR:Math.sin(t/650+x*.07+y*.05))*1.8*pr,a="#3f9a2c",b="#62b83e",h,k,j,an,low=(id==="pumpkin"||id==="watermelon");
 shade(q,4+5*s,2.2+2*s,.25);
  if(NEWC[id]){if(!newCrop2(id,x,y,pr,ripe,w,s))newCrop(id,x,y,pr,ripe,w,s);return}
 if(id==="corn"){h=34*s;X.strokeStyle="#5b9a30";X.lineWidth=2.2;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+w*.5,y-h*.5,x+w,y-h);X.stroke();
  for(k=0;k<4;k++){var ly=y-h*(.25+k*.2),sd=k%2?1:-1;X.strokeStyle=k%2?a:b;X.lineWidth=2;X.beginPath();X.moveTo(x+w*(.25+k*.2),ly);X.quadraticCurveTo(x+sd*9*s+w,ly-5*s,x+sd*13*s+w,ly+4*s);X.stroke()}
  if(pr>.7){X.lineWidth=1;X.strokeStyle="#d9c47a";for(k=-2;k<=2;k++){X.beginPath();X.moveTo(x+w,y-h);X.lineTo(x+w+k*2.2,y-h-6);X.stroke()}}
  if(ripe)cob(x+w*.6+3,y-h*.55);return}
 if(id==="tomato"){h=27*s;X.strokeStyle="#a98a55";X.lineWidth=1.7;X.beginPath();X.moveTo(x-3,y+1);X.lineTo(x-3+w*.3,y-h-5);X.stroke();
  X.strokeStyle="#4f8a2a";X.lineWidth=1.9;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+w*.3,y-h*.5,x+w*.6,y-h);X.stroke();
  for(k=0;k<5;k++){var ly2=y-h*(.18+k*.17),lx=x+w*(.12+k*.1),sd2=k%2?1:-1;
   X.strokeStyle="#4f8a2a";X.lineWidth=1;X.beginPath();X.moveTo(lx,ly2);X.lineTo(lx+sd2*10*s,ly2-2*s);X.stroke();
   for(j=0;j<3;j++)leaf(lx+sd2*(3+j*3.4)*s,ly2-j*.9*s,3.4*s+.7,1.8*s+.4,sd2*(.2-j*.18),j%2?a:b)}
  if(pr>.5&&pr<=.7)[[-3,-.5],[3,-.75]].forEach(function(o){dot(x+o[0]+w*.4,y+o[1]*h,1.4,"#ffd23a")});
  if(pr>.7)[[-6,-8],[6,-12],[-4,-17]].forEach(function(o){tom(x+o[0]+w*.4,y+o[1],ripe?3.7:2.2+(pr-.7)*5,ripe)});
  return}
 if(id==="eggplant"){h=20*s;X.strokeStyle="#4f8a2a";X.lineWidth=2;X.beginPath();X.moveTo(x,y);X.lineTo(x+w,y-h);X.stroke();
  for(k=0;k<4;k++)leaf(x+w*(k/4)+(k%2?5:-5)*s,y-h*(.3+k*.18),5.5*s+1,2.8*s+.7,k%2?-.5:.5,k%2?a:b);
  if(pr>.5&&pr<=.7)dot(x+w*.5+3,y-h*.6,1.8,"#a77be0");
  if(pr>.7)[[-4,-11],[5,-14]].forEach(function(o){egg(x+o[0]+w*.4,y+o[1],ripe?3.2:2+(pr-.7)*4,ripe)});
  return}
 if(id==="strawberry"){
  for(k=0;k<6;k++){an=k*1.05+.3;trif(x+Math.cos(an)*4*s+w*.2,y-2*s+Math.sin(an)*1.8*s,6.5*s+1,an,k%2?a:b)}
  if(pr>.4&&pr<=.75)[[-5,1],[4,2],[0,-2]].forEach(function(o){dot(x+o[0],y+o[1]-3,1.6,"#fff");dot(x+o[0],y+o[1]-3,.7,"#f2c230")});
  if(pr>.75)[[-6,1],[6,2],[0,4],[-3,-1],[4,-1]].forEach(function(o){berry(x+o[0]+w*.2,y+o[1],ripe?3.3:2.1+(pr-.75)*4,ripe)});
  return}
 for(k=0;k<6;k++){an=k*1.05;leaf(x+Math.cos(an)*5*s+w*.3,y-3*s+Math.sin(an)*2*s,(low?6:4.5)*s+.8,(low?3.6:2.6)*s+.5,an,k%2?a:b)}
 if(!ripe&&pr>.6)leaf(x+3,y-3,3*pr,2.4*pr,0,id==="pumpkin"?"#9cc455":"#3a8a3c");
 if(ripe){if(id==="pumpkin")pump(x,y);else melon(x,y)}}
// crops are drawn ONCE into a small picture (per growth step and wind step) and stamped, so the farm stays smooth
var CSPR={},CSPRN=0,CSD=1;
function plantS(id,q,pr,ripe,t,big){var sw=(PERF||QL)?0:Math.round(Math.sin(t/650+q[0]*.07+q[1]*.05)*2),qp=ripe?1:Math.min(.95,Math.round(pr*12)/12),
 key=id+"|"+qp+"|"+(ripe?1:0)+"|"+(big?1:0)+"|"+sw+"|"+CSD,c=CSPR[key];
 if(!c){if(CSPRN>360)CSPRN=evict(CSPR);c=document.createElement("canvas");c.width=Math.round(110*CSD);c.height=Math.round(120*CSD);
  var cx=c.getContext("2d"),oX=X;cx.setTransform(CSD,0,0,CSD,0,0);X=cx;WOVR=sw/2;
  try{plant(id,[55,95],qp,ripe,0,big)}finally{X=oX;WOVR=null}CSPR[key]=c;CSPRN++}
 X.drawImage(c,q[0]-55,q[1]-95,110,120)}
function pill(txt,x,y,bg,fg){X.font="bold 11px system-ui,sans-serif";var w=PWC[txt];if(w===undefined){if(PWN>400){PWC={};PWN=0}w=PWC[txt]=X.measureText(txt).width+12;PWN++}X.fillStyle=bg;X.beginPath();if(X.roundRect)X.roundRect(x-w/2,y-9,w,18,9);else X.rect(x-w/2,y-9,w,18);X.fill();X.fillStyle=fg;X.textAlign="center";X.textBaseline="middle";X.fillText(txt,x,y+.5)}

function soilSpr(p){var key=(p?1:0)+"@"+CSD,s=SOILC[key],c,cx,oX,oG,a,b,d,e,rn,k,f,q1,q2,sp;if(s)return s;
 c=document.createElement("canvas");c.width=Math.round(120*CSD);c.height=Math.round(76*CSD);cx=c.getContext("2d");cx.setTransform(CSD,0,0,CSD,0,0);
 oX=X;oG=G;X=cx;G={ox:60,oy:4,TW:112,TH:56};
 try{a=Pp(.07,.07);b=Pp(.93,.07);d=Pp(.93,.93);e=Pp(.07,.93);rn=mk(13+(p?1:0));
  poly([e,d,[d[0],d[1]+10],[e[0],e[1]+10]],lg(0,e[1],0,e[1]+10,[[0,"#5a3a1e"],[1,"#2e1d0e"]]));
  poly([d,b,[b[0],b[1]+10],[d[0],d[1]+10]],lg(0,d[1],0,d[1]+10,[[0,"#6b4524"],[1,"#38230f"]]));
  poly([a,b,d,e],lg(a[0],a[1],d[0],d[1],p?[[0,"#553519"],[1,"#744a25"]]:[[0,"#7a5230"],[1,"#98683c"]]));
  for(k=1;k<6;k++){f=.07+.86*k/6;q1=Pp(f,.07);q2=Pp(f,.93);X.beginPath();X.moveTo(q1[0],q1[1]);X.lineTo(q2[0],q2[1]);X.strokeStyle="rgba(0,0,0,.28)";X.lineWidth=3;X.stroke();X.beginPath();X.moveTo(q1[0]+2,q1[1]);X.lineTo(q2[0]+2,q2[1]);X.strokeStyle="rgba(255,255,255,.09)";X.lineWidth=1;X.stroke()}
  for(k=0;k<16;k++){sp=Pp(.1+rn()*.8,.1+rn()*.8);X.fillStyle=rn()<.5?"rgba(0,0,0,.25)":"rgba(255,220,170,.18)";X.fillRect(sp[0],sp[1],1.8,1.2)}
  poly([a,b,d,e],null,"rgba(0,0,0,.4)",1.2)}finally{X=oX;G=oG}
 return SOILC[key]=c}
function drawSoil(plots,pp,np){var i,c,r,q,o,sx,sy;
 for(i=0;i<np;i++){q=pp[i];if(!q||q[0]<VT.c0||q[0]>VT.c1||q[1]<VT.r0||q[1]>VT.r1)continue;c=q[0];r=q[1];
  sx=G.ox+(c-r)*56;sy=G.oy+(c+r+1)*28;if(sx<VW.x0||sx>VW.x1||sy<VW.y0||sy>VW.y1)continue;
  if(LOD>1){poly([Pp(c+.07,r+.07),Pp(c+.93,r+.07),Pp(c+.93,r+.93),Pp(c+.07,r+.93)],plots[i]?"#654020":"#8a5c34");continue}
  o=Pp(c,r);X.drawImage(soilSpr(!!plots[i]),o[0]-60,o[1]-4,120,76)}}
var SPR={},SPRN=0;
function sprite(kind,dpr,stage,nc){var key=kind+"@"+dpr+"@"+(stage||0),s=SPR[key];if(s)return s;var c=document.createElement("canvas");c.width=Math.round(260*dpr);c.height=Math.round(220*dpr);
 var cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);var oX=X,oG=G,p=[130,170];X=cx;G={ox:130,oy:170,TW:112,TH:56,cols:4,rows:2};
 if(kind==="barn")barn(-.4,-.375,.4,.375);else if(kind==="silo")silo(p);else if(kind==="tree")tree(p,32);else if(kind==="bush")bush(p,12);else if(kind==="pond")pond(p);else if(kind==="bale")bale(p);else if(kind==="tractor")tractor(p,.9);
 else if(kind==="pine")pine(p,30);else if(kind==="flowers")flowers(p);else if(kind==="bench")bench(p);else if(kind==="well")well(p);else if(kind==="scarecrow")scarecrow(p);else if(DEC[kind])DEC[kind](p,stage||0);else if(FTD[kind])ftree(p,32,kind,stage||0);
 X=oX;G=oG;if(!nc){SPR[key]=c;SPRN++}return c}
 var PHC={},BIRDS={a_chicken:1,a_duck:1,a_goose:1,a_turkey:1,a_ostrich:1,a_quail:1,a_rooster:1,a_swan:1,a_peacock:1};
function aph(id){var v=PHC[id],h=0,i;if(v===undefined){for(i=0;i<id.length;i++)h=(h*31+id.charCodeAt(i))|0;v=PHC[id]=(h>>>0)%1000/1000}return v}
function aniXf(it,t){var ph=aph(it.id),k=it.k,u,x,o={r:0,sx:1,sy:1,dy:0};
 if(k==="a_rabbit"){u=((t/1700)+ph)%1;if(u<.22){x=Math.sin(u/.22*Math.PI);o.dy=-9*x;o.sy=1+.04*x;o.sx=1-.03*x}return o}
 if(BIRDS[k]){u=((t/2300)+ph)%1;if(u<.14){x=Math.sin(u/.14*Math.PI);o.r=.16*x}else if(u>.5&&u<.6){x=Math.sin((u-.5)/.1*Math.PI);o.dy=-3*x}return o}
 x=Math.sin(t/(1100+ph*500)+ph*6.28);o.sy=1+.012*x;o.sx=1-.006*x;o.r=.01*Math.sin(t/2400+ph*9);return o}
function selIs(t,v){return SEL&&SEL.t===t&&(t==="p"?SEL.i===v:SEL.id===v)}
function occMap(ig){var m={},i,q,PP=LAY?LAY.pp:S.pp;for(i=0;i<S.np;i++){q=PP[i];if(q&&!(ig&&ig.t==="p"&&ig.i===i))m[q[0]*64+q[1]]=1}
 (LAY?LAY.dc:(S.dc||[])).forEach(function(o){if(!o.s&&!isF(o.k)&&!(ig&&ig.t==="d"&&ig.id===o.id)){var nw=footW(o.k),nh=footH(o.k),a,b;for(a=0;a<nw;a++)for(b=0;b<nh;b++)m[(o.c+a)*64+o.r+b]=1}});return m}
function iw(it){return it.fw||footW(it.k)}
function ih(it){return it.fh||footH(it.k)}
 function iso(cv,plots,pp,np,hov,items,edit){
 var v=cv._view;if(!v)return;
 var cols=szOf(cv),rows=cols,TW=112,TH=56,i,kz=v.k,dpr=Math.min(2,window.devicePixelRatio||1),
  cw=parseFloat(cv.style.width)||window.innerWidth,ch=parseFloat(cv.style.height)||window.innerHeight,
  ox=(rows+2)*TW/2+30,oy=130+TH,W=(rows+cols+4)*TW/2+60,H=oy+(cols+rows+2)*TH/2+60;
 if(cv.width!==Math.round(cw*dpr)||cv.height!==Math.round(ch*dpr)){cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr)}
 NIGHT=document.body.classList.contains("night");G={ox:ox,oy:oy,TW:TW,TH:TH,cols:cols,rows:rows,W:W,H:H};setRot(cv);G.P=parcels(cols,LSof(cv));FS=fenceCut(fenceSegs(G.P),flOf(cv));WBX=wbox(cols,LSof(cv));PFN=pfOf(cv);PHD=phOf(cv);
 if(CR){pp=pp.map(function(q){return q?rtile(q[0],q[1]):q});
  items=(items||[]).map(function(it){var o=Object.create(it),t=rtile(it.c,it.r),w=footW(it.k),h=footH(it.k),p,nw,nh;o._o=it;
   if(!isF(it.k)&&!OUTI[it.k]&&w*h>1){p=rp(it.c+w/2,it.r+h/2);nw=(CR&1)?h:w;nh=(CR&1)?w:h;o.fw=nw;o.fh=nh;t=[Math.round(p[0]-nw/2),Math.round(p[1]-nh/2)]}
   o.c=t[0];o.r=t[1];
   if(isF(it.k))o.rot=(isCorner(it.k)||it.k==="stoplight")?((it.rot||0)+CR)&3:((it.rot||0)-CR)&3;
   else if(MIRCR[CR])o.rot=it.rot?0:1;
   return o})}
 cv._g={ox:ox,oy:oy,TW:TW,TH:TH,cols:cols,np:np,W:W,pp:pp,items:items,cr:CR,rc:RC.slice(),L:v.L,T:v.T,k:kz};
 var x=cv.getContext("2d"),t=Date.now(),labels=[],sdp=MOVING&&LSDP?LSDP:Math.min(1.5,Math.max(1,Math.ceil(dpr*kz*2)/2)),
  wx0=-v.L/kz-150,wx1=(cw-v.L)/kz+150,wy0=-v.T/kz-40,wy1=(ch-v.T)/kz+150,cs,cc,rr;
 x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);x.setTransform(dpr*kz,0,0,dpr*kz,dpr*v.L,dpr*v.T);X=x;ANIM=true;CSD=sdp;if(!MOVING)LSDP=sdp;QL=MOVING&&kz<DRAG_KEEP;LOD=(kz<.3||QL)?4:1;
 VW={x0:wx0,x1:wx1,y0:wy0,y1:wy1};
 cs=[[wx0,wy0],[wx1,wy0],[wx1,wy1],[wx0,wy1]].map(function(q){var dx=(q[0]-ox)/(TW/2),dy=(q[1]-oy)/(TH/2);return[(dx+dy)/2,(dy-dx)/2]});
 cc=cs.map(function(q){return q[0]});rr=cs.map(function(q){return q[1]});
 VT={c0:Math.max(WBX.c0,Math.floor(Math.min.apply(null,cc))-1),c1:Math.min(WBX.c1-1,Math.ceil(Math.max.apply(null,cc))+1),r0:Math.max(WBX.r0,Math.floor(Math.min.apply(null,rr))-1),r1:Math.min(WBX.r1-1,Math.ceil(Math.max.apply(null,rr))+1)};
 VTF={c0:Math.max(WBX.c0-8,Math.floor(Math.min.apply(null,cc))-1),c1:Math.min(WBX.c1+7,Math.ceil(Math.max.apply(null,cc))+1),r0:Math.max(WBX.r0-8,Math.floor(Math.min.apply(null,rr))-1),r1:Math.min(WBX.r1+7,Math.ceil(Math.max.apply(null,rr))+1)};
 if(SPRN>120)SPRN=evict(SPR);
 drawSea();drawFloors(cv);drawBack();drawSoil(plots,pp,np);
 if(edit&&LOD===1){var sf=SEL||PLACING||PBUY,occ=sf?occMap(PLACING?null:SEL):null,gc,gr;
  var gA=[],gB=[];for(gc=VT.c0;gc<=VT.c1;gc++)for(gr=VT.r0;gr<=VT.r1;gr++)if(inLandP(G.P,gc,gr)){gA.push(gc,gr);if(sf&&!occ[gc*64+gr])gB.push(gc,gr)}
  if(gB.length){gridPath(gB);X.fillStyle="rgba(190,255,150,.16)";X.fill()}
  gridPath(gA);X.strokeStyle="rgba(255,255,255,.22)";X.lineWidth=1;X.stroke();
  if(GPREV&&GPREV.length){gridPath(GPREV);X.fillStyle="rgba(255,190,0,.38)";X.fill();X.strokeStyle="#ffb300";X.lineWidth=2;X.stroke()}
  if(sf&&HOVT&&(inLandP(G.P,HOVT[0],HOVT[1])||OUTSEL())){var dc=HOVT[0],dr=HOVT[1],fk=curK(PLACING||SEL),fw=footW(fk),fh=footH(fk),bad=OUTSEL()?!tileFree(dc,dr,SEL):fw*fh>1?!tileFree(dc,dr,PLACING||SEL,fk):!!occ[dc*64+dr];poly([Pp(dc,dr),Pp(dc+fw,dr),Pp(dc+fw,dr+fh),Pp(dc,dr+fh)],bad?"rgba(255,70,70,.4)":"rgba(255,255,255,.3)",bad?"#ff4d4d":"#fff",2)}}
 function drawPlot(i){var q=pp[i];if(!q)return;var c=q[0],r=q[1],k;
  var a=Pp(c+.07,r+.07),b=Pp(c+.93,r+.07),d=Pp(c+.93,r+.93),e=Pp(c+.07,r+.93),p=plots[i],C=Pp(c+.5,r+.5);
  if(hov===i)poly([a,b,d,e],"rgba(255,255,255,.2)","#fff",2);
  if(edit&&selIs("p",i)){var pz=.5+.5*Math.sin(t/200);poly([a,b,d,e],"rgba(255,255,255,"+(.15+.2*pz)+")","#fff",2+pz*2)}
  if(!p){if(LOD===1&&!CAM){X.font="bold 22px system-ui,sans-serif";X.textAlign="center";X.textBaseline="middle";X.fillStyle="rgba(255,255,255,.55)";X.fillText("+",C[0],C[1])}return}
  var cc2=cr(p.c),el=nowT()-p.t,pr=Math.max(0,Math.min(1,el/cc2.ms)),ripe=el>=cc2.ms,big=!!p.b;
  if(ripe){var pu=.5+.5*Math.sin(t/260);poly([a,b,d,e],null,"rgba(255,205,60,"+(.45+.5*pu)+")",2+pu*2.5)}
  for(k=0;k<PLS.length;k+=(LOD>1?4:kz<.6?2:1))plantS(p.c,Pp(c+PLS[k][0],r+PLS[k][1]),pr,ripe,t,big);
  if(kz>=.4&&!QL)labels.push({C:C,txt:ripe?(big?"BIG! +"+cc2.sell*(S.bigMult||2):"Ripe! +"+cc2.sell):fmtDur(cc2.ms-el),ripe:ripe,big:big,t:t});
 }
 function drawDeco(it){var fw=iw(it),fh=ih(it),bs=BSC[it.k]||1,p=Pp(it.c+fw/2,it.r+fh/2),ft=FTD[it.k],st=0,el;if(isF(it.k))st=(it.rot||0)&3;if(isF(it.k))st=(it.rot||0)&3;
  if(ft){el=nowT()-(it.t||0);st=el>=ft.ms?2:el/ft.ms>=.35?1:0;if(kz>=.4&&!QL)labels.push({C:p,txt:st===2?(ft.animal?"Ready! +":"Ripe! +")+ft.sell:fmtDur(ft.ms-el),ripe:st===2,big:false,t:t,up:Math.max(96,-(HB[it.k]||[0,-86])[1]+10)})}
  var qd=!!QD[it.k]&&LOD===1&&!edit,lf=(edit&&selIs("d",it.id))?-9-3*Math.sin(t/180):(it.k==="barn"&&window.FarmFX2?FarmFX2.hop():0),im=(qd||DRAWV[it.k])?null:(BSC[it.k]?bigSprite(it.k,sdp):sprite(it.k,sdp,st)),an=(ft&&ft.animal&&LOD===1&&!edit)?aniXf(it,t):null,fl=it.rot&&!isF(it.k);
  if(DRAWV[it.k]){drawCourt(it,fw,fh)}else if(qd){drawQuad(it,p,t,fl,sdp)}
    else if(OUTI[it.k]==="w"){var bb=(LOD===1&&!edit)?Math.sin(t/950+aph(it.id)*6.283):0,osz=OSC[it.k]||1;X.save();X.translate(p[0],p[1]+bb*osz*1.2);X.rotate(bb*.018);X.scale(fl?-osz:osz,osz);DEC[it.k]([0,0]);X.restore()}
  else if(an){X.save();X.translate(p[0],p[1]);X.rotate(fl?-an.r:an.r);X.scale(fl?-an.sx:an.sx,an.sy);X.drawImage(im,-130,-170+an.dy,260,220);X.restore()}
  else if(SWY&&!MOVING&&LOD===1&&!edit&&FLG[it.k]){X.save();X.translate(p[0],0);if(fl)X.scale(-1,1);flagDraw([0,p[1]],FLG[it.k],t,2.2+1.8*Math.max(0,wnd(t)),aph(it.id)*6.283);X.restore()}
  else if(SWY&&!MOVING&&LOD===1&&!edit&&swayOk(it.k)){var sk=swayK(it,t),s1=sk*.3;X.save();X.translate(p[0],p[1]);if(fl)X.scale(-1,1);
   X.save();X.transform(1,0,s1,1,0,0);X.drawImage(im,0,120*sdp,260*sdp,100*sdp,-130,-50,260,100);X.restore();
   X.transform(1,0,sk,1,(sk-s1)*50,0);X.drawImage(im,0,0,260*sdp,121*sdp,-130,-170,260,121);X.restore()}
  else if(fl){X.save();X.translate(p[0],0);X.scale(-1,1);X.drawImage(im,-130*bs,p[1]-170*bs+lf,260*bs,220*bs);X.restore()}else X.drawImage(im,p[0]-130*bs,p[1]-170*bs+lf,260*bs,220*bs);
  if(edit){var s2=selIs("d",it.id);X.save();X.strokeStyle=s2?"#fff":"rgba(255,255,255,.5)";X.lineWidth=s2?3:1.5;X.setLineDash(s2?[]:[4,4]);X.beginPath();var fo=isF(it.k)?fOff(it):[0,0];if(fw*fh>1){[Pp(it.c,it.r),Pp(it.c+fw,it.r),Pp(it.c+fw,it.r+fh),Pp(it.c,it.r+fh)].forEach(function(q,i){if(i)X.lineTo(q[0],q[1]);else X.moveTo(q[0],q[1])});X.closePath()}else X.ellipse(p[0]+fo[0],p[1]+fo[1],isF(it.k)?18:26,isF(it.k)?9:13,0,0,7);X.stroke();X.restore()}}
 var list=[],q2;
 function onS(c,r,m){m=m||0;var sx=ox+(c-r)*TW/2,sy=oy+(c+r+1)*TH/2;return sx>wx0-m&&sx<wx1+m&&sy>wy0-m&&sy<wy1+m}
 for(i=0;i<np;i++){q2=pp[i];if(q2&&q2[0]>=VT.c0&&q2[0]<=VT.c1&&q2[1]>=VT.r0&&q2[1]<=VT.r1&&onS(q2[0],q2[1]))list.push([q2[0]+q2[1]+1,i,null])}
 (items||[]).forEach(function(it){if(!it.s&&(OUTI[it.k]||(it.c+iw(it)>VTF.c0&&it.c<=VTF.c1&&it.r+ih(it)>VTF.r0&&it.r<=VTF.r1))&&onS(it.c,it.r,OUTI[it.k]==="w"?(OSC[it.k]||1)*70:OUTI[it.k]==="w"?BOAT_SCALE*70:footN(it.k)>1?footN(it.k)*130:0))list.push([it.c+it.r+(iw(it)+ih(it))/2+(isF(it.k)?fKey(it):0),-1,it])});
 list.sort(function(a,b){return a[0]-b[0]});
 list.forEach(function(o){if(o[2])drawDeco(o[2]);else drawPlot(o[1])});
 drawFront();
 if(kz>=.4&&!CAM&&!QL)labels.forEach(function(o){if(o.ripe)return;var y=o.C[1]+22;pill(o.txt,o.C[0],y,o.ripe?(o.big?"#ff8a1c":"#f0b429"):"rgba(20,30,15,.62)",o.ripe?"#3a2a00":"#fff");
  if(o.ripe){var by=o.C[1]-(o.up||52)-Math.sin(o.t/300)*4;dot(o.C[0],by,10,"#f0b429");dot(o.C[0]-2,by-2,4,"rgba(255,255,255,.45)");X.font="bold 13px system-ui,sans-serif";X.fillStyle="#3a2a00";X.textAlign="center";X.textBaseline="middle";X.fillText(o.big?"\u2605":"\u2713",o.C[0],by+.5)}});
 if(NIGHT){x.globalCompositeOperation="source-atop";x.setTransform(1,0,0,1,0,0);x.fillStyle="rgba(25,40,90,.26)";x.fillRect(0,0,cv.width,cv.height);x.globalCompositeOperation="source-over"}
}

function hit(cv,ev){
 var g=cv._g;if(!g)return -1;var rc=cv.getBoundingClientRect(),px=(ev.clientX-rc.left-g.L)/g.k,py=(ev.clientY-rc.top-g.T)/g.k+10;
 var dx=(px-g.ox)/(g.TW/2),dy=(py-g.oy)/(g.TH/2),c=Math.floor((dx+dy)/2),r=Math.floor((dy-dx)/2);
 for(var i=0;i<g.np;i++){var q=g.pp[i];if(q&&q[0]===c&&q[1]===r)return i}
 return -1}

function grassTile(sc,night,dpr){var S0=360,TS=Math.max(64,Math.round(S0*sc*dpr)),c=document.createElement("canvas"),x,rn=mk(5),i,k,px,py,ox,oy,hh;
 c.width=c.height=TS;x=c.getContext("2d");x.scale(TS/S0,TS/S0);
 x.fillStyle=night?"#2f6a2a":"#78bd42";x.fillRect(0,0,S0,S0);
 for(i=0;i<200;i++){px=rn()*S0;py=rn()*S0;hh=5+rn()*5;x.strokeStyle=rn()<.5?"#4f9a2e":"#a6e066";x.lineWidth=1.3;
  for(ox=-1;ox<=1;ox++)for(oy=-1;oy<=1;oy++){if((ox&&px>14&&px<S0-14)||(oy&&py>14&&py<S0-14))continue;
   for(k=-1;k<=1;k++){x.beginPath();x.moveTo(px+ox*S0+k*2,py+oy*S0);x.lineTo(px+ox*S0+k*3.5,py+oy*S0-hh);x.stroke()}}}
 for(i=0;i<10;i++){px=rn()*S0;py=rn()*S0;x.fillStyle=rn()<.5?"#fff":"#ffe14d";for(ox=-1;ox<=1;ox++)for(oy=-1;oy<=1;oy++){x.beginPath();x.arc(px+ox*S0,py+oy*S0,1.7,0,7);x.fill()}}
 return c}
function grassBg(cv,ref,offY){var night=document.body.classList.contains("night"),dpr=Math.min(1.5,window.devicePixelRatio||1),
 sc=Math.max(.05,(ref._view&&ref._view.k)||1),gx=(ref._view&&ref._view.L)||0,gy=((ref._view&&ref._view.T)||0)+(offY||0),
 lvl=sc<.7?.5:sc<1.4?1:2,tk=lvl+"|"+(night?1:0)+"|"+dpr,T=(grassBg.c=grassBg.c||{}),P=Math.round(360*sc*100)/100,tc,x;
 if(!T[tk]){tc=grassTile(lvl,night,dpr);if(night){x=tc.getContext("2d");x.setTransform(1,0,0,1,0,0);x.fillStyle="rgba(25,40,90,.26)";x.fillRect(0,0,tc.width,tc.height)}T[tk]=tc.toDataURL("image/jpeg",.88)}
 if(cv._tk!==tk){cv._tk=tk;cv.style.backgroundImage="url("+T[tk]+")"}
 cv.style.backgroundSize=P+"px "+P+"px";cv.style.backgroundPosition=gx+"px "+gy+"px"}

function dims(n,ls){n=n||8;var B=wbox(n,ls),ox=(n+2)*56+30,oy=186,x0=ox+(B.c0-B.r1)*56,x1=ox+(B.c1-B.r0)*56,y0=oy+(B.c0+B.r0)*28,y1=oy+(B.c1+B.r1)*28;
 return{W:x1-x0+284,H:y1-y0+302,mx:(x0+x1)/2,my:(y0+y1)/2-35}}
function szOf(cv){return((cv&&cv.id==="vCanvas")?(V&&V.sz):(S&&S.sz))||8}
function camBox(pp,np,dc,n,m,ls,cv){m=m==null?1:m;setRot(cv);var c0=999,c1=-999,r0=999,r1=-999,i,B=wbox(n,ls);
 function add(c,r){if(CR){var t=rtile(c,r);c=t[0];r=t[1]}c0=Math.min(c0,c);c1=Math.max(c1,c);r0=Math.min(r0,r);r1=Math.max(r1,r)}
 for(i=0;i<np;i++)if(pp&&pp[i])add(pp[i][0],pp[i][1]);
 (dc||[]).forEach(function(x){if(!x.s)add(x.c,x.r)});
 if(c1<-900)return null;
 return[Math.max(B.c0,c0-m),Math.min(B.c1,c1+m+1),Math.max(B.r0,r0-m),Math.min(B.r1,r1+m+1)]}
var L1SPAN=560,L1MARG=36; // L1SPAN = how much of the farm is seen across the screen (smaller = closer); L1MARG = pixels between the bottom fence corner and the bottom of the farm area
function lvl1Box(cv){setRot(cv);var n=szOf(cv),B=wbox(n,LSof(cv)),a=rtile(0,0),b=rtile(Math.min(7,n-1),Math.min(7,n-1)),
 c0=Math.min(a[0],b[0]),c1=Math.max(a[0],b[0]),r0=Math.min(a[1],b[1]),r1=Math.max(a[1],b[1]),x=[Math.max(B.c0,c0-1),Math.min(B.c1,c1+2),Math.max(B.r0,r0-1),Math.min(B.r1,r1+2)];x.l1=1;var cq=[rtile(0,0),rtile(n-1,0),rtile(0,n-1),rtile(n-1,n-1)];x.vb=[Math.max(cq[0][0],cq[1][0],cq[2][0],cq[3][0])+1,Math.max(cq[0][1],cq[1][1],cq[2][1],cq[3][1])+1];return x}
function fit(cv,np,top,bot,box,rel){setRot(cv);var n=szOf(cv),ls=LSof(cv),B=wbox(n,ls),d=dims(n,ls),aw=window.innerWidth,ah=window.innerHeight-top-bot,
 k0=Math.max(.08,Math.min(aw/(d.W-120),ah/d.H,2.4)),k=k0,mx=d.mx,my=d.my,ox=(n+2)*56+30,oy=186,z=cv._z||1,kd;
 if(box){var xs=[],ys=[],kz,cap;
  [[box[0],box[2]],[box[1],box[2]],[box[1],box[3]],[box[0],box[3]]].forEach(function(q){xs.push(ox+(q[0]-q[1])*56);ys.push(oy+(q[0]+q[1])*28)});
  var x0=Math.min.apply(null,xs)-30,x1=Math.max.apply(null,xs)+30,y0=Math.min.apply(null,ys)-110,y1=Math.max.apply(null,ys)+40;
  kz=Math.min(aw/(x1-x0),ah/(y1-y0),2.2);cap=aw/(2*Math.min(n,box.l1?8:10)*56+20+48);
  if(kz>cap){kz=cap;mx=n<=(box.l1?8:10)?ox:(x0+x1)/2}else mx=(x0+x1)/2;
  if(kz>k){k=kz;my=(y0+y1)/2}else mx=d.mx;
  if(box.l1&&box.vb){k=Math.min(3.2,aw/L1SPAN);mx=ox;my=oy+(box.vb[0]+box.vb[1])*28-(ah/2-L1MARG)/k}} // first view: a bit closer, land sitting low so its bottom fence corner is near the bottom
 var kmn=(cv.id==="lCanvas"||!PERF)?k0*.6:3.2*Math.pow(k0*.6/3.2,ZOUT);if(!cv._kabs&&!cv._dz&&cv.id==="field"){cv._dz=1;cv._kabs=3.2*Math.pow(k0*.6/3.2,(DEFP-1)/99)}kd=k;if(cv._kabs)k=Math.max(kmn,Math.min(3.2,cv._kabs));else k=Math.max(kmn,Math.min(3.2,kd*z));cv._z=k/kd;cv._kmin=k0*.6;if(ah>150)cv._kabs=k;
 var vt=rel?0:top,L0=aw/2-mx*k,T0=vt+ah/2-my*k,pn=cv._pan||[0,0],pad=24,
  nx=aw-pad-L0-(ox+(B.c1-B.r0)*56+2200)*k,xx=pad-L0-(ox+(B.c0-B.r1)*56-2200)*k,ny=vt+ah-pad-T0-(oy+(B.c1+B.r1)*28+1600)*k,xy=vt+pad-T0-(oy+(B.c0+B.r0)*28-1600)*k,px,py;
 if(cv._anc){var a=cv._anc;cv._anc=null;pn=[a.sx-a.cx*k-L0,a.sy-a.cy*k-T0]}
 px=nx>xx?0:Math.max(nx,Math.min(xx,pn[0]));py=ny>xy?0:Math.max(ny,Math.min(xy,pn[1]));cv._pan=[px,py];
 cv._view={L:L0+px,T:T0+py,k:k};
 cv.style.width=aw+"px";cv.style.height=(rel?ah:window.innerHeight)+"px";cv.style.left="0px";cv.style.top="0px";cv.style.marginTop="0"}
function saveView(){var f=$("field"),v=f._view,hud,dh,sy;
 if(!v||!S||!TOKEN)return;
 hud=$("hud").offsetHeight;dh=$("botBar").offsetHeight;sy=hud+(window.innerHeight-hud-dh)/2;
 try{localStorage.setItem("farmView_"+TOKEN.slice(-12),JSON.stringify({k:v.k,cx:(window.innerWidth/2-v.L)/v.k,cy:(sy-v.T)/v.k,rot:f._rot||0,sz:S.sz||8}))}catch(e){}}
function restoreView(){var f=$("field"),o=null,hud=$("hud").offsetHeight,dh=$("botBar").offsetHeight;
 try{o=JSON.parse(localStorage.getItem("farmView_"+TOKEN.slice(-12))||"null")}catch(e){}
 if(!o||o.sz!==(S.sz||8)||!isFinite(o.k)||!isFinite(o.cx)||!isFinite(o.cy))return;
 f._kabs=o.k;
 f._anc={sx:window.innerWidth/2,sy:hud+(window.innerHeight-hud-dh)/2,cx:o.cx,cy:o.cy}}
window.addEventListener("pagehide",saveView);
document.addEventListener("visibilitychange",function(){if(document.hidden)saveView()});
 function fitAll(){var hud=$("hud").offsetHeight,dh=$("botBar").offsetHeight,eb=$("editbar").offsetHeight,f,vc,vh,lc,lh,lb;MHT=hud;if(S&&!fitAll.rv){fitAll.rv=1;restoreView()}
 $("buyBar").style.bottom=(dh+14)+"px";$("editbar").style.bottom=(dh+10)+"px";$("barnP").style.bottom="auto";$("toast").style.bottom=(dh+12)+"px";
 if(S){PERF=(S.sz||8)>=36||!!(S.ls&&S.ls.length)||S.np>150;
  f=$("field");if(!f._kabs||!f._box)f._box=lvl1Box(f);
  fit(f,S.np,hud,dh,f._box);f._fp=[S.np,hud,dh,f._box,0,"bgGrass",0]}
 if(V&&$("visit").style.display!=="none"){vh=$("vHead").offsetHeight;vc=$("vCanvas");if(!vc._kabs||!vc._box)vc._box=lvl1Box(vc);
  fit(vc,V.np,vh,0,vc._box,0);vc._fp=[V.np,vh,0,vc._box,0,"vBg",0];grassBg($("vBg"),vc,0)}
 if(LAY&&$("lay").style.display!=="none"){lh=$("lHead").offsetHeight;lb=$("lBar").offsetHeight;lc=$("lCanvas");
  fit(lc,S.np,lh,lb,LAY.box,1);lc._fp=[S.np,lh,lb,LAY.box,1,"lBg",lh];grassBg($("lBg"),lc,lh)}
 grassBg($("bgGrass"),$("field"),0);drawAll()}
var RW=window.innerWidth;window.addEventListener("resize",function(){if(Math.abs(window.innerWidth-RW)>60){RW=window.innerWidth;["field","vCanvas","lCanvas"].forEach(function(i){var e=$(i);if(e){e._kabs=0;e._z=1;e._box=null}})}fitAll();drawAll()});window.addEventListener("orientationchange",function(){setTimeout(function(){fitAll();drawAll()},250)});
var RAF=0,LASTMS=0,LASTEND=0;
function drawAll(){if(RAF)return;RAF=requestAnimationFrame(function(){RAF=0;var t0=Date.now();drawNow();LASTMS=Date.now()-t0;LASTEND=Date.now();
 if(SWY){SLOW=LASTMS>50?SLOW+1:Math.max(0,SLOW-1);if(SLOW>=5){SWY=false;SWOFF=Date.now()}}else if(Date.now()-SWOFF>20000){SWY=true;SLOW=0}})}
function drawNow(){ANIM=false;
 if(LAY&&$("lay").style.display!=="none"){iso($("lCanvas"),S.plots,LAY.pp,S.np,-1,LAY.dc,true);ANIM=false;return}
 var vis=!!V&&$("visit").style.display!=="none";
 if(S&&!vis)iso($("field"),S.plots,S.pp,S.np,HV.f,PEND?S.dc.concat([PEND]):S.dc,EDIT);
 if(vis){iso($("vCanvas"),V.plots,V.pp||[],V.np,HV.v,V.dc,false);drawVMini()}
 else drawMini()}
setInterval(function(){var fv=$("field")._view,zo=!!fv&&fv.k<.9;if(ANIM&&!document.hidden&&!MOVING&&$("mkt").style.display==="none"&&$("dlg").style.display!=="flex"&&Date.now()-LASTEND>(LASTMS>45?(zo?400:250):Math.max(PERF?120:34,LASTMS*(zo?4:2))))drawAll()},34);
function mmap(z){if(z)CR=0;else setRot($("field"));var n=(S&&S.sz)||8,B=wbox(n,S&&S.ls),ox=(n+2)*56+30,oy=186,x0=ox+(B.c0-B.r1)*56,x1=ox+(B.c1-B.r0)*56,y0=oy+(B.c0+B.r0)*28,y1=oy+(B.c1+B.r1)*28,m=Math.min(118/(x1-x0),59/(y1-y0));
 return{n:n,ox:ox,oy:oy,x0:x0,y0:y0,m:m,fx:(124-(x1-x0)*m)/2,fy:(65-(y1-y0)*m)/2}}
var MSC=1.4; // minimap size multiplier (the CSS size below must match: 124*MSC and 65*MSC)
function drawMini(){var cv=$("mini"),f=$("field"),v=f._view;
 if(!S||(S.sz||8)<14||!v||!SHOWMINI){cv.style.display="none";return}
 var dpr=Math.min(2,window.devicePixelRatio||1),sc=dpr*MSC,w=124,h=65,M=mmap(),x,i,q,o,cw=parseFloat(f.style.width)||window.innerWidth,ch=parseFloat(f.style.height)||window.innerHeight,vx,vy,vw,vh,rx,ry,rx2,ry2;
 if(MOVING&&Date.now()-MMT<90)return;MMT=Date.now();cv.style.display="block";if(cv._ht!==MHT){cv._ht=MHT;cv.style.top=(MHT+8)+"px"}
 if(cv.width!==Math.round(w*sc)){cv.width=Math.round(w*sc);cv.height=Math.round(h*sc)}
 x=cv.getContext("2d");x.setTransform(sc,0,0,sc,0,0);x.clearRect(0,0,w,h);
 function P(c,r){return[M.fx+(M.ox+(c-r)*56-M.x0)*M.m,M.fy+(M.oy+(c+r)*28-M.y0)*M.m]}
 function Q(c,r){var t=rp(c,r);return P(t[0],t[1])}
 function path(a){x.beginPath();a.forEach(function(p,j){j?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath()}
 // lands: green with a sandy edge
 parcels(M.n,S.ls).forEach(function(q){path([P(q.c0,q.r0),P(q.c1,q.r0),P(q.c1,q.r1),P(q.c0,q.r1)]);
  x.fillStyle=NIGHT?"#2f6a2a":"#86d452";x.fill();x.strokeStyle="#efdba8";x.lineWidth=1.6;x.lineJoin="round";x.stroke()});
 // plots
 for(i=0;i<S.np;i++){q=S.pp[i];if(!q)continue;o=Q(q[0]+.5,q[1]+.5);
  if(S.plots[i]&&isRipe(S.plots[i])){x.fillStyle="#ffd23a";x.fillRect(o[0]-1.8,o[1]-1.8,3.6,3.6)}
  else{x.fillStyle=S.plots[i]?"#1b5e20":"#a0693a";x.fillRect(o[0]-1.3,o[1]-1.3,2.6,2.6)}}
 // buildings, trees, animals, decorations
 (S.dc||[]).forEach(function(it){var f2,s2,col;if(it.s||isF(it.k))return;f2=FTD[it.k];
  col=it.k==="barn"?"#e53935":f2?(f2.animal?"#ff9800":"#00897b"):"#ab47bc";
  s2=Math.max(2.6,Math.min(8,footN(it.k)*1.7));o=Q(it.c+.5,it.r+.5);
  x.fillStyle=col;x.fillRect(o[0]-s2/2,o[1]-s2/2,s2,s2);x.strokeStyle="rgba(0,0,0,.5)";x.lineWidth=.6;x.strokeRect(o[0]-s2/2,o[1]-s2/2,s2,s2)});
 // your screen view: everything outside is darkened, the view gets a bright cyan frame
 vx=M.fx+((-v.L/v.k)-M.x0)*M.m;vy=M.fy+((-v.T/v.k)-M.y0)*M.m;vw=cw/v.k*M.m;vh=ch/v.k*M.m;
 rx=Math.max(1,vx);ry=Math.max(1,vy);rx2=Math.min(w-1,vx+vw);ry2=Math.min(h-1,vy+vh);
 if(rx2-rx<3)rx2=rx+3;if(ry2-ry<3)ry2=ry+3;
 x.save();x.beginPath();x.rect(0,0,w,h);x.rect(rx,ry,rx2-rx,ry2-ry);x.fillStyle="rgba(0,25,45,.42)";x.fill("evenodd");x.restore();
 x.fillStyle="rgba(0,229,255,.14)";x.fillRect(rx,ry,rx2-rx,ry2-ry);
 x.lineJoin="round";x.strokeStyle="rgba(0,0,0,.8)";x.lineWidth=3.6;x.strokeRect(rx,ry,rx2-rx,ry2-ry);
 x.strokeStyle="#00e5ff";x.lineWidth=2;x.strokeRect(rx,ry,rx2-rx,ry2-ry)}
function miniGo(e){var cv=$("mini"),r=cv.getBoundingClientRect(),M=mmap(),hh=$("hud").offsetHeight,
 wx=((e.clientX-r.left)/MSC-M.fx)/M.m+M.x0,wy=((e.clientY-r.top)/MSC-M.fy)/M.m+M.y0;
 $("field")._anc={sx:window.innerWidth/2,sy:hh+(window.innerHeight-hh)/2,cx:wx,cy:wy};fitMove($("field"))}
(function(){var cv=$("mini"),on=false;
 cv.addEventListener("pointerdown",function(e){on=true;try{cv.setPointerCapture(e.pointerId)}catch(x){}miniGo(e);e.preventDefault()});
 cv.addEventListener("pointermove",function(e){if(on)miniGo(e)});
 function off(){on=false}cv.addEventListener("pointerup",off);cv.addEventListener("pointercancel",off)})();
$("field").onclick=function(e){if(CAM)return;if(this._drag){this._drag=false;return}if(EDIT){var bo=!PLACING&&!PAINT&&!PBUY&&!PEND&&!GMOVE&&!SEL,bw=bo&&$("barnP").style.display!=="none";try{editTap(this,e);if(bw&&SEL){SEL=null;editUI();drawAll();return}if(bo&&!SEL&&!PLACING&&!PAINT&&!PBUY&&!PEND&&!GMOVE)setEdit(false)}catch(err){toast("Decorate error: "+(err&&err.message)+" @ "+String(err&&err.stack).split("\n").slice(0,3).join(" | "))}return}var t=pickDeco(this,ptr(this,e));if(t&&t.k==="barn"){setEdit0(true);$("edBarn").onclick();return}if(t&&t.k==="cowshed"){shedDlg(t.id);return}if(t&&t.k==="chickenshed"){chickDlg(t.id);return}if(t&&t.k==="sheepshed"){sheepDlg(t.id);return}if(t&&t.k==="pigshed"){pigDlg(t.id);return}if(t&&t.k==="pigshed"){pigDlg(t.id);return}if(t&&t.k==="horseshed"){horseDlg(t.id);return}if(t&&FTD[t.k]){tapTree(t);return}var i=hit(this,e);if(i>=0)tapPlot(i)};
$("field").onmousemove=function(e){if(EDIT){if(SEL||PLACING||PBUY){var t=toTile(this,ptr(this,e)),n=[Math.floor(t[0]),Math.floor(t[1])],ka=PBUY?null:curK(PEND||PLACING||SEL);if(ka)n=anch(n[0],n[1],ka);if(!HOVT||HOVT[0]!==n[0]||HOVT[1]!==n[1]){HOVT=n;drawAll()}}return}var i=hit(this,e);if(i!==HV.f){HV.f=i;drawAll()}};
$("field").onmouseleave=function(){HV.f=-1;drawAll()};
