 // ===== REALISTIC ICONS: 6 vegetables + every flower =====
ICD.scallion=[24,43,1.6];
ICD.red_cabbage=[24,37,2.2];
ICD.squash=[24,40,1.8];
ICD.kohlrabi=[24,42,1.7];
ICD.lemongrass=[24,43,1.7];
ICD.malunggay=[24,44,1.35];
Object.keys(FLW).forEach(function(k){ICD[k]=[24,45,1]});
function flowerIcon(id){var F=FLW[id],st=F.st,r=11,hy=-27,A="#3f9a2c",B="#62b83e";
 if(st==="spike"){r=8;hy=-22}else if(st==="orchid"||st==="iris"){r=9.5;hy=-26}else if(st==="lotus"){r=10;hy=-24}else if(st==="tulip"){r=10;hy=-25}
 // stem with a light edge
 X.lineCap="round";X.strokeStyle="#3a8226";X.lineWidth=2.8;X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(-2.5,hy*.5,0,hy+r*.3);X.stroke();
 X.strokeStyle="#86d45e";X.lineWidth=.9;X.beginPath();X.moveTo(-.8,0);X.quadraticCurveTo(-3.3,hy*.5,-.8,hy+r*.3);X.stroke();X.lineCap="butt";
 // leaves
 leaf(-7,-8,8,2.8,-.45,A);leaf(7,-13,8,2.8,.45,B);leaf(-5.5,-18,5.5,2.2,-.6,B);
 X.strokeStyle="rgba(210,245,170,.45)";X.lineWidth=.7;X.beginPath();X.moveTo(-3,-6);X.lineTo(-11,-10);X.moveTo(3,-11);X.lineTo(11,-15);X.stroke();
 // flower head with a soft shadow for depth
 X.save();X.shadowColor="rgba(40,20,30,.45)";X.shadowBlur=2.5;X.shadowOffsetY=1;fhead(F,0,hy,r);X.restore();
 // small shine so the petals look glossy
 if(st!=="spike"&&st!=="cluster")leaf(-r*.3,hy-r*.35,r*.22,r*.1,-.6,"rgba(255,255,255,.45)")}
function cropIcon(id){var dpr=Math.min(3,window.devicePixelRatio||1),key=id+"@"+dpr;if(CI[key])return CI[key];
 var P=ICD[id],c=document.createElement("canvas"),cx,oX=X;c.width=c.height=Math.round(48*dpr);cx=c.getContext("2d");cx.setTransform(dpr,0,0,dpr,0,0);
 cx.fillStyle="rgba(10,25,5,.22)";cx.beginPath();cx.ellipse(P[0],P[1]+1,13,4,0,0,7);cx.fill();
 cx.translate(P[0],P[1]);cx.scale(P[2],P[2]);X=cx;if(FLW[id])flowerIcon(id);else if(!newCrop2(id,0,0,1,true,0,1))newCrop(id,0,0,1,true,0,1);X=oX;
 return CI[key]=c.toDataURL()}
function iconOf(c){return ICD[c.id]?"<img src='"+cropIcon(c.id)+"' style='width:34px;height:34px;display:block;margin:0 auto'>":c.icon}
