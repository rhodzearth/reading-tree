// ===== FLOORS =====
var FTS={},FLC={gr:"#78bd42",ds:"#dcb46c",sn:"#eef3f8",bc:"#f2ead3",dt:"#85603c",gv:"#9a9893",cb:"#807d77",wd:"#a8794a",pv:"#b4b6b8",br:"#b8553d",au:"#a8742c",hw:"#4a4d53",hc:"#4a4d53",ix:"#4a4d53",iq:"#4a4d53",pc:"#4a4d53",sk:"#c9cacc",wt:"#2b86b6"};
function flKey(c,r){return(c+2048)*4096+r+2048}
function flAt(c,r){return S&&S.fl?S.fl[flKey(c,r)]:undefined}
function fu(){X.transform(57,29,-57,29,57,0)} // from here on, 0..1 = the whole tile
var FLD={
gr:function(){var rn=mk(5),i,x,y;fu();X.fillStyle=lg(0,0,1,1,[[0,"#86c94e"],[1,"#6cae3a"]]);X.fillRect(0,0,1,1);
 for(i=0;i<50;i++){x=rn();y=rn();X.strokeStyle=rn()<.5?"#4f9a2e":"#a6e066";X.lineWidth=.012;X.beginPath();X.moveTo(x,y);X.lineTo(x+.01,y-.05);X.stroke()}},
ds:function(){var rn=mk(3),i,y;fu();X.fillStyle=lg(0,0,1,1,[[0,"#ecc884"],[1,"#d7ab5f"]]);X.fillRect(0,0,1,1);
 for(i=0;i<7;i++){y=i/7+.04;X.strokeStyle=i%2?"rgba(255,235,180,.55)":"rgba(150,100,40,.28)";X.lineWidth=.022;X.beginPath();X.moveTo(0,y);X.bezierCurveTo(.3,y-.08,.6,y+.08,1,y-.02);X.stroke()}
 for(i=0;i<40;i++){X.fillStyle=rn()<.5?"rgba(120,80,30,.35)":"rgba(255,240,200,.5)";X.fillRect(rn(),rn(),.012,.012)}},
sn:function(){var rn=mk(4),i;fu();X.fillStyle=lg(0,0,1,1,[[0,"#f8fbfe"],[1,"#dbe6f0"]]);X.fillRect(0,0,1,1);
 for(i=0;i<5;i++){X.fillStyle="rgba(140,175,210,.2)";X.beginPath();X.ellipse(rn(),rn(),.12,.06,rn()*3,0,7);X.fill()}
 for(i=0;i<5;i++){X.fillStyle="rgba(255,255,255,.9)";X.beginPath();X.ellipse(rn(),rn(),.1,.045,rn()*3,0,7);X.fill()}
 for(i=0;i<34;i++){X.fillStyle="rgba(255,255,255,"+(.6+rn()*.4)+")";X.fillRect(rn(),rn(),.014,.014)}
 for(i=0;i<8;i++){X.fillStyle="rgba(190,225,255,.9)";X.fillRect(rn(),rn(),.01,.01)}},
bc:function(){var rn=mk(6),i,y;fu();X.fillStyle=lg(0,0,1,1,[[0,"#faf4e2"],[1,"#eadfc2"]]);X.fillRect(0,0,1,1);
 for(i=0;i<4;i++){y=.12+i*.25;X.strokeStyle="rgba(255,255,255,.55)";X.lineWidth=.02;X.beginPath();X.moveTo(0,y);X.bezierCurveTo(.3,y-.06,.6,y+.06,1,y);X.stroke()}
 for(i=0;i<70;i++){X.fillStyle=rn()<.5?"rgba(190,165,120,.35)":"rgba(255,255,255,.6)";X.fillRect(rn(),rn(),.011,.011)}
 X.fillStyle="#efc8b6";X.beginPath();X.ellipse(.3,.65,.03,.02,.6,0,7);X.fill();X.beginPath();X.ellipse(.72,.3,.025,.017,-.4,0,7);X.fill()},
dt:function(){var rn=mk(8),i;fu();X.fillStyle=lg(0,0,1,1,[[0,"#936d45"],[1,"#72502d"]]);X.fillRect(0,0,1,1);
 for(i=0;i<16;i++){X.fillStyle="rgba(55,32,14,.38)";X.beginPath();X.ellipse(rn(),rn(),.05+rn()*.04,.025+rn()*.02,rn()*3,0,7);X.fill()}
 for(i=0;i<14;i++){X.fillStyle="rgba(190,150,100,.3)";X.beginPath();X.ellipse(rn(),rn(),.03,.018,rn()*3,0,7);X.fill()}
 for(i=0;i<6;i++){X.fillStyle="#9a9288";X.beginPath();X.ellipse(rn(),rn(),.022,.015,rn()*3,0,7);X.fill()}},
gv:function(){var rn=mk(2),i,g,x,y,r;fu();X.fillStyle="#6f6e6a";X.fillRect(0,0,1,1);
 for(i=0;i<80;i++){x=rn();y=rn();r=.02+rn()*.03;g=130+Math.floor(rn()*90);X.fillStyle="rgb("+g+","+(g-3)+","+(g-8)+")";X.beginPath();X.ellipse(x,y,r*1.2,r*.8,rn()*3,0,7);X.fill();
  X.fillStyle="rgba(255,255,255,.25)";X.beginPath();X.ellipse(x-r*.3,y-r*.3,r*.5,r*.3,0,0,7);X.fill()}},
cb:function(){var rn=mk(12),i,j,g,x,y;fu();X.fillStyle="#58564f";X.fillRect(0,0,1,1);
 for(j=0;j<4;j++)for(i=-1;i<4;i++){x=(i+(j%2?.5:0))/3+.01;y=j/4+.01;g=118+Math.floor(rn()*56);X.fillStyle="rgb("+g+","+(g-2)+","+(g-8)+")";X.beginPath();X.ellipse(x+.16,y+.115,.155,.11,0,0,7);X.fill();
  X.fillStyle="rgba(255,255,255,.2)";X.beginPath();X.ellipse(x+.14,y+.08,.09,.05,0,0,7);X.fill()}},
wd:function(){var i,k,P=["#b88655","#a97a4a","#c49462","#9e7143","#b58250"];fu();
 for(i=0;i<5;i++){X.fillStyle=P[i];X.fillRect(0,i*.2,1,.2);X.fillStyle="rgba(255,255,255,.12)";X.fillRect(0,i*.2,1,.03);
  X.strokeStyle="rgba(70,40,15,.3)";X.lineWidth=.008;for(k=0;k<3;k++){X.beginPath();X.moveTo(0,i*.2+.05+k*.045);X.bezierCurveTo(.3,i*.2+.04+k*.045,.7,i*.2+.07+k*.045,1,i*.2+.05+k*.045);X.stroke()}
  X.strokeStyle="rgba(40,22,8,.65)";X.lineWidth=.014;X.beginPath();X.moveTo(0,i*.2);X.lineTo(1,i*.2);X.stroke();
  X.fillStyle="rgba(50,30,12,.6)";X.fillRect(.04,i*.2+.09,.012,.012);X.fillRect(.95,i*.2+.09,.012,.012)}},
pv:function(){var i,j;fu();X.fillStyle="#7e8084";X.fillRect(0,0,1,1);
 for(i=0;i<2;i++)for(j=0;j<2;j++){X.fillStyle=(i+j)%2?"#c3c5c7":"#b4b6b9";X.fillRect(i*.5+.025,j*.5+.025,.45,.45);X.fillStyle="rgba(255,255,255,.35)";X.fillRect(i*.5+.025,j*.5+.025,.45,.014);X.fillRect(i*.5+.025,j*.5+.025,.014,.45);
  X.fillStyle="rgba(0,0,0,.12)";X.fillRect(i*.5+.025,j*.5+.46,.45,.014)}},
br:function(){var rn=mk(16),r,i,t,g;fu();X.fillStyle="#cfc3ad";X.fillRect(0,0,1,1);
 for(r=0;r<6;r++)for(i=-1;i<4;i++){t=i*.25+(r%2?.125:0);g=rn();X.fillStyle=g<.33?"#a94b37":g<.66?"#b9583f":"#c46650";X.fillRect(t+.012,r/6+.012,.226,.14);X.fillStyle="rgba(255,255,255,.18)";X.fillRect(t+.012,r/6+.012,.226,.02)}},
au:function(){var rn=mk(18),i,x,y,P=["#c8462a","#e08a22","#e8c040","#a85a1e","#d2692a"];fu();X.fillStyle=lg(0,0,1,1,[[0,"#a07030"],[1,"#80561f"]]);X.fillRect(0,0,1,1);
 for(i=0;i<34;i++){X.fillStyle=P[i%5];X.beginPath();X.ellipse(rn(),rn(),.045,.022,rn()*3.14,0,7);X.fill()}
 X.strokeStyle="rgba(60,30,10,.3)";X.lineWidth=.006;for(i=0;i<6;i++){x=rn();y=rn();X.beginPath();X.moveTo(x-.03,y);X.lineTo(x+.03,y);X.stroke()}},
hw:function(){var rn=mk(23),i;fu();X.fillStyle=lg(0,0,1,1,[[0,"#55585e"],[1,"#41444b"]]);X.fillRect(0,0,1,1);
 for(i=0;i<60;i++){X.fillStyle=rn()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.2)";X.fillRect(rn(),rn(),.012,.012)}
 X.fillStyle="#f4f4f0";X.fillRect(0,.07,1,.034);X.fillRect(0,.896,1,.034);
 X.fillRect(.125,.483,.25,.034);X.fillRect(.625,.483,.25,.034)},
 hc:function(){var rn=mk(29),i,a,P2=Math.PI/2;fu();X.save();X.beginPath();X.moveTo(0,1);X.arc(0,1,1,-P2,0,false);X.closePath();X.clip();
 X.fillStyle=lg(0,0,1,1,[[0,"#55585e"],[1,"#41444b"]]);X.fillRect(0,0,1,1);
 for(i=0;i<60;i++){X.fillStyle=rn()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.2)";X.fillRect(rn(),rn(),.012,.012)}
 X.restore();X.lineCap="butt";X.strokeStyle="#f4f4f0";X.lineWidth=.034;
 X.beginPath();X.arc(0,1,.913,-P2,0,false);X.stroke();X.beginPath();X.arc(0,1,.087,-P2,0,false);X.stroke();
 [[.125,.295],[.49,.66]].forEach(function(d){X.beginPath();X.arc(0,1,.5,-P2+d[0]/.5,-P2+d[1]/.5,false);X.stroke()})},
 wt:function(fr){var ph=fr/6*6.2832,i,j,x,y,yy;fu();X.fillStyle=lg(0,0,1,1,[[0,"#46aed2"],[.5,"#2a86b8"],[1,"#1b6592"]]);X.fillRect(0,0,1,1);
 for(i=0;i<3;i++){X.fillStyle="rgba(150,225,245,.22)";X.beginPath();X.ellipse(.25+i*.25+.05*Math.sin(ph+i*2),.3+i*.2+.04*Math.cos(ph+i),.13,.07,.6,0,7);X.fill()}
 for(i=0;i<6;i++){y=(i/6+fr/36)%1;X.strokeStyle="rgba(255,255,255,"+(.18+.14*Math.sin(ph+i))+")";X.lineWidth=.014;X.beginPath();
  for(j=0;j<=10;j++){x=j/10;yy=y+.03*Math.sin(x*9+ph+i*1.7);if(j)X.lineTo(x,yy);else X.moveTo(x,yy)}X.stroke()}
 for(i=0;i<5;i++){X.fillStyle="rgba(255,255,255,"+(.35+.4*Math.max(0,Math.sin(ph+i*1.9)))+")";X.fillRect(.15+i*.17+.03*Math.sin(ph+i),.2+((i*.37)%.6),.016,.016)}
 X.fillStyle=lg(0,0,1,1,[[0,"rgba(0,50,90,.12)"],[.5,"rgba(0,50,90,0)"],[1,"rgba(0,50,90,.2)"]]);X.fillRect(0,0,1,1)}
};
// ===== ROAD TILES: intersections + pedestrian tiles =====
function rdAsph(s){var i,rn=function(){s=(s*16807)%2147483647;return s/2147483647};X.fillStyle=lg(0,0,1,1,[[0,"#55585e"],[1,"#41444b"]]);X.fillRect(0,0,1,1);
 for(i=0;i<60;i++){X.fillStyle=rn()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.2)";X.fillRect(rn(),rn(),.012,.012)}}
function rdCorner(cx,cy){X.save();X.translate(cx,cy);X.scale(cx?-1:1,cy?-1:1);X.strokeStyle="#f4f4f0";X.lineWidth=.034;X.lineCap="butt";
 X.beginPath();X.moveTo(0,.087);X.lineTo(.03,.087);X.quadraticCurveTo(.087,.087,.087,.03);X.lineTo(.087,0);X.stroke();X.restore()}
function rdStop(e){X.fillStyle="#f4f4f0";
 if(e===0)X.fillRect(.05,.104,.034,.792);else if(e===1)X.fillRect(.104,.05,.792,.034);
 else if(e===2)X.fillRect(.916,.104,.034,.792);else X.fillRect(.104,.916,.792,.034)}
FLD.ix=function(){fu();rdAsph(31);rdCorner(0,0);rdCorner(1,0);rdCorner(1,1);rdCorner(0,1);rdStop(0);rdStop(1);rdStop(2);rdStop(3);
 X.fillStyle="rgba(0,0,0,.07)";X.fillRect(.3,.3,.4,.4)};
FLD.iq=function(){fu();rdAsph(37);rdCorner(0,0);rdStop(0);rdStop(1);
 X.fillStyle="rgba(0,0,0,.07)";X.fillRect(.45,.45,.55,.55)};
FLD.pc=function(){var k;fu();rdAsph(43);X.fillStyle="#f4f4f0";X.fillRect(0,.07,1,.034);X.fillRect(0,.896,1,.034);
 for(k=0;k<7;k++)X.fillRect(.2,.13+k*.11,.6,.062)};
FLD.sk=function(){var i,j,s=41,rn=function(){s=(s*16807)%2147483647;return s/2147483647};fu();
 X.fillStyle=lg(0,0,0,1,[[0,"#d6d7d9"],[1,"#c6c8cb"]]);X.fillRect(0,0,1,1);
 for(i=0;i<4;i++)for(j=0;j<2;j++){X.fillStyle="rgba(255,255,255,"+(.04+rn()*.12)+")";X.fillRect(i/4+.012,j*.33+.012,.226,.306)}
 X.strokeStyle="rgba(90,92,96,.5)";X.lineWidth=.012;X.beginPath();for(i=1;i<4;i++){X.moveTo(i/4,0);X.lineTo(i/4,.66)}X.moveTo(0,.33);X.lineTo(1,.33);X.stroke();
 X.fillStyle="#e7c23e";for(i=0;i<8;i++)for(j=0;j<2;j++){X.beginPath();X.arc(.0625+i*.125,.72+j*.08,.022,0,7);X.fill()}
 X.fillStyle="#e4e5e7";X.fillRect(0,.86,1,.1);X.fillStyle="#8f9195";X.fillRect(0,.96,1,.04);
 X.fillStyle="rgba(255,255,255,.75)";X.fillRect(0,.86,1,.012);X.fillStyle="rgba(60,60,64,.5)";X.fillRect(.5,.86,.008,.1)};
function ftile(id,dpr,fr){var key=id+"|"+dpr+"|"+(fr||0),c=FTS[key],cx,oX;if(c)return c;
 c=document.createElement("canvas");c.width=Math.round(114*dpr);c.height=Math.round(58*dpr);cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);oX=X;X=cx;
 try{X.save();X.beginPath();X.moveTo(57,0);X.lineTo(114,29);X.lineTo(57,58);X.lineTo(0,29);X.closePath();X.clip();FLD[id](fr||0);X.restore()}finally{X=oX}
 return FTS[key]=c}
