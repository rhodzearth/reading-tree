// ---------- HOUSING: one generator, many designs ----------
function cmul(h,m){var n=parseInt(h.slice(1),16);return"rgb("+Math.min(255,Math.round((n>>16)*m))+","+Math.min(255,Math.round((n>>8&255)*m))+","+Math.min(255,Math.round((n&255)*m))+")"}
function house(p,c){var x=p[0],y=p[1],lu=c.u||34,lv=c.v||28,h=c.h||15,n=c.fl||1,r=c.r==null?14:c.r,i,f,z,g=c.g||"#a9dcef",tr=c.t||"#f2eee2",
 f0=BFp(x,y,lu,lv),wl=cmul(c.w,.78),wr=cmul(c.w,1),wt=cmul(c.w,1.12),ds=c.ds||"L",aF,aR,q,k;
 function win(face,ff,t,zz){var L=face==="L",len=L?lv:lu,a=L?LPt:RPt,w=.075,m1,m2;
  if(c.sh)[-1,1].forEach(function(s){var u=t+s*(w+.05);poly([a(ff,len,u-.025,zz),a(ff,len,u+.025,zz),a(ff,len,u+.025,zz+8),a(ff,len,u-.025,zz+8)],c.sh)});
  poly([a(ff,len,t-w,zz),a(ff,len,t+w,zz),a(ff,len,t+w,zz+8),a(ff,len,t-w,zz+8)],g,tr,1);
  X.strokeStyle=tr;X.lineWidth=.8;X.beginPath();m1=a(ff,len,t,zz);m2=a(ff,len,t,zz+8);X.moveTo(m1[0],m1[1]);X.lineTo(m2[0],m2[1]);
  m1=a(ff,len,t-w,zz+4);m2=a(ff,len,t+w,zz+4);X.moveTo(m1[0],m1[1]);X.lineTo(m2[0],m2[1]);X.stroke()}
 shade(p,(lu+lv)/2+6,(lu+lv)/4+3,.3);
 for(i=0;i<n;i++){z=i*h;ibx(x,y-z,lu,lv,h,wl,wr,wt);f=BFp(x,y-z,lu,lv);if(c.pl)plank(f,lu,lv,h,Math.round(lu/6));
  [["L",lv],["R",lu]].forEach(function(o){var onD=(i===0&&o[0]===ds),ps=onD?(o[1]<22?[]:(o[1]>50?[.17,.3,.7,.83]:[.2,.8])):(o[1]>50?[.15,.32,.5,.68,.85]:(o[1]>30?[.25,.75]:[.5]));ps.forEach(function(t){win(o[0],f,t,h*.35)})})}
 q=ds==="L"?[LPt,lv]:[RPt,lu];
 poly([q[0](f0,q[1],.4,0),q[0](f0,q[1],.6,0),q[0](f0,q[1],.6,11),q[0](f0,q[1],.4,11)],c.d||"#6b3a1e",tr,1);
 k=q[0](f0,q[1],.56,5);dot(k[0],k[1],.9,"#e0cb82");
 groof(x,y,lu,lv,n*h,r,c.rc,c.hip?cmul(c.rc,.78):wl,"rgba(0,0,0,.3)");
 if(c.ch){aF=[f0[0]-lv/2,f0[1]-n*h-lv/4-r];aR=[f0[0]+lu-lv/2,f0[1]-n*h-lu/2-lv/4-r];q=[aF[0]+(aR[0]-aF[0])*.7,aF[1]+(aR[1]-aF[1])*.7];
  poly([[q[0]-3,q[1]+4],[q[0]+3,q[1]+4],[q[0]+3,q[1]-7],[q[0]-3,q[1]-7]],"#8a4a3a","#4a2418",.8);X.fillStyle="#3a1a12";X.beginPath();X.ellipse(q[0],q[1]-7,3,1.3,0,0,7);X.fill()}
 if(c.bu){blob(f0[0]-9,f0[1]+3,5,["#74c446","#2a6c22"]);blob(f0[0]+10,f0[1]+2,4.5,["#74c446","#2a6c22"]);dot(f0[0]-9,f0[1]+1,1.1,"#ff7aa0");dot(f0[0]+10,f0[1],1.1,"#ffe14d")}}
