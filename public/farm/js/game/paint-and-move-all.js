// ===== PAINT ALL: fill every tile of every land with the chosen floor =====
$("edAll").onclick=function(){
 var f=PAINT&&floorDef(PAINT.id),pl={},tl=[],i,n,cost;
 if(!f)return;
 if(!S.fl)S.fl={};
 for(i=0;i<S.np;i++)if(S.pp[i])pl[flKey(S.pp[i][0],S.pp[i][1])]=1;
 (S.dc||[]).forEach(function(o){if(!o.s&&!isF(o.k))pl[flKey(o.c,o.r)]=1});
 parS().forEach(function(q){var c,r,key;
  for(r=q.r0;r<q.r1;r++)for(c=q.c0;c<q.c1;c++){key=flKey(c,r);
   if(f.id==="gr"){if(S.fl[key])tl.push(key);continue}
   if(S.fl[key]===f.id||(f.id==="wt"&&pl[key]))continue;
   tl.push(key)}});
 if(!tl.length){toast("Nothing to change. Everything already has this floor.");return}
 n=f.cost?Math.min(tl.length,Math.floor(S.coins/f.cost)):tl.length;
 if(!n){toast(f.name+" costs "+f.cost+" coins per tile. You have "+S.coins+".");return}
 cost=n*f.cost;
 infoDlg("\uD83E\uDEA3","Paint all with "+f.name+"?",
  n<tl.length?"You can afford "+n+" of the "+tl.length+" tiles, so only those will be painted.":"Every tile of your land will be changed to "+f.name+".",
  ["Tiles: "+n,"\uD83E\uDE99 "+cost,"Left: \uD83E\uDE99 "+(S.coins-cost)],
  function(){var done,j;
   if(S.coins<cost){toast("Not enough coins.");return}
   done=tl.slice(0,n);S.coins-=cost;
   done.forEach(function(k){if(f.id==="gr")delete S.fl[k];else S.fl[k]=f.id});FLN++;
   var BL=[];for(j=0;j<done.length;j+=400)BL.push(["farmFloor",[TOKEN,f.id,done.slice(j,j+400)]]);sendMany(BL);
   paint();drawAll();
   toast("\uD83D\uDD8C "+f.name+" x"+n+(cost?" (-"+cost+"\uD83E\uDE99)":""))},
  "Paint all")};
$("edRot").onclick=function(){if(!SEL||SEL.t!=="d")return;var it=dcById(SEL.id);if(!it)return;if(FOOTR[it.k]){toast("The court cannot be turned. Buy the other-way court instead.");return}it.rot=isF(it.k)?((it.rot||0)+1)&3:(it.rot?0:1);send("farmRotate",[TOKEN,it.id,it.rot]);drawAll()};
$("edSell").onclick=function(){if(!SEL||SEL.t!=="d")return;var it=dcById(SEL.id);if(!it)return;
 if(!SELL1){SELL1=1;this.textContent="Tap again to sell";setTimeout(function(){if(SELL1){SELL1=0;editUI()}},2500);return}
 SELL1=0;S.coins+=sellVal(it);S.dc=S.dc.filter(function(x){return x.id!==it.id});SEL=null;send("farmSell",[TOKEN,it.id]);paint();drawAll()};
