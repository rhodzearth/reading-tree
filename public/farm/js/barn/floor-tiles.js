/* ===== FLOOR TILES: bought into the barn, placed, turned, stored back. This block replaces the old "paint" functions above (water is still painted). ===== */
BAT.farmFloorBuy="fb";BAT.farmFloorSell="fx";BAT.farmFloorRot="fr";
BAT.farmInvSell="is";BAT.farmInvSellAll="ia";
function frOf(cv){return cv&&cv.id==="vCanvas"?(V&&V.fr):(S&&S.fr)}
function ftileR(id,dpr,rot){var key="R|"+id+"|"+dpr+"|"+rot,c=FTS[key],cx,b;if(!rot)return ftile(id,dpr,0);if(c)return c;
 b=ftile(id,dpr,0);c=document.createElement("canvas");c.width=b.width;c.height=b.height;cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);cx.translate(57,29);
 if(rot===1)cx.transform(0,.5,-2,0,0,0);else if(rot===2)cx.scale(-1,-1);else cx.transform(0,-.5,2,0,0,0);
 cx.drawImage(b,-57,-29,114,58);return FTS[key]=c}
function isTileF(id){return id!=="gr"&&id!=="wt"}
function haveTiles(id){return (S.ft&&S.ft[id])|0}
// change the floor data on the screen (the server does the same when the action arrives)
function applyFloorKeys(f,keys,rot){var used=0;if(!S.fl)S.fl={};if(!S.fr)S.fr={};if(!S.ft)S.ft={};
 keys.forEach(function(k){var old=S.fl[k];
  if(f.id==="gr"||f.id==="wt"){if(old&&old!=="wt")S.ft[old]=(S.ft[old]|0)+1;if(f.id==="gr")delete S.fl[k];else S.fl[k]="wt";delete S.fr[k];return}
  if(old!==f.id){if(old&&old!=="wt")S.ft[old]=(S.ft[old]|0)+1;used++}
  S.fl[k]=f.id;if(rot)S.fr[k]=rot;else delete S.fr[k]});
 if(isTileF(f.id)){S.ft[f.id]=(S.ft[f.id]|0)-used;if(S.ft[f.id]<=0)delete S.ft[f.id]}
 FLN++}