var HOUSES={
h_hut:{u:24,v:22,r:10,w:"#d9bc6a",rc:"#b8923c",hip:1,ds:"R"},
h_shed:{u:26,v:20,r:8,w:"#9c7a54",rc:"#6b6f74",pl:1},
h_cabin:{u:36,v:28,w:"#8a5a34",rc:"#5a3a22",pl:1,ch:1},
h_cottage:{w:"#f2e6cc",rc:"#c9473f",ch:1,sh:"#4a8a4a",bu:1},
h_beach:{u:28,v:24,r:11,w:"#7fc8d8",rc:"#f2eee2",hip:1,sh:"#e8604a"},
h_eco:{u:34,v:28,r:12,w:"#8cc07a",rc:"#3f7a3a",bu:1,ch:1},
h_stone:{w:"#a9a49a",rc:"#6b4a38",ch:1,sh:"#5a3a22",ds:"R"},
h_blue:{w:"#8fb8d8",rc:"#35577a",ch:1,sh:"#ffffff"},
h_pink:{w:"#f0b4c4",rc:"#a8456a",ch:1,sh:"#ffffff",bu:1},
h_mint:{u:42,v:30,r:11,w:"#a8dcc0",rc:"#3f7a62",sh:"#ffffff",ds:"R"},
h_lav:{fl:2,w:"#c8b0e8",rc:"#6a4a9a",sh:"#ffffff",ch:1},
h_farm:{u:40,v:32,fl:2,w:"#f4efe4",rc:"#8f2f28",ch:1,sh:"#2f6a8a"},
h_yellow:{fl:2,w:"#f2d870",rc:"#c9702a",sh:"#c9702a"},
h_brick:{fl:2,w:"#b5543f",rc:"#4a4a52",ch:1,t:"#e8dcc0"},
h_tudor:{u:40,v:32,fl:2,w:"#e8dcc0",rc:"#4a2f22",ch:1,sh:"#5a3a22"},
h_chalet:{u:38,v:30,fl:2,r:18,w:"#b88a58",rc:"#6a3a22",pl:1,ch:1,sh:"#c9473f"},
h_barnh:{u:44,v:34,fl:2,r:16,w:"#b8342a",rc:"#4a4a4e",sh:"#f2eee2"},
h_townO:{u:28,v:26,fl:3,r:12,w:"#f0a050",rc:"#7a3a2a",sh:"#7a3a2a",ch:1},
h_townG:{u:28,v:26,fl:3,r:12,w:"#aeb4bc",rc:"#3a4048",sh:"#3a4048",ch:1},
h_terra:{u:44,v:32,fl:2,r:10,w:"#f0d4a8",rc:"#c4663a",bu:1,sh:"#3a7a8a"},
h_modern:{u:36,v:30,fl:2,r:3,w:"#dfe5ea",rc:"#3a4048",hip:1,g:"#7fc0e0"},
h_lodge:{u:46,v:36,fl:2,w:"#7a5a3c",rc:"#2f4a38",pl:1,ch:1,sh:"#2f4a38"},
h_white:{u:44,v:34,fl:2,w:"#fbfaf6",rc:"#3a4a5a",ch:1,sh:"#3a4a5a",bu:1},
h_towerh:{u:28,v:28,fl:4,r:22,w:"#9a968a",rc:"#7a2a28",hip:1,sh:"#5a3a22"},
h_manor:{u:46,v:36,fl:3,w:"#d8c8a8",rc:"#5a4a6a",ch:1,sh:"#5a4a6a",bu:1},
h_mansion:{u:48,v:40,fl:3,r:18,w:"#f0e8d8",rc:"#2f3a5a",ch:1,sh:"#2f3a5a",bu:1},
hh_grandfarm:{u:56,v:44,fl:2,r:20,w:"#f6f0e2",rc:"#8f2f28",ch:1,sh:"#2f6a8a",bu:1},
hh_bahay:{u:60,v:44,fl:2,r:18,w:"#d9d2c0",rc:"#a8452f",ch:1,sh:"#8a5a34",pl:1,bu:1},
hh_villa:{u:62,v:46,fl:2,r:14,w:"#f4e2bc",rc:"#c4663a",ch:1,sh:"#3a7a8a",bu:1,hip:1},
hh_lodge:{u:62,v:48,fl:3,r:26,w:"#9a6a40",rc:"#2f4a38",pl:1,ch:1,sh:"#c9473f"},
hh_estate:{u:60,v:46,fl:3,r:20,w:"#e6d6b4",rc:"#4a3a5a",ch:1,sh:"#4a3a5a",bu:1},
hh_hotel:{u:64,v:44,fl:4,r:6,w:"#e8c8a0",rc:"#7a3a2a",sh:"#7a3a2a",bu:1,g:"#9fd0e8"},
hh_palace:{u:64,v:50,fl:4,r:24,w:"#f2ecde",rc:"#2f4a8a",ch:1,sh:"#2f4a8a",bu:1,hip:1},
hh_castle:{u:56,v:56,fl:5,r:26,w:"#a9a49a",rc:"#5a5a66",ch:1,sh:"#3a3a44",hip:1,t:"#d8d2c0"},
hh_skyscr:{u:44,v:44,fl:5,h:16,r:4,w:"#9fc0d8",rc:"#3a4048",g:"#cfeaf8",t:"#e8eef2",hip:1},

hh_mega:{u:68,v:52,fl:4,r:22,w:"#fbfaf6",rc:"#2a3550",ch:1,sh:"#2a3550",bu:1,g:"#8fcfe8"},

// ---- 20 NEW HOUSE DESIGNS ----
h_river:{u:38,v:30,fl:2,r:12,w:"#b8d8c8",rc:"#3c7658",ch:1,sh:"#ffffff",bu:1},
h_japanese:{u:40,v:32,fl:2,r:18,w:"#d9b98b",rc:"#8b342a",ch:1,sh:"#5a3a22",hip:1},
h_coastal:{u:44,v:32,fl:2,r:10,w:"#d9edf0",rc:"#277b91",ch:1,sh:"#ffffff",bu:1},
h_green:{u:38,v:30,fl:2,r:12,w:"#a8c98b",rc:"#47723c",ch:1,sh:"#ffffff",bu:1},
h_pavilion:{u:42,v:34,fl:1,r:20,w:"#a77b4f",rc:"#5a3924",pl:1,hip:1},
h_french:{u:44,v:34,fl:2,r:16,w:"#ead8bd",rc:"#52718a",ch:1,sh:"#ffffff"},
h_swiss:{u:42,v:34,fl:2,r:24,w:"#c99a65",rc:"#5a3824",pl:1,ch:1,sh:"#c9473f"},
h_desert:{u:38,v:30,fl:1,r:10,w:"#d8b77d",rc:"#a66a38",ch:1,sh:"#70452b"},
h_tropical:{u:44,v:32,fl:1,r:15,w:"#e8d5a8",rc:"#367b58",bu:1,sh:"#ffffff"},
h_lakeside:{u:44,v:34,fl:2,r:12,w:"#a8cbd8",rc:"#416b83",ch:1,sh:"#ffffff",bu:1},
h_clock:{u:30,v:30,fl:4,h:14,r:22,w:"#d8c49c",rc:"#60422d",hip:1,ch:1},
h_mill:{u:42,v:34,fl:2,r:20,w:"#b68b5e",rc:"#65442b",pl:1,ch:1,sh:"#e8d6b4"},
h_oriental:{u:40,v:34,fl:3,r:24,w:"#d8b98a",rc:"#9b342a",hip:1,ch:1,sh:"#b8352b"},
h_victorian:{u:44,v:34,fl:3,r:18,w:"#d8b9c5",rc:"#55445d",ch:1,sh:"#ffffff",bu:1},
h_mediterranean:{u:48,v:36,fl:2,r:14,w:"#f0dfbd",rc:"#bd6745",ch:1,sh:"#3a7182",bu:1},
h_courtyard:{u:52,v:42,fl:2,r:16,w:"#d9d0bd",rc:"#66546c",ch:1,sh:"#ffffff",bu:1},
h_terrace:{u:46,v:36,fl:3,r:14,w:"#c9b49a",rc:"#6d5b4a",ch:1,sh:"#ffffff",bu:1},
h_observatory:{u:38,v:36,fl:3,h:16,r:10,w:"#8ba8bd",rc:"#394d65",g:"#cfeaf8",hip:1},
hh_skyvilla:{u:64,v:48,fl:4,r:8,w:"#dce8ee",rc:"#334d69",ch:1,sh:"#ffffff",bu:1,g:"#9fd5ed"},
hh_royalestate:{u:68,v:54,fl:4,r:24,w:"#f0e6d0",rc:"#5a426f",ch:1,sh:"#5a426f",bu:1,hip:1}
};