function flOf(cv){return cv&&cv.id==="vCanvas"?(V&&V.fl):(S&&S.fl)}
// ===== WATER: all water tiles are drawn as ONE connected, ROUNDED body of water (no squares, no tile lines) =====
function wh(a,b){var v=Math.sin(a*127.1+b*311.7)*43758.5453;return v-Math.floor(v)}
// builds one path of rounded blobs: a circle (iso ellipse) per water tile + bridge blobs between neighbours, so the shape is smooth
function waterBlobPath(W,S2,sc){var hw=G.TW/2,hh=G.TH/2,k,c,r,cx,cy,rx=hw*.6*sc,ry=hh*.6*sc,n;
 function blob(x,y){X.moveTo(x+rx,y);X.ellipse(x,y,rx,ry,0,0,6.2832)}
 for(k=0;k<W.length;k+=2){c=W[k];r=W[k+1];cx=G.ox+(c-r)*hw;cy=G.oy+(c+r)*hh+hh;blob(cx,cy);
  if(S2[flKey(c+1,r)])blob(cx+hw/2,cy+hh/2);
  if(S2[flKey(c,r+1)])blob(cx-hw/2,cy+hh/2);
  if(S2[flKey(c+1,r+1)])blob(cx,cy+hh)}}
function drawWaterBodyFull(F,W,t,WE){var WA=WE&&WE.length?W.concat(WE):W,S2A={},hw=G.TW/2,hh=G.TH/2,k,c,r,x0,y0,minX=1e9,maxX=-1e9,minY=1e9,maxY=-1e9,bx0,bx1,by0,by1,gx,gy,h,px,py,x,y,yy,row,al,ph,S2={};
 for(k=0;k<WA.length;k+=2){S2A[flKey(WA[k],WA[k+1])]=1;if(k<W.length)S2[flKey(W[k],W[k+1])]=1;c=WA[k];r=WA[k+1];x0=G.ox+(c-r)*hw;y0=G.oy+(c+r)*hh;
  if(x0-hw<minX)minX=x0-hw;if(x0+hw>maxX)maxX=x0+hw;if(y0<minY)minY=y0;if(y0+2*hh>maxY)maxY=y0+2*hh}
 X.save();
 // 1) sandy shore rim + white foam: stroke the outline first, the water fill then covers the inner half (and any inner lines)
 X.beginPath();waterBlobPath(W,S2,1);
 X.lineJoin="round";X.strokeStyle="rgba(205,180,128,.95)";X.lineWidth=3;X.stroke();
 X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1.1;X.stroke();
 // 2) the water itself: light shallows at the edge, deeper blue towards the middle (3 smooth layers)
 var WSa=W.slice(),S2s={},cheap=!!MOVING;for(k=0;k<WA.length;k+=2)if(k<W.length||wDist(WA[k],WA[k+1])<=7.9){if(k>=W.length)WSa.push(WA[k],WA[k+1]);S2s[flKey(WA[k],WA[k+1])]=1}
  X.beginPath();waterBlobPath(WSa,S2s,1);X.fillStyle="#cdbd8c";X.fill();X.save();X.clip(); // sandy bottom on the beach part only
 bx0=Math.max(minX,VW.x0);bx1=Math.min(maxX,VW.x1);by0=Math.max(minY,VW.y0);by1=Math.min(maxY,VW.y1);
  // clear water: pebbles on the bottom (fixed to the world), then see-through blue water on top
  for(gy=Math.floor(by0/20)-1;gy<=Math.floor(by1/20)+1;gy++)for(gx=Math.floor(bx0/26)-1;gx<=Math.floor(bx1/26)+1;gx++){
   h=wh(gx+5,gy+9);if(h<.5)continue;px=gx*26+((h*17)%1)*24;py=gy*20+((h*29)%1)*18;
  X.fillStyle=h>.78?"rgba(238,228,196,.75)":h>.64?"rgba(112,98,72,.38)":"rgba(150,134,100,.30)";
  X.beginPath();X.ellipse(px,py,1.4+h*2.6,.9+h*1.5,0,0,7);X.fill()}
  X.restore();X.save();X.beginPath();waterBlobPath(WA,S2A,1);X.clip(); // from here the water also covers the shallows
  var gr=X.createLinearGradient(G.ox-500,G.oy,G.ox+500,G.oy+720);gr.addColorStop(0,"rgba(79,184,220,.52)");gr.addColorStop(.5,"rgba(58,159,204,.60)");gr.addColorStop(1,"rgba(43,134,186,.68)");
 X.fillStyle=gr;X.fillRect(bx0-20,by0-20,bx1-bx0+40,by1-by0+40);
 // 3) big soft light / deep patches that drift slowly (fixed to the world, so they stay when you scroll)
  for(gy=Math.floor(by0/90)-1;gy<=Math.floor(by1/90)+1;gy++)for(gx=Math.floor(bx0/150)-1;gx<=Math.floor(bx1/150)+1;gx++){
   h=wh(gx,gy);px=gx*150+h*150+16*Math.sin(t/3200+h*9);py=gy*90+((h*7.3)%1)*90+6*Math.cos(t/3700+h*5);
  X.fillStyle="rgba(165,232,248,.10)";
  X.beginPath();X.ellipse(px,py,70+h*45,24+h*16,0,0,7);X.fill()}
 // 4) gentle drifting wavelets across the whole body
 X.lineWidth=1.3;X.lineCap="round";
  if(!cheap)for(yy=Math.floor(by0/17)*17,row=Math.floor(by0/17);yy<=by1+17;yy+=17,row++){
  al=.11+.07*Math.sin(row*1.7+t/1400);X.strokeStyle="rgba(255,255,255,"+al.toFixed(3)+")";
  X.setLineDash([20+(row%3)*9,48+(row%4)*8]);X.lineDashOffset=(row%2?1:-1)*t/38+row*23;
  X.beginPath();
  for(x=bx0-16;x<=bx1+16;x+=14){y=yy+2.6*Math.sin(x*.05+t/850+row*.6)+1.6*Math.sin(x*.021-t/1300);x<=bx0-16?X.moveTo(x,y):X.lineTo(x,y)}
  X.stroke()}
 X.setLineDash([]);X.lineDashOffset=0;X.lineCap="butt";
 // 5) tiny sun sparkles
  if(!cheap)for(gy=Math.floor(by0/26)-1;gy<=Math.floor(by1/26)+1;gy++)for(gx=Math.floor(bx0/40)-1;gx<=Math.floor(bx1/40)+1;gx++){
   h=wh(gx+31,gy+17);if(h<.72)continue;ph=Math.sin(t/520+h*60);if(ph<.35)continue;
  X.fillStyle="rgba(255,255,255,"+((ph-.35)*.95).toFixed(2)+")";X.fillRect(gx*40+h*34,gy*26+((h*13)%1)*22,2.2,1.6)}
 X.restore();X.restore()}
 // FAST WATER: dragging = one flat blue shape; big ponds are painted once and reused
