// ===================== DECORATE MODE =====================
var EDIT=false,SEL=null,PLACING=null,DRAG=null,BUYING=0,SELL1=0;
var KN={barn:["\uD83C\uDFE1","Barn"],silo:["\uD83C\uDF3E","Silo"],tree:["\uD83C\uDF33","Tree"],bush:["\uD83C\uDF3F","Bush"],pond:["\uD83D\uDCA7","Pond"],bale:["\uD83D\uDFE8","Hay bale"],tractor:["\uD83D\uDE9C","Tractor"]};
var HB={barn:[-50,-85,50,28],silo:[-16,-100,16,10],tree:[-36,-78,36,8],bush:[-20,-30,20,6],pond:[-34,-16,34,16],bale:[-12,-20,12,6],tractor:[-30,-52,30,8]};
// Hitboxes for the 18 new decorations
HB.d_pergola=[-30,-62,30,12];
HB.d_topiary=[-20,-55,20,10];
HB.d_rosearch=[-27,-70,27,12];
HB.d_birdbath=[-22,-48,22,10];
HB.d_sundial=[-22,-35,22,10];
HB.d_mushroom=[-27,-30,27,10];
HB.d_windchime=[-23,-58,23,10];
HB.d_cart=[-32,-42,32,12];
HB.d_planter=[-29,-45,29,12];
HB.d_tulips=[-30,-45,30,12];
HB.d_swing=[-30,-58,30,12];
HB.d_waterwheel=[-30,-55,30,12];
HB.d_archway=[-32,-58,32,12];
HB.d_flagpole=[-15,-72,30,10];
HB.d_butterfly=[-30,-52,30,12];
HB.d_statue=[-22,-58,22,12];
HB.d_gate=[-30,-52,30,12];
HB.d_rockgarden=[-30,-25,30,12];
function dcById(id){return(S.dc||[]).filter(function(x){return x.id===id})[0]}
function same(a,b){return a&&b&&a.t===b.t&&(a.t==="p"?a.i===b.i:a.id===b.id)}
function tileFree(c,r,ig){
 if(!inLandP(parS(),c,r))return false;
 if(flAt(c,r)==="wt")return false; // nothing (plots, trees, animals, decor) can be placed on water
 for(var i=0;i<S.np;i++){var q=S.pp[i];if(q&&q[0]===c&&q[1]===r&&!(ig&&ig.t==="p"&&ig.i===i))return false}
 return !(S.dc||[]).some(function(x){return !x.s&&!isF(x.k)&&x.c===c&&x.r===r&&!(ig&&ig.t==="d"&&ig.id===x.id)})}
function freeTile(){var sx=0,sy=0,n=0,i,q,mc,mr,best=null,bd=1e18,c,r,v,occ={},BX=wbox0(FW,S.ls),P=parS();
 for(i=0;i<S.np;i++){q=S.pp[i];if(q){sx+=q[0];sy+=q[1];n++;occ[(q[0]+2048)*4096+q[1]+2048]=1}}
 (S.dc||[]).forEach(function(o){if(!o.s){sx+=o.c;sy+=o.r;n++;if(!isF(o.k))occ[(o.c+2048)*4096+o.r+2048]=1}});
 mc=n?sx/n:(FW-1)/2;mr=n?sy/n:(FH-1)/2;
 for(r=BX.r0;r<BX.r1;r++)for(c=BX.c0;c<BX.c1;c++){if(occ[(c+2048)*4096+r+2048]||!inLandP(P,c,r)||flAt(c,r)==="wt")continue;v=(c-mc)*(c-mc)+(r-mr)*(r-mr);if(v<bd){bd=v;best=[c,r]}}
 return best}
