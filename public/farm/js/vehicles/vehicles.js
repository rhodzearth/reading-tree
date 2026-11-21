/* ===== VEHICLES (real size): 1 tile = 2.5 m, so 1 m = 25 px. A 1.7 m driver is about 42 px tall. ===== */
FOOT.v_wagon=1;FOOT.v_car=1;FOOT.v_pickup=1;FOOT.v_tractor=1;FOOT.v_van=1;FOOT.v_jeepney=1;
var VEH={},VLEN={v_bike:"1.8 m long",v_moto:"2.1 m long",v_trike:"2.6 m long",v_wagon:"4.2 m long",v_cart:"2.4 m long",v_car:"4.0 m long",v_pickup:"5.0 m long",v_tractor:"4.0 m long",v_van:"4.9 m long",v_jeepney:"6.2 m long"};
function vxcrop(id){var n=footN(id);return n<2?[70,90,120,120]:n<3?[40,40,180,180]:[20,30,190,190]}
// u = along the vehicle (toward the lower right), v = across (toward the lower left), z = height. All in metres.
function vxP(o,u,v,z){return[o[0]+(u-v)*22.4,o[1]+(u+v)*11.2-z*25]}
function vxq(o,a,f,s,lw){poly(a.map(function(q){return vxP(o,q[0],q[1],q[2])}),f,s,lw)}
function vxbox(o,u0,u1,v0,v1,z0,z1,c,ec){var st="rgba(0,0,0,.25)";
 vxq(o,[[u0,v1,z0],[u1,v1,z0],[u1,v1,z1],[u0,v1,z1]],cmul(c,.8),st,.7);
 vxq(o,[[u1,v0,z0],[u1,v1,z0],[u1,v1,z1],[u1,v0,z1]],cmul(ec||c,1),st,.7);
 vxq(o,[[u0,v0,z1],[u1,v0,z1],[u1,v1,z1],[u0,v1,z1]],cmul(c,1.15),st,.7)}
function vxsh(o,L,W){X.save();X.translate(o[0],o[1]);X.transform(22.4,11.2,-22.4,11.2,0,0);X.fillStyle="rgba(10,20,5,.3)";X.beginPath();X.ellipse(0,0,L/2+.25,W/2+.25,0,0,7);X.fill();X.restore()}
function vxdisc(c,r,col){X.save();X.translate(c[0],c[1]);X.transform(22.4,11.2,0,-25,0,0);X.fillStyle=col;X.beginPath();X.arc(0,0,r,0,7);X.fill();X.restore()}
function vxdiscE(c,r,col){X.save();X.translate(c[0],c[1]);X.transform(-22.4,11.2,0,-25,0,0);X.fillStyle=col;X.beginPath();X.arc(0,0,r,0,7);X.fill();X.restore()}
function vxl(o,a,b,c,w){var p=vxP(o,a[0],a[1],a[2]),q=vxP(o,b[0],b[1],b[2]);X.strokeStyle=c;X.lineWidth=w;X.lineCap="round";X.beginPath();X.moveTo(p[0],p[1]);X.lineTo(q[0],q[1]);X.stroke();X.lineCap="butt"}
function vxring(o,u,v,zc,r,col,w){var c=vxP(o,u,v,zc);X.save();X.translate(c[0],c[1]);X.transform(22.4,11.2,0,-25,0,0);X.strokeStyle=col;X.lineWidth=w;X.beginPath();X.arc(0,0,r,0,7);X.stroke();X.restore()}
function vxringH(o,u,v,z,r,col,w){var c=vxP(o,u,v,z);X.save();X.translate(c[0],c[1]);X.transform(22.4,11.2,-22.4,11.2,0,0);X.strokeStyle=col;X.lineWidth=w;X.beginPath();X.arc(0,0,r,0,7);X.stroke();X.restore()}
function vxwheel(o,u,v,r,rim,t,lug,arch){var c=vxP(o,u,v,r),i,a;t=t||.2;
 if(arch)vxdisc(vxP(o,u,v+.01,r*1.12),r*1.2,"#15171a");
 vxdisc(vxP(o,u,v-t,r),r,"#0b0b0c");
 for(i=1;i<5;i++)vxdisc(vxP(o,u,v-t*(1-i/5),r),r,"#111113");
 vxdisc(c,r,"#1c1c1f");
 if(lug){X.save();X.translate(c[0],c[1]);X.transform(22.4,11.2,0,-25,0,0);X.strokeStyle="#09090a";X.lineWidth=r*.1;X.beginPath();for(i=0;i<18;i++){a=i*.349;X.moveTo(Math.cos(a)*r*.8,Math.sin(a)*r*.8);X.lineTo(Math.cos(a)*r*.99,Math.sin(a)*r*.99)}X.stroke();X.restore()}
 vxdisc(c,r*.64,"#2a2a2e");vxdisc(c,r*.5,rim||"#c9ced4");vxdisc(c,r*.2,"#5a6068")}
