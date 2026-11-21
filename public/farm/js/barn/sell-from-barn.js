  // ===== SELL FROM THE BARN: one kind of item, or everything =====
function sellable(s){var it=s.t==="d"&&dcById(s.id);return !!it&&it.k!=="barn"&&(S.items||[]).some(function(x){return x.id===it.k})}
function addSellBtn(k,g,box){var l=g.filter(sellable),sb;if(!l.length)return;sb=document.createElement("button");sb.className="btn alt";sb.textContent="\uD83D\uDCB0 Sell";sb.onclick=function(){sellStoredDlg(k,l)};box.appendChild(sb)}
function sellStoredDo(l){var tot=0,ids={},BL=[];
 l.forEach(function(s){var it=dcById(s.id);if(!it||ids[it.id])return;tot+=sellVal(it);ids[it.id]=1;BL.push(["farmSell",[TOKEN,it.id]])});
 if(!BL.length)return 0;
 S.coins+=tot;S.dc=S.dc.filter(function(x){return!ids[x.id]});
 if(PLACING&&PLACING.t==="d"&&ids[PLACING.id])PLACING=null;
 sendMany(BL);return tot}
function sellStoredDlg(k,l){var dlg=$("dlg"),inp,tot,have=l.length,kn=KN[k]||["?",k];
 function shut(){dlg.style.display="none"}
 $("dlgBody").innerHTML="<div style='font-size:44px;line-height:1'>"+kn[0]+"</div><div class='dtitle'>Sell "+esc(kn[1])+"</div><div class='dsub'>In your barn: <b>"+have+"</b><br>You get half the price back.</div><div style='margin:8px 0'><input id='ssN' type='number' min='1' max='"+have+"' value='"+have+"' style='width:120px;font-size:16px;padding:6px;border-radius:8px;text-align:center'></div><div class='small' id='ssTot'></div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button><button class='btn ok' id='ssSell'>Sell</button></div>";
 inp=$("ssN");tot=$("ssTot");
 function n0(){return Math.max(0,Math.min(have,Math.floor(+inp.value||0)))}
 function val(n){var s=0,i;for(i=0;i<n;i++)s+=sellVal(dcById(l[i].id));return s}
 function upd(){var n=n0();tot.textContent=n+" = +\uD83E\uDE99 "+val(n)}
 upd();inp.oninput=upd;dlg.style.display="flex";$("dNo").onclick=shut;dlg.onclick=function(ev){if(ev.target===dlg)shut()};
 $("ssSell").onclick=function(){var n=n0(),g;if(n<1){toast("Choose how many to sell.");return}
  g=sellStoredDo(l.slice(0,n));paint();renderBarn();editUI();drawAll();
  try{FarmAudio.play("sell")}catch(e){}
  toast("\uD83D\uDCB0 Sold "+n+" "+kn[1]+" for +"+g+"\uD83E\uDE99");shut()}}
function sellAllInfo(){var l=stored().filter(sellable),tot=0;l.forEach(function(s){tot+=sellVal(dcById(s.id))});return{l:l,n:l.length,tot:tot}}
function sellAllTiles(){var rate=S.sellRate||.5,n=0,tot=0;Object.keys(S.ft||{}).forEach(function(id){var f=floorDef(id),c=S.ft[id]|0;if(!f||c<1)return;n+=c;tot+=Math.floor(c*f.cost*rate)});return{n:n,tot:tot}}
function sellAllDlg(){var a=sellAllInfo(),t=sellAllTiles();
 if(!a.n&&!t.n){toast("Nothing to sell in the barn.");return}
 infoDlg("\uD83D\uDCB0","Sell everything in the barn?","Every item and floor tile in your barn is sold for half its price. Plots are not sold. This cannot be undone.",["Items: "+a.n,"Floor tiles: "+t.n,"You get: +"+(a.tot+t.tot)+"\uD83E\uDE99"],
  function(){var a2=sellAllInfo(),rate=S.sellRate||.5,coins=sellStoredDo(a2.l);
   Object.keys(S.ft||{}).forEach(function(id){var f=floorDef(id),c=S.ft[id]|0,g;if(!f||c<1)return;g=Math.floor(c*f.cost*rate);coins+=g;S.coins+=g;delete S.ft[id];send("farmFloorSell",[TOKEN,id,c])});
   paint();renderBarn();editUI();drawAll();
   try{FarmAudio.play("sell")}catch(e){}
   toast("\uD83D\uDCB0 Sold everything for +"+coins+"\uD83E\uDE99")},"Sell all")}
$("barnSellAll").onclick=sellAllDlg;
// the tile buttons on the edit bar
(function(){var b=document.createElement("button");b.className="btn alt";b.id="edFRot";b.style.display="none";$("edAll").parentNode.insertBefore(b,$("edAll"));
 b.onclick=function(){if(!PAINT)return;var s=PAINT.turn?4:(PAINT.rot|0);s=(s+1)%5;PAINT.turn=s===4?1:0;PAINT.rot=s===4?0:s;editUI();drawAll()}})();
