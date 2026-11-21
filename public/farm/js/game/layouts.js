 // ===================== FARM LAYOUTS (3 slots) =====================
var LAY=null;
var LGMOVE=null;
function layDc(id){for(var i=0;i<LAY.dc.length;i++)if(LAY.dc[i].id===id)return LAY.dc[i];return null}
function layGk(s){return s.t==="p"?"p":layDc(s.id).k}
function layStored(){var l=[],i;for(i=0;i<S.np;i++)if(!LAY.pp[i])l.push({t:"p",i:i});LAY.dc.forEach(function(o){if(o.s)l.push({t:"d",id:o.id})});return l}
function layFreeAt(c,r,ig){var i,q;if(!inLandP(parS(),c,r)||flAt(c,r)==="wt")return false;
 for(i=0;i<S.np;i++){q=LAY.pp[i];if(q&&q[0]===c&&q[1]===r&&!(ig&&ig.t==="p"&&ig.i===i))return false}
 return !LAY.dc.some(function(x){return !x.s&&!isF(x.k)&&x.c===c&&x.r===r&&!(ig&&ig.t==="d"&&ig.id===x.id)})}
function layFree(occ,mc,mr){var P=parS(),b=null,bd=1e18,c,r,v;
 P.forEach(function(q){for(r=q.r0;r<q.r1;r++)for(c=q.c0;c<q.c1;c++){if(occ[flKey(c,r)]||flAt(c,r)==="wt")continue;v=(c-mc)*(c-mc)+(r-mr)*(r-mr);if(v<bd){bd=v;b=[c,r]}}});return b}
// working copy = your current farm with the saved slot laid over it (same rules as the server)
function layBuild(L){var pp=[],dc=[],occ={},pend=[],lay={},i,e,sx=0,sy=0,n=0,k,mc,mr,fail=0,P=parS();
 function ok(c,r){return isFinite(c)&&isFinite(r)&&inLandP(P,c,r)&&flAt(c,r)!=="wt"&&!occ[flKey(c,r)]}
 for(i=0;i<S.np;i++){e=L?L.pp[i]:undefined;if(e===undefined)e=S.pp[i];
  if(e&&ok(e[0],e[1])){occ[flKey(e[0],e[1])]=1;pp[i]=[e[0],e[1]]}else{pp[i]=null;if(e||S.plots[i])pend.push({p:i})}}
 if(L)L.dc.forEach(function(q){lay[q[0]]=q});
 (S.dc||[]).forEach(function(x){var q=lay[x.id],o={id:x.id,k:x.k,c:x.c,r:x.r,s:x.s?1:0,rot:x.rot||0};
  if(x.t!=null)o.t=x.t;
  if(q){o.c=q[1];o.r=q[2];o.rot=q[3];o.s=q[4]?1:0}
  if(x.k==="barn")o.s=0;
  if(!o.s){if(isF(x.k)){if(!(isFinite(o.c)&&isFinite(o.r)&&inLandP(P,o.c,o.r))){o.c=x.c;o.r=x.r}}else if(OUTI[x.k]||(isFlagK(x.k)&&!inLandP(P,x.c,x.r))){o.c=x.c;o.r=x.r}else if(ok(o.c,o.r))occ[flKey(o.c,o.r)]=1;else pend.push({o:o})}
  dc.push(o)});
 for(k in occ){sx+=Math.floor(k/4096)-2048;sy+=k%4096-2048;n++}
 mc=n?sx/n:((S.sz||8)-1)/2;mr=n?sy/n:mc;
 pend.forEach(function(g){var t=layFree(occ,mc,mr);
  if(!t){if(g.p!==undefined||g.o.k==="barn")fail=1;else g.o.s=1;return}
  occ[flKey(t[0],t[1])]=1;if(g.p!==undefined)pp[g.p]=t;else{g.o.c=t[0];g.o.r=t[1]}});
 return fail?null:{pp:pp,dc:dc}}
