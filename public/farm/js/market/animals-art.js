// ---------- ANIMALS ----------
var ANP=0,ANPV=null,ANV={}; // ANP: 0 = whole animal, 1 = body and legs, 2 = head and neck, 3 = tail
function quad(p,c){var x=p[0],y=p[1],s=c.s||1,lh=c.lh*s,bw=c.bw*s,bh=c.bh*s,by=y-lh-bh*.7,hr=c.hr*s,hx=x+bw*.85+(c.nx||0)*s,hy=by-bh*.25-(c.nh||0)*s,lw=3.4*s,i,a,g,px,py,rn=mk(11),hc=c.hc||c.col,cx=x+bw*.1,
 B=ANP===0||ANP===1,H=ANP===0||ANP===2,T=ANP===0||ANP===3;
 ANPV={h:[bw*.6,by-bh*.1-y],t:[-bw*.95,by-bh*.2-y]};
 if(B){
  g=X.createRadialGradient(cx,y,1,cx,y,bw*1.25);g.addColorStop(0,"rgba(10,20,5,.42)");g.addColorStop(1,"rgba(10,20,5,0)");
  X.save();X.fillStyle=g;X.translate(0,y);X.scale(1,.34);X.translate(0,-y);X.beginPath();X.arc(cx,y,bw*1.25,0,7);X.fill();X.restore();
  [[-.6,1],[.3,1],[-.3,0],[.62,0]].forEach(function(o){var lx=x+o[0]*bw,L=c.legc||(o[1]?c.dk:c.col),fs=o[1]?cmul(L,.62):lg(lx-lw/2,0,lx+lw/2,0,[[0,cmul(L,1.12)],[1,cmul(L,.7)]]);
   poly([[lx-lw/2,by+bh*.3],[lx+lw/2,by+bh*.3],[lx+lw*.36,y-2*s],[lx-lw*.36,y-2*s]],fs);
   X.fillStyle="#2c2218";X.beginPath();X.ellipse(lx,y-1.1*s,lw*.55,1.5*s,0,0,7);X.fill()});
  if(c.udder){X.fillStyle=lg(0,by+bh*.5,0,by+bh*1.1,[[0,"#f4b4bb"],[1,"#d98a98"]]);X.beginPath();X.ellipse(x+bw*.3,by+bh*.8,4*s,3*s,0,0,7);X.fill()}
  if(c.wool){for(i=0;i<9;i++){a=i*.7;blob(x+Math.cos(a)*bw*.78,by+Math.sin(a)*bh*.7,bh*.62,[c.col,c.dk])}blob(x,by,bh*.9,[c.col,c.dk]);
   X.fillStyle=lg(0,by,0,by+bh*1.2,[[0,"rgba(30,20,20,0)"],[1,"rgba(30,20,20,.3)"]]);X.beginPath();X.ellipse(x,by+bh*.25,bw*1.05,bh*.95,0,0,7);X.fill();
   for(i=0;i<14;i++)dot(x+(rn()-.5)*bw*1.6,by+(rn()-.5)*bh*1.3,s*.8,"rgba(255,255,255,.28)")}
  else{X.fillStyle=lg(0,by-bh,0,by+bh,[[0,cmul(c.col,1.1)],[.5,c.col],[1,c.dk]]);X.beginPath();X.ellipse(x,by,bw,bh,0,0,7);X.fill();
   X.save();X.beginPath();X.ellipse(x,by,bw,bh,0,0,7);X.clip();
   if(c.sp)c.sp.forEach(function(o){var r=o[2]*s,sx=x+o[0]*s,sy=by+o[1]*s,gg=X.createRadialGradient(sx,sy,r*.4,sx,sy,r*1.15);gg.addColorStop(0,c.spc);gg.addColorStop(.7,c.spc);gg.addColorStop(1,"rgba(0,0,0,0)");X.fillStyle=gg;X.beginPath();X.arc(sx,sy,r*1.15,0,7);X.fill()});
   X.fillStyle=lg(0,by,0,by+bh,[[0,"rgba(0,0,0,0)"],[1,"rgba(25,12,0,.4)"]]);X.fillRect(x-bw,by,bw*2,bh);
   X.fillStyle=lg(x-bw,0,x+bw,0,[[0,"rgba(25,12,0,.22)"],[.55,"rgba(0,0,0,0)"],[1,"rgba(255,255,255,.07)"]]);X.fillRect(x-bw,by-bh,bw*2,bh*2);
   X.fillStyle="rgba(255,255,255,.2)";X.beginPath();X.ellipse(x-bw*.1,by-bh*.6,bw*.68,bh*.28,0,0,7);X.fill();
   X.strokeStyle="rgba(0,0,0,.11)";X.lineWidth=.7;for(i=0;i<28;i++){px=x+(rn()-.5)*bw*1.8;py=by+(rn()-.5)*bh*1.7;X.beginPath();X.moveTo(px,py);X.lineTo(px-1.6*s,py+2.4*s);X.stroke()}
   X.restore()}
 }
 if(T){X.lineCap="round";X.strokeStyle=c.tail||c.dk;X.lineWidth=2.2*s;X.beginPath();
  if(c.curl)X.arc(x-bw-2*s,by-bh*.3,2.6*s,.4,5.4);else{X.moveTo(x-bw*.95,by-bh*.2);X.quadraticCurveTo(x-bw-5*s,by,x-bw-4*s,by+7*s)}X.stroke();
  if(!c.curl){X.fillStyle=c.tail||c.dk;X.beginPath();X.ellipse(x-bw-4*s,by+8*s,1.9*s,3.2*s,.1,0,7);X.fill()}
  X.lineCap="butt"}
 if(H){
  if(c.nh){X.lineCap="round";X.strokeStyle=cmul(c.col,.78);X.lineWidth=hr*1.3;X.beginPath();X.moveTo(x+bw*.6,by-bh*.1+hr*.15);X.lineTo(hx,hy+hr*.15);X.stroke();
   X.strokeStyle=c.col;X.lineWidth=hr;X.beginPath();X.moveTo(x+bw*.6,by-bh*.1-hr*.1);X.lineTo(hx,hy-hr*.1);X.stroke();X.lineCap="butt"}
  if(c.horn){X.strokeStyle="#efe6cf";X.lineWidth=2*s;X.lineCap="round";X.beginPath();
   if(c.horn===2){X.moveTo(hx-hr*.4,hy-hr*.7);X.quadraticCurveTo(hx-hr*1.6,hy-hr*.9,hx-hr*1.5,hy-hr*.1);X.moveTo(hx+hr*.2,hy-hr*.8);X.quadraticCurveTo(hx-hr*.2,hy-hr*1.8,hx-hr*1.1,hy-hr*1.3)}
   else{X.moveTo(hx-hr*.2,hy-hr*.8);X.lineTo(hx-hr*.6,hy-hr*1.6);X.moveTo(hx+hr*.3,hy-hr*.8);X.lineTo(hx+hr*.1,hy-hr*1.6)}X.stroke();X.lineCap="butt"}
  if(c.ear==="up"){leaf(hx-hr*.2,hy-hr*1.1,hr*.28,hr*.65,.15,c.earc||c.col);leaf(hx-hr*.18,hy-hr*1.05,hr*.14,hr*.45,.15,"rgba(240,170,170,.55)")}
  g=X.createRadialGradient(hx-hr*.35,hy-hr*.45,hr*.1,hx,hy,hr*1.1);g.addColorStop(0,cmul(hc,1.15));g.addColorStop(1,cmul(hc,.74));
  X.fillStyle=g;X.beginPath();X.ellipse(hx,hy,hr*1.05,hr*.92,0,0,7);X.fill();
  if(c.wool)blob(hx-hr*.2,hy-hr*.8,hr*.55,[c.col,c.dk]);
  if(c.ear==="flop"){leaf(hx-hr*.75,hy-hr*.1,hr*.3,hr*.6,.5,c.earc||c.col);leaf(hx-hr*.72,hy-hr*.05,hr*.16,hr*.4,.5,"rgba(0,0,0,.18)")}
  X.fillStyle=lg(0,hy,0,hy+hr*.8,[[0,cmul(c.sn,1.1)],[1,cmul(c.sn,.8)]]);X.beginPath();X.ellipse(hx+hr*.75,hy+hr*.3,hr*.55,hr*.42,0,0,7);X.fill();
  dot(hx+hr*.9,hy+hr*.25,hr*.1,"rgba(0,0,0,.5)");dot(hx+hr*.6,hy+hr*.25,hr*.1,"rgba(0,0,0,.5)");
  X.strokeStyle="rgba(0,0,0,.3)";X.lineWidth=.7;X.beginPath();X.moveTo(hx+hr*.35,hy+hr*.5);X.lineTo(hx+hr*1.05,hy+hr*.52);X.stroke();
  X.strokeStyle="rgba(0,0,0,.22)";X.beginPath();X.arc(hx+hr*.25,hy-hr*.22,hr*.26,3.5,5.9);X.stroke();
  dot(hx+hr*.25,hy-hr*.25,hr*.16,"#1a1208");dot(hx+hr*.3,hy-hr*.31,hr*.06,"#fff");
  if(c.beard)poly([[hx+hr*.5,hy+hr*.6],[hx+hr*.7,hy+hr*1.3],[hx+hr*.9,hy+hr*.6]],"#cfc6b0")}}
