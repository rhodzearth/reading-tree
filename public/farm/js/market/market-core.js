// ----- painting floors -----
var PAINT=null,BRUSH=[1,3,5,9];
function floorDef(id){var L=S.fls||[],i;for(i=0;i<L.length;i++)if(L[i].id===id)return L[i];return id==="gr"?{id:"gr",name:"Grass",cost:0,lvl:1}:null}
function paintAt(tc,tr){var f=PAINT&&floorDef(PAINT.id),sz,h,pl={},i,c,r,key,tl=[],cost,n;
 if(!f)return;sz=PAINT.size;h=(sz-1)/2;if(!S.fl)S.fl={};
 for(i=0;i<S.np;i++)if(S.pp[i])pl[flKey(S.pp[i][0],S.pp[i][1])]=1;
 (S.dc||[]).forEach(function(o){if(!o.s&&!isF(o.k))pl[flKey(o.c,o.r)]=1}); // tiles holding trees/animals/decor cannot become water
 for(c=tc-h;c<=tc+h;c++)for(r=tr-h;r<=tr+h;r++){if(!inLandP(parS(),c,r)&&!(!outLocked()&&zoneAt(c,r)==="b"))continue;key=flKey(c,r);
  if(f.id==="gr"){if(S.fl[key])tl.push(key);continue}
  if(S.fl[key]===f.id||(f.id==="wt"&&pl[key]))continue;tl.push(key)}
 if(!tl.length){toast(sz>1?"Nothing to change here.":"Already this floor.");return}
 n=f.cost?Math.min(tl.length,Math.floor(S.coins/f.cost)):tl.length;
 if(!n){toast(f.name+" costs "+f.cost+" coins per tile. You have "+S.coins+".");return}
 tl=tl.slice(0,n);cost=n*f.cost;S.coins-=cost;
 tl.forEach(function(k){if(f.id==="gr")delete S.fl[k];else S.fl[k]=f.id});FLN++;
 send("farmFloor",[TOKEN,f.id,tl]);paint();drawAll();
 toast(f.id==="gr"?"\uD83C\uDF31 Grass restored":"\uD83D\uDD8C "+f.name+" x"+n+(cost?" (-"+cost+"\uD83E\uDE99)":""))}
function startPaint(f){var sz=PAINT?PAINT.size:1;PEND=null;$("buyBar").style.display="none";BUYING=0;$("mkt").style.display="none";
 setEdit0(true);PAINT={id:f.id,size:sz};editUI();drawAll();
 toast("\uD83D\uDD8C Tap tiles to paint "+f.name+(f.cost?" ("+f.cost+"\uD83E\uDE99 per tile)":" (free)")+". Use Brush for bigger areas.")}
function fThumb(id,dpr){var c=document.createElement("canvas"),cx;c.width=c.height=Math.round(84*dpr);c.style.cssText="width:84px;height:84px";cx=c.getContext("2d");
 cx.drawImage(ftile(id,dpr,0),0,Math.round(21*dpr),c.width,Math.round(43*dpr));return c}
function renderFloors(){var box=$("mList"),dpr=Math.min(1.5,window.devicePixelRatio||1),frag=document.createDocumentFragment(),L=[{id:"gr",name:"Grass",cost:0,lvl:1}].concat(S.fls||[]);
 L.forEach(function(f){var lock=S.level<f.lvl,d=document.createElement("div"),v=document.createElement("div"),t=document.createElement("b"),sm=document.createElement("div"),b=document.createElement("button");
  d.className="mc"+(lock?" lock":"");v.className="mcv";v.appendChild(fThumb(f.id,dpr));t.textContent=f.name;sm.className="small";
  sm.innerHTML=f.id==="gr"?"Free &middot; default<br>Paint over any floor":f.id==="wt"?f.cost+"\uD83E\uDE99 per tile<br>Nothing can be placed on water":f.cost+"\uD83E\uDE99 per tile";
  b.className="btn";b.textContent=lock?"\uD83D\uDD12 Level "+f.lvl:"Paint";b.onclick=function(){if(lock){toast(f.name+" unlocks at level "+f.lvl);return}startPaint(f)};
  d.appendChild(v);d.appendChild(t);d.appendChild(sm);d.appendChild(b);frag.appendChild(d)});
 box.appendChild(frag)}