Object.keys(HOUSES).forEach(function(id){var c=HOUSES[id],hw=((c.u||34)+(c.v||28))/2+4;
 DEC[id]=function(p){house(p,c)};HB[id]=[-hw,-((c.fl||1)*(c.h||15)+(c.r==null?14:c.r)+36),hw,8]});
DEC.h_tent=function(p){var x=p[0],y=p[1],P=[x,y+11],L=[x-27,y-2],R=[x+27,y-2],A=[x,y-36],k;shade(p,34,12,.3);
 poly([P,L,A],lg(x-27,0,x,0,[[0,"#c9473f"],[1,"#e8604a"]]),"#7a2a24",1);poly([P,R,A],lg(x,0,x+27,0,[[0,"#f2eee2"],[1,"#d9d2bd"]]),"#8a8470",1);
 X.strokeStyle="rgba(255,255,255,.45)";X.lineWidth=1;for(k=1;k<4;k++){X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(L[0]+(P[0]-L[0])*k/4,L[1]+(P[1]-L[1])*k/4);X.stroke()}
 poly([[x+3.5,y+9.3],[x+13.5,y+4.5],[x+8,y-14]],"#2a1c14");
 X.strokeStyle="#5a3b1e";X.lineWidth=1.4;X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(A[0],A[1]-9);X.stroke();poly([[A[0],A[1]-9],[A[0]+9,A[1]-6],[A[0],A[1]-3]],"#f4c21a")};
