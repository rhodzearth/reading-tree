// ===== NEIGHBOR CHAT =====
var CHAT=null;
function chatOpen(n){var dlg=$("dlg");CHAT={t:0,last:"",busy:0,id:n.id};UNR[n.id]=0;chatBadges();
 $("dlgBody").innerHTML="<div class='dtitle'>&#128172; Chat with "+esc(n.username)+"</div><div id='chLog' style='height:38vh;overflow-y:auto;text-align:left;margin:8px 0;padding:6px;background:rgba(0,0,0,.06);border-radius:10px'><div class='small'>Loading...</div></div><div style='display:flex;gap:6px'><input id='chIn' maxlength='300' placeholder='Type a message' autocomplete='off' style='flex:1;min-width:0'><button class='btn' id='chSend'>Send</button></div><div class='dbtns'><button class='btn alt' id='dNo'>Close</button></div>";
 dlg.style.display="flex";
  $("dlgBody").style.position="relative";bz._t=Date.now();
 $("dlgBody").insertAdjacentHTML("beforeend","<div id='chBusy' style='position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;border-radius:22px;background:rgba(128,128,128,.35);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)'><div style='text-align:center;padding:20px 26px;border-radius:16px;background:var(--card);box-shadow:0 6px 24px rgba(0,0,0,.25)'><div class='goSpin'></div><div id='chBusyT' style='font-weight:700;color:var(--dk)'>Loading chat...</div><div class='small'>Please wait a moment.</div></div></div>");
 function stop(){if(CHAT){clearInterval(CHAT.t);CHAT=null}}
 function shut(){dlg.style.display="none";stop()}
  function bz(t){var b=$("chBusy");if(!b)return;if(t){bz._t=Date.now();$("chBusyT").textContent=t;b.style.display="flex";return}
  setTimeout(function(){var x=$("chBusy");if(x&&!(CHAT&&CHAT.snd))x.style.display="none"},Math.max(0,450-(Date.now()-(bz._t||0))))}
 function draw(o){var box=$("chLog");if(!box||!CHAT)return;var sig=o.msgs.length+"|"+(o.msgs.length?o.msgs[o.msgs.length-1].at:0);if(CHAT.last===sig)return;CHAT.last=sig;
  box.innerHTML=o.msgs.length?o.msgs.map(function(m){return "<div style='display:flex;justify-content:"+(m.me?"flex-end":"flex-start")+";margin:3px 0'><span style='max-width:80%;padding:6px 10px;border-radius:12px;word-break:break-word;background:"+(m.me?"#4caf50;color:#fff":"#e0e0e0;color:#222")+"'>"+esc(m.msg)+"</span></div>"}).join(""):"<div class='small'>No messages yet. Say hi!</div>";
  box.scrollTop=box.scrollHeight}
 function load(){if(!CHAT||!$("chLog")){stop();return}if(CHAT.busy)return;CHAT.busy=1;
  FARM_CALL("farmChatGet",[TOKEN,n.id]).then(function(s){if(CHAT)CHAT.busy=0;if(s&&s.out)draw(s.out);bz()},function(){if(CHAT)CHAT.busy=0;bz()})}
 function send(){var inp=$("chIn"),m=inp.value.trim();if(!m||!CHAT||CHAT.snd)return;inp.value="";CHAT.snd=1;bz("Sending...");
  FARM_CALL("farmChatSend",[TOKEN,n.id,m]).then(function(s){if(CHAT)CHAT.snd=0;if(s&&s.out)draw(s.out);bz()},function(e){if(CHAT)CHAT.snd=0;bz();inp.value=m;toast(e.message||String(e))})}
 $("dNo").onclick=shut;dlg.onclick=function(ev){if(ev.target===dlg)shut()};
 $("chSend").onclick=send;$("chIn").onkeydown=function(e){if(e.key==="Enter")send()};
 load();CHAT.t=setInterval(load,6000)}
 // ===== UNREAD CHAT BADGES + NOTIFICATION =====
var UNR={};
function chatBadge(k){return k?"<b style='background:#e53935;color:#fff;border-radius:9px;padding:0 6px;margin-left:4px;font-size:11px'>"+k+"</b>":""}
function chatBadges(){var tot=0,k;for(k in UNR)tot+=UNR[k];
 [].forEach.call(document.querySelectorAll("[data-cn]"),function(b){b.innerHTML="&#128172;"+chatBadge(UNR[b.dataset.cn])});
 $("nbBtn").innerHTML="&#128101;"+chatBadge(tot)}
function chatPoll(){if(document.hidden)return;
 FARM_CALL("farmChatUnread",[TOKEN]).then(function(s){var o=s&&s.out;if(!o)return;var fresh=[],k;
  for(k in o.n){if((o.n[k]||0)>(UNR[k]||0)&&!(CHAT&&CHAT.id===k))fresh.push(k)}
  UNR=o.n||{};chatBadges();
  if(fresh.length){var m=((S&&S.nb)||[]).filter(function(x){return x.id===fresh[0]})[0];toast("\uD83D\uDCAC New message from "+(m?m.username:"a neighbor"))}
 },function(){})}
setInterval(chatPoll,30000);setTimeout(chatPoll,4000);