function bird(p,c){var x=p[0],y=p[1],s=c.s||1,lh=c.lh*s,bw=c.bw*s,bh=c.bh*s,by=y-lh-bh*.6,hr=c.hr*s,hx=x+bw*.7+(c.nx||0)*s,hy=by-bh*.5-(c.nh||0)*s,k,a,g,cx=x+bw*.1,hc=c.hc||c.col;
 g=X.createRadialGradient(cx,y,1,cx,y,bw*1.2);g.addColorStop(0,"rgba(10,20,5,.42)");g.addColorStop(1,"rgba(10,20,5,0)");
 X.save();X.fillStyle=g;X.translate(0,y);X.scale(1,.34);X.translate(0,-y);X.beginPath();X.arc(cx,y,bw*1.2,0,7);X.fill();X.restore();
 X.lineCap="round";X.lineWidth=1.7*s;
 [[.3,.62],[-.1,1]].forEach(function(o){var lx=x+o[0]*bw;X.strokeStyle=cmul(c.leg,o[1]);X.lineWidth=1.7*s;X.beginPath();X.moveTo(lx,by+bh*.5);X.lineTo(lx,y-.5);X.stroke();
  X.lineWidth=1.2*s;X.beginPath();X.moveTo(lx+3.4*s,y);X.lineTo(lx,y-.4);X.lineTo(lx+2.2*s,y+1.3*s);X.moveTo(lx,y-.4);X.lineTo(lx-1.6*s,y+.9*s);X.stroke()});
 X.lineCap="butt";
 if(c.fan)for(k=-2;k<=2;k++){a=-2.5+k*.3;leaf(x-bw*.8+Math.cos(a)*bw*.7,by-bh*.1+Math.sin(a)*bw*.7,bw*.55,bh*.28,a,c.fan[Math.abs(k)%c.fan.length])}
 else leaf(x-bw*.95,by-bh*.35,bw*.4,bh*.3,-.7,c.dk);
 X.fillStyle=lg(0,by-bh,0,by+bh,[[0,cmul(c.col,1.1)],[.5,c.col],[1,c.dk]]);X.beginPath();X.ellipse(x,by,bw,bh,0,0,7);X.fill();
 X.save();X.beginPath();X.ellipse(x,by,bw,bh,0,0,7);X.clip();
 X.fillStyle=lg(0,by,0,by+bh,[[0,"rgba(0,0,0,0)"],[1,"rgba(25,12,0,.35)"]]);X.fillRect(x-bw,by,bw*2,bh);
 X.fillStyle="rgba(255,255,255,.22)";X.beginPath();X.ellipse(x+bw*.1,by-bh*.6,bw*.6,bh*.25,0,0,7);X.fill();
 X.restore();
 leaf(x-bw*.15,by,bw*.55,bh*.45,.15,c.dk);
 X.strokeStyle="rgba(0,0,0,.2)";X.lineWidth=.7;for(k=0;k<3;k++){X.beginPath();X.arc(x-bw*.45,by-bh*.1+k*bh*.18,bw*.5,-.3,.9);X.stroke()}
 X.fillStyle="rgba(255,255,255,.18)";X.beginPath();X.ellipse(x-bw*.2,by-bh*.2,bw*.4,bh*.14,.15,0,7);X.fill();
 if(c.nh){X.lineCap="round";X.strokeStyle=cmul(c.nc||c.col,.78);X.lineWidth=hr*1.15;X.beginPath();X.moveTo(x+bw*.5,by-bh*.2+hr*.15);X.lineTo(hx,hy+hr*.15);X.stroke();
  X.strokeStyle=c.nc||c.col;X.lineWidth=hr*.9;X.beginPath();X.moveTo(x+bw*.5,by-bh*.2-hr*.1);X.lineTo(hx,hy-hr*.1);X.stroke();X.lineCap="butt"}
 g=X.createRadialGradient(hx-hr*.3,hy-hr*.4,hr*.1,hx,hy,hr*1.05);g.addColorStop(0,cmul(hc,1.15));g.addColorStop(1,cmul(hc,.75));
 X.fillStyle=g;X.beginPath();X.arc(hx,hy,hr,0,7);X.fill();
 poly([[hx+hr*.8,hy-hr*.3],[hx+hr*.8+c.bk*s,hy+hr*.1],[hx+hr*.8,hy+hr*.4]],c.beak);
 poly([[hx+hr*.8,hy+hr*.1],[hx+hr*.8+c.bk*s,hy+hr*.1],[hx+hr*.8,hy+hr*.4]],cmul(c.beak,.8));
 if(c.comb){dot(hx-hr*.3,hy-hr*1.05,hr*.38,"#d9322a");dot(hx+hr*.1,hy-hr*1.15,hr*.4,"#d9322a");dot(hx,hy-hr*1.25,hr*.12,"rgba(255,255,255,.5)")}
 if(c.wattle)dot(hx+hr*.6,hy+hr*.6,hr*.3,"#d9322a");
 dot(hx+hr*.25,hy-hr*.2,hr*.2,"#1a1208");dot(hx+hr*.3,hy-hr*.27,hr*.07,"#fff")}
