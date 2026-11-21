// ===== NEW CROPS: more vegetables + 22 flowers =====
var FLW={
daisy:{st:"daisy",c1:"#ffffff",c2:"#e8eef4",cn:"#f5c518",n:12,h:22},
tulip:{st:"tulip",c1:"#e8334a",c2:"#ff7a8a",h:22},
marigold:{st:"ruff",c1:"#f59a0c",c2:"#ffc83a",cn:"#c96a08",n:12,h:18},
pansy:{st:"pansy",c1:"#6a3aa8",c2:"#c9a0f0",cn:"#ffd83a",h:14},
rose:{st:"rose",c1:"#c8102e",c2:"#f0485e",cn:"#7a0a1e",h:24},
petunia:{st:"trumpet",c1:"#d83aa0",c2:"#f58ad0",cn:"#fff2a0",h:16},
lavender:{st:"spike",c1:"#7a4fc0",c2:"#b89af0",h:20},
poppy:{st:"poppy",c1:"#e0201c",c2:"#ff6a4a",cn:"#2a1a1a",h:24},
cosmos:{st:"daisy",c1:"#f06aa8",c2:"#ffb0d4",cn:"#f5c518",n:8,h:26},
zinnia:{st:"ruff",c1:"#e8442a",c2:"#ff9a5a",cn:"#7a2a10",n:14,h:22},
carnation:{st:"ruff",c1:"#f04a7a",c2:"#ffa0bc",cn:"#d02a5a",n:16,h:22},
sampaguita:{st:"star",c1:"#ffffff",c2:"#f0f0e6",cn:"#e8e0a0",n:5,h:14},
hibiscus:{st:"trumpet",c1:"#e8102a",c2:"#ff5a6a",cn:"#ffd83a",h:20,stam:1},
lily:{st:"star",c1:"#ff8a1c",c2:"#ffc060",cn:"#7a3a08",n:6,h:26},
snapdragon:{st:"spike",c1:"#f0b020",c2:"#ffe070",h:20},
iris:{st:"iris",c1:"#3a4ac8",c2:"#8a9af0",cn:"#ffd83a",h:26},
peony:{st:"rose",c1:"#f07aa8",c2:"#ffc4dc",cn:"#d04a88",h:22},
dahlia:{st:"ruff",c1:"#a8186a",c2:"#e04a98",cn:"#6a0a40",n:18,h:24},
chrysanthemum:{st:"ruff",c1:"#f5c518",c2:"#fff08a",cn:"#c98a08",n:20,h:22},
hydrangea:{st:"cluster",c1:"#5a7ae0",c2:"#a8c0ff",h:18},
orchid:{st:"orchid",c1:"#b03aa8",c2:"#f0a0e8",cn:"#ffe070",h:26},
lotus:{st:"lotus",c1:"#f07aa8",c2:"#ffd0e4",cn:"#f5c518",h:14}};
"kangkong pechay spinach mushroom turnip okra zucchini sweet_potato sitaw ampalaya celery leek kale cassava taro ube asparagus".split(" ").concat(Object.keys(FLW)).forEach(function(k){NEWC[k]=1});

