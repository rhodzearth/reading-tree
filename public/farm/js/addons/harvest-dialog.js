/* ===== HARVEST DIALOG ===== */
(function(){
var st=document.createElement("style");
st.textContent=
".hvT{display:flex;align-items:center;gap:12px;text-align:left;margin-bottom:6px}"+
".hvI{width:54px;height:54px;border-radius:18px;background:linear-gradient(145deg,#ffd86a,#f08a1c);display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 3px 0 #a85a0c,0 6px 14px rgba(0,0,0,.25);flex:none}"+
".hvT .dtitle{margin:0;font-size:22px}"+
".hvR{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid rgba(255,255,255,.45);border-radius:20px;padding:11px 12px;margin:8px 0;background:var(--gl2);color:var(--tx);font:inherit;cursor:pointer;transition:transform .12s,box-shadow .12s;box-shadow:0 2px 8px rgba(0,0,0,.15);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}"+
".hvR:active:not(:disabled){transform:scale(.97)}"+
".hvR:disabled{opacity:.45;cursor:default;box-shadow:none}"+
".hvE{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:27px;flex:none;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2),0 2px 6px rgba(0,0,0,.25)}"+
".hvM{flex:1;min-width:0}.hvM b{display:block;font-size:15px}.hvM .small{display:block;margin-top:1px}"+
".hvS{margin-top:4px;line-height:0}.hvS img{width:24px;height:24px;margin-right:3px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))}"+
".hvN{min-width:40px;padding:6px 12px;border-radius:99px;background:linear-gradient(180deg,#4caf50,#2f7d32);color:#fff;font-weight:800;font-size:15px;text-align:center;box-shadow:0 2px 0 #1b5e20;flex:none}"+
".hvR:disabled .hvN{background:#8a9088;box-shadow:none}"+
".hvA{width:100%;padding:14px 8px;font-size:16px;margin-top:6px;background:linear-gradient(180deg,#ffb84a,#e8861c)!important;box-shadow:0 3px 0 #a85a0c!important;font-weight:700}"+
".hvA:disabled{opacity:.45;box-shadow:none!important}";
document.head.appendChild(st);

var MV={cowshed:["a_cow","\uD83D\uDC04"],sheepshed:["a_sheep","\uD83D\uDC11"],pigshed:["a_pig","\uD83D\uDC37"],chickenshed:["a_chicken","\uD83D\uDC14"]};
function rawAdd(key){if(!S.inv)S.inv={};if(!S.invp)S.invp={};S.inv[key]=(S.inv[key]||0)+1;if(!S.invp[key])S.invp[key]=invUnit(key)}
function pos(c,r,dy){return(window.FarmFX&&FarmFX.scr)?FarmFX.scr(c,r,dy):null}
function mid(it,dy){return pos(it.c+(footW(it.k)-1)/2,it.r+(footH(it.k)-1)/2,dy)}
function shedOf(it){return shedList().filter(function(sd){return sd.cw&&sd.cw.indexOf(it.id)>=0})[0]}

function scan(){var now=nowT(),o={crops:[],fruits:[],prods:[],moves:[]};
 S.plots.forEach(function(p,i){var q=S.pp[i];if(p&&q&&isRipe(p))o.crops.push({i:i,p:p,q:q})});
 (S.dc||[]).forEach(function(it){var f=FTD[it.k];if(!f)return;
  if(!it.s){if(now-it.t>=f.ms)(f.animal?o.prods:o.fruits).push({it:it,f:f})}
  else if(inShed(it)&&now-(it.t||0)>=f.ms)o.prods.push({it:it,f:f,sh:shedOf(it)})});
 shedList().forEach(function(sd){var c=sd.cc;if(!c)return;
  (sd.cf||[]).forEach(function(q){if(now-q.b>=c.g){o.moves.push({sd:sd,q:q});if(!q.m||now-q.m>=c.m)o.prods.push({sd:sd,q:q,c:c})}})});
 return o}

function doCrops(L){var fl=[],xp=0,ops=[];
 L.forEach(function(o){var key=(o.p.b?"cb:":"c:")+o.p.c,s=(fl.length<90)?pos(o.q[0],o.q[1],FarmFX.top):null;
  rawAdd(key);xp+=cr(o.p.c).xp;S.plots[o.i]=null;ops.push(["farmHarvest",[TOKEN,o.i]]);if(s)fl.push({key:key,pos:s})});
 if(ops.length)sendMany(ops);
 return{n:L.length,xp:xp,fl:fl}}
function doTrees(L){var fl=[],xp=0,now=nowT(),ops=[];
 L.forEach(function(o){var it=o.it,key,s;
  if(o.q){key="y:"+o.sd.k;rawAdd(key);xp+=o.c.x;o.q.m=now;ops.push(["farmCalfMilk",[TOKEN,o.sd.id,o.q.i]]);s=(fl.length<90)?mid(o.sd,-30):null}
  else{key="i:"+it.k;rawAdd(key);xp+=o.f.xp;it.t=now;ops.push(["farmTreeHarvest",[TOKEN,it.id]]);s=(fl.length<90)?(o.sh?mid(o.sh,-30):mid(it,FarmFX.itemTop(it.k))):null}
  if(s)fl.push({key:key,pos:s})});
 if(ops.length)sendMany(ops);
 return{n:L.length,xp:xp,fl:fl}}
function doMoves(L,cnt){var now=nowT(),n=0,ops=[];
 L.forEach(function(o){var a=MV[o.sd.k],id2,i;if(!a)return;
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36)+n.toString(36);
  S.dc.push({id:id2,k:a[0],c:0,r:0,s:1,t:now});
  ops.push(["farmCalfOut",[TOKEN,o.sd.id,o.q.i,id2,0]]);
  o.sd.cf=(o.sd.cf||[]).filter(function(z){return z!==o.q});
  n++;cnt[a[1]]=(cnt[a[1]]||0)+1});
 if(ops.length)sendMany(ops);
 return n}

function run(ks){var d=scan(),R={n:0,xp:0,fl:[]},cnt={},mv=0,t;
 function add(r){R.n+=r.n;R.xp+=r.xp;R.fl=R.fl.concat(r.fl)}
 if(ks.crops)add(doCrops(d.crops));
 if(ks.fruits)add(doTrees(d.fruits));
 if(ks.prods)add(doTrees(d.prods));
 if(ks.moves)mv=doMoves(d.moves,cnt);
 if(!R.n&&!mv){toast("Nothing to collect right now.");return}
 S.xp+=R.xp;lvlUp();paint();drawAll();
 if(R.fl.length&&window.FarmFX2)FarmFX2.fly(R.fl);
 t=[];if(R.n)t.push("Collected "+R.n+" things! Stored in barn");
 if(mv)t.push("Moved to barn: "+Object.keys(cnt).map(function(k){return cnt[k]+" "+k}).join("  "));
 toast(t.join("  |  "))}

function icons(keys){var seen={},h="";keys.forEach(function(k){if(!seen[k]&&Object.keys(seen).length<5){seen[k]=1;try{h+="<img src='"+invIconURL(k)+"'>"}catch(e){}}});return h}
function openHv(){var d=scan(),dlg=$("dlg"),body=$("dlgBody"),big=0,mvc={},mvh="",tot=d.crops.length+d.fruits.length+d.prods.length+d.moves.length;
 d.crops.forEach(function(o){if(o.p.b)big++});
 d.moves.forEach(function(o){var a=MV[o.sd.k];if(a)mvc[a[1]]=(mvc[a[1]]||0)+1});
 Object.keys(mvc).forEach(function(k){mvh+="<span style='font-size:20px;margin-right:4px'>"+k+"\u00D7"+mvc[k]+"</span>"});
 function row(k,em,bg,name,sub,n,strip){return"<button class='hvR' data-k='"+k+"'"+(n?"":" disabled")+"><span class='hvE' style='background:linear-gradient(145deg,"+bg+")'>"+em+"</span><span class='hvM'><b>"+name+"</b><span class='small'>"+(n?sub:"Nothing ready yet")+"</span>"+(n?"<div class='hvS'>"+strip+"</div>":"")+"</span><span class='hvN'>"+n+"</span></button>"}
 body.innerHTML="<div class='hvT'><div class='hvI'>\uD83E\uDDFA</div><div><div class='dtitle'>Harvest</div><div class='dsub'>Everything you collect goes to your barn</div></div></div>"+
  row("crops","\uD83C\uDF3E","#9be05a,#3f9a2c","Harvest crops",d.crops.length+" ripe"+(big?" \u00B7 "+big+" BIG":""),d.crops.length,icons(d.crops.map(function(o){return(o.p.b?"cb:":"c:")+o.p.c})))+
  row("fruits","\uD83C\uDF4E","#ff8a7a,#d9322a","Harvest fruits",d.fruits.length+" trees ready",d.fruits.length,icons(d.fruits.map(function(o){return"i:"+o.it.k})))+
  row("prods","\uD83E\uDD5B","#8fd0ff,#3a8ae0","Harvest animal products",d.prods.length+" ready (milk, eggs, wool...)",d.prods.length,icons(d.prods.map(function(o){return o.q?"y:"+o.sd.k:"i:"+o.it.k})))+
  row("moves","\uD83D\uDCE6","#ffd27a,#e0952a","Move animals to barn","Fully grown animals leave the baby rooms",d.moves.length,mvh)+
  "<button class='btn hvA' data-k='all'"+(tot?"":" disabled")+">\u26A1 Collect everything</button>"+
  "<div class='dbtns'><button class='btn alt' data-k='close'>Close</button></div>";
 dlg.style.display="flex";
 function shut(){dlg.style.display="none"}
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),k;
  if(ev.target===dlg){shut();return}if(!b||b.disabled)return;k=b.dataset.k;if(!k)return;
  shut();if(k==="close")return;
  if(k==="all")run({crops:1,fruits:1,prods:1,moves:1});else{var o={};o[k]=1;run(o)}}}
$("hAll").onclick=openHv;
$("hAll").title="Harvest";

/* baby rooms: hide the + and - buttons (they stay in the main shed room) */
setInterval(function(){[["shSub","shPlus","shMinus","shHarv"],["ckSub","ckPlus","ckMinus","ckHarv"]].forEach(function(a){var s=$(a[0]),side;if(!s)return;
 side=/room/i.test(s.textContent);
 [a[1],a[2],a[3]].forEach(function(id){var b=$(id);if(b)b.style.display=side?"none":""})})},150);
})();