var WPIC={};
function drawWaterBody(F,W,t,WE){
 var WA=WE&&WE.length?W.concat(WE):W,S2A={},k,m,key,pc,id,hs=0,oc,cx,oX,om;
 if(MOVING){
  for(k=0;k<WA.length;k+=2)S2A[flKey(WA[k],WA[k+1])]=1;
  X.save();X.beginPath();waterBlobPath(WA,S2A,1);X.fillStyle="#49a6cc";X.fill();X.restore();return}
 if(W.length<=300){drawWaterBodyFull(F,W,t,WE);return}
 try{m=X.getTransform()}catch(e){drawWaterBodyFull(F,W,t,WE);return}
 for(k=0;k<W.length;k++)hs=(hs*31+W[k])|0;
 id=X.canvas.id||"c";key=id+"|"+X.canvas.width+"|"+X.canvas.height+"|"+m.a+"|"+m.e+"|"+m.f+"|"+G.ox+"|"+G.oy+"|"+W.length+"|"+WA.length+"|"+hs;
 pc=WPIC[id]||(WPIC[id]={});
 if(pc.key!==key||!pc.oc){
  oc=pc.oc||(pc.oc=document.createElement("canvas"));
  if(oc.width!==X.canvas.width||oc.height!==X.canvas.height){oc.width=X.canvas.width;oc.height=X.canvas.height}
  cx=oc.getContext("2d");cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,oc.width,oc.height);cx.setTransform(m);
  oX=X;om=MOVING;X=cx;MOVING=true;
  try{drawWaterBodyFull(F,W,0,WE)}finally{X=oX;MOVING=om}
  pc.key=key}
 X.save();X.setTransform(1,0,0,1,0,0);X.drawImage(pc.oc,0,0);X.restore()}