function laySnap(){LAY.undo.push(JSON.stringify([LAY.pp,LAY.dc]));if(LAY.undo.length>25)LAY.undo.shift();LAY.dirty=true}
function layUI(){if(!LAY)return;var o=SEL&&SEL.t==="d"?layDc(SEL.id):null,n=layStored().length,h;
 $("lRot").disabled=!o;$("lSto").disabled=!SEL||!!(o&&o.k==="barn");$("lUndo").disabled=!LAY.undo.length;
  $("lMoveG").disabled=!SEL&&!LGMOVE;$("lMoveG").textContent=LGMOVE?"\u2716 Stop group":"\u2194\uFE0F Move group";
 $("lStore").textContent=PLACING?"\u2716 Stop":"\uD83D\uDCE6 Storage ("+n+")";
 $("lInfo").textContent=LGMOVE?"Tap the new spot for the selected item":PLACING?"Tap a free tile to place it":SEL?"Tap a free tile to move it":"Tap an item to select it";
 h=$("lBar").offsetHeight;if(h!==LAY.bh){LAY.bh=h;fitAll()}}
function layOpen(slot){var L=(S.lo||[])[slot]||null;
 if(PEND)return;if(EDIT)setEdit(false);side(false);dock(false);$("mkt").style.display="none";
 flush(function(){var w=layBuild(L),lc;
  if(!w){toast("Not enough free space for this layout.");return}
  LAY={slot:slot,pp:w.pp,dc:w.dc,undo:[],dirty:false,bh:0};SEL=null;PLACING=null;HOVT=null;
  lc=$("lCanvas");lc._pan=[0,0];lc._z=1;lc._kabs=0;lc._view=null;lc._kmin=0;
  LAY.box=camBox(LAY.pp,S.np,LAY.dc,S.sz||8,3,S.ls);
  $("lName").textContent="\u270F\uFE0F Layout "+(slot+1);$("lStoreP").style.display="none";$("lay").style.display="flex";layUI();fitAll()})}
function layClose(){LAY=null;LGMOVE=null;GPREV=null;SEL=null;PLACING=null;HOVT=null;$("lStoreP").style.display="none";$("lay").style.display="none";fitAll()}
function layExit(){if(!LAY)return;
 if(LAY.dirty){infoDlg("\u26A0\uFE0F","Discard changes?","Your edits to this layout are not saved.",["Layout "+(LAY.slot+1)],function(){layClose();layMenu()},"Discard");return}
 layClose();layMenu()}
function layPos(s){if(s.t==="p")return LAY.pp[s.i];var o=layDc(s.id);return o?[o.c,o.r]:null}
// ===== LAYOUT GROUP MOVE: same type, touching (diagonals count) =====
function layGrp(s){
 var gk=layGk(s),st=layPos(s),cand={},seen={},q=[],list=[],i,a,b,p,c,r,key;
 if(!st||gk==="barn")return[];
 function add(c2,r2,x){var kk=flKey(c2,r2);(cand[kk]=cand[kk]||[]).push(x)}
 if(gk==="p"){for(i=0;i<S.np;i++)if(LAY.pp[i])add(LAY.pp[i][0],LAY.pp[i][1],{t:"p",i:i})}
 else LAY.dc.forEach(function(x){if(!x.s&&gnorm(x.k)===gnorm(gk))add(x.c,x.r,{t:"d",id:x.id})});
 seen[flKey(st[0],st[1])]=1;q.push(st);
 while(q.length){p=q.pop();
  (cand[flKey(p[0],p[1])]||[]).forEach(function(s2){list.push(s2)});
  for(a=-1;a<=1;a++)for(b=-1;b<=1;b++){if(!a&&!b)continue;c=p[0]+a;r=p[1]+b;key=flKey(c,r);
   if(seen[key]||!cand[key])continue;seen[key]=1;q.push([c,r])}}
 return list}
