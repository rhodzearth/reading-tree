function boostDlg(){
 var w=S.wf||0,dlg=$("dlg"),PER=30,HRS=6;
 function shut(){dlg.style.display="none"}
 function dur(n){var m=Math.round(n*HRS*60/PER),h=Math.floor(m/60),mm=m%60;return h?h+"h"+(mm?" "+mm+"m":""):mm+"m"}
 if(w<1){infoDlg("\u26AA","No white fruits yet","Read the Book of Mormon and grow your tree to earn white fruits. 30 \u26AA = 6 hours of boost, so 1 \u26AA = 12 minutes.",["You have \u26AA 0"],function(){flush(openTree)},"\uD83D\uDCD6 Read now");return}
 var BS="width:46px;height:46px;font-size:26px;padding:0;line-height:1";
 $("dlgBody").innerHTML="<div style='font-size:38px;line-height:1'>\u26AA</div><div class='dtitle'>Boost crops</div>"+
  "<div class='dsub'>30 \u26AA = 6 hours, so 1 \u26AA = 12 minutes. Choose how many white fruits to use.</div>"+
  "<div style='display:flex;align-items:center;justify-content:center;gap:10px;margin:14px 0 8px'>"+
   "<button class='btn alt' id='bfM' style='"+BS+"'>\u2212</button>"+
   "<input id='bfN' type='number' inputmode='numeric' min='1' max='"+w+"' value='"+Math.min(w,PER)+"' style='width:96px;text-align:center;font-size:22px;font-weight:700;margin:0;-webkit-user-select:text;user-select:text'>"+
   "<button class='btn alt' id='bfP' style='"+BS+"'>+</button></div>"+
  "<div style='display:flex;justify-content:center;gap:6px;margin-bottom:6px'>"+
   "<button class='btn alt' data-q='5'>5</button><button class='btn alt' data-q='10'>10</button><button class='btn alt' data-q='30'>30</button><button class='btn alt' data-q='max'>Max</button></div>"+
  "<div class='drow'><span class='dchip' id='bfH'></span><span class='dchip' id='bfL'></span></div>"+
  "<div class='dsub' id='bfS'></div>"+
  "<div class='dbtns'><button class='btn alt' id='dNo'>Cancel</button><button class='btn ok' id='dYes'>Boost</button></div>";
 var inp=$("bfN");
 function cur(){var v=parseInt(inp.value,10);return isFinite(v)?Math.max(0,Math.min(w,v)):0}
 function upd(){var v=cur();
  $("bfH").textContent="\u26A1 Boost: "+(v?dur(v):"0m");
  $("bfL").textContent="Left: \u26AA "+(w-v);
$("bfS").textContent=v?"Every crop, tree, animal and baby animal in your sheds that is still growing jumps ahead by "+dur(v)+". All your \u26AA "+w+" = "+dur(w)+".":"";
  $("dYes").disabled=!v;$("dYes").textContent=v?"\u26A1 Boost "+dur(v):"Boost"}
 function set(v){v=Math.max(1,Math.min(w,v));inp.value=v;upd()}
 function hold(id,d){var el=$(id),t=0,iv=0;
  function step(){set(cur()+d)}
  function stop(){clearTimeout(t);clearInterval(iv)}
  el.onpointerdown=function(e){e.preventDefault();step();t=setTimeout(function(){iv=setInterval(step,70)},350)};
  el.onpointerup=el.onpointerleave=el.onpointercancel=stop}
 hold("bfM",-1);hold("bfP",1);
 [].forEach.call(dlg.querySelectorAll("[data-q]"),function(b){b.onclick=function(){set(b.dataset.q==="max"?w:Number(b.dataset.q))}});
 inp.oninput=upd;inp.onblur=function(){set(cur()||1)};
 upd();
 dlg.style.display="flex";
 $("dNo").onclick=shut;
 $("dYes").onclick=function(){var v=cur();if(v<1)return;shut();busyShow("Boosting crops...");
  flush(function(){call("farmBoost",[TOKEN,v],function(s){setState(s);busyHide();toast("\u26A1 Crops boosted by "+dur(v)+"!")},function(m){busyHide();toast(m)})})};
 dlg.onclick=function(ev){if(ev.target===dlg)shut()}}
