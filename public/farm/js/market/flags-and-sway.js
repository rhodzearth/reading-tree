// ===== COUNTRY FLAGS (wave in the wind) + TREE SWAY =====
var FLG={},FLC2={},SWY=true,SLOW=0,SWOFF=0,FWD=46,FHT=30,FPH=78,SWK={tree:1,pine:1,bush:1,d_topiary:1};
(function(){if(!document.fonts||!document.fonts.load)return;document.fonts.load("44px 'Twemoji Country Flags'","\uD83C\uDDF5\uD83C\uDDED").then(function(){FLC2={};try{paint();drawAll()}catch(e){}}).catch(function(){})})();
function wnd(t){return Math.sin(t/2600)*.5+Math.sin(t/830+1.3)*.3+Math.sin(t/410)*.2} // gentle wind + small gusts
function swayOk(k){return SWK[k]===1||(!!FTD[k]&&!FTD[k].animal)}
function swayK(it,t){var h=aph(it.id),u=((t+h*1500)%5000)/5000,e=u<.5?Math.sin(u*2*Math.PI):0; // sways for the first half of every 5 seconds, then rests
 return e*(.30*(Math.sin(t/380+h*6.283)*.7+wnd(t)*.3)+.008*Math.sin(t/200+h*12.566))}
function flagCv(emo){var f=FLC2[emo],FF="44px 'Twemoji Country Flags','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",t,x,w,d,i,n,cx,cy,x0,x1,y0,y1,c2,cw,ch;
 if(f)return f;
 t=document.createElement("canvas");x=t.getContext("2d");x.font=FF;w=Math.ceil(x.measureText(emo).width)+6;
 t.width=w;t.height=60;x.font=FF;x.textBaseline="middle";x.fillText(emo,3,31);
 x0=w;x1=0;y0=60;y1=0;
 try{d=x.getImageData(0,0,w,60).data;
  for(i=3;i<d.length;i+=4)if(d[i]>24){n=(i-3)/4;cx=n%w;cy=(n-cx)/w;if(cx<x0)x0=cx;if(cx>x1)x1=cx;if(cy<y0)y0=cy;if(cy>y1)y1=cy}}catch(e){}
 if(x1<x0){x0=0;x1=w-1;y0=0;y1=59}
 cw=x1-x0+1;ch=y1-y0+1;c2=document.createElement("canvas");c2.width=cw;c2.height=ch;
 c2.getContext("2d").drawImage(t,x0,y0,cw,ch,0,0,cw,ch);
 return FLC2[emo]={c:c2,w:cw,h:ch}}
function flagPole(p,h){var x=p[0],y=p[1];shade(p,9,3.5,.3);
 X.fillStyle="#cfd5db";X.fillRect(x-1.6,y-h,1.7,h);X.fillStyle="#7c848c";X.fillRect(x+.1,y-h,1.5,h);
 dot(x,y-h-1.5,2.7,"#e6c04a");dot(x-.7,y-h-2.2,.9,"#fff3b0")}
// amp = 0 draws the flag still (market picture); amp > 0 waves it
function flagDraw(p,emo,t,amp,ph){var f=flagCv(emo),x0=p[0]+1.4,y0=p[1]-FPH+1,N=8,sw=f.w/N,dw=FWD/N,i,o,v,a;
 flagPole(p,FPH);
 if(!amp){X.drawImage(f.c,0,0,f.w,f.h,x0,y0,FWD,FHT);return}
 for(i=0;i<N;i++){v=t/260-i*.8+ph;o=Math.sin(v)*amp*(i+.5)/N;
  X.drawImage(f.c,i*sw,0,sw,f.h,x0+i*dw,y0+o,dw+.6,FHT);
  a=Math.cos(v)*.09;if(i){X.fillStyle=a>0?"rgba(0,0,0,"+a.toFixed(3)+")":"rgba(255,255,255,"+(-a).toFixed(3)+")";X.fillRect(x0+i*dw,y0+o,dw+.6,FHT)}}}