function layGmoveTap(tc,tr){
 var a=layPos(LGMOVE.anchor),L=LGMOVE.list,dc,dr,ig={},occ={},mv=[],bad=null,i,q;
 if(!a){LGMOVE=null;GPREV=null;layUI();drawAll();return}
 dc=tc-a[0];dr=tr-a[1];
 if(!dc&&!dr){LGMOVE=null;GPREV=null;SEL=null;layUI();drawAll();return}
 L.forEach(function(s){ig[s.t==="p"?"p"+s.i:"d"+s.id]=1});
 for(i=0;i<S.np;i++){q=LAY.pp[i];if(q&&!ig["p"+i])occ[flKey(q[0],q[1])]=1}
 LAY.dc.forEach(function(x){if(x.s||isF(x.k)||OUTI[x.k]||ig["d"+x.id])return;
  var nw=footW(x.k),nh=footH(x.k),m,n;for(m=0;m<nw;m++)for(n=0;n<nh;n++)occ[flKey(x.c+m,x.r+n)]=1});
 L.forEach(function(s){var p=layPos(s),nc,nr;if(!p||bad)return;nc=p[0]+dc;nr=p[1]+dr;
  if(!inLandP(parS(),nc,nr)||flAt(nc,nr)==="wt"||occ[flKey(nc,nr)])bad=[nc,nr];
  mv.push([s,nc,nr])});
 if(bad){badTile(bad[0],bad[1]);toast("The group does not fit there (blocked, water, or outside your land).");return}
 laySnap();
 mv.forEach(function(m){var s=m[0],o;
  if(s.t==="p")LAY.pp[s.i]=[m[1],m[2]];else{o=layDc(s.id);o.c=m[1];o.r=m[2]}});
 LGMOVE=null;GPREV=null;SEL=null;HOVT=null;layUI();drawAll();
 toast("\u2194\uFE0F Moved a group of "+mv.length)}
$("lMoveG").onclick=function(){
 if(!LAY)return;
 if(LGMOVE){LGMOVE=null;GPREV=null;layUI();drawAll();return}
 if(!SEL){toast("Tap an item first, then tap Move group.");return}
 var gk=layGk(SEL),list;
 if(gk==="barn"||OUTI[gk]||isF(gk)||footW(gk)*footH(gk)>1){toast("Fences, big buildings and outside items are moved one by one.");return}
 list=layGrp(SEL);
 if(list.length<2){toast("Nothing touches this item. Just tap a free tile to move it.");return}
 LGMOVE={anchor:SEL,list:list};
 GPREV=list.map(function(s){return layPos(s)}).filter(Boolean);
 layUI();drawAll();
 toast("Group of "+list.length+" selected (yellow). Tap the new spot for the item you selected.")};
function lpick(p){var g=$("lCanvas")._g,best=null,bd=-1e9;LAY.dc.forEach(function(it){var b=HB[it.k];if(it.s||!b)return;var x=g.ox+(it.c-it.r)*g.TW/2,y=g.oy+(it.c+it.r+(footW(it.k)+footH(it.k))/2)*g.TH/2,f=isF(it.k),m=f?0:it.rot,fo=f?fOff(it):[0,0],k=it.c+it.r+(footW(it.k)+footH(it.k))/2-1+(f?fKey(it):0);x+=fo[0];y+=fo[1];
 if(p[0]>=x+(m?-b[2]:b[0])&&p[0]<=x+(m?-b[0]:b[2])&&p[1]>=y+b[1]&&p[1]<=y+b[3]&&k>bd){bd=k;best=it}});return best}