var WXC={k:"",v:null};
function waterExt(W){var k,hs=0,key;
 for(k=0;k<W.length;k++)hs=(hs*31+W[k])|0;
 key=W.length+"|"+hs+"|"+G.P.map(function(q){return q.c0+","+q.c1+","+q.r0+","+q.r1}).join(";");
 if(WXC.k===key)return WXC.v;
 WXC.v=waterExt0(W);WXC.k=key;return WXC.v}
var WSET={}; // tiles that are water (so the light checker pattern is not drawn over them)
function wkey(c,r){if(!CR)return flKey(c,r);var t=utile(c,r);return flKey(t[0],t[1])}
// ===== FLOOR MAP: the whole floor as 1 pixel per tile, drawn with ONE call while you drag or zoom =====
var FMAP=null,FLN=0,FRGB={};
function flRGB(id){var h=FLC[id]||"#888888",v=FRGB[id];if(v)return v;v=[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];return FRGB[id]=v}
function floorMap(F){var fm=FMAP,keys,k,n,c,r,id,key,minc=1e9,maxc=-1e9,minr=1e9,maxr=-1e9,w,h,cv,cx,im,d,o,v,W=[],L=[];
 if(fm&&fm.F===F&&fm.n===FLN)return fm;
 keys=Object.keys(F);n=keys.length;
 for(k=0;k<n;k++){id=F[keys[k]];if(!id)continue;key=+keys[k];c=Math.floor(key/4096)-2048;r=key%4096-2048;
  if(id==="wt"){W.push(c,r);continue}if(id==="hc")continue;
  L.push(c,r,id);if(c<minc)minc=c;if(c>maxc)maxc=c;if(r<minr)minr=r;if(r>maxr)maxr=r}
 if(!L.length)return FMAP={F:F,n:FLN,cv:null,W:W};
 w=maxc-minc+1;h=maxr-minr+1;cv=document.createElement("canvas");cv.width=w;cv.height=h;cx=cv.getContext("2d");im=cx.createImageData(w,h);d=im.data;
 for(k=0;k<L.length;k+=3){o=((L[k+1]-minr)*w+(L[k]-minc))*4;v=flRGB(L[k+2]);d[o]=v[0];d[o+1]=v[1];d[o+2]=v[2];d[o+3]=255}
 cx.putImageData(im,0,0);return FMAP={F:F,n:FLN,cv:cv,minc:minc,minr:minr,w:w,h:h,W:W}}
