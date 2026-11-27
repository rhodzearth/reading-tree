function shedDlg(shId){var sd=dcById(shId),dlg=$("dlg"),body=$("dlgBody"),W=640,H=Math.min(1300,Math.round(640*Math.max(300,innerHeight-252)/Math.min(innerWidth-32,560))),FY0=H*.4,FY1=H*.95,Z=1.5,cv,cx,bg,cows=[],raf=0,last=0,alive=true,fx=[],shPt=[],sig="",lastSig=0,seed=7;
 if(!sd)return;
   var rm=0,pos=0,swp=0,bgL,bgR,kids={};
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
function close(){alive=false;cancelAnimationFrame(raf);dlg.style.display="none";body.style.cssText="";dlg.onclick=null}
 function ripe(c){var f=FTD[c.k];return !!f&&nowT()-(c.t||0)>=f.ms}
 function barnCows(){return stored().filter(function(s){var o=s.t==="d"&&dcById(s.id);return o&&o.k==="a_cow"})}
 function mkBg(ew){var b=document.createElement("canvas"),g=b.getContext("2d"),i,x,y,gr;b.width=W;b.height=H;
  gr=g.createLinearGradient(0,0,0,FY0);gr.addColorStop(0,"#5e4026");gr.addColorStop(1,"#86602f");g.fillStyle=gr;g.fillRect(0,0,W,FY0);
  g.strokeStyle="rgba(30,15,5,.4)";g.lineWidth=2;for(x=0;x<W;x+=44){g.beginPath();g.moveTo(x,0);g.lineTo(x,FY0);g.stroke()}
  g.strokeStyle="rgba(255,220,150,.07)";for(x=22;x<W;x+=44){g.beginPath();g.moveTo(x,0);g.lineTo(x,FY0);g.stroke()}
  g.fillStyle="#3f2814";g.fillRect(0,0,W,18);g.fillRect(0,FY0-12,W,12);
  [0,W/3,2*W/3,W-14].forEach(function(px){g.fillStyle="#3a2411";g.fillRect(px,0,14,FY0)});
  g.fillStyle="rgba(255,236,170,.14)";g.beginPath();g.moveTo(120,18);g.lineTo(220,18);g.lineTo(330,FY0+40);g.lineTo(170,FY0+40);g.closePath();g.fill();
  g.fillStyle="#d9c9a0";g.fillRect(120,34,100,70);g.fillStyle="#bfe0f2";g.fillRect(126,40,41,58);g.fillRect(173,40,41,58);
  g.fillStyle="#8fbf5a";g.fillRect(126,78,41,20);g.fillRect(173,78,41,20);
  gr=g.createLinearGradient(0,FY0,0,H);gr.addColorStop(0,"#b99350");gr.addColorStop(1,"#d3ae66");g.fillStyle=gr;g.fillRect(0,FY0-4,W,H-FY0+4);
  g.strokeStyle="rgba(120,80,20,.5)";g.lineWidth=1.3;for(i=0;i<260;i++){x=rnd()*W;y=FY0+rnd()*(H-FY0);g.beginPath();g.moveTo(x,y);g.lineTo(x+6+rnd()*8,y+(rnd()-.5)*3);g.stroke()}
  g.strokeStyle="rgba(250,225,140,.55)";for(i=0;i<160;i++){x=rnd()*W;y=FY0+rnd()*(H-FY0);g.beginPath();g.moveTo(x,y);g.lineTo(x+5+rnd()*8,y+(rnd()-.5)*3);g.stroke()}
  g.fillStyle="#6a4422";g.fillRect(470,FY0+6,150,22);g.fillStyle="#4a2e14";g.fillRect(470,FY0+24,150,6);g.fillStyle="#5aa6d4";g.fillRect(476,FY0+10,138,8);
  g.fillStyle="#e0b84a";g.fillRect(14,FY0+10,70,36);g.fillStyle="#f0d36a";g.fillRect(14,FY0+10,70,10);g.strokeStyle="#9a7a20";g.lineWidth=1.4;g.strokeRect(14,FY0+10,70,36);
  g.beginPath();g.moveTo(14,FY0+28);g.lineTo(84,FY0+28);g.stroke();
  g.strokeStyle="#2a1a0c";g.lineWidth=2;g.beginPath();g.moveTo(W*.5,18);g.lineTo(W*.5,48);g.stroke();g.fillStyle="#f2b84a";g.beginPath();g.arc(W*.5,56,9,0,7);g.fill();g.fillStyle="rgba(255,200,80,.18)";g.beginPath();g.arc(W*.5,56,26,0,7);g.fill();
    (function(){var ix=0,iy=36,by=FY0-4,gg,n,t,hs=function(k){var v=Math.sin(k*12.9898)*43758.5453;return v-Math.floor(v)};
   function poly(p,f){g.beginPath();p.forEach(function(q,j){j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fillStyle=f;g.fill()}
   function ln(x1,y1,x2,y2,c,w){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
   function vg(y1,y2,a,c){var q=g.createLinearGradient(0,y1,0,y2);q.addColorStop(0,a);q.addColorStop(1,c);return q}
   function hg(x1,x2,a,c){if((x1<1||x2>W-1)&&/rgba\((0,0,0|30,15,0)/.test(a+c))a=c="rgba(0,0,0,0)";var q=g.createLinearGradient(x1,0,x2,0);q.addColorStop(0,a);q.addColorStop(1,c);return q}
   function bale(x,y,w,h,d){var q;g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(x+w/2+d/2,y+h+2,w*.7,7,0,0,7);g.fill();
    g.fillStyle=vg(y,y+h,"#ecc760","#c9992f");g.fillRect(x,y,w,h);
    for(q=0;q<26;q++){ln(x+hs(q)*w,y+hs(q+50)*h,x+hs(q)*w+8+hs(q+9)*10,y+hs(q+50)*h+(hs(q+3)-.5)*3,q%2?"rgba(120,80,15,.35)":"rgba(255,235,150,.45)",1.2)}
    ln(x+w*.25,y,x+w*.25,y+h,"#6b4a14",2.2);ln(x+w*.72,y,x+w*.72,y+h,"#6b4a14",2.2);
    poly([[x,y],[x+d,y-d*.85],[x+w+d,y-d*.85],[x+w,y]],"#f7e08a");poly([[x+w,y],[x+w+d,y-d*.85],[x+w+d,y+h-d*.85],[x+w,y+h]],"#a37a22");
    ln(x,y,x+w,y,"rgba(255,255,255,.5)",1.4)}
   /* ceiling */
   poly([[0,0],[W,0],[W-ix,iy],[ix,iy]],vg(0,iy,"#1a1007","#3b2610"));
   [.12,.3,.5,.7,.88].forEach(function(f){var xt=W*f,xb=ix+(W-2*ix)*f;ln(xt,0,xb,iy,"#24150a",11);ln(xt-3,0,xb-1.5,iy,"rgba(255,210,140,.22)",2)});
   g.fillStyle=vg(0,18,"#5a3a1c","#2a1a0c");g.fillRect(0,0,W,18);ln(0,1,W,1,"rgba(255,220,160,.35)",2);
   g.fillStyle=vg(iy-8,iy,"#4a2f16","#2a1a0c");g.fillRect(ix,iy-8,W-2*ix,8);
   /* back wall shading */
   g.fillStyle=vg(iy,by,"rgba(0,0,0,.45)","rgba(0,0,0,.12)");g.fillRect(ix,iy,W-2*ix,by-iy);
   g.fillStyle=hg(ix,ix+110,"rgba(0,0,0,.4)","rgba(0,0,0,0)");g.fillRect(ix,iy,110,by-iy);
   g.fillStyle=hg(W-ix-110,W-ix,"rgba(0,0,0,0)","rgba(0,0,0,.4)");g.fillRect(W-ix-110,iy,110,by-iy);
   /* side walls */
   poly([[0,0],[ix,iy],[ix,by],[0,by+46]],hg(0,ix,"#1b1008","#4d321a"));
   poly([[W,0],[W-ix,iy],[W-ix,by],[W,by+46]],hg(W-ix,W,"#4d321a","#1b1008"));
   for(n=1;n<8;n++){t=n/8;ln(0,(by+46)*t,ix,iy+(by-iy)*t,"rgba(0,0,0,.5)",2);ln(0,(by+46)*t+2,ix,iy+(by-iy)*t+2,"rgba(255,220,150,.1)",1.2);ln(W,(by+46)*t,W-ix,iy+(by-iy)*t,"rgba(0,0,0,.5)",2);ln(W,(by+46)*t+2,W-ix,iy+(by-iy)*t+2,"rgba(255,220,150,.1)",1.2)}
   ln(0,by+46,ix,by,"#1a0f06",5);ln(W,by+46,W-ix,by,"#1a0f06",5);
   /* floor perspective */
   for(n=0;n<=12;n++){var xb=ix+(W-2*ix)*n/12;ln(xb,by,xb,H,"rgba(60,35,10,.26)",2)}
   for(n=1;n<=9;n++){t=Math.pow(n/9,1.6);ln(0,FY0+(H-FY0)*t,W,FY0+(H-FY0)*t,"rgba(60,35,10,.22)",1.5);ln(0,FY0+(H-FY0)*t+2,W,FY0+(H-FY0)*t+2,"rgba(255,230,160,.12)",1.2)}
   g.fillStyle=vg(by,by+70,"rgba(0,0,0,.4)","rgba(0,0,0,0)");g.fillRect(0,by,W,70);
   g.fillStyle=hg(0,110,"rgba(0,0,0,.35)","rgba(0,0,0,0)");g.fillRect(0,by,110,H-by);
   g.fillStyle=hg(W-110,W,"rgba(0,0,0,0)","rgba(0,0,0,.35)");g.fillRect(W-110,by,110,H-by);
   /* posts */
   [W/3,2*W/3].forEach(function(px){g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(px+22,FY0+4,22,5,0,0,7);g.fill();
    g.fillStyle=hg(px,px+14,"#6a4524","#2a1a0c");g.fillRect(px,iy,14,by-iy+4);ln(px+2,iy,px+2,by,"rgba(255,220,160,.3)",1.5);
    g.fillStyle=hg(px-4,px+18,"#5a3a1c","#241509");g.fillRect(px-4,by-6,22,10);ln(px-4,by-6,px+18,by-6,"rgba(255,220,160,.35)",1.5)});
   /* hay rack on back wall */
   g.fillStyle=vg(by-32,by-4,"#9a7424","#d3ad55");g.fillRect(ix,by-32,W-2*ix,28);
   for(n=0;n<140;n++){var sx=ix+hs(n)*(W-2*ix),sy=by-32+hs(n+300)*28;ln(sx,sy,sx+8+hs(n+7)*8,sy+(hs(n+9)-.5)*5,n%2?"rgba(255,235,150,.55)":"rgba(110,75,15,.45)",1.3)}
   for(x=ix+10;x<W-ix;x+=26){g.fillStyle=hg(x,x+6,"#7a5230","#3a2411");g.fillRect(x,by-34,6,32)}
   g.fillStyle=vg(by-38,by-30,"#8a5c30","#4a2e14");g.fillRect(ix-4,by-38,W-2*ix+8,9);ln(ix-4,by-38,W-ix+4,by-38,"rgba(255,225,170,.5)",1.5);
   g.fillStyle=vg(by-4,by+6,"#5a3a1c","#241509");g.fillRect(ix-4,by-4,W-2*ix+8,9);
   g.fillStyle="rgba(0,0,0,.28)";g.fillRect(ix-4,by+5,W-2*ix+8,6);
   /* window frame */
   g.strokeStyle="#5a3a1c";g.lineWidth=7;g.strokeRect(120,34,100,70);ln(123,37,217,37,"rgba(255,225,170,.4)",1.5);
   g.fillStyle="#4a2e14";g.fillRect(166,36,8,66);g.fillStyle=vg(102,112,"#8a5c30","#3a2411");g.fillRect(112,102,116,10);ln(112,102,228,102,"rgba(255,230,180,.55)",1.5);
   g.fillStyle="rgba(0,0,0,.25)";g.fillRect(116,112,108,5);
   /* stall plates 1-5 */
   g.font="bold 17px sans-serif";g.textAlign="center";g.textBaseline="middle";
   for(n=0;n<5;n++){x=W*(n+.5)/5;y=FY0-92;ln(x-14,y-14,x-14,y,"#2a1a0c",2);ln(x+14,y-14,x+14,y,"#2a1a0c",2);
    g.fillStyle="rgba(0,0,0,.3)";g.fillRect(x-19,y+4,42,28);
    g.fillStyle=vg(y,y+26,"#b98a50","#7a5228");g.fillRect(x-21,y,42,26);g.strokeStyle="#3a2411";g.lineWidth=2;g.strokeRect(x-21,y,42,26);ln(x-20,y+1.5,x+20,y+1.5,"rgba(255,235,190,.5)",1.5);
    g.fillStyle="#2a1a0c";g.beginPath();g.arc(x-16,y+5,1.6,0,7);g.arc(x+16,y+5,1.6,0,7);g.fill();g.fillText(String(n+1),x,y+14)}
   g.textBaseline="alphabetic";
   /* hay bales (left) */
   bale(14,FY0+10,70,36,14);bale(20,FY0-24,58,32,12);
   /* water trough (right) */
   (function(x,y,w,h,d){g.fillStyle="rgba(0,0,0,.35)";g.beginPath();g.ellipse(x+w/2+8,y+h+9,w*.58,9,0,0,7);g.fill();
    g.fillStyle=hg(x,x+w,"#4a2e14","#3a2411");poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],"#2e1c0c");
    poly([[x+7,y-1],[x+d+5,y-d+3],[x+w+d-5,y-d+3],[x+w-7,y-1]],vg(y-d,y,"#8fd0f4","#4f9cc8"));ln(x+d+8,y-d+5,x+w-6,y-d+5,"rgba(255,255,255,.55)",1.5);
    poly([[x+w,y],[x+w+d,y-d],[x+w+d,y+h-d],[x+w,y+h]],"#3b2511");
    g.fillStyle=vg(y,y+h,"#9a6836","#5a3a1c");g.fillRect(x,y,w,h);ln(x+w/3,y,x+w/3,y+h,"rgba(0,0,0,.4)",2);ln(x+2*w/3,y,x+2*w/3,y+h,"rgba(0,0,0,.4)",2);
    ln(x,y+1,x+w,y+1,"rgba(255,230,180,.6)",2);g.fillStyle="#2e1c0c";g.fillRect(x+10,y+h,10,8);g.fillRect(x+w-20,y+h,10,8)})(470,FY0+6,150,24,12);
   /* light + vignette */
   gg=g.createRadialGradient(W/2,56,6,W/2,56,270);gg.addColorStop(0,"rgba(255,215,130,.38)");gg.addColorStop(1,"rgba(255,215,130,0)");g.fillStyle=gg;g.fillRect(0,0,W,FY0+150);
   gg=g.createRadialGradient(W/2,H*.5,Math.min(W,H)*.3,W/2,H*.5,Math.max(W,H)*.78);gg.addColorStop(0,"rgba(0,0,0,0)");gg.addColorStop(1,"rgba(0,0,0,.42)");g.fillStyle=gg;g.fillRect(0,0,W,H);
   /* hanging lamp */
   ln(W/2,0,W/2,42,"#1a0f06",2.5);poly([[W/2-5,40],[W/2+5,40],[W/2+14,53],[W/2-14,53]],vg(40,53,"#5a3a1c","#2a1a0c"));
   gg=g.createRadialGradient(W/2-3,55,1,W/2,57,10);gg.addColorStop(0,"#fffbe0");gg.addColorStop(1,"#f2b84a");g.fillStyle=gg;g.beginPath();g.arc(W/2,57,9,0,7);g.fill()})();
  return b}
 function newCow(c,i){var sp=[],j,pal=i%3===1?{m:"#f1e8da",d:"#d2c6b0",s:"#7b4a2a"}:{m:"#f6f2ea",d:"#d6d0c2",s:"#2a2a2e"};
  for(j=0;j<4;j++)sp.push([-24+rnd()*50,-54+rnd()*26,5+rnd()*7,4+rnd()*5,rnd()*3]);
  return{id:c.id,x:90+rnd()*(W-180),y:FY0+14+rnd()*(FY1-FY0-18),dir:rnd()<.5?-1:1,st:"idle",t:rnd()*2,tx:0,ty:0,ph:rnd()*6,hd:0,tp:rnd()*6,sp:sp,pal:pal}}
 function sync(){var L=shedCows(sd),old={};cows.forEach(function(c){old[c.id]=c});cows=L.map(function(c,i){return old[c.id]||newCow(c,i)})}
 function leg(hx,ph,wk,col){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph))*5:0,kx=hx+s*5,ky=-14-l*.4,fx2=hx+s*9,fy=-1-l;
  cx.lineCap="round";cx.strokeStyle=col;cx.lineWidth=6;cx.beginPath();cx.moveTo(hx,-27);cx.lineTo(kx,ky);cx.stroke();
  cx.lineWidth=4.4;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx2,fy);cx.stroke();
  cx.fillStyle="#2a1f1a";cx.beginPath();cx.moveTo(fx2-3,fy-3);cx.lineTo(fx2+3,fy-3);cx.lineTo(fx2+3.6,fy+2);cx.lineTo(fx2-3.6,fy+2);cx.closePath();cx.fill()}
 function drawCow(c,t){var wk=c.st==="walk",k=Z*(1.25+(c.y-FY0)/(FY1-FY0)*.55),nA=.27+c.hd*.8,nL=26+c.hd*7.5,na=Math.cos(nA),nb=Math.sin(nA),hx=20+na*nL,hy=-46+nb*nL,cd=dcById(c.id),rp=cd?ripe(cd):false,P=c.pal,bob=wk?Math.sin(c.ph*2)*1.1:Math.sin(t*1.7+c.tp)*.3,br=1+Math.sin(t*1.9+c.tp)*.012,tw=Math.sin(t*2.4+c.tp)*5,ch=c.st==="idle"?Math.sin(t*9+c.tp):c.st==="graze"?Math.sin(t*7+c.tp)*1.4:0,fl=Math.max(0,Math.sin(t*.9+c.tp*3)-.88)*9,g,j;
  function rg(h,al){return"rgba("+parseInt(h.substr(1,2),16)+","+parseInt(h.substr(3,2),16)+","+parseInt(h.substr(5,2),16)+","+al+")"}
  function hs(n){var v=Math.sin(n*12.9898)*43758.5453;return v-Math.floor(v)}
  function leg(hx2,ph,far,hind){var s=wk?Math.sin(ph):0,l=wk?Math.max(0,Math.cos(ph))*5:0,kx=hx2+(hind?-3:2)+s*5,ky=-15-l*.4,fx2=hx2+(hind?-1:1)+s*9,fy=-1.5-l;
   cx.lineCap="round";cx.lineJoin="round";cx.strokeStyle=P.m;cx.lineWidth=hind?8.6:7.4;cx.beginPath();cx.moveTo(hx2,-30);cx.lineTo(kx,ky);cx.stroke();
   cx.lineWidth=4.6;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx2,fy-3);cx.stroke();
   cx.strokeStyle="rgba(50,38,26,.28)";cx.lineWidth=3;cx.beginPath();cx.moveTo(hx2+2,-28);cx.lineTo(kx+1.6,ky);cx.lineTo(fx2+1.4,fy-3);cx.stroke();
   cx.fillStyle="#2b211b";cx.beginPath();cx.moveTo(fx2-3.2,fy-4);cx.lineTo(fx2+3.2,fy-4);cx.lineTo(fx2+4.2,fy+1.8);cx.lineTo(fx2-4.2,fy+1.8);cx.closePath();cx.fill();
   cx.fillStyle="rgba(255,255,255,.18)";cx.fillRect(fx2-2.4,fy-3.6,1.6,3);
   if(far){cx.strokeStyle="rgba(30,22,14,.4)";cx.lineWidth=hind?8.6:7.4;cx.beginPath();cx.moveTo(hx2,-30);cx.lineTo(kx,ky);cx.stroke();cx.lineWidth=4.6;cx.beginPath();cx.moveTo(kx,ky);cx.lineTo(fx2,fy-3);cx.stroke()}}
  function spot(s){var n=18,i,a,r,x,y;cx.beginPath();for(i=0;i<=n;i++){a=i/n*6.2832;r=1+.3*Math.sin(3*a+s[4])+.18*Math.sin(5*a+s[0]);x=s[0]+Math.cos(a+s[4])*s[2]*1.7*r;y=s[1]+Math.sin(a+s[4])*s[3]*1.5*r;i?cx.lineTo(x,y):cx.moveTo(x,y)}cx.closePath();cx.fill();cx.stroke()}
  cx.save();cx.translate(c.x,c.y+bob);cx.scale(c.dir*k,k);
  cx.save();cx.translate(5,1-bob);cx.scale(1,.17);g=cx.createRadialGradient(0,0,2,0,0,48);g.addColorStop(0,"rgba(0,0,0,.45)");g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,48,0,7);cx.fill();cx.restore();
  leg(-21,c.ph+Math.PI,1,1);leg(21,c.ph,1,0);
  cx.strokeStyle=P.m;cx.lineWidth=2.8;cx.lineCap="round";cx.beginPath();cx.moveTo(-34,-51);cx.bezierCurveTo(-41,-46,-40+tw*.4,-38,-38+tw,-24);cx.stroke();
  cx.strokeStyle="rgba(40,30,20,.3)";cx.lineWidth=1;cx.beginPath();cx.moveTo(-33,-51);cx.bezierCurveTo(-40,-46,-39+tw*.4,-38,-37+tw,-24);cx.stroke();
  cx.fillStyle=P.s;cx.beginPath();cx.ellipse(-38+tw,-20,3,6.5,tw*.03,0,7);cx.fill();cx.strokeStyle=rg(P.s,.7);cx.lineWidth=.8;cx.beginPath();cx.moveTo(-38+tw,-15);cx.lineTo(-38+tw*1.2,-12);cx.moveTo(-39+tw,-16);cx.lineTo(-40+tw*1.2,-13);cx.stroke();
  cx.beginPath();cx.moveTo(18,-56);cx.bezierCurveTo(30,-60,hx-3*na+9*nb-10*na,hy-3*nb-9*na-10*nb,hx-3*na+9*nb,hy-3*nb-9*na);cx.lineTo(hx-3*na-9*nb,hy-3*nb+9*na);cx.bezierCurveTo(hx-3*na-9*nb-9*na,hy-3*nb+9*na-9*nb,24,-30,22,-24);cx.lineTo(16,-30);cx.closePath();
  g=cx.createLinearGradient(0,-60,0,-26);g.addColorStop(0,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
  cx.save();cx.clip();cx.fillStyle="rgba(60,45,30,.18)";cx.beginPath();cx.ellipse(hx-8,hy+8,12,5,.5,0,7);cx.fill();cx.strokeStyle="rgba(60,45,30,.22)";cx.lineWidth=.9;cx.beginPath();cx.moveTo(26,-33);cx.quadraticCurveTo(34,-30,hx-6,hy+9);cx.moveTo(28,-38);cx.quadraticCurveTo(36,-35,hx-4,hy+4);cx.stroke();cx.restore();
  cx.save();cx.translate(0,-22);cx.scale(1,br);cx.translate(0,22);
  cx.beginPath();cx.moveTo(-34,-50);cx.bezierCurveTo(-32,-57,-25,-59,-18,-57);cx.bezierCurveTo(-8,-54,6,-55,16,-58);cx.bezierCurveTo(26,-60,33,-55,36,-46);cx.bezierCurveTo(39,-36,34,-26,27,-23);cx.bezierCurveTo(18,-19,2,-20,-12,-21);cx.bezierCurveTo(-24,-21,-34,-26,-36,-37);cx.bezierCurveTo(-37,-42,-36,-47,-34,-50);cx.closePath();
  g=cx.createLinearGradient(0,-60,0,-20);g.addColorStop(0,P.m);g.addColorStop(.6,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;cx.fill();
  cx.save();cx.clip();cx.fillStyle=P.s;cx.strokeStyle=rg(P.s,.22);cx.lineWidth=1.6;cx.lineJoin="round";for(j=0;j<c.sp.length;j++)spot(c.sp[j]);
  cx.strokeStyle="rgba(60,45,30,.11)";cx.lineWidth=.8;cx.beginPath();for(j=0;j<80;j++){var fx0=-36+hs(j)*74,fy0=-60+hs(j+100)*40;cx.moveTo(fx0,fy0);cx.lineTo(fx0+4,fy0+1.4)}cx.stroke();
  g=cx.createLinearGradient(0,-60,0,-19);g.addColorStop(0,"rgba(255,255,255,.14)");g.addColorStop(.3,"rgba(255,255,255,0)");g.addColorStop(.7,"rgba(60,45,30,.2)");g.addColorStop(1,"rgba(40,28,18,.6)");cx.fillStyle=g;cx.fillRect(-40,-62,82,44);
  g=cx.createLinearGradient(-38,0,38,0);g.addColorStop(0,"rgba(40,28,18,.34)");g.addColorStop(.22,"rgba(0,0,0,0)");g.addColorStop(.78,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(40,28,18,.3)");cx.fillStyle=g;cx.fillRect(-40,-62,82,44);
  [[-19,-48,13,8],[20,-47,11,9]].forEach(function(h){cx.save();cx.translate(h[0],h[1]);cx.scale(h[2],h[3]);g=cx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,"rgba(255,255,255,.2)");g.addColorStop(1,"rgba(255,255,255,0)");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,1,0,7);cx.fill();cx.restore()});
  cx.strokeStyle="rgba(50,38,26,.22)";cx.lineWidth=1.1;cx.beginPath();cx.moveTo(-31,-48);cx.bezierCurveTo(-24,-54,-14,-53,-6,-51);cx.moveTo(22,-50);cx.bezierCurveTo(26,-44,26,-36,22,-30);cx.stroke();
  cx.restore();
  cx.strokeStyle="rgba(40,30,20,.4)";cx.lineWidth=1.2;cx.beginPath();cx.moveTo(-34,-50);cx.bezierCurveTo(-32,-57,-25,-59,-18,-57);cx.bezierCurveTo(-8,-54,6,-55,16,-58);cx.bezierCurveTo(26,-60,33,-55,36,-46);cx.stroke();
  cx.restore();
  g=cx.createLinearGradient(0,-24,0,-14);g.addColorStop(0,"#eab0a8");g.addColorStop(1,"#c98780");cx.fillStyle=g;cx.beginPath();cx.ellipse(-4,-20,8,5.4,0,0,Math.PI);cx.fill();cx.fillStyle="#d48f89";[-8,-1.5].forEach(function(u){cx.beginPath();cx.ellipse(u,-15.5,1.5,2.6,0,0,7);cx.fill()});
  leg(-25,c.ph,0,1);leg(15,c.ph+Math.PI,0,0);
  cx.save();cx.translate(hx,hy);cx.rotate(.3+c.hd*.88);
  g=cx.createLinearGradient(0,-9,0,9);g.addColorStop(0,P.m);g.addColorStop(.6,P.m);g.addColorStop(1,P.d);cx.fillStyle=g;
  cx.beginPath();cx.moveTo(-9,-7);cx.bezierCurveTo(-4,-11,3,-10,9,-6);cx.bezierCurveTo(14,-4,19,-2,19,2);cx.bezierCurveTo(19,6,16,8,12,8);cx.bezierCurveTo(6,10,-2,10,-7,7);cx.bezierCurveTo(-11,4,-11,-3,-9,-7);cx.closePath();cx.fill();
  cx.strokeStyle="rgba(40,30,20,.35)";cx.lineWidth=.9;cx.stroke();
  cx.save();cx.clip();cx.fillStyle=P.s;cx.strokeStyle=rg(P.s,.4);cx.lineWidth=2;cx.beginPath();cx.ellipse(-3,-5,7,4.6,-.3,0,7);cx.fill();cx.stroke();
  g=cx.createLinearGradient(0,-10,0,10);g.addColorStop(0,"rgba(255,255,255,.16)");g.addColorStop(.5,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(40,28,18,.4)");cx.fillStyle=g;cx.fillRect(-12,-12,34,24);cx.restore();
  g=cx.createLinearGradient(0,-3,0,9);g.addColorStop(0,"#f0b9b1");g.addColorStop(1,"#c98a84");cx.fillStyle=g;cx.beginPath();cx.ellipse(15.5,2.4+ch*.45,5.4,5.5,0,0,7);cx.fill();
  cx.fillStyle="#8a4a48";cx.beginPath();cx.ellipse(18,.4,1.1,1.6,.3,0,7);cx.ellipse(18,4.6+ch*.3,1.1,1.6,-.3,0,7);cx.fill();
  cx.fillStyle="rgba(255,255,255,.55)";cx.beginPath();cx.ellipse(14.2,-.8,1.8,.9,-.4,0,7);cx.fill();
  cx.strokeStyle="rgba(90,45,40,.55)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(11,6.4+ch*.5);cx.quadraticCurveTo(15,8.4+ch*.7,19,5.6+ch*.4);cx.stroke();
  cx.fillStyle="#3a2418";cx.beginPath();cx.ellipse(3.6,-3.4,2.3,1.9,0,0,7);cx.fill();cx.fillStyle="#fff";cx.beginPath();cx.arc(4.3,-4.1,.75,0,7);cx.fill();
  cx.strokeStyle="rgba(20,12,8,.75)";cx.lineWidth=1;cx.beginPath();cx.moveTo(1,-4.6);cx.quadraticCurveTo(3.6,-6.6,6.6,-4.2);cx.stroke();
  cx.strokeStyle="rgba(90,60,40,.4)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(3.4,-1.2);cx.quadraticCurveTo(3.8,1.4,2.4,3);cx.stroke();
  cx.save();cx.translate(-8,-5.5);cx.rotate(-.5+Math.sin(t*3+c.tp)*.05-fl*.05);g=cx.createLinearGradient(0,-3,0,3);g.addColorStop(0,P.s);g.addColorStop(1,P.s);cx.fillStyle=P.s;cx.beginPath();cx.ellipse(-5,0,8,3.4,0,0,7);cx.fill();cx.fillStyle="#d89a94";cx.beginPath();cx.ellipse(-4.6,.2,5.4,1.7,0,0,7);cx.fill();cx.restore();
  cx.strokeStyle="#e9dec4";cx.lineWidth=2.6;cx.lineCap="round";cx.beginPath();cx.moveTo(-3.5,-9.5);cx.quadraticCurveTo(-5.5,-14,-1.5,-15);cx.stroke();cx.strokeStyle="rgba(120,100,70,.5)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(-3,-10.5);cx.lineTo(-4.4,-13);cx.stroke();
  cx.fillStyle=P.s;cx.beginPath();cx.ellipse(-1,-10,4,2.2,.2,0,7);cx.fill();
  cx.restore();cx.restore();
  if(rp){cx.font="22px sans-serif";cx.textAlign="center";cx.fillText("\uD83E\uDD5B",c.x,c.y-88*k+Math.sin(t*4+c.tp)*3)}}
  function upd(dt,t){cows.forEach(function(c){var dx,dy,d,r;c.t-=dt;if(c.hop>0)c.hop=Math.max(0,c.hop-dt);
  if(c.st==="walk"){dx=c.tx-c.x;dy=c.ty-c.y;d=Math.hypot(dx,dy);if(d<3){c.st="idle";c.t=1.5+rnd()*3}else{c.x+=dx/d*28*dt;c.y+=dy/d*18*dt;c.dir=dx>=0?1:-1;c.ph+=dt*5.4}}
  else if(c.t<=0){r=rnd();if(r<.45){c.st="walk";c.tx=60+rnd()*(W-120);c.ty=FY0+14+rnd()*(FY1-FY0-18)}else if(r<.78){c.st="graze";c.t=2.5+rnd()*3}else{c.st="idle";c.t=1.5+rnd()*2.5}}
  c.hd+=((c.st==="graze"?1:0)-c.hd)*Math.min(1,dt*4)})}
 function status(c){var f=FTD[c.k],el;if(!f)return"";el=nowT()-(c.t||0);return el>=f.ms?"Milk ready! +"+f.sell+"\uD83E\uDE99":"Next milk in "+fmtDur(f.ms-el)}
  function tm(){calfTick();var L=shedCows(sd),f=FTD.a_cow,best=1e18,rp=0,e;L.forEach(function(c){var el=nowT()-(c.t||0);if(f&&el>=f.ms)rp++;else if(f)best=Math.min(best,f.ms-el)});e=$("shTime");if(!e)return;e.textContent=rm?tmSide():!L.length?"":rp?"\uD83E\uDD5B Milk ready: "+rp:"Next harvest in "+fmtDur(best)}
 function rows(){var L=shedCows(sd),nb=barnCows().length;$("shSub").textContent=rm?(calfList(rm).length?"Calf room \u00B7 "+calfList(rm).length+"/5":"Empty room \u00B7 0/5"):L.length+"/5 cows";$("shPlus").style.opacity=rm?((grownKids()&&L.length<5)?"1":".35"):((L.length>=5||!nb)?".35":"1");$("shMinus").style.opacity=rm?(grownKids()?"1":".35"):(L.length?"1":".35");sig=L.map(function(c){return c.id+ripe(c)}).join();tm()}
 function frame(ts){var t=ts/1000,dt,fy;if(!alive)return;if(dlg.style.display!=="flex"||!$("shCv")){alive=false;return}
  dt=Math.min(.05,(ts-last)/1000||.016);last=ts;upd(dt,t);if(pos)kidsUpd(dt);pos+=(rm-pos)*Math.min(1,dt*9);if(Math.abs(rm-pos)<.003)pos=rm;
  cx.clearRect(0,0,W,H);drawSides(t);cx.save();cx.translate(-pos*W,0);cx.drawImage(bg,0,0);
  cows.slice().sort(function(a,b){return a.y-b.y}).forEach(function(c){var hp=c.hop>0?Math.sin((1-c.hop/.55)*Math.PI)*16:0;cx.save();cx.translate(0,-hp);drawCow(c,t);cx.restore()});
    if(document.body.classList.contains("night")){cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var lg=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);lg.addColorStop(0,"rgba(255,200,90,.55)");lg.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=lg;cx.fillRect(0,0,W,H)}
    if(document.body.classList.contains("night")){cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
    shFx(dt);fx=fx.filter(function(e){return e.a>0});fx.forEach(function(e){e.y-=26*dt;e.a-=dt*.7;cx.globalAlpha=Math.max(0,e.a);cx.font="bold 20px sans-serif";cx.textAlign="center";cx.fillStyle="#fff";cx.strokeStyle="#7a4a10";cx.lineWidth=3;cx.strokeText(e.txt,e.x,e.y);cx.fillText(e.txt,e.x,e.y);cx.globalAlpha=1});
  cx.restore();
  if(ts-lastSig>500){lastSig=ts;if(sig!==shedCows(sd).map(function(c){return c.id+ripe(c)}).join()){sync();rows()}else if(rm)rows();else tm()}
  raf=requestAnimationFrame(frame)}
   function shBurst(cc,sell){var i,a,s,k=1.25+(cc.y-FY0)/(FY1-FY0)*.55,bx=cc.x,by=cc.y-34*k;
  cc.hop=.55;
  shPt.push({ty:"glow",x:bx,y:by,r:90,a:1});
  shPt.push({ty:"ring",x:bx,y:by,r:10,a:.9,w:6,g:170,d:0});
  shPt.push({ty:"ring",x:bx,y:by,r:4,a:.7,w:3,g:105,d:.12});
  for(i=0;i<16;i++){a=-Math.PI/2+(Math.random()-.5)*2.2;s=110+Math.random()*170;shPt.push({ty:"drop",x:bx+(Math.random()-.5)*24,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:2.6+Math.random()*3.2,a:1,life:.9+Math.random()*.5})}
  for(i=0;i<12;i++){a=Math.random()*6.283;s=40+Math.random()*120;shPt.push({ty:"spark",x:bx,y:by,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,r:5+Math.random()*6,a:1,life:.7+Math.random()*.5,rot:Math.random()*3})}
  for(i=0;i<5;i++)shPt.push({ty:"coin",x:bx+(Math.random()-.5)*30,y:by-10,vx:(Math.random()-.5)*120,vy:-190-Math.random()*90,r:8,a:1,life:1.2,ph:Math.random()*6});
  shPt.push({ty:"txt",x:bx,y:by-55,txt:"+"+sell+"\uD83E\uDE99",a:1.6,age:0})}
 function shFx(dt){var i,j,p,rr,sc,g;cx.save();
  shPt=shPt.filter(function(p){return p.a>0});
  for(i=0;i<shPt.length;i++){p=shPt[i];cx.globalAlpha=1;
   if(p.d>0){p.d-=dt;continue}
   if(p.ty==="glow"){p.a-=dt*1.8;g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,"rgba(255,244,190,"+Math.max(0,p.a*.8)+")");g.addColorStop(1,"rgba(255,244,190,0)");cx.fillStyle=g;cx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2)}
   else if(p.ty==="ring"){p.r+=p.g*dt;p.a-=dt*1.5;cx.globalAlpha=Math.max(0,p.a);cx.strokeStyle="#fff6c8";cx.lineWidth=Math.max(.5,p.w*p.a);cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.stroke()}
   else if(p.ty==="drop"){p.vy+=460*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#fffdf5";cx.strokeStyle="rgba(180,205,230,.9)";cx.lineWidth=1.2;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.stroke();cx.fillStyle="#fff";cx.beginPath();cx.arc(p.x-p.r*.3,p.y-p.r*.3,p.r*.32,0,7);cx.fill()}
   else if(p.ty==="spark"){p.vx*=.97;p.vy=p.vy*.97+50*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.rot+=dt*3;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.globalAlpha=Math.max(0,p.a);cx.globalCompositeOperation="lighter";cx.fillStyle="#ffe58a";cx.beginPath();for(j=0;j<8;j++){rr=j%2?p.r*.28:p.r;cx.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}cx.closePath();cx.fill();cx.restore()}
   else if(p.ty==="coin"){p.vy+=560*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.a-=dt/p.life;p.ph+=dt*11;rr=Math.max(.8,Math.abs(Math.cos(p.ph))*p.r);cx.globalAlpha=Math.max(0,p.a);cx.fillStyle="#ffd23f";cx.strokeStyle="#a8740a";cx.lineWidth=1.6;cx.beginPath();cx.ellipse(p.x,p.y,rr,p.r,0,0,7);cx.fill();cx.stroke();cx.fillStyle="rgba(255,255,255,.55)";cx.beginPath();cx.ellipse(p.x-rr*.25,p.y-p.r*.3,rr*.3,p.r*.3,0,0,7);cx.fill()}
   else if(p.ty==="txt"){p.age+=dt;p.a-=dt*.8;p.y-=36*dt;sc=p.age<.2?.5+p.age*4.5:1.4-Math.min(.4,(p.age-.2)*1.2);cx.save();cx.translate(p.x,p.y);cx.scale(sc,sc);cx.globalAlpha=Math.min(1,Math.max(0,p.a));cx.font="bold 26px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="#7a4a10";cx.fillStyle="#fff6c2";cx.strokeText(p.txt,0,0);cx.fillText(p.txt,0,0);cx.restore()}}
  cx.restore()}
 function collect(id){var c=dcById(id),f=c&&FTD[c.k],was=c&&ripe(c),cc;if(!c)return;tapTree(c);
  if(was){cc=cows.filter(function(q){return q.id===id})[0];if(cc)shBurst(cc,f.sell)}rows()}
 body.style.cssText="max-width:560px;margin-top:100px;margin-bottom:120px;padding:0;background:transparent!important;border:0;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;overflow:hidden";
 body.innerHTML="<div style='position:relative'><canvas id='shCv' style='width:100%;display:block;border-radius:18px;touch-action:manipulation'></canvas><button id='shX' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';document.getElementById('dlgBody').style.cssText=''\" style='position:absolute;top:8px;right:8px;z-index:5;min-width:84px;height:46px;padding:0 16px;border-radius:23px;border:2px solid rgba(255,255,255,.9);background:rgba(0,0,0,.3);color:#fff;font:bold 18px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>Close</button><div id='shSub' style='position:absolute;top:10px;left:0;right:0;text-align:center;font:bold 22px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div id='shTime' style='position:absolute;top:42px;left:0;right:0;text-align:center;font:bold 14px sans-serif;color:#fff;text-shadow:0 2px 6px #000'></div><div style='position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:20px'><button id='shMinus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>-</button><button id='shHarv' style='height:56px;padding:0 18px;border-radius:28px;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 16px sans-serif;text-shadow:0 2px 6px #000'>Harvest</button><button id='shPlus' style='width:56px;height:56px;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:transparent;color:#fff;font:bold 32px sans-serif;line-height:1;text-shadow:0 2px 6px #000'>+</button></div></div>";
 dlg.style.display="flex";cv=$("shCv");var dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cx=cv.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 bg=mkBg();sync();rows();
  bgL=mkBg();bgR=mkBg();
 function nightFx(){if(!document.body.classList.contains("night"))return;cx.fillStyle="rgba(8,12,40,.5)";cx.fillRect(0,0,W,H);var g2=cx.createRadialGradient(W*.5,56,4,W*.5,56,W*.4);g2.addColorStop(0,"rgba(255,200,90,.55)");g2.addColorStop(1,"rgba(255,200,90,0)");cx.fillStyle=g2;cx.fillRect(0,0,W,H);cx.fillStyle="#070d26";cx.fillRect(126,40,41,58);cx.fillRect(173,40,41,58);cx.fillStyle="#101c2a";cx.fillRect(126,84,41,14);cx.fillRect(173,84,41,14);cx.fillStyle="#fff";[[134,48],[150,56],[160,46],[182,50],[206,70],[208,46],[190,78],[140,70]].forEach(function(s){cx.fillRect(s[0],s[1],1.6,1.6)});cx.fillStyle="#f4efd0";cx.beginPath();cx.arc(194,58,7,0,7);cx.fill();cx.fillStyle="#070d26";cx.beginPath();cx.arc(197,56,6,0,7);cx.fill()}
 function drawSides(t){[-1,1].forEach(function(r){var im=r<0?bgL:bgR,n,x,y=FY0+(FY1-FY0)*.42,L;if(!im||Math.abs(r-pos)>=1)return;
  cx.save();cx.translate((r-pos)*W,0);cx.drawImage(im,0,0);
  
  L=calfList(r);
  if(!L.length){cx.font="bold 28px sans-serif";cx.textAlign="center";cx.lineWidth=5;cx.strokeStyle="rgba(40,20,5,.8)";cx.fillStyle="#fff";cx.strokeText("Empty room",W/2,FY0+(FY1-FY0)*.75);cx.fillText("Empty room",W/2,FY0+(FY1-FY0)*.75)}
  else L.slice().sort(function(p,q){return kid(p).y-kid(q).y}).forEach(function(q){drawKid(q,t)});
  nightFx();cx.restore()})}
 var wrap=body.firstChild,ctl=$("shMinus").parentNode,dots=document.createElement("div"),aL=document.createElement("button"),aR=document.createElement("button"),ast="position:absolute;top:46%;z-index:4;width:42px;height:64px;padding:0;border-radius:21px;border:2px solid rgba(255,255,255,.85);background:rgba(0,0,0,.3);color:#fff;font:bold 30px sans-serif;line-height:1;text-shadow:0 2px 6px #000;transition:opacity .2s",tx0=0,ty0=0,tOn=false;
 aL.id="shL";aL.textContent="\u2039";aL.style.cssText=ast+";left:6px";aR.id="shR";aR.textContent="\u203A";aR.style.cssText=ast+";right:6px";
 dots.style.cssText="position:absolute;top:68px;left:0;right:0;display:flex;justify-content:center;gap:8px;pointer-events:none";dots.innerHTML="<i></i><i></i><i></i>";
 wrap.appendChild(aL);wrap.appendChild(aR);wrap.appendChild(dots);
 ctl.style.transition="opacity .2s";
 function roomUI(){aL.style.opacity=rm>-1?"1":"0";aL.style.pointerEvents=rm>-1?"auto":"none";aR.style.opacity=rm<1?"1":"0";aR.style.pointerEvents=rm<1?"auto":"none";
  ctl.style.opacity="1";ctl.style.pointerEvents="auto";
  [].forEach.call(dots.children,function(d,i){d.style.cssText="width:9px;height:9px;border-radius:50%;box-shadow:0 1px 4px #000;background:"+(i===rm+1?"#fff":"rgba(255,255,255,.4)")})}
 function goRoom(d){var n=Math.max(-1,Math.min(1,rm+d));if(n===rm)return;rm=n;roomUI();rows()}
 aL.onclick=function(){goRoom(-1)};aR.onclick=function(){goRoom(1)};
 wrap.addEventListener("touchstart",function(ev){if(ev.touches.length!==1||(ev.target.closest&&ev.target.closest("button"))){tOn=false;return}tOn=true;tx0=ev.touches[0].clientX;ty0=ev.touches[0].clientY},{passive:true});
 wrap.addEventListener("touchend",function(ev){var t0,dx,dy;if(!tOn)return;tOn=false;t0=ev.changedTouches[0];dx=t0.clientX-tx0;dy=t0.clientY-ty0;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swp=Date.now();goRoom(dx<0?1:-1)}},{passive:true});
 function kh(ev){if(!alive||dlg.style.display!=="flex"||!$("shCv")){document.removeEventListener("keydown",kh,true);return}
  if(ev.key==="ArrowLeft"){ev.preventDefault();ev.stopPropagation();goRoom(-1)}else if(ev.key==="ArrowRight"){ev.preventDefault();ev.stopPropagation();goRoom(1)}}
 document.addEventListener("keydown",kh,true);roomUI();
  function SH(){return dcById(sd.id)||sd}
 function calfList(r){var h=SH();return h.cc?(h.cf||[]).filter(function(q){return q.r===r}):[]}
 function calfTick(){var h=SH(),c=h.cc,L,l,now=nowT();if(!c)return;L=h.cf=h.cf||[];
  if(shedCows(sd).length<1||L.length>=10){h.nx=0;return}
  if(!h.nx)h.nx=now+c.b;
  while(h.nx<=now&&L.length<10){l=L.filter(function(q){return q.r<0}).length;h.cn=(h.cn||0)+1;L.push({i:"c"+h.cn,b:h.nx,r:l<=L.length-l?-1:1,m:0});h.nx+=c.b}
  if(L.length>=10)h.nx=0}
 function kid(q){var k=kids[q.i],n;if(!k){k=kids[q.i]=newCow({id:"k_"+q.i},parseInt(q.i.slice(1),10)||0);
  n=(SH().cf||[]).filter(function(z){return z.r===q.r&&(parseInt(z.i.slice(1),10)||0)<(parseInt(q.i.slice(1),10)||0)}).length;
  k.hx=W*(n%5+.5)/5;k.hy=FY0+(FY1-FY0)*(.3+.4*(n%2));k.x=k.hx;k.y=k.hy}return k}
 function kidsUpd(dt){var s=cows;cows=(SH().cf||[]).map(function(q){return kid(q)});cows.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});upd(dt);cows.forEach(function(k){k.tx=Math.max(k.hx-42,Math.min(k.hx+42,k.tx));k.ty=Math.max(k.hy-14,Math.min(k.hy+14,k.ty))});cows=s}
 function kidGrow(q){return Math.min(1,Math.max(0,(nowT()-q.b)/SH().cc.g))}
 function drawKid(q,t){var c=SH().cc,k=kid(q),now=nowT(),g=kidGrow(q),sc=.42+.58*g,oz=Z,rdy=g>=1&&(!q.m||now-q.m>=c.m),by=k.y-66*oz*sc*(1.25+(k.y-FY0)/(FY1-FY0)*.55)-8,nm=g<.34?"Baby":g<.67?"Calf":"Young";
  Z=oz*sc;try{drawCow(k,t)}finally{Z=oz}
  cx.save();cx.textAlign="center";
  if(g<1){cx.fillStyle="rgba(0,0,0,.55)";cx.fillRect(k.x-20,by,40,6);cx.fillStyle="#8be37f";cx.fillRect(k.x-19,by+1,38*g,4);cx.font="bold 11px sans-serif";cx.lineWidth=3;cx.strokeStyle="rgba(0,0,0,.7)";cx.fillStyle="#fff";cx.strokeText(nm,k.x,by-3);cx.fillText(nm,k.x,by-3)}
  else if(rdy){cx.font="24px sans-serif";cx.fillText("\uD83E\uDD5B",k.x,by-2+Math.sin(t*4+k.tp)*3)}
  cx.restore()}
 function milkKid(q){var c=SH().cc,now=nowT(),k=kid(q);
  if(now-q.b<c.g){toast("\uD83D\uDC04 Still growing: grown-up in "+fmtDur(c.g-(now-q.b)));return}
  if(q.m&&now-q.m<c.m){toast("Next milk in "+fmtDur(c.m-(now-q.m)));return}
  invAdd("y:"+sd.k,1);S.xp+=c.x;q.m=now;lvlUp();paint();toast("\uD83E\uDD5B Milk collected! +"+c.x+" XP, stored in barn");fx.push({x:k.x+rm*W,y:k.y-100,txt:"+1 \uD83D\uDCE6",a:1.2});send("farmCalfMilk",[TOKEN,sd.id,q.i]);tm()}
 function kidTap(px,py){var best=null,bd=1e9;calfList(rm).forEach(function(q){var k=kid(q),sc=Math.max(.75,.42+.58*kidGrow(q)),kk=1.25+(k.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-k.x)+Math.abs(py-(k.y-30*kk));
   if(Math.abs(px-k.x)<58*kk*sc&&py>k.y-70*kk*sc&&py<k.y+10&&d<bd){bd=d;best=q}});
  if(best)milkKid(best)}
   function grownKids(){var c=SH().cc,now=nowT();return c?calfList(rm).filter(function(q){return now-q.b>=c.g}).length:0}
 function kidHarvest(){var c=SH().cc,now=nowT(),n=0;if(!c)return;calfList(rm).forEach(function(q){if(now-q.b>=c.g&&(!q.m||now-q.m>=c.m)){n++;milkKid(q)}});if(!n)toast("No milk ready yet.")}
 function kidMove(toShed){var h=SH(),c=h.cc,now=nowT(),L=calfList(rm),q=null,i,m=1e18,id2,o;if(!c)return;
  for(i=0;i<L.length;i++){if(now-L[i].b>=c.g){q=L[i];break}m=Math.min(m,c.g-(now-L[i].b))}
  if(!q){toast(L.length?"\uD83D\uDC04 No fully grown calf yet. Next grown-up in "+fmtDur(m):"No calves in this room.");return}
  if(toShed&&shedCows(sd).length>=5){toast("The cow shed is full (5 cows).");return}
  id2="d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  o={id:id2,k:"a_cow",c:0,r:0,s:1,t:now};S.dc.push(o);
  h.cf=(h.cf||[]).filter(function(z){return z!==q});kids={};
  if(toShed)sd.cw=(sd.cw||[]).concat([id2]);
  send("farmCalfOut",[TOKEN,sd.id,q.i,id2,toShed?1:0]);
  paint();sync();rows();toast(toShed?"\uD83D\uDC04 Grown calf moved into the cow room ("+shedCows(sd).length+"/5)":"\uD83D\uDC04 Grown calf moved to your barn")}
 function tmSide(){var c=SH().cc,L=calfList(rm),now=nowT(),rdy=0,nm=1e18,ng=1e18,a;if(!c)return"";
  L.forEach(function(q){a=now-q.b;if(a<c.g)ng=Math.min(ng,c.g-a);else if(!q.m||now-q.m>=c.m)rdy++;else nm=Math.min(nm,c.m-(now-q.m))});
  if(rdy)return"\uD83E\uDD5B Milk ready: "+rdy+" (tap the cow)";
  if(ng<1e18)return"Next grown-up in "+fmtDur(ng);
  if(nm<1e18)return"Next milk in "+fmtDur(nm);
  return SH().nx?"Next calf in "+fmtDur(Math.max(0,SH().nx-now)):"Put a cow in the shed to start a family"}
 cv.onclick=function(e){if(Math.abs(pos-rm)>.01||Date.now()-swp<400)return;var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W,py=(e.clientY-r.top)/r.height*H,best=null,bd=1e9;
   if(rm){kidTap(px,py);return}
  cows.forEach(function(c){var k=1.25+(c.y-FY0)/(FY1-FY0)*.55,d=Math.abs(px-c.x)+Math.abs(py-(c.y-30*k));if(Math.abs(px-c.x)<58*k&&py>c.y-70*k&&py<c.y+8&&d<bd){bd=d;best=c}});
  if(best)collect(best.id)};
 dlg.onclick=function(ev){var b=ev.target.closest&&ev.target.closest("button"),id;if(ev.target===dlg){close();return}if(!b)return;
   if(rm&&(b.id==="shHarv"||b.id==="shPlus"||b.id==="shMinus")){if(b.id==="shHarv")kidHarvest();else kidMove(b.id==="shPlus");return}
  if(b.id==="shPlus"){var L=shedCows(sd),bc=barnCows(),o;if(L.length>=5){toast("The cow shed is full (5 cows).");return}if(!bc.length){toast("No cows in your barn. Buy a cow in the Market.");return}
   o=dcById(bc[0].id);sd.cw=(sd.cw||[]).concat([o.id]);send("farmCowIn",[TOKEN,o.id,sd.id]);paint();sync();rows();toast("\uD83D\uDC04 Cow moved into the shed ("+shedCows(sd).length+"/5)");return}
   if(b.id==="shX"){close();return}
   if(b.id==="shHarv"){var n=0;shedCows(sd).forEach(function(c){if(ripe(c)){n++;collect(c.id)}});if(!n)toast("No milk ready yet.");return}
   if(b.id==="shMinus"){var L2=shedCows(sd);if(!L2.length){toast("No cows in the shed.");return}id=L2[L2.length-1].id;sd.cw=(sd.cw||[]).filter(function(q){return q!==id});send("farmCowOut",[TOKEN,id]);paint();sync();rows();toast("Cow moved to your barn")}};
 raf=requestAnimationFrame(frame)}
