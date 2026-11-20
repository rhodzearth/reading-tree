TOKEN=window.FARM_TOKEN||"";
function call(n,a,ok,bad){FARM_CALL(n,a).then(function(s){if(s&&s.me&&!s.crops&&S){s.crops=S.crops;s.items=S.items;s.fls=S.fls;s.pfs=S.pfs;if(!s.fl)s.fl=S.fl;if(!s.fr)s.fr=S.fr;if(!s.ft)s.ft=S.ft;if(!s.lo)s.lo=S.lo}try{ok(s)}catch(e){busy=false;toast("Page problem: "+(e&&e.message?e.message:e))}},function(e){var m=e&&e.message?e.message:String(e);if(/log in/i.test(m)){showMsg("Please log in to the Reading Tree first, then open Reading Farm again.")}else if(bad)bad(m);else toast(m)})}
function toast(m){var t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(function(){t.style.display="none"},3000)}
function showMsg(m){$("msg").style.display="";$("msg").textContent=m;$("main").style.display="none"}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
function cr(id){if(S.crops!==CRA){CRA=S.crops;CRM={};S.crops.forEach(function(c){CRM[c.id]=c})}return CRM[id]||null}
function goBack(p){var ref=document.referrer||"",base=ref.split("#")[0].split("?")[0],
 ok=!p&&ref.indexOf(location.origin)===0&&/(index\.html|\/)$/.test(base)&&history.length>1;
 if(ok){var n=HARM?2:1;HARM=false;HSKIP=true;history.go(-n);setTimeout(function(){window.location.href="index.html"},1800)}
 else window.location.href="index.html"+(p||"")}
function openTree(){$("goTitle").textContent="Opening Reading Tree...";$("goLoading").style.display="flex";setTimeout(function(){goBack("")},120)}
window.addEventListener("pageshow",function(){$("goLoading").style.display="none"});
var BT=0;
function busyShow(t){BT=Date.now();$("goTitle").textContent=t;$("goLoading").style.display="flex"}
function busyHide(){setTimeout(function(){$("goLoading").style.display="none"},Math.max(0,550-(Date.now()-BT)))}
function paintNight(){$("nightBtn").textContent=document.body.classList.contains("night")?"\u2600\uFE0F":"\uD83C\uDF19"}
$("nightBtn").onclick=function(){var on=!document.body.classList.contains("night");document.body.classList.toggle("night",on);try{localStorage.setItem("treeNight",on?"1":"0")}catch(e){}paintNight();fitAll();drawAll()};
paintNight();
function paintMiniBtn(){$("miniBtn").style.opacity=SHOWMINI?"1":".45"}
$("miniBtn").onclick=function(){SHOWMINI=!SHOWMINI;try{localStorage.setItem("miniHide",SHOWMINI?"0":"1")}catch(e){}paintMiniBtn();drawAll()};paintMiniBtn();
function flush(cb){kick();var n=0;(function w(){if((Q.length||busy)&&n++<80){setTimeout(w,150);return}cb()})()} // send everything you did to the server first
$("goRead").onclick=function(){flush(openTree)};
$("camBtn").onclick=function(){CAM=true;document.body.classList.add("cam");dock(false);side(false);drawAll()};
$("camOff").onclick=function(e){e.stopPropagation();CAM=false;document.body.classList.remove("cam");drawAll()};
$("wfBtn").onclick=function(){boostDlg()};