// ===== TEXTURED FLOOR WHILE MOVING: the floor is baked in blocks of 16x16 tiles (half size) and each block is drawn with ONE call =====
var FCH={F:null,ver:"",m:{},q:[]},FCHN=16,FCHS=.5;
function bakeChunk(F,i,j,hw,hh){var CH=FCHN,sc=FCHS,c0=i*CH,r0=j*CH,lc,lr,id,cnt=0,cv,cx,w,h,px,py,FRm=frOf(X.canvas)||{};
 for(lr=0;lr<CH;lr++)for(lc=0;lc<CH;lc++){id=F[flKey(c0+lc,r0+lr)];if(id&&id!=="wt"&&FLD[id])cnt++}
 if(!cnt)return{cv:null};
 w=Math.ceil((2*CH*hw+8)*sc);h=Math.ceil((2*CH*hh+62)*sc);
 cv=document.createElement("canvas");cv.width=w;cv.height=h;cx=cv.getContext("2d");cx.setTransform(sc,0,0,sc,0,0);
 for(lr=0;lr<CH;lr++)for(lc=0;lc<CH;lc++){id=F[flKey(c0+lc,r0+lr)];if(!id||id==="wt"||!FLD[id])continue;
  px=(lc-lr)*hw+CH*hw+4;py=(lc+lr)*hh+2;cx.drawImage(ftileR(id,CSD,FRm[flKey(c0+lc,r0+lr)]|0),px-57,py-1,114,58)}
 return{cv:cv,w:w,h:h}}