DEC.h_yurt=function(p){var x=p[0],y=p[1];shade(p,30,11,.3);
 X.fillStyle=lg(x-21,0,x+21,0,[[0,"#b9a77e"],[.4,"#f0e6c8"],[1,"#8f7f58"]]);X.fillRect(x-21,y-17,42,17);X.beginPath();X.ellipse(x,y,21,8,0,0,Math.PI);X.fill();
 X.strokeStyle="#c9473f";X.lineWidth=3;X.beginPath();X.ellipse(x,y-9,21,8,0,0,Math.PI);X.stroke();
 X.fillStyle=lg(x-24,0,x+24,0,[[0,"#8a6a44"],[.45,"#d0a868"],[1,"#6a4e2e"]]);X.beginPath();X.moveTo(x-24,y-16);X.quadraticCurveTo(x-6,y-24,x,y-42);X.quadraticCurveTo(x+6,y-24,x+24,y-16);X.ellipse(x,y-16,24,9,0,0,Math.PI);X.closePath();X.fill();
 poly([[x-5,y+7],[x+5,y+7],[x+5,y-4],[x,y-8],[x-5,y-4]],"#4a2e18","#f2eee2",1);dot(x,y-43,2,"#4a3418")};
DEC.h_lighthouse=function(p){var x=p[0],y=p[1],k,w0,w1,y0,y1,g;shade(p,24,9,.32);
 for(k=0;k<4;k++){y0=y-k*17;y1=y-(k+1)*17;w0=14-k*1.7;w1=14-(k+1)*1.7;
  X.fillStyle=lg(x-w0,0,x+w0,0,[[0,k%2?"#cfcfc6":"#a8352a"],[.4,k%2?"#fff":"#e8604a"],[1,k%2?"#a8a89e":"#7a2420"]]);
  X.beginPath();X.moveTo(x-w0,y0);X.lineTo(x-w1,y1);X.lineTo(x+w1,y1);X.lineTo(x+w0,y0);X.closePath();X.fill()}
 poly([[x-3,y],[x+3,y],[x+3,y-9],[x-3,y-9]],"#4a2e18");dot(x+1,y-33,1.8,"#27394a");dot(x+1,y-50,1.8,"#27394a");
 X.fillStyle="#2a2e34";X.fillRect(x-12,y-71,24,3);
 g=X.createRadialGradient(x,y-76,2,x,y-76,30);g.addColorStop(0,"rgba(255,235,150,.55)");g.addColorStop(1,"rgba(255,235,150,0)");X.fillStyle=g;X.beginPath();X.arc(x,y-76,30,0,7);X.fill();
 poly([[x-6,y-71],[x+6,y-71],[x+6,y-83],[x-6,y-83]],"#ffe9a0","#2a2e34",1.2);
 poly([[x-8,y-83],[x,y-93],[x+8,y-83]],"#a8352a","#6a1e18",1);dot(x,y-95,1.6,"#2a2e34")};