// ===== 27 NEW FLOWERS (they use the existing flower shapes with new colours) =====
var NF={
buttercup:{st:"poppy",c1:"#f5d020",c2:"#fff07a",cn:"#c98a08",h:16},
forgetmenot:{st:"star",c1:"#4f8ff0",c2:"#a8d0ff",cn:"#ffe070",n:5,h:14},
violet:{st:"pansy",c1:"#4a2ab0",c2:"#9a7ae0",cn:"#ffe070",h:14},
primrose:{st:"star",c1:"#ffd83a",c2:"#fff3a0",cn:"#f08a1c",n:5,h:15},
gerbera:{st:"daisy",c1:"#ff5a2e",c2:"#ffa070",cn:"#3a2210",n:14,h:22},
anemone:{st:"poppy",c1:"#ffffff",c2:"#e6dcf8",cn:"#2a1a4a",h:20},
freesia:{st:"trumpet",c1:"#ffcf26",c2:"#fff08a",cn:"#ffffff",h:20},
gladiolus:{st:"spike",c1:"#ee5aa0",c2:"#ffb4d4",h:22},
delphinium:{st:"spike",c1:"#3a5ae0",c2:"#8aa4ff",h:22},
foxglove:{st:"spike",c1:"#b04ab8",c2:"#e8a0ee",h:22},
hollyhock:{st:"spike",c1:"#d82a4a",c2:"#ff8aa0",h:22},
camellia:{st:"rose",c1:"#f4a0bc",c2:"#fff0f4",cn:"#e0709a",h:20},
gardenia:{st:"rose",c1:"#f6f6e8",c2:"#ffffff",cn:"#cfc79a",h:18},
jasmine:{st:"star",c1:"#ffbcd8",c2:"#fff0f6",cn:"#f0a0c0",n:5,h:16},
magnolia:{st:"lotus",c1:"#fff0f6",c2:"#fbbcd4",cn:"#f5c518",h:16},
begonia:{st:"ruff",c1:"#e8445a",c2:"#ff9aa8",cn:"#f5c518",n:10,h:16},
impatiens:{st:"trumpet",c1:"#ff6a5a",c2:"#ffb0a0",cn:"#fff2a0",h:16},
ranunculus:{st:"rose",c1:"#ff8a3a",c2:"#ffc890",cn:"#c0501a",h:20},
lilac:{st:"cluster",c1:"#a070d8",c2:"#d8b8f4",h:20},
wisteria:{st:"cluster",c1:"#8a6ae0",c2:"#c4b0ff",h:22},
bluebell:{st:"star",c1:"#4a6ae0",c2:"#a0b4ff",cn:"#ffffff",n:6,h:18},
cherry_blossom:{st:"star",c1:"#ffaec8",c2:"#ffe0ec",cn:"#e04a7a",n:5,h:22},
protea:{st:"ruff",c1:"#e8546a",c2:"#ffa0a0",cn:"#f5e0a0",n:18,h:22},
bird_of_paradise:{st:"orchid",c1:"#ff7a1c",c2:"#3a8ae8",cn:"#ffe070",h:24},
anthurium:{st:"tulip",c1:"#ff3a5a",c2:"#ff8aa0",h:20},
water_lily:{st:"lotus",c1:"#b0d0ff",c2:"#f0f8ff",cn:"#ffd83a",h:14},
edelweiss:{st:"star",c1:"#f2f2e6",c2:"#ffffff",cn:"#f5d020",n:8,h:16}};
Object.assign(FLW,NF);
var NEWFL_IDS=Object.keys(NF);
NEWFL_IDS.forEach(function(k){NEWC[k]=1});

// ===== 6 NEW VEGETABLES =====
var NEWV={};
NEWV.scallion=function(x,y,pr,ripe,w,s){var k,h=20*s+4,bx,ex;X.lineCap="round";
 for(k=0;k<7;k++){bx=x+(k-3)*1.3;ex=bx+(k-3)*2.4*s+w*(.4+k*.05);
  X.strokeStyle=k%2?"#52ae3c":"#2f8a2e";X.lineWidth=2;X.beginPath();X.moveTo(bx,y-3);X.quadraticCurveTo(bx+(k-3)*1.1,y-h*.55,ex,y-h*(.85+(k%3)*.08));X.stroke()}
 X.strokeStyle="#f6f8e8";X.lineWidth=3;
 for(k=0;k<4;k++){X.beginPath();X.moveTo(x+(k-1.5)*2.4,y+.5);X.lineTo(x+(k-1.5)*2,y-5);X.stroke()}
 X.lineCap="butt";if(ripe)for(k=0;k<4;k++)dot(x+(k-1.5)*2.4,y+.6,1.9,"#fffdf2")};
NEWV.red_cabbage=function(x,y,pr,ripe,w,s){var R=3+5*s,hr;rosette(x,y,7,R,R*.55,"#6a3a7a","#8a52a0",1);
 if(pr>.35){hr=ripe?5.6:1.5+pr*5;blob(x,y-hr*.7,hr,ripe?["#c07ad8","#6a2a8a"]:["#a8d884","#4f8a4a"]);
  if(ripe){X.strokeStyle="rgba(255,255,255,.35)";X.lineWidth=.8;X.beginPath();X.arc(x,y-hr*.7,hr*.7,3.6,5.8);X.stroke();X.beginPath();X.arc(x,y-hr*.7,hr*.4,.5,2.6);X.stroke();
   leaf(x-hr*.35,y-hr*1.1,hr*.25,hr*.4,.6,"rgba(255,255,255,.45)")}}};