// a person (for scale): hip point, feet, hand, shirt colour, cap colour, how far he leans forward
function vxman(h,fs,hd,sh,cap,lean){var s=[h[0]+lean,h[1]-12.5],hc=[s[0]+lean*.3,s[1]-5.2],i,f,k;
 X.lineCap="round";X.lineJoin="round";
 for(i=fs.length-1;i>=0;i--){f=fs[i];k=[(h[0]+f[0])/2+3.5,(h[1]+f[1])/2-2.5];X.strokeStyle=i?"#2b3750":"#3a4a68";X.lineWidth=4.2;X.beginPath();X.moveTo(h[0],h[1]);X.lineTo(k[0],k[1]);X.lineTo(f[0],f[1]);X.stroke();dot(f[0]+1,f[1],2.1,"#1d1d20")}
 X.strokeStyle=sh;X.lineWidth=6.5;X.beginPath();X.moveTo(h[0],h[1]);X.lineTo(s[0],s[1]);X.stroke();
 X.strokeStyle=cmul(sh,.85);X.lineWidth=3.2;X.beginPath();X.moveTo(s[0],s[1]);X.lineTo((s[0]+hd[0])/2+1.5,(s[1]+hd[1])/2+2);X.lineTo(hd[0],hd[1]);X.stroke();
 X.lineCap="butt";dot(hc[0],hc[1],3.1,"#e6b58c");
 if(cap){X.fillStyle=cap;X.beginPath();X.arc(hc[0],hc[1]-.4,3.4,Math.PI,0);X.fill()}}
// car cabin with a sloped windshield
function vxcab(o,u0,u1,ra,fa,w,z0,zt,c,gl,mid){var st="rgba(0,0,0,.25)",fl=.09/(zt-z0),fh=1-fl,zl=z0+.09,zh=zt-.09,gw=w-.07,um;
 vxq(o,[[u0+ra,-w,zt],[u1-fa,-w,zt],[u1-fa,w,zt],[u0+ra,w,zt]],cmul(c,1.15),st,.7);
 vxq(o,[[u1,-w,z0],[u1,w,z0],[u1-fa,w,zt],[u1-fa,-w,zt]],cmul(c,.95),st,.7);
 vxq(o,[[u1-fa*fl,-gw,zl],[u1-fa*fl,gw,zl],[u1-fa*fh,gw,zh],[u1-fa*fh,-gw,zh]],gl);
 vxq(o,[[u0,w,z0],[u1,w,z0],[u1-fa,w,zt],[u0+ra,w,zt]],cmul(c,.8),st,.7);
 vxq(o,[[u0+ra*fl+.1,w,zl],[u1-fa*fl-.08,w,zl],[u1-fa*fh-.08,w,zh],[u0+ra*fh+.08,w,zh]],gl,"rgba(0,0,0,.3)",.7);
 if(mid){um=(u0+u1)/2+(ra-fa)*.25;vxl(o,[um,w,zl],[um,w,zh],cmul(c,.8),2.2)}}
// round hay bale lying on its side
function vxcyl(o,u,v0,v1,z,r,c1,c2){var i,k=8,c;
 for(i=0;i<k;i++)vxdisc(vxP(o,u,v0+(v1-v0)*i/k,z),r,c1);
 vxdisc(vxP(o,u,v1,z),r,c2);c=vxP(o,u,v1,z);
 X.save();X.translate(c[0],c[1]);X.transform(22.4,11.2,0,-25,0,0);X.strokeStyle="rgba(120,85,25,.55)";X.lineWidth=.03;[.8,.6,.4,.2].forEach(function(m){X.beginPath();X.arc(0,0,r*m,0,7);X.stroke()});X.restore()}
