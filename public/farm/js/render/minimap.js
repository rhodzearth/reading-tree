// ===== MINI MAP IN VISIT MODE =====
var VMINI=true,VMT=0;try{VMINI=localStorage.getItem("vminiHide")!=="1"}catch(e){}
function vmmap(){setRot($("vCanvas"));var n=(V&&V.sz)||8,B=wbox(n,V&&V.ls),ox=(n+2)*56+30,oy=186,x0=ox+(B.c0-B.r1)*56,x1=ox+(B.c1-B.r0)*56,y0=oy+(B.c0+B.r0)*28,y1=oy+(B.c1+B.r1)*28,m=Math.min(118/(x1-x0),59/(y1-y0));
 return{n:n,ox:ox,oy:oy,x0:x0,y0:y0,m:m,fx:(124-(x1-x0)*m)/2,fy:(65-(y1-y0)*m)/2}}
var VMC=null;
function buildVMC(M,sc,w,h,key){var c=VMC&&VMC.c||document.createElement("canvas"),x,i,q,o,PL=V.plots||[],PP=V.pp||[];
 if(c.width!==Math.round(w*sc)||c.height!==Math.round(h*sc)){c.width=Math.round(w*sc);c.height=Math.round(h*sc)}
 x=c.getContext("2d");x.setTransform(sc,0,0,sc,0,0);x.clearRect(0,0,w,h);
 function P(c2,r){return[M.fx+(M.ox+(c2-r)*56-M.x0)*M.m,M.fy+(M.oy+(c2+r)*28-M.y0)*M.m]}
 function Q(c2,r){var t=rp(c2,r);return P(t[0],t[1])}
 function path(a){x.beginPath();a.forEach(function(p,j){j?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath()}
 parcels(M.n,V.ls).forEach(function(q2){path([P(q2.c0,q2.r0),P(q2.c1,q2.r0),P(q2.c1,q2.r1),P(q2.c0,q2.r1)]);
  x.fillStyle=NIGHT?"#2f6a2a":"#86d452";x.fill();x.strokeStyle="#efdba8";x.lineWidth=1.6;x.lineJoin="round";x.stroke()});
 for(i=0;i<V.np;i++){q=PP[i];if(!q)continue;o=Q(q[0]+.5,q[1]+.5);
  if(PL[i]&&isRipe(PL[i])){x.fillStyle="#ffd23a";x.fillRect(o[0]-1.8,o[1]-1.8,3.6,3.6)}
  else{x.fillStyle=PL[i]?"#1b5e20":"#a0693a";x.fillRect(o[0]-1.3,o[1]-1.3,2.6,2.6)}}
 (V.dc||[]).forEach(function(it){var f2,s2,col;if(it.s||isF(it.k))return;f2=FTD[it.k];
  col=it.k==="barn"?"#e53935":f2?(f2.animal?"#ff9800":"#00897b"):"#ab47bc";
  s2=Math.max(2.6,Math.min(8,footN(it.k)*1.7));o=Q(it.c+.5,it.r+.5);
  x.fillStyle=col;x.fillRect(o[0]-s2/2,o[1]-s2/2,s2,s2);x.strokeStyle="rgba(0,0,0,.5)";x.lineWidth=.6;x.strokeRect(o[0]-s2/2,o[1]-s2/2,s2,s2)});
 VMC={c:c,v:V,k:key,t:Date.now()}}
function drawVMini(){var cv=$("vmini"),f=$("vCanvas"),v=f._view,hb=$("vHint");
 if(hb)hb.style.opacity=VMINI?"1":".55";
 if(!V||(V.sz||8)<14||!v||!VMINI){cv.style.display="none";return}
 if(MOVING&&Date.now()-VMT<120)return;
 var dpr=Math.min(2,window.devicePixelRatio||1),sc=dpr*MSC,w=124,h=65,M=vmmap(),x,cw=parseFloat(f.style.width)||window.innerWidth,ch=parseFloat(f.style.height)||window.innerHeight,vx,vy,vw,vh,rx,ry,rx2,ry2,hh=$("vHead").offsetHeight,
  key=[V.sz,V.np,(V.dc||[]).length,(V.ls||[]).length,CR,NIGHT?1:0,sc].join("|");
 VMT=Date.now();cv.style.display="block";if(cv._ht!==hh){cv._ht=hh;cv.style.top=(hh+8)+"px"}
 if(cv.width!==Math.round(w*sc)){cv.width=Math.round(w*sc);cv.height=Math.round(h*sc)}
 if(!VMC||VMC.v!==V||VMC.k!==key||Date.now()-VMC.t>3000)buildVMC(M,sc,w,h,key);
 x=cv.getContext("2d");x.setTransform(sc,0,0,sc,0,0);x.clearRect(0,0,w,h);x.drawImage(VMC.c,0,0,w,h);
 vx=M.fx+((-v.L/v.k)-M.x0)*M.m;vy=M.fy+((-v.T/v.k)-M.y0)*M.m;vw=cw/v.k*M.m;vh=ch/v.k*M.m;
 rx=Math.max(1,vx);ry=Math.max(1,vy);rx2=Math.min(w-1,vx+vw);ry2=Math.min(h-1,vy+vh);
 if(rx2-rx<3)rx2=rx+3;if(ry2-ry<3)ry2=ry+3;
 x.save();x.beginPath();x.rect(0,0,w,h);x.rect(rx,ry,rx2-rx,ry2-ry);x.fillStyle="rgba(0,25,45,.42)";x.fill("evenodd");x.restore();
 x.fillStyle="rgba(0,229,255,.14)";x.fillRect(rx,ry,rx2-rx,ry2-ry);
 x.lineJoin="round";x.strokeStyle="rgba(0,0,0,.8)";x.lineWidth=3.6;x.strokeRect(rx,ry,rx2-rx,ry2-ry);
 x.strokeStyle="#00e5ff";x.lineWidth=2;x.strokeRect(rx,ry,rx2-rx,ry2-ry)}
function vminiGo(e){var cv=$("vmini"),r=cv.getBoundingClientRect(),M=vmmap(),hh=$("vHead").offsetHeight,vc=$("vCanvas"),
 wx=((e.clientX-r.left)/MSC-M.fx)/M.m+M.x0,wy=((e.clientY-r.top)/MSC-M.fy)/M.m+M.y0;
 vc._anc={sx:window.innerWidth/2,sy:hh+(window.innerHeight-hh)/2,cx:wx,cy:wy};fitMove(vc)}
(function(){var cv=$("vmini"),on=false;
 cv.addEventListener("pointerdown",function(e){on=true;try{cv.setPointerCapture(e.pointerId)}catch(x){}vminiGo(e);e.preventDefault()});
 cv.addEventListener("pointermove",function(e){if(on)vminiGo(e)});
 function off(){on=false}cv.addEventListener("pointerup",off);cv.addEventListener("pointercancel",off)})();
$("vCanvas").onclick=function(e){if(this._drag){this._drag=false;return}var i=hit(this,e);if(i>=0)visitTap(i)};
$("vCanvas").onmousemove=function(e){var i=hit(this,e);if(i!==HV.v){HV.v=i;drawAll()}};
$("vCanvas").onmouseleave=function(){HV.v=-1;drawAll()};
function zoomNote(cv){var v=cv._view,mn=cv._kmin,mx=3.2,e=$("zoomNote"),k,p;
 if(!v||!mn||!e)return;
 k=Math.max(mn,Math.min(mx,v.k));
 p=Math.max(1,Math.min(100,Math.round(1+99*Math.log(mx/k)/Math.log(mx/mn))));
 e.textContent="\uD83D\uDD0D "+p+"%"+(p<=1?" (max in)":p>=100?" (max out)":"");
 e.style.display="block";clearTimeout(zoomNote.t);
 zoomNote.t=setTimeout(function(){e.style.display="none"},1000)}
function addPan(cv){var P={},st=null,pz=null,PR=0;
 function cnt(){return Object.keys(P).length}
 function bx(){return cv.parentNode.getBoundingClientRect()}
 function zoomAt(f,sx,sy,fx,fy){var v=cv._view||{L:0,T:0,k:1},kk=v.k,l=v.L,tp=v.T;
  cv._anc={sx:sx,sy:sy,cx:(fx-l)/kk,cy:(fy-tp)/kk};cv._z=(cv._z||1)*f;cv._kabs=Math.max(.05,Math.min(3.2,kk*f));fitMove(cv);zoomNote(cv)}
 cv.addEventListener("pointerdown",function(e){if(e.pointerType==="mouse")P={};P[e.pointerId]=[e.clientX,e.clientY];
  if(cnt()===1){var p=cv._pan||(cv._pan=[0,0]);st={x:e.clientX,y:e.clientY,px:p[0],py:p[1],m:false,id:e.pointerId};pz=null;cv._drag=false}
  else if(cnt()===2){var ids=Object.keys(P),a=P[ids[0]],b=P[ids[1]];pz={ids:ids,d:Math.hypot(a[0]-b[0],a[1]-b[1])||1,m:[(a[0]+b[0])/2,(a[1]+b[1])/2]};st=null;cv._drag=true;
   ids.forEach(function(id){try{cv.setPointerCapture(Number(id))}catch(x){}})}});
 cv.addEventListener("pointermove",function(e){if(!P[e.pointerId])return;P[e.pointerId]=[e.clientX,e.clientY];
  if(pz){var a=P[pz.ids[0]],b=P[pz.ids[1]];if(!a||!b)return;var r=bx(),d=Math.hypot(a[0]-b[0],a[1]-b[1])||1,m=[(a[0]+b[0])/2,(a[1]+b[1])/2],an=Math.atan2(b[1]-a[1],b[0]-a[0]),da;
   if(pz.an===undefined)pz.an=an;da=an-pz.an;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;pz.an=an;pz.acc=(pz.acc||0)+da;
   zoomAt(d/pz.d,m[0]-r.left,m[1]-r.top,pz.m[0]-r.left,pz.m[1]-r.top);pz.d=d;pz.m=m;return}
  if(!st||e.pointerId!==st.id)return;var dx=e.clientX-st.x,dy=e.clientY-st.y;
  if(!st.m){if(Math.abs(dx)+Math.abs(dy)<8)return;st.m=true;cv._drag=true;try{cv.setPointerCapture(e.pointerId)}catch(x){}}
  cv._pan=[st.px+dx,st.py+dy];if(!PR)PR=requestAnimationFrame(function(){PR=0;fitMove(cv)})});
 function end(e){delete P[e.pointerId];if(cnt()<2)pz=null;
  if(cnt()===1){var id=Object.keys(P)[0],p=cv._pan||[0,0];st={x:P[id][0],y:P[id][1],px:p[0],py:p[1],m:true,id:Number(id)}}else if(!cnt())st=null}
 cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
 cv.addEventListener("wheel",function(e){e.preventDefault();var r=bx(),sx=e.clientX-r.left,sy=e.clientY-r.top,dy=e.deltaMode===1?e.deltaY*16:e.deltaY;zoomAt(Math.exp(-dy*.0015),sx,sy,sx,sy)},{passive:false})}
addPan($("field"));addPan($("vCanvas"));
document.addEventListener("gesturestart",function(e){e.preventDefault()});