function perimBanner(){var d=document.createElement("div"),b=document.createElement("button"),ok=(S.sz||8)>=60;d.className="mc";d.style.gridColumn="1/-1";
 d.innerHTML="<b>\uD83C\uDFDE\uFE0F Perimeter fence</b><div class='small'>The fence around all your land. Change its design (concrete, brick, iron and more) once your main land is 60 x 60."+(ok?"":" Yours is "+(S.sz||8)+" x "+(S.sz||8)+".")+"</div>";
 b.className="btn"+(ok?"":" alt");b.textContent=ok?"Choose perimeter design":"\uD83D\uDD12 Needs 60 x 60 land";
b.onclick=function(){if(!ok){toast("Expand your main land to 60 x 60 first.");return}perimDlg()};d.appendChild(b);
var t=document.createElement("button");t.style.marginTop="6px";paintPerimBtn(t);
t.onclick=function(){togglePerim(t)};d.appendChild(t);return d}
function paintPerimBtn(t){t.className="btn"+(S.ph?"":" alt");t.textContent=S.ph?"\uD83D\uDC41\uFE0F Perimeter fence: HIDDEN (tap to show)":"\uD83D\uDEA7 Perimeter fence: SHOWN (tap to hide)"}
function togglePerim(t){S.ph=S.ph?0:1;send("farmPerim",[TOKEN,S.ph?"off":"on"]);paintPerimBtn(t);drawAll();toast(S.ph?"Perimeter fence hidden. Place your own fences!":"Perimeter fence shown again.")}
function perimDlg(){var dlg=$("dlg"),P=S.pfs||[],own=S.pfo||["wood"],cur=S.pf||"wood",rows="";
 function shut(){dlg.style.display="none"}
 P.forEach(function(p){var has=own.indexOf(p.id)>=0,on=p.id===cur;
  rows+="<div class='dst'><img src='"+pthumb(p.id)+"' style='width:96px;height:56px;border-radius:8px;flex:none'><span style='flex:1'><b>"+esc(p.name)+"</b><br><span class='small'>"+(has?"Owned":"\uD83E\uDE99 "+p.cost)+"</span></span>"+(on?"<span class='small'>In use</span>":"<button class='btn"+(has||S.coins>=p.cost?"":" alt")+"' data-p='"+p.id+"'>"+(has?"Use":"Buy")+"</button>")+"</div>"});
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDEA7</div><div class='dtitle'>Perimeter fence</div><div class='dsub'>Applies to your main farm and all your lands. Pay once per design, then switch any time.</div><div style='margin:10px 0 4px;max-height:52vh;overflow-y:auto'>"+rows+"</div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),id,p,has;if(ev.target===dlg){shut();return}if(!b||!b.dataset.p)return;
  id=b.dataset.p;p=P.filter(function(x){return x.id===id})[0];has=own.indexOf(id)>=0;
  if(!has&&S.coins<p.cost){toast(p.name+" costs "+p.cost+" coins. You have "+S.coins+".");return}
  shut();landCall("farmPerim",id,"Changing fence...",function(){toast("\uD83D\uDEA7 Perimeter fence changed")})}}
function prepItems(){FTD={};(S.items||[]).forEach(function(i){KN[i.id]=[i.icon,i.name];if(i.fruit)FTD[i.id]=i;if(/^fl_/.test(i.id)&&!FLG[i.id]){FLG[i.id]=i.icon;DEC[i.id]=function(p){flagDraw(p,i.icon,0,0,0)};HB[i.id]=[-8,-100,54,8]}if(!HB[i.id])HB[i.id]=i.fruit?[-38,-84,38,8]:[-26,-40,26,8]})}
function tapTree(it){var f=FTD[it.k],el=nowT()-it.t;
 if(el>=f.ms){invAdd("i:"+it.k,1);S.xp+=f.xp;it.t=nowT();lvlUp();paint();toast(f.icon+" "+(f.animal?f.prod+" collected":f.name+" harvested")+"! Stored in barn +"+f.xp+" XP");send("farmTreeHarvest",[TOKEN,it.id])}
 else toast(f.name+(f.animal?": next "+f.prod.toLowerCase()+" in ":": fruit is ready in ")+fmtDur(f.ms-el)+". Read a chapter in the Reading Tree to speed it up by 6 hours!")}
