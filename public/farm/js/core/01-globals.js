var $=function(i){return document.getElementById(i)},TOKEN="",S=null,sel="strawberry",V=null,lastLvl=0,HV={f:-1,v:-1},ANIM=false;
var FW=8,FH=8,STAB="c";
var MOVING=false,MVT=0,MMT=0,MHT=0,PERF=false,LSDP=0,PWC={},PWN=0,CRM={},CRA=null,SOILC={},QL=false,DRAG_KEEP=.3;
function evict(C){var k=Object.keys(C),m=Math.ceil(k.length/3),i;for(i=0;i<m;i++)delete C[k[i]];return k.length-m} // drop the oldest third instead of everything
// while you drag or pinch: cheap drawing + only the geometry is recalculated
function fitMove(cv){var f=cv._fp;if(!f){fitAll();return}
 MOVING=true;clearTimeout(MVT);MVT=setTimeout(function(){MOVING=false;fitAll();saveView()},170);
 fit(cv,f[0],f[1],f[2],f[3],f[4]);if(f[5])grassBg($(f[5]),cv,f[6]);drawAll()}
 var ZOUT=1.5; // how far you can zoom out on big farms: .4 = about 40% on the notifier, .6 = 60%, 1 = the old max
 var MIRCR=[0,1,0,1]; // which rotations (0,90,180,270) mirror the items. [0,1,1,0] makes 180 look different too
 var DEFP=60; // default zoom on the notifier (1 = max in, 100 = max out). It can't go past the ZOUT cap.
 var SHOWTOK=false;var CAM=false,MULTI=false,UNDO=[],PBUY=0;
var SHOWMINI=true;try{SHOWMINI=localStorage.getItem("miniHide")!=="1"}catch(e){}
try{if(localStorage.getItem("treeNight")==="1")document.body.classList.add("night")}catch(e){}