var _editUI0=editUI;
editUI=function(){_editUI0.apply(this,arguments);document.body.classList.toggle("paint-top",!!(EDIT||PAINT||PLACING||SEL));var f,tile,b=$("edFRot");
 if(!PAINT){b.style.display="none";return}
 f=floorDef(PAINT.id)||{id:"",name:""};tile=isTileF(f.id);
 b.style.display=(tile||PAINT.turn)?"":"none";
 b.textContent="\u21BB "+(PAINT.turn?"Turn tiles by tapping":["Place straight","Place turned 90\u00B0","Place turned 180\u00B0","Place turned 270\u00B0"][PAINT.rot|0]);
 $("edAll").style.display=PAINT.turn?"none":"";
 $("edAll").textContent=tile?"\uD83E\uDDF1 Place all":f.id==="gr"?"\uD83D\uDCE6 Store all":"\uD83E\uDEA3 Paint all";
 $("edTxt").textContent=PAINT.turn?"Tap floor tiles to turn them a quarter turn - brush "+PAINT.size+"x"+PAINT.size:tile?"Placing "+f.name+" tiles ("+haveTiles(f.id)+" in barn) - brush "+PAINT.size+"x"+PAINT.size:f.id==="gr"?"Tap tiles to store them in the barn - brush "+PAINT.size+"x"+PAINT.size:"Painting water (\uD83E\uDE99 "+f.cost+" per tile) - brush "+PAINT.size+"x"+PAINT.size};
var FLAST=[];
(function(){
var b=document.createElement("button");b.id="flRotBtn";b.className="btn";
b.style.cssText="position:fixed;left:50%;transform:translateX(-50%);z-index:21;display:none;font-size:15px;padding:9px 16px;box-shadow:0 3px 10px rgba(0,0,0,.4)";
b.textContent="\u21BB Rotate placed tiles";document.body.appendChild(b);
function flBtn(){var show=!!PAINT&&!PAINT.turn&&isTileF(PAINT.id)&&FLAST.length>0&&!PEND;b.style.display=show?"block":"none";
 if(show)b.style.top=($("editbar").getBoundingClientRect().bottom+8)+"px"}
var _afk=applyFloorKeys;
applyFloorKeys=function(f,keys,rot){_afk.apply(this,arguments);FLAST=isTileF(f.id)?keys.slice():[];flBtn()};
var _eu2=editUI;
editUI=function(){_eu2.apply(this,arguments);if(!PAINT)FLAST=[];flBtn()};
b.onclick=function(){var ks=FLAST.filter(function(k){return S.fl&&S.fl[k]&&S.fl[k]!=="wt"}),i;if(!ks.length)return;if(!S.fr)S.fr={};
 ks.forEach(function(k){var v=((S.fr[k]|0)+1)&3;if(v)S.fr[k]=v;else delete S.fr[k]});FLN++;
 for(i=0;i<ks.length;i+=400)send("farmFloorRot",[TOKEN,ks.slice(i,i+400)]);paint();drawAll();toast("\u21BB Turned "+ks.length+" tile"+(ks.length>1?"s":""))}
})();

(function(){
var b=document.createElement("button");b.className="btn alt";b.id="edSellG";b.style.display="none";
$("edSell").parentNode.insertBefore(b,$("edSell").nextSibling);
function grp(){var out=[],it,g0;if(!SEL||SEL.t!=="d")return out;g0=dcById(SEL.id);if(!g0||g0.k==="barn")return out;
 grpOf(SEL).forEach(function(s){if(s.t!=="d")return;it=dcById(s.id);if(it&&!it.s&&it.k!=="barn")out.push(it)});return out}
var _eu3=editUI;
editUI=function(){_eu3.apply(this,arguments);var g=$("edSell").style.display!=="none"&&SEL&&SEL.t==="d";b.style.display=g?"":"none";if(g)b.textContent="\uD83D\uDCB0 Sell group"};
b.onclick=function(){var l=grp(),tot=0,sg,ids;if(!l.length)return;
 l.forEach(function(it){tot+=sellVal(it)});
 sg=l.map(function(it){return it.id}).join(",")+"|sell";
 if(GCONF!==sg){GCONF=sg;GPREV=l.map(function(it){return[it.c,it.r]});drawAll();toast("The yellow tiles are the group ("+l.length+"). Tap Sell group again to sell them all for +"+tot+"\uD83E\uDE99");return}
 GCONF=null;GPREV=null;
 ids={};l.forEach(function(it){ids[it.id]=1});
 S.coins+=tot;S.dc=S.dc.filter(function(x){return!ids[x.id]});
 sendMany(l.map(function(it){return["farmSell",[TOKEN,it.id]]}));
 SEL=null;paint();editUI();drawAll();
 try{FarmAudio.play("sell")}catch(e){}
 toast("\uD83D\uDCB0 Sold a group of "+l.length+" for +"+tot+"\uD83E\uDE99")};
})();

(function(){
var b=document.createElement("button");b.className="btn alt";b.id="lStoAll";b.textContent="\uD83D\uDCE6 Store all";
$("lStore").parentNode.insertBefore(b,$("lStore"));
b.onclick=function(){if(!LAY)return;var n=0,skip=0,i;
 for(i=0;i<LAY.pp.length;i++)if(LAY.pp[i]){if(S.plots[i])skip++;else n++}
 LAY.dc.forEach(function(o){if(!o.s&&o.k!=="barn")n++});
 if(!n){toast(skip?"Planted plots can't be stored. Harvest them first.":"Nothing to store");return}
 laySnap();
 for(i=0;i<LAY.pp.length;i++)if(LAY.pp[i]&&!S.plots[i])LAY.pp[i]=null;
 LAY.dc.forEach(function(o){if(!o.s&&o.k!=="barn")o.s=1});
 SEL=null;PLACING=null;layUI();drawAll();
 toast("\uD83D\uDCE6 Stored "+n+" items in this layout"+(skip?" ("+skip+" planted plots skipped)":"")+". Tap Undo to bring them back, or Close to throw this away.")};
})();

