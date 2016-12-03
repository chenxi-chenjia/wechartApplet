var clt={
  pal:{ //等额本息
    money:function(all,rate,time){
      //参数 贷款金额  利率  时间 
      var all=parseFloat(all);
      var rate=parseFloat(rate);
      var time=parseFloat(time);
      var m=(all*(rate/1200)*Math.pow((1+rate/1200),(time*12)))/(Math.pow((1+rate/1200),(time*12))-1)*10000;
      m=m.toFixed(2);
      return m;
    },
    rat:function(all,rate,time){
      var all=parseFloat(all);
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var m=(all*(rate/1200)*Math.pow((1+rate/1200),(time*12)))/(Math.pow((1+rate/1200),(time*12))-1)*10000;
      var ar=m*(time*12)-all*10000;
      ar=ar.toFixed(2);
      return ar
    },
    all:function(all,rate,time){
      var all=parseFloat(all);
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var m=(all*(rate/1200)*Math.pow((1+rate/1200),(time*12)))/(Math.pow((1+rate/1200),(time*12))-1)*10000;
      var a=m*(time*12);
      a=a.toFixed(2);
      return a;
    }
  },
  sta:{ //等额本金
    money:function(all,rate,time){
      //参数 贷款金额  利率  时间  
      var all=parseFloat(all)*10000;
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var m=(all/(time*12))+all*(rate/1200);
      m=m.toFixed(2);
      return m;
    },
    rat:function(all,rate,time){ //利息
      var all=parseFloat(all)*10000;
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var ar=((all/(time*12)+all*(rate/1200))+(all/(time*12)*(1+rate/1200)))/2*(time*12)-all;
      ar=ar.toFixed(2);
      return ar;
    },
    all:function(all,rate,time){
      var all=parseFloat(all)*10000;
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var a=((all/(time*12)+all*(rate/1200))+(all/(time*12)*(1+rate/1200)))/2*(time*12);
      a=a.toFixed(2);
      return a;
    },
    poor:function(all,rate,time){
      var all=parseFloat(all)*10000;
      var rate=parseFloat(rate);
      var time=parseFloat(time); 
      var p=all/(time*12)*(rate/1200);
      p=p.toFixed(2);
      return p;
    },
  }
}
module.exports = clt;