function chunkDraw(F,hw,hh){var ver=FLN+"|"+CSD+"|"+G.ox+"|"+G.oy+"|"+hw+"|"+hh,CH=FCHN,sc=FCHS,i0,i1,j0,j1,i,j,k,ch,built=0;
 if(FCH.F!==F||FCH.ver!==ver)FCH={F:F,ver:ver,m:{},q:[]};
 i0=Math.floor(VTF.c0/CH);i1=Math.floor(VTF.c1/CH);j0=Math.floor(VTF.r0/CH);j1=Math.floor(VTF.r1/CH);
 if((i1-i0+1)*(j1-j0+1)>16)return; // zoomed far out: the flat colours are enough
 for(i=i0;i<=i1;i++)for(j=j0;j<=j1;j++){k=i+","+j;ch=FCH.m[k];
  if(!ch){if(built>=3)continue;ch=FCH.m[k]=bakeChunk(F,i,j,hw,hh);built++;FCH.q.push(k);if(FCH.q.length>40)delete FCH.m[FCH.q.shift()]}
  if(ch.cv)X.drawImage(ch.cv,G.ox+(i*CH-j*CH)*hw-(CH*hw+4),G.oy+(i*CH+j*CH)*hh-2,ch.w/sc,ch.h/sc)}}
