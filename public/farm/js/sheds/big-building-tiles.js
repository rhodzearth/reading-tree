 (function(){
 Object.keys(FOOT).concat(["h_tent","h_hut","h_shed","h_cabin","h_cottage","h_beach","h_eco","h_yurt","h_stone","h_blue","h_pink"]).forEach(function(k){var b=HB[k],w,n,s;if(!b||BSC[k])return;w=b[2]-b[0];n=footN(k);s=Math.min(87*n/w,n===1?1.15:99);BSC[k]=s;HB[k]=[b[0]*s,b[1]*s,b[2]*s,b[3]*s]})})();
 BSC.windmill=2.9;BSC.greenhouse=2.2;["windmill","greenhouse"].forEach(function(k){var b=HB[k],s=BSC[k];HB[k]=[b[0]*s,b[1]*s,b[2]*s,b[3]*s]});
function bigSprite(kind,dpr){var key=kind+"@B@"+dpr,s=SPR[key],bs=BSC[kind],q,c,cx,oX,oG,p=[130,170];if(s)return s;
 q=Math.min(dpr,1200/(260*bs));c=document.createElement("canvas");c.width=Math.max(8,Math.round(260*bs*q));c.height=Math.max(8,Math.round(220*bs*q));cx=c.getContext("2d");cx.setTransform(q*bs,0,0,q*bs,0,0);
 oX=X;oG=G;X=cx;G={ox:130,oy:170,TW:112,TH:56,cols:4,rows:2};if(DEC[kind])DEC[kind](p,0);X=oX;G=oG;SPR[key]=c;SPRN++;return c}
function coveredByBig(c,r,ig){var L=S.dc||[],i,x,w,h;for(i=0;i<L.length;i++){x=L[i];w=footW(x.k);h=footH(x.k);if(w*h>1&&!x.s&&!(ig&&ig.t==="d"&&ig.id===x.id)&&c>=x.c&&c<x.c+w&&r>=x.r&&r<x.r+h)return true}return false}
var _tileFree4=tileFree;
tileFree=function(c,r,ig,k){var w,h,i,j;if(k===undefined)k=curK(ig);w=footW(k);h=footH(k);
 if(OUTI[k]||(isFlagK(k)&&!inLandP(parS(),c,r)))return _tileFree4(c,r,ig,k);
 for(i=0;i<w;i++)for(j=0;j<h;j++){if(!_tileFree4(c+i,r+j,ig,k))return false;if(coveredByBig(c+i,r+j,ig))return false}
 return true};
var _freeTile0=freeTile;
freeTile=function(k){var nw=footW(k),nh=footH(k),P=parS(),BX=wbox0(FW,S.ls),occ={},i,q,sx=0,sy=0,cnt=0,mc,mr,best=null,bd=1e18,c,r,v,a,b,ok;
 for(i=0;i<S.np;i++){q=S.pp[i];if(q){sx+=q[0];sy+=q[1];cnt++;occ[flKey(q[0],q[1])]=1}}
 (S.dc||[]).forEach(function(o){var mw,mh,a2,b2;if(o.s)return;sx+=o.c;sy+=o.r;cnt++;if(isF(o.k))return;mw=footW(o.k);mh=footH(o.k);for(a2=0;a2<mw;a2++)for(b2=0;b2<mh;b2++)occ[flKey(o.c+a2,o.r+b2)]=1});
 mc=cnt?sx/cnt:(FW-1)/2;mr=cnt?sy/cnt:(FH-1)/2;
 for(r=BX.r0;r<BX.r1;r++)for(c=BX.c0;c<BX.c1;c++){ok=1;
  for(a=0;a<nw&&ok;a++)for(b=0;b<nh;b++){if(!inLandP(P,c+a,r+b)||occ[flKey(c+a,r+b)]||flAt(c+a,r+b)==="wt"){ok=0;break}}
  if(!ok)continue;v=(c-mc)*(c-mc)+(r-mr)*(r-mr);if(v<bd){bd=v;best=[c,r]}}
 return best};
var _grpOf0=grpOf;
grpOf=function(s){var k=gkey(s);if(k&&footW(k)*footH(k)>1)return[s];return _grpOf0(s)};
var _layFreeAt0=layFreeAt;
layFreeAt=function(c,r,ig){var o=ig&&ig.t==="d"?LAY.dc.filter(function(x){return x.id===ig.id})[0]:null,w=footW(o&&o.k),h=footH(o&&o.k),i,j;
 for(i=0;i<w;i++)for(j=0;j<h;j++){if(!_layFreeAt0(c+i,r+j,ig))return false;
  if(LAY.dc.some(function(x){var mw=footW(x.k),mh=footH(x.k);return mw*mh>1&&!x.s&&!(ig&&ig.t==="d"&&ig.id===x.id)&&c+i>=x.c&&c+i<x.c+mw&&r+j>=x.r&&r+j<x.r+mh}))return false}
 return true};
