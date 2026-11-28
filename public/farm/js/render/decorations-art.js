// =====================================================
// 18 NEW FARM DECORATIONS
// =====================================================

function drawExtraDecor(p,k){
 var x=p[0],y=p[1],i,a;

 shade(p,30,11,.3);

 // 1. WOODEN PERGOLA
 if(k==="d_pergola"){
  X.fillStyle="#79502d";
  X.fillRect(x-25,y-38,4,40);
  X.fillRect(x+21,y-38,4,40);
  X.fillRect(x-25,y-42,50,5);
  X.fillRect(x-19,y-50,4,10);
  X.fillRect(x-7,y-50,4,10);
  X.fillRect(x+7,y-50,4,10);
  X.fillRect(x+19,y-50,4,10);
  X.strokeStyle="#477a32";X.lineWidth=2;
  X.beginPath();X.moveTo(x-24,y-44);X.quadraticCurveTo(x,y-67,x+24,y-44);X.stroke();
  leaf(x-17,y-49,7,3,-.5,"#4c9b37");
  leaf(x+15,y-49,7,3,.5,"#4c9b37");
  dot(x,y-53,3,"#e95b85");
 }

 // 2. TOPIARY TREE
 else if(k==="d_topiary"){
  poly([[x-13,y],[x+13,y],[x+10,y-13],[x-10,y-13]],"#a66d43","#654020",1);
  X.fillStyle="#79502d";X.fillRect(x-2,y-35,4,23);
  blob(x,y-37,12,["#68b94a","#276c2d"]);
  blob(x-7,y-29,8,["#83ce54","#367c32"]);
  blob(x+7,y-29,8,["#83ce54","#367c32"]);
  dot(x-4,y-39,2,"#f4d65b");
 }

 // 3. ROSE ARCH
 else if(k==="d_rosearch"){
  X.strokeStyle="#5a4a38";X.lineWidth=4;
  X.beginPath();X.moveTo(x-20,y);X.lineTo(x-20,y-38);
  X.quadraticCurveTo(x,y-67,x+20,y-38);
  X.lineTo(x+20,y);X.stroke();
  for(i=0;i<5;i++){
   a=i/4*Math.PI;
   leaf(x+Math.cos(a+Math.PI)*20,y-38-Math.sin(a)*23,6,3,a,"#388b36");
   dot(x+Math.cos(a+Math.PI)*20,y-39-Math.sin(a)*23,3.5,"#e94b72");
  }
  leaf(x-21,y-13,7,3,-.5,"#3e9a37");
  leaf(x+21,y-16,7,3,.5,"#3e9a37");
 }

 // 4. BIRDBATH
 else if(k==="d_birdbath"){
  X.fillStyle="#777d7d";X.fillRect(x-3,y-29,6,27);
  X.fillStyle="#aeb4ad";
  X.beginPath();X.ellipse(x,y-30,17,5,0,0,7);X.fill();
  X.fillStyle="#55a9c8";
  X.beginPath();X.ellipse(x,y-31,13,3,0,0,7);X.fill();
  X.fillStyle="#9ca39c";X.beginPath();X.ellipse(x,y-35,18,4,0,0,7);X.fill();
  X.fillStyle="#6d7470";X.beginPath();X.ellipse(x,y-1,11,3,0,0,7);X.fill();
  dot(x+7,y-42,3,"#d8d5c8");
 }

 // 5. SUNDIAL
 else if(k==="d_sundial"){
  X.fillStyle="#8b887e";X.beginPath();X.ellipse(x,y-4,19,7,0,0,7);X.fill();
  X.fillStyle="#c7bda1";X.beginPath();X.ellipse(x,y-7,17,6,0,0,7);X.fill();
  X.strokeStyle="#8a7957";X.lineWidth=1;
  X.beginPath();X.moveTo(x,y-8);X.lineTo(x+3,y-29);X.lineTo(x+7,y-7);X.stroke();
  X.beginPath();X.moveTo(x-12,y-7);X.lineTo(x+12,y-7);X.moveTo(x,y-12);X.lineTo(x,y-2);X.stroke();
  dot(x,y-8,2,"#6d6047");
 }

 // 6. MUSHROOM CLUSTER
 else if(k==="d_mushroom"){
  function mush(mx,my,s,col){
   X.fillStyle="#f0e5cb";X.fillRect(mx-2*s,my-13*s,4*s,13*s);
   X.fillStyle=col;X.beginPath();
   X.ellipse(mx,my-14*s,9*s,5*s,0,Math.PI,Math.PI*2);X.fill();
   dot(mx-3*s,my-16*s,1.2*s,"#fff2d6");
  }
  mush(x-13,y,1,"#c9473f");
  mush(x+2,y-2,.8,"#e5a33a");
  mush(x+15,y,1.1,"#c9473f");
 }

 // 7. WIND CHIME
 else if(k==="d_windchime"){
  X.strokeStyle="#805b35";X.lineWidth=3;
  X.beginPath();X.moveTo(x-17,y-48);X.lineTo(x+17,y-48);X.stroke();
  X.strokeStyle="#9c9b91";X.lineWidth=1;
  for(i=0;i<4;i++){
   var xx=x-12+i*8;
   X.beginPath();X.moveTo(xx,y-47);X.lineTo(xx+(i%2?2:-2),y-19);X.stroke();
   X.fillStyle="#b6b9b2";X.fillRect(xx-2,y-19,5,9);
  }
  X.strokeStyle="#805b35";X.beginPath();X.moveTo(x,y-48);X.lineTo(x,y-9);X.stroke();
  dot(x,y-7,3,"#d7b46c");
 }

 // 8. GARDEN CART
 else if(k==="d_cart"){
  dot(x-17,y-5,7,"#292929");dot(x-17,y-5,3,"#aeb4b8");
  poly([[x-23,y-28],[x+17,y-28],[x+12,y-8],[x-16,y-8]],"#a85e32","#60391f",1.2);
  X.strokeStyle="#704323";X.lineWidth=3;
  X.beginPath();X.moveTo(x+13,y-10);X.lineTo(x+29,y-23);X.stroke();
  blob(x-10,y-31,6,["#69b84a","#327b32"]);
  blob(x+2,y-34,6,["#79c94d","#367d32"]);
  dot(x-9,y-35,2,"#e94b72");dot(x+3,y-38,2,"#f3cf42");
 }

 // 9. STONE PLANTER
 else if(k==="d_planter"){
  poly([[x-24,y-15],[x+24,y-15],[x+18,y+2],[x-18,y+2]],"#9b9a91","#5b5c56",1.2);
  poly([[x-20,y-18],[x+20,y-18],[x+24,y-13],[x-24,y-13]],"#c0bdb1","#77766c",1);
  for(i=0;i<5;i++){
   var xx=x-15+i*7;
   X.strokeStyle="#397d32";X.lineWidth=2;
   X.beginPath();X.moveTo(xx,y-17);X.lineTo(xx,y-32-(i%2)*5);X.stroke();
   leaf(xx-4,y-28,5,2,-.5,"#4b9d37");
   leaf(xx+4,y-31,5,2,.5,"#5bad3e");
   dot(xx,y-34-(i%2)*5,3,i%2?"#e94c79":"#f2d14c");
  }
 }

 // 10. TULIP GARDEN
 else if(k==="d_tulips"){
  for(i=0;i<5;i++){
   var tx=x-20+i*10,ty=y-8-(i%2)*3;
   X.strokeStyle="#32823a";X.lineWidth=2;
   X.beginPath();X.moveTo(tx,ty);X.lineTo(tx,ty-22);X.stroke();
   leaf(tx-4,ty-10,5,2,-.5,"#4b9c37");
   leaf(tx+4,ty-15,5,2,.5,"#4b9c37");
   dot(tx,ty-24,4,["#e34d68","#f2c747","#e98c39","#d85a91","#f1d44e"][i]);
  }
  X.fillStyle="#77502b";X.fillRect(x-26,y-7,52,5);
 }

 // 11. GARDEN SWING
 else if(k==="d_swing"){
  X.strokeStyle="#80552f";X.lineWidth=4;
  X.beginPath();X.moveTo(x-23,y);X.lineTo(x-17,y-49);X.lineTo(x+17,y-49);X.lineTo(x+23,y);X.stroke();
  X.lineWidth=1.5;
  X.beginPath();X.moveTo(x-12,y-48);X.lineTo(x-12,y-15);
  X.moveTo(x+12,y-48);X.lineTo(x+12,y-15);X.stroke();
  poly([[x-17,y-17],[x+17,y-17],[x+14,y-10],[x-14,y-10]],"#b77b42","#5c3b21",1);
  X.strokeStyle="#e0bd7e";X.lineWidth=1;
  X.beginPath();X.moveTo(x-17,y-49);X.lineTo(x+17,y-49);X.stroke();
 }

 // 12. WATER WHEEL
 else if(k==="d_waterwheel"){
  X.strokeStyle="#79502d";X.lineWidth=4;
  X.beginPath();X.moveTo(x-23,y-2);X.lineTo(x-23,y-33);
  X.moveTo(x+23,y-2);X.lineTo(x+23,y-33);X.stroke();
  X.strokeStyle="#9a6b3d";X.lineWidth=4;
  X.beginPath();X.arc(x,y-24,19,0,7);X.stroke();
  X.strokeStyle="#c69b62";X.lineWidth=2;
  for(i=0;i<8;i++){
   a=i*Math.PI/4;
   X.beginPath();X.moveTo(x,y-24);
   X.lineTo(x+Math.cos(a)*19,y-24+Math.sin(a)*19);X.stroke();
  }
  dot(x,y-24,5,"#79502d");
  X.strokeStyle="#58b7d5";X.lineWidth=2;
  X.beginPath();X.moveTo(x-27,y-3);X.lineTo(x+27,y-3);X.stroke();
 }

 // 13. STONE ARCHWAY
 else if(k==="d_archway"){
  X.fillStyle="#aaa69a";
  X.fillRect(x-25,y-39,10,39);X.fillRect(x+15,y-39,10,39);
  X.strokeStyle="#aaa69a";X.lineWidth=10;
  X.beginPath();X.arc(x,y-39,20,Math.PI,0);X.stroke();
  X.strokeStyle="#d4cec0";X.lineWidth=1;
  X.beginPath();X.moveTo(x-20,y-39);X.lineTo(x-20,y);
  X.moveTo(x+20,y-39);X.lineTo(x+20,y);X.stroke();
  for(i=0;i<4;i++){
   dot(x-21+i*14,y-7,1.5,"#77766e");
  }
 }

 // 14. DECORATIVE FLAGPOLE
 else if(k==="d_flagpole"){
  X.strokeStyle="#77766e";X.lineWidth=3;
  X.beginPath();X.moveTo(x,y);X.lineTo(x,y-62);X.stroke();
  poly([[x+1,y-61],[x+27,y-54],[x+1,y-42]],"#d9483e","#8b2823",1);
  X.fillStyle="#8b887e";X.beginPath();X.ellipse(x,y,7,3,0,0,7);X.fill();
  dot(x,y-64,2.5,"#e3c36e");
 }

 // 15. BUTTERFLY GARDEN
 else if(k==="d_butterfly"){
  for(i=0;i<4;i++){
   var fx=x-18+i*12;
   X.strokeStyle="#34853a";X.lineWidth=1.8;
   X.beginPath();X.moveTo(fx,y);X.lineTo(fx,y-18-(i%2)*5);X.stroke();
   leaf(fx-4,y-12,5,2,-.5,"#4a9a37");
   dot(fx,y-21-(i%2)*5,3,i%2?"#e94b79":"#f2cf42");
  }
  function butterfly(bx,by,c){
   dot(bx-3,by-2,4,c);dot(bx+3,by-2,4,c);
   dot(bx-3,by+3,3,c);dot(bx+3,by+3,3,c);
   X.strokeStyle="#333";X.lineWidth=1;
   X.beginPath();X.moveTo(bx,by-2);X.lineTo(bx,by+5);X.stroke();
  }
  butterfly(x-10,y-43,"#e98ab0");
  butterfly(x+17,y-34,"#79b8e8");
 }

 // 16. GARDEN STATUE
 else if(k==="d_statue"){
  poly([[x-14,y],[x+14,y],[x+11,y-12],[x-11,y-12]],"#85877f","#555950",1);
  X.fillStyle="#aaa99e";X.fillRect(x-7,y-35,14,23);
  dot(x,y-43,8,"#c2c1b6");
  X.fillStyle="#a6a69c";
  X.beginPath();X.ellipse(x,y-35,10,5,0,0,7);X.fill();
  X.strokeStyle="#77796f";X.lineWidth=1;
  X.beginPath();X.moveTo(x-4,y-30);X.lineTo(x-7,y-19);
  X.moveTo(x+4,y-30);X.lineTo(x+7,y-19);X.stroke();
 }

 // 17. WOODEN GARDEN GATE
 else if(k==="d_gate"){
  X.fillStyle="#76502d";
  X.fillRect(x-24,y-38,5,40);X.fillRect(x+19,y-38,5,40);
  X.fillRect(x-19,y-34,38,4);X.fillRect(x-19,y-7,38,4);
  X.strokeStyle="#9d7042";X.lineWidth=2;
  X.beginPath();
  for(i=0;i<5;i++){
   var gx=x-15+i*7.5;
   X.moveTo(gx,y-32);X.lineTo(gx,y-10);
  }
  X.stroke();
  poly([[x-25,y-38],[x-21.5,y-44],[x-18,y-38]],"#9b7448");
  poly([[x+18,y-38],[x+21.5,y-44],[x+25,y-38]],"#9b7448");
 }

 // 18. ROCK GARDEN
 else if(k==="d_rockgarden"){
  var stones=[[-17,-5,9,5],[-3,-11,10,6],[13,-5,9,5],[0,-2,7,4]];
  stones.forEach(function(s){
   X.fillStyle="#aaa99f";
   X.beginPath();X.ellipse(x+s[0],y+s[1],s[2],s[3],-.2,0,7);X.fill();
   X.strokeStyle="rgba(50,50,45,.3)";X.lineWidth=1;
   X.beginPath();X.moveTo(x+s[0]-3,y+s[1]-2);X.lineTo(x+s[0]+3,y+s[1]+2);X.stroke();
  });
  X.strokeStyle="#d5c9a9";X.lineWidth=1;
  for(i=0;i<4;i++){
   X.beginPath();X.ellipse(x,y-4,25-i*3,10-i*1.5,0,0,7);X.stroke();
  }
 }
}

