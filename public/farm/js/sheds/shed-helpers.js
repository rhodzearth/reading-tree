function shedList(k){return(S.dc||[]).filter(function(x){return(k?x.k===k:(x.k==="cowshed"||x.k==="chickenshed"||x.k==="sheepshed"||x.k==="pigshed"))&&!x.s})}
function inShed(x){var L=shedList(),i;if(!x.s)return false;for(i=0;i<L.length;i++)if(L[i].cw&&L[i].cw.indexOf(x.id)>=0)return true;return false}
function shedCows(sd){var o=[];(sd.cw||[]).forEach(function(id){var c=dcById(id);if(c&&c.s&&o.length<5)o.push(c)});return o}
function shedWithRoom(k){var L=shedList(k||"cowshed"),i;for(i=0;i<L.length;i++)if(shedCows(L[i]).length<5)return L[i];return null}
function buyCowShed(i){var sd=shedWithRoom(),id2,tl,o2;if(!sd)return false;
 tl=freeTile(i.id)||[0,0];id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
 o2={id:id2,k:i.id,c:tl[0],r:tl[1],s:1,t:nowT()};S.coins-=i.cost;S.dc.push(o2);sd.cw=(sd.cw||[]).concat([id2]);
 send("farmBuyAt",[TOKEN,id2,i.id,tl[0],tl[1]]);send("farmDecor",[TOKEN,id2,0,0,1]);send("farmCowIn",[TOKEN,id2,sd.id]);
 paint();toast("\uD83D\uDC04 New cow moved into your cow shed ("+sd.cw.length+"/5)");return true}
 function buyChickShed(i){var sd=shedWithRoom("chickenshed"),id2,tl,o2;if(!sd)return false;
 tl=freeTile(i.id)||[0,0];id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
 o2={id:id2,k:i.id,c:tl[0],r:tl[1],s:1,t:nowT()};S.coins-=i.cost;S.dc.push(o2);sd.cw=(sd.cw||[]).concat([id2]);
 send("farmBuyAt",[TOKEN,id2,i.id,tl[0],tl[1]]);send("farmDecor",[TOKEN,id2,0,0,1]);send("farmCowIn",[TOKEN,id2,sd.id]);
 paint();toast("\uD83D\uDC14 New chicken moved into your chicken shed ("+sd.cw.length+"/5)");return true}
function endWall(g,W,H,by,ew,k){if(!ew)return;var o={cow:{c0:"#1b1008",c1:"#4d321a",lc:"rgba(0,0,0,.5)",lw:2,hl:"rgba(255,220,150,.1)",nl:8,cc:"#1a0f06",bs:"rgba(0,0,0,.4)",bw:110,fs:.35},sheep:{c0:"#2a2014",c1:"#8f805f",lc:"rgba(30,16,4,.55)",lw:4,nl:6,cc:"#1a0f06",bs:"rgba(0,0,0,.35)",bw:110,fs:.35},hen:{c0:"#3a2412",c1:"#9a7442",lc:"rgba(30,15,0,.45)",lw:2,nl:8,cc:"#2a1a0c",bs:"rgba(30,15,0,.32)",bw:120,fs:0}}[k],ix=70,iy=36,s=ew<0?0:W,d=ew<0?1:-1,n,t,q;
 q=g.createLinearGradient(s+d*ix,0,s+d*(ix+o.bw),0);q.addColorStop(0,o.bs);q.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=q;g.fillRect(Math.min(s+d*ix,s+d*(ix+o.bw)),iy,o.bw,by-iy);
 if(o.fs){q=g.createLinearGradient(s,0,s+d*110,0);q.addColorStop(0,"rgba(0,0,0,"+o.fs+")");q.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=q;g.fillRect(Math.min(s,s+d*110),by,110,H-by)}
 g.beginPath();g.moveTo(s,0);g.lineTo(s+d*ix,iy);g.lineTo(s+d*ix,by);g.lineTo(s,by+46);g.closePath();q=g.createLinearGradient(s,0,s+d*ix,0);q.addColorStop(0,o.c0);q.addColorStop(1,o.c1);g.fillStyle=q;g.fill();
 for(n=1;n<o.nl;n++){t=n/o.nl;g.strokeStyle=o.lc;g.lineWidth=o.lw;g.beginPath();g.moveTo(s,(by+46)*t);g.lineTo(s+d*ix,iy+(by-iy)*t);g.stroke();if(o.hl){g.strokeStyle=o.hl;g.lineWidth=1.2;g.beginPath();g.moveTo(s,(by+46)*t+2);g.lineTo(s+d*ix,iy+(by-iy)*t+2);g.stroke()}}
 g.strokeStyle=o.cc;g.lineWidth=5;g.beginPath();g.moveTo(s,by+46);g.lineTo(s+d*ix,by);g.stroke()}
