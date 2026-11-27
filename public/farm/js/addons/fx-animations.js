(function(){
"use strict";
var RM=false;try{RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var cv=document.createElement("canvas"),cx=cv.getContext("2d"),DPR=1,W=0,H=0,
    P=[],D=[],T=[],SP=[],RAF=0,last=0,sndT=0,POP=.34,HOLD=.55;
cv.id="fxLayer";
cv.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;z-index:46;pointer-events:none";
document.body.appendChild(cv);
function size(){DPR=Math.min(1.5,window.devicePixelRatio||1);W=window.innerWidth;H=window.innerHeight;
 cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR)}
size();window.addEventListener("resize",size);

/* ---------- pictures drawn once, then reused (keeps it fast) ---------- */
function mk(fn){var c=document.createElement("canvas");c.width=c.height=64;fn(c.getContext("2d"));return c}
var COIN=mk(function(x){var g=x.createRadialGradient(24,22,3,32,32,31);
 g.addColorStop(0,"#fff6b8");g.addColorStop(.5,"#f6bd2f");g.addColorStop(1,"#b26f0c");
 x.fillStyle=g;x.beginPath();x.arc(32,32,30,0,6.2832);x.fill();
 x.strokeStyle="#ffe680";x.lineWidth=3;x.beginPath();x.arc(32,32,28.5,0,6.2832);x.stroke();
 x.strokeStyle="rgba(140,80,8,.65)";x.lineWidth=3;x.beginPath();x.arc(32,32,19,0,6.2832);x.stroke();
 x.fillStyle="rgba(255,255,255,.55)";x.beginPath();x.ellipse(23,20,9,4,-.7,0,6.2832);x.fill()});
var STAR=mk(function(x){var i,a,r,g=x.createRadialGradient(32,32,2,32,32,30);
 g.addColorStop(0,"#ffffff");g.addColorStop(1,"#7fe05a");x.fillStyle=g;x.beginPath();
 for(i=0;i<8;i++){a=i*Math.PI/4-Math.PI/2;r=i%2?10:30;x.lineTo(32+Math.cos(a)*r,32+Math.sin(a)*r)}
 x.closePath();x.fill()});
var GLOW=mk(function(x){var g=x.createRadialGradient(32,32,2,32,32,32);
 g.addColorStop(0,"rgba(255,236,150,.9)");g.addColorStop(1,"rgba(255,220,100,0)");
 x.fillStyle=g;x.fillRect(0,0,64,64)});

/* ---------- helpers ---------- */
function ok(){return !RM&&!document.hidden}
function onScr(s){return s&&s[0]>-30&&s[0]<W+30&&s[1]>-30&&s[1]<H+30}
function clampS(p){return[Math.max(12,Math.min(W-12,p[0])),Math.max(12,Math.min(H-12,p[1])),p[2]]}
function tgt(id){var r=document.getElementById(id).getBoundingClientRect();
 return[r.left+Math.min(16,r.width/2),r.top+r.height/2]}
function pulse(el){if(el&&el.animate)el.animate(
 [{transform:"scale(1)"},{transform:"scale(1.22)",offset:.4},{transform:"scale(1)"}],{duration:260,easing:"ease-out"})}
// tile (c,r) -> screen position (same maths as the farm drawing). cid = which canvas.
function scr(c,r,dy,cid){var f=document.getElementById(cid||"field"),g=f._g,t;if(!g)return null;
 if(g.cr&&window.rtv){t=window.rtv(g,c,r);c=t[0];r=t[1]}
 var rc=f.getBoundingClientRect(),k=g.k;
 return[rc.left+g.L+(g.ox+(c-r)*g.TW/2)*k, rc.top+g.T+(g.oy+(c+r+1)*g.TH/2+(dy||0))*k, k]}
function itemTop(k){var b=HB[k];return b?b[1]+6:-60}   // top of a tree / animal
function itemMid(k){var b=HB[k];return b?b[1]*.5:-30}  // middle of an object
var CROP_TOP=-32;                                      // top of a crop
function kick(){if(!RAF){last=performance.now();RAF=requestAnimationFrame(loop)}}

/* ---------- particle makers ---------- */
function burst(x,y,col,n,sp,g,r){var i,a,s;if(D.length>400)return;
 for(i=0;i<n;i++){a=Math.random()*6.2832;s=sp*(.4+Math.random()*.6);
  D.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-sp*.35,g:g,a:0,life:.35+Math.random()*.3,r:(r||2)*(.6+Math.random()*.8),c:col})}}