// Register the 18 decorations with the existing renderer.
[
 "d_pergola","d_topiary","d_rosearch","d_birdbath",
 "d_sundial","d_mushroom","d_windchime","d_cart",
 "d_planter","d_tulips","d_swing","d_waterwheel",
 "d_archway","d_flagpole","d_butterfly","d_statue",
 "d_gate","d_rockgarden"
].forEach(function(id){
 DEC[id]=function(p){drawExtraDecor(p,id)};
});

var PHD=false;
function phOf(cv){return !!(cv&&cv.id==="vCanvas"?(V&&V.ph):(S&&S.ph))} // SH0 = width of the beach (doubled)

function drawBack(){var c,r,h=G.TW/2,hh=G.TH/2,x,y;
 if(LOD===1){X.beginPath();
  for(c=VT.c0;c<=VT.c1;c++)for(r=VT.r0;r<=VT.r1;r++){if((c+r)&1||!inLandP(G.P,c,r)||WSET[flKey(c,r)])continue;
   x=G.ox+(c-r)*h;y=G.oy+(c+r)*hh;X.moveTo(x,y);X.lineTo(x+h,y+hh);X.lineTo(x,y+2*hh);X.lineTo(x-h,y+hh);X.closePath()}
  X.fillStyle="rgba(255,255,200,.07)";X.fill()}
 drawFences(0)}
// the shoreline: dry-grass rim, sand beach, wet sand, white foam, turquoise shallows, deep blue sea (like the reference picture)
var SHC={},SH0=7.8; // SH0 = width of the beach (doubled)

function wob(t,d){return(.12*Math.sin(t*.5+.7)+.07*Math.sin(t*1.3+1.5))*Math.min(1,d/5)}
function shoreCurve(n,mode,ex){var key=n+"|"+mode+"|"+ex,C=SHC[key],E,st,P,o,R,ca,s,c,a,g;if(C)return C;
 E=Math.min(34,6+n*.5);st=Math.max(.5,(2*n+2*E)/200);P=[];
 o=mode===2?0:mode===1?.32:SH0+ex;R=mode===2?0:mode===1?.3:Math.max(.3,2.2+.2*(o-1.8));ca=n+o-R;g=mode===0?1:0;
 for(s=-E;s<ca;s+=st)P.push([n+o+g*wob(s,ca-s),s]);
 for(a=0;a<1.5708;a+=.08)P.push([ca+R*Math.cos(a),ca+R*Math.sin(a)]);
 P.push([ca,n+o]);
 for(c=ca;c>-E;c-=st)P.push([c,n+o+g*wob(2*n-c,ca-c)]);
 P.push([-E,n+o]);
 P.push([-E,2*n+90],[2*n+90,2*n+90],[2*n+90,-E]);return SHC[key]=P}