var HOVT=null,BT2=0;
function badTile(c,r){HOVT=[c,r];drawAll();clearTimeout(BT2);BT2=setTimeout(function(){HOVT=null;drawAll()},350)}
var GMOVE=null,GCONF=null;
function gmoveTap(tc,tr){
 var a=getPos(GMOVE.anchor),L=GMOVE.list,dc,dr,ig={},occ={},mv=[],bad=null,i,q;
 if(!a){GMOVE=null;editUI();return}
 dc=tc-a[0];dr=tr-a[1];
 if(!dc&&!dr){GMOVE=null;GPREV=null;SEL=null;editUI();drawAll();return}
 L.forEach(function(s){ig[s.t==="p"?"p"+s.i:"d"+s.id]=1});
 for(i=0;i<S.np;i++){q=S.pp[i];if(q&&!ig["p"+i])occ[flKey(q[0],q[1])]=1}
 (S.dc||[]).forEach(function(x){if(!x.s&&!isF(x.k)&&!ig["d"+x.id]){var nw=footW(x.k),nh=footH(x.k),a,b;for(a=0;a<nw;a++)for(b=0;b<nh;b++)occ[flKey(x.c+a,x.r+b)]=1}});
 L.forEach(function(s){var p=getPos(s),nc,nr,fe;if(!p||bad)return;nc=p[0]+dc;nr=p[1]+dr;
  fe=s.t==="d"&&isF((dcById(s.id)||{}).k);
  if(!inLandP(parS(),nc,nr)||(!fe&&(flAt(nc,nr)==="wt"||occ[flKey(nc,nr)])))bad=[nc,nr];
  mv.push([s,nc,nr,p[0]*dc+p[1]*dr])});
 if(bad){badTile(bad[0],bad[1]);toast("The group does not fit there (blocked, water, or outside your land).");return}
 mv.sort(function(x,y){return y[3]-x[3]}); // the items in front move first, so none ever lands on one that has not moved yet
 mv.forEach(function(m){var s=m[0];setPos(s,m[1],m[2]);
  if(s.t==="p")send("farmPlotMove",[TOKEN,s.i,m[1],m[2],0]);else send("farmDecor",[TOKEN,s.id,m[1],m[2],0])});
 GMOVE=null;GPREV=null;SEL=null;HOVT=null;editUI();drawAll();toast("\u2194\uFE0F Moved a group of "+mv.length)}
$("edMoveG").onclick=function(){
 if(!SEL)return;var list=grpOf(SEL);
 if(OUTI[gkey(SEL)]){toast("Outside items are moved one by one.");return}
 if(list.length<2){toast("Nothing touches this item. Just tap a free tile to move it.");return}
 GMOVE={anchor:SEL,list:list};GPREV=list.map(function(s){return getPos(s)}).filter(Boolean);editUI();drawAll()};
 // ===== MOVE ALL SAME: every item of the same type (touching or not), moved together =====
$("edMoveS").onclick=function(){
 if(!SEL)return;
 var gk=gkey(SEL),list=[],i;
 if(OUTI[gk]||isF(gk)||footW(gk)*footH(gk)>1){toast("Fences, outside items and big buildings are moved one by one.");return}
 if(gk==="p"){for(i=0;i<S.np;i++)if(S.pp[i])list.push({t:"p",i:i})}
 else(S.dc||[]).forEach(function(x){if(!x.s&&x.k===gk)list.push({t:"d",id:x.id})});
 if(list.length<2){toast("You have only one of this item. Just tap a free tile to move it.");return}
 GMOVE={anchor:SEL,list:list};
 GPREV=list.map(function(s){return getPos(s)}).filter(Boolean);
 editUI();drawAll();
 toast("Moving all "+list.length+" of this type. Tap the new spot for the selected one.")};