// a motorcycle at side offset v0 (also used for the tricycle)
function vxmoto(o,v0,col,rid,shirt,cap){var r=.32,P=function(u,v,z){return[u,v0+v,z]},b;
 vxwheel(o,-.68,v0,r,"#aeb4ba",.12);vxwheel(o,.68,v0,r,"#aeb4ba",.12);
 vxl(o,P(.68,0,.32),P(.46,0,.98),"#b8bec6",2.8);
 vxbox(o,-.82,-.45,v0-.1,v0+.1,.7,.8,col);
 vxbox(o,-.55,0,v0-.15,v0+.15,.78,.87,"#1b1b1d");
 vxbox(o,-.28,.3,v0-.13,v0+.13,.3,.66,"#4a4f57");
 vxbox(o,-.02,.46,v0-.17,v0+.17,.68,.96,col);
 vxl(o,P(-.2,.16,.34),P(-.82,.16,.38),"#9aa0a8",3.4);
 b=vxP(o,.52,v0,.94);dot(b[0],b[1],2.6,"#fff7c0");
 vxl(o,P(.45,-.34,1.05),P(.45,.34,1.05),"#222222",2.4);
 if(rid)vxman(vxP(o,-.28,v0,.92),[vxP(o,.12,v0+.14,.34),vxP(o,.12,v0-.14,.34)],vxP(o,.45,v0+.3,1.05),shirt,cap,5)}

VEH.v_bike=function(p){var o=p,r=.34,Rw=[-.52,0,r],Fw=[.52,0,r],Bb=[-.1,0,.3],Sj=[-.17,0,.84],Hd=[.4,0,.9],pd;vxsh(o,1.9,.5);
 vxring(o,-.52,0,r,r,"#1b1b1e",.075);vxring(o,.52,0,r,r,"#1b1b1e",.075);
 vxring(o,-.52,0,r,r*.86,"#c9ced4",.02);vxring(o,.52,0,r,r*.86,"#c9ced4",.02);
 vxl(o,Rw,Bb,"#a8281e",2.2);vxl(o,Rw,Sj,"#a8281e",2);vxl(o,Bb,Sj,"#c9362a",2.4);vxl(o,Sj,Hd,"#c9362a",2.4);vxl(o,Bb,Hd,"#d9422f",2.6);
 vxl(o,Hd,Fw,"#8a8f96",2.2);vxl(o,Sj,[-.2,0,.98],"#6a7078",2);
 vxl(o,[-.34,0,1.0],[-.1,0,1.0],"#1d1d20",3.6);
 vxl(o,Hd,[.37,0,1.05],"#6a7078",2.2);vxl(o,[.37,-.3,1.05],[.37,.3,1.05],"#222222",2.4);
 pd=vxP(o,-.02,0,.16);vxl(o,Bb,[-.02,0,.16],"#8a8f96",2);dot(pd[0],pd[1],1.6,"#222222");
 vxman(vxP(o,-.22,0,1.05),[vxP(o,-.02,0,.2),vxP(o,-.2,0,.5)],vxP(o,.37,.2,1.05),"#2f8f4a","#f2c230",5)};

VEH.v_moto=function(p){vxsh(p,2.2,.6);vxmoto(p,0,"#c8281e",1,"#2f6fb5","#d9d9d9")};

VEH.v_trike=function(p){var o=p,c="#2f7bd6";vxsh(o,2.9,1.7);
 vxl(o,[.6,-.5,.95],[.6,-.5,1.9],"#777d84",2.4);
 vxmoto(o,-.3,c,0);
 vxbox(o,-.45,.85,.2,.8,.3,.72,c);
 vxbox(o,-.45,-.3,.24,.76,.72,1.18,"#e8e4d8");
 vxl(o,[.7,.8,.72],[.7,.8,1.9],"#777d84",2.4);vxl(o,[-.45,.8,.72],[-.45,.8,1.9],"#777d84",2.4);
 vxwheel(o,.15,.92,.3,"#aeb4ba",.12);
 vxbox(o,-.65,.9,-.6,.9,1.9,1.97,"#e9eaee",c);
 vxdiscE(vxP(o,.86,.5,.55),.1,"#fff4b8")};