function drawFloors(cv){var F=flOf(cv),c,r,id,x0,y0,t=Date.now(),W=[],k,P,p,hw,hh,fr,S2;
 WSET={};if(!F)return;hw=G.TW/2;hh=G.TH/2;
  var flat=LOD>1,cnt=0,FRm=frOf(cv)||{},rot;
  if(!flat&&MOVING){for(c=VTF.c0;c<=VTF.c1&&cnt<=3500;c++)for(r=VTF.r0;r<=VTF.r1&&cnt<=3500;r++)if(F[wkey(c,r)])cnt++;flat=cnt>400}
  if(flat&&!CR){var fm=floorMap(F),wp=[],pe2,S3;
   if(fm.cv){X.save();X.imageSmoothingEnabled=false;X.transform(hw,hh,-hw,hh,G.ox,G.oy);X.drawImage(fm.cv,fm.minc,fm.minr,fm.w,fm.h);X.restore()}
   chunkDraw(F,hw,hh);
   for(k=0;k<fm.W.length;k+=2)if(fm.W[k]>=VTF.c0&&fm.W[k]<=VTF.c1&&fm.W[k+1]>=VTF.r0&&fm.W[k+1]<=VTF.r1)wp.push(fm.W[k],fm.W[k+1]);
   if(wp.length)drawWaterBody(F,wp,t,waterExt(wp));
   return}
  if(flat){P={};
   for(c=VTF.c0;c<=VTF.c1;c++)for(r=VTF.r0;r<=VTF.r1;r++){id=F[wkey(c,r)];if(id){if(!P[id])P[id]=[];P[id].push(c,r)}}
  for(id in P){p=P[id];X.beginPath();
   if(id==="wt"){var pe=p.concat(waterExt(p));S2={};for(k=0;k<pe.length;k+=2)S2[flKey(pe[k],pe[k+1])]=1;waterBlobPath(pe,S2,1)}
   else for(k=0;k<p.length;k+=2){x0=G.ox+(p[k]-p[k+1])*hw;y0=G.oy+(p[k]+p[k+1])*hh;X.moveTo(x0,y0);X.lineTo(x0+hw,y0+hh);X.lineTo(x0,y0+2*hh);X.lineTo(x0-hw,y0+hh);X.closePath()}
   X.fillStyle=FLC[id]||"#888";X.fill()}
  return}
 var T=[],hs=0,fc,m,key,fv,oc,ox_;
 for(c=VTF.c0;c<=VTF.c1;c++)for(r=VTF.r0;r<=VTF.r1;r++){id=F[wkey(c,r)];if(!id||!FLD[id])continue;
  if(id==="wt"){W.push(c,r);WSET[flKey(c,r)]=1;continue} // water is drawn later as ONE rounded body
  rot=((FRm[wkey(c,r)]|0)+CR)&3;T.push(c,r,rot?id+rot:id);hs=(hs*31+id.charCodeAt(0)*7+id.charCodeAt(1)+c*3+r+rot*17)|0}
 // When the view stands still (the game keeps redrawing for swaying crops), the finished floor picture is reused.
 try{m=X.getTransform();key=X.canvas.id+"|"+X.canvas.width+"|"+X.canvas.height+"|"+m.a+"|"+m.e+"|"+m.f+"|"+G.ox+"|"+G.oy+"|"+CR+"|"+CSD+"|"+T.length+"|"+hs}catch(e){key=null}
 fv=FLV[X.canvas.id]||(FLV[X.canvas.id]={});
 if(key&&fv.key===key&&fv.oc){X.save();X.setTransform(1,0,0,1,0,0);X.drawImage(fv.oc,0,0);X.restore()}
 else{
  fc=X;ox_=null;
  if(key&&fv.key===key&&T.length>60){ // second frame in a row with the same view: build the picture once
   oc=fv.oc2||(fv.oc2=document.createElement("canvas"));if(oc.width!==X.canvas.width||oc.height!==X.canvas.height){oc.width=X.canvas.width;oc.height=X.canvas.height}
   ox_=oc.getContext("2d");ox_.setTransform(1,0,0,1,0,0);ox_.clearRect(0,0,oc.width,oc.height);ox_.setTransform(m);fc=ox_}
  for(k=0;k<T.length;k+=3){x0=G.ox+(T[k]-T[k+1])*hw;y0=G.oy+(T[k]+T[k+1])*hh;fc.drawImage(ftileR(T[k+2].slice(0,2),CSD,T[k+2].length>2?+T[k+2].charAt(2):0),x0-57,y0-1,114,58)}
  if(ox_){fv.oc=oc;fv.oc2=null;X.save();X.setTransform(1,0,0,1,0,0);X.drawImage(oc,0,0);X.restore()}
  else if(fv.key!==key)fv.oc=null;
  fv.key=key}
 if(W.length)drawWaterBody(F,W,t,waterExt(W))}
