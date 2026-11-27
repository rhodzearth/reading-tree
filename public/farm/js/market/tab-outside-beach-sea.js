// ===================== OUTSIDE: beach + sea decorations =====================
// out:"b" = beach (sand outside the fences), out:"w" = sea. Change cost/lvl freely (the server must use the same values).
var OUTDEF=[
 {id:"o_umbrella",name:"Beach Umbrella",icon:"\u26F1\uFE0F",cost:150,lvl:3,out:"b"},
 {id:"o_lounger",name:"Sun Lounger",icon:"\uD83C\uDFD6\uFE0F",cost:220,lvl:4,out:"b"},
 {id:"o_shells",name:"Shells & Starfish",icon:"\uD83D\uDC1A",cost:120,lvl:5,out:"b"},
 {id:"o_driftwood",name:"Driftwood",icon:"\uD83E\uDEB5",cost:180,lvl:6,out:"b"},
 {id:"o_surfrack",name:"Surfboard Rack",icon:"\uD83C\uDFC4",cost:350,lvl:8,out:"b"},
 {id:"o_volley",name:"Volleyball Net",icon:"\uD83C\uDFD0",cost:420,lvl:10,out:"b"},
 {id:"o_palm",name:"Beach Palm",icon:"\uD83C\uDF34",cost:500,lvl:12,out:"b"},
 {id:"o_sandcastle",name:"Sandcastle",icon:"\uD83C\uDFF0",cost:600,lvl:14,out:"b"},
 {id:"o_tiki",name:"Tiki Bar",icon:"\uD83C\uDF79",cost:900,lvl:18,out:"b"},
 {id:"o_lifeguard",name:"Lifeguard Tower",icon:"\uD83D\uDEA9",cost:1200,lvl:22,out:"b"},
 {id:"o_buoy",name:"Floating Buoy",icon:"\uD83D\uDD34",cost:150,lvl:3,out:"w"},
 {id:"o_raft",name:"Log Raft",icon:"\uD83D\uDEDF",cost:250,lvl:5,out:"w"},
 {id:"o_kayak",name:"Kayak",icon:"\uD83D\uDEF6",cost:400,lvl:7,out:"w"},
 {id:"o_rowboat",name:"Rowboat",icon:"\uD83D\uDEA3",cost:550,lvl:9,out:"w"},
 {id:"o_dock",name:"Wooden Pier",icon:"\uD83C\uDF09",cost:700,lvl:11,out:"w"},
 {id:"o_bangka",name:"Bangka Boat",icon:"\u26F4\uFE0F",cost:850,lvl:13,out:"w"},
 {id:"o_fishing",name:"Fishing Boat",icon:"\uD83C\uDFA3",cost:1100,lvl:16,out:"w"},
 {id:"o_jetski",name:"Jet Ski",icon:"\uD83C\uDF0A",cost:1400,lvl:19,out:"w"},
 {id:"o_sailboat",name:"Sailboat",icon:"\u26F5",cost:1800,lvl:22,out:"w"},
 {id:"o_speedboat",name:"Speedboat",icon:"\uD83D\uDEA4",cost:2400,lvl:26,out:"w"}
],OUTI={};
OUTDEF.forEach(function(d){OUTI[d.id]=d.out});

// ---- where can they stand? beach = 0-7 tiles outside the land, sea = 9.2-15 tiles (the foam strip stays free) ----
function outDist(c,r){var P=parS(),x=c+.5,y=r+.5,d=1e9,i,q,dx,dy;
 for(i=0;i<P.length;i++){q=P[i];dx=Math.max(q.c0-x,0,x-q.c1);dy=Math.max(q.r0-y,0,y-q.r1);d=Math.min(d,Math.sqrt(dx*dx+dy*dy))}
 return d}
function zoneAt(c,r){var d;if(inLandP(parS(),c,r))return null;d=outDist(c,r);return d<=7?"b":(d>=8.2&&d<=30?"w":null)}
function curK(ig){var o;if(PEND)return PEND.k;if(PLACING&&PLACING.t==="d"){o=dcById(PLACING.id);return o?o.k:null}if(ig&&ig.t==="d"){o=dcById(ig.id);return o?o.k:null}return null}
function isFlagK(k){return /^fl_/.test(k||"")}
function OUTSEL(){var k=curK(SEL);return !!OUTI[k]||isFlagK(k)}
var _tileFree=tileFree;
tileFree=function(c,r,ig,k){var z;if(k===undefined)k=curK(ig);z=OUTI[k];
 if(!z)return _tileFree(c,r,ig);
 if(zoneAt(c,r)!==z)return false;
 return !(S.dc||[]).some(function(x){return !x.s&&OUTI[x.k]&&x.c===c&&x.r===r&&!(ig&&ig.t==="d"&&ig.id===x.id)})};
