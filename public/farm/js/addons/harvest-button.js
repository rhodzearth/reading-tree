/* ===== HARVEST BUTTON: also move fully grown baby animals out of the baby rooms into the barn ===== */
(function(){
var h1=$("hAll").onclick,ANI={cowshed:["a_cow","\uD83D\uDC04"],sheepshed:["a_sheep","\uD83D\uDC11"],pigshed:["a_pig","\uD83D\uDC37"],horseshed:["a_horse","\uD83D\uDC0E"],chickenshed:["a_chicken","\uD83D\uDC14"]};
$("hAll").onclick=function(){
 var r=h1.apply(this,arguments),now=nowT(),moved=0,cnt={};
 try{
  shedList().forEach(function(sd){var c=sd.cc,a=ANI[sd.k],keep,id2;
   if(!c||!a||!sd.cf||!sd.cf.length)return;
   keep=[];
   sd.cf.forEach(function(q){
    if(now-q.b>=c.g){
     id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36)+moved.toString(36);
     S.dc.push({id:id2,k:a[0],c:0,r:0,s:1,t:now});
     send("farmCalfOut",[TOKEN,sd.id,q.i,id2,0]);
     moved++;cnt[a[1]]=(cnt[a[1]]||0)+1}
    else keep.push(q)});
   sd.cf=keep});
 }catch(e){}
 if(moved){paint();drawAll();
  toast("\uD83D\uDCE6 Moved to barn: "+Object.keys(cnt).map(function(k){return cnt[k]+" "+k}).join("  "))}
 return r};
$("hAll").title="Harvest everything and move grown baby animals to the barn";
})();