function drawSeaOld(){var n=G.cols,t=Date.now()/1000,s,q,
 LY=[[2,0,"#b9c458"],[1,0,"#efdba8"],[0,-2.2,"#ead298"],[0,-.9,"#dfc58c"],[0,0,"#ffffff"],[0,.12,"#b4f6ee"],[0,.7,"#86eede"],[0,1.4,"#5cdcd4"],[0,2.1,"#44c8d4"],[0,2.8,"#33acd2"],[0,3.4,"#2b92c8"],[0,3.9,"#2a7db4"]],
 vis=function(p){return p[0]>VW.x0-40&&p[0]<VW.x1+40&&p[1]>VW.y0-60&&p[1]<VW.y1+60},
 at=function(u,d){var w=SH0+wob(u,99)+d;return u<=n?Pp(n+w,u):Pp(2*n-u,n+w)};
 LY.forEach(function(o){poly(shoreCurve(n,o[0],o[1]).map(function(p){return Pp(p[0],p[1])}),o[2])});
 if(LOD>1)return;
 X.lineCap="round";
 for(s=-10;s<2*n+10;s+=11){q=at(s,3.5+.15*Math.sin(t*.7+s));if(!vis(q))continue;X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1.6;X.beginPath();X.moveTo(q[0]-9,q[1]+1);X.quadraticCurveTo(q[0],q[1]-3,q[0]+10,q[1]);X.stroke()}
 for(s=-10;s<2*n+10;s+=3.7){q=at(s,5+3.5*Math.abs(Math.sin(s*2.3))+.2*Math.sin(t*.6+s));if(!vis(q))continue;
  X.strokeStyle="rgba(255,255,255,.26)";X.lineWidth=1.3;X.beginPath();X.moveTo(q[0]-11,q[1]);X.quadraticCurveTo(q[0]-4,q[1]-5,q[0]+2,q[1]);X.quadraticCurveTo(q[0]+7,q[1]+5,q[0]+13,q[1]);X.stroke()}
 X.lineCap="butt"}
function isleShape(q,o){var k="i"+q.c0+","+q.c1+","+q.r0+","+q.r1+"|"+o,P,cs,i,j,a;if(SHC[k])return SHC[k];P=[];
 cs=[[q.c0,q.r0,Math.PI],[q.c1,q.r0,Math.PI*1.5],[q.c1,q.r1,0],[q.c0,q.r1,Math.PI*.5]];
 for(i=0;i<4;i++){if(!o){P.push([cs[i][0],cs[i][1]]);continue}for(j=0;j<=10;j++){a=cs[i][2]+j*Math.PI/20;P.push([cs[i][0]+o*Math.cos(a),cs[i][1]+o*Math.sin(a)])}}
 return SHC[k]=P}
function isleRaw(q,o){var P=[],cs=[[q.c0,q.r0,Math.PI],[q.c1,q.r0,Math.PI*1.5],[q.c1,q.r1,0],[q.c0,q.r1,Math.PI*.5]],i,j,a;
 for(i=0;i<4;i++)for(j=0;j<=10;j++){a=cs[i][2]+j*Math.PI/20;P.push([cs[i][0]+o*Math.cos(a),cs[i][1]+o*Math.sin(a)])}
 return P}
 function parVis(r,m){var a=Pp(r.c0-m,r.r0-m),b=Pp(r.c1+m,r.r0-m),c=Pp(r.c1+m,r.r1+m),d=Pp(r.c0-m,r.r1+m);
 return Math.max(a[0],b[0],c[0],d[0])>VW.x0&&Math.min(a[0],b[0],c[0],d[0])<VW.x1&&Math.max(a[1],b[1],c[1],d[1])>VW.y0&&Math.min(a[1],b[1],c[1],d[1])<VW.y1}
function drawSea(){var jungSea=(X.canvas.id==="vCanvas"?(V&&V.sc):(S&&S.sc))==="jungle",t=Date.now()/1000,i,s,q,pd=220,
 LY=[[0,"#efdba8"],[.64,"#efdba8"],[3.4,"#ead298"],[6,"#dfc58c"],[7.8,"#ffffff"],[8.04,"#b4f6ee"],[9.2,"#86eede"],[10.6,"#5cdcd4"],[12,"#44c8d4"],[13.4,"#33acd2"],[14.6,"#2b92c8"],[15.6,"#2a7db4"]];
 function vis(p){return p[0]>VW.x0-40&&p[0]<VW.x1+40&&p[1]>VW.y0-60&&p[1]<VW.y1+60}
 function path(a){X.beginPath();a.forEach(function(p,j){var z=Pp(p[0],p[1]);j?X.lineTo(z[0],z[1]):X.moveTo(z[0],z[1])});X.closePath()}
 function fillP(a,c){path(a);X.fillStyle=c;X.fill()}
 function strokeP(a,c,lw){path(a);X.strokeStyle=c;X.lineWidth=lw;X.stroke()}
 X.fillStyle=jungSea?jungleFill():LY[LY.length-1][1];X.fillRect(VW.x0-pd,VW.y0-pd,VW.x1-VW.x0+2*pd,VW.y1-VW.y0+2*pd);
 var LL=LOD>1?[LY[0],LY[2],LY[4],LY[6],LY[8],LY[11]]:LY;
 if(!jungSea)for(i=LL.length-1;i>0;i--)G.P.forEach(function(r){if(!parVis(r,LL[i][0]+1))return;fillP(isleShape(r,LL[i][0]),LL[i-1][1])});
 if(LOD===1&&!jungSea)G.P.forEach(function(r){if(!parVis(r,14))return;
  strokeP(isleRaw(r,7.9+.6*Math.sin(t*.9)),"rgba(255,255,255,"+(.5+.2*Math.sin(t*.9+1)).toFixed(2)+")",2.2);
strokeP(isleRaw(r,9.8+.8*Math.sin(t*.7+1.6)),"rgba(255,255,255,.28)",1.6);
X.setLineDash([16,12]);X.lineDashOffset=-t*9;
strokeP(isleRaw(r,12+.9*Math.sin(t*.55+3)),"rgba(255,255,255,.22)",1.4);
  X.setLineDash([]);X.lineDashOffset=0});
 // Soft underwater shadow + thin shoreline edge around each land.
 // Drawn BEFORE the cut-out so the parts that fall on land (the line where two lands touch) get erased.
 G.P.forEach(function(r){
  if(!parVis(r,1))return;
  strokeP(isleRaw(r,.20),"rgba(150,120,70,.3)",7);
  strokeP(isleRaw(r,.06),"rgba(239,219,168,.9)",2);
 });
 // Cut ALL lands out of the ocean as ONE shape, so touching lands leave no seam
 X.globalCompositeOperation="destination-out";
 X.beginPath();
  G.P.forEach(function(r){if(!parVis(r,2))return;isleShape(r,0).forEach(function(p,j){var z=Pp(p[0],p[1]);j?X.lineTo(z[0],z[1]):X.moveTo(z[0],z[1])});X.closePath()});
 X.fillStyle="#000";X.fill();
 X.globalCompositeOperation="source-over";
 if(LOD>1)return;
 X.lineCap="round";
 FS.forEach(function(sg){var r=sg.q;
  function at(u,d){var w=SH0+d;return sg.ed==="r0"?Pp(u,r.r0-w):sg.ed==="r1"?Pp(u,r.r1+w):sg.ed==="c0"?Pp(r.c0-w,u):Pp(r.c1+w,u)}
  for(s=sg.a+1;s<sg.b;s+=4){q=at(s,3.5+.15*Math.sin(t*.7+s));if(!vis(q))continue;X.strokeStyle="rgba(255,255,255,.5)";X.lineWidth=1.6;X.beginPath();X.moveTo(q[0]-9,q[1]+1);X.quadraticCurveTo(q[0],q[1]-3,q[0]+10,q[1]);X.stroke()}
  for(s=sg.a;s<=sg.b;s+=3.7){q=at(s,5+3.5*Math.abs(Math.sin(s*2.3))+.2*Math.sin(t*.6+s));if(!vis(q))continue;
   X.strokeStyle="rgba(255,255,255,.26)";X.lineWidth=1.3;X.beginPath();X.moveTo(q[0]-11,q[1]);X.quadraticCurveTo(q[0]-4,q[1]-5,q[0]+2,q[1]);X.quadraticCurveTo(q[0]+7,q[1]+5,q[0]+13,q[1]);X.stroke()}});
 X.lineCap="butt"}

 var FS=[],WBX=null,LMAX=60;