function layTap(e){var cv=$("lCanvas"),p=ptr(cv,e),t=toTile(cv,p),tc=Math.floor(t[0]),tr=Math.floor(t[1]),it,pl,h,o,GK,nr,cur;
 if(LGMOVE){layGmoveTap(tc,tr);return}
 if(PLACING){o=PLACING.t==="d"?layDc(PLACING.id):null;GK=layGk(PLACING);
  if(o&&isF(o.k)){if(!inLandP(parS(),tc,tr))return;laySnap();o.c=tc;o.r=tr;o.rot=fRot(o.k,t);o.s=0}
  else{if(!layFreeAt(tc,tr,null)){badTile(tc,tr);return}laySnap();if(PLACING.t==="p")LAY.pp[PLACING.i]=[tc,tr];else{o.c=tc;o.r=tr;o.s=0}}
  PLACING=layStored().filter(function(x){return layGk(x)===GK})[0]||null;HOVT=null;layUI();drawAll();return}
 if(SEL){o=SEL.t==="d"?layDc(SEL.id):null;
  if(o&&isF(o.k)){nr=fRot(o.k,t);if(inLandP(parS(),tc,tr)){if(tc===o.c&&tr===o.r&&nr===(o.rot||0)){SEL=null;layUI();drawAll();return}laySnap();o.c=tc;o.r=tr;o.rot=nr;SEL=null;HOVT=null;layUI();drawAll()}return}
  cur=layPos(SEL);
  if(cur&&tc===cur[0]&&tr===cur[1]){SEL=null;layUI();drawAll();return}
  if(layFreeAt(tc,tr,SEL)){laySnap();if(SEL.t==="p")LAY.pp[SEL.i]=[tc,tr];else{o.c=tc;o.r=tr}SEL=null;HOVT=null;layUI();drawAll();return}}
 it=lpick(p);pl=it?-1:hit(cv,e);h=it?{t:"d",id:it.id}:(pl>=0?{t:"p",i:pl}:null);
 if(h){SEL=h;layUI();drawAll()}else if(SEL)badTile(tc,tr)}
addPan($("lCanvas"));
$("lCanvas").onclick=function(e){if(this._drag){this._drag=false;return}if(!LAY)return;try{layTap(e)}catch(err){toast("Layout error: "+(err&&err.message))}};
$("lCanvas").onmousemove=function(e){if(!LAY||!(SEL||PLACING))return;var t=toTile(this,ptr(this,e)),n=[Math.floor(t[0]),Math.floor(t[1])];if(!HOVT||HOVT[0]!==n[0]||HOVT[1]!==n[1]){HOVT=n;drawAll()}};
$("lClose").onclick=layExit;
$("lUndo").onclick=function(){if(!LAY)return;var s=LAY.undo.pop(),a;if(!s)return;a=JSON.parse(s);LAY.pp=a[0];LAY.dc=a[1];SEL=null;PLACING=null;layUI();drawAll()};
$("lRot").onclick=function(){if(!LAY||!SEL||SEL.t!=="d")return;var o=layDc(SEL.id);if(!o)return;laySnap();o.rot=isF(o.k)?((o.rot||0)+1)&3:(o.rot?0:1);layUI();drawAll()};
$("lSto").onclick=function(){if(!LAY||!SEL)return;var o;
 if(SEL.t==="p"){if(S.plots[SEL.i]){toast("Harvest this plot first, then store it.");return}laySnap();LAY.pp[SEL.i]=null}
 else{o=layDc(SEL.id);if(!o||o.k==="barn")return;laySnap();o.s=1}
 SEL=null;layUI();drawAll()};
function layStoreP(){var box=$("lStoreP"),l=layStored(),G2={},ks=[];box.innerHTML="";
 if(!l.length){box.textContent="Storage is empty.";return}
 l.forEach(function(s){var k=layGk(s);if(!G2[k]){G2[k]=[];ks.push(k)}G2[k].push(s)});
 ks.forEach(function(k){var g=G2[k],b=document.createElement("button");
  b.className="btn alt";b.textContent=(k==="p"?"\uD83D\uDFEB":(KN[k]||["?",k])[0])+" "+(k==="p"?"Plot":(KN[k]||["?",k])[1])+" \u00D7"+g.length;
  b.onclick=function(){PLACING=g[0];SEL=null;box.style.display="none";layUI();drawAll()};box.appendChild(b)})}
$("lStore").onclick=function(){if(!LAY)return;if(PLACING){PLACING=null;layUI();drawAll();return}
 var p=$("lStoreP");if(p.style.display==="flex"){p.style.display="none";return}
 layStoreP();p.style.bottom=($("lBar").offsetHeight+8)+"px";p.style.display="flex"};
$("lSave").onclick=function(){if(!LAY)return;
 var D={pp:LAY.pp.map(function(q){return q?[q[0],q[1]]:0}),dc:LAY.dc.map(function(o){return[o.id,o.c,o.r,o.rot||0,o.s?1:0]})},sl=LAY.slot;
 busyShow("Saving layout...");
 flush(function(){call("farmLayoutSave",[TOKEN,sl,D],function(s){setState(s);busyHide();layClose();toast("\uD83D\uDCBE Saved in Layout "+(sl+1)+". Tap Set active to use it.");layMenu()},function(m){busyHide();toast(m)})})};
