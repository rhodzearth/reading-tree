 // ===== MULTI-BUY PLOTS =====
function buyPlotsBarn(n){var i,done=0,ni;
 for(i=0;i<n;i++){
  if(S.np>=S.max||S.coins<S.plotCost)break;
  S.coins-=S.plotCost;ni=S.np;S.np++;S.plots.push(null);S.pp.push(null);S.plotCost=30*(S.np-4);
  send("farmBuyPlot",[TOKEN]);send("farmPlotMove",[TOKEN,ni,0,0,1]);done++}
 if(!done){toast("You cannot buy a plot right now.");return}
 paint();setEdit0(true);$("barnP").style.display="block";editUI();drawAll();
 toast("\uD83D\uDFEB Plot bought x"+done+" - stored in the barn. Tap Plot in the barn, then tap a free tile for each one.")}
function plotsDlg(){
 var dlg=$("dlg"),room=S.max-S.np,BS="width:46px;height:46px;font-size:26px;padding:0;line-height:1",mx,inp;
 function shut(){dlg.style.display="none"}
 function cost(n){var t=0,k;for(k=0;k<n;k++)t+=30*(S.np-4+k);return t}
 function afford(){var n=0;while(n<room&&cost(n+1)<=S.coins)n++;return n}
 mx=afford();
 if(mx<1){toast("A new plot costs "+S.plotCost+" coins. You have "+S.coins+".");return}
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDFEB</div><div class='dtitle'>Buy plots</div><div class='dsub'>The price goes up with every plot. You can afford up to "+mx+".</div>"+
  "<div style='display:flex;align-items:center;justify-content:center;gap:10px;margin:14px 0 8px'><button class='btn alt' id='pqM' style='"+BS+"'>\u2212</button><input id='pqN' type='number' inputmode='numeric' min='1' max='"+mx+"' value='1' style='width:96px;text-align:center;font-size:22px;font-weight:700;margin:0;-webkit-user-select:text;user-select:text'><button class='btn alt' id='pqP' style='"+BS+"'>+</button></div>"+
  "<div style='display:flex;justify-content:center;gap:6px;margin-bottom:6px'><button class='btn alt' data-q='5'>5</button><button class='btn alt' data-q='10'>10</button><button class='btn alt' data-q='max'>Max</button></div>"+
  "<div class='drow'><span class='dchip' id='pqC'></span><span class='dchip' id='pqL'></span></div>"+
  "<div class='dbtns'><button class='btn alt' id='dNo'>Cancel</button><button class='btn ok' id='pqB'>\uD83D\uDCE6 To barn</button><button class='btn ok' id='pqPl'>\uD83D\uDCCD Place</button></div>";
 inp=$("pqN");
 function cur(){var v=parseInt(inp.value,10);return isFinite(v)?Math.max(1,Math.min(mx,v)):1}
 function upd(){var v=cur();$("pqC").textContent="Cost: \uD83E\uDE99 "+cost(v);$("pqL").textContent="Left: \uD83E\uDE99 "+(S.coins-cost(v))}
 function set(v){inp.value=Math.max(1,Math.min(mx,v));upd()}
 $("pqM").onclick=function(){set(cur()-1)};$("pqP").onclick=function(){set(cur()+1)};
 [].forEach.call(dlg.querySelectorAll("[data-q]"),function(b){b.onclick=function(){set(b.dataset.q==="max"?mx:Number(b.dataset.q))}});
 inp.oninput=upd;inp.onblur=function(){set(cur())};upd();
 dlg.style.display="flex";$("dNo").onclick=shut;
 $("pqB").onclick=function(){var n=cur();shut();buyPlotsBarn(n)};
 $("pqPl").onclick=function(){var n=cur();shut();setEdit0(true);PBUY=n;editUI();drawAll();toast("Tap a free tile to place plot 1 of "+n)};
 dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
// Expand: the question opens at once; saving + expanding happen only after you confirm
$("expBtn").onclick=function(){var e=S.exp;if(!e){landDlg();return}
 if(S.level<e.lvl||S.coins<e.cost){infoDlg("\uD83C\uDFDE\uFE0F","Expand to "+e.sz+" x "+e.sz,"Requirements to expand:",["Level "+e.lvl+(S.level>=e.lvl?" \u2713":" (you: "+S.level+")"),"\uD83E\uDE99 "+e.cost+(S.coins>=e.cost?" \u2713":" (you: "+S.coins+")")]);return}
 askExpand(e,function(){busyShow("Expanding your land...");flush(function(){call("farmExpand",[TOKEN],function(s){setState(s);busyHide();
  $("field")._pan=[0,0];$("field")._z=1;$("field")._kabs=0;fitAll();toast("\uD83C\uDF3E Land expanded to "+e.sz+" x "+e.sz+"! New land grows toward the back.")},function(m){busyHide();toast(m)})})})};
var ALLU=null;
$("nbAdd").onclick=function(){busyShow("Loading readers...");
 FARM_CALL("farmAllUsers",[TOKEN]).then(function(s){busyHide();ALLU=(s&&s.out)||[];renderAll()}).catch(function(e){busyHide();toast(e.message||String(e))})};
$("nbId").oninput=function(){renderAll()};
function renderAll(){var box=$("allList"),q=$("nbId").value.trim().toLowerCase();
 if(!ALLU){box.innerHTML="";return}
 var rows=ALLU.filter(function(u){return !u.nb&&(!q||u.username.toLowerCase().indexOf(q)>=0||u.id.indexOf(q)>=0)});
 box.innerHTML="<div class='small' style='margin:8px 0 4px'>"+rows.length+" reader(s) with accounts</div>";
 if(!rows.length)box.innerHTML+="<p class='small'>No readers match.</p>";
 rows.forEach(function(u){var r=document.createElement("div");r.className="nb";
  r.innerHTML="<span><span title='"+(u.on?"Active":"Not active")+"' style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;background:"+(u.on?"#2ecc40":"#9e9e9e")+"'></span>&#128104;&#8205;&#127806; "+esc(u.username)+" <span class='small'>"+esc(u.id)+"</span></span>";
  var b=document.createElement("button");b.className=u.nb?"btn alt":"btn";b.textContent=u.nb?"Added":"Add";b.disabled=!!u.nb;
  b.onclick=function(){busyShow("Adding neighbor...");
   flush(function(){call("farmAddNeighbor",[TOKEN,u.id],function(s){setState(s);busyHide();u.nb=true;toast("Added "+s.out.added+" as a neighbor");renderAll()},function(m){busyHide();toast(m)})})};
  r.appendChild(b);box.appendChild(r)})}

function visit(id){var n=S.nb.filter(function(x){return x.id===id})[0];busyShow("Visiting "+(n?n.username:"your neighbor")+"'s farm...");side(false);dock(false);
 flush(function(){call("farmVisit",[TOKEN,id],function(s){V=s.out;if(!Q.length&&!busy)S=s;$("vCanvas")._pan=[0,0];$("vCanvas")._z=1;$("vCanvas")._kabs=0;$("vCanvas")._box=null;$("visit").style.display="flex";paint();busyHide();
  if(!visit._seen){visit._seen=1;setTimeout(visitDlg,600)}},function(m){busyHide();toast(m)})})}
function paintVisit(){$("vName").textContent="\uD83C\uDFE1 "+V.username+"'s farm"}
function visitDlg(){var dlg=$("dlg");function shut(){dlg.style.display="none"}
 $("dlgBody").innerHTML="<div style='font-size:40px;line-height:1'>\uD83C\uDFE1</div><div class='dtitle'>Visiting "+esc(V.username)+"'s farm</div><div class='dsub'>Help your neighbor and earn rewards</div>"+
  "<div style='margin:12px 0 4px'><div class='dst'><i>\uD83D\uDCA7</i><span>Tap a <b>growing crop</b> to fertilize it</span></div>"+
  "<div class='dst'><i>\u23F1\uFE0F</i><span>Its grow time drops by <b>10%</b></span></div>"+
  "<div class='dst'><i>\uD83E\uDE99</i><span>You earn <b>"+(S.helpCoins||3)+" coins + "+(S.helpXp||1)+" XP</b> for each help</span></div>"+
  "<div class='dst'><i>\uD83D\uDC65</i><span>Helps left today: <b>"+S.helpLeft+"</b></span></div></div>"+
  "<div class='dbtns'><button class='btn ok' id='dYes'>\uD83D\uDC4D Got it</button></div>";
 dlg.style.display="flex";$("dYes").onclick=shut;dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
$("vHint").onclick=function(){VMINI=!VMINI;try{localStorage.setItem("vminiHide",VMINI?"0":"1")}catch(e){}drawAll()};
function visitTap(i){var p=V.plots[i];if(!p)return;var c=cr(p.c);p.hb=p.hb||[];
 if(nowT()-p.t>=c.ms){toast("Already ripe - only the owner can harvest it.");return}
 if(S.helpLeft<1){toast("You have used all your helps for today.");return}
 if(p.hb.indexOf(S.me)>=0){toast("You already helped this crop.");return}
 if(p.hb.length>=2){toast("This crop has had enough help.");return}
 p.t-=Math.round(c.ms*.1);p.hb.push(S.me);var hc=S.helpCoins||3,hx=S.helpXp||1;S.coins+=hc;S.xp+=hx;S.helpLeft--;lvlUp();paint();toast("\uD83D\uDCA7 Fertilized! Its time drops 10%. +"+hc+"\uD83E\uDE99 +"+hx+" XP");send("farmHelp",[TOKEN,V.id,i])}
// same "go home" logic as before, now in its own function
function goHome(){busyShow("Returning to your farm...");
 flush(function(){call("farmState",[TOKEN],function(s){V=null;var f0=$("field");f0._kabs=0;f0._z=1;f0._pan=[0,0];f0._box=null;f0._dz=0;restoreView();$("visit").style.display="none";setState(s);busyHide()},function(m){V=null;$("visit").style.display="none";busyHide();toast(m)})})}
// the door icon opens this menu
function visitMenu(){if(!V)return;
 var dlg=$("dlg"),others=S.nb.filter(function(n){return n.id!==V.id}),rows="";
 function shut(){dlg.style.display="none"}
 others.forEach(function(n,i){rows+="<div class='dst'><i>\uD83D\uDC68\u200D\uD83C\uDF3E</i><span style='flex:1;min-width:0'><b>"+esc(n.username)+"</b><br><span class='small'>"+esc(n.id)+"</span></span><button class='btn' data-v='"+i+"'>Visit</button></div>"});
 $("dlgBody").innerHTML="<div style='font-size:40px;line-height:1'>\uD83D\uDEAA</div>"+
  "<div class='dtitle'>Leaving "+esc(V.username)+"'s farm</div>"+
  "<div class='dsub'>Where would you like to go next?</div>"+
  "<button class='btn' id='vmHome' style='width:100%;padding:13px 8px;font-size:15px;margin:14px 0 6px;background:linear-gradient(180deg,#4caf50,#2f7d32);box-shadow:0 3px 0 #1b5e20'>\uD83C\uDFE1 Return to my farm</button>"+
  (others.length?"<div class='dsub' style='text-align:left;margin:12px 2px 2px'><b>Visit another neighbor</b></div><div style='max-height:36vh;overflow-y:auto;margin:4px 0'>"+rows+"</div>"
   :"<div class='dsub' style='margin:12px 0 4px'>You have no other neighbors yet.</div>")+
  "<div class='dbtns'><button class='btn alt' id='dNo'>Stay here</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 $("vmHome").onclick=function(){shut();goHome()};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),n;
  if(ev.target===dlg){shut();return}
  if(!b||b.dataset.v===undefined)return;
  n=others[Number(b.dataset.v)];if(!n)return;shut();visit(n.id)}}
$("vClose").onclick=visitMenu;
function side(on){$("side").classList.toggle("open",on)}
$("nbBtn").onclick=function(){if(PEND)return;dock(false);side(!$("side").classList.contains("open"))};$("sideClose").onclick=function(){side(false)};
function nbTab(t){var v=t==="v";$("nbId").style.display=v?"":"none";$("nbAdd").style.display=v?"":"none";$("allList").style.display=v?"":"none";$("nbList").style.display=v?"none":"";$("tabV").className=v?"btn":"btn alt";$("tabN").className=v?"btn alt":"btn"}
$("tabV").onclick=function(){nbTab("v");$("nbAdd").onclick()};$("tabN").onclick=function(){nbTab("n")};nbTab("v");