function landRect(L){var i=L.i,j=L.j,z=L.z,n,c1,r1;if(i===undefined){n=L.n||0;if(L.s==="R"){i=0;j=n+1}else{i=n+1;j=0}}c1=LMAX-LMAX*i;r1=LMAX-LMAX*j;return{c0:c1-z,c1:c1,r0:r1-z,r1:r1}}
var CR=0,RC=[0,0]; // CR = current view rotation 0-3, RC = centre it turns around
function rpx(cr,rc,c,r){var dc=c-rc[0],dr=r-rc[1];return cr===1?[rc[0]-dr,rc[1]+dc]:cr===2?[rc[0]-dc,rc[1]-dr]:cr===3?[rc[0]+dr,rc[1]-dc]:[c,r]}
function rp(c,r){return rpx(CR,RC,c,r)}
function ur(c,r){return rpx((4-CR)&3,RC,c,r)}
function rtile(c,r){var p=rp(c+.5,r+.5);return[Math.round(p[0]-.5),Math.round(p[1]-.5)]}   // world tile -> view tile
function utile(c,r){var p=ur(c+.5,r+.5);return[Math.round(p[0]-.5),Math.round(p[1]-.5)]}   // view tile -> world tile
function rtv(g,c,r){if(!g.cr)return[c,r];var p=rpx(g.cr,g.rc,c+.5,r+.5);return[Math.round(p[0]-.5),Math.round(p[1]-.5)]}
function rotOf(cv){return 0}
function setRot(cv){CR=rotOf(cv);if(CR){var B=wbox0(szOf(cv),LSof(cv));RC=[Math.round((B.c0+B.c1)/2),Math.round((B.r0+B.r1)/2)]}}
function parcels0(n,ls){var P=[{c0:0,c1:n,r0:0,r1:n}];(ls||[]).forEach(function(L){P.push(landRect(L))});return P}
function parcels(n,ls){var P=parcels0(n,ls);if(!CR)return P;return P.map(function(q){var a=rp(q.c0,q.r0),b=rp(q.c1,q.r1);return{c0:Math.min(a[0],b[0]),c1:Math.max(a[0],b[0]),r0:Math.min(a[1],b[1]),r1:Math.max(a[1],b[1])}})}
function inLandP(P,c,r){for(var i=0;i<P.length;i++){var q=P[i];if(c>=q.c0&&c<q.c1&&r>=q.r0&&r<q.r1)return true}return false}
function wbox0(n,ls){var B={c0:0,c1:n,r0:0,r1:n};(ls||[]).forEach(function(L){var q=landRect(L);B.c0=Math.min(B.c0,q.c0);B.c1=Math.max(B.c1,q.c1);B.r0=Math.min(B.r0,q.r0);B.r1=Math.max(B.r1,q.r1)});return B}
function wbox(n,ls){var P=parcels(n,ls),B={c0:1e9,c1:-1e9,r0:1e9,r1:-1e9};P.forEach(function(q){B.c0=Math.min(B.c0,q.c0);B.c1=Math.max(B.c1,q.c1);B.r0=Math.min(B.r0,q.r0);B.r1=Math.max(B.r1,q.r1)});return B}
function parS(){var k=(S.sz||8)+(S.ls||[]).map(function(L){return L.i+"_"+L.j+"_"+L.z}).join();if(parS.k!==k){parS.k=k;parS.v=parcels0(S.sz||8,S.ls)}return parS.v}
function LSof(cv){return cv&&cv.id==="vCanvas"?(V&&V.ls):(S&&S.ls)}
function fenceSegs(P){var out=[];
 P.forEach(function(q,i){[["r0",q.c0,q.c1],["r1",q.c0,q.c1],["c0",q.r0,q.r1],["c1",q.r0,q.r1]].forEach(function(e){var ed=e[0],cut=[[e[1],e[2]]];
  P.forEach(function(o,j){if(j===i)return;var a,b;
   if(ed==="r0"&&o.r1===q.r0){a=o.c0;b=o.c1}else if(ed==="r1"&&o.r0===q.r1){a=o.c0;b=o.c1}else if(ed==="c0"&&o.c1===q.c0){a=o.r0;b=o.r1}else if(ed==="c1"&&o.c0===q.c1){a=o.r0;b=o.r1}else return;
   var nc=[];cut.forEach(function(s){if(b<=s[0]||a>=s[1]){nc.push(s);return}if(a>s[0])nc.push([s[0],a]);if(b<s[1])nc.push([b,s[1]])});cut=nc});
  cut.forEach(function(s){out.push({ed:ed,a:s[0],b:s[1],q:q})})})});
 return out}
function drawFences(front){if(PHD)return;FS.forEach(function(s){var fr=s.ed==="r1"||s.ed==="c1";if(fr!==!!front)return;var q=s.q,A,B,r,c;
 if(s.ed==="r0"||s.ed==="r1"){r=s.ed==="r0"?q.r0:q.r1;A=Pp(s.a,r);B=Pp(s.b,r)}else{c=s.ed==="c0"?q.c0:q.c1;A=Pp(c,s.a);B=Pp(c,s.b)}
 if(PFN!=="wood"&&FSTY[PFN])fenceP(s,front);else fence(A,B,Math.round((s.b-s.a)*2),front)})}

function drawFront(){drawFences(1)}

var PLS=[];[.25,.5,.75].forEach(function(f){[.22,.5,.78].forEach(function(r){PLS.push([f,r])})});PLS.sort(function(a,b){return a[0]+a[1]-b[0]-b[1]});
function plant(id,q,pr,ripe,t,big){if(!big){plant0(id,q,pr,ripe,t);return}X.save();X.translate(q[0],q[1]);X.scale(1.35,1.35);X.translate(-q[0],-q[1]);plant0(id,q,pr,ripe,t);X.restore()}
function bpath(x,y,r){X.beginPath();X.moveTo(x,y+1.45*r);X.bezierCurveTo(x-1.5*r,y+.4*r,x-1.15*r,y-1*r,x,y-.75*r);X.bezierCurveTo(x+1.15*r,y-1*r,x+1.5*r,y+.4*r,x,y+1.45*r);X.closePath()}
function berry(x,y,r,ripe){X.fillStyle=ripe?"#c8182a":"#a9cf72";bpath(x,y,r);X.fill();X.fillStyle=ripe?"#ff5a55":"#dcefb4";bpath(x-r*.2,y-r*.2,r*.66);X.fill();
 if(ripe){X.fillStyle="#ffe58a";[[-.55,-.2],[.5,-.25],[0,.05],[-.35,.6],[.35,.55],[0,-.55],[0,.95]].forEach(function(o){X.beginPath();X.ellipse(x+o[0]*r,y+o[1]*r,r*.1,r*.15,0,0,7);X.fill()})}
 [-2.7,-2.1,-1.57,-1.05,-.45].forEach(function(a){leaf(x+Math.cos(a)*r*.5,y-r*.7+Math.sin(a)*r*.22,r*.55,r*.2,a,"#3a9a2e")});
 if(ripe)leaf(x-r*.45,y-r*.25,r*.13,r*.3,.5,"rgba(255,255,255,.55)")}
function tom(x,y,r,ripe){X.fillStyle=ripe?"#b81414":"#5c9a32";X.beginPath();X.ellipse(x,y,r*1.08,r*.95,0,0,7);X.fill();
 X.fillStyle=ripe?"#ee3a2c":"#8cc654";X.beginPath();X.ellipse(x-r*.12,y-r*.1,r*.88,r*.78,0,0,7);X.fill();
 [-2.8,-2.2,-1.57,-.95,-.35].forEach(function(a){leaf(x+Math.cos(a)*r*.4,y-r*.8+Math.sin(a)*r*.15,r*.5,r*.17,a,"#2f8a2a")});
 dot(x,y-r*.88,r*.13,"#1f6a20");leaf(x-r*.42,y-r*.32,r*.2,r*.34,.7,"rgba(255,255,255,.55)")}
