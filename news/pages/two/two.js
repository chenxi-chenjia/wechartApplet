Page({
    data:{

    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        var id=options.id;
        var self=this;
        wx.request({
            url:"http://news-at.zhihu.com/api/4/theme/"+id,
            success:function(res){
                console.log(res);
                var title=res.data.name;
                var backimg="//images.weserv.nl/?url="+res.data.background.slice(7);
                var description=res.data.description;
                var list=res.data.stories;
                var img="//images.weserv.nl/?url="+res.data.editors[0].avatar.slice(7);
                var ator=res.data.editors[0].name;
                var lists=[];
                for(var i=0;i<list.length;i++){
                    var obj={};
                    if(list[i].images){
                        obj.img="//images.weserv.nl/?url="+list[i].images[0].slice(7);
                    }else{
                        obj.img="img/img.png";
                    }
                    obj.title=list[i].title;
                    obj.id=list[i].id;
                    lists.push(obj);
                }
                self.setData({
                    title:title,
                    backimg:backimg,
                    description:description,
                    list:lists,
                    img:img,
                    ator:ator
                })
            }
        })
    },
    onReady:function(){
        // 页面渲染完成
        wx.setNavigationBarTitle({
            title: this.data.title
        })
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