var _tileFree2=tileFree;
tileFree=function(c,r,ig,k){if(k===undefined)k=curK(ig);
 if(isFlagK(k)&&!inLandP(parS(),c,r)){ // a flag on the beach: sand only, never on water, one outside thing per tile
  if(outLocked()||zoneAt(c,r)!=="b"||flAt(c,r)==="wt")return false;
  return !(S.dc||[]).some(function(x){return !x.s&&(OUTI[x.k]||isFlagK(x.k))&&x.c===c&&x.r===r&&!(ig&&ig.t==="d"&&ig.id===x.id)})}
 return _tileFree2(c,r,ig,k)};
// first free spot, as close as possible to the middle of the screen
function outFreeTile(i){var f=$("field"),g=f._g,v=f._view,B=wbox0(S.sz||8,S.ls),cc,rr,px,py,dx,dy,best=null,bd=1e18,c,r,d,M=34;
 if(g&&v&&!g.cr){px=(window.innerWidth/2-v.L)/v.k;py=(window.innerHeight/2-v.T)/v.k;dx=(px-g.ox)/(g.TW/2);dy=(py-g.oy)/(g.TH/2);cc=(dx+dy)/2;rr=(dy-dx)/2}
 else{cc=(B.c0+B.c1)/2;rr=(B.r0+B.r1)/2}
 for(c=B.c0-M;c<B.c1+M;c++)for(r=B.r0-M;r<B.r1+M;r++){
  if(zoneAt(c,r)!==i.out||!tileFree(c,r,null,i.id))continue;
  d=(c+.5-cc)*(c+.5-cc)+(r+.5-rr)*(r+.5-rr);if(d<bd){bd=d;best=[c,r]}}
 return best}

// ---- market: items are added on the client, tab, hint ----
var _prepItems=prepItems;
prepItems=function(){if(S&&S.items)OUTDEF.forEach(function(d){var e=S.items.filter(function(x){return x.id===d.id})[0];if(e)e.out=d.out;else S.items.push(d)});return _prepItems.apply(this,arguments)};
var OUT_MIN_SZ=14; // main land size needed: 8 -> 10 -> 12 -> 14 = 3 expansions
function outLocked(){return (S.sz||8)<OUT_MIN_SZ}
function outLockMsg(){return "\uD83D\uDD12 Outside unlocks when your main land is "+OUT_MIN_SZ+" x "+OUT_MIN_SZ+" (yours is "+(S.sz||8)+" x "+(S.sz||8)+"). Expand it 3 times."}
var _renderMkt=renderMkt;
renderMkt=function(){if(MK==="out"&&outLocked())MK="tree";var r=_renderMkt.apply(this,arguments);$("mtO").className="btn"+(MK==="out"?"":" alt");$("mtV").className="btn"+(MK==="veh"?"":" alt");$("mtS").className="btn"+(MK==="shed"?"":" alt");$("mtO").innerHTML=outLocked()?"&#128274; Outside":"&#127958;&#65039; Outside";return r};
$("mtO").onclick=function(){if(outLocked()){toast(outLockMsg());return}MK="out";renderMkt()};
var _buyItem=buyItem;
buyItem=function(i){if(i&&i.out&&outLocked()){toast(outLockMsg());return}var r=_buyItem.apply(this,arguments);
 if(i&&i.out&&PEND)toast(i.out==="w"?"\u26F5 Tap a spot on the sea (beyond the beach), then \u2714":"\uD83C\uDFD6\uFE0F Tap a sand tile outside your fences, then \u2714");return r};

// ---- hit boxes ----
HB.o_umbrella=[-34,-90,34,8];HB.o_lounger=[-40,-36,18,8];HB.o_shells=[-30,-24,30,10];HB.o_driftwood=[-34,-34,34,8];
HB.o_surfrack=[-34,-76,34,8];HB.o_volley=[-36,-62,38,16];HB.o_palm=[-46,-132,50,8];HB.o_sandcastle=[-34,-84,34,10];
HB.o_tiki=[-46,-92,46,10];HB.o_lifeguard=[-24,-94,24,8];
HB.o_buoy=[-14,-60,14,8];HB.o_raft=[-34,-34,34,14];HB.o_kayak=[-42,-38,44,8];HB.o_rowboat=[-32,-26,32,8];HB.o_dock=[-46,-40,46,14];
HB.o_bangka=[-40,-52,40,12];HB.o_fishing=[-36,-58,44,8];HB.o_jetski=[-30,-34,36,8];HB.o_sailboat=[-34,-70,36,8];HB.o_speedboat=[-36,-30,36,8];
var OSC={o_buoy:.7,o_raft:1,o_kayak:.95,o_rowboat:1.3,o_dock:2.5,o_bangka:2.3,o_fishing:2.9,o_jetski:1.2,o_sailboat:3,o_speedboat:2.3}; // sea item sizes (1 = the original drawing)
OUTDEF.forEach(function(d){if(d.out==="w"){var b=HB[d.id],s=OSC[d.id]||1;HB[d.id]=[b[0]*s,b[1]*s,b[2]*s,Math.max(b[3],10)*s]}});