function txt(x,y,t,c){T.push({x:x,y:y,t:t,c:c,a:0,life:1.05})}
// a coin: pops up ABOVE the source, hovers a moment, then flies to the target
function coin(s,t,delay,star,tid,fly){
 var z=Math.max(.75,Math.min(1.5,s[2]||1)),ex=s[0]+(star?0:(Math.random()-.5)*34*z),ey=s[1]-(26+Math.random()*16)*z;
 P.push({tid:tid,x0:s[0],y0:s[1]+4,ex:ex,ey:ey,x1:t[0],y1:t[1],
  cx:ex+(t[0]-ex)*.3+(Math.random()-.5)*70, cy:ey-50-Math.random()*40,
  d:delay,hd:HOLD+(fly||0),a:0,dur:.55+Math.min(.3,Math.hypot(t[0]-ex,t[1]-ey)/2200)+Math.random()*.1,
  ph:Math.random()*6.28,sz:star?24:22,star:!!star,tr:[]})}

/* ---------- public effects ---------- */
// list = [{p:[x,y,k], v:coins, big:bool, sell:bool}]
function fxHarvest(list,xp){
 if(!ok()||!list.length)return;
 var t=tgt("sCoins"),n=Math.min(list.length,40),per=n>12?1:n>5?2:3,i,j,s,it,cnt,first=null;
 for(i=0;i<n;i++){it=list[i];s=clampS(it.p);if(!first)first=s;
  if(it.sell){burst(s[0],s[1],"#f1ecde",14,90,-30,3.6);burst(s[0],s[1],"#cfc8b4",8,60,-20,3);burst(s[0],s[1],"#ffe27a",6,110,170,2)}
  else burst(s[0],s[1],it.big?"#ff9f2e":"#ffe27a",it.big?18:9,it.big?130:95,170,it.big?2.8:2.2);
  if(n<=6)txt(s[0],s[1]+26,"+"+it.v,it.big?"#ffb347":"#ffe27a");
  cnt=per+(it.big?2:0);
  for(j=0;j<cnt&&P.length<60;j++)coin(s,t,Math.min(.35,i*.025),false,null,j*.1+Math.min(.5,i*.03))}
 if(xp>0&&first&&P.length<70)coin(first,tgt("sLvl"),.2,true,null,.4);
 kick()}
// list = [[x,y,k], ...]  every plot that received a seed, animated as a wave across the field
function fxPlant(list){
 if(!ok())return;var v=[],i,s,n,q,span;
 for(i=0;i<list.length;i++){s=list[i];if(onScr(s))v.push(s)}
 n=v.length;if(!n)return;
 v.sort(function(a,b){return a[1]-b[1]||a[0]-b[0]});          // back to front
 q=n>60?3:n>25?5:9;span=Math.min(1.1,n*.03);
 for(i=0;i<n;i++)SP.push({x:v[i][0],y:v[i][1],k:Math.max(.6,Math.min(1.5,v[i][2]||1)),a:0,life:.9,d:n>1?i/(n-1)*span:0,f:0,q:q});
 kick()}
function fxHelp(s){
 if(!ok())return;s=clampS(s);var t=tgt("vCoins"),j;
 burst(s[0],s[1]-4,"#7fd0ff",12,55,320,2.4);   // water drops
 burst(s[0],s[1]+16,"#a8e86a",7,70,-40,2);      // green sparkles
 txt(s[0],s[1]+26,"-10%","#9fe0ff");
 for(j=0;j<2&&P.length<60;j++)coin(s,t,.1+j*.12,false,"vCoins");
 kick()}
function arrive(p){var id=p.tid||(p.star?"sLvl":"sCoins"),el=document.getElementById(id),n=performance.now();
 burst(p.x1,p.y1,p.star?"#bff08a":"#ffd54a",4,60,120,1.8);
 if(el&&n-(el._fxp||0)>90){el._fxp=n;pulse(el)}
 if(!p.star&&n-sndT>120){sndT=n;try{window.FarmAudio&&FarmAudio.play("coin")}catch(e){}}}

/* ---------- drawing ---------- */
function drawSprout(p){var u=p.a/p.life,gr=Math.min(1,u/.4),c1=1.70158,c3=c1+1,ru=Math.min(1,p.a/.55),
 k=(1+c3*Math.pow(gr-1,3)+c1*Math.pow(gr-1,2))*p.k,al=u>.7?1-(u-.7)/.3:1;
 if(ru<1){cx.globalAlpha=(1-ru)*.55;cx.strokeStyle="#d8f5b0";cx.lineWidth=2;cx.beginPath();
  cx.ellipse(p.x,p.y+2,(6+26*ru)*p.k,(6+26*ru)*.5*p.k,0,0,6.2832);cx.stroke()}
 cx.save();cx.globalAlpha=al;cx.translate(p.x,p.y);cx.scale(k,k);
 cx.strokeStyle="#3f8f2c";cx.lineWidth=2.4;cx.lineCap="round";
 cx.beginPath();cx.moveTo(0,0);cx.quadraticCurveTo(1.5,-8,0,-15);cx.stroke();
 cx.fillStyle="#58b83e";cx.beginPath();cx.ellipse(-5.5,-15,6.5,3.2,-.6,0,6.2832);cx.fill();
 cx.fillStyle="#7fd35a";cx.beginPath();cx.ellipse(5.5,-15,6.5,3.2,.6,0,6.2832);cx.fill();
 cx.restore()}
