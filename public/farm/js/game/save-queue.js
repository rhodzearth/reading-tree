// ===== SAVING: everything you do is kept in a queue, saved to your phone at once, then sent to the server in ONE batch =====
var Q=[],busy=false,QT=0,IDLE=1500,RT=0,QK="farmQ_"+TOKEN.slice(-12);
var BAT={farmPlant:"pl",farmHarvest:"hv",farmBuyPlot:"bp",farmDecor:"d",farmPlotMove:"p",farmTreeHarvest:"th",farmRotate:"rt",farmSell:"sl",farmBuyAt:"bu",farmFloor:"fl",farmFenceSwap:"fs",farmCowIn:"ci",farmCowOut:"co",farmCalfMilk:"cm",farmCalfOut:"cg"};
function qSave(){try{if(Q.length)localStorage.setItem(QK,JSON.stringify(Q));else localStorage.removeItem(QK)}catch(e){}}
function sv(){$("saveBtn").innerHTML=(Q.length||busy)?"&#9203;":"&#128190;"}
function sendMany(L){L.forEach(function(x){Q.push(x)});qSave();sv();clearTimeout(QT);QT=setTimeout(pump,IDLE)}
function kick(){clearTimeout(QT);pump()}
function send(fn,args){Q.push([fn,args]);qSave();sv();clearTimeout(QT);QT=setTimeout(pump,IDLE)}
function pump(){if(busy||!Q.length)return;var n=0,ops=[],j;
 while(n<Q.length&&n<300&&BAT[Q[n][0]]){ops.push([BAT[Q[n][0]]].concat(Q[n][1].slice(1)));n++}
 busy=true;if(n)j=["farmSync",[TOKEN,ops]];else{n=1;j=Q[0]}
 call(j[0],j[1],function(s){busy=false;RT=0;Q.splice(0,n);qSave();sv();
  if(s.out&&s.out.skipped){toast("\u26A0 "+(s.out.err||"Some changes were skipped"));flush(load)}
  if(!Q.length&&!DRAG){if(V&&s.out&&s.out.id===V.id&&s.out.plots)V=s.out;S=s;paint();cacheS()}pump()},
 function(m){busy=false;sv();
  if(j[0]==="farmSync"){if(++RT===2||RT===5)toast("Save problem: "+m+" (your changes are kept and will retry)");setTimeout(pump,Math.min(15000,2000*RT))}
  else{Q.splice(0,1);qSave();toast(m);pump()}})}
function tapPlot(i){var p=S.plots[i];
 if(!p){var c=cr(sel);if(!c)return;
  if(S.level<c.lvl){toast(c.name+" unlocks at level "+c.lvl);return}
  var free=c.id===S.crops[0].id&&S.coins<c.cost;
  if(S.coins<c.cost&&!free){toast("A "+c.name+" seed costs "+c.cost+" coins. You have "+S.coins+".");return}
  if(!free)S.coins-=c.cost;S.plots[i]={c:c.id,t:nowT(),b:0,hb:[]};paint();toast(free?"\uD83C\uDF81 Free seed! Ready in "+fmtDur(c.ms)+" - read a chapter to speed it up 6h!":"\uD83C\uDF31 Planted! Ready in "+fmtDur(c.ms)+" - read a chapter to speed it up 6h!");send("farmPlant",[TOKEN,i,sel]);return}
 var c2=cr(p.c);
 if(isRipe(p)){invAdd((p.b?"cb:":"c:")+p.c,1);S.xp+=c2.xp;S.plots[i]=null;lvlUp();paint();toast((p.b?"BIG harvest! ":"Harvested! ")+c2.name+" stored in barn +"+c2.xp+" XP");send("farmHarvest",[TOKEN,i])}
 else toast(c2.name+" is ready in "+fmtDur(c2.ms-(nowT()-p.t))+". Read a chapter in the Reading Tree to speed it up by 6 hours!")}
$("hAll").onclick=function(){var n=0,co=0,xp=0;S.plots.forEach(function(p,i){if(isRipe(p)){invAdd((p.b?"cb:":"c:")+p.c,1);xp+=cr(p.c).xp;n++;S.plots[i]=null}});
 (S.dc||[]).forEach(function(it){var f=FTD[it.k];if(f&&!it.s&&nowT()-it.t>=f.ms){invAdd("i:"+it.k,1);xp+=f.xp;n++;it.t=nowT()}});
  (S.dc||[]).forEach(function(it){var f=FTD[it.k];if(f&&it.s&&inShed(it)&&nowT()-(it.t||0)>=f.ms){invAdd("i:"+it.k,1);xp+=f.xp;n++;it.t=nowT();send("farmTreeHarvest",[TOKEN,it.id])}});
 shedList().forEach(function(sd){var c=sd.cc,now=nowT();if(!c)return;(sd.cf||[]).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){invAdd("y:"+sd.k,1);xp+=c.x;n++;q.m=now;send("farmCalfMilk",[TOKEN,sd.id,q.i])}})});
 if(!n){toast("Nothing is ripe yet. Wait for the timer, or read a chapter to speed things up by 6 hours!");return}
 S.xp+=xp;lvlUp();paint();toast("Collected "+n+" things! Stored in barn");send("farmHarvest",[TOKEN,-1])};