function egg(x,y,r,ripe){X.fillStyle=ripe?"#35104f":"#6f9c42";X.beginPath();X.moveTo(x,y-r*.7);X.bezierCurveTo(x+r*1.35,y-r*.4,x+r*1.2,y+r*2.3,x,y+r*2.5);X.bezierCurveTo(x-r*1.2,y+r*2.3,x-r*1.35,y-r*.4,x,y-r*.7);X.fill();
 X.fillStyle=ripe?"#64288a":"#a2cc70";X.beginPath();X.ellipse(x-r*.25,y+r*.8,r*.5,r*1.3,.08,0,7);X.fill();
 leaf(x-r*.5,y+r*.4,r*.14,r*.75,.1,"rgba(255,255,255,.5)");
 leaf(x,y-r*.65,r,r*.38,0,"#3a8a2c");leaf(x-r*.55,y-r*.5,r*.4,r*.25,.6,"#46a035");leaf(x+r*.55,y-r*.5,r*.4,r*.25,-.6,"#46a035");
 X.fillStyle="#2a6a20";X.fillRect(x-r*.12,y-r*1.4,r*.24,r*.8)}
function trif(x,y,L,rot,c){[-.6,0,.6].forEach(function(d){var an=rot+d,ex=x+Math.cos(an)*L,ey=y+Math.sin(an)*L*.5;leaf((x+ex)/2,(y+ey)/2-1,L*.55,L*.3,Math.atan2(ey-y,ex-x),c);X.strokeStyle="rgba(255,255,255,.28)";X.lineWidth=.7;X.beginPath();X.moveTo(x,y-1);X.lineTo(ex,ey-1);X.stroke()})}
function cob(x,y){leaf(x,y-6,3.2,7,.1,"#e9b92b");X.fillStyle="#ffd95e";for(var i=0;i<4;i++)for(var j=-1;j<=1;j++){X.beginPath();X.arc(x+j*1.8+.2,y-10+i*3,.85,0,7);X.fill()}
 leaf(x-3,y-3,2.4,6.5,.3,"#5fa23a");leaf(x+3,y-3,2.4,6.5,-.3,"#4c8f30");leaf(x,y-1,2,4.5,0,"#6db144");
 X.strokeStyle="#8a5a2a";X.lineWidth=1;X.beginPath();X.moveTo(x,y-12);X.lineTo(x+1,y-15);X.moveTo(x+1,y-12);X.lineTo(x+3,y-14);X.stroke()}
function pump(x,y){[[-4.4,"#c85f0a"],[4.4,"#c85f0a"],[-2.2,"#e5801a"],[2.2,"#e5801a"],[0,"#f59a32"]].forEach(function(o){leaf(x+o[0],y-4.5,o[0]?4.4:3.8,5.6,0,o[1])});
 X.strokeStyle="rgba(110,45,0,.35)";X.lineWidth=.9;[-4,-2,0,2,4].forEach(function(o){X.beginPath();X.moveTo(x+o*.8,y-9.6);X.quadraticCurveTo(x+o*1.4,y-4.5,x+o*.8,y+.6);X.stroke()});
 X.strokeStyle="#5f7f2c";X.lineWidth=2;X.beginPath();X.moveTo(x,y-9.6);X.quadraticCurveTo(x+1,y-12.5,x+3.2,y-12.5);X.stroke();leaf(x-2.5,y-7,1.8,3.2,.4,"rgba(255,255,255,.35)")}
function melon(x,y){leaf(x,y-4.5,9.5,6,0,"#1e6a2a");X.strokeStyle="#79c466";X.lineWidth=1.4;
 [-6,-3,0,3,6].forEach(function(o){var yo=Math.sqrt(Math.max(0,1-o*o/90))*5.6;X.beginPath();X.moveTo(x+o,y-4.5-yo);X.quadraticCurveTo(x+o*1.3,y-4.5,x+o,y-4.5+yo);X.stroke()});
 leaf(x-3.5,y-7.5,3,1.5,-.4,"rgba(255,255,255,.4)")}
var NEWC={};"carrot potato onion cabbage lettuce radish cucumber pepper chili peas broccoli cauliflower garlic beet sunflower blueberry grape pineapple wheat rice ginger raspberry".split(" ").forEach(function(k){NEWC[k]=1});
function stem2(x,y,ex,ey,c,lw){X.strokeStyle=c;X.lineWidth=lw;X.beginPath();X.moveTo(x,y);X.lineTo(ex,ey);X.stroke()}
function rosette(x,y,n,rx,ry,c1,c2,lift){for(var k=0;k<n;k++){var an=k*6.283/n+.4;leaf(x+Math.cos(an)*rx*.55,y-(lift||2)+Math.sin(an)*ry*.5,rx,ry,an,k%2?c1:c2)}}
function spud(x,y,r){X.fillStyle="#9a6e36";X.beginPath();X.ellipse(x,y,r*1.25,r,.2,0,7);X.fill();X.fillStyle="#c79a58";X.beginPath();X.ellipse(x-r*.2,y-r*.2,r*.9,r*.65,.2,0,7);X.fill();dot(x+r*.4,y,r*.12,"#5a3a18");dot(x-r*.5,y+r*.25,r*.12,"#5a3a18")}
function cuke(x,y,sc,rot){X.save();X.translate(x,y);X.rotate(rot);X.fillStyle=lg(-2.4*sc,0,2.4*sc,0,[[0,"#1d5a24"],[.4,"#4ea63a"],[1,"#1f5a26"]]);X.beginPath();X.ellipse(0,3*sc,2.4*sc,6.5*sc,0,0,7);X.fill();X.fillStyle="rgba(210,240,150,.5)";for(var i=0;i<4;i++)X.fillRect(-.3,-1.5*sc+i*2.6*sc,.6,1.4*sc);dot(0,-3.4*sc,1*sc,"#d9c23a");X.restore()}
function bellp(x,y,r,ripe){X.fillStyle=ripe?"#b5121c":"#2f8a2c";X.beginPath();X.moveTo(x-r*1.05,y-r*.5);X.quadraticCurveTo(x-r*1.3,y+r*1.1,x-r*.5,y+r*1.5);X.quadraticCurveTo(x,y+r*1.75,x+r*.5,y+r*1.5);X.quadraticCurveTo(x+r*1.3,y+r*1.1,x+r*1.05,y-r*.5);X.quadraticCurveTo(x,y-r*.9,x-r*1.05,y-r*.5);X.fill();
 X.fillStyle=ripe?"#f03a38":"#62b83e";X.beginPath();X.ellipse(x-r*.2,y+r*.2,r*.55,r*.95,0,0,7);X.fill();X.strokeStyle="rgba(0,0,0,.25)";X.lineWidth=.8;X.beginPath();X.moveTo(x-r*.5,y-r*.5);X.quadraticCurveTo(x-r*.7,y+r,x-r*.3,y+r*1.5);X.moveTo(x+r*.5,y-r*.5);X.quadraticCurveTo(x+r*.7,y+r,x+r*.3,y+r*1.5);X.stroke();
 leaf(x-r*.55,y,r*.15,r*.45,.2,"rgba(255,255,255,.55)");X.strokeStyle="#3a7a24";X.lineWidth=1.6;X.beginPath();X.moveTo(x,y-r*.7);X.lineTo(x+r*.2,y-r*1.2);X.stroke()}
function pod(x,y,sc,sd){var d=sd>0?1:-1;X.lineCap="round";[["#3a8a2a",3.2],["#7cc850",1.8]].forEach(function(o){X.strokeStyle=o[0];X.lineWidth=o[1]*sc;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+d*3*sc,y+4*sc,x+d*sc,y+8*sc);X.stroke()});X.lineCap="butt";for(var i=0;i<3;i++)dot(x+d*1.2*sc,y+(1.8+i*2.4)*sc,.5*sc,"rgba(30,90,20,.5)")}
function bunch(x,y,sc,ripe){var rows=[[0],[-1,1],[-1.8,0,1.8],[-1.2,1.2],[0]],c1=ripe?"#4a1d78":"#8cba58",c2=ripe?"#8a58c0":"#c8e08c";stem2(x,y-2,x,y-5*sc,"#6a8a3a",1);
 rows.forEach(function(r,i){r.forEach(function(o){dot(x+o*1.6*sc,y+i*2.6*sc,1.9*sc,c1);dot(x+o*1.6*sc-.5*sc,y+i*2.6*sc-.6*sc,.8*sc,c2)})})}
function rasp(x,y,r,ripe){var c=ripe?"#c8123a":"#9acb64",c2=ripe?"#f04a62":"#c8e498";
 [[0,-.9],[-.9,0],[.9,0],[0,0],[-.5,.85],[.5,.85],[0,1.6]].forEach(function(o){dot(x+o[0]*r*.8,y+o[1]*r*.8,r*.62,c);dot(x+o[0]*r*.8-r*.18,y+o[1]*r*.8-r*.2,r*.25,c2)});leaf(x,y-r*1.3,r*.9,r*.35,0,"#3a9a2e")}