VEH.v_cart=function(p){var o=p,r=.23;vxsh(o,2.6,1.4);
 vxwheel(o,-.7,-.62,r,"#c9ced4",.14);vxwheel(o,.75,-.62,r,"#c9ced4",.14);
 vxbox(o,-1.2,1.2,-.6,.6,.24,.5,"#f2f0e8");
 vxbox(o,.45,1.2,-.6,.6,.5,.88,"#f2f0e8");
 vxbox(o,-1.2,-.78,-.55,.55,.5,.72,"#2f7d32");
 vxbox(o,-.7,-.05,-.52,.52,.5,.62,"#e8dcc0");
 vxbox(o,-.78,-.62,-.52,.52,.62,1.12,"#e8dcc0");
 vxl(o,[.5,.2,.62],[.32,.2,1.0],"#2a2a2e",2.2);vxl(o,[.28,.05,1.0],[.4,.35,1.0],"#2a2a2e",2.6);
 vxq(o,[[.52,-.58,.88],[.52,.58,.88],[.42,.58,1.4],[.42,-.58,1.4]],"rgba(170,215,235,.45)","#8a9096",1.2);
 [[-.95,-.55],[-.95,.55],[.5,-.55],[.5,.55]].forEach(function(q){vxl(o,[q[0],q[1],.55],[q[0],q[1],1.88],"#777d84",2.2)});
 vxbox(o,-1.1,.75,-.65,.65,1.88,1.95,"#f6f4ee");
 vxwheel(o,-.7,.62,r,"#c9ced4",.14);vxwheel(o,.75,.62,r,"#c9ced4",.14);
 vxq(o,[[1.21,-.5,.62],[1.21,-.3,.62],[1.21,-.3,.72],[1.21,-.5,.72]],"#fff7c0");
 vxq(o,[[1.21,.3,.62],[1.21,.5,.62],[1.21,.5,.72],[1.21,.3,.72]],"#fff7c0")};

VEH.v_wagon=function(p){var o=p,w="#a8743a",k;vxsh(o,4.4,2.3);
 vxwheel(o,-.9,-.95,.45,"#b8bec6",.2);vxwheel(o,1.0,-.95,.45,"#b8bec6",.2);
 vxbox(o,-1.8,1.8,-.95,.95,.5,1.15,w);
 vxl(o,[1.8,0,.6],[2.5,0,.42],"#2a2d31",3.6);
 vxq(o,[[-1.7,-.85,1.15],[1.7,-.85,1.15],[1.7,.85,1.15],[-1.7,.85,1.15]],"#d9b955");
 for(k=-3;k<=3;k++)vxl(o,[k*.5,.955,.52],[k*.5,.955,1.13],"rgba(60,35,10,.45)",1.1);
 vxl(o,[-1.8,.955,.82],[1.8,.955,.82],"rgba(60,35,10,.35)",1.1);
 vxcyl(o,-.7,-.6,.6,1.7,.6,"#c9a548","#e6c964");
 vxcyl(o,.6,-.6,.6,1.7,.6,"#c9a548","#e6c964");
 vxwheel(o,-.9,1.0,.45,"#b8bec6",.2);vxwheel(o,1.0,1.0,.45,"#b8bec6",.2)};

VEH.v_car=function(p){var o=p,c="#c9302c",gl="rgba(150,205,232,.92)";vxsh(o,4.2,1.9);
 vxwheel(o,1.25,-.85,.3,"#c9ced4",.2);vxwheel(o,-1.25,-.85,.3,"#c9ced4",.2);
 vxbox(o,-2,2,-.85,.85,.28,.78,c);
 vxbox(o,2,2.1,-.8,.8,.3,.5,"#2a2d31");vxbox(o,-2.1,-2,-.8,.8,.3,.5,"#2a2d31");
 vxcab(o,-1.2,.9,.45,.6,.74,.78,1.4,c,gl,1);
 vxq(o,[[2.02,.45,.52],[2.02,.8,.52],[2.02,.8,.68],[2.02,.45,.68]],"#fff4b8");
 vxq(o,[[2.02,-.8,.52],[2.02,-.45,.52],[2.02,-.45,.68],[2.02,-.8,.68]],"#fff4b8");
 vxq(o,[[2.02,-.32,.36],[2.02,.32,.36],[2.02,.32,.56],[2.02,-.32,.56]],"#23262b");
 vxl(o,[.05,.86,.32],[.05,.86,.76],"rgba(0,0,0,.35)",1);
 vxl(o,[.2,.86,.66],[.5,.86,.66],"#d8dde2",1.6);
 vxbox(o,.75,.95,.85,1.0,.86,.96,"#2a2d31");
 vxwheel(o,1.25,.85,.3,"#c9ced4",.2,0,1);vxwheel(o,-1.25,.85,.3,"#c9ced4",.2,0,1)};

