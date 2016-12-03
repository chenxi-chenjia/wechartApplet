var clt=require("../../utils/util.js")
Page({
    data:{
        business:true,             //是否商业贷款
        accumulation:false,        //是否公积金贷款
        money:"0.00",              //每月月供参考
        insterest:"0.00",          // 支付总利息
        all:"0.00",                 // 还款金额
        loan:"商业贷款",             //贷款类型
        limit:"5",                  //期限
        businessRates:"4.75",        //商贷利率 
        providentRates:"2.75",      //公积金利率
        markflag:false,             //样式遮盖判断
        bm:0,                       //商贷金额
        am:0,                        //公积金贷款金额
        brates:[
            {name:"基准利率",rates:"4.75",id:0},
            {name:"7折利率",rates:"3.32",id:1},
            {name:"8折利率",rates:"3.80",id:2},
            {name:"8.3折利率",rates:"3.94",id:3},
            {name:"8.5折利率",rates:"4.04",id:4},
            {name:"8.8折利率",rates:"4.18",id:5},
            {name:"9折利率",rates:"4.28",id:6},
            {name:"9.5折利率",rates:"4.51",id:7},
            {name:"1.05倍利率",rates:"4.99",id:8},
            {name:"1.1倍利率",rates:"5.23",id:9},
            {name:"1.2倍利率",rates:"5.70",id:10},
            {name:"1.3倍利率",rates:"6.17",id:11}
        ],
        brate:[
            {name:"基准利率",rates:"4.9",id:0},
            {name:"7折利率",rates:"3.43",id:1},
            {name:"8折利率",rates:"3.92",id:2},
            {name:"8.3折利率",rates:"4.07",id:3},
            {name:"8.5折利率",rates:"4.17",id:4},
            {name:"8.8折利率",rates:"4.31",id:5},
            {name:"9折利率",rates:"4.41",id:6},
            {name:"9.5折利率",rates:"4.66",id:7},
            {name:"1.05倍利率",rates:"5.15",id:8},
            {name:"1.1倍利率",rates:"5.39",id:9},
            {name:"1.2倍利率",rates:"5.88",id:10},
            {name:"1.3倍利率",rates:"6.37",id:11}
        ],
        bid:0,
        aid:0,
        arates:[
            {name:"基准利率",rates:"2.75",id:0},
            {name:"1.1倍利率",rates:"3.03",id:1},
        ],
        arate:[
            {name:"基准利率",rates:"3.25",id:0},
            {name:"1.1倍利率",rates:"3.58",id:1},
        ]
    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
         var showamt=wx.createAnimation({
            transformOrigin:"0 0",
            duration:500,
            timingFunction:"ease-in-out"
        })
        showamt.translateY(0).step();
        var hideamt=wx.createAnimation({
            transformOrigin:"0 0",
            duration:500,
            timingFunction:"ease-in-out"
        })
        hideamt.translateY(240).step();
        this.setData({
            hideamt:hideamt.export(),
            showamt:showamt.export()
        })
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
    },
    type:function(){  //贷款类型
        var self=this;
        wx.showActionSheet({
            itemList:["商业贷款","公积金贷款","组合贷款"],
            success:function(res){
                if(res.tapIndex===0){
                    self.setData({
                        loan:"商业贷款",
                        business:true,
                        accumulation:false,
                        am:0
                     })
                }else if(res.tapIndex===1){
                    self.setData({
                        loan:"公积金贷款",
                        business:false,
                        accumulation:true,
                        bm:0
                    })
                }else if(res.tapIndex===2){
                    self.setData({
                        loan:"组合贷款",
                        business:true,
                        accumulation:true
                    })
                }
                var money,insterest,all;
                //商贷参数
                var br=self.data.businessRates;
                var bm=self.data.bm;
                // 公积金参数
                var am=self.data.am;
                var ar=self.data.providentRates;
                //期限
                var lm=self.data.limit;
                //算法
                money=(parseFloat(clt.pal.money(bm,br,lm))+parseFloat(clt.pal.money(am,ar,lm))).toFixed(2);
                insterest=(parseFloat(clt.pal.rat(bm,br,lm))+parseFloat(clt.pal.rat(am,ar,lm))).toFixed(2);
                all=(parseFloat(clt.pal.all(bm,br,lm))+parseFloat(clt.pal.all(am,ar,lm))).toFixed(2);
                self.setData({
                    money:money,
                    insterest:insterest,
                    all:all
                })
            }
        })
    },
    limit:function(){  //期限
        var self=this;
        wx.showActionSheet({
            itemList:["5","10","15","20","25","30"],
            success:function(res){
                var bid=self.data.bid;
                var aid=self.data.aid;
                if(res.tapIndex===0){
                    self.setData({
                        limit:"5",
                        businessRates:self.data.brates[bid].rates,
                        providentRates:self.data.arates[aid].rates
                    })
                }else if(res.tapIndex===1){
                    self.setData({
                        limit:"10",
                        businessRates:self.data.brate[bid].rates,
                        providentRates:self.data.arate[aid].rates
                    })
                }else if(res.tapIndex===2){
                    self.setData({
                        limit:"15",
                        businessRates:self.data.brate[bid].rates,
                        providentRates:self.data.arate[aid].rates
                    })
                }else if(res.tapIndex===3){
                    self.setData({
                        limit:"20",
                        businessRates:self.data.brate[bid].rates,
                        providentRates:self.data.arate[aid].rates
                    })
                }else if(res.tapIndex===4){
                    self.setData({
                        limit:"25",
                        businessRates:self.data.brate[bid].rates,
                        providentRates:self.data.arate[aid].rates
                    })
                }else if(res.tapIndex===5){
                    self.setData({
                        limit:"30",
                        businessRates:self.data.brate[bid].rates,
                        providentRates:self.data.arate[aid].rates
                    })
                }
                var money,insterest,all;
                //商贷参数
                var br=self.data.businessRates;
                var bm=self.data.bm;
                // 公积金参数
                var am=self.data.am;
                var ar=self.data.providentRates;
                //期限
                var lm=self.data.limit;
                //算法
                money=(parseFloat(clt.pal.money(bm,br,lm))+parseFloat(clt.pal.money(am,ar,lm))).toFixed(2);
                insterest=(parseFloat(clt.pal.rat(bm,br,lm))+parseFloat(clt.pal.rat(am,ar,lm))).toFixed(2);
                all=(parseFloat(clt.pal.all(bm,br,lm))+parseFloat(clt.pal.all(am,ar,lm))).toFixed(2);
                self.setData({
                    bm:bm,
                    money:money,
                    insterest:insterest,
                    all:all
                })
            }
        })
    },
    anmountRate:function(){ //商业利率点击事件
        this.setData({
            bnsta:this.data.showamt,
            markflag:true
        })
    },
    hide:function(){ //两个利率框隐藏
        this.setData({
            bnsta:this.data.hideamt,
            antra:this.data.hideamt,
            markflag:false
        })
    },
    providentRates:function(){ //公积金利率框
        this.setData({
            antra:this.data.showamt,
            markflag:true
        })
    },
    bnstap:function(res){ //商贷利率按钮
        var id=parseInt(res.target.id);
        if(this.data.limit==="5"){
            var businessRates=this.data.brates[id].rates;
        }else{
            var businessRates=this.data.brate[id].rates;
        }
        var money,insterest,all;
        //商贷参数
        var br=businessRates;
        var bm=this.data.bm;
        // 公积金参数
        var am=this.data.am;
        var ar=this.data.providentRates;
        //期限
        var lm=this.data.limit;
        //算法
        money=(parseFloat(clt.pal.money(bm,br,lm))+parseFloat(clt.pal.money(am,ar,lm))).toFixed(2);
        insterest=(parseFloat(clt.pal.rat(bm,br,lm))+parseFloat(clt.pal.rat(am,ar,lm))).toFixed(2);
        all=(parseFloat(clt.pal.all(bm,br,lm))+parseFloat(clt.pal.all(am,ar,lm))).toFixed(2);
        this.setData({
            businessRates:businessRates,
            bnsta:this.data.hideamt,
            antra:this.data.hideamt,
            markflag:false,
            bm:bm,
            money:money,
            insterest:insterest,
            all:all,
            bid:id
        })
    },
    antap:function(res){
        var id=parseInt(res.target.id);
        if(this.data.limit==="5"){
            var providentRates=this.data.arates[id].rates;
        }else{
            var providentRates=this.data.arate[id].rates;
        }
        var money,insterest,all;
        //商贷参数
        var br=this.data.businessRates;
        var bm=this.data.bm;
        // 公积金参数
        var am=this.data.am;
        var ar=providentRates;
        //期限
        var lm=this.data.limit;
        //算法
        money=(parseFloat(clt.pal.money(am,br,lm))+parseFloat(clt.pal.money(am,ar,lm))).toFixed(2);
        insterest=(parseFloat(clt.pal.rat(am,br,lm))+parseFloat(clt.pal.rat(am,ar,lm))).toFixed(2);
        all=(parseFloat(clt.pal.all(am,br,lm))+parseFloat(clt.pal.all(am,ar,lm))).toFixed(2);
        this.setData({
            providentRates:providentRates,
            bnsta:this.data.hideamt,
            antra:this.data.hideamt,
            markflag:false,
            bm:bm,
            am:am,
            money:money,
            insterest:insterest,
            all:all,
            aid:id
        })
    },
    bmont:function(res){  //输入框
        var pm=res.detail.value;
        var money,insterest,all;
        //商贷参数
        var br=this.data.businessRates;
        // 公积金参数
        var am=this.data.am;
        var ar=this.data.providentRates;
        //期限
        var lm=this.data.limit;
        //算法
        money=(parseFloat(clt.pal.money(pm,br,lm))+parseFloat(clt.pal.money(am,ar,lm))).toFixed(2);
        insterest=(parseFloat(clt.pal.rat(pm,br,lm))+parseFloat(clt.pal.rat(am,ar,lm))).toFixed(2);
        all=(parseFloat(clt.pal.all(pm,br,lm))+parseFloat(clt.pal.all(am,ar,lm))).toFixed(2);
        if(!parseInt(pm)){
            money=0.00;
            insterest=0.00;
            all=0.00;
            pm=0;
        }
        this.setData({
            bm:pm,
            money:money,
            insterest:insterest,
            all:all
        })
    },
    amont:function(res){
        var pm=res.detail.value;
        var money,insterest,all;
        //商贷参数
        var br=this.data.businessRates;
        var bm=this.data.bm;
        // 公积金参数
        var ar=this.data.providentRates;
        //期限
        var lm=this.data.limit;
        //算法
        money=(parseFloat(clt.pal.money(pm,ar,lm))+parseFloat(clt.pal.money(bm,br,lm))).toFixed(2);
        insterest=(parseFloat(clt.pal.rat(pm,ar,lm))+parseFloat(clt.pal.rat(bm,br,lm))).toFixed(2);
        all=(parseFloat(clt.pal.all(pm,ar,lm))+parseFloat(clt.pal.all(bm,br,lm))).toFixed(2);
        if(!parseInt(pm)){
            money=0.00;
            insterest=0.00;
            all=0.00;
            pm=0;
        }
        this.setData({
            am:pm,
            money:money,
            insterest:insterest,
            all:all
        }) 
    }


})