var ANI={
a_chicken:[bird,{lh:5,bw:9,bh:7,hr:4.2,nh:3,nx:1,col:"#fbf8f0",dk:"#d9d2bd",leg:"#e0a020",beak:"#f2a21a",bk:4,comb:1,wattle:1}],
a_duck:[bird,{lh:3.5,bw:10,bh:6.5,hr:4,nh:3.5,nx:1,col:"#8a6a44",dk:"#6a4e2e",hc:"#2f7a4a",nc:"#2f7a4a",leg:"#f08a1a",beak:"#f2c21a",bk:5}],
a_goose:[bird,{lh:6,bw:11,bh:7.5,hr:4,nh:10,nx:2,col:"#fff",dk:"#d8d8d0",leg:"#f08a1a",beak:"#f08a1a",bk:5}],
a_turkey:[bird,{lh:6,bw:11,bh:8,hr:3.6,nh:7,nx:1,col:"#7a4e2c",dk:"#4a2e18",hc:"#9ab4c8",nc:"#9ab4c8",leg:"#a8845c",beak:"#e0a020",bk:3,wattle:1,fan:["#6a3a22","#c9702a","#e8c060"]}],
a_ostrich:[bird,{s:1.25,lh:15,bw:11,bh:9,hr:3.6,nh:20,col:"#2a2a2e",dk:"#1a1a1e",hc:"#f0b8a8",nc:"#f0b8a8",leg:"#e8b0a0",beak:"#f0b8a8",bk:4,fan:["#fff","#f4f4f4","#e0e0e0"]}],
a_sheep:[quad,{bw:12,bh:9,lh:7,hr:5,nx:2,col:"#fbfbf6",dk:"#dcdcd0",hc:"#3a3036",sn:"#4a4046",ear:"flop",earc:"#3a3036",wool:1,legc:"#3a3036"}],
a_goat:[quad,{bw:11,bh:7.5,lh:10,hr:4.6,nx:2,nh:3,col:"#e8e0d0",dk:"#b8ae98",sn:"#c9b8a0",ear:"flop",earc:"#b8ae98",horn:1,beard:1}],
a_pig:[quad,{bw:13,bh:9,lh:5,hr:6,nx:2,col:"#f6b8c0",dk:"#d98a98",sn:"#f09aa8",ear:"flop",earc:"#e888a0",curl:1}],
a_cow:[quad,{bw:17,bh:10,lh:10,hr:7,nx:4,nh:3,col:"#f6f2ea",dk:"#d8d2c4",sp:[[-8,-3,5],[5,2,4],[-2,5,3.5]],spc:"#2a2a2e",sn:"#f0b4b0",ear:"flop",earc:"#2a2a2e",horn:1,tail:"#2a2a2e",udder:1}],
a_carabao:[quad,{bw:18,bh:10,lh:10,hr:7,nx:4,nh:2,col:"#6a6a72",dk:"#3a3a42",sn:"#2f2f36",ear:"flop",earc:"#3a3a42",horn:2,tail:"#2a2a30"}],
a_alpaca:[quad,{bw:11,bh:8,lh:13,hr:4.4,nx:3,nh:15,col:"#f0e4cc",dk:"#cdbd9c",sn:"#e0cfae",ear:"up",earc:"#e0cfae"}],
a_quail:[bird,{s:.8,lh:3,bw:8,bh:6,hr:3.4,nx:1,nh:2,col:"#a8885a",dk:"#6a4e2e",hc:"#7a5a3a",nc:"#7a5a3a",leg:"#c8a070",beak:"#5a4a2a",bk:3}],
a_rooster:[bird,{lh:6,bw:10,bh:7.5,hr:4.3,nx:1,nh:4,col:"#c8602a",dk:"#7a2a12",hc:"#c8602a",nc:"#d8801a",leg:"#e0a020",beak:"#f2a21a",bk:4,comb:1,wattle:1,fan:["#1a6a4a","#2a3a8a","#8a2a12"]}],
a_swan:[bird,{s:1.1,lh:3,bw:11,bh:7.5,hr:3.6,nx:2,nh:11,col:"#fbfbf8",dk:"#d8d8d0",nc:"#fbfbf8",leg:"#2a2a2a",beak:"#f08a1a",bk:4}],
a_peacock:[bird,{s:1.2,lh:8,bw:10,bh:7,hr:3.4,nx:2,nh:9,col:"#1f6fa8",dk:"#0f3f6a",hc:"#1f8a8a",nc:"#1f8ab8",leg:"#8a7a6a",beak:"#d8c8a0",bk:3,fan:["#1f8a5a","#2a5ac8","#c8a820"]}],
a_pony:[quad,{s:.85,bw:14,bh:8,lh:11,hr:5,nx:4,nh:5,col:"#c08a4a",dk:"#7a5430",sn:"#8a6038",ear:"up",earc:"#7a5430",tail:"#3a2a1a"}],
a_horse:[quad,{s:1.1,bw:16,bh:9,lh:14,hr:5.4,nx:5,nh:9,col:"#7a4a2a",dk:"#4a2a16",sn:"#5a3a22",ear:"up",earc:"#4a2a16",tail:"#1a1008"}],
a_donkey:[quad,{bw:13,bh:8,lh:10,hr:5,nx:3,nh:4,col:"#9a9aa2",dk:"#6a6a72",sn:"#e8e0d0",ear:"up",earc:"#6a6a72",tail:"#4a4a52"}],
a_llama:[quad,{bw:11,bh:8,lh:13,hr:4.4,nx:3,nh:14,col:"#f4efe4",dk:"#c8bfa8",sn:"#b8a888",ear:"up",earc:"#c8bfa8",sp:[[-4,-2,4],[3,2,3]],spc:"#8a6a44"}],
a_hcow:[quad,{bw:16,bh:10,lh:7,hr:6.5,nx:4,nh:1,col:"#d8883a",dk:"#a85a1e",sn:"#e8a870",horn:2,wool:1,ear:"flop",earc:"#a85a1e",tail:"#a85a1e"}],
a_yak:[quad,{bw:17,bh:11,lh:7,hr:6.4,nx:4,nh:1,col:"#4a3a32",dk:"#1a120e",sn:"#2a1c16",horn:2,wool:1,ear:"flop",earc:"#2a1c16",tail:"#1a120e"}]};
var QD={};
Object.keys(ANI).forEach(function(id){DEC[id]=function(p){ANI[id][0](p,ANI[id][1])};HB[id]=[-24,-60,26,8];if(ANI[id][0]===quad)QD[id]=1});
// body / head / tail pictures of four-legged animals, made once and reused (small pictures, so memory stays low)
var ASP={},ASPN=0;
function asprite(kind,dpr,part){var key=kind+"@"+dpr+"@"+part,s=ASP[key],c,cx,oX,oG,oP;if(s)return s;
 if(ASPN>150){ASP={};ASPN=0}
 c=document.createElement("canvas");c.width=Math.round(120*dpr);c.height=Math.round(90*dpr);
 cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);oX=X;oG=G;oP=ANP;X=cx;G={ox:60,oy:76,TW:112,TH:56,cols:4,rows:2};ANP=part;
 try{DEC[kind]([60,76])}finally{X=oX;G=oG;ANP=oP}
 ANV[kind]=ANPV;ASP[key]=c;ASPN++;return c}