function drawCoin(p,x,y,s,spd){
 if(p.star){cx.save();cx.translate(x,y);cx.rotate(p.a*5);cx.drawImage(STAR,-s/2,-s/2,s,s);cx.restore()}
 else{var w=s*(.28+.72*Math.abs(Math.cos(p.a*spd+p.ph)));cx.drawImage(COIN,x-w/2,y-s/2,w,s)}}

function loop(now){RAF=0;
 var dt=Math.min(.05,(now-last)/1000),i,k,p,u,e,v,x,y,s,al,tx,ty;last=now;
 cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);cx.setTransform(DPR,0,0,DPR,0,0);

 for(i=SP.length-1;i>=0;i--){p=SP[i];if(p.d>0){p.d-=dt;continue}
  if(!p.f){p.f=1;burst(p.x,p.y,"#7b5230",p.q,80,300,2.6);burst(p.x,p.y,"#a8794a",Math.ceil(p.q/2),60,260,2)}
  p.a+=dt;if(p.a>=p.life){SP.splice(i,1);continue}drawSprout(p)}

 for(i=D.length-1;i>=0;i--){p=D[i];p.a+=dt;if(p.a>=p.life){D.splice(i,1);continue}
  p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
  cx.globalAlpha=1-p.a/p.life;cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.2832);cx.fill()}

 for(i=P.length-1;i>=0;i--){p=P[i];if(p.d>0){p.d-=dt;continue}
  p.a+=dt;
  if(p.a<POP+p.hd){                                   // 1) pops up above the crop / tree / animal, then hovers
   u=Math.min(1,p.a/POP);e=1+2.70158*Math.pow(u-1,3)+1.70158*Math.pow(u-1,2);
   x=p.x0+(p.ex-p.x0)*e;y=p.y0+(p.ey-p.y0)*e-(p.a>POP?Math.sin((p.a-POP)*6)*2.5:0);
   s=p.sz*(.25+.75*Math.min(1,u*1.3));
   cx.globalAlpha=Math.min(1,p.a/.06)*.55;cx.drawImage(GLOW,x-s*1.2,y-s*1.2,s*2.4,s*2.4);
   cx.globalAlpha=Math.min(1,p.a/.06);drawCoin(p,x,y,s,6);continue}
  u=(p.a-POP-p.hd)/p.dur;                             // 2) flies to the counter, speeding up
  if(u>=1){arrive(p);P.splice(i,1);continue}
  e=.35*u+.65*u*u;v=1-e;
  x=v*v*p.ex+2*v*e*p.cx+e*e*p.x1;y=v*v*p.ey+2*v*e*p.cy+e*e*p.y1;
  p.tr.push(x,y);if(p.tr.length>12)p.tr.splice(0,2);
  s=p.sz*(1+.12*Math.sin(Math.PI*u))*(u>.85?1-(u-.85)/.15*.45:1);
  for(k=0;k<p.tr.length-2;k+=2){cx.globalAlpha=(k/p.tr.length)*.3;tx=p.tr[k];ty=p.tr[k+1];
   cx.drawImage(p.star?STAR:COIN,tx-s*.28,ty-s*.28,s*.56,s*.56)}
  cx.globalAlpha=1;drawCoin(p,x,y,s,11)}

 for(i=T.length-1;i>=0;i--){p=T[i];p.a+=dt;u=p.a/p.life;if(u>=1){T.splice(i,1);continue}
  al=u<.12?u/.12:u>.65?1-(u-.65)/.35:1;e=1-Math.pow(1-u,3);k=1+.35*Math.max(0,1-u/.18);
  cx.globalAlpha=al;cx.save();cx.translate(p.x,p.y-38*e);cx.scale(k,k);
  cx.font="800 16px system-ui,sans-serif";cx.textAlign="center";cx.textBaseline="middle";
  cx.lineJoin="round";cx.lineWidth=4;cx.strokeStyle="rgba(70,40,0,.85)";cx.strokeText(p.t,0,0);
  cx.fillStyle=p.c;cx.fillText(p.t,0,0);cx.restore()}
 cx.globalAlpha=1;
 if(P.length||D.length||T.length||SP.length)RAF=requestAnimationFrame(loop)}