NEWV.squash=function(x,y,pr,ripe,w,s){var k,an,r;
 for(k=0;k<6;k++){an=k*1.05;leaf(x+Math.cos(an)*5*s+w*.3,y-3*s+Math.sin(an)*2*s,6*s+.8,3.6*s+.5,an,k%2?"#2f7a2c":"#4aa03a")}
 if(pr>.55){r=ripe?1:.45+(pr-.55)*1.2;X.save();X.translate(x+1,y+1);X.rotate(-.25);
  X.fillStyle=ripe?"#cf9a48":"#8db84e";X.beginPath();X.ellipse(0,-9*r,3.4*r,6.2*r,0,0,7);X.fill();
  blob(0,-1.5*r,5.2*r,ripe?["#f0c070","#b8803a"]:["#b8dc84","#5f9a3e"]);
  leaf(-1.8*r,-9*r,.9*r,3.6*r,.1,"rgba(255,255,255,.35)");
  X.strokeStyle="#5a7a2a";X.lineWidth=1.4;X.beginPath();X.moveTo(0,-15*r);X.lineTo(1.2*r,-17.5*r);X.stroke();X.restore()}};
NEWV.kohlrabi=function(x,y,pr,ripe,w,s){var k,an,ex,ey,r=pr>.4?(ripe?4.8:1.6+pr*3.2):0,by=y-r*1.6;
 if(r){blob(x,y-r*.9,r,ripe?["#d0a8e8","#7a4a9a"]:["#c0e69a","#5a9a4a"]);
  X.strokeStyle="rgba(255,255,255,.4)";X.lineWidth=.8;X.beginPath();X.arc(x,y-r*.9,r*.6,3.7,5.5);X.stroke();
  leaf(x-r*.4,y-r*1.3,r*.18,r*.35,.6,"rgba(255,255,255,.45)")}
 for(k=0;k<6;k++){an=-1.57+(k-2.5)*.4;ex=x+Math.cos(an)*13*s+w;ey=by+Math.sin(an)*13*s;
  stem2(x,by+1,ex,ey,"#7aa83a",1.3);leaf(ex,ey,4.2*s+1,2.3*s+.6,an+.3,k%2?"#3f9a3a":"#58b048")}};
NEWV.lemongrass=function(x,y,pr,ripe,w,s){var k,L=24*s+3,bx,ex,ey;X.lineCap="round";
 for(k=0;k<9;k++){bx=x+(k-4)*.9;ex=bx+(k-4)*3.2*s+w*(.5+k*.04);ey=y-L*(.6+(k%3)*.1);
  X.strokeStyle=k%2?"#86c23e":"#5fa42e";X.lineWidth=1.7;X.beginPath();X.moveTo(bx,y);X.quadraticCurveTo(bx+(k-4)*1.2,y-L*.85,ex,ey);X.stroke()}
 X.strokeStyle="#e6efb8";X.lineWidth=2.6;
 for(k=0;k<4;k++){X.beginPath();X.moveTo(x+(k-1.5)*2.2,y+.5);X.lineTo(x+(k-1.5)*1.9,y-4);X.stroke()}
 X.lineCap="butt";if(ripe)dot(x,y-2,2,"#f4f8d0")};
NEWV.malunggay=function(x,y,pr,ripe,w,s){var h=28*s+3,k,j,lx,ly,sd;
 X.strokeStyle="#8a6a3a";X.lineWidth=1.8;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+w*.3,y-h*.5,x+w*.6,y-h);X.stroke();
 for(k=0;k<5;k++){ly=y-h*(.25+k*.17);lx=x+w*(.1+k*.1);sd=k%2?1:-1;
  stem2(lx,ly,lx+sd*10*s,ly-2*s,"#6a9a3a",1);
  for(j=0;j<5;j++)dot(lx+sd*(2+j*2)*s,ly-2*s+(j%2?-1.5:1.5)*s,1.5*s+.6,j%2?"#4fae3a":"#6cc84a")}
 if(pr>.6)[[-3,-.4],[4,-.55]].forEach(function(o){var qx=x+o[0]+w*.3,qy=y+o[1]*h,L=ripe?15:3+(pr-.6)*30;
  X.lineCap="round";X.strokeStyle=ripe?"#6f8f2e":"#9ccc5a";X.lineWidth=1.7;X.beginPath();X.moveTo(qx,qy);X.quadraticCurveTo(qx+o[0]*.3,qy+L*.5,qx+o[0]*.2,qy+L);X.stroke();X.lineCap="butt"})};
Object.keys(NEWV).forEach(function(k){NEWC[k]=1});