// draws one animal with: gentle breathing, head swaying and now and then lowering to graze, tail swishing
function drawQuad(it,p,t,fl,dpr){var ph=aph(it.id),k=it.k,c=ANI[k][1],B=asprite(k,dpr,1),Hd=asprite(k,dpr,2),Tl=asprite(k,dpr,3),V=ANV[k],
 br=Math.sin(t/(1300+ph*600)+ph*6.28),sw=Math.sin(t/(2300+ph*900)+ph*9),
 u=((t/(9000+ph*5000))+ph)%1,gz=u<.34?Math.sin(u/.34*Math.PI):0,
 ha=.05*sw+(gz*gz*(3-2*gz))*(c.nh>8?.3:.45),
 ta=.3*Math.sin(t/(420+ph*200)+ph*7)*(.55+.45*Math.sin(t/3100+ph*3));
 X.save();X.translate(p[0],p[1]);if(fl)X.scale(-1,1);X.rotate(.006*sw);X.scale(1-.005*br,1+.012*br);
 X.drawImage(B,-60,-76,120,90);
 X.save();X.translate(V.t[0],V.t[1]);X.rotate(ta);X.drawImage(Tl,-60-V.t[0],-76-V.t[1],120,90);X.restore();
 X.save();X.translate(V.h[0],V.h[1]);X.rotate(ha);X.drawImage(Hd,-60-V.h[0],-76-V.h[1],120,90);X.restore();
 X.restore()}