VEH.v_pickup=function(p){var o=p,c="#2f6fb5",gl="rgba(150,205,232,.92)",st="rgba(0,0,0,.25)";vxsh(o,5.2,2.1);
 vxwheel(o,1.6,-.92,.38,"#c9ced4",.22);vxwheel(o,-1.55,-.92,.38,"#c9ced4",.22);
 vxq(o,[[-2.4,-.82,.85],[-.85,-.82,.85],[-.85,.82,.85],[-2.4,.82,.85]],"#26292e");
 vxq(o,[[-2.4,-.82,.85],[-.85,-.82,.85],[-.85,-.82,1.1],[-2.4,-.82,1.1]],cmul(c,.55),st,.6);
 vxq(o,[[-2.4,-.82,.85],[-2.4,.82,.85],[-2.4,.82,1.1],[-2.4,-.82,1.1]],cmul(c,.65),st,.6);
 vxq(o,[[-2.5,-.92,1.1],[-.75,-.92,1.1],[-.75,-.82,1.1],[-2.5,-.82,1.1]],cmul(c,1.15),st,.6);
 vxq(o,[[-2.5,-.92,1.1],[-2.4,-.92,1.1],[-2.4,.92,1.1],[-2.5,.92,1.1]],cmul(c,1.15),st,.6);
 vxq(o,[[-2.5,.82,1.1],[-.75,.82,1.1],[-.75,.92,1.1],[-2.5,.92,1.1]],cmul(c,1.15),st,.6);
 vxq(o,[[-2.5,.92,.34],[-.75,.92,.34],[-.75,.92,1.1],[-2.5,.92,1.1]],cmul(c,.8),st,.7);
 vxbox(o,-.75,2.5,-.92,.92,.34,1.0,c);
 vxcab(o,-.75,.75,.15,.5,.82,1.0,1.75,c,gl,1);
 vxbox(o,2.5,2.6,-.85,.85,.38,.6,"#2a2d31");
 vxq(o,[[2.52,-.45,.64],[2.52,.45,.64],[2.52,.45,.92],[2.52,-.45,.92]],"#23262b");
 vxq(o,[[2.52,.55,.72],[2.52,.85,.72],[2.52,.85,.9],[2.52,.55,.9]],"#fff4b8");
 vxq(o,[[2.52,-.85,.72],[2.52,-.55,.72],[2.52,-.55,.9],[2.52,-.85,.9]],"#fff4b8");
 vxl(o,[.1,.93,.4],[.1,.93,1.0],"rgba(0,0,0,.35)",1);
 vxbox(o,.5,.7,.92,1.05,1.05,1.2,"#2a2d31");
 vxwheel(o,1.6,.92,.38,"#c9ced4",.22,0,1);vxwheel(o,-1.55,.92,.38,"#c9ced4",.22,0,1)};

