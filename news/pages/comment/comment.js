Page({
  data:{
    flag:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id=options.id;
    var self=this;
    wx.request({
      url:"http://news-at.zhihu.com/api/4/story/"+id+"/long-comments",
      success:function(res){
        var long=new Array;
        var cm=res.data.comments;
        for(var i=0;i<cm.length;i++){
           var obj=new Object;
           obj.content=cm[i].content;
           obj.author=cm[i].author;
           obj.avatar="//images.weserv.nl/?url="+cm[i].avatar.slice(7);
           long.push(obj);
        }
        console.log(long)
        self.setData({
          long:long
        })
      }
    })
    wx.request({
      url:"http://news-at.zhihu.com/api/4/story/"+id+"/short-comments",
      success:function(res){
        var short=new Array;
        var cm=res.data.comments;
        for(var i=0;i<cm.length;i++){
           var obj=new Object;
           obj.content=cm[i].content;
           obj.author=cm[i].author;
           obj.avatar="//images.weserv.nl/?url="+cm[i].avatar.slice(7);
           short.push(obj);
        }
        self.setData({
          short:short
        })
      }
    })
    if(this.data.shot||this.data.long){
      this.setData({
        flag:true
      })
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})