function editTap(cv,e){var p=ptr(cv,e),t=toTile(cv,p),tc=Math.floor(t[0]),tr=Math.floor(t[1]),it,pl,h,o;
 if(PAINT){paintAt(tc,tr);return}
 if(GMOVE){gmoveTap(tc,tr);return}
  var _ak=PBUY?null:curK(PEND||PLACING||SEL);if(_ak){var _aa=anch(tc,tr,_ak);tc=_aa[0];tr=_aa[1]}
 if(PBUY){if(!tileFree(tc,tr,null)){badTile(tc,tr);return}
  if(S.np>=S.max||S.coins<S.plotCost){PBUY=0;toast("You cannot buy a plot right now.");editUI();return}
  var ni=S.np;S.coins-=S.plotCost;S.np++;S.plots.push(null);S.pp.push([tc,tr]);S.plotCost=30*(S.np-4);
  send("farmBuyPlot",[TOKEN]);send("farmPlotMove",[TOKEN,ni,tc,tr,0]);
  PBUY--;HOVT=null;paint();
  if(PBUY>0){editUI();drawAll();toast("\uD83D\uDFEB Plot placed. "+PBUY+" left - tap another free tile");return}
  setEdit(false);toast("\uD83D\uDFEB Plot bought and placed");return}
 if(PEND){if(isF(PEND.k)){if(inLandP(parS(),tc,tr)){PEND.c=tc;PEND.r=tr;PEND.rot=fRot(PEND.k,t);HOVT=null;drawAll()}return}if(tc===PEND.c&&tr===PEND.r){PEND.rot=PEND.rot?0:1;drawAll();return}if(tileFree(tc,tr,null)){PEND.c=tc;PEND.r=tr;HOVT=null;drawAll()}else badTile(tc,tr);return}
 if(PLACING){
  var GK=gkey(PLACING),pf=PLACING.t==="d"&&isF((dcById(PLACING.id)||{}).k);
  if(pf&&!inLandP(parS(),tc,tr))return;
  if(!pf&&!tileFree(tc,tr,null)){badTile(tc,tr);return}
  if(PLACING.t==="p"){S.pp[PLACING.i]=[tc,tr];send("farmPlotMove",[TOKEN,PLACING.i,tc,tr,0])}
  else{var pi=dcById(PLACING.id);pi.c=tc;pi.r=tr;pi.s=0;send("farmDecor",[TOKEN,pi.id,tc,tr,0]);if(isF(pi.k)){pi.rot=fRot(pi.k,t);send("farmRotate",[TOKEN,pi.id,pi.rot])}}
  SEL=null;PLACING=stored().filter(function(x){return gkey(x)===GK})[0]||null;HOVT=null;editUI();drawAll();return}
 if(SEL&&SEL.t==="d"){var fi=dcById(SEL.id);if(fi&&isF(fi.k)){var nr=fRot(fi.k,t);if(inLandP(parS(),tc,tr)){if(tc===fi.c&&tr===fi.r&&nr===(fi.rot||0)){SEL=null;editUI();drawAll();return}fi.c=tc;fi.r=tr;fi.rot=nr;send("farmDecor",[TOKEN,fi.id,tc,tr,0]);send("farmRotate",[TOKEN,fi.id,nr]);SEL=null;HOVT=null;editUI();drawAll()}return}}
 if(SEL&&SEL.t==="d"){var fi=dcById(SEL.id);if(fi&&isF(fi.k)){var nr=fRot(fi.k,t);if(inLandP(parS(),tc,tr)){if(tc===fi.c&&tr===fi.r&&nr===(fi.rot||0)){SEL=null;editUI();drawAll();return}fi.c=tc;fi.r=tr;fi.rot=nr;send("farmDecor",[TOKEN,fi.id,tc,tr,0]);send("farmRotate",[TOKEN,fi.id,nr]);SEL=null;HOVT=null;editUI();drawAll()}return}}
 if(SEL){o=getPos(SEL);
  if(o&&tc===o[0]&&tr===o[1]){SEL=null;if(BUYING){setEdit(false);return}editUI();drawAll();return}
  if(tileFree(tc,tr,SEL)){setPos(SEL,tc,tr);
   if(SEL.t==="p")send("farmPlotMove",[TOKEN,SEL.i,tc,tr,0]);else send("farmDecor",[TOKEN,SEL.id,tc,tr,0]);
   SEL=null;HOVT=null;if(BUYING){setEdit(false);return}editUI();drawAll();return}}
 it=pickDeco(cv,p);pl=it?-1:hit(cv,e);h=it?{t:"d",id:it.id}:(pl>=0?{t:"p",i:pl}:null);
 if(h){SEL=h;editUI();drawAll()}
 else if(SEL)badTile(tc,tr)}
 // ===== UPGRADE FENCES IN PLACE =====