// plant the selected seed in every empty plot
$("plAll").onclick=function(){var c=cr(sel),n=0,i,free,ops=[];if(!c)return;
 if(S.level<c.lvl){toast(c.name+" unlocks at level "+c.lvl);return}
 for(i=0;i<S.np;i++){if(!S.pp[i]||S.plots[i])continue;free=c.id===S.crops[0].id&&S.coins<c.cost;
  if(S.coins<c.cost&&!free)break;if(!free)S.coins-=c.cost;S.plots[i]={c:c.id,t:nowT(),b:0,hb:[]};ops.push(["farmPlant",[TOKEN,i,sel]]);n++}
 if(!n)toast("No empty plot, or not enough coins.");else{sendMany(ops);kick();paint();toast("\uD83C\uDF31 Planted "+n+" "+c.name)}};
 // ===== PLANT ALL: saving progress bar =====
var PB={el:null,total:0,v:0,tm:0};
function pbEl(){if(PB.el)return PB.el;var d=document.createElement("div");d.id="pbModal";
 d.style.cssText="position:fixed;inset:0;z-index:96;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(10,20,8,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)";
 d.innerHTML="<div style='width:100%;max-width:320px;background:rgba(24,32,26,.92);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:22px;padding:22px 18px 16px;text-align:center;box-shadow:0 14px 44px rgba(0,0,0,.55)'><div style='font-size:34px;line-height:1' id='pbIc'>\uD83C\uDF31</div><div class='dtitle' id='pbT' style='color:#fff'>Saving your farm...</div><div class='dsub' id='pbS' style='color:#fff'>Please keep this page open</div><div style='height:14px;background:rgba(255,255,255,.2);border-radius:99px;overflow:hidden;margin:14px 0 6px'><i id='pbF' style='display:block;height:100%;width:0;background:linear-gradient(90deg,#8cc152,#4caf50);border-radius:99px'></i></div><div id='pbP' style='font-weight:700;font-size:15px'>0%</div><div class='dbtns'><button class='btn alt' id='pbX'>Hide</button></div></div>";
 document.body.appendChild(d);$("pbX").onclick=pbHide;PB.el=d;return d}
function pbHide(){clearInterval(PB.tm);PB.tm=0;if(PB.el)PB.el.style.display="none"}
function pbDraw(){var f=$("pbF"),p=$("pbP"),t=$("pbT"),s=$("pbS"),ic=$("pbIc"),done,share,tg,fin=!Q.length&&!busy;
 done=PB.total?Math.max(0,PB.total-Q.length)/PB.total:1;
 share=(busy&&PB.total)?Math.min(300,Q.length)/PB.total*.85:0;
 tg=fin?1:Math.min(.99,done+share);
 PB.v+=(tg-PB.v)*(fin?.5:.08);if(fin&&PB.v>.995)PB.v=1;
 f.style.width=Math.round(PB.v*100)+"%";p.textContent=Math.round(PB.v*100)+"%";
 s.textContent=RT?"Weak connection - retrying. Your changes are kept.":"Please keep this page open";
 if(PB.v>=1){t.textContent="Saved!";ic.textContent="\u2705";s.textContent="Your farm is saved";sv();clearInterval(PB.tm);PB.tm=0;setTimeout(pbHide,900)}}
function pbStart(){var d=pbEl();PB.total=Q.length;PB.v=0;$("pbF").style.width="0";$("pbP").textContent="0%";$("pbT").textContent="Saving your farm...";$("pbIc").textContent="\uD83C\uDF31";d.style.display="flex";clearInterval(PB.tm);PB.tm=setInterval(pbDraw,100);kick()}
var _pl0=$("plAll").onclick;
$("plAll").onclick=function(){var q0=Q.length;_pl0.apply(this,arguments);if(Q.length>q0)pbStart()};
$("buyPlot").onclick=function(){
 if(S.np>=S.max){infoDlg("\uD83D\uDFEB","Maximum plots reached","You already have the most plots your land allows. Expand your land for more.",["Plots "+S.np+"/"+S.max]);return}
 if(S.coins<S.plotCost){toast("A new plot costs "+S.plotCost+" coins. You have "+S.coins+".");return}
 plotsDlg()};