// ---- the 3 slots window ----
function layThumb(cv,L){var x=cv.getContext("2d"),M=mmap(1),K={},o;
 (S.dc||[]).forEach(function(d){K[d.id]=d.k});
 function P(c,r){return[M.fx+(M.ox+(c-r)*56-M.x0)*M.m,M.fy+(M.oy+(c+r)*28-M.y0)*M.m]}
 x.clearRect(0,0,124,65);
 parcels0(M.n,S.ls).forEach(function(q){x.beginPath();[P(q.c0,q.r0),P(q.c1,q.r0),P(q.c1,q.r1),P(q.c0,q.r1)].forEach(function(a,j){j?x.lineTo(a[0],a[1]):x.moveTo(a[0],a[1])});x.closePath();x.fillStyle="#79bd45";x.fill();x.strokeStyle="#8a6234";x.lineWidth=1.2;x.stroke()});
 L.pp.forEach(function(q){if(!q)return;o=P(q[0]+.5,q[1]+.5);x.fillStyle="#8a5c34";x.fillRect(o[0]-1.2,o[1]-1.2,2.4,2.4)});
 L.dc.forEach(function(q){var k=K[q[0]];if(q[4]||!k||isF(k))return;o=P(q[1]+.5,q[2]+.5);x.fillStyle=k==="barn"?"#c0392b":"#fff";x.fillRect(o[0]-1.6,o[1]-1.6,3.2,3.2)})}
function layAsk(i){infoDlg("\uD83D\uDDFA\uFE0F","Set Layout "+(i+1)+" active?","Your farm will be rearranged to this layout. Crops, trees, animals and timers are kept. Things you bought after saving it stay where they are. Tip: save your current farm in another slot first if you want to come back to it.",["Layout "+(i+1)],function(){
 landCall("farmLayoutApply",i,"Rearranging your farm...",function(){UNDO=[];toast("\u2705 Layout "+(i+1)+" is now active")})},"Set active")}
function layMenu(){var dlg=$("dlg"),lo=S.lo||[],rows="",i,L;
 function shut(){dlg.style.display="none"}
 for(i=0;i<3;i++){L=lo[i];
  rows+="<div class='dst' style='flex-wrap:wrap'><canvas data-t='"+i+"' width='124' height='65' style='width:124px;height:65px;border-radius:8px;background:rgba(20,30,15,.45);flex:none'></canvas><span style='flex:1;min-width:96px'><b>Layout "+(i+1)+"</b><br><span class='small'>"+(L?L.pp.filter(Boolean).length+" plots \u00B7 "+L.dc.filter(function(q){return !q[4]}).length+" objects":"Empty slot")+"</span></span>"+
  (L?"<span style='display:flex;flex-wrap:wrap;gap:6px;width:100%;justify-content:flex-end'><button class='btn alt' data-e='"+i+"'>\u270F\uFE0F Edit</button><button class='btn' data-a='"+i+"'>\u2705 Set active</button><button class='btn alt' data-n='"+i+"'>\uD83D\uDC65 Copy neighbor</button><button class='btn alt' data-c='"+i+"'>\uD83D\uDDD1</button></span>":"<span style='display:flex;gap:6px'><button class='btn' data-e='"+i+"'>\u2795 Create</button><button class='btn alt' data-n='"+i+"'>\uD83D\uDC65 Copy neighbor</button></span>")+"</div>"}
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDDFA\uFE0F</div><div class='dtitle'>Farm layouts</div><div class='dsub'>Rearrange your farm on a separate map. Your live farm does not change until you tap Set active.</div><div style='margin:10px 0 4px;max-height:52vh;overflow-y:auto'>"+rows+"</div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 [].forEach.call(dlg.querySelectorAll("canvas[data-t]"),function(c){var L2=lo[Number(c.dataset.t)];if(L2)layThumb(c,L2)});
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),i2;if(ev.target===dlg){shut();return}if(!b)return;
  if(b.dataset.e!==undefined){shut();layOpen(Number(b.dataset.e))}
  else if(b.dataset.a!==undefined){shut();layAsk(Number(b.dataset.a))}
  else if(b.dataset.n!==undefined){shut();layNbPick(Number(b.dataset.n))}
  else if(b.dataset.c!==undefined){i2=Number(b.dataset.c);shut();infoDlg("\uD83D\uDDD1","Clear Layout "+(i2+1)+"?","The saved layout is deleted. Your live farm is not changed.",["Layout "+(i2+1)],function(){landCall("farmLayoutClear",i2,"Clearing...",function(){layMenu()})},"Clear")}}}
