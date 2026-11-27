// ===== PHONE BACK BUTTON: closes the open dialog/panel instead of leaving the page =====
var HARM=false,HSKIP=false;
function topOpen(){
 if($("dlg").style.display==="flex")return function(){$("dlg").style.display="none"};
 if(PEND)return function(){$("buyNo").onclick()};
 if($("barnP").style.display!=="none")return function(){$("barnP").style.display="none"};
 if($("mkt").style.display!=="none")return function(){$("mkt").style.display="none"};
 if($("side").classList.contains("open"))return function(){side(false)};
 if($("dock").classList.contains("open"))return function(){dock(false)};
 if($("lay").style.display!=="none")return function(){if($("lStoreP").style.display!=="none")$("lStoreP").style.display="none";else layExit()};
 if($("visit").style.display!=="none")return function(){$("vClose").onclick()};
 if(EDIT)return function(){setEdit(false)};
 return null}
function histPoll(){var c=topOpen();
 if(c&&!HARM){try{history.pushState({rf:1},"");HARM=true}catch(e){}}
 else if(!c&&HARM){HARM=false;HSKIP=true;try{history.back()}catch(e){HSKIP=false}}}
window.addEventListener("popstate",function(){
 if(HSKIP){HSKIP=false;return}
 HARM=false;var c=topOpen();if(c)c()});
setInterval(histPoll,150);
function stabPaint(){$("stC").className="btn stab"+(STAB==="c"?"":" alt");$("stF").className="btn stab"+(STAB==="f"?"":" alt")}
$("stC").onclick=function(){STAB="c";stabPaint();paint()};
$("stF").onclick=function(){STAB="f";stabPaint();paint()};


