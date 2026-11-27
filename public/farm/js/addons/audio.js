/* =====================================================================
   READING FARM AUDIO  (added after the main game script)
   100% synthesized with the Web Audio API: no audio files, no copyright
   issues, no extra downloads. It hooks the existing functions (toast,
   tapTree, editTap) so no other code needs to change.
   ===================================================================== */
(function(){
"use strict";
var AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
var ctx,master,musicBus,musicIn,sfxBus,ambBus,noiseBuf,MODE=0,last={},A={},vis=false,CTX={};
try{MODE=Number(localStorage.getItem("farmAudioMode"))||0}catch(e){}
if(MODE<0||MODE>3)MODE=0;   // 0 = music + sounds, 1 = sounds only, 2 = muted, 3 = music only
var ORDER=[0,3,1,2];        // button cycle: all -> music only -> sounds only -> muted
function sfxOff(){return MODE===2||MODE===3}
function musicOn(){return MODE===0||MODE===3}

function mf(n){return 440*Math.pow(2,(n-69)/12)}
function R(a,b){return a+Math.random()*(b-a)}
function isNight(){return document.body.classList.contains("night")}

/* ---------------- engine ---------------- */
function impulse(sec,decay){var r=ctx.sampleRate,l=r*sec|0,b=ctx.createBuffer(2,l,r),c,d,i;
 for(c=0;c<2;c++){d=b.getChannelData(c);for(i=0;i<l;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/l,decay)}return b}
function mkNoise(){var l=ctx.sampleRate*2,b=ctx.createBuffer(1,l,ctx.sampleRate),d=b.getChannelData(0),i;for(i=0;i<l;i++)d[i]=Math.random()*2-1;return b}

function init(){
 if(ctx){if(ctx.state==="suspended")ctx.resume();return}
 try{ctx=new AC()}catch(e){ctx=null;return}
 var comp=ctx.createDynamicsCompressor(),cv=ctx.createConvolver(),wet=ctx.createGain(),b,s;
 master=ctx.createGain();master.gain.value=.9;master.connect(comp);comp.connect(ctx.destination);
 musicBus=ctx.createGain();musicBus.connect(master);
 musicIn=ctx.createGain();musicIn.connect(musicBus);
 cv.buffer=impulse(2.2,2.6);wet.gain.value=.4;musicIn.connect(cv);cv.connect(wet);wet.connect(musicBus);
 sfxBus=ctx.createGain();sfxBus.connect(master);
 ambBus=ctx.createGain();ambBus.connect(master);
 noiseBuf=mkNoise();
 b=ctx.createBuffer(1,1,22050);s=ctx.createBufferSource();s.buffer=b;s.connect(ctx.destination);s.start(0); // iOS unlock
 if(ctx.state==="suspended")ctx.resume();
 applyMode();startAmbient();setTheme(isNight());startMusic();
}
function applyMode(){if(!ctx)return;var t=ctx.currentTime;
 musicBus.gain.setTargetAtTime(musicOn()?.38:0,t,.15);
 sfxBus.gain.setTargetAtTime(sfxOff()?0:.9,t,.05);
 ambBus.gain.setTargetAtTime(sfxOff()?0:.5,t,.2)}

function tone(f,t,d,type,v,dest,o){o=o||{};
 var os=ctx.createOscillator(),g=ctx.createGain(),a=o.a||.005;
 os.type=type;os.frequency.setValueAtTime(f,t);
 if(o.to)os.frequency.exponentialRampToValueAtTime(o.to,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 os.connect(g);g.connect(dest||sfxBus);os.start(t);os.stop(t+d+.05)}
function noise(t,d,o){
 var s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
 s.buffer=noiseBuf;s.loop=true;f.type=o.ft||"lowpass";f.Q.value=o.q||1;
 f.frequency.setValueAtTime(o.f0,t);if(o.f1)f.frequency.exponentialRampToValueAtTime(o.f1,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(o.v,t+(o.a||.005));g.gain.exponentialRampToValueAtTime(.0001,t+d);
 s.connect(f);f.connect(g);g.connect(o.dest||sfxBus);s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
function bell(f,t,v,d,dest){d=d||.6;tone(f,t,d,"sine",v,dest);tone(f*2.76,t,d*.5,"sine",v*.35,dest);tone(f*5.4,t,d*.25,"sine",v*.15,dest)}
function voice(t,o,out){ // generic animal voice: pitch curve + formant filter + vibrato + tremolo
 var os=ctx.createOscillator(),f=ctx.createBiquadFilter(),am=ctx.createGain(),g=ctx.createGain(),i,d=o.d,l,lg;
 os.type=o.type||"sawtooth";os.frequency.setValueAtTime(o.f[0][1],t);
 for(i=1;i<o.f.length;i++)os.frequency.linearRampToValueAtTime(o.f[i][1],t+o.f[i][0]);
 f.type=o.ft||"bandpass";f.Q.value=o.q||2;f.frequency.setValueAtTime(o.fq[0][1],t);
 for(i=1;i<o.fq.length;i++)f.frequency.linearRampToValueAtTime(o.fq[i][1],t+o.fq[i][0]);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(o.v,t+Math.min(.04,d*.25));
 g.gain.setValueAtTime(o.v,t+d*.65);g.gain.linearRampToValueAtTime(.0001,t+d);
 am.gain.value=1;
 if(o.vib){l=ctx.createOscillator();lg=ctx.createGain();l.frequency.value=o.vib[0];lg.gain.value=o.vib[1];l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+d+.05)}
 if(o.am){l=ctx.createOscillator();lg=ctx.createGain();am.gain.value=1-o.am[1]/2;l.frequency.value=o.am[0];lg.gain.value=o.am[1]/2;l.connect(lg);lg.connect(am.gain);l.start(t);l.stop(t+d+.05)}
 os.connect(f);f.connect(am);am.connect(g);g.connect(out||sfxBus);os.start(t);os.stop(t+d+.05)}
function dst(pan){if(pan&&ctx.createStereoPanner){var p=ctx.createStereoPanner();p.pan.value=pan;p.connect(sfxBus);return p}return sfxBus}

/* ---------------- sound effects ---------------- */
var SND={
 click:function(t){tone(900,t,.04,"triangle",.10)},
 tick:function(t){tone(520,t,.05,"sine",.14)},
 plant:function(t){noise(t,.14,{ft:"lowpass",f0:500,f1:200,v:.35});tone(150,t,.14,"sine",.35,null,{to:70});
  noise(t+.08,.2,{ft:"highpass",f0:3500,v:.08});tone(620,t+.12,.08,"sine",.1,null,{to:900})},
 harvest:function(t){tone(330,t,.1,"sine",.25,null,{to:660});bell(1318,t+.07,.18,.5);bell(1760,t+.15,.15,.5)},
 big:function(t){SND.harvest(t);bell(2093,t+.25,.15,.7);bell(2637,t+.33,.12,.8)},
 coin:function(t){bell(1568,t,.16,.35);bell(2093,t+.07,.13,.4)},
 harvestAll:function(t){tone(330,t,.1,"sine",.25,null,{to:660});[1046,1318,1568,1760,2093].forEach(function(f,i){bell(f,t+.05+i*.06,.14,.4)})},
 levelup:function(t){[523,659,784,1046].forEach(function(f,i){tone(f,t+i*.11,.35,"triangle",.2);tone(f*2,t+i*.11,.2,"sine",.06)});
  [523,659,784,1046].forEach(function(f){tone(f,t+.5,.9,"triangle",.14)});bell(2093,t+.55,.12,.9)},
 buy:function(t){noise(t,.03,{ft:"highpass",f0:4000,v:.2});bell(1976,t+.02,.2,.45);bell(2637,t+.1,.17,.6)},
 sell:function(t){[1568,1318,1175,988].forEach(function(f,i){bell(f,t+i*.05,.12,.3)});noise(t,.2,{ft:"highpass",f0:5000,v:.06})},
 place:function(t){tone(210,t,.11,"sine",.4,null,{to:100});noise(t,.07,{ft:"lowpass",f0:1000,v:.2})},
 store:function(t){noise(t,.35,{ft:"bandpass",f0:300,f1:1800,q:2,v:.18,a:.1})},
 unstore:function(t){noise(t,.35,{ft:"bandpass",f0:1800,f1:300,q:2,v:.18,a:.1})},
 paint:function(t){noise(t,.14,{ft:"bandpass",f0:1800,f1:900,q:1.5,v:.14,a:.02})},
 splash:function(t){noise(t,.3,{ft:"lowpass",f0:2500,f1:500,v:.25});tone(400,t+.05,.09,"sine",.12,null,{to:900});tone(500,t+.13,.09,"sine",.1,null,{to:1100})},
 error:function(t){tone(260,t,.1,"triangle",.18,null,{to:200});tone(190,t+.1,.16,"triangle",.18,null,{to:140})},
 help:function(t){[1400,1100,900].forEach(function(f,i){tone(f,t+i*.07,.12,"sine",.14,null,{to:f*.5})});bell(2093,t+.22,.1,.4)},
 boost:function(t){tone(300,t,.55,"sine",.12,null,{to:1800});[1046,1318,1568,2093].forEach(function(f,i){bell(f,t+.3+i*.07,.12,.4)})},
 expand:function(t){var i;for(i=0;i<3;i++){tone(180,t+i*.16,.1,"square",.12,null,{to:90});noise(t+i*.16,.06,{ft:"lowpass",f0:1400,v:.18})}SND.levelup(t+.5)},
 door:function(t){bell(880,t,.2,.8);bell(660,t+.28,.2,1)},
 doorOut:function(t){bell(660,t,.18,.7);bell(880,t+.25,.18,.7)},
 shop:function(t){bell(2349,t,.14,.6);bell(3136,t+.05,.1,.5)},
 save:function(t){tone(784,t,.2,"triangle",.1);tone(1175,t+.1,.3,"triangle",.1)},
 rotate:function(t){tone(700,t,.04,"square",.06);noise(t,.05,{ft:"bandpass",f0:2200,q:3,v:.1})},
 ripe:function(t){bell(1568,t,.07,.8);bell(2093,t+.15,.05,.9)},
 neighbor:function(t){bell(988,t,.16,.6);bell(1318,t+.12,.16,.7)},
 nope:function(t){tone(200,t,.08,"triangle",.1,null,{to:160})}
};
function play(name){
 if(!ctx||sfxOff())return;var f=SND[name],n;if(!f)return;
 n=performance.now();if(last[name]&&n-last[name]<45)return;last[name]=n;
 try{f(ctx.currentTime+.01)}catch(e){}
}

/* ---------------- animal voices ---------------- */
function moo(k){return function(t,m,o){voice(t,{f:[[0,140*k],[.25,175*k],[.8,125*k],[1.15,95*k]],fq:[[0,350],[.35,700],[.9,420],[1.15,300]],q:2.5,v:.8*m,d:1.2,vib:[5,5*k]},o)}}
function baa(k){return function(t,m,o){voice(t,{f:[[0,320*k],[.2,300*k],[.55,260*k]],fq:[[0,900],[.55,1200]],q:4,v:.7*m,d:.6,vib:[28,18],am:[24,.5]},o)}}
function quack(k){return function(t,m,o){[0,.2].forEach(function(dt){voice(t+dt,{f:[[0,420*k],[.12,300*k]],fq:[[0,1200],[.12,900]],q:5,v:.7*m,d:.15},o)})}}
var AN={
 a_cow:moo(1),a_carabao:moo(.75),a_hcow:moo(.85),a_yak:moo(.65),
 a_sheep:baa(1),a_goat:baa(1.2),
 a_duck:quack(1),a_swan:function(t,m,o){voice(t,{f:[[0,280],[.4,230]],fq:[[0,700],[.4,600]],q:3,v:.5*m,d:.4,am:[26,.4]},o)},
 a_goose:function(t,m,o){[0,.45].forEach(function(dt){voice(t+dt,{f:[[0,330],[.3,260]],fq:[[0,800],[.3,700]],q:4,v:.7*m,d:.35,am:[30,.4]},o)})},
 a_chicken:function(t,m,o){[0,.13,.27].forEach(function(dt){voice(t+dt,{type:"square",f:[[0,700],[.07,420]],fq:[[0,1400],[.07,1000]],q:3,v:.3*m,d:.08},o)});
  voice(t+.45,{f:[[0,520],[.3,400]],fq:[[0,1300],[.3,900]],q:3,v:.5*m,d:.3,vib:[20,25]},o)},
 a_rooster:function(t,m,o){voice(t,{f:[[0,420],[.12,780],[.45,760],[.9,520]],fq:[[0,1500],[.9,1000]],q:3,v:.7*m,d:.95,vib:[18,14]},o)},
 a_turkey:function(t,m,o){voice(t,{f:[[0,380],[.6,300]],fq:[[0,1000],[.6,800]],q:3,v:.7*m,d:.6,am:[26,.7]},o)},
 a_peacock:function(t,m,o){voice(t,{f:[[0,500],[.2,950],[.8,600]],fq:[[0,1300],[.2,2200],[.8,1500]],q:3,v:.7*m,d:.8,vib:[10,30]},o)},
 a_pig:function(t,m,o){[0,.4].forEach(function(dt){voice(t+dt,{ft:"lowpass",f:[[0,220],[.1,260],[.3,130]],fq:[[0,900],[.3,500]],q:1,v:.7*m,d:.32,am:[40,.5]},o)})},
 a_pony:function(t,m,o){voice(t,{f:[[0,550],[.15,1200],[.5,1000],[.9,450]],fq:[[0,1200],[.5,2000],[.9,900]],q:2,v:.6*m,d:.9,vib:[9,25],am:[22,.3]},o)},
 a_horse:function(t,m,o){voice(t,{f:[[0,500],[.15,1100],[.5,950],[1,400]],fq:[[0,1200],[.5,2000],[1,900]],q:2,v:.65*m,d:1,vib:[9,25],am:[22,.3]},o)},
 a_donkey:function(t,m,o){voice(t,{f:[[0,480],[.12,900],[.45,850]],fq:[[0,1000],[.45,1400]],q:3,v:.65*m,d:.45,vib:[8,20]},o);
  voice(t+.5,{f:[[0,420],[.2,230]],fq:[[0,900],[.2,500]],q:2,v:.65*m,d:.5,am:[20,.4]},o)},
 a_llama:function(t,m,o){voice(t,{ft:"lowpass",f:[[0,230],[.5,260]],fq:[[0,500],[.5,500]],q:1,v:.6*m,d:.6,vib:[6,5]},o)},
 a_alpaca:function(t,m,o){voice(t,{ft:"lowpass",f:[[0,260],[.5,300]],fq:[[0,550],[.5,550]],q:1,v:.55*m,d:.55,vib:[6,5]},o)},
 a_ostrich:function(t,m,o){voice(t,{type:"sine",ft:"lowpass",f:[[0,90],[.5,70]],fq:[[0,300],[.5,300]],q:1,v:.9*m,d:.5,am:[8,.5]},o)},
 a_rabbit:function(t,m,o){[0,.1].forEach(function(dt){tone(2000,t+dt,.06,"sine",.12*m,o,{to:2600})})},
 a_quail:function(t,m,o){tone(1300,t,.18,"sine",.14*m,o,{to:1500});tone(1500,t+.22,.25,"sine",.14*m,o,{to:1750})}
};
function animal(id,vol,pan){
 if(!ctx||sfxOff())return;var f=AN[id]||AN.a_cow;
 try{f(ctx.currentTime+.02,vol||1,dst(pan))}catch(e){}
}

/* ---------------- ambience: sea, wind, birds (day), crickets (night), far-away animals ---------------- */
function startAmbient(){
 var s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),g=ctx.createGain(),l=ctx.createOscillator(),lg=ctx.createGain(),
  w=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),wg=ctx.createGain(),wl=ctx.createOscillator(),wlg=ctx.createGain(),
  o=ctx.createOscillator(),am=ctx.createGain(),lf=ctx.createOscillator(),lgn=ctx.createGain();
 // sea waves: low noise whose volume swells slowly
 s.buffer=noiseBuf;s.loop=true;lp.type="lowpass";lp.frequency.value=650;g.gain.value=.3;
 l.frequency.value=.11;lg.gain.value=.2;l.connect(lg);lg.connect(g.gain);s.connect(lp);lp.connect(g);g.connect(ambBus);s.start();l.start();
 // wind in the grass
 w.buffer=noiseBuf;w.loop=true;bp.type="bandpass";bp.frequency.value=420;bp.Q.value=.6;wg.gain.value=.06;
 wl.frequency.value=.05;wlg.gain.value=.05;wl.connect(wlg);wlg.connect(wg.gain);w.connect(bp);bp.connect(wg);wg.connect(ambBus);w.start(0,.7);wl.start();
 // crickets
 o.type="sine";o.frequency.value=4300;am.gain.value=.5;lf.type="sine";lf.frequency.value=13;lgn.gain.value=.5;lf.connect(lgn);lgn.connect(am.gain);
 A.cri=ctx.createGain();A.cri.gain.value=0;o.connect(am);am.connect(A.cri);A.cri.connect(ambBus);o.start();lf.start();
 (function birdLoop(){setTimeout(function(){birdCall();birdLoop()},R(3000,10000))})();
 (function farLoop(){setTimeout(function(){farAnimal();farLoop()},R(9000,22000))})();
}
function birdCall(){
 if(!ctx||sfxOff()||document.hidden||isNight())return;
 var t=ctx.currentTime+.01,n=2+(Math.random()*4|0),b=R(2400,4200),i;
 for(i=0;i<n;i++)tone(b+R(0,300),t+i*.11,.09,"sine",.07,ambBus,{to:b*R(1.3,1.7),a:.012})}
function farAnimal(){
 if(!ctx||sfxOff()||document.hidden||typeof S==="undefined"||!S||!S.dc||typeof FTD==="undefined")return;
 var L=S.dc.filter(function(x){return !x.s&&FTD[x.k]&&FTD[x.k].animal});
 if(!L.length)return;
 animal(L[Math.random()*L.length|0].k,.35,R(-.7,.7))}

/* ---------------- background music (generated, folk-guitar / kalimba style) ---------------- */
var TH={
 day:{bpm:92,mel:.62,perc:1,pad:.03,prog:[
  [[0,0],[9,1],[5,0],[7,0]],[[0,0],[7,0],[9,1],[5,0]],[[5,0],[0,0],[7,0],[0,0]],[[9,1],[5,0],[0,0],[7,0]]]},
 night:{bpm:64,mel:.35,perc:0,pad:.05,prog:[
  [[9,1],[5,0],[0,0],[7,0]],[[9,1],[7,0],[5,0],[0,0]]]}
};
var M={on:false,night:false,next:0,bar:0,prog:null,mi:3,timer:0},PENT=[0,2,4,7,9];
function pentNote(i){var o=Math.floor(i/5),k=((i%5)+5)%5;return 72+o*12+PENT[k]}
function pluck(f,t,d,v){tone(f,t,d,"triangle",v,musicIn);tone(f*2,t,d*.45,"sine",v*.3,musicIn)}
function kalimba(f,t,d,v){tone(f,t,d*1.6,"sine",v,musicIn,{a:.003});tone(f*3,t,d*.4,"sine",v*.22,musicIn,{a:.003})}
function pad(f,t,d,v){var i,os,g,fl;fl=ctx.createBiquadFilter();fl.type="lowpass";fl.frequency.value=650;g=ctx.createGain();
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.7);g.gain.setValueAtTime(v,t+d-.7);g.gain.linearRampToValueAtTime(.0001,t+d);
 fl.connect(g);g.connect(musicIn);
 [-6,6].forEach(function(c){os=ctx.createOscillator();os.type="sawtooth";os.frequency.value=f;os.detune.value=c;os.connect(fl);os.start(t);os.stop(t+d+.05)})}
function startMusic(){if(M.on)return;M.on=true;M.next=ctx.currentTime+.3;M.timer=setInterval(sched,300)}
function sched(){
 if(!ctx||!musicOn()||ctx.state!=="running"||document.hidden)return;
 if(M.next<ctx.currentTime)M.next=ctx.currentTime+.1;
 while(M.next<ctx.currentTime+1.4)playBar(M.next)}
function playBar(t){
 var T=M.night?TH.night:TH.day,beat=60/T.bpm,step=beat/2,bi=M.bar%4,ch,root,iv,i,tt,k,AR=[0,1,2,3,2,1,2,1];
 if(bi===0||!M.prog)M.prog=T.prog[Math.random()*T.prog.length|0];
 ch=M.prog[bi];root=ch[0];iv=ch[1]?[0,3,7]:[0,4,7];
 tone(mf(36+root),t,beat*1.9,"sine",.30,musicIn,{a:.01});
 if(!M.night)tone(mf(36+root+7),t+2*beat,beat*1.4,"sine",.18,musicIn,{a:.01});
 for(k=0;k<3;k++)pad(mf(48+root+iv[k]),t,beat*4,T.pad);
 for(i=0;i<8;i++){
  tt=t+i*step+(i%2?step*.06:0);
  k=AR[i];pluck(mf(60+root+(k<3?iv[k]:12)),tt,beat*.9,M.night?.08:.10);
  if(M.bar%8!==7&&Math.random()<(i%2?T.mel*.5:T.mel)){
   M.mi+=[-2,-1,-1,0,1,1,2][Math.random()*7|0];M.mi=Math.max(-2,Math.min(9,M.mi));
   kalimba(pentNote(M.mi),tt,beat,M.night?.14:.17)}
  if(T.perc){
   if(i%2)noise(tt,.05,{ft:"highpass",f0:6000,v:.03,dest:musicIn});
   if(i===0||i===4)tone(110,tt,.16,"sine",.12,musicIn,{to:55})}
 }
 M.bar++;M.next=t+4*beat}
function setTheme(n){M.night=!!n;M.prog=null;if(ctx&&A.cri)A.cri.gain.setTargetAtTime(n?.05:0,ctx.currentTime,1.5)}

/* ---------------- hooks into the existing game (nothing else to edit) ---------------- */
var ERR=/cannot|can't|not enough|costs \d|unlocks at|You need|already|used all|Could not|problem|No free|no free|Nothing is ripe|Nothing to|No empty|too many|Maximum|only the owner|enough help|Harvest this plot first|Planted plots|skipped/i;
function classify(m){
 if(ERR.test(m))return play("error");
 if(/Level \d+!/.test(m))return setTimeout(function(){play("levelup")},250);
 if(/boosted/i.test(m))return play("boost");
 if(/expanded|New land bought/i.test(m))return play("expand");
 if(CTX.animal&&/collected|harvested/i.test(m))return play("coin");
 if(/BIG harvest/.test(m))return play("big");
 if(/Collected \d/.test(m))return play("harvestAll");
 if(/harvested|Harvested/.test(m)||/collected! \+/.test(m))return play("harvest");
 if(/Planted|Free seed/.test(m))return play("plant");
 if(/Plot bought|fence changed/.test(m))return play("place");
 if(/added to barn/.test(m))return play("buy");
 if(/Fertilized/.test(m))return play("help");
 if(/Progress saved/.test(m))return play("save");
 if(/Restored/.test(m))return play("unstore");
 if(/Stored/.test(m))return play("store");
 if(/Added .* as a neighbor/.test(m))return play("neighbor");
 if(/Tap tiles to paint/.test(m))return play("click");
 if(m.indexOf("\uD83D\uDD8C")===0)return play(/Water/.test(m)?"splash":"paint");
 if(/Grass restored/.test(m))return play("paint");
 if(!CTX.animal&&/ready in|next .* in /.test(m))return play("tick");
}
var _toast=window.toast;
window.toast=function(m){try{classify(String(m))}catch(e){}return _toast.apply(this,arguments)};

var _tapTree=window.tapTree;
window.tapTree=function(it){
 var f=FTD&&FTD[it.k],ripe=f&&(nowT()-it.t>=f.ms);
 CTX.animal=!!(f&&f.animal);
 if(CTX.animal)animal(it.k,ripe?1:.7);
 try{return _tapTree.apply(this,arguments)}finally{CTX.animal=false}};

function sig(){var a="";if(!S)return a;
 S.pp.forEach(function(q){a+=q?q[0]+","+q[1]+";":"x;"});
 (S.dc||[]).forEach(function(o){a+=o.c+","+o.r+","+o.s+","+(o.rot||0)+";"});
 if(PEND)a+="P"+PEND.c+","+PEND.r+","+(PEND.rot||0);
 return a+S.np}
var _editTap=window.editTap;
window.editTap=function(){
 var b=sig(),selB=SEL,held=!!(SEL||PLACING||PBUY||PEND),r;
 r=_editTap.apply(this,arguments);
 if(sig()!==b)play("place");else if(SEL!==selB)play("tick");else if(held)play("nope");
 return r};

document.addEventListener("click",function(e){
 var b=e.target.closest&&e.target.closest("button"),id,c0,d;if(!b)return;
 init();id=b.id;
 if(id==="audBtn")return;
 if(id==="mkBtn")return play("shop");
 if(id==="edRot")return play("rotate");
 if(id==="edStore"){if(SEL)play("store");return}
 if(id==="barnUndo"||id==="edUndo")return play("unstore");
 if(id==="edSell"){c0=S.coins;setTimeout(function(){if(S.coins>c0)play("sell")},30);return}
 if(id==="buyYes"){if(PEND){d=(S.items||[]).filter(function(x){return x.id===PEND.k})[0];if(d&&S.coins>=d.cost)play("buy")}return}
 if(id==="nightBtn")setTimeout(function(){setTheme(isNight())},0);
 if(id==="saveBtn"||id==="hAll"||id==="plAll")return;
 play("click")},true);

["pointerdown","touchend","keydown"].forEach(function(ev){document.addEventListener(ev,function(){if(!ctx||ctx.state==="suspended")init()},true)});
document.addEventListener("visibilitychange",function(){if(!ctx)return;if(document.hidden)ctx.suspend();else ctx.resume()});

var vEl=document.getElementById("visit");
if(vEl)new MutationObserver(function(){var v=vEl.style.display;
 if(v==="flex"&&!vis){vis=true;play("door")}else if(v==="none"&&vis){vis=false;play("doorOut")}}).observe(vEl,{attributes:true,attributeFilter:["style"]});

// soft chime when a crop becomes ripe while you play
var ripeN=-1,lastRipe=0;
setInterval(function(){
 if(!ctx||sfxOff()||document.hidden||typeof S==="undefined"||!S||!S.plots)return;
 var n=0,i;for(i=0;i<S.plots.length;i++)if(S.plots[i]&&isRipe(S.plots[i]))n++;
 if(ripeN>=0&&n>ripeN&&Date.now()-lastRipe>20000){lastRipe=Date.now();play("ripe")}
 ripeN=n},2500);

// sound button in the top bar: music+sounds -> music only -> sounds only -> muted
var hr=document.querySelector("#hud .hr"),nb=document.getElementById("nightBtn"),ab=document.createElement("button");
ab.id="audBtn";ab.className="btn alt";ab.title="Sound";
function paintBtn(){ab.textContent=["\uD83D\uDD0A","\uD83D\uDD14","\uD83D\uDD07","\uD83C\uDFB5"][MODE]}
ab.onclick=function(){
 MODE=ORDER[(ORDER.indexOf(MODE)+1)%ORDER.length];try{localStorage.setItem("farmAudioMode",String(MODE))}catch(e){}
 init();applyMode();paintBtn();
 _toast(["Music + sounds ON","Sounds only (music off)","Muted","Music only (sounds off)"][MODE]);
 if(!sfxOff())play("tick")};
paintBtn();
// place the sound button right before the save button (order: sound, save)
var sb=document.getElementById("saveBtn"),bar=document.getElementById("idBar");
if(sb&&bar){ab.style.cssText="margin-left:auto;padding:3px 10px;font-size:13px";sb.style.marginLeft="6px";bar.insertBefore(ab,sb)}
else if(hr)hr.insertBefore(ab,nb||null);
window.FarmAudio={play:play,animal:animal,mode:function(){return MODE}};
})();