function buyItem(i){if(S.level<i.lvl){toast(i.name+" unlocks at level "+i.lvl);return}
 if(S.coins<i.cost){toast(i.name+" costs "+i.cost+" coins. You have "+S.coins+".");return}
 
 if(i.id==="a_cow"&&buyCowShed(i))return;
  if(i.id==="a_chicken"&&buyChickShed(i))return;
if(i.id==="a_sheep"&&buySheepShed(i))return;
 if(i.id==="a_pig"&&buyPigShed(i))return;
  if(i.id==="a_pig"&&buyPigShed(i))return;
 if(i.id==="a_horse"&&buyHorseShed(i))return; /* HORSE SHED: a bought horse goes straight into a horse shed with room */
 var tl=i.out?outFreeTile(i):freeTile(i.id);if(!tl&&isF(i.id))tl=[0,0];if(!tl){toast("No free tile in your field. Make some space first.");return}
  if(MULTI){var id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),o2={id:id2,k:i.id,c:tl[0],r:tl[1],s:1};if(i.fruit)o2.t=nowT();
  S.coins-=i.cost;S.dc.push(o2);send("farmBuyAt",[TOKEN,id2,i.id,tl[0],tl[1]]);send("farmDecor",[TOKEN,id2,0,0,1]);paint();toast("\u2705 "+i.name+" added to barn ("+stored().length+" in barn)");return}
 PEND={id:"d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),k:i.id,c:tl[0],r:tl[1],s:0,t:nowT()};
 $("mkt").style.display="none";setEdit0(true);SEL={t:"d",id:PEND.id};$("buyBar").style.display="flex";drawAll()}
function buyEnd(){PEND=null;SEL=null;$("buyBar").style.display="none";setEdit0(false);$("mkt").style.display="flex";renderMkt()}
$("buyNo").onclick=buyEnd;
$("buyYes").onclick=function(){var P=PEND;if(!P)return;var d=(S.items||[]).filter(function(x){return x.id===P.k})[0];
 if(!d||S.coins<d.cost){toast("Not enough coins.");return}
 var o={id:P.id,k:P.k,c:P.c,r:P.r,s:0};if(d.fruit)o.t=nowT();if(P.rot)o.rot=P.rot;
 S.coins-=d.cost;S.dc.push(o);send("farmBuyAt",[TOKEN,P.id,P.k,P.c,P.r]);if(P.rot)send("farmRotate",[TOKEN,P.id,P.rot]);buyEnd();paint()};
function mThumb(i,dpr){var key=i.id+"@"+dpr,c=MTH[key],a;if(c)return c;
 a=i.animal?[85,95,90,90]:/^fl_/.test(i.id)?[85,65,110,110]:/^f_/.test(i.id)?(isCorner(i.id)?[74,100,112,112]:[103,98,110,110]):/^hh_/.test(i.id)?[30,30,180,180]:/^v_/.test(i.id)?vxcrop(i.id):[60,40,140,140];c=document.createElement("canvas");c.width=c.height=Math.round(84*dpr);c.style.cssText="width:84px;height:84px";
 c.getContext("2d").drawImage(sprite(i.id,dpr,/^f_/.test(i.id)||i.id==="stoplight"?0:2,1),a[0]*dpr,a[1]*dpr,a[2]*dpr,a[3]*dpr,0,0,c.width,c.height);return MTH[key]=c}