function getPos(s){if(s.t==="p")return S.pp[s.i]?S.pp[s.i].slice():null;var it=dcById(s.id);return it?[it.c,it.r]:null}
function setPos(s,c,r){if(s.t==="p")S.pp[s.i]=[c,r];else{var it=dcById(s.id);it.c=c;it.r=r;it.s=0}}
function nameOf(s){return s.t==="p"?"plot":KN[dcById(s.id).k][1]}
function stored(){var l=[],i;for(i=0;i<S.np;i++)if(!S.pp[i])l.push({t:"p",i:i});(S.dc||[]).forEach(function(x){if(x.s&&!inShed(x))l.push({t:"d",id:x.id})});return l}
function ptr(cv,ev){var g=cv._g,rc=cv.getBoundingClientRect();return[(ev.clientX-rc.left-g.L)/g.k,(ev.clientY-rc.top-g.T)/g.k]}
function toTile(cv,p){var g=cv._g,dx=(p[0]-g.ox)/(g.TW/2),dy=(p[1]-g.oy)/(g.TH/2);return[(dx+dy)/2,(dy-dx)/2]}
function pickDeco(cv,p){var g=cv._g,best=null,bd=-1e9,arr=g.cr?g.items:(S.dc||[]),ta=(p[0]-g.ox)/(g.TW/2),tb=(p[1]-g.oy)/(g.TH/2),tc=(ta+tb)/2,tr=(tb-ta)/2;arr.forEach(function(it){var b=HB[it.k];if(it.s||!b)return;var fw=iw(it),fh=ih(it),x=g.ox+(it.c-it.r)*g.TW/2,y=g.oy+(it.c+it.r+(fw+fh)/2)*g.TH/2,f=isF(it.k),m=f?0:it.rot,fo=f?fOff(it):[0,0],k=it.c+it.r+(fw+fh)/2-1+(f?fKey(it):0),hit;x+=fo[0];y+=fo[1];
 hit=p[0]>=x+(m?-b[2]:b[0])&&p[0]<=x+(m?-b[0]:b[2])&&p[1]>=y+b[1]&&p[1]<=y+b[3];if(!hit&&fw*fh>1)hit=tc>=it.c&&tc<it.c+fw&&tr>=it.r&&tr<it.r+fh;
 if(hit&&k>bd){bd=k;best=it._o||it}});return best}
function gkey(s){return s.t==="p"?"p":(dcById(s.id)||{}).k}
function renderBarn(){var box=$("barnList"),l=stored(),G2={},ks=[];box.innerHTML="";
 $("barnUndo").style.display=UNDO.length?"":"none";$("edUndo").style.display=UNDO.length?"":"none";
 if(!l.length){box.textContent="Barn is empty.";return}
 l.forEach(function(s){var k=gkey(s);if(!G2[k]){G2[k]=[];ks.push(k)}G2[k].push(s)});
 ks.forEach(function(k){if(invIsAni(k))return;var g=G2[k],ic=k==="p"?"\uD83D\uDFEB":(KN[k]||["?",k])[0],nm=k==="p"?"Plot":(KN[k]||["?",k])[1],b=document.createElement("button");
  b.className="btn alt";b.textContent=ic+" "+nm+" \u00D7"+g.length;
  b.onclick=function(){PLACING=g[0];SEL=null;$("barnP").style.display="none";editUI();drawAll()};box.appendChild(b)})}
function doStore(list){var b=[];list.forEach(function(s){
  if(s.t==="p"){var q=S.pp[s.i];if(!q||S.plots[s.i])return;b.push({t:"p",i:s.i,c:q[0],r:q[1]});S.pp[s.i]=null;send("farmPlotMove",[TOKEN,s.i,0,0,1])}
  else{var it=dcById(s.id);if(!it||it.s||it.k==="barn")return;b.push({t:"d",id:it.id,c:it.c,r:it.r});it.s=1;send("farmDecor",[TOKEN,it.id,0,0,1])}});
 if(b.length){UNDO.push(b);if(UNDO.length>20)UNDO.shift()}return b.length}
function undoStore(){var b=UNDO.pop(),n=0;if(!b){toast("Nothing to undo");return}
 b.forEach(function(o){var c=o.c,r=o.r,f;
  if(o.t==="p"){if(S.pp[o.i])return;if(!tileFree(c,r,null)){f=freeTile();if(!f)return;c=f[0];r=f[1]}S.pp[o.i]=[c,r];send("farmPlotMove",[TOKEN,o.i,c,r,0]);n++}
  else{var it=dcById(o.id);if(!it||!it.s)return;if(!isF(it.k)&&!tileFree(c,r,null,it.k)){f=OUTI[it.k]?outFreeTile(fiDef(it.k)):freeTile(it.k);if(!f)return;c=f[0];r=f[1]}it.c=c;it.r=r;it.s=0;send("farmDecor",[TOKEN,o.id,c,r,0]);n++}});
 SEL=null;PLACING=null;paint();editUI();drawAll();toast("\u21A9 Restored "+n+" item(s)")}