// ---- drawing helpers ----
function oWake(x,y,w){X.fillStyle="rgba(10,70,110,.22)";X.beginPath();X.ellipse(x+2,y+1,w*.9,w*.3,0,0,7);X.fill();
 X.strokeStyle="rgba(255,255,255,.6)";X.lineWidth=1.4;X.beginPath();X.ellipse(x,y,w,w*.34,0,0,7);X.stroke();
 X.strokeStyle="rgba(255,255,255,.3)";X.lineWidth=1;X.beginPath();X.ellipse(x,y,w*1.28,w*.44,0,0,7);X.stroke()}
function oHull(x,y,w,h,c1,c2,tr){X.fillStyle=lg(0,y-h,0,y+2,[[0,c1],[1,c2]]);X.beginPath();X.moveTo(x-w,y-h);X.lineTo(x+w+5,y-h-3);
 X.quadraticCurveTo(x+w*.8,y,x+w*.15,y+2);X.lineTo(x-w*.7,y+2);X.quadraticCurveTo(x-w*.98,y-h*.3,x-w,y-h);X.closePath();X.fill();
 X.strokeStyle=tr;X.lineWidth=1.8;X.beginPath();X.moveTo(x-w,y-h);X.lineTo(x+w+5,y-h-3);X.stroke();
 X.fillStyle="rgba(255,255,255,.18)";X.fillRect(x-w*.9,y-h+3,w*1.9,1.4)}
function oTower(x,y,w,h,c1,c2){var i;X.fillStyle=lg(x-w,0,x+w,0,[[0,c2],[.45,c1],[1,c2]]);X.fillRect(x-w,y-h,w*2,h);
 X.beginPath();X.ellipse(x,y,w,w*.38,0,0,Math.PI);X.fill();X.fillStyle=c1;X.beginPath();X.ellipse(x,y-h,w,w*.38,0,0,7);X.fill();
 for(i=-1;i<=1;i++){X.fillStyle=c2;X.fillRect(x+i*w*.62-w*.2,y-h-w*.45,w*.4,w*.45)}}

// ---- SEA ----
DEC.o_buoy=function(p){var x=p[0],y=p[1],g;oWake(x,y,24);
 X.fillStyle=lg(x-9,0,x+9,0,[[0,"#a8221c"],[.4,"#f05a4a"],[1,"#8a1a14"]]);X.beginPath();X.moveTo(x-9,y-4);X.lineTo(x-5,y-30);X.lineTo(x+5,y-30);X.lineTo(x+9,y-4);X.quadraticCurveTo(x,y+3,x-9,y-4);X.fill();
 poly([[x-7.6,y-12],[x+7.6,y-12],[x+6.4,y-19],[x-6.4,y-19]],"#f6f2e6");
 X.fillStyle="#3a3e44";X.fillRect(x-1.4,y-44,2.8,14);
 g=X.createRadialGradient(x,y-46,1,x,y-46,14);g.addColorStop(0,"rgba(255,226,90,.7)");g.addColorStop(1,"rgba(255,226,90,0)");X.fillStyle=g;X.beginPath();X.arc(x,y-46,14,0,7);X.fill();
 dot(x,y-46,3.4,"#ffe25a")};
DEC.o_raft=function(p){var x=p[0],y=p[1],k,a,b;oWake(x,y,38);
 poly([[x-30,y-4],[x,y+10],[x,y+15],[x-30,y+1]],"#7a5430");poly([[x,y+10],[x+30,y-4],[x+30,y+1],[x,y+15]],"#8f6535");
 poly([[x-30,y-4],[x,y-18],[x+30,y-4],[x,y+10]],"#b88655","#5a3a1c",1.2);
 X.strokeStyle="rgba(60,35,12,.45)";X.lineWidth=1;X.beginPath();
 for(k=1;k<5;k++){a=[x-30+k*6,y-4+k*2.8];X.moveTo(a[0],a[1]);X.lineTo(a[0]+30,a[1]-14)}X.stroke();
 for(k=0;k<5;k++){dot(x-27+k*6,y+(k*2.8)-1,2.2,"#e3bf86")}
 ibx(x+6,y-6,10,10,9,"#a47642","#c0905a","#d8ae74");
 X.strokeStyle="#6b4a24";X.lineWidth=2;X.beginPath();X.moveTo(x-10,y-4);X.lineTo(x-10,y-34);X.stroke();
 poly([[x-10,y-34],[x+4,y-30],[x-10,y-26]],"#d9322a")};
