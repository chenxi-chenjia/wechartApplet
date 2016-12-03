Page({
  data:{
  },
  onLoad:function(option){
  	this.setData({
  		id:option.id,
  		img:option.img,
  		title:option.title
  	})
  	var self=this;
  	var id=option.id;
  	wx.request({
  		url:"http://news-at.zhihu.com/api/4/news/"+id,
  		success:function(res){
  			var title=res.data.title;
  			var img=res.data.images===undefined?"img/img.jpg":"//images.weserv.nl/?url="+res.data.images[0].slice(7);
  			var content=res.data.body;
        var c=content.replace(/<[^>]*>/g,"").replace(/&|[a-zA-Z]*/g,"");
  			self.setData({
  				content:c,
  				title:title,
  				img:img
  			})
  		}
  	})
    wx.request({
      url:"http://news-at.zhihu.com/api/4/story-extra/"+id,
      success:function(res){
        self.setData({
          znum:res.data.popularity
        }) 
      }
    })
  }
})