HB.h_tent=[-30,-70,30,12];HB.h_yurt=[-26,-82,26,12];HB.h_lighthouse=[-20,-126,20,10];
DEC.stoplight=function(p){var x=p[0],y=p[1],g,k,cy=[-82,-71,-60],on=[0,0,1],c1=["#7a1a14","#7a5a10","#3a8a3a"],c2=["#ff3a2a","#ffc21a","#4cff6a"];shade(p,12,4.5,.3);
 X.fillStyle="#2c3238";X.beginPath();X.ellipse(x,y-1,7,3,0,0,7);X.fill();X.fillRect(x-4,y-6,8,5);
 X.fillStyle=lg(x-2,0,x+2,0,[[0,"#23282d"],[.5,"#566069"],[1,"#23282d"]]);X.fillRect(x-1.8,y-52,3.6,48);
 poly([[x-9,y-92],[x+9,y-92],[x+9,y-50],[x-9,y-50]],lg(x-9,0,x+9,0,[[0,"#1d2126"],[.5,"#3a4048"],[1,"#15181c"]]),"#0e1013",1.4);
 for(k=0;k<3;k++){
  if(on[k]){g=X.createRadialGradient(x,y+cy[k],1,x,y+cy[k],20);g.addColorStop(0,"rgba(90,255,120,.55)");g.addColorStop(1,"rgba(90,255,120,0)");X.fillStyle=g;X.beginPath();X.arc(x,y+cy[k],20,0,7);X.fill()}
  poly([[x-6.5,y+cy[k]-6.5],[x+6.5,y+cy[k]-6.5],[x+5,y+cy[k]-4.5],[x-5,y+cy[k]-4.5]],"#0e1013");
  blob(x,y+cy[k],4.8,on[k]?[c2[k],c1[k]]:[c1[k],"#1a1c20"]);
  if(on[k])dot(x-1.6,y+cy[k]-1.8,1.3,"rgba(255,255,255,.75)")}
 poly([[x-10,y-92],[x+10,y-92],[x+7,y-96],[x-7,y-96]],"#2a2e34","#0e1013",1)};
 HB.stoplight=[-14,-100,14,6];
 var _stopOld=DEC.stoplight;
DEC.stoplight=function(p,st){var fo=[[0,-28],[56,0],[0,28],[-56,0]][(st||0)&3];_stopOld([p[0]+fo[0],p[1]+fo[1]])};