DEC.o_kayak=function(p){var x=p[0],y=p[1];oWake(x,y,38);
 X.fillStyle=lg(0,y-12,0,y+2,[[0,"#ff8a3a"],[1,"#c9501a"]]);X.beginPath();X.moveTo(x-40,y-5);X.quadraticCurveTo(x,y-15,x+42,y-7);X.quadraticCurveTo(x,y+4,x-40,y-5);X.fill();
 X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1.2;X.beginPath();X.moveTo(x-34,y-6);X.quadraticCurveTo(x,y-13,x+36,y-8);X.stroke();
 X.fillStyle="#2a2e34";X.beginPath();X.ellipse(x,y-8,9,3.2,-.08,0,7);X.fill();
 X.lineCap="round";X.strokeStyle="#4a3418";X.lineWidth=2;X.beginPath();X.moveTo(x-18,y-30);X.lineTo(x+16,y+4);X.stroke();X.lineCap="butt";
 leaf(x-20,y-32,7,2.4,.78,"#2a5a9a");leaf(x+18,y+6,7,2.4,.78,"#2a5a9a")};
DEC.o_rowboat=function(p){var x=p[0],y=p[1],k;oWake(x,y,38);
 oHull(x,y-1,26,11,"#cf9158","#7a4a24","#ecd09a");
 X.strokeStyle="rgba(60,30,10,.35)";X.lineWidth=1;for(k=-3;k<=3;k++){X.beginPath();X.moveTo(x+k*7,y-11);X.lineTo(x+k*6,y);X.stroke()}
 poly([[x-4,y-12],[x+5,y-12],[x+5,y-9],[x-4,y-9]],"#8a5a2a");
 X.lineCap="round";X.strokeStyle="#6b4a24";X.lineWidth=2;X.beginPath();X.moveTo(x-8,y-13);X.lineTo(x-24,y+3);X.moveTo(x+9,y-13);X.lineTo(x+25,y+3);X.stroke();X.lineCap="butt";
 leaf(x-26,y+4,5,1.8,.7,"#b98a52");leaf(x+27,y+4,5,1.8,-.7,"#b98a52")};
DEC.o_dock=function(p){var x=p[0],y=p[1],lu=46,lv=16,f=BFp(x,y-8,lu,lv),k,a,b;oWake(x,y,44);
 [f,[f[0]-lv,f[1]-lv/2],[f[0]+lu,f[1]-lu/2],[f[0]+lu-lv,f[1]-lu/2-lv/2]].forEach(function(q){X.fillStyle="#4a3018";X.fillRect(q[0]-2,q[1]-3,4,16)});
 ibx(x,y-8,lu,lv,4,"#7a5430","#946a3a","#b88a52");
 X.strokeStyle="rgba(50,28,8,.45)";X.lineWidth=1;X.beginPath();
 for(k=1;k<9;k++){a=TPt(f,lu,lv,4,k/9,0);b=TPt(f,lu,lv,4,k/9,1);X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1])}X.stroke();
 a=TPt(f,lu,lv,4,.98,.5);X.fillStyle="#4a3018";X.fillRect(a[0]-1.5,a[1]-16,3,16);
 dot(a[0],a[1]-18,3,"#ffe9a0");
 X.strokeStyle="#c8b07a";X.lineWidth=1;b=TPt(f,lu,lv,4,.02,.5);X.beginPath();X.moveTo(b[0],b[1]-2);X.quadraticCurveTo((a[0]+b[0])/2,(a[1]+b[1])/2+6,a[0],a[1]-12);X.stroke();
 X.fillStyle="#4a3018";X.fillRect(b[0]-1.5,b[1]-14,3,14)};
DEC.o_bangka=function(p){var x=p[0],y=p[1],k;oWake(x,y,48);
 X.lineCap="round";X.strokeStyle="#9a7a3a";X.lineWidth=2.4;X.beginPath();X.moveTo(x-12,y-6);X.lineTo(x-16,y+8);X.moveTo(x+12,y-6);X.lineTo(x+16,y+8);X.stroke();
 X.fillStyle=lg(0,y+4,0,y+11,[[0,"#d8c070"],[1,"#8a6a30"]]);X.beginPath();X.ellipse(x,y+8,38,3.4,0,0,7);X.fill();
 X.strokeStyle="#7a5a28";X.lineWidth=.8;for(k=-3;k<=3;k++){X.beginPath();X.moveTo(x+k*11,y+5);X.lineTo(x+k*11,y+11);X.stroke()}X.lineCap="butt";
 oHull(x,y-1,36,10,"#2f8ac8","#1c5a8a","#f2c230");
 X.fillStyle="#f2c230";X.fillRect(x-36,y-7,74,2.4);X.fillStyle="#d9322a";X.fillRect(x-36,y-4,74,1.6);
 X.fillStyle="#6b4a24";X.fillRect(x-1,y-48,2.4,38);
 poly([[x+2,y-47],[x+2,y-14],[x+26,y-14]],"#f4ecd0","#b8a878",1);poly([[x+2,y-47],[x+10,y-44],[x+2,y-41]],"#d9322a")};
