(function(){
var RM=false;try{RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var cv=document.createElement("canvas"),cx=cv.getContext("2d"),DPR=1,W=0,H=0,F=[],B=[],SPK=[],RAF=0,last=0,HOPT=-9999,IM={},LP=[innerWidth/2,innerHeight/2],POP=.3,Q=null,
 GL=document.createElement("canvas");
cv.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;z-index:120;pointer-events:none";
document.body.appendChild(cv);
GL.width=GL.height=64;(function(){var g=GL.getContext("2d"),r=g.createRadialGradient(32,32,2,32,32,32);r.addColorStop(0,"rgba(255,240,170,.85)");r.addColorStop(1,"rgba(255,220,100,0)");g.fillStyle=r;g.fillRect(0,0,64,64)})();
function size(){DPR=Math.min(1.5,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR)}
size();window.addEventListener("resize",size);
document.addEventListener("pointerdown",function(e){LP=[e.clientX,e.clientY]},true); // dialogs: items fly from where you tapped

function ok(){return !RM&&!document.hidden&&typeof S!=="undefined"&&S&&window.FarmFX}
function img(key){var o=IM[key];if(!o){o=IM[key]=new Image();try{o.src=invIconURL(key)}catch(e){}}return o}
function icon(key,x,y,s,rot){var o=img(key);if(!o.complete||!o.naturalWidth)return;cx.save();cx.translate(x,y);cx.rotate(rot||0);cx.drawImage(o,-s/2,-s/2,s,s);cx.restore()}
function rr(x,y,w,h,r){cx.beginPath();if(cx.roundRect)cx.roundRect(x,y,w,h,r);else cx.rect(x,y,w,h)}
function sc(c,r,dy){return FarmFX.scr(c,r,dy)}
function cen(it,dy){return sc(it.c+(footW(it.k)-1)/2,it.r+(footH(it.k)-1)/2,dy)}  // centre of a building / tree / animal
function barns(){return(S.dc||[]).filter(function(x){return x.k==="barn"&&!x.s})}
function pick(src){var best=null,bd=1e18;barns().forEach(function(b){var p=cen(b,-44),d;if(!p)return;d=Math.hypot(p[0]-src[0],p[1]-src[1]);if(d<bd){bd=d;best=b.id}});return best}
function tgt(id){var b=dcById(id),p;if(!b)return null;p=cen(b,-44);if(!p)return null;
 return[Math.max(30,Math.min(W-30,p[0])),Math.max(90,Math.min(H-90,p[1]))]}   // barn off-screen -> items go to the screen edge nearest it
function hopOff(){var u=(performance.now()-HOPT)/460;return u>=1?0:-9*Math.sin(u*Math.PI)*(1-u*.35)}

// list = [{key:"c:tomato", pos:[screenX,screenY]}]
function fly(list){if(!ok()||!list.length)return;
 var n=Math.min(list.length,90),i,o,bid;
 for(i=0;i<n;i++){o=list[i];bid=pick(o.pos);if(!bid)continue;img(o.key);
  F.push({key:o.key,x0:o.pos[0],y0:o.pos[1],ex:o.pos[0]+(Math.random()-.5)*40,ey:o.pos[1]-34-Math.random()*22,bid:bid,
   d:Math.min(1.1,i*.045)+Math.random()*.05,a:0,hold:.28+Math.random()*.1,dur:.62+Math.random()*.15,
   rot:(Math.random()-.5)*.6,spin:(Math.random()-.5)*6,bend:(Math.random()-.5)*120,arc:Math.random()*40,tr:[]})}
 kick()}
function kick(){if(!RAF){last=performance.now();RAF=requestAnimationFrame(loop)}}
function arrive(p){var i,a,b;HOPT=performance.now();
 for(i=0;i<9;i++){a=Math.random()*6.283;SPK.push({x:p.tx,y:p.ty,vx:Math.cos(a)*(60+Math.random()*80),vy:Math.sin(a)*(60+Math.random()*80)-30,a:0,life:.45+Math.random()*.25,r:1.8+Math.random()*1.6})}
 SPK.push({ring:1,x:p.tx,y:p.ty,r:6,a:0,life:.5});
 b=null;for(i=0;i<B.length;i++)if(B[i].key===p.key&&B[i].bid===p.bid&&B[i].a<1){b=B[i];break}
 if(b){b.n++;b.a=Math.min(b.a,.3)}else B.push({key:p.key,bid:p.bid,n:1,a:0});
 try{FarmAudio.play("tick")}catch(e){}}

function loop(now){RAF=0;
 var dt=Math.min(.05,(now-last)/1000),i,j,p,u,e,v,x,y,s,T,cxp,cyp,cn={},ix={},w=66,h=30,al,bx,by,idx;last=now;
 cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);cx.setTransform(DPR,0,0,DPR,0,0);
 for(i=F.length-1;i>=0;i--){p=F[i];if(p.d>0){p.d-=dt;continue}p.a+=dt;
  T=tgt(p.bid);if(!T){F.splice(i,1);continue}
  if(p.a<POP+p.hold){ // 1) pops up from the crop / tree / animal and hovers
   u=Math.min(1,p.a/POP);e=1+2.70158*Math.pow(u-1,3)+1.70158*Math.pow(u-1,2);
   x=p.x0+(p.ex-p.x0)*e;y=p.y0+(p.ey-p.y0)*e-(p.a>POP?Math.sin((p.a-POP)*10)*2.5:0);s=40*(.3+.7*Math.min(1,u*1.3));
   cx.globalAlpha=.8*Math.min(1,p.a/.08);cx.drawImage(GL,x-s*1.1,y-s*1.1,s*2.2,s*2.2);
   cx.globalAlpha=Math.min(1,p.a/.06);icon(p.key,x,y,s,p.rot*(1-u));cx.globalAlpha=1;continue}
  u=(p.a-POP-p.hold)/p.dur; // 2) flies to the barn in an arc, speeding up
  if(u>=1){p.tx=T[0];p.ty=T[1];arrive(p);F.splice(i,1);continue}
  e=.2*u+.8*u*u;v=1-e;cxp=(p.ex+T[0])/2+p.bend;cyp=Math.min(p.ey,T[1])-70-p.arc;
  x=v*v*p.ex+2*v*e*cxp+e*e*T[0];y=v*v*p.ey+2*v*e*cyp+e*e*T[1];
  p.tr.push(x,y);if(p.tr.length>14)p.tr.splice(0,2);
  s=40*(1-.5*e);
  for(j=0;j<p.tr.length;j+=2){cx.globalAlpha=(j/p.tr.length)*.35;cx.drawImage(GL,p.tr[j]-9,p.tr[j+1]-9,18,18)}
  cx.globalAlpha=.7;cx.drawImage(GL,x-s,y-s,s*2,s*2);cx.globalAlpha=1;icon(p.key,x,y,s,p.rot+e*p.spin)}
 cx.globalAlpha=1;
 for(i=SPK.length-1;i>=0;i--){p=SPK[i];p.a+=dt;if(p.a>=p.life){SPK.splice(i,1);continue}u=p.a/p.life;
  if(p.ring){cx.globalAlpha=1-u;cx.strokeStyle="#fff1a8";cx.lineWidth=3*(1-u)+1;cx.beginPath();cx.arc(p.x,p.y,p.r+u*34,0,7);cx.stroke()}
  else{p.vy+=220*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;cx.globalAlpha=1-u;cx.fillStyle="#ffe27a";cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()}}
 cx.globalAlpha=1;
 for(i=B.length-1;i>=0;i--){B[i].a+=dt;if(B[i].a>=1.5)B.splice(i,1)}
 B.forEach(function(b){cn[b.bid]=(cn[b.bid]||0)+1});
 B.forEach(function(b){var T2=tgt(b.bid);if(!T2)return;
  idx=ix[b.bid]=(ix[b.bid]||0)+1;idx--;
  al=b.a<.15?b.a/.15:b.a>1.1?1-(b.a-1.1)/.4:1;
  bx=T2[0]+(idx-(cn[b.bid]-1)/2)*(w+6)-w/2;by=T2[1]-62-Math.min(1,b.a)*22-h/2;
  cx.globalAlpha=Math.max(0,al);cx.fillStyle="rgba(24,36,16,.82)";rr(bx,by,w,h,15);cx.fill();
  cx.strokeStyle="rgba(255,255,255,.55)";cx.lineWidth=1.5;cx.stroke();
  icon(b.key,bx+17,by+h/2,26,0);cx.font="800 15px system-ui,sans-serif";cx.fillStyle="#fff";cx.textAlign="left";cx.textBaseline="middle";cx.fillText("+"+b.n,bx+34,by+h/2+1);
  cx.globalAlpha=1});
 if(performance.now()-HOPT<480&&window.drawAll)drawAll();   // redraw the farm so the barn can hop
 if(F.length||B.length||SPK.length||performance.now()-HOPT<480)RAF=requestAnimationFrame(loop)}

/* ---------- hooks ---------- */
var _ia=window.invAdd;
window.invAdd=function(key,n){var r=_ia.apply(this,arguments),i;
 if(Q){for(i=0;i<(n||1);i++)Q.push(key)}
 else if(ok())fly([{key:key,pos:[LP[0],LP[1]-14]}]);   // shed dialogs: from where you tapped
 return r};

var _tp=window.tapPlot;
window.tapPlot=function(i){var q=S.pp[i],got=Q=[],r,s;
 try{r=_tp.apply(this,arguments)}finally{Q=null}
 if(q&&got.length){s=sc(q[0],q[1],FarmFX.top);if(s)fly(got.map(function(k){return{key:k,pos:s}}))}
 return r};

var _tt=window.tapTree;
window.tapTree=function(it){var got,r,s;
 if(!it||it.s)return _tt.apply(this,arguments);          // animals living in a shed: handled by the fallback above
 got=Q=[];try{r=_tt.apply(this,arguments)}finally{Q=null}
 if(got.length){s=cen(it,FarmFX.itemTop(it.k));if(s)fly(got.map(function(k){return{key:k,pos:s}}))}
 return r};

function shedOf(it){return shedList().filter(function(sd){return sd.cw&&sd.cw.indexOf(it.id)>=0})[0]}
var h0=$("hAll").onclick;
$("hAll").onclick=function(){var L=[],now=nowT();
 try{
  S.plots.forEach(function(p,i){var q=S.pp[i],s;if(p&&q&&isRipe(p)){s=sc(q[0],q[1],FarmFX.top);if(s)L.push({key:(p.b?"cb:":"c:")+p.c,pos:s})}});
  (S.dc||[]).forEach(function(it){var f=FTD[it.k],s,sh;if(!f)return;
   if(!it.s&&now-it.t>=f.ms){s=cen(it,FarmFX.itemTop(it.k));if(s)L.push({key:"i:"+it.k,pos:s})}
   else if(it.s&&inShed(it)&&now-(it.t||0)>=f.ms){sh=shedOf(it);if(sh){s=cen(sh,-30);if(s)L.push({key:"i:"+it.k,pos:s})}}});
  shedList().forEach(function(sd){var c=sd.cc,s;if(!c)return;
   (sd.cf||[]).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){s=cen(sd,-30);if(s)L.push({key:"y:"+sd.k,pos:s})}})});
 }catch(e){}
 Q=[];try{h0.apply(this,arguments)}finally{Q=null}
 if(L.length)fly(L)};

var g0=$("edHarvG").onclick;
$("edHarvG").onclick=function(){var L=[],now=nowT();
 try{if(SEL)grpOf(SEL).forEach(function(s){var p,q,it,f,pt;
  if(s.t==="p"){p=S.plots[s.i];q=S.pp[s.i];if(p&&q&&isRipe(p)){pt=sc(q[0],q[1],FarmFX.top);if(pt)L.push({key:(p.b?"cb:":"c:")+p.c,pos:pt})}}
  else{it=dcById(s.id);f=it&&FTD[it.k];if(f&&!it.s&&now-it.t>=f.ms){pt=cen(it,FarmFX.itemTop(it.k));if(pt)L.push({key:"i:"+it.k,pos:pt})}}})}catch(e){}
 Q=[];try{g0.apply(this,arguments)}finally{Q=null}
 if(L.length)fly(L)};

window.FarmFX2={hop:hopOff,fly:fly};
})();