function warmMkt(){if(warmMkt.on||!S||!S.items)return;warmMkt.on=1;var dpr=Math.min(1.5,window.devicePixelRatio||1),L=S.items.slice(),k=0;
 (function st(){if(document.hidden){setTimeout(st,500);return}var t0=Date.now();while(k<L.length&&Date.now()-t0<8)mThumb(L[k++],dpr);if(k<L.length)setTimeout(st,50);else warmMkt.on=0})()}
function renderMkt(){var box=$("mList"),dpr=Math.min(1.5,window.devicePixelRatio||1),rid=++MKR,q=[],frag=document.createDocumentFragment();
 box.innerHTML="";MKL=S.level;$("mCoins").textContent="\uD83E\uDE99 "+S.coins;
 $("mtG").className="btn"+(MK==="flag"?"":" alt");$("mtG").className="btn"+(MK==="flag"?"":" alt");$("mtT").className="btn"+(MK==="tree"?"":" alt");$("mtA").className="btn"+(MK==="animal"?"":" alt");$("mtH").className="btn"+(MK==="house"?"":" alt");$("mtD").className="btn"+(MK==="decor"?"":" alt");$("mtN").className="btn"+(MK==="fence"?"":" alt");$("mtF").className="btn"+(MK==="floor"?"":" alt");
 if(MK==="floor"){renderFloors();return}
 if(MK==="scenery"){renderScenery();return}
(S.items||[]).filter(function(i){
  if(i.out)return MK==="out";
  if(MK==="out")return false;
  if(/^fl_/.test(i.id))return MK==="flag";
  if(MK==="flag")return false;
  if(/^v_/.test(i.id))return MK==="veh";
  if(MK==="veh")return false;
  if(i.id==="cowshed"||i.id==="chickenshed"||i.id==="sheepshed"||i.id==="pigshed"||i.id==="horseshed")return MK==="shed";
  if(MK==="shed")return false;
  if(MK==="tree")return !!i.fruit&&!i.animal;
  if(MK==="animal")return !!i.animal;
  if(MK==="fence")return /^f_/.test(i.id);
  if(MK==="house")return !!i.house;
  return !i.fruit&&!i.house&&!/^f_/.test(i.id);
}).sort(function(a,b){return MK==="flag"?0:a.lvl-b.lvl||a.cost-b.cost}).forEach(function(i){
  var lock=S.level<i.lvl,d=document.createElement("div"),v=document.createElement("div"),t=document.createElement("b"),sm=document.createElement("div"),b=document.createElement("button"),th=MTH[i.id+"@"+dpr];
  d.className="mc"+(lock?" lock":"");v.className="mcv";if(th)v.appendChild(th);else q.push([i,v]);
  t.textContent=i.icon+" "+i.name;sm.className="small";
  sm.innerHTML=i.animal?i.prod+" every "+fmtDur(i.ms)+"<br>sells "+i.sell+"\uD83E\uDE99 &middot; +"+i.xp+" XP":i.fruit?"Fruit every "+fmtDur(i.ms)+"<br>sells "+i.sell+"\uD83E\uDE99 &middot; +"+i.xp+" XP":i.out?(i.out==="w"?"Floats on the sea<br>Beyond the beach":"Place on the beach<br>Outside your fences"):/^v_/.test(i.id)?"Vehicle &middot; "+(VLEN[i.id]||"")+"<br>takes "+footW(i.id)+"\u00D7"+footH(i.id)+" tiles":i.house?"Housing &middot; takes "+footW(i.id)+"\u00D7"+footH(i.id)+" tiles":i.id==="stoplight"?"Stands on a tile corner, takes no space":/^f_/.test(i.id)?"Stands on a tile edge, takes no space":"Decoration";
  b.className="btn";b.textContent=lock?"\uD83D\uDD12 Level "+i.lvl:"Buy "+i.cost+"\uD83E\uDE99";b.onclick=function(){buyItem(i)};
  d.appendChild(v);d.appendChild(t);d.appendChild(sm);d.appendChild(b);frag.appendChild(d)});
 box.appendChild(frag);if(MK==="fence")box.insertBefore(perimBanner(),box.firstChild);
 requestAnimationFrame(function nx(){if(rid!==MKR||!q.length)return;var t0=Date.now(),o;while(q.length&&Date.now()-t0<8){o=q.shift();o[1].appendChild(mThumb(o[0],dpr))}if(q.length)requestAnimationFrame(nx)})}
