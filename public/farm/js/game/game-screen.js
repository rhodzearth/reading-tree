// ===================== GAME SCREEN ===================;$("buyPlot").style.opacity=S.np>=S.max?".5":"";==
function paint(){FW=FH=S.sz||8;prepItems();if(S._n!==S.now){S._n=S.now;S.off=S.now?S.now-Date.now():0}
 $("sCoins").textContent="\uD83E\uDE99 "+S.coins;$("sLvl").textContent="Level "+S.level;
 $("xpBar").style.width=Math.min(100,(S.xp-S.prevXp)/(S.nextXp-S.prevXp)*100)+"%";$("xpTxt").textContent="XP "+S.xp+" / "+S.nextXp+" for level "+(S.level+1);
 $("myId").textContent=S.me;$("wfBtn").title="White fruits: "+(S.wf||0)+" (1 = 12 min boost, 30 = 6h)";$("wfBtn").style.opacity=(S.wf||0)>=1?"":".5";
  $("iUser").textContent="\uD83D\uDC64 "+(S.username||"");$("iId").textContent="\uD83C\uDD94 "+S.me;
 $("iTok").textContent="\u26AA "+(S.wf||0);

 $("buyPlot").textContent="\u2795";$("buyPlot").title=S.np>=S.max?"Plots full (expand land)":"New plot ("+S.plotCost+" coins)";$("buyPlot").style.opacity=S.np>=S.max?".5":"";
  $("expBtn").textContent="\uD83C\uDFDE\uFE0F";$("expBtn").title=S.exp===null?"Lands: buy beside / expand":"Expand land"+(S.exp?" ("+S.exp.cost+" coins)":"");$("expBtn").style.opacity="";
 var sd=$("seeds"),sk=S.level+"|"+sel+"|"+S.crops.length+"|"+STAB;
 if(paint._sk!==sk){paint._sk=sk;sd.innerHTML="";
 S.crops.filter(function(c){return STAB==="f"?!!c.fl:!c.fl}).sort(function(a,b){return a.lvl-b.lvl||a.cost-b.cost}).forEach(function(c){var b=document.createElement("button"),lock=S.level<c.lvl;b.className="seed"+(sel===c.id?" on":"")+(lock?" lock":"");
  b.innerHTML="<b>"+iconOf(c)+"</b>"+c.name+"<br>"+(lock?"\uD83D\uDD12 Lv "+c.lvl:c.cost+"\uD83E\uDE99 &middot; "+fmtDur(c.ms));
  b.onclick=function(){if(lock){toast(c.name+" unlocks at level "+c.lvl);return}sel=c.id;chip();[].forEach.call($("seeds").children,function(x){x.classList.toggle("on",x._id===c.id)})};b._id=c.id;sd.appendChild(b)});
 }
 chip();
 var nk=S.nb.map(function(n){return n.id+n.username+(n.on?1:0)}).join()+"|"+S.helpLeft,nl=$("nbList");
 if(paint._nk!==nk){paint._nk=nk;
 nl.innerHTML="<b>My neighbors ("+S.nb.length+")</b><div class='small'>Helps left today: "+S.helpLeft+" (+"+(S.helpCoins||3)+"\uD83E\uDE99 each)</div>";
 if(!S.nb.length)nl.innerHTML+="<p class='small'>No neighbors yet. Add a reader by their ID.</p>";
 S.nb.forEach(function(n){var r=document.createElement("div");r.className="nb";r.innerHTML="<span><span title='"+(n.on?"Active":"Not active")+"' style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;background:"+(n.on?"#2ecc40":"#9e9e9e")+"'></span>&#128104;&#8205;&#127806; "+esc(n.username)+" <span class='small'>"+esc(n.id)+"</span></span>";
  var v=document.createElement("button");v.className="btn";v.textContent="Visit";v.onclick=function(){visit(n.id)};
  var c=document.createElement("button");c.className="btn alt";c.dataset.cn=n.id;c.innerHTML="&#128172;"+chatBadge((UNR||{})[n.id]);c.title="Chat";c.onclick=function(){chatOpen(n)};
  var x=document.createElement("button");x.className="btn alt";x.textContent="\u2715";x.onclick=function(){if(confirm("Remove "+n.username+"?"))act("farmRemoveNeighbor",[TOKEN,n.id])};
  var w=document.createElement("span");w.appendChild(v);w.appendChild(document.createTextNode(" "));w.appendChild(c);w.appendChild(document.createTextNode(" "));w.appendChild(x);r.appendChild(w);nl.appendChild(r)});
 }
 if(V)paintVisit();
 if($("mkt").style.display!=="none"){if(MKL!==S.level)renderMkt();else $("mCoins").textContent="\uD83E\uDE99 "+S.coins}
 fitAll();drawAll();if(EDIT)editUI();
 if(lastLvl&&S.level>lastLvl)toast("\uD83C\uDF89 Level "+S.level+"! New seeds may be unlocked.");lastLvl=S.level;
}
function cacheS(){clearTimeout(cacheS.t);cacheS.t=setTimeout(function(){try{localStorage.setItem("farmS2_"+TOKEN.slice(-12),JSON.stringify(S))}catch(e){}},3000)}
function setState(s){S=s;$("msg").style.display="none";$("main").style.display="";paint();cacheS();if(!setState.w){setState.w=1}}
function act(fn,args,done){call(fn,args,function(s){setState(s);if(done)done(s)})}

function nowT(){return Date.now()+((S&&S.off)||0)}
function invUnit(key){var p=key.split(":"),t=p[0],id=p[1],c,it,sd;
 if(t==="c"||t==="cb"){c=cr(id);return c?c.sell*(t==="cb"?(S.bigMult||2):1):0}
 if(t==="i"){it=(S.items||[]).filter(function(x){return x.id===id})[0];return it?(it.sell||0):0}
 if(t==="y"){sd=shedList(id)[0];return sd&&sd.cc?sd.cc.y:0}
 return 0}
function invAdd(key,n){if(!S.inv)S.inv={};if(!S.invp)S.invp={};S.inv[key]=(S.inv[key]||0)+(n||1);if(!S.invp[key])S.invp[key]=invUnit(key)}
function fmtDur(ms){var m=Math.max(1,Math.ceil(ms/60000)),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mm=m%60;return d?d+"d "+h+"h":h?h+"h "+mm+"m":mm+"m"}
function isRipe(p){return !!p&&nowT()-p.t>=cr(p.c).ms}
function priceOf(p){return cr(p.c).sell*(p.b?(S.bigMult||2):1)}
function lvlUp(){var L=1+Math.floor(Math.sqrt(S.xp/10));S.level=L;S.prevXp=10*(L-1)*(L-1);S.nextXp=10*L*L}