DEC.o_fishing=function(p){var x=p[0],y=p[1];oWake(x,y,44);
 oHull(x,y-1,32,13,"#d9483e","#7a2420","#f2eee2");X.fillStyle="#f2eee2";X.fillRect(x-32,y-9,66,2);
 poly([[x-14,y-14],[x+6,y-14],[x+6,y-36],[x-14,y-36]],"#f4efe2","#a8a290",1);
 poly([[x-11,y-31],[x+3,y-31],[x+3,y-23],[x-11,y-23]],"#4a7a9a","#fff",1);
 poly([[x-17,y-36],[x+9,y-36],[x+7,y-41],[x-15,y-41]],"#2a5a9a");
 X.strokeStyle="#5a3a1c";X.lineWidth=2;X.beginPath();X.moveTo(x+18,y-14);X.lineTo(x+18,y-50);X.stroke();
 X.lineWidth=1.4;X.beginPath();X.moveTo(x+18,y-46);X.lineTo(x+40,y-34);X.stroke();
 X.strokeStyle="rgba(255,255,255,.75)";X.lineWidth=.8;X.beginPath();X.moveTo(x+40,y-34);X.lineTo(x+40,y-8);X.stroke();
 dot(x+18,y-52,2.4,"#ffe9a0");dot(x-24,y-16,3,"#ff8a1c");dot(x-19,y-17,3,"#ff8a1c")};
DEC.o_jetski=function(p){var x=p[0],y=p[1],k;oWake(x,y,36);
 X.fillStyle="rgba(255,255,255,.8)";for(k=0;k<5;k++){X.beginPath();X.ellipse(x-32-k*6,y-2+(k%2)*2,5-k*.6,2,0,0,7);X.fill()}
 X.fillStyle=lg(0,y-17,0,y+1,[[0,"#ffd23a"],[1,"#c98a08"]]);X.beginPath();X.moveTo(x-26,y-9);X.quadraticCurveTo(x-4,y-17,x+22,y-12);X.quadraticCurveTo(x+32,y-9,x+34,y-7);X.quadraticCurveTo(x+10,y+2,x-20,y+1);X.quadraticCurveTo(x-28,y-2,x-26,y-9);X.fill();
 X.strokeStyle="#22262c";X.lineWidth=2;X.beginPath();X.moveTo(x-18,y-4);X.quadraticCurveTo(x,y-1,x+22,y-6);X.stroke();
 poly([[x-20,y-12],[x-2,y-14],[x-2,y-18],[x-20,y-17]],"#22262c");
 poly([[x+6,y-14],[x+18,y-12],[x+14,y-26],[x+10,y-26]],"#2a2e34");
 X.strokeStyle="#22262c";X.lineWidth=2.2;X.beginPath();X.moveTo(x+8,y-26);X.lineTo(x+18,y-28);X.stroke()};
DEC.o_sailboat=function(p){var x=p[0],y=p[1];oWake(x,y,44);
 oHull(x,y-2,30,12,"#f4f1e8","#c9c4b4","#2a5a9a");X.fillStyle="#2a5a9a";X.fillRect(x-30,y-12,60,3);
 X.fillStyle="#6b4a24";X.fillRect(x-1.5,y-66,3,52);
 poly([[x+3,y-64],[x+3,y-18],[x+32,y-18]],lg(x,0,x+32,0,[[0,"#ffffff"],[1,"#e8e2cc"]]),"#b8b29c",1);
 poly([[x-3,y-58],[x-3,y-18],[x-26,y-18]],"#f6d9a8","#b89a68",1);
 poly([[x+1.5,y-66],[x+12,y-62],[x+1.5,y-58]],"#d9322a")};
DEC.o_speedboat=function(p){var x=p[0],y=p[1],k;oWake(x,y,48);
 X.fillStyle="rgba(255,255,255,.75)";for(k=0;k<5;k++){X.beginPath();X.ellipse(x-42-k*7,y+1+(k%2)*2,6-k*.7,2,0,0,7);X.fill()}
 oHull(x,y-1,30,11,"#f8f8f4","#c4c8cc","#1f5a9a");X.fillStyle="#1f5a9a";X.fillRect(x-30,y-8,64,3);
 poly([[x-6,y-12],[x+8,y-12],[x+3,y-26],[x-4,y-26]],"rgba(150,215,240,.85)","#f4f4f0",1.2);
 poly([[x-18,y-12],[x-8,y-12],[x-8,y-17],[x-18,y-17]],"#2a2e34");
 X.strokeStyle="#6a6e74";X.lineWidth=1.4;X.beginPath();X.moveTo(x-26,y-12);X.lineTo(x-26,y-26);X.stroke();poly([[x-26,y-26],[x-17,y-24],[x-26,y-21]],"#d9322a")};

