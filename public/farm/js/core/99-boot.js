if(!TOKEN)showMsg("Please log in to the Reading Tree first, then open Reading Farm from Settings > Games.");else{try{var cs=JSON.parse(localStorage.getItem("farmS2_"+TOKEN.slice(-12))||"null");if(cs&&cs.plots&&cs.pp){cs.out=null;cs.now=0;S=cs;$("main").style.display="";paint()}}catch(e){}
 try{Q=JSON.parse(localStorage.getItem(QK)||"[]")||[]}catch(e){Q=[]}
 if(Q.length){kick();flush(load)}else load()}