$("layBtn").onclick=function(){if(PEND)return;layMenu()};
// ===== COPY A NEIGHBOR'S LAYOUT INTO A SLOT =====
// builds a slot from the neighbor's farm: their spots are given to YOUR items of the same type
function layFromNb(nv){
 var P=parS(),nz=nv.sz||8,off=(S.sz||8)-nz,spots={},by={},pp=[],dc=[],occ={},barns=[],mp=[],sp,i,mc=((S.sz||8)-1)/2,
  st={placed:0,stored:0,kept:0,off:0,miss:0};
 function sh(c,r){return(c>=0&&r>=0&&c<nz&&r<nz)?[c+off,r+off]:[c,r]} // front corners line up, like when land expands
 function add(k,c,r,rot){var q=sh(c,r);(spots[k]=spots[k]||[]).push({c:q[0],r:q[1],rot:rot||0})}
 function valid(k,c,r){return inLandP(P,c,r)&&(isF(k)||flAt(c,r)!=="wt")}
 for(i=0;i<(nv.np||0);i++)if(nv.pp&&nv.pp[i])add("p",nv.pp[i][0],nv.pp[i][1],0);
 (nv.dc||[]).forEach(function(x){if(!x.s)add(x.k,x.c,x.r,x.rot)});
 Object.keys(spots).forEach(function(k){var a=spots[k],ok=a.filter(function(q){return valid(k,q.c,q.r)});
  st.off+=a.length-ok.length;ok.sort(function(a,b){return a.c+a.r-b.c-b.r||a.c-b.c});spots[k]=ok});
 // plots: planted ones choose first (they cannot be stored)
 for(i=0;i<S.np;i++){mp.push(i);pp[i]=0}
 mp.sort(function(a,b){return(S.plots[b]?1:0)-(S.plots[a]?1:0)||a-b});
 sp=spots.p||[];
 mp.forEach(function(j,n){var q=sp[n];
  if(q){pp[j]=[q.c,q.r];occ[flKey(q.c,q.r)]=1;st.placed++}
  else if(S.plots[j])st.kept++;else st.stored++});
 if(sp.length>S.np)st.miss+=sp.length-S.np;
 // objects: same type to same type
 (S.dc||[]).forEach(function(x){(by[x.k]=by[x.k]||[]).push(x)});
 Object.keys(by).forEach(function(k){var a=by[k],s=spots[k]||[];if(OUTI[k]){a.forEach(function(x){dc.push([x.id,x.c,x.r,x.rot||0,x.s?1:0])});return}
  a.forEach(function(x,n){var q=s[n],e;
   if(q){dc.push([x.id,q.c,q.r,q.rot&3,0]);if(!isF(k))occ[flKey(q.c,q.r)]=1;st.placed++}
   else if(k==="barn"){e=[x.id,x.c,x.r,x.rot||0,0];dc.push(e);barns.push(e)}
   else{dc.push([x.id,x.c,x.r,x.rot||0,1]);st.stored++}});
  if(s.length>a.length)st.miss+=s.length-a.length});
 Object.keys(spots).forEach(function(k){if(k!=="p"&&!by[k])st.miss+=spots[k].length});
 // a barn with no spot keeps its place unless that tile is taken
 barns.forEach(function(e){var t;
  if(!valid("barn",e[1],e[2])||occ[flKey(e[1],e[2])]){t=layFree(occ,mc,mc);if(t){e[1]=t[0];e[2]=t[1]}}
  occ[flKey(e[1],e[2])]=1});
 return{pp:pp,dc:dc,st:st}}
