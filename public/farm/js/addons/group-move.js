/* ===== GROUP MOVE: tap = centre of the group, plus arrow nudges (normal editor and Layout editor) ===== */
function gMid(list,posf){var c0=1e9,c1=-1e9,r0=1e9,r1=-1e9;
 list.forEach(function(s){var p=posf(s);if(!p)return;c0=Math.min(c0,p[0]);c1=Math.max(c1,p[0]);r0=Math.min(r0,p[1]);r1=Math.max(r1,p[1])});
 return c0>c1?null:[Math.floor((c0+c1)/2),Math.floor((r0+r1)/2)]}
// the tapped tile becomes the middle of the group
var _gt=gmoveTap;
gmoveTap=function(tc,tr){var a,m;
 if(GMOVE){a=getPos(GMOVE.anchor);m=gMid(GMOVE.list,getPos);if(a&&m){tc+=a[0]-m[0];tr+=a[1]-m[1]}}
 return _gt(tc,tr)};
var _lt=layGmoveTap;
layGmoveTap=function(tc,tr){var a,m;
 if(LGMOVE){a=layPos(LGMOVE.anchor);m=gMid(LGMOVE.list,layPos);if(a&&m){tc+=a[0]-m[0];tr+=a[1]-m[1]}}
 return _lt(tc,tr)};
// arrows: move the whole group by 1 tile and keep the group selected
function gShift(dc,dr){var g=GMOVE,a=g&&getPos(g.anchor);if(!a)return;
 _gt(a[0]+dc,a[1]+dr);
 if(!GMOVE){GMOVE=g;SEL=g.anchor;GPREV=g.list.map(getPos).filter(Boolean);editUI();drawAll()}}
function lShift(dc,dr){var g=LGMOVE,a=g&&layPos(g.anchor);if(!a)return;
 _lt(a[0]+dc,a[1]+dr);
 if(!LGMOVE){LGMOVE=g;SEL=g.anchor;GPREV=g.list.map(layPos).filter(Boolean);layUI();drawAll()}}