var FSN=[["base","Basic Fence"],["rope","Rope Fence"],["bamboo","Bamboo Fence"],["picket","Picket Fence"],["log","Log Fence"],["hedge","Hedge Fence"],["chain","Chain-link Fence"],["iron","Iron Fence"],["stone","Stone Wall"],["brick","Brick Wall"],["concrete","Concrete Wall"]];
function fenceInfo(k){var m;if(k==="f_fence")return{s:"base",t:""};if(k==="f_corner")return{s:"base",t:"_c"};if(k==="f_gate")return{s:"base",t:"_g"};m=/^f_([a-z]+)(_c|_g)?$/.exec(k);return m?{s:m[1],t:m[2]||""}:null}
function fenceKey(k,to){var i=fenceInfo(k);if(!i)return null;if(to==="base")return i.t===""?"f_fence":i.t==="_c"?"f_corner":"f_gate";return"f_"+to+i.t}
function fiDef(id){return(S.items||[]).filter(function(x){return x.id===id})[0]}
$("edUp").onclick=function(){upgDlg()};
function upgDlg(){
 var sel=SEL&&SEL.t==="d"?dcById(SEL.id):null;
 if(!sel||!isF(sel.k)){toast("Select a fence piece first.");return}
 var fi=fenceInfo(sel.k),dlg=$("dlg"),body=$("dlgBody"),scope=1,dpr=Math.min(1.5,window.devicePixelRatio||1),rate=S.sellRate||.5;
 function shut(){dlg.style.display="none"}
 function pool(sc){return(S.dc||[]).filter(function(x){if(!isF(x.k))return false;if(sc===0)return x.id===sel.id;if(sc===1){var q=fenceInfo(x.k);return !!q&&q.s===fi.s}return true})}
 function quote(to){var n=0,pay=0,ref=0,need=1;
  pool(scope).forEach(function(x){var nk=fenceKey(x.k,to),a=fiDef(x.k),b=nk&&fiDef(nk),d;if(!nk||nk===x.k||!a||!b)return;
   n++;if(b.lvl>need)need=b.lvl;d=b.cost-a.cost;if(d>0)pay+=d;else ref+=Math.floor(-d*rate)});
  return{n:n,net:pay-ref,lvl:need}}
 function thumb(id){var it=fiDef(id),src,c;if(!it)return null;src=mThumb(it,dpr);c=document.createElement("canvas");c.width=src.width;c.height=src.height;
  c.style.cssText="width:56px;height:56px;border-radius:8px;flex:none";c.getContext("2d").drawImage(src,0,0);return c}
 function apply(to,nm){var q=quote(to),P=pool(scope),ids=[];
  if(!q.n){toast("Nothing to change.");return}
  if(S.level<q.lvl){toast(nm+" unlocks at level "+q.lvl);return}
  if(S.coins<q.net){toast("This costs "+q.net+" coins. You have "+S.coins+".");return}
  P.forEach(function(x){var nk=fenceKey(x.k,to);if(nk&&nk!==x.k){ids.push(x.id);x.k=nk}});
  S.coins-=q.net;send("farmFenceSwap",[TOKEN,to,ids]);
  SEL=null;shut();paint();editUI();drawAll();
  try{FarmAudio.play("place")}catch(e){}
  toast("\uD83D\uDD04 "+q.n+" piece"+(q.n>1?"s":"")+" changed to "+nm+(q.net>0?" (-"+q.net+"\uD83E\uDE99)":q.net<0?" (+"+(-q.net)+"\uD83E\uDE99)":""))}
 function draw(){var tabs,list;
  body.innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDEA7</div><div class='dtitle'>Upgrade fences</div><div class='dsub'>The design changes in place. Nothing moves and nothing is sold. You pay only the price difference (a cheaper design gives back "+Math.round(rate*100)+"% of the difference).</div>";
  tabs=document.createElement("div");tabs.className="drow";
  [["This piece",0],["Same design",1],["All fences",2]].forEach(function(o){var b=document.createElement("button");b.className="btn"+(scope===o[1]?"":" alt");b.textContent=o[0]+" ("+pool(o[1]).length+")";b.onclick=function(){scope=o[1];draw()};tabs.appendChild(b)});
  body.appendChild(tabs);
  list=document.createElement("div");list.style.cssText="margin:6px 0 4px;max-height:44vh;overflow-y:auto";
  FSN.forEach(function(o){var q=quote(o[0]),row=document.createElement("div"),th=thumb(o[0]==="base"?"f_fence":"f_"+o[0]),mid=document.createElement("span"),b=document.createElement("button"),bad,txt;
   row.className="dst";if(th)row.appendChild(th);
   mid.style.flex="1";mid.innerHTML="<b>"+o[1]+"</b><br><span class='small'>"+(q.n?q.n+" piece"+(q.n>1?"s":"")+(q.lvl>S.level?" \u00B7 \uD83D\uDD12 Level "+q.lvl:""):"Already this design")+"</span>";
   bad=!q.n||S.level<q.lvl||S.coins<q.net;
   txt=!q.n?"-":q.net>0?"\uD83E\uDE99 "+q.net:q.net<0?"+\uD83E\uDE99 "+(-q.net):"Free";
   b.className="btn"+(bad?" alt":"");b.textContent=txt;b.onclick=function(){apply(o[0],o[1])};
   row.appendChild(mid);row.appendChild(b);list.appendChild(row)});
  body.appendChild(list);
  var bt=document.createElement("div");bt.className="dbtns";bt.innerHTML="<button class='btn alt' id='dNo'>Close</button>";body.appendChild(bt);
  $("dNo").onclick=shut}
 draw();dlg.style.display="flex";dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
