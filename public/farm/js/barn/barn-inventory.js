/* ===== BARN INVENTORY (Step 3): icons + sell ===== */
var INVC={},SHA={cowshed:"a_cow",chickenshed:"a_chicken",sheepshed:"a_sheep",pigshed:"a_pig"},
PRODK={a_chicken:["egg","#f7f0e2","#d8c8a0",1],a_duck:["egg","#e4efe6","#a9c0ad",1.05],a_goose:["egg","#fffaf0","#ddd2bb",1.2],a_turkey:["egg","#f0dcb8","#a8804a",1.1,1],a_quail:["egg","#ece0c4","#6a4e2e",.7,1],a_ostrich:["egg","#f5ebd3","#cfbf92",1.45],
 a_cow:["milk","#ffffff","#3a8ae0"],a_carabao:["milk","#f6efe2","#7a5a3a"],a_goat:["milk","#ffffff","#4aa84a"],a_donkey:["milk","#fbf8f2","#9a6ac8"],a_hcow:["cream"],
 a_sheep:["wool","#fbfaf4","#d8d2c0"],a_llama:["wool","#f1e8d6","#cbbd9c"],a_alpaca:["wool","#efe2c8","#c9b48a"],a_yak:["wool","#5a463c","#2a1c16"],a_rabbit:["wool","#f4eee4","#cfc4b0"],
 a_rooster:["feather","#c8602a","#1a7a5a"],a_swan:["feather","#ffffff","#d8d8d0"],a_peacock:["feather","#1f8a8a","#2a5ac8"],
 a_pig:["truffle"],a_horse:["hair"],a_pony:["ticket"]};