function sendFloorKeys(f,keys,rot){var BL=[],j;for(j=0;j<keys.length;j+=400)BL.push(["farmFloor",[TOKEN,f.id,keys.slice(j,j+400),rot]]);if(BL.length===1)send(BL[0][0],BL[0][1]);else sendMany(BL)}
function buyFloorDlg(f){var dlg=$("dlg"),q=[10,50,100,500,1000,5000],rows="",inp,tot;
 function shut(){dlg.style.display="none"}
 q.forEach(function(n){rows+="<button class='btn alt' data-n='"+n+"' style='margin:3px'>"+n+"</button>"});
 $("dlgBody").innerHTML="<div id='fbThumb' style='width:84px;height:84px;margin:0 auto'></div><div class='dtitle'>"+esc(f.name)+" tiles</div><div class='dsub'>\uD83E\uDE99 "+f.cost+" per tile &middot; In your barn: <b id='fbHave'>"+haveTiles(f.id)+"</b><br>Bought tiles are kept in your barn. Place them on your land, turn them, or store them back.</div><div style='margin:8px 0'>"+rows+"</div><div style='margin:6px 0'><input id='fbN' type='number' min='1' max='20000' value='100' style='width:120px;font-size:16px;padding:6px;border-radius:8px;text-align:center'></div><div class='small' id='fbTot'></div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button><button class='btn ok' id='fbBuy'>Buy</button></div>";
 $("fbThumb").appendChild(fThumb(f.id,Math.min(1.5,window.devicePixelRatio||1)));
 inp=$("fbN");tot=$("fbTot");
 function n0(){return Math.max(0,Math.min(20000,Math.floor(+inp.value||0)))}
 function upd(){var n=n0();tot.textContent=n+" tiles = \uD83E\uDE99 "+(n*f.cost)+"  (you have \uD83E\uDE99 "+S.coins+")"}
 upd();inp.oninput=upd;dlg.style.display="flex";$("dNo").onclick=shut;
 $("fbBuy").onclick=function(){var n=n0(),cost=n*f.cost;
  if(S.level<f.lvl){toast(f.name+" unlocks at level "+f.lvl);return}
  if(n<1){toast("Choose how many tiles to buy.");return}
  if(S.coins<cost){toast(n+" tiles cost "+cost+" coins. You have "+S.coins+".");return}
  S.coins-=cost;if(!S.ft)S.ft={};S.ft[f.id]=(S.ft[f.id]|0)+n;send("farmFloorBuy",[TOKEN,f.id,n]);
  $("fbHave").textContent=S.ft[f.id];upd();toast("\uD83E\uDDF1 "+n+" "+f.name+" tiles are in your barn");paint();renderBarn();if(MK==="floor")renderMkt()};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button");if(ev.target===dlg){shut();return}if(b&&b.dataset.n){inp.value=b.dataset.n;upd()}}}
function startPaint(f){var sz=PAINT?PAINT.size:1,rot=PAINT?PAINT.rot|0:0;
 if(isTileF(f.id)&&!haveTiles(f.id)){toast("You have no "+f.name+" tiles in your barn. Tap Buy tiles first.");return}
 PEND=null;$("buyBar").style.display="none";BUYING=0;$("mkt").style.display="none";
 setEdit0(true);PAINT={id:f.id,size:sz,rot:rot,turn:0};editUI();drawAll();
 toast(f.id==="gr"?"\uD83D\uDCE6 Tap tiles to take floor tiles back to your barn.":f.id==="wt"?"\uD83D\uDD8C Tap tiles to paint water (\uD83E\uDE99 "+f.cost+" per tile). Use Brush for bigger areas.":"\uD83E\uDDF1 Tap tiles to place "+f.name+" from your barn ("+haveTiles(f.id)+" left). Use \u21BB to turn them, Brush for bigger areas.")}
function paintAt(tc,tr){var f=PAINT&&floorDef(PAINT.id),sz,h,pl={},i,c,r,key,tl=[],fresh=[],turnL=[],n,cost,tile,rot,have,keys;
 if(!f)return;sz=PAINT.size;h=(sz-1)/2;if(!S.fl)S.fl={};if(!S.fr)S.fr={};if(!S.ft)S.ft={};
 for(i=0;i<S.np;i++)if(S.pp[i])pl[flKey(S.pp[i][0],S.pp[i][1])]=1;
 (S.dc||[]).forEach(function(o){if(!o.s&&!isF(o.k))pl[flKey(o.c,o.r)]=1});
 tile=isTileF(f.id);rot=PAINT.turn?0:(PAINT.rot|0);
 for(c=tc-h;c<=tc+h;c++)for(r=tr-h;r<=tr+h;r++){if(!inLandP(parS(),c,r)&&!(!outLocked()&&zoneAt(c,r)==="b"))continue;key=flKey(c,r);
  if(PAINT.turn){if(S.fl[key]&&S.fl[key]!=="wt")tl.push(key);continue}
  if(f.id==="gr"){if(S.fl[key])tl.push(key);continue}
  if(S.fl[key]===f.id){if(tile&&(S.fr[key]|0)!==rot)turnL.push(key);continue}
  if(f.id==="wt"&&pl[key])continue;
  fresh.push(key)}
 if(PAINT.turn){if(!tl.length){toast("No floor tiles here to turn.");return}
  tl.forEach(function(k){var v=((S.fr[k]|0)+1)&3;if(v)S.fr[k]=v;else delete S.fr[k]});FLN++;
  for(i=0;i<tl.length;i+=400)send("farmFloorRot",[TOKEN,tl.slice(i,i+400)]);paint();drawAll();toast("\u21BB Turned "+tl.length+" tile"+(tl.length>1?"s":""));return}
 if(f.id==="gr"){if(!tl.length){toast(sz>1?"No floor tiles here.":"No floor tile here.");return}
  applyFloorKeys(f,tl,0);sendFloorKeys(f,tl,0);paint();drawAll();renderBarn();toast("\uD83D\uDCE6 Tiles stored in your barn");return}
 if(f.id==="wt"){if(!fresh.length){toast(sz>1?"Nothing to change here.":"Already water.");return}
  n=Math.min(fresh.length,Math.floor(S.coins/f.cost));if(!n){toast(f.name+" costs "+f.cost+" coins per tile. You have "+S.coins+".");return}
  keys=fresh.slice(0,n);cost=n*f.cost;S.coins-=cost;applyFloorKeys(f,keys,0);sendFloorKeys(f,keys,0);paint();drawAll();renderBarn();
  toast("\uD83D\uDD8C "+f.name+" x"+n+" (-"+cost+"\uD83E\uDE99)");return}
 if(!fresh.length&&!turnL.length){toast(sz>1?"Nothing to change here.":"Already this tile.");return}
 have=haveTiles(f.id);
 if(!have&&!turnL.length){toast("No "+f.name+" tiles left in your barn.");buyFloorDlg(f);return}
 n=Math.min(fresh.length,have);keys=fresh.slice(0,n).concat(turnL);
 applyFloorKeys(f,keys,rot);sendFloorKeys(f,keys,rot);paint();drawAll();renderBarn();
 toast(n<fresh.length?"\uD83E\uDDF1 Your barn ran out of "+f.name+" tiles":"\uD83E\uDDF1 "+f.name+" x"+keys.length+" ("+haveTiles(f.id)+" left in barn)")}
$("edAll").onclick=function(){var f=PAINT&&floorDef(PAINT.id),pl={},tl=[],fresh=[],turnL=[],n,cost,tile,rot,have,ttl,sub,chips;
 if(!f||PAINT.turn)return;if(!S.fl)S.fl={};if(!S.fr)S.fr={};if(!S.ft)S.ft={};
 tile=isTileF(f.id);rot=PAINT.rot|0;have=haveTiles(f.id);
 for(var i=0;i<S.np;i++)if(S.pp[i])pl[flKey(S.pp[i][0],S.pp[i][1])]=1;
 (S.dc||[]).forEach(function(o){if(!o.s&&!isF(o.k))pl[flKey(o.c,o.r)]=1});
 parS().forEach(function(q){var c,r,key;
  for(r=q.r0;r<q.r1;r++)for(c=q.c0;c<q.c1;c++){key=flKey(c,r);
   if(f.id==="gr"){if(S.fl[key])tl.push(key);continue}
   if(S.fl[key]===f.id){if(tile&&(S.fr[key]|0)!==rot)turnL.push(key);continue}
   if(f.id==="wt"&&pl[key])continue;
   fresh.push(key)}});
 if(f.id==="gr"){if(!tl.length){toast("No floor tiles to store.");return}
  infoDlg("\uD83D\uDCE6","Store all floor tiles?","Every placed floor tile (not water) goes back to your barn. Water is removed.",["Tiles: "+tl.length],
   function(){applyFloorKeys(f,tl,0);sendFloorKeys(f,tl,0);paint();drawAll();renderBarn();toast("\uD83D\uDCE6 Tiles stored in your barn")},"Store all");return}
 if(f.id==="wt"){if(!fresh.length){toast("Nothing to change. Everything already has water.");return}
  n=Math.min(fresh.length,Math.floor(S.coins/f.cost));if(!n){toast(f.name+" costs "+f.cost+" coins per tile. You have "+S.coins+".");return}cost=n*f.cost;
  infoDlg("\uD83E\uDEA3","Paint all with "+f.name+"?",n<fresh.length?"You can afford "+n+" of the "+fresh.length+" tiles, so only those will be painted.":"Every free tile of your land will become water.",
   ["Tiles: "+n,"\uD83E\uDE99 "+cost,"Left: \uD83E\uDE99 "+(S.coins-cost)],
   function(){var keys;if(S.coins<cost){toast("Not enough coins.");return}keys=fresh.slice(0,n);S.coins-=cost;applyFloorKeys(f,keys,0);sendFloorKeys(f,keys,0);paint();drawAll();renderBarn();toast("\uD83D\uDD8C "+f.name+" x"+n+" (-"+cost+"\uD83E\uDE99)")},"Paint all");return}
 if(!fresh.length&&!turnL.length){toast("Nothing to change. Everything already has this tile.");return}
 if(!have&&!turnL.length){toast("No "+f.name+" tiles in your barn. Buy some first.");buyFloorDlg(f);return}
 n=Math.min(fresh.length,have);
 infoDlg("\uD83E\uDDF1","Place all "+f.name+"?",n<fresh.length?"Your barn has "+n+" tiles for "+fresh.length+" free spaces, so only "+n+" will be placed. Buy more tiles to cover the rest.":"Every free tile of your land will get "+f.name+".",
  ["Tiles: "+n,"In barn: "+have,"Left: "+(have-n)],
  function(){var keys=fresh.slice(0,n).concat(turnL);applyFloorKeys(f,keys,rot);sendFloorKeys(f,keys,rot);paint();drawAll();renderBarn();toast("\uD83E\uDDF1 "+f.name+" x"+keys.length)},"Place all")};
function renderFloors(){var box=$("mList"),dpr=Math.min(1.5,window.devicePixelRatio||1),frag=document.createDocumentFragment(),L=[{id:"gr",name:"Grass",cost:0,lvl:1}].concat(S.fls||[]);
 L.forEach(function(f){var lock=S.level<f.lvl,tile=isTileF(f.id),d=document.createElement("div"),v=document.createElement("div"),t=document.createElement("b"),sm=document.createElement("div"),b=document.createElement("button"),b2;
  d.className="mc"+(lock?" lock":"");v.className="mcv";v.appendChild(fThumb(f.id,dpr));t.textContent=f.name;sm.className="small";
  sm.innerHTML=f.id==="gr"?"Free &middot; default<br>Takes floor tiles back to your barn":f.id==="wt"?f.cost+"\uD83E\uDE99 per tile<br>Painted, not stored. Nothing can be placed on water":f.cost+"\uD83E\uDE99 per tile<br>In your barn: <b>"+haveTiles(f.id)+"</b>";
  d.appendChild(v);d.appendChild(t);d.appendChild(sm);
  if(lock){b.className="btn";b.textContent="\uD83D\uDD12 Level "+f.lvl;b.onclick=function(){toast(f.name+" unlocks at level "+f.lvl)};d.appendChild(b)}
  else if(tile){b.className="btn";b.textContent="Buy tiles";b.onclick=function(){buyFloorDlg(f)};b2=document.createElement("button");b2.className="btn alt";b2.textContent="Place";b2.style.marginLeft="6px";b2.onclick=function(){startPaint(f)};d.appendChild(b);d.appendChild(b2)}
  else{b.className="btn";b.textContent=f.id==="gr"?"Store tiles":"Paint";b.onclick=function(){startPaint(f)};d.appendChild(b)}
  frag.appendChild(d)});
 box.appendChild(frag)}
function renderBarn(){var box=$("barnList"),l=stored(),G2={},ks=[],tl=Object.keys(S.ft||{}).filter(function(id){return (S.ft[id]|0)>0});box.innerHTML="";$("edBarn").textContent="\uD83C\uDFE1 Barn ("+(l.length+tl.reduce(function(a,id){return a+(S.ft[id]|0)},0))+")";
 $("barnUndo").style.display=UNDO.length?"":"none";$("edUndo").style.display=UNDO.length?"":"none";
 $("barnSellAll").style.display=(l.some(sellable)||tl.length)?"":"none";if(!l.length&&!tl.length){box.textContent="Barn is empty.";return}
 l.forEach(function(s){var k=gkey(s);if(!G2[k]){G2[k]=[];ks.push(k)}G2[k].push(s)});
 ks.forEach(function(k){if(invIsAni(k))return;var g=G2[k],ic=k==="p"?"\uD83D\uDFEB":(KN[k]||["?",k])[0],nm=k==="p"?"Plot":(KN[k]||["?",k])[1],b=document.createElement("button");
  b.className="btn alt";b.textContent=ic+" "+nm+" \u00D7"+g.length;
  b.onclick=function(){PLACING=g[0];SEL=null;$("barnP").style.display="none";editUI();drawAll()};box.appendChild(b);addSellBtn(k,g,box)});
 tl.forEach(function(id){var f=floorDef(id)||{id:id,name:id},b=document.createElement("button");b.className="btn alt";b.textContent="\uD83E\uDDF1 "+f.name+" tile \u00D7"+S.ft[id];
  b.onclick=function(){$("barnP").style.display="none";startPaint(f)};box.appendChild(b);
  var sb=document.createElement("button");sb.className="btn alt bsell";sb.textContent="\uD83D\uDCB0 Sell";sb.onclick=function(){sellFloorDlg(f)};box.appendChild(sb)})}
function sellFloorDlg(f){var dlg=$("dlg"),inp,tot,have=haveTiles(f.id),rate=S.sellRate||.5;
 function shut(){dlg.style.display="none"}
 $("dlgBody").innerHTML="<div id='fsThumb' style='width:84px;height:84px;margin:0 auto'></div><div class='dtitle'>Sell "+esc(f.name)+" tiles</div><div class='dsub'>In your barn: <b>"+have+"</b><br>You get half the price back.</div><div style='margin:8px 0'><input id='fsN' type='number' min='1' max='"+have+"' value='"+have+"' style='width:120px;font-size:16px;padding:6px;border-radius:8px;text-align:center'></div><div class='small' id='fsTot'></div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button><button class='btn ok' id='fsSell'>Sell</button></div>";
 $("fsThumb").appendChild(fThumb(f.id,Math.min(1.5,window.devicePixelRatio||1)));
 inp=$("fsN");tot=$("fsTot");
 function n0(){return Math.max(0,Math.min(have,Math.floor(+inp.value||0)))}
 function upd(){var n=n0();tot.textContent=n+" tiles = +\uD83E\uDE99 "+Math.floor(n*f.cost*rate)}
 upd();inp.oninput=upd;dlg.style.display="flex";$("dNo").onclick=shut;
 $("fsSell").onclick=function(){var n=n0(),g;
  if(n<1){toast("Choose how many tiles to sell.");return}
  g=Math.floor(n*f.cost*rate);S.coins+=g;S.ft[f.id]=have-n;if(S.ft[f.id]<=0)delete S.ft[f.id];
  send("farmFloorSell",[TOKEN,f.id,n]);paint();renderBarn();
  try{FarmAudio.play("sell")}catch(e){}
  toast("\uD83D\uDCB0 Sold "+n+" "+f.name+" tiles for +"+g+"\uD83E\uDE99");shut()}}