// ---- BEACH ----
DEC.o_umbrella=function(p){var x=p[0],y=p[1],k,cx=x-2,cy=y-52,ap=[cx,cy-18],P=function(t){return[cx-34+68*t,cy+5*Math.sin(Math.PI*t)]};shade(p,20,7,.28);
 X.fillStyle="#d8c288";X.beginPath();X.ellipse(x,y,12,4,0,0,7);X.fill();
 X.strokeStyle="#7a5430";X.lineWidth=2.6;X.beginPath();X.moveTo(x+2,y);X.lineTo(cx,cy);X.stroke();
 for(k=0;k<6;k++)poly([ap,P(k/6),P((k+1)/6)],k%2?"#fff7ea":"#e8483c","rgba(0,0,0,.18)",.8);
 dot(ap[0],ap[1]-1,2,"#6b4a24")};
DEC.o_lounger=function(p){var x=p[0],y=p[1],k;shade(p,30,10,.28);
 X.fillStyle="#d8d4c8";X.fillRect(x-24,y-9,2.6,9);X.fillRect(x+8,y-9,2.6,9);
 poly([[x-26,y-13],[x+14,y-13],[x+12,y-9],[x-26,y-9]],"#f4f0e2","#a8a290",1);
 poly([[x-26,y-13],[x-16,y-13],[x-27,y-31],[x-38,y-28]],"#3a8ac8","#1f5a8a",1);
 poly([[x-16,y-13],[x+14,y-13],[x+14,y-17],[x-17,y-17]],"#3a8ac8","#1f5a8a",1);
 X.strokeStyle="rgba(255,255,255,.85)";X.lineWidth=2;X.beginPath();for(k=0;k<4;k++){X.moveTo(x-12+k*8,y-17);X.lineTo(x-12+k*8,y-13)}X.stroke();
 leaf(x-31,y-30,5,2.4,-.6,"#fff")};
DEC.o_shells=function(p){var x=p[0],y=p[1],k,i,a,r;
 X.fillStyle="rgba(190,150,80,.28)";X.beginPath();X.ellipse(x,y,30,11,0,0,7);X.fill();
 X.fillStyle="#f08a3a";X.beginPath();for(i=0;i<10;i++){a=-1.57+i*.6283;r=i%2?4.4:11;X.lineTo(x-12+Math.cos(a)*r,y-3+Math.sin(a)*r*.62)}X.closePath();X.fill();
 for(i=0;i<5;i++){a=-1.57+i*1.2566;dot(x-12+Math.cos(a)*6,y-3+Math.sin(a)*3.7,.9,"#ffd0a0")}
 blob(x+11,y-6,7,["#fff2e0","#d9a58a"]);X.strokeStyle="rgba(150,80,60,.6)";X.lineWidth=1;X.beginPath();X.arc(x+11,y-6,4,.3,5);X.stroke();X.beginPath();X.arc(x+11,y-6,2,1,6);X.stroke();
 poly([[x-2,y+8],[x-9,y+1],[x-5,y-1],[x-2,y-2],[x+1,y-1],[x+5,y+1]],"#f6c8c0","#c98a80",.8);
 X.strokeStyle="rgba(190,110,100,.6)";X.lineWidth=.7;for(k=-2;k<=2;k++){X.beginPath();X.moveTo(x-2,y+8);X.lineTo(x-2+k*2.6,y-1);X.stroke()}
 dot(x+18,y+6,2,"#f0d8c0");dot(x+8,y+7,1.6,"#e8c8a8");dot(x-20,y+5,1.8,"#f4e4d0")};
DEC.o_driftwood=function(p){var x=p[0],y=p[1],k;shade(p,34,10,.28);X.lineCap="round";
 X.strokeStyle="#6e5a44";X.lineWidth=9;X.beginPath();X.moveTo(x-30,y-4);X.quadraticCurveTo(x-6,y-16,x+30,y-5);X.stroke();
 X.strokeStyle="#ad9a7e";X.lineWidth=5.5;X.beginPath();X.moveTo(x-30,y-5.5);X.quadraticCurveTo(x-6,y-17.5,x+30,y-6.5);X.stroke();
 X.strokeStyle="#6e5a44";X.lineWidth=3.4;X.beginPath();X.moveTo(x-6,y-12);X.lineTo(x-12,y-28);X.moveTo(x+8,y-11);X.lineTo(x+16,y-24);X.moveTo(x-18,y-8);X.lineTo(x-26,y-18);X.stroke();
 X.strokeStyle="rgba(70,55,38,.5)";X.lineWidth=.8;for(k=0;k<4;k++){X.beginPath();X.moveTo(x-20+k*14,y-9-k%2*2);X.lineTo(x-12+k*14,y-11-k%2*2);X.stroke()}
 X.lineCap="butt";leaf(x+28,y-1,5,1.8,-.3,"#4a6a2a");leaf(x-32,y-1,4,1.6,.3,"#587a32")};
