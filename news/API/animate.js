var amt={
	mh:function(){
		var mam= wx.createAnimation({
            transformOrigin:"0 50%",
            duration:500,
            timingFunction:"ease-in-out",
            delay:0
        })
        mam.translateX(-400).step();
        return mam;
	},
	ms:function(){
		var mam= wx.createAnimation({
            transformOrigin:"0 50%",
            duration:500,
            timingFunction:"ease-in-out",
            delay:0
        })
        mam.translateX(0).step();
        return mam;
	}
}
module.exports=amt;