function layCopyRun(slot,nv,name){busyShow("Copying "+name+"'s layout...");
 flush(function(){var r=layFromNb(nv);
  call("farmLayoutSave",[TOKEN,slot,{pp:r.pp,dc:r.dc}],function(s){var t=r.st,chips=["Placed: "+t.placed];
   setState(s);busyHide();
   if(t.stored)chips.push("In storage: "+t.stored);
   if(t.kept)chips.push("Planted, kept: "+t.kept);
   if(t.off)chips.push("Did not fit: "+t.off);
   if(t.miss)chips.push("You don't own: "+t.miss);
   infoDlg("\u2705","Layout "+(slot+1)+" is ready","Copied "+esc(name)+"'s layout. Your live farm has not changed yet. Open the editor to adjust it, or tap Set active in Farm layouts."+(t.miss?" Some of their items are not on your farm yet.":""),chips,function(){layOpen(slot)},"\u270F\uFE0F Open editor")},
   function(m){busyHide();toast(m)})})}
// ask before replacing a filled slot, then copy (nv = neighbor data already loaded, or null to load it first)
function layCopyGo(slot,name,nid,nv){
 function go(){
  if(nv){layCopyRun(slot,nv,name);return}
  busyShow("Reading "+name+"'s farm...");
  flush(function(){call("farmVisit",[TOKEN,nid],function(s){layCopyRun(slot,s.out,name)},function(m){busyHide();toast(m)})})}
 if((S.lo||[])[slot])infoDlg("\u26A0\uFE0F","Replace Layout "+(slot+1)+"?","The layout saved in this slot will be replaced with "+esc(name)+"'s layout. Your live farm does not change.",["Layout "+(slot+1)],go,"Replace");
 else go()}
// choose which neighbor to copy
function layNbPick(slot){var dlg=$("dlg"),rows="";
 function shut(){dlg.style.display="none"}
 if(!S.nb.length){infoDlg("\uD83D\uDC65","No neighbors yet","Add a neighbor first (the Neighbors button), then you can copy their layout.",["Neighbors: 0"]);return}
 S.nb.forEach(function(n,i){rows+="<div class='dst'><span style='flex:1'><b>\uD83D\uDC68\u200D\uD83C\uDF3E "+esc(n.username)+"</b><br><span class='small'>"+esc(n.id)+"</span></span><button class='btn' data-n='"+i+"'>Copy</button></div>"});
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDC65</div><div class='dtitle'>Copy a neighbor's layout</div><div class='dsub'>It goes into Layout "+(slot+1)+". Your live farm does not change.</div><div style='margin:10px 0 4px;max-height:52vh;overflow-y:auto'>"+rows+"</div><div class='dbtns'><button class='btn alt' id='dNo'>Cancel</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),n;if(ev.target===dlg){shut();return}if(!b||b.dataset.n===undefined)return;
  n=S.nb[Number(b.dataset.n)];if(!n)return;shut();layCopyGo(slot,n.username,n.id,null)}}
// from the visit screen: choose which slot
$("vCopy").onclick=function(){if(!V)return;var dlg=$("dlg"),lo=S.lo||[],rows="",i;
 function shut(){dlg.style.display="none"}
 for(i=0;i<3;i++)rows+="<div class='dst'><span style='flex:1'><b>Layout "+(i+1)+"</b><br><span class='small'>"+(lo[i]?"Has a saved layout (will be replaced)":"Empty slot")+"</span></span><button class='btn' data-s='"+i+"'>Copy here</button></div>";
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\uD83D\uDCCB</div><div class='dtitle'>Copy "+esc(V.username)+"'s layout</div><div class='dsub'>Choose a slot. Your live farm does not change.</div><div style='margin:10px 0 4px'>"+rows+"</div><div class='dbtns'><button class='btn alt' id='dNo'>Cancel</button></div>";
 dlg.style.display="flex";$("dNo").onclick=shut;
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button");if(ev.target===dlg){shut();return}if(!b||b.dataset.s===undefined)return;
  shut();layCopyGo(Number(b.dataset.s),V.username,V.id,V)}};
