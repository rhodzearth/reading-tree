$("mMulti").onclick=function(){MULTI=!MULTI;this.innerHTML="&#129530; Multi-buy: "+(MULTI?"ON":"OFF");toast(MULTI?"Multi-buy ON: items go straight to your barn, market stays open":"Multi-buy OFF: you place each item")};
$("saveBtn").onclick=function(){busyShow("Saving your farm...");
 flush(function(){call("farmState",[TOKEN],function(s){setState(s);busyHide();toast("\u2705 Progress saved")},function(m){busyHide();toast("Could not save: "+m)})})};