HB.a_alpaca=[-20,-92,24,8];HB.a_ostrich=[-22,-92,26,8];HB.a_horse=[-26,-88,30,8];HB.a_llama=[-20,-92,24,8];HB.a_swan=[-22,-80,26,8];HB.a_peacock=[-26,-84,30,8];
DEC.a_rabbit=function(p){var x=p[0],y=p[1];shade(p,15,5.5,.3);
 X.fillStyle="#d8cdb8";X.beginPath();X.ellipse(x-5,y-2,7,3,0,0,7);X.fill();
 blob(x-1,y-8,8,["#f2ece0","#bfb29a"]);dot(x-9,y-8,3.4,"#fff");blob(x+6,y-14,5,["#f2ece0","#c4b8a0"]);
 leaf(x+4,y-26,2.2,7,.15,"#f2ece0");leaf(x+8,y-26,2.2,7,-.15,"#e4d8c4");leaf(x+4,y-26,1,5,.15,"#f0b0b8");
 dot(x+8.5,y-15,1,"#1a1208");dot(x+10.8,y-12.6,1.1,"#e890a0");
 X.strokeStyle="rgba(60,50,40,.5)";X.lineWidth=.6;X.beginPath();X.moveTo(x+10,y-13);X.lineTo(x+15,y-14);X.moveTo(x+10,y-12);X.lineTo(x+15,y-11);X.stroke();
 X.fillStyle="#e8e0d0";X.fillRect(x+4,y-4,3,4)};
HB.a_rabbit=[-18,-40,20,8];