function infoDlg(ic,title,sub,chips,yes,yesTxt){var dlg=$("dlg");function shut(){dlg.style.display="none"}
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>"+ic+"</div><div class='dtitle'>"+title+"</div><div class='dsub'>"+sub+"</div><div class='drow'>"+chips.map(function(c){return"<span class='dchip'>"+c+"</span>"}).join("")+"</div><div class='dbtns'>"+(yes?"<button class='btn alt' id='dNo'>Cancel</button><button class='btn ok' id='dYes'>"+yesTxt+"</button>":"<button class='btn ok' id='dYes'>OK</button>")+"</div>";
 dlg.style.display="flex";$("dYes").onclick=function(){shut();if(yes)yes()};if(yes)$("dNo").onclick=shut;dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
function sellVal(it){var d=(S.items||[]).filter(function(x){return x.id===it.k})[0];return d?Math.floor((d.rf!=null?d.rf:d.cost)*(S.sellRate||.5)):0}
function editUI(){if(PEND)return;if(SEL&&SEL.t==="d"&&!dcById(SEL.id))SEL=null;
 var barnSel=SEL&&SEL.t==="d"&&dcById(SEL.id).k==="barn",seeded=SEL&&SEL.t==="p"&&S.plots[SEL.i],isD=SEL&&SEL.t==="d",itx=isD&&dcById(SEL.id);
 $("edBarn").textContent="\uD83C\uDFE1 Barn ("+stored().length+")";
 $("edStore").style.display=SEL&&!barnSel&&!seeded?"":"none";
 $("edGrp").style.display=SEL&&!barnSel?"":"none";$("edMoveG").style.display=SEL&&!barnSel&&!GMOVE?"":"none";
  $("edMoveS").style.display=SEL&&!barnSel&&!GMOVE?"":"none";
 $("edPlantG").style.display=SEL&&SEL.t==="p"&&!S.plots[SEL.i]?"":"none";
 $("edHarvG").style.display=SEL&&((SEL.t==="p"&&S.plots[SEL.i])||(isD&&itx&&FTD[itx.k]))?"":"none";
 $("edTxt").textContent=PAINT?"Painting "+(floorDef(PAINT.id)||{name:""}).name+" ("+((floorDef(PAINT.id)||{cost:0}).cost)+"\uD83E\uDE99 per tile) - brush "+PAINT.size+"x"+PAINT.size:PBUY?"Tap a free tile to buy & place a plot (\uD83E\uDE99 "+S.plotCost+")":PLACING?"Placing: "+nameOf(PLACING)+" ("+stored().length+" in barn)":SEL?nameOf(SEL):"";
 SELL1=0;
 $("edRot").style.display=isD?"":"none";$("edSell").style.display=isD&&!barnSel?"":"none";$("edUp").style.display=isD&&itx&&isF(itx.k)&&itx.k!=="stoplight"?"":"none";
 if(isD&&!barnSel&&itx)$("edSell").textContent="\uD83D\uDCB0 Sell +"+sellVal(itx);
 $("edStop").style.display=PLACING||PAINT?"":"none";$("edBrush").style.display=PAINT?"":"none";$("edAll").style.display=PAINT?"":"none";if(PAINT)$("edBrush").textContent="\uD83D\uDD8C Brush "+PAINT.size+"x"+PAINT.size;
 if(GMOVE){$("edTxt").textContent="Moving a group of "+GMOVE.list.length+": tap the new spot for the selected item";$("edStop").style.display="";$("edMoveG").style.display="none"}
 renderBarn()}
function setEdit0(on){GMOVE=null;GPREV=null;GCONF=null;if($("field")._rot){$("field")._pan=[0,0];$("field")._box=null}EDIT=on;document.body.classList.toggle("edit-top",!!on);SEL=null;PLACING=null;DRAG=null;HOVT=null;PBUY=0;PAINT=null;HV.f=-1;$("editbar").style.display=on&&!PEND?"flex":"none";$("barnP").style.display="none";$("field").style.touchAction="none";if(on){side(false);dock(false)}editUI();fitAll();drawAll()}
function setEdit(on){var b=!on&&BUYING;setEdit0(on);if(b){BUYING=0;$("mkt").style.display="flex";renderMkt()}}
$("edBtn").onclick=function(){PEND=null;$("buyBar").style.display="none";BUYING=0;setEdit(!EDIT)};$("edDone").onclick=function(){setEdit(false)};
$("edBarn").onclick=function(){var p=$("barnP"),e=$("editbar");p.style.display=p.style.display==="none"?"block":"none";p.style.top=(e.getBoundingClientRect().bottom+6)+"px"};
$("edStore").onclick=function(){if(!SEL)return;
 if(SEL.t==="p"&&S.plots[SEL.i]){toast("Harvest this plot first, then store it.");return}
 doStore([SEL]);SEL=null;editUI();drawAll()};
 // ===== STORE GROUP: same type, touching (including diagonals) =====
$("edGrp").onclick=function(){
 if(!SEL)return;
 var gk=gkey(SEL),st=getPos(SEL),cand={},seen={},q=[],list=[],skip=0,n,i,a,b,p,c,r,key;
 if(!st||gk==="barn")return;
 if(isF(gk)&&dcById(SEL.id))list=fenceGroup(dcById(SEL.id));
 function add(c2,r2,s){var kk=flKey(c2,r2);(cand[kk]=cand[kk]||[]).push(s)}
 if(gk==="p"){for(i=0;i<S.np;i++)if(S.pp[i])add(S.pp[i][0],S.pp[i][1],{t:"p",i:i})}
 else(S.dc||[]).forEach(function(x){if(!x.s&&gnorm(x.k)===gnorm(gk))add(x.c,x.r,{t:"d",id:x.id})});
 seen[flKey(st[0],st[1])]=1;q.push(st);
 while(q.length){p=q.pop();
  if(!isF(gk))(cand[flKey(p[0],p[1])]||[]).forEach(function(s){list.push(s);if(s.t==="p"&&S.plots[s.i])skip++});
  for(a=-1;a<=1;a++)for(b=-1;b<=1;b++){if(!a&&!b)continue;c=p[0]+a;r=p[1]+b;key=flKey(c,r);
   if(seen[key]||!cand[key])continue;seen[key]=1;q.push([c,r])}}
  var sg=list.map(function(s){var p2=getPos(s);return p2?p2[0]+","+p2[1]:""}).join(";")+"|"+gk;
  if(GCONF!==sg){GCONF=sg;GPREV=list.map(function(s){return getPos(s)}).filter(Boolean);drawAll();toast("The yellow tiles are the group ("+list.length+"). Tap Store group again to store only these.");return}
  GCONF=null;GPREV=null;
  n=doStore(list);
  SEL=null;PLACING=null;paint();editUI();drawAll();
 try{if(n)FarmAudio.play("store")}catch(e){}
 toast(n?"\uD83D\uDCE6 Stored a group of "+n+(skip?" ("+skip+" planted plot"+(skip>1?"s":"")+" skipped)":"")+" - tap Undo to restore":(skip?"Planted plots can't be stored. Harvest them first.":"Nothing to store"))};
 // ===== GROUP HELPERS: same type, touching (diagonals count), starts from the selected item =====
// ===== FENCE GROUP: fences join only when their edges really touch (same style) =====
function fEdgesOf(it){var c=it.c,r=it.r,t=(it.rot||0)&3;
 function E(e){return e===0?[[c,r],[c+1,r]]:e===1?[[c,r],[c,r+1]]:e===2?[[c,r+1],[c+1,r+1]]:[[c+1,r],[c+1,r+1]]}
 return(isCorner(it.k)?[[0,1],[0,3],[2,3],[2,1]][t]:[t]).map(E)}
function fVertsOf(it){var v=[];fEdgesOf(it).forEach(function(e){v.push(e[0],e[1])});return v}
function fenceGroup(start){var sg=gnorm(start.k),byV={},seen={},q=[start],out=[],p;
 (S.dc||[]).forEach(function(x){if(x.s||gnorm(x.k)!==sg)return;fVertsOf(x).forEach(function(v){var k=v[0]+","+v[1];(byV[k]=byV[k]||[]).push(x)})});
 seen[start.id]=1;
 while(q.length){p=q.pop();out.push({t:"d",id:p.id});fVertsOf(p).forEach(function(v){(byV[v[0]+","+v[1]]||[]).forEach(function(n){if(!seen[n.id]){seen[n.id]=1;q.push(n)}})})}
 return out}
function gnorm(k){var m;if(k==="f_corner")return"f_fence";m=/^f_([a-z]+)_c$/.exec(k||"");return m?"f_"+m[1]:k}
function grpOf(s){
 var gk=gkey(s),st=getPos(s),cand={},seen={},q=[],list=[],i,a,b,p,c,r,key;
 if(!st||gk==="barn")return[];
 if(isF(gk)&&dcById(s.id))return fenceGroup(dcById(s.id));
 function add(c2,r2,x){var kk=flKey(c2,r2);(cand[kk]=cand[kk]||[]).push(x)}
 if(gk==="p"){for(i=0;i<S.np;i++)if(S.pp[i])add(S.pp[i][0],S.pp[i][1],{t:"p",i:i})}
 else(S.dc||[]).forEach(function(x){if(!x.s&&gnorm(x.k)===gnorm(gk))add(x.c,x.r,{t:"d",id:x.id})});
 seen[flKey(st[0],st[1])]=1;q.push(st);
 while(q.length){p=q.pop();
  (cand[flKey(p[0],p[1])]||[]).forEach(function(s2){list.push(s2)});
  for(a=-1;a<=1;a++)for(b=-1;b<=1;b++){if(!a&&!b)continue;c=p[0]+a;r=p[1]+b;key=flKey(c,r);
   if(seen[key]||!cand[key])continue;seen[key]=1;q.push([c,r])}}
 return list}
// ===== GROUP PLANT: plants the selected seed on every empty plot of the group =====
$("edPlantG").onclick=function(){
 if(!SEL||SEL.t!=="p")return;
 var c=cr(sel),n=0,fx=[],F=window.FarmFX;if(!c)return;
 if(S.level<c.lvl){toast(c.name+" unlocks at level "+c.lvl);return}
 grpOf(SEL).forEach(function(s){var free,q;
  if(s.t!=="p"||S.plots[s.i]||!S.pp[s.i])return;
  free=c.id===S.crops[0].id&&S.coins<c.cost;
  if(S.coins<c.cost&&!free)return;
  if(!free)S.coins-=c.cost;
  S.plots[s.i]={c:c.id,t:nowT(),b:0,hb:[]};send("farmPlant",[TOKEN,s.i,sel]);n++;
  if(F){q=F.scr(S.pp[s.i][0],S.pp[s.i][1],-8);if(q)fx.push(q)}});
 if(!n){toast("No empty plot in this group, or not enough coins.");return}
 SEL=null;paint();editUI();drawAll();
 if(F&&fx.length)try{F.plant(fx)}catch(e){}
 toast("\uD83C\uDF31 Planted "+n+" "+c.name)};
// ===== GROUP HARVEST: collects every ripe crop / tree / animal of the group =====
$("edHarvG").onclick=function(){
 if(!SEL)return;
 var n=0,co=0,xp=0,fx=[],F=window.FarmFX;
 grpOf(SEL).forEach(function(s){var p,q,v,it,f,sp;
  if(s.t==="p"){p=S.plots[s.i];q=S.pp[s.i];if(!p||!q||!isRipe(p))return;
   v=priceOf(p);invAdd((p.b?"cb:":"c:")+p.c,1);xp+=cr(p.c).xp;n++;S.plots[s.i]=null;send("farmHarvest",[TOKEN,s.i]);
   if(F){sp=F.scr(q[0],q[1],F.top);if(sp)fx.push({p:sp,v:v,big:!!p.b})}}
  else{it=dcById(s.id);f=it&&FTD[it.k];if(!f||it.s||nowT()-it.t<f.ms)return;
   invAdd("i:"+it.k,1);xp+=f.xp;n++;it.t=nowT();send("farmTreeHarvest",[TOKEN,it.id]);
   if(F){sp=F.scr(it.c,it.r,F.itemTop(it.k));if(sp)fx.push({p:sp,v:f.sell,big:false})}}});
 if(!n){toast("Nothing is ripe in this group yet.");return}
 S.xp+=xp;lvlUp();SEL=null;paint();editUI();drawAll();
 toast("Collected "+n+" things! Stored in barn")};
$("edUndo").onclick=undoStore;$("barnUndo").onclick=undoStore;
// put the next item from the barn into your hand, one after another
$("barnAll").onclick=function(){var l=[],i,skip=0,n;
 for(i=0;i<S.np;i++)if(S.pp[i]){if(S.plots[i])skip++;else l.push({t:"p",i:i})}
 (S.dc||[]).forEach(function(x){if(!x.s&&x.k!=="barn")l.push({t:"d",id:x.id})});
 n=doStore(l);SEL=null;PLACING=null;paint();editUI();drawAll();
 toast(n?"\uD83D\uDCE6 Stored "+n+" items"+(skip?" ("+skip+" planted plots skipped)":"")+" - tap Undo to restore":(skip?"Planted plots can't be stored. Harvest them first.":"Nothing to store"))};
$("edStop").onclick=function(){PLACING=null;PAINT=null;GMOVE=null;GPREV=null;GCONF=null;editUI();drawAll()};
$("edBrush").onclick=function(){if(!PAINT)return;PAINT.size=BRUSH[(BRUSH.indexOf(PAINT.size)+1)%BRUSH.length];editUI()};
