var date=new Date();
var amt=require("../../API/animate.js");
Page({
        data:{
        imgUrls:[],
        flag:true,
        menufalg:true
    },
    onReady:function(){
        var self=this;
        wx.request({
            url:"http://news-at.zhihu.com/api/4/news/latest",
            success:function(res){
                var imgarr=new Array;
                var img=res.data.top_stories;
                for(var i=0;i<img.length;i++){
                    var newimg=self.mring(img[i]);
                    imgarr.push(newimg);
                }
                var news=new Array;
                for(var i=0;i<res.data.stories.length;i++){
                    var obj={};
                    obj.title=res.data.stories[i].title;
                    obj.img="//images.weserv.nl/?url="+res.data.stories[i].images[0].slice(7);
                    obj.id=res.data.stories[i].id;
                    news.push(obj);
                }
                self.setData({
                    imgl:imgarr,
                    news:news,
                })
            }
        })
        wx.request({
            url:"http://news-at.zhihu.com/api/4/themes",
            success:function(res){
                self.setData({
                    menu:res.data.others
                })
            }
        })
    },
    mring:function(img){
        var newurl="//images.weserv.nl/?url="+img.image.slice(7);
        return newurl;
    },
    onReachBottom:function(){
        var self=this;
        wx.showToast({
            title:"小知正在努力加载中...",
            icon:"loading",
            duration:10000
        })
        if(self.data.flag){
            var lds=self.gds(date);
            var ld=self.gd(date);
            date=new Date(lds);
            self.setData({
                flag:false,
            })
            wx.request({
                url:"http://news.at.zhihu.com/api/4/news/before/"+ld,
                success:function(res){
                    var news=self.data.news;
                    for(var i=0;i<res.data.stories.length;i++){
                        var obj={};
                        obj.title=res.data.stories[i].title;
                        obj.img="//images.weserv.nl/?url="+res.data.stories[i].images[0].slice(7);
                        obj.id=res.data.stories[i].id;
                        news.push(obj);
                    }
                    self.setData({
                        news:news,
                        flag:true
                    })
                     wx.showToast({
                        title:"加载完成",
                        icon:"success",
                        duration:1000
                    })
                }
            })
        }
    },
    gds:function(td){
        var date=td;
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate()-1;
        m=(m<10)?("0"+m):m;
        d=(d<10)?("0"+d):d;
        var r=y+","+m+","+d;
        return (y+","+m+","+d);
    },
    gd:function(d){
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var d=d.getDate();
        m=(m<10)?("0"+m):m;
        d=(d<10)?("0"+d):d;
        return (""+y+m+d);
    },
    gotap:function(e){
        var self=this;
        var id=e.currentTarget.dataset.id;
        var img=e.currentTarget.dataset.img;
        var title=e.currentTarget.dataset.title;
        wx.showActionSheet({
            itemList:["分享","查看"],
            success:function(res){
                if(res.tapIndex===0){
                    wx.showModal({
                        title:"分享",
                        content:"亲,你的朋友需要它",
                        cancelText:"残忍拒绝",
                        confirmText:"分享"
                    })
                }else if(res.tapIndex===1){
                    wx.navigateTo({
                        url:"../show/show?id="+id,
                        success:function(){
                            self.setData({
                                showId:id,
                                showImg:img,
                                showTitle:title
                            })
                        }
                    })
                }
            }
        })
    },
    menushow:function(){
        if(this.data.menuflag){
            this.setData({
                mam:amt.ms().export(),
                menuflag:false
            })
        }else{
            this.setData({
                mam:amt.mh().export(),
                menuflag:true
            })
        }
    },
    menuhide:function(){
        this.setData({
            mam:amt.mh().export(),
            menuflag:true
        })
    }

})