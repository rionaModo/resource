var rollTime=5;
function openTipsLayer(classN,tips,callback,tag){

    var shadeClose=tag?false:true;
    layer.open({
        type: 1,
        scrollbar: false,
        title: false,
        closeBtn: 0,
        area: ['881px','667px'],
        shadeClose: shadeClose,
        shade:[0.5,"#000"],
        content: '<div class="rule-panel rob-layer"><div class="left-close"></div><div class="rule-content-rob"></div><div  class="close">确   认</div></div>',
        success: function(dom,index){
            dom.css({
                "background":"none",
                "box-shadow":"none"
            })
            dom.find('.close').click(function(){layer.close(index);})
            dom.find('.left-close').click(function(){layer.close(index);})
            dom.find('.rule-content-rob').html(tips);
            if(classN){
                dom.find('.rule-panel').addClass(classN)
            }
            if(callback){ callback(dom,index)}
        }
    });
}
$(function(){
 loginUser(function(){
    lottery.init()
    lucky.init()
 },function(){
  login()
 });

    monthWinList="";
    var winningList = ACT_INFO.winningList;
    if(winningList.content){
        monthWinList="<dl>"
        if(winningList.title)monthWinList=monthWinList+"<p class='tac'><b>"+winningList.title+"</b></p>"
        monthWinList=monthWinList+winningList.content+"</dl>"
    }else {
        monthWinList = winningList["default"] || "敬请期待！";
    }
    $("#rule-month").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("赢TOP排行  赢当月大礼");
            dom.find('.rule-content').html(monthRuleHTML);
        })
        _paq.push(['trackEvent', 'month_act', 'show_rule']);
    })

    $("#rule-reg").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("免费注册 红包立即送")
            dom.find('.rule-content').html(regRuleHTML)
        })
        _paq.push(['trackEvent', 'register_act', 'show_rule']);
    })

    $("#rule-lottery").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("在线下单  幸运轮盘每周抽")
            dom.find('.rule-content').html(lotteryRuleHTML)
        })
        _paq.push(['trackEvent', 'lottery', 'show_rule']);
    });
    $("#mouth-reg").click(function () {
        showRule(function (dom, index) {
            dom.find('.rule-panel').addClass('mouth-reg-layer');
            dom.find('.title').html("TOP排行中奖公布")
            dom.find('.rule-content').html(monthWinList)
        })
        _paq.push(['trackEvent', 'lottery', 'show_rule']);
    })

    $("#rule-lucky").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("丹露红包  每日随机抢")
            dom.find('.rule-content').html(luckyRuleHTML)
        })
        _paq.push(['trackEvent', 'lucky', 'show_rule']);
    })
});

function login(){
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['514px','318px'],
    shadeClose: false,
    shade:[0.9,"#000"],
    scrollbar: false,
    content: '<div id="loginpanel"><a class="gologin" href="/login"></a></div>',
    success: function(dom){
      dom.css("background", "none")
    }
  });
}

function showRule(callback){
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
      scrollbar: false,
    area: ['881px','667px'],
    shadeClose: true,
    shade:[0.5,"#000"],
    content: '<div class="rule-panel"><div class="title"></div><div class="left-close"></div><div class="activity-rule"></div><div class="wrap"><div class="rule_layer_c"></div><div class="rule-content"></div></div><a href="javascript:" class="close"></a></div>',
    success: function(dom,index){
      dom.css({
        "background":"none",
        "box-shadow":"none"
      })
        dom.find('.close').click(function(){layer.close(index);})
        dom.find('.left-close').click(function(){layer.close(index);})
      callback(dom,index)
    }
  });
}





//openTipsLayer("445","<p>抢红包的小伙伴们手太快啦！！ </p><p>下轮继续加油哦！</p>")additional_packet,additional_cop
//openTipsLayer("additional_packet","<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
//    "<p class='money-line'><span class='money-icon'>￥</span>5000</p><p class='additional_ad'>满500可用</p></div>" +
//    "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>河南郑州喜洋洋河南郑州州州州 可购买：五粮液52°500ml</p><p class='additional_list'>可够买：  水水水水</p></div></div>" +
//    "<p class='rob_my_tip'>恭喜您获得一张价值<span>777</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",function(dom){
//});