DEC.o_surfrack=function(p){var x=p[0],y=p[1],i,cols=["#ff5a5a","#ffd23a","#3ac8e8","#7ad84a","#ff8ad0"];shade(p,34,10,.28);
 X.fillStyle="#6b4a24";X.fillRect(x-32,y-30,3,30);X.fillRect(x+29,y-30,3,30);X.fillRect(x-32,y-28,64,3);
 for(i=0;i<5;i++){leaf(x-24+i*12,y-34,6,34,(i-2)*.05,cols[i]);leaf(x-24+i*12,y-34,1.3,30,(i-2)*.05,"rgba(255,255,255,.85)")}
 X.fillStyle="#8a5e30";X.fillRect(x-32,y-12,64,4);X.fillStyle="#b88650";X.fillRect(x-32,y-12,64,1.4)};
DEC.o_volley=function(p){var x=p[0],y=p[1],A=[x-30,y-15],B=[x+30,y+15],k;shade(p,38,12,.26);
 fPost(A[0],A[1],50,2,"#d8d4c8","#a8a498","#ffffff");
 fQ(A,B,.03,.97,22,46,"rgba(255,255,255,.28)","#f4f4f0",1);
 for(k=1;k<12;k++)fL(A,B,.03+.94*k/12,22,.03+.94*k/12,46,"rgba(255,255,255,.6)",.7);
 for(k=1;k<4;k++)fL(A,B,.03,22+k*6,.97,22+k*6,"rgba(255,255,255,.6)",.7);
 fQ(A,B,.03,.97,44,47,"#f4f4f0");
 fPost(B[0],B[1],50,2,"#d8d4c8","#a8a498","#ffffff");
 dot(x+8,y+16,5,"#fff");X.strokeStyle="#e8b030";X.lineWidth=1;X.beginPath();X.arc(x+8,y+16,3.4,.5,2.6);X.stroke();X.beginPath();X.arc(x+8,y+16,3.4,3.6,5.7);X.stroke()};
DEC.o_palm=function(p){var x=p[0],y=p[1],tx=x+18,ty=y-92,i,t,u,qx,qy;shade(p,24,8,.3);X.lineCap="round";
 X.strokeStyle="#5f3f1e";X.lineWidth=9;X.beginPath();X.moveTo(x-3,y);X.quadraticCurveTo(x-10,y-50,tx,ty);X.stroke();
 X.strokeStyle="#9a6e3a";X.lineWidth=5;X.beginPath();X.moveTo(x-4,y);X.quadraticCurveTo(x-11,y-50,tx-1,ty);X.stroke();
 X.strokeStyle="rgba(40,22,8,.4)";X.lineWidth=1;
 for(i=1;i<9;i++){t=i/9;u=1-t;qx=u*u*(x-3)+2*u*t*(x-10)+t*t*tx;qy=u*u*y+2*u*t*(y-50)+t*t*ty;X.beginPath();X.moveTo(qx-4,qy);X.lineTo(qx+4,qy+1.5);X.stroke()}
 X.lineCap="butt";
 [-3.05,-2.55,-2.05,-1.57,-1.09,-.59,-.09,.4,2.75].forEach(function(a){frond(tx,ty,a,40)});
 dot(tx-3,ty+5,4.2,"#6a4a26");dot(tx+3,ty+6,4.2,"#7a5a30");dot(tx,ty+9,4.2,"#5a3a1c")};
DEC.o_sandcastle=function(p){var x=p[0],y=p[1],C="#ecd292",D="#c9a45e";shade(p,38,13,.3);
 X.fillStyle="#dcc07a";X.beginPath();X.ellipse(x,y,34,12,0,0,7);X.fill();
 oTower(x-22,y-4,9,30,C,D);oTower(x+22,y-4,9,30,C,D);oTower(x,y-10,12,44,C,D);
 poly([[x-5,y-5],[x+5,y-5],[x+5,y-16],[x,y-20],[x-5,y-16]],"#8a6a38");
 X.strokeStyle="#6b4a24";X.lineWidth=1.4;X.beginPath();X.moveTo(x,y-60);X.lineTo(x,y-76);X.moveTo(x-22,y-39);X.lineTo(x-22,y-50);X.moveTo(x+22,y-39);X.lineTo(x+22,y-50);X.stroke();
 poly([[x,y-76],[x+11,y-72],[x,y-68]],"#d9322a");poly([[x-22,y-50],[x-14,y-47],[x-22,y-44]],"#3a8ac8");poly([[x+22,y-50],[x+30,y-47],[x+22,y-44]],"#ffd23a");
 dot(x+34,y+4,2.2,"#f4e4d0");dot(x-36,y+3,2,"#f0d8c0")};