var FLV={},VTF={c0:0,c1:0,r0:0,r1:0};
// distance from the middle of a tile to the nearest land square (in the same tile numbers the picture uses)
function wDist(c,r){var P=G.P,x=c+.5,y=r+.5,d=1e9,i,q,dx,dy;for(i=0;i<P.length;i++){q=P[i];dx=Math.max(q.c0-x,0,x-q.c1);dy=Math.max(q.r0-y,0,y-q.r1);d=Math.min(d,Math.sqrt(dx*dx+dy*dy))}return d}
// water painted on the far edge of the beach reaches the sea: add 2 invisible water tiles outward so the pond joins the shallows
function waterExt0(W){var out=[],have={},seen={},q=[],k,c,r,st,d,N=[[1,0],[-1,0],[0,1],[0,-1]];
 for(k=0;k<W.length;k+=2)have[flKey(W[k],W[k+1])]=1;
 for(k=0;k<W.length;k+=2){c=W[k];r=W[k+1];if(inLandP(G.P,c,r))continue;d=wDist(c,r);if(d>=6.2)q.push([c,r,d])}
 for(st=0;st<8&&q.length;st++){var nq=[];q.forEach(function(e){N.forEach(function(v){var a=e[0]+v[0],b=e[1]+v[1],key=flKey(a,b),dd;
   if(have[key]||seen[key]||inLandP(G.P,a,b))return;dd=wDist(a,b);if(dd>e[2]+.01&&dd<=14.2){seen[key]=1;out.push(a,b);nq.push([a,b,dd])}})});q=nq}
 return out}
// the perimeter fence disappears where the water inside and the water outside meet
function fenceCut(segs,F){if(!F||!segs.length)return segs;var out=[];
 segs.forEach(function(s){var q=s.q,t,run=null,wet,ic,ir,oc,or_;
  for(t=s.a;t<s.b;t++){
   if(s.ed==="r0"){ic=t;ir=q.r0;oc=t;or_=q.r0-1}else if(s.ed==="r1"){ic=t;ir=q.r1-1;oc=t;or_=q.r1}
   else if(s.ed==="c0"){ic=q.c0;ir=t;oc=q.c0-1;or_=t}else{ic=q.c1-1;ir=t;oc=q.c1;or_=t}
   wet=F[wkey(ic,ir)]==="wt"&&F[wkey(oc,or_)]==="wt";
   if(wet){if(run!==null){out.push({ed:s.ed,a:run,b:t,q:q});run=null}}else if(run===null)run=t}
  if(run!==null)out.push({ed:s.ed,a:run,b:s.b,q:q})});
 return out}