function newCrop(id,x,y,pr,ripe,w,s){var k,j,an,ex,ey,h,c,A="#3f9a2c",B="#62b83e";
 if(id==="carrot"){for(k=0;k<6;k++){an=-1.57+(k-2.5)*.3;ex=x+Math.cos(an)*15*s+w;ey=y-1+Math.sin(an)*15*s;c=k%2?"#4a9a2a":"#6cbd40";stem2(x,y-1,ex,ey,c,1);
   for(j=1;j<5;j++){leaf(x+(ex-x)*j/5,y-1+(ey-y+1)*j/5,2.6*s+.6,.9*s+.3,an+1.1,c);leaf(x+(ex-x)*j/5,y-1+(ey-y+1)*j/5,2.6*s+.6,.9*s+.3,an-1.1,c)}}
  if(pr>.5){var cw=ripe?3.4:1.4+(pr-.5)*5,cl=ripe?9:3+(pr-.5)*8;poly([[x-cw,y-1],[x+cw,y-1],[x+cw*.3,y-1+cl],[x-cw*.3,y-1+cl]],lg(x-cw,0,x+cw,0,[[0,"#c95a08"],[.45,"#f59a2a"],[1,"#d9700e"]]));
   X.fillStyle="#f5a23a";X.beginPath();X.ellipse(x,y-1,cw,cw*.4,0,0,7);X.fill();X.strokeStyle="rgba(120,50,0,.4)";X.lineWidth=.7;
   for(j=1;j<4;j++){X.beginPath();X.moveTo(x-cw*(1-j*.2),y-1+cl*j/4);X.lineTo(x+cw*(1-j*.2),y-1+cl*j/4);X.stroke()}}return}
 if(id==="potato"){for(k=0;k<5;k++){an=-1.57+(k-2)*.45;ex=x+Math.cos(an)*11*s+w;ey=y+Math.sin(an)*11*s-1;stem2(x,y,ex,ey,"#4a8a2a",1.2);
   for(j=0;j<3;j++)leaf(x+(ex-x)*(.45+j*.28)+(j%2?2:-2),y+(ey-y)*(.45+j*.28),3.4*s+.8,1.8*s+.5,an+(j%2?.6:-.6),k%2?A:B);leaf(ex,ey,3.2*s+.8,2*s+.5,an,B)}
  if(pr>.5&&!ripe)for(k=0;k<3;k++)dot(x+(k-1)*3+w*.4,y-8*s-k%2*2,1.3,k%2?"#fff":"#c9a8f0");
  if(ripe){spud(x-3.5,y+1,2.8);spud(x+3,y+1.8,3.2);spud(x,y+3.2,2.4)}return}
 if(id==="onion"){for(k=0;k<7;k++){ex=x+(k-3)*1.6*s+w*(k/7);stem2(x+(k-3)*.6,y-2,ex,y-2-17*s*(.75+.25*Math.sin(k*2)),k%2?"#5aa82e":"#3f8a22",1.5)}
  if(pr>.4){var r=ripe?4.6:1.6+pr*3.2;X.fillStyle=ripe?"#a8641a":"#bcd27c";X.beginPath();X.ellipse(x,y-r*.6,r,r*.9,0,0,7);X.fill();X.fillStyle=ripe?"#e3a847":"#e8f3c0";X.beginPath();X.ellipse(x-r*.2,y-r*.75,r*.7,r*.65,0,0,7);X.fill();
   X.strokeStyle=ripe?"rgba(120,60,10,.45)":"rgba(90,130,40,.4)";X.lineWidth=.7;for(k=-1;k<=1;k++){X.beginPath();X.moveTo(x+k*r*.5,y-r*1.4);X.quadraticCurveTo(x+k*r*1.05,y-r*.6,x+k*r*.5,y);X.stroke()}
   X.strokeStyle=ripe?"#8a5516":"#9bbf5a";X.lineWidth=1.2;X.beginPath();X.moveTo(x,y-r*1.45);X.lineTo(x+.5,y-r*1.9);X.stroke()}return}
 if(id==="cabbage"){var R=3+5*s;rosette(x,y,7,R,R*.55,"#3f8a3a","#52a04a",1);
  if(pr>.35){var hr=ripe?5.6:1.5+pr*5;blob(x,y-hr*.7,hr,ripe?["#d6efae","#79b04a"]:["#a8d878","#5e9c3e"]);
   if(ripe){X.strokeStyle="rgba(60,110,40,.5)";X.lineWidth=.8;X.beginPath();X.arc(x,y-hr*.7,hr*.7,3.6,5.8);X.stroke();X.beginPath();X.arc(x,y-hr*.7,hr*.4,.5,2.6);X.stroke();leaf(x-hr*.35,y-hr*1.1,hr*.25,hr*.4,.6,"rgba(255,255,255,.45)")}}return}
 if(id==="lettuce"){var R2=3+5.5*s;rosette(x,y,9,R2,R2*.5,"#4fae3a","#7bd04e",1.5);rosette(x,y-1.5,6,R2*.7,R2*.38,"#8fdc5c","#b5ec7c",2);
  if(ripe){dot(x,y-4,R2*.35,"#d9f5a0");X.strokeStyle="rgba(255,255,255,.45)";X.lineWidth=.7;for(k=0;k<5;k++){X.beginPath();X.moveTo(x,y-3);X.lineTo(x+Math.cos(k*1.26)*R2*.75,y-3+Math.sin(k*1.26)*R2*.35);X.stroke()}}return}
 if(id==="radish"){rosette(x,y,6,2.6+4*s,1.4+1.6*s,"#3f8a2c","#58a83a",3);
  if(pr>.4){var rr=ripe?3.4:1.2+pr*2.8;dot(x,y-rr*.4,rr,"#d9223a");X.fillStyle="#f2f2ea";X.beginPath();X.moveTo(x-rr*.3,y+rr*.2);X.lineTo(x,y+rr*1.6);X.lineTo(x+rr*.3,y+rr*.2);X.fill();leaf(x-rr*.35,y-rr*.8,rr*.22,rr*.38,.6,"rgba(255,255,255,.5)")}return}
 if(id==="cucumber"){h=18*s;stem2(x,y,x+w,y-h,"#4a8a2a",1.4);
  for(k=0;k<4;k++){ex=x+w*(k/4)+(k%2?4:-4)*s;leaf(ex,y-h*(.3+k*.2),4.6*s+1,3.6*s+.8,k%2?.4:-.4,k%2?A:"#2f7d2c");X.strokeStyle="rgba(200,240,170,.4)";X.lineWidth=.6;X.beginPath();X.moveTo(ex-3*s,y-h*(.3+k*.2));X.lineTo(ex+3*s,y-h*(.3+k*.2));X.stroke()}
  if(pr>.5&&pr<=.7)dot(x+w*.5+3,y-h*.5,1.7,"#ffd23a");
  if(pr>.7)[[-5,-4,.3],[5,-7,-.25]].forEach(function(o){cuke(x+o[0]+w*.4,y+o[1],ripe?1:.55+(pr-.7)*1.2,o[2])});return}
 if(id==="pepper"){h=22*s;stem2(x,y,x+w*.6,y-h,"#4f8a2a",1.8);for(k=0;k<5;k++){ex=x+w*(.1+k*.1);leaf(ex+(k%2?4:-4)*s,y-h*(.2+k*.17),4*s+.8,2*s+.5,k%2?-.5:.5,k%2?A:B)}
  if(pr>.5&&pr<=.7)dot(x+w*.4+3,y-h*.6,1.5,"#fff");
  if(pr>.7)[[-4,-7],[4.5,-11]].forEach(function(o){bellp(x+o[0]+w*.4,y+o[1],ripe?3:1.8+(pr-.7)*4,ripe)});return}
 if(id==="chili"){h=20*s;stem2(x,y,x+w*.6,y-h,"#4f8a2a",1.6);for(k=0;k<5;k++){ex=x+w*(.1+k*.1);leaf(ex+(k%2?4:-4)*s,y-h*(.2+k*.17),3.6*s+.8,1.6*s+.5,k%2?-.5:.5,k%2?A:B)}
  if(pr>.7)[[-4,-6,1],[5,-9,-1],[-1,-13,1]].forEach(function(o){var cx=x+o[0]+w*.4,cy=y+o[1],L=ripe?7:3+(pr-.7)*13;X.lineCap="round";
   X.strokeStyle=ripe?"#d6182a":"#4a9a2a";X.lineWidth=ripe?2.6:1.8;X.beginPath();X.moveTo(cx,cy);X.quadraticCurveTo(cx+o[2]*2.2,cy+L*.55,cx+o[2]*L*.35,cy+L);X.stroke();
   X.strokeStyle=ripe?"rgba(255,140,120,.6)":"rgba(200,240,150,.5)";X.lineWidth=.8;X.beginPath();X.moveTo(cx-.6,cy+1);X.quadraticCurveTo(cx+o[2]*1.8,cy+L*.5,cx+o[2]*L*.3,cy+L*.85);X.stroke();X.lineCap="butt";dot(cx,cy-.8,1.2,"#2f7a24")});return}
 if(id==="peas"){h=24*s;stem2(x-4,y+1,x-4,y-h-3,"#a98a55",1.4);stem2(x+4,y+1,x+4,y-h-3,"#a98a55",1.4);X.strokeStyle="rgba(230,220,190,.6)";X.lineWidth=.6;X.beginPath();X.moveTo(x-4,y-h*.5);X.lineTo(x+4,y-h*.5);X.moveTo(x-4,y-h*.85);X.lineTo(x+4,y-h*.85);X.stroke();
  X.strokeStyle="#4f8a2a";X.lineWidth=1.3;X.beginPath();X.moveTo(x,y);X.bezierCurveTo(x-5+w,y-h*.3,x+5+w,y-h*.6,x+w,y-h);X.stroke();
  for(k=0;k<6;k++)leaf(x+w*(k/6)+(k%2?3.5:-3.5)*s,y-h*(.12+k*.15),3.2*s+.7,1.9*s+.4,k%2?-.6:.6,k%2?A:B);
  if(pr>.5&&pr<=.7)[[-3,-.5],[3,-.7]].forEach(function(o){dot(x+o[0],y+o[1]*h,1.4,"#fff")});
  if(pr>.7)[[-3.5,-.35],[3.5,-.55],[-3,-.75]].forEach(function(o){pod(x+o[0]+w*.3,y+o[1]*h,ripe?1:.5+(pr-.7)*1.6,o[0])});return}
 if(id==="broccoli"){rosette(x,y,7,3.6+5*s,1.8+2.4*s,"#2f7d3a","#3f9a48",1);
  if(pr>.35){var h2=ripe?5.4:1.6+pr*4.6;stem2(x,y-1,x,y-h2*.6-1,"#9cc86a",2.2);
   for(k=0;k<9;k++){an=k*.7;blob(x+Math.cos(an)*h2*.55,y-h2*.9-1+Math.sin(an)*h2*.28-(k%3)*h2*.12,h2*.5,ripe?["#4aa53c","#1f6a2a"]:["#6cbc58","#3a8a3a"])}
   blob(x,y-h2*1.25-1,h2*.5,ripe?["#5cbc4a","#2a7a30"]:["#7acc66","#4a9a44"]);
   if(ripe)for(k=0;k<14;k++)dot(x+Math.sin(k*2.3)*h2*.85,y-h2-1+Math.cos(k*1.7)*h2*.5,.5,"rgba(160,230,120,.7)")}return}
 if(id==="cauliflower"){rosette(x,y,7,3.6+5*s,1.8+2.4*s,"#4a9a40","#62b858",1);
  if(pr>.35){var h3=ripe?5.4:1.6+pr*4.6;
   for(k=0;k<9;k++){an=k*.7;blob(x+Math.cos(an)*h3*.55,y-h3*.8+Math.sin(an)*h3*.28-(k%3)*h3*.1,h3*.5,ripe?["#fffdf2","#d8d2b0"]:["#e0efc0","#b0cf80"])}
   blob(x,y-h3*1.1,h3*.5,ripe?["#fffff6","#e0dabb"]:["#e8f4c8","#bcd88c"]);rosette(x,y-h3*.2,5,h3*.6,h3*.3,"#5aaa4a","#72c260",0)}return}
 if(id==="garlic"){for(k=0;k<6;k++){an=-1.57+(k-2.5)*.3;ex=x+Math.cos(an)*14*s+w;ey=y-2+Math.sin(an)*14*s;X.strokeStyle=k%2?"#4a9a3a":"#6cbc4a";X.lineWidth=1.8;X.beginPath();X.moveTo(x,y-1);X.quadraticCurveTo(x+Math.cos(an)*6*s,y-2+Math.sin(an)*9*s,ex,ey);X.stroke()}
  if(pr>.4){var r4=ripe?4.2:1.6+pr*3;X.fillStyle=ripe?"#cfc6d6":"#cfe3b0";X.beginPath();X.moveTo(x,y-r4*1.9);X.quadraticCurveTo(x+r4*1.3,y-r4*.9,x+r4*1.1,y-r4*.2);X.quadraticCurveTo(x,y+r4*.4,x-r4*1.1,y-r4*.2);X.quadraticCurveTo(x-r4*1.3,y-r4*.9,x,y-r4*1.9);X.fill();
   X.fillStyle=ripe?"#f6f1f8":"#eef7dc";X.beginPath();X.ellipse(x-r4*.25,y-r4*.7,r4*.7,r4*.8,0,0,7);X.fill();X.strokeStyle=ripe?"rgba(130,100,150,.55)":"rgba(100,140,70,.5)";X.lineWidth=.7;
   for(k=-1;k<=1;k++){X.beginPath();X.moveTo(x,y-r4*1.8);X.quadraticCurveTo(x+k*r4*1.2,y-r4*.7,x+k*r4*.6,y);X.stroke()}}return}
 if(id==="beet"){for(k=0;k<5;k++){an=-1.57+(k-2)*.45;ex=x+Math.cos(an)*12*s+w;ey=y-2+Math.sin(an)*12*s;stem2(x,y-1,ex,ey,"#b0204a",1.3);leaf(ex,ey,4*s+1,2.3*s+.6,an+.2,k%2?"#3a8a3a":"#2f7a34");stem2(ex-2.5*s,ey,ex+2.5*s,ey-.4,"rgba(200,40,80,.6)",.6)}
  if(pr>.4){var r5=ripe?3.8:1.4+pr*3;dot(x,y-r5*.3,r5,"#7a1040");blob(x-r5*.2,y-r5*.5,r5*.8,["#b0306a","#6a0c38"]);X.strokeStyle="#6a0c38";X.lineWidth=1;X.beginPath();X.moveTo(x,y+r5*.4);X.lineTo(x+1,y+r5*1.6);X.stroke();leaf(x-r5*.4,y-r5*.8,r5*.2,r5*.35,.6,"rgba(255,255,255,.4)")}return}
 if(id==="sunflower"){h=36*s;X.strokeStyle="#4f8a2a";X.lineWidth=2.4;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+w*.4,y-h*.5,x+w,y-h);X.stroke();
  for(k=0;k<4;k++){ex=x+w*(.2+k*.2);leaf(ex+(k%2?5:-5)*s,y-h*(.2+k*.17),5.4*s+1,3*s+.6,k%2?-.5:.5,k%2?A:"#2f7d2c")}
  var hx=x+w,hy=y-h;
  if(ripe||pr>.75){var r8=ripe?7.5:3+(pr-.75)*18;
   if(ripe){for(k=0;k<16;k++){an=k*.3927;leaf(hx+Math.cos(an)*r8*1.15,hy+Math.sin(an)*r8*1.15,r8*.5,r8*.2,an,k%2?"#f5c10a":"#ffd83a")}}else dot(hx,hy,r8,"#4f8a2a");
   dot(hx,hy,r8*.75,ripe?"#5a3412":"#6a8a32");
   if(ripe)for(k=0;k<18;k++){an=k*2.4;dot(hx+Math.cos(an)*r8*.55*Math.sqrt((k+1)/18),hy+Math.sin(an)*r8*.55*Math.sqrt((k+1)/18),.7,"#c28a3c")}}
  else dot(hx,hy,2.5*s+1,"#7aa83a");return}
 if(id==="blueberry"){for(k=0;k<7;k++){an=k*.9;leaf(x+Math.cos(an)*4.5*s+w*.3,y-4*s+Math.sin(an)*3*s-(k%3)*3*s,3.4*s+.8,1.9*s+.5,an,k%2?"#3a8a3a":"#58a846")}
  if(pr>.55)[[-4,-5],[3,-7],[0,-3],[5,-3],[-2,-9]].forEach(function(o){var bx=x+o[0]+w*.3,by=y+o[1],r=ripe?2.3:1.2+(pr-.55)*2.4;dot(bx,by,r,ripe?"#33408f":"#9ab86a");dot(bx-r*.25,by-r*.3,r*.55,ripe?"#6c7fcf":"#c8dd9a");dot(bx,by-r*.15,r*.25,ripe?"#1a2358":"#6a8a3a")});return}
 if(id==="grape"){h=26*s;stem2(x-5,y+1,x-5,y-h-2,"#8a6234",1.8);stem2(x+5,y+1,x+5,y-h-2,"#8a6234",1.8);X.strokeStyle="rgba(210,200,170,.7)";X.lineWidth=.7;X.beginPath();X.moveTo(x-5,y-h);X.lineTo(x+5,y-h);X.stroke();
  X.strokeStyle="#6a4a28";X.lineWidth=1.6;X.beginPath();X.moveTo(x,y);X.bezierCurveTo(x-4,y-h*.4,x+4,y-h*.7,x+w,y-h);X.stroke();
  for(k=0;k<5;k++){ex=x+w*(k/5)+(k%2?4:-4)*s;var ly=y-h*(.25+k*.17);leaf(ex,ly,4.6*s+1,4*s+.8,k%2?.3:-.3,k%2?A:B);X.strokeStyle="rgba(200,240,160,.35)";X.lineWidth=.5;X.beginPath();X.moveTo(ex-3*s,ly);X.lineTo(ex+3*s,ly);X.stroke()}
  if(pr>.6)[[-3,-.35],[4,-.5]].forEach(function(o){bunch(x+o[0]+w*.3,y+o[1]*h,ripe?1:.5+(pr-.6),ripe)});return}
 if(id==="raspberry"){for(k=0;k<7;k++){an=k*.9;ex=x+Math.cos(an)*4.5*s+w*.3;ey=y-4*s+Math.sin(an)*3*s-(k%3)*3*s;leaf(ex,ey,3.8*s+.8,2*s+.5,an,k%2?"#3a8a3a":"#58a846");X.strokeStyle="rgba(210,245,170,.35)";X.lineWidth=.5;X.beginPath();X.moveTo(ex-3*s,ey);X.lineTo(ex+3*s,ey);X.stroke()}
  if(pr>.55)[[-4,-5],[3.5,-7],[0,-2],[5,-3]].forEach(function(o){rasp(x+o[0]+w*.3,y+o[1],ripe?2.3:1+(pr-.55)*2.8,ripe)});return}
 if(id==="pineapple"){for(k=0;k<9;k++){an=-1.57+(k-4)*.34;ex=x+Math.cos(an)*(13+(k%2)*3)*s+w;ey=y-1+Math.sin(an)*(13+(k%2)*3)*s;X.strokeStyle=k%2?"#3f8a5a":"#5aa070";X.lineWidth=2.2;X.beginPath();X.moveTo(x,y-1);X.quadraticCurveTo(x+Math.cos(an)*7*s,y-1+Math.sin(an)*6*s,ex,ey);X.stroke()}
  if(pr>.55){var r6=ripe?1:.45+(pr-.55)*1.2;X.fillStyle=ripe?"#d9961a":"#9cbf54";X.beginPath();X.ellipse(x,y-8*r6,4.4*r6,6.6*r6,0,0,7);X.fill();X.fillStyle=ripe?"#f5c53c":"#c5dc84";X.beginPath();X.ellipse(x-.8*r6,y-8.4*r6,3*r6,5.2*r6,0,0,7);X.fill();
   X.save();X.beginPath();X.ellipse(x,y-8*r6,4.4*r6,6.6*r6,0,0,7);X.clip();X.strokeStyle=ripe?"rgba(120,70,0,.55)":"rgba(70,100,30,.5)";X.lineWidth=.7;
   for(k=-3;k<=3;k++){X.beginPath();X.moveTo(x+k*1.4*r6-3*r6,y-13*r6);X.lineTo(x+k*1.4*r6+3*r6,y-3*r6);X.moveTo(x+k*1.4*r6+3*r6,y-13*r6);X.lineTo(x+k*1.4*r6-3*r6,y-3*r6);X.stroke()}X.restore();
   for(k=0;k<7;k++){an=-1.57+(k-3)*.4;X.strokeStyle=k%2?"#2f8a4a":"#3fa05a";X.lineWidth=1.6;X.beginPath();X.moveTo(x,y-14*r6);X.lineTo(x+Math.cos(an)*6*r6,y-14*r6+Math.sin(an)*7*r6);X.stroke()}}return}
 if(id==="wheat"){var gc=ripe?"#e8b830":pr>.6?"#b8c24a":"#6ab04a";
  for(k=0;k<7;k++){var sx=x+(k-3)*1.7,hh=(20+(k%3)*4)*s,tx=sx+w*(.6+k*.05);X.strokeStyle=ripe?"#d9a82c":"#5aa83a";X.lineWidth=1;X.beginPath();X.moveTo(sx,y);X.lineTo(tx,y-hh);X.stroke();
   if(pr>.3){var el=Math.min(1,(pr-.3)*1.6)*7;for(j=0;j<5;j++)leaf(tx+(j%2?1.3:-1.3),y-hh-j*el/5,1.3,el/9+.4,j%2?.4:-.4,gc);
    X.strokeStyle=ripe?"rgba(240,210,100,.7)":"rgba(150,200,90,.6)";X.lineWidth=.5;for(j=-1;j<=1;j+=2){X.beginPath();X.moveTo(tx,y-hh-el*.5);X.lineTo(tx+j*2,y-hh-el-4);X.stroke()}}}return}
 if(id==="rice"){for(k=0;k<7;k++){var sx2=x+(k-3)*1.5,hh2=(18+(k%3)*3)*s,tx2=sx2+w*(.5+k*.05);X.strokeStyle=ripe?"#b8c24a":"#4f9a34";X.lineWidth=1.2;X.beginPath();X.moveTo(sx2,y);X.quadraticCurveTo(sx2+w*.2,y-hh2*.6,tx2,y-hh2);X.stroke();
   X.strokeStyle="#5aa83a";X.lineWidth=1;X.beginPath();X.moveTo(sx2,y-hh2*.2);X.quadraticCurveTo(sx2+3,y-hh2*.6,sx2+5*s,y-hh2*.5);X.stroke();
   if(pr>.45){var pl=Math.min(1,(pr-.45)*1.8)*8,dx=k%2?1:-1;X.strokeStyle=ripe?"#d9b52c":"#8cbc44";X.lineWidth=.9;X.beginPath();X.moveTo(tx2,y-hh2);X.quadraticCurveTo(tx2+dx*pl*.6,y-hh2-pl*.4,tx2+dx*pl*.9,y-hh2+pl*.5);X.stroke();
    for(j=0;j<7;j++){var tt=j/6,u=1-tt;dot(u*u*tx2+2*u*tt*(tx2+dx*pl*.6)+tt*tt*(tx2+dx*pl*.9)+(j%2?.8:-.8),u*u*(y-hh2)+2*u*tt*(y-hh2-pl*.4)+tt*tt*(y-hh2+pl*.5),.9,ripe?"#e8c13a":"#a8cc54")}}}return}
 if(id==="ginger"){for(k=0;k<6;k++){an=-1.57+(k-2.5)*.22;ex=x+Math.cos(an)*17*s+w;ey=y-1+Math.sin(an)*17*s;stem2(x,y-1,x+(ex-x)*.5,y+(ey-y)*.5,"#7aa83a",1);leaf((x+ex)/2+(ex-x)*.2,(y+ey)/2-1+(ey-y)*.2,6.5*s+1,1.5*s+.4,an,k%2?"#4f9a2c":"#68b83c")}
  if(pr>.45){var r7=ripe?1:.5+(pr-.45)*.9;[[-3,0,3.4],[0,-.5,3],[3.2,.3,3],[1,1.8,2.6]].forEach(function(o){X.fillStyle=ripe?"#c9a24a":"#e8d9a0";X.beginPath();X.ellipse(x+o[0]*r7,y+o[1]*r7+1,o[2]*r7,o[2]*.62*r7,o[0]*.08,0,7);X.fill();
   X.fillStyle=ripe?"#e8c476":"#f4ecc4";X.beginPath();X.ellipse(x+o[0]*r7-.5,y+o[1]*r7,o[2]*.7*r7,o[2]*.4*r7,0,0,7);X.fill();dot(x+(o[0]+o[2]*.85)*r7,y+o[1]*r7+1,.7*r7,ripe?"#e89a8c":"#f0b8a8")})}return}
}
