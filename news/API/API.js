var api={
	news:{},
	get:function(){
		var that=this;
		var newsdata;
		wx.request({
			url:"http://news-at.zhihu.com/api/4/news/latest",
			success:function(res){
				newsdata=res;
			}
		})
		return newsdata;
	},
	getlm:function(obj){
		var lmarr=[];
		console.log(obj);
		var limg=obj.data.top_stories;
		for(var i=0;i<limg.length;i++){
			lmarr.push(limg[i].image);
		}
		return lmarr;
	},
	getNews:function(obj){
		return obj.data.stories;
	},
	newsimg:function(img){//处理图片
		var newurl="//images.weserv.nl/?url="+img[i].image.slice(7);
		return newurl;
	}
};
module.exports=api;