DEC.o_tiki=function(p){var x=p[0],y=p[1],k;shade(p,42,13,.3);
 X.fillStyle="#6b4a24";X.fillRect(x-31,y-52,4,52);X.fillRect(x+27,y-52,4,52);
 poly([[x-32,y-2],[x+32,y-2],[x+32,y-22],[x-32,y-22]],lg(0,y-22,0,y,[[0,"#a8743c"],[1,"#7a4e24"]]),"#4a2e14",1);
 X.strokeStyle="rgba(40,20,5,.35)";X.lineWidth=1;for(k=1;k<8;k++){X.beginPath();X.moveTo(x-32+k*8,y-22);X.lineTo(x-32+k*8,y-2);X.stroke()}
 poly([[x-36,y-22],[x+36,y-22],[x+36,y-26],[x-36,y-26]],"#c9975a","#6b4a24",1);
 poly([[x-16,y-26],[x-11,y-26],[x-12,y-35],[x-15,y-35]],"rgba(255,140,60,.9)","#fff",.7);poly([[x+6,y-26],[x+11,y-26],[x+10,y-35],[x+7,y-35]],"rgba(255,90,140,.9)","#fff",.7);
 X.strokeStyle="#d9322a";X.lineWidth=1;X.beginPath();X.moveTo(x-13,y-35);X.lineTo(x-11,y-40);X.moveTo(x+9,y-35);X.lineTo(x+11,y-40);X.stroke();
 poly([[x-46,y-50],[x,y-82],[x+46,y-50]],lg(0,y-82,0,y-50,[[0,"#e0bd5a"],[1,"#b88a30"]]),"#7a5a20",1.2);
 X.strokeStyle="rgba(110,76,20,.55)";X.lineWidth=1;for(k=1;k<9;k++){X.beginPath();X.moveTo(x,y-82);X.lineTo(x-46+k*11.5,y-50);X.stroke()}
 X.strokeStyle="#c9a040";X.lineWidth=2;X.beginPath();for(k=0;k<=8;k++){X.moveTo(x-46+k*11.5,y-50);X.lineTo(x-46+k*11.5+1,y-45)}X.stroke();
 for(k=0;k<7;k++)dot(x-39+k*13,y-46+Math.sin(k)*1.5,1.7,k%2?"#ffe25a":"#ff7a5a")};
DEC.o_lifeguard=function(p){var x=p[0],y=p[1];shade(p,26,9,.3);
 X.strokeStyle="#f2eee2";X.lineWidth=3.4;X.beginPath();X.moveTo(x-16,y);X.lineTo(x-12,y-34);X.moveTo(x+16,y);X.lineTo(x+12,y-34);X.moveTo(x-14,y-8);X.lineTo(x+14,y-22);X.moveTo(x+14,y-8);X.lineTo(x-14,y-22);X.stroke();
 X.strokeStyle="#8a6a3a";X.lineWidth=1.6;X.beginPath();X.moveTo(x+18,y);X.lineTo(x+16,y-32);X.moveTo(x+24,y);X.lineTo(x+20,y-32);X.stroke();
 X.lineWidth=1;X.beginPath();[6,13,20,27].forEach(function(z){X.moveTo(x+18-z*.06,y-z);X.lineTo(x+24-z*.12,y-z)});X.stroke();
 poly([[x-20,y-34],[x+20,y-34],[x+20,y-30],[x-20,y-30]],"#c9975a","#6b4a24",1);
 poly([[x-15,y-34],[x+15,y-34],[x+15,y-60],[x-15,y-60]],"#f2eee2","#a8a290",1);
 X.fillStyle="#d9322a";X.fillRect(x-15,y-52,30,5);
 poly([[x-10,y-46],[x+10,y-46],[x+10,y-38],[x-10,y-38]],"#4a7a9a","#fff",1);
 poly([[x-21,y-60],[x+21,y-60],[x+14,y-68],[x-14,y-68]],"#d9322a","#7a2420",1);
 X.strokeStyle="#6a6e74";X.lineWidth=1.4;X.beginPath();X.moveTo(x+12,y-68);X.lineTo(x+12,y-88);X.stroke();poly([[x+12,y-88],[x+24,y-84],[x+12,y-80]],"#ffd23a");
 X.strokeStyle="#d9322a";X.lineWidth=3;X.beginPath();X.arc(x-24,y-24,5,0,7);X.stroke();X.strokeStyle="#fff";X.lineWidth=1.2;X.beginPath();X.arc(x-24,y-24,5,0,7);X.stroke()};