VEH.v_tractor=function(p){var o=p,c="#2f8a32",y="#e6b422";vxsh(o,4.4,2.6);
 vxwheel(o,-.95,-1.05,.78,y,.45,1);vxwheel(o,1.45,-.95,.5,y,.3,1);
 vxbox(o,-1.5,-.55,-.7,.7,.5,1.1,"#3a8f3d");
 vxbox(o,-.55,.2,-.5,.5,.55,.68,"#2f7a32");
 vxl(o,[-1.15,-.6,1.1],[-1.15,-.6,2.5],"#2a2d31",3.2);vxl(o,[-1.15,.6,1.1],[-1.15,.6,2.5],"#2a2d31",3.2);vxl(o,[-1.15,-.6,2.5],[-1.15,.6,2.5],"#2a2d31",3.2);
 vxbox(o,-1.1,-1.0,-.28,.28,1.2,1.65,"#222222");
 vxbox(o,-1.0,-.6,-.28,.28,1.1,1.2,"#222222");
 vxman(vxP(o,-.78,0,1.3),[vxP(o,-.05,.2,.8),vxP(o,-.05,-.2,.8)],vxP(o,.02,.2,1.54),"#c9473f","#e6c25a",3);
 vxbox(o,.2,2,-.45,.45,.75,1.5,c);
 vxbox(o,2,2.06,-.4,.4,.8,1.35,"#2a2d31");
 vxq(o,[[.2,.455,.95],[2,.455,.95],[2,.455,1.05],[.2,.455,1.05]],y);
 vxl(o,[1.45,-.95,.5],[1.45,.95,.5],"#2a2d31",3.6);
 vxl(o,[1.3,.25,1.5],[1.3,.25,2.25],"#3a3d42",3.4);
 vxl(o,[.12,0,1.1],[0,0,1.5],"#222222",2.4);
 vxringH(o,0,0,1.52,.26,"#222222",.06);
 vxwheel(o,-.95,1.05,.78,y,.45,1);vxwheel(o,1.45,.95,.5,y,.3,1);
 vxbox(o,-1.6,-.25,.62,1.2,1.62,1.7,c);
 vxdiscE(vxP(o,2.07,.28,1.12),.09,"#fff4b8");vxdiscE(vxP(o,2.07,-.28,1.12),.09,"#fff4b8")};

VEH.v_van=function(p){var o=p,c="#f4f2ec",gl="rgba(150,205,232,.92)",st="rgba(0,0,0,.25)";vxsh(o,5.0,2.15);
 vxwheel(o,1.6,-.97,.33,"#c9ced4",.22);vxwheel(o,-1.5,-.97,.33,"#c9ced4",.22);
 vxbox(o,-2.45,2.45,-.975,.975,.3,1.0,c);
 vxbox(o,-2.45,.95,-.975,.975,1.0,2.15,c);
 vxq(o,[[.95,-.975,2.15],[.95,.975,2.15],[1.75,.975,1.0],[1.75,-.975,1.0]],cmul(c,.92),st,.7);
 vxq(o,[[1.0,-.88,2.05],[1.0,.88,2.05],[1.68,.88,1.12],[1.68,-.88,1.12]],gl);
 vxq(o,[[.95,.975,1.0],[1.75,.975,1.0],[.95,.975,2.15]],cmul(c,.8),st,.7);
 vxq(o,[[.12,.985,1.3],[1.45,.985,1.3],[.93,.985,1.97],[.12,.985,1.97]],gl,"rgba(0,0,0,.3)",.7);
 vxl(o,[.12,.985,1.0],[.12,.985,2.15],"rgba(0,0,0,.3)",1.2);
 vxq(o,[[-2.4,.985,1.45],[-.1,.985,1.45],[-.1,.985,1.7],[-2.4,.985,1.7]],"#2f8a32");
 vxq(o,[[-2.4,.985,1.7],[-.1,.985,1.7],[-.1,.985,1.78],[-2.4,.985,1.78]],"#f2c230");
 vxbox(o,2.45,2.55,-.9,.9,.3,.52,"#2a2d31");
 vxq(o,[[2.47,-.4,.6],[2.47,.4,.6],[2.47,.4,.9],[2.47,-.4,.9]],"#23262b");
 vxq(o,[[2.47,.55,.66],[2.47,.9,.66],[2.47,.9,.84],[2.47,.55,.84]],"#fff4b8");
 vxq(o,[[2.47,-.9,.66],[2.47,-.55,.66],[2.47,-.55,.84],[2.47,-.9,.84]],"#fff4b8");
 vxbox(o,1.2,1.35,.975,1.15,1.5,1.72,"#2a2d31");
 vxwheel(o,1.6,.97,.33,"#c9ced4",.22,0,1);vxwheel(o,-1.5,.97,.33,"#c9ced4",.22,0,1)};