/* ---------- hooks: your original code runs FIRST, we only look at the result ---------- */
var _tp=window.tapPlot;
window.tapPlot=function(i){
 var was=S.plots[i],q=S.pp[i],c0=S.coins,x0=S.xp,big=!!(was&&was.b),r=_tp.apply(this,arguments);
 try{if(q){
  if(!was&&S.plots[i])fxPlant([scr(q[0],q[1],-8)]);
  else if(was&&!S.plots[i]&&S.coins>c0){var s=scr(q[0],q[1],CROP_TOP);if(s)fxHarvest([{p:s,v:S.coins-c0,big:big}],S.xp-x0)}}}catch(e){}
 return r};

var _tt=window.tapTree;
window.tapTree=function(it){
 var t0=it.t,c0=S.coins,x0=S.xp,r=_tt.apply(this,arguments);
 try{if(it.t!==t0&&S.coins>c0){var s=scr(it.c,it.r,itemTop(it.k));if(s)fxHarvest([{p:s,v:S.coins-c0,big:false}],S.xp-x0)}}catch(e){}
 return r};

// Harvest-all and Plant-all: snapshot just before, compare just after
document.addEventListener("click",function(e){
 var b=e.target.closest&&e.target.closest("button");if(!b||typeof S==="undefined"||!S||!S.plots)return;
 try{
 if(b.id==="hAll"){
  var c0=S.coins,x0=S.xp,L=[];
  S.plots.forEach(function(p,i){if(p&&S.pp[i]&&isRipe(p))L.push({k:"p",i:i,q:S.pp[i],v:priceOf(p),big:!!p.b})});
  (S.dc||[]).forEach(function(it){var f=FTD[it.k];if(f&&!it.s&&nowT()-it.t>=f.ms)L.push({k:"d",it:it,t0:it.t,v:f.sell})});
  setTimeout(function(){try{
   if(S.coins<=c0)return;var out=[];
   L.forEach(function(o){if(out.length>=40)return;var done=o.k==="p"?!S.plots[o.i]:o.it.t!==o.t0;if(!done)return;
    var s=o.k==="p"?scr(o.q[0],o.q[1],CROP_TOP):scr(o.it.c,o.it.r,itemTop(o.it.k));
    if(s&&onScr(s))out.push({p:s,v:o.v,big:!!o.big})});
   fxHarvest(out,S.xp-x0)}catch(e){}},0)}
 else if(b.id==="plAll"){
  var before=S.plots.map(function(p){return !!p});
  setTimeout(function(){try{var L=[];
S.plots.forEach(function(p,i){if(L.length<150&&p&&!before[i]&&S.pp[i]){var s=scr(S.pp[i][0],S.pp[i][1],-8);if(s&&onScr(s))L.push(s)}});
   if(L.length)fxPlant(L)}catch(e){}},0)}
 }catch(err){}
},true);

/* ---------- helping a neighbor (visit mode) ---------- */
(function(){ // small coin counter in the visit header, because the main one is hidden while visiting
 var h=document.getElementById("vHead"),hint=document.getElementById("vHint");
 if(!h||document.getElementById("vCoins"))return;
 var sp=document.createElement("span");
 sp.id="vCoins";sp.className="pill";sp.style.marginLeft="auto";sp.textContent="\uD83E\uDE99 0";
 h.insertBefore(sp,hint);
})();
function syncV(){var e=document.getElementById("vCoins");if(e&&typeof S!=="undefined"&&S)e.textContent="\uD83E\uDE99 "+S.coins}
var _pv=window.paintVisit;
window.paintVisit=function(){var r=_pv.apply(this,arguments);try{syncV()}catch(e){}return r};
var _vt=window.visitTap;
window.visitTap=function(i){
 var c0=S.coins,q=V&&V.pp&&V.pp[i],r=_vt.apply(this,arguments);
 try{if(q&&S.coins>c0){var s=scr(q[0],q[1],CROP_TOP,"vCanvas");if(s)fxHelp(s)}}catch(e){}
 return r};

/* ---------- selling a decoration / house / animal ---------- */
document.addEventListener("click",function(e){
 var b=e.target.closest&&e.target.closest("button");if(!b||b.id!=="edSell")return;
 try{
  if(!SEL||SEL.t!=="d")return;
  var it=dcById(SEL.id);if(!it)return;
  var c0=S.coins,id=it.id,s=scr(it.c,it.r,itemMid(it.k));
  setTimeout(function(){try{
   if(S.coins>c0&&!dcById(id)&&s)fxHarvest([{p:s,v:S.coins-c0,big:false,sell:true}],0)
  }catch(e){}},0)
 }catch(err){}
},true);
window.FarmFX={harvest:fxHarvest,plant:fxPlant,scr:scr,top:CROP_TOP,itemTop:itemTop};
})();