$("mkBtn").onclick=function(){if(PEND)return;BUYING=0;if(EDIT)setEdit(false);side(false);$("mkt").style.display="flex";renderMkt()};
$("mClose").onclick=function(){$("mkt").style.display="none"};
$("mtT").onclick=function(){MK="tree";renderMkt()};$("mtA").onclick=function(){MK="animal";renderMkt()};$("mtH").onclick=function(){MK="house";renderMkt()};
$("mtN").onclick=function(){MK="fence";renderMkt()};$("mtF").onclick=function(){MK="floor";renderMkt()};
$("mtD").onclick=function(){MK="decor";renderMkt()};
$("mtG").onclick=function(){MK="flag";renderMkt()};
$("mtV").onclick=function(){MK="veh";renderMkt()};
$("mtS").onclick=function(){MK="shed";renderMkt()};

function askExpand(e,yes){var cur=S.sz||8,s=cur/e.sz,x1=(112*s).toFixed(1),y1=(56*s).toFixed(1),dlg=$("dlg");
 function shut(){dlg.style.display="none"}
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83C\uDF3E</div><div class='dtitle'>Expand your land?</div>"+
  "<div class='dsub'>"+cur+" x "+cur+" tiles &rarr; <b>"+e.sz+" x "+e.sz+" tiles</b></div>"+
  "<svg viewBox='0 0 240 126' style='width:100%;max-width:250px;margin:10px 0 2px'>"+
  "<polygon points='120,6 232,62 120,118 8,62' fill='#9bdc66' stroke='#fff' stroke-width='2.5' stroke-dasharray='7 5'/>"+
  "<polygon points='120,"+(118-2*Number(y1))+" "+(120+Number(x1))+","+(118-Number(y1))+" 120,118 "+(120-Number(x1))+","+(118-Number(y1))+"' fill='#4f9a2e' stroke='#8a6234' stroke-width='4' stroke-linejoin='round'/>"+
  "<text x='120' y='"+(118-Number(y1)+4)+"' text-anchor='middle' font-size='13' font-weight='700' fill='#fff'>"+cur+" x "+cur+"</text></svg>"+
  "<div class='drow'><span class='dchip'>\uD83E\uDE99 "+e.cost+"</span><span class='dchip'>Level "+e.lvl+" \u2713</span><span class='dchip'>Left: \uD83E\uDE99 "+(S.coins-e.cost)+"</span></div>"+
  "<div class='dsub'>The land grows toward the back. The sea stays in front. Everything you built stays in place.</div>"+
  "<div class='dbtns'><button class='btn alt' id='dNo'>Cancel</button><button class='btn ok' id='dYes'>\u2705 Expand</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;$("dYes").onclick=function(){shut();yes()};dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
 function goLand(L){var q=landRect(L),n=S.sz||8,c=(q.c0+q.c1)/2,r=(q.r0+q.r1)/2,hh=$("hud").offsetHeight,t;
 setRot($("field"));t=rp(c,r);c=t[0];r=t[1];
 $("field")._anc={sx:window.innerWidth/2,sy:hh+(window.innerHeight-$("botBar").offsetHeight-hh)/2,cx:(n+2)*56+30+(c-r)*56,cy:186+(c+r)*28};fitAll()}
function landCall(fn,arg,msg,after){busyShow(msg);flush(function(){call(fn,[TOKEN,arg],function(s){setState(s);busyHide();if(after)after(s)},function(m){busyHide();toast(m)})})}
function landDlg(){var dlg=$("dlg"),B=S.landBuy||{price:0,cells:[]},L=S.ls||[],E=S.landExp||[],rows="",grid="",cells=B.cells||[];
 function shut(){dlg.style.display="none"}
 function nm(x,k){return"Land "+(k+1)}
 cells.forEach(function(x){var main=x.i===0&&x.j===0,txt,cls="btn alt",att="";
  if(main)txt="\uD83C\uDFE1<br>Main";
  else if(x.st===0)txt="\u2705<br>Owned";
  else if(x.st===1){txt="\uD83E\uDE99 "+B.price;cls="btn";att=" data-b='"+x.i+","+x.j+"'"}
  else{txt="\uD83D\uDD12";att=" data-l='1'"}
  grid+="<button class='"+cls+"'"+att+" style='padding:12px 2px;font-size:12px;border-radius:12px'>"+txt+"</button>"});
 grid="<div style='display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0'>"+grid+"</div>";
 L.forEach(function(x,i){var e=E[i],ok=e&&S.level>=e.lvl&&S.coins>=e.cost;
  rows+="<div class='dst'><span style='flex:1'><b>"+nm(x,i)+"</b><br><span class='small'>"+x.z+" x "+x.z+"</span></span>"+(e?"<button class='btn"+(ok?"":" alt")+"' data-e='"+i+"'>"+x.z+"\u2192"+e.sz+" \uD83E\uDE99 "+e.cost+" (Lv "+e.lvl+")</button>":"<span class='small'>full size</span>")+"<button class='btn alt' data-g='"+i+"'>\uD83D\uDCCD</button></div>"});
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83C\uDFDE\uFE0F</div><div class='dtitle'>Your lands</div><div class='dsub'>"+((S.sz||8)<60?"Expand your main farm to 60 x 60 first.":"Buy any square next to a full-size land (diagonal counts). Fill all 9 squares to make one big square. Each new land starts small with a barn and 4 plots.")+"</div>"+grid+"<div style='margin:6px 0 4px;max-height:34vh;overflow-y:auto'>"+rows+"</div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),i;if(ev.target===dlg){shut();return}if(!b)return;
  if(b.dataset.l){toast((S.sz||8)<60?"Expand your main farm to 60 x 60 first.":"Expand a land next to this square to 60 x 60 first (diagonal counts).");return}
  if(b.dataset.b){if((S.sz||8)<60){toast("Expand your main farm to 60 x 60 first.");return}if(S.coins<B.price){toast("A new land costs "+B.price+" coins. You have "+S.coins+".");return}shut();landCall("farmBuyLand",b.dataset.b,"Buying land...",function(ns){goLand(ns.ls[ns.ls.length-1]);toast("\uD83C\uDFDE\uFE0F New land bought! A barn and 4 plots are ready.")})}
  else if(b.dataset.e){i=Number(b.dataset.e);var e=E[i];if(!e||S.level<e.lvl||S.coins<e.cost){toast(e?"Needs level "+e.lvl+" and \uD83E\uDE99 "+e.cost:"Full size");return}shut();landCall("farmExpandLand",i,"Expanding land...",function(ns){toast("\uD83C\uDF3E Land expanded to "+ns.ls[i].z+" x "+ns.ls[i].z)})}
  else if(b.dataset.g){shut();goLand(L[Number(b.dataset.g)])}}}
var ICD={cauliflower:[24,35,1.8],beet:[24,34,2],raspberry:[24,34,2.6],ginger:[24,38,1.9],
 peas:[24,43,1.45],radish:[24,30,2.2],turnip:[24,32,1.7],sitaw:[24,44,1.35],kangkong:[24,43,1.6],spinach:[24,30,1.7],ampalaya:[24,42,1.45],celery:[24,44,1.3],lavender:[24,44,1.15],taro:[24,41,1.25],kale:[24,30,1.7],cassava:[24,34,1.4],ube:[24,31,2.1],asparagus:[24,44,1.35],poppy:[24,44,1.2],sampaguita:[24,43,1.6],snapdragon:[24,44,1.15],zucchini:[24,30,2],cucumber:[24,40,1.6]},CI={};
 NEWFL_IDS.forEach(function(k){ICD[k]=[24,42,1]});