VEH.v_jeepney=function(p){var o=p,c="#f2c230",gl="rgba(150,205,232,.92)",k,u,sd=[-1,1];vxsh(o,6.4,2.3);
 vxwheel(o,-1.9,-1.0,.37,"#c9ced4",.22);vxwheel(o,2.3,-.93,.37,"#c9ced4",.22);
 vxbox(o,-3.1,1.9,-1,1,.45,2.1,c);
 vxq(o,[[1.9,-.9,1.25],[1.9,.9,1.25],[1.9,.9,1.98],[1.9,-.9,1.98]],gl,"#555555",1);
 vxbox(o,1.9,3.1,-.9,.9,.4,1.1,c);
 vxbox(o,3.1,3.2,-.82,.82,.4,.56,"#d8dde2");
 for(k=0;k<5;k++){u=-2.85+k*.97;vxq(o,[[u,1.01,1.3],[u+.82,1.01,1.3],[u+.82,1.01,1.98],[u,1.01,1.98]],gl,"rgba(0,0,0,.35)",1)}
 for(k=0;k<10;k++)vxq(o,[[-3.1+k*.5,1.01,.45],[-2.6+k*.5,1.01,.45],[-2.6+k*.5,1.01,.58],[-3.1+k*.5,1.01,.58]],k%2?"#2f8a32":"#d63a2a");
 vxq(o,[[-3.1,1.01,.62],[1.9,1.01,.62],[1.9,1.01,.76],[-3.1,1.01,.76]],"#d63a2a");
 vxq(o,[[-3.1,1.01,.76],[1.9,1.01,.76],[1.9,1.01,.9],[-3.1,1.01,.9]],"#2a5fb0");
 vxq(o,[[1.9,.91,.62],[3.1,.91,.62],[3.1,.91,.76],[1.9,.91,.76]],"#d63a2a");
 vxq(o,[[1.9,.91,.76],[3.1,.91,.76],[3.1,.91,.9],[1.9,.91,.9]],"#2a5fb0");
 vxbox(o,-3.2,2,-1.1,1.1,2.1,2.2,"#e8e8e8");
 sd.forEach(function(s){vxl(o,[-3,s,2.42],[1.8,s,2.42],"#8a9096",1.6);[-3,-1.8,-.6,.6,1.8].forEach(function(uu){vxl(o,[uu,s,2.2],[uu,s,2.42],"#8a9096",1.6)})});
 vxq(o,[[3.115,-.55,.58],[3.115,.55,.58],[3.115,.55,1.02],[3.115,-.55,1.02]],"#2a2d31");
 for(k=0;k<6;k++)vxl(o,[3.12,-.5+k*.2,.62],[3.12,-.5+k*.2,1.0],"#e8ecf0",1.8);
 sd.forEach(function(s){vxdiscE(vxP(o,3.12,s*.74,.8),.16,"#d8dde2");vxdiscE(vxP(o,3.125,s*.74,.8),.12,"#fff4b8");
  vxl(o,[2.7,s*.45,1.1],[2.7,s*.45,1.36],"#f0f4f8",2.4);var hp=vxP(o,2.72,s*.45,1.42);dot(hp[0],hp[1],2,"#f0f4f8")});
 vxbox(o,2.0,2.15,1.0,1.18,1.4,1.62,"#2a2d31");
 vxwheel(o,-1.9,1.0,.37,"#c9ced4",.22,0,1);vxwheel(o,2.3,.93,.37,"#c9ced4",.22,0,1)};

// every drawing is wrapped so a mistake in one vehicle can never break the whole farm
var VSC={v_bike:1,v_moto:1,v_trike:.83,v_cart:.92,v_wagon:.55,v_car:.57,v_pickup:.46,v_tractor:.55,v_van:.48,v_jeepney:.375};
Object.keys(VEH).forEach(function(id){DEC[id]=function(p,st){var s=VSC[id]||1;try{X.save();X.translate(p[0],p[1]);X.scale(s,s);VEH[id]([0,0],st)}catch(e){}X.restore()}});
HB.v_bike=[-34,-60,34,14];HB.v_moto=[-38,-66,38,14];HB.v_trike=[-50,-66,50,22];HB.v_cart=[-44,-62,44,18];
HB.v_wagon=[-92,-90,92,40];HB.v_car=[-92,-70,92,42];HB.v_pickup=[-110,-80,110,44];HB.v_tractor=[-96,-92,96,42];HB.v_van=[-110,-90,110,44];HB.v_jeepney=[-120,-100,120,48];
Object.keys(VSC).forEach(function(id){var b=HB[id],s=VSC[id];if(b)HB[id]=[b[0]*s,b[1]*s,b[2]*s,b[3]*s]});