// draw with the farm's own drawing functions, then crop to the visible part and scale into the icon
function invFit(g,fn){var K=3,c=document.createElement("canvas"),cx,oX=X,d,x,y,W=110*K,H=120*K,x0=1e9,y0=1e9,x1=-1,y1=-1,w,h,s;
 c.width=W;c.height=H;cx=c.getContext("2d");cx.setTransform(K,0,0,K,0,0);X=cx;WOVR=0;
 try{fn()}finally{X=oX;WOVR=null}
 d=cx.getImageData(0,0,W,H).data;
 for(y=0;y<H;y++)for(x=0;x<W;x++)if(d[(y*W+x)*4+3]>110){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
 if(x1<0)return;w=x1-x0+1;h=y1-y0+1;s=Math.min(84/w,84/h);
 g.drawImage(c,x0,y0,w,h,(96-w*s)/2,(96-h*s)/2+2,w*s,h*s)}
function invFruitDraw(k){var i;
 if(k==="banana"){X.strokeStyle="#6a5a2a";X.lineWidth=5;X.lineCap="round";X.beginPath();X.moveTo(40,30);X.lineTo(70,30);X.stroke();X.lineCap="butt";for(i=-2;i<=2;i++)bananaF(55+i*6,32+Math.abs(i)*2,46,true,i<0?-1:i>0?1:.3);return}
 if(k==="coconut"){nut(44,72,19,"#7a5226","#b8884a");nut(68,64,17,"#7a5226","#b8884a");return}
 if(k==="papaya"){X.fillStyle="#d8691a";X.beginPath();X.ellipse(55,66,17,28,.35,0,7);X.fill();X.fillStyle="#f8b84c";X.beginPath();X.ellipse(51,62,11,21,.35,0,7);X.fill();leaf(60,38,6,3,-.6,"#5f8a2a");leaf(52,60,2.5,12,.4,"rgba(255,255,255,.5)");return}
 fruit(k,55,68,22,true)}
function pShadow(g,w){g.fillStyle="rgba(0,0,0,.22)";g.beginPath();g.ellipse(48,86,w,5,0,0,7);g.fill()}
function pEgg(g,P){var s=P[3]||1,rx=17*s,ry=22*s,x=48,y=54,i,a,gr;pShadow(g,rx);
 gr=g.createRadialGradient(x-rx*.4,y-ry*.4,2,x,y,ry*1.1);gr.addColorStop(0,"#ffffff");gr.addColorStop(.35,P[1]);gr.addColorStop(1,P[2]);
 g.fillStyle=gr;g.beginPath();g.moveTo(x,y-ry);g.bezierCurveTo(x+rx*1.25,y-ry*.6,x+rx*1.15,y+ry*.95,x,y+ry);g.bezierCurveTo(x-rx*1.15,y+ry*.95,x-rx*1.25,y-ry*.6,x,y-ry);g.fill();
 if(P[4]){g.fillStyle="rgba(70,45,20,.55)";for(i=0;i<18;i++){a=i*2.4;g.beginPath();g.arc(x+Math.cos(a)*rx*.7*((i*7%10)/10),y+Math.sin(a)*ry*.75*((i*3%10)/10),1.3+(i%3)*.5,0,7);g.fill()}}
 g.fillStyle="rgba(255,255,255,.55)";g.beginPath();g.ellipse(x-rx*.4,y-ry*.4,rx*.22,ry*.34,.5,0,7);g.fill()}
function pMilk(g,P){var gp=function(){g.beginPath();g.moveTo(32,44);g.quadraticCurveTo(32,36,40,34);g.lineTo(40,22);g.lineTo(56,22);g.lineTo(56,34);g.quadraticCurveTo(64,36,64,44);g.lineTo(64,80);g.quadraticCurveTo(64,86,58,86);g.lineTo(38,86);g.quadraticCurveTo(32,86,32,80);g.closePath()},gr;
 pShadow(g,24);gp();g.fillStyle="rgba(225,238,247,.75)";g.fill();
 g.save();gp();g.clip();gr=g.createLinearGradient(30,0,66,0);gr.addColorStop(0,"#dfe6ec");gr.addColorStop(.4,P[1]);gr.addColorStop(1,"#cfd8e0");g.fillStyle=gr;g.fillRect(28,38,40,52);
 g.fillStyle="#fff";g.fillRect(36,54,24,20);g.fillStyle=P[2];g.fillRect(36,58,24,7);g.beginPath();g.arc(48,70,2.6,0,7);g.fill();g.restore();
 gp();g.strokeStyle="#9fb6c6";g.lineWidth=2;g.stroke();
 g.fillStyle=P[2];g.fillRect(38,13,20,9);g.fillStyle="rgba(255,255,255,.35)";g.fillRect(40,14,4,7);
 g.fillStyle="rgba(255,255,255,.6)";g.fillRect(35,42,3,38)}
function pCream(g){var gr;pShadow(g,26);
 gr=g.createLinearGradient(26,0,70,0);gr.addColorStop(0,"#e7edf1");gr.addColorStop(.4,"#fff7e0");gr.addColorStop(1,"#d9e0e6");
 g.fillStyle=gr;g.fillRect(27,42,42,42);g.strokeStyle="#9fb6c6";g.lineWidth=2;g.strokeRect(27,42,42,42);
 g.fillStyle="#fff4d0";g.beginPath();g.ellipse(48,44,20,5,0,0,7);g.fill();
 g.fillStyle="#c9473f";g.fillRect(25,30,46,13);g.fillStyle="rgba(255,255,255,.4)";g.fillRect(28,32,5,9);
 g.fillStyle="#c9473f";g.fillRect(36,56,24,12);g.fillStyle="#fff";g.font="bold 9px sans-serif";g.textAlign="center";g.fillText("CREAM",48,65)}
function pWool(g,P){var q=[[36,62,17],[60,62,17],[48,70,17],[30,46,14],[66,46,14],[48,40,18],[48,56,19],[38,34,11],[58,32,11]],i,gr;pShadow(g,28);
 q.forEach(function(p){gr=g.createRadialGradient(p[0]-p[2]*.3,p[1]-p[2]*.35,2,p[0],p[1],p[2]);gr.addColorStop(0,cmul(P[1],1.3));gr.addColorStop(.5,P[1]);gr.addColorStop(1,P[2]);g.fillStyle=gr;g.beginPath();g.arc(p[0],p[1],p[2],0,7);g.fill()});
 g.strokeStyle="rgba(0,0,0,.13)";g.lineWidth=1.4;for(i=0;i<8;i++){g.beginPath();g.arc(32+(i*9)%34,38+(i*13)%34,5+i%3,i,i+3);g.stroke()}}
function pFeather(g,P,id){var i,w,y,gr;g.save();g.translate(48,50);g.rotate(-.7);
 gr=g.createLinearGradient(0,-38,0,32);gr.addColorStop(0,P[1]);gr.addColorStop(1,P[2]);g.fillStyle=gr;
 g.beginPath();g.moveTo(0,-38);g.bezierCurveTo(20,-30,22,10,3,30);g.lineTo(0,32);g.lineTo(-3,30);g.bezierCurveTo(-22,10,-20,-30,0,-38);g.fill();
 g.strokeStyle="rgba(255,255,255,.25)";g.lineWidth=1;for(i=0;i<15;i++){y=-34+i*4.5;w=18*Math.sin(Math.PI*(i+1)/16);g.beginPath();g.moveTo(0,y+3);g.lineTo(w,y-3);g.moveTo(0,y+3);g.lineTo(-w,y-3);g.stroke()}
 if(id==="a_peacock"){g.fillStyle="#2a8a6a";g.beginPath();g.ellipse(0,-18,9,12,0,0,7);g.fill();g.fillStyle="#2a5ac8";g.beginPath();g.ellipse(0,-18,6,8,0,0,7);g.fill();g.fillStyle="#1a2a5a";g.beginPath();g.ellipse(0,-18,3,4,0,0,7);g.fill()}
 g.strokeStyle="#e8dcc0";g.lineWidth=2;g.beginPath();g.moveTo(0,-36);g.lineTo(0,42);g.stroke();g.restore()}
function pTruffle(g){var i,a,r,gr;pShadow(g,24);
 gr=g.createRadialGradient(40,42,3,48,52,30);gr.addColorStop(0,"#6a5846");gr.addColorStop(1,"#17100a");g.fillStyle=gr;g.beginPath();
 for(i=0;i<=40;i++){a=i/40*6.2832;r=24+3.5*Math.sin(5*a)+2.5*Math.sin(9*a+1);g.lineTo(48+Math.cos(a)*r,52+Math.sin(a)*r*.9)}g.closePath();g.fill();
 g.strokeStyle="rgba(235,225,195,.22)";g.lineWidth=1.2;for(i=0;i<7;i++){g.beginPath();g.arc(48,52,6+i*3,i,i+2.2);g.stroke()}
 g.fillStyle="rgba(255,255,255,.25)";g.beginPath();g.ellipse(39,41,7,4,-.5,0,7);g.fill()}
function pHair(g){var i,x,c=["#2a1a10","#3a2414","#4a2e18","#1a100a"];
 pShadow(g,22);g.lineWidth=2.4;g.lineCap="round";
 for(i=0;i<14;i++){x=30+i*3.2;g.strokeStyle=c[i%4];g.beginPath();g.moveTo(x,14);g.bezierCurveTo(x+6*Math.sin(i),34,x-6*Math.cos(i),62,x+Math.sin(i*2)*5,86);g.stroke()}
 g.lineCap="butt";g.fillStyle="#c9473f";g.fillRect(27,42,42,9);g.fillStyle="rgba(255,255,255,.3)";g.fillRect(27,43,42,2)}
function pTicket(g){var gr;g.save();g.translate(48,50);g.rotate(-.18);
 gr=g.createLinearGradient(0,-22,0,22);gr.addColorStop(0,"#ffe27a");gr.addColorStop(1,"#e0a020");g.fillStyle=gr;g.fillRect(-34,-22,68,44);
 g.strokeStyle="#8a5a10";g.lineWidth=2;g.strokeRect(-34,-22,68,44);g.setLineDash([3,3]);g.strokeRect(-30,-18,60,36);g.setLineDash([]);
 g.fillStyle="#7bbf5a";g.beginPath();g.arc(-34,0,6,0,7);g.arc(34,0,6,0,7);g.fill();
 g.font="26px serif";g.textAlign="center";g.fillText("\uD83C\uDFA0",0,9);g.restore()}
var PD={egg:pEgg,milk:pMilk,cream:pCream,wool:pWool,feather:pFeather,truffle:pTruffle,hair:pHair,ticket:pTicket};
function invStar(g){var i,a,r;g.beginPath();for(i=0;i<10;i++){a=-Math.PI/2+i*Math.PI/5;r=i%2?5:11;g.lineTo(78+Math.cos(a)*r,16+Math.sin(a)*r)}g.closePath();g.fillStyle="#ffc83a";g.fill();g.strokeStyle="#8a5a10";g.lineWidth=1.4;g.stroke()}
function invIconURL(key){if(INVC[key])return INVC[key];
 var p=key.split(":"),t=p[0],id=p[1],c=document.createElement("canvas"),g,a,it,P;c.width=c.height=96;g=c.getContext("2d");
 try{
  if(t==="c"||t==="cb"){invFit(g,function(){plant0(id,[55,95],1,true,0)});if(t==="cb")invStar(g)}
  else{a=t==="y"?SHA[id]:id;it=fiDef(a);
   if(it&&it.animal){P=PRODK[a];if(P)PD[P[0]](g,P,a);else throw 0}
   else invFit(g,function(){invFruitDraw(a)})}
 }catch(e){g.clearRect(0,0,96,96);g.font="44px serif";g.textAlign="center";g.fillText("\uD83D\uDCE6",48,62)}
 return INVC[key]=c.toDataURL()}
function invInfo(key){var p=key.split(":"),t=p[0],id=p[1],c,it;
 if(t==="c"||t==="cb"){c=cr(id);return c?{n:(t==="cb"?"BIG ":"")+c.name,g:0}:null}
 if(t==="i"){it=fiDef(id);return it?{n:it.animal?it.prod:it.name.replace(/ (Tree|Palm)$/,""),g:it.animal?2:1}:null}
 if(t==="y"){it=fiDef(SHA[id]);return it?{n:it.prod+" (young)",g:2}:null}
 return null}
function invUP(k){return(S.invp&&S.invp[k])||invUnit(k)}
function invTotal(){var t=0;Object.keys(S.inv||{}).forEach(function(k){t+=(S.inv[k]|0)*invUP(k)});return t}
function invSell(key,n){var have=(S.inv&&S.inv[key])|0,u=invUP(key),g,nm=invInfo(key);if(!have||!nm)return;
 n=n==="all"?have:Math.min(+n||1,have);g=n*u;S.coins+=g;S.inv[key]=have-n;if(S.inv[key]<=0)delete S.inv[key];
 send("farmInvSell",[TOKEN,key,n]);paint();renderInv();try{FarmAudio.play("sell")}catch(e){}
 toast("\uD83D\uDCB0 Sold "+n+" "+nm.n+" for +"+g+"\uD83E\uDE99")}
 var INVTAB="c";
function invTab(k){var p=k.split(":"),it;if(p[0]==="c"||p[0]==="cb")return"c";if(p[0]==="y")return"p";it=fiDef(p[1]);return(it&&it.animal)?"p":"f"}
function invIsAni(k){var d=fiDef(k);return!!d&&!!d.animal}
function invAnimals(){var G={},ks=[];stored().forEach(function(s){var o=s.t==="d"&&dcById(s.id);if(!o||!invIsAni(o.k))return;if(!G[o.k]){G[o.k]=[];ks.push(o.k)}G[o.k].push(s)});return{G:G,ks:ks}}
function invAniURL(id){var key="a:"+id,K=3,src,W,H,d,x,y,x0=1e9,y0=1e9,x1=-1,y1=-1,w,h,s,c,g;if(INVC[key])return INVC[key];
 try{src=sprite(id,K,2,1);W=src.width;H=src.height;d=src.getContext("2d").getImageData(0,0,W,H).data;
  for(y=0;y<H;y++)for(x=0;x<W;x++)if(d[(y*W+x)*4+3]>110){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  if(x1<0)throw 0;w=x1-x0+1;h=y1-y0+1;s=Math.min(120/w,120/h);
  c=document.createElement("canvas");c.width=c.height=128;g=c.getContext("2d");g.imageSmoothingQuality="high";
  g.drawImage(src,x0,y0,w,h,(128-w*s)/2,(128-h*s)/2,w*s,h*s);return INVC[key]=c.toDataURL()}catch(e){return invIconURL("i:"+id)}}
function renderInv(){var p=$("barnP"),box=$("barnInv"),ks,tot,h="",g;
 if(!p||!S)return;
 if(!box){box=document.createElement("div");box.id="barnInv";p.insertBefore(box,$("barnList"));
  box.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),d,t,n;if(!b)return;
   if(b.id==="invSellAll"){t=invTotal();n=0;Object.keys(S.inv||{}).forEach(function(k){n+=S.inv[k]|0});if(!n)return;
    infoDlg("\uD83D\uDCB0","Sell all harvest?","Everything in your harvest storage is sold at its price.",["Items: "+n,"You get: +"+t+"\uD83E\uDE99"],function(){S.coins+=invTotal();S.inv={};send("farmInvSellAll",[TOKEN]);paint();renderInv();try{FarmAudio.play("sell")}catch(e){}toast("\uD83D\uDCB0 Sold all harvest for +"+t+"\uD83E\uDE99")},"Sell all");return}
   if(b.dataset.t){INVTAB=b.dataset.t;renderInv();return}
   if(b.dataset.pl){var z=invAnimals().G[b.dataset.pl];if(z&&z.length){PLACING=z[0];SEL=null;$("barnP").style.display="none";editUI();drawAll()}return}
   if(b.dataset.sa){var z2=invAnimals().G[b.dataset.sa];z2=z2&&z2.filter(sellable);if(z2&&z2.length)sellStoredDlg(b.dataset.sa,z2);return}
   d=b.dataset.s;if(d){d=d.split("|");invSell(d[0],d[1])}}}
 ks=Object.keys(S.inv||{}).filter(function(k){return(S.inv[k]|0)>0&&invInfo(k)});
 var an=invAnimals(),cn={c:0,f:0,p:0,a:0};
 ks.forEach(function(k){cn[invTab(k)]+=S.inv[k]|0});an.ks.forEach(function(k){cn.a+=an.G[k].length});
 ks=ks.filter(function(k){return invTab(k)===INVTAB});
 ks.sort(function(a,b){var x=invInfo(a),y=invInfo(b);return x.g-y.g||x.n.localeCompare(y.n)});
 h="<div class='ivt'>"+[["c","Crops"],["f","Fruits"],["p","Products"],["a","Animals"]].map(function(t){return"<button class='btn "+(INVTAB===t[0]?"on":"alt")+"' data-t='"+t[0]+"'>"+t[1]+" ("+cn[t[0]]+")</button>"}).join("")+"</div>"+
  "<div class='ivh'><b>\uD83E\uDDFA Harvest storage</b><span>Total \uD83E\uDE99 "+invTotal()+"</span><button class='btn bsell' id='invSellAll'>\uD83D\uDCB0 Sell all harvest</button></div><div class='ivg'>";
 if(INVTAB==="a"){
  an.ks.forEach(function(k){var d=fiDef(k),n=an.G[k].length,sl=an.G[k].filter(sellable);
   h+="<div class='ivc'><img style='width:76px;height:76px' src='"+invAniURL(k)+"'><b>"+esc(d.name)+"</b>\u00D7"+n+"<br><button class='btn pl' data-pl='"+k+"'>Place</button>"+(sl.length?"<button class='btn bsell' data-sa='"+k+"'>Sell</button>":"")+"</div>"});
  if(!an.ks.length)h+="<div class='small' style='color:#fff;grid-column:1/-1'>No grown animals in the barn yet. Use Harvest &gt; Move animals to barn.</div>"}
 else{
  ks.forEach(function(k){var i=invInfo(k);
   h+="<div class='ivc'><img src='"+invIconURL(k)+"'><b>"+esc(i.n)+"</b>\u00D7"+S.inv[k]+" &middot; \uD83E\uDE99 "+invUP(k)+" each<br><button class='btn' data-s='"+k+"|1'>Sell 1</button><button class='btn bsell' data-s='"+k+"|all'>Sell all</button></div>"});
  if(!ks.length)h+="<div class='small' style='color:#fff;grid-column:1/-1'>Nothing here yet. Harvested items are kept here.</div>"}
 box.innerHTML=h+"</div>"}
var _rb0=renderBarn;
renderBarn=function(){
 var p=$("barnP"),n,tl=0;
 if(!p||p.style.display==="none"){
  try{n=stored().length;Object.keys(S.ft||{}).forEach(function(id){tl+=(S.ft[id]|0)});
   $("edBarn").textContent="🏡 Barn ("+(n+tl)+")";
   $("barnUndo").style.display=UNDO.length?"":"none";$("edUndo").style.display=UNDO.length?"":"none"}catch(e){}
  return}
 _rb0.apply(this,arguments);try{renderInv()}catch(e){}};
var _ebO=$("edBarn").onclick;
$("edBarn").onclick=function(){_ebO.apply(this,arguments);if($("barnP").style.display!=="none")renderBarn()};
