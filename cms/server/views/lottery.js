var lottery = (function(){
  
  var lottery = {},
      initdeg=-9.5,
      AWARDS = lottery.AWARDS = {
        "01": {
          name: "一等奖",
          deg: [315.5]
        },
        "02": {
          name: "二等奖",
          deg: [27.5]
        },
        "03": {
          name: "三等奖",
          deg: [99.5]
        },
        "04":{
          name: "四等奖",
          deg: [171.5]
        },
        "05":{
          name: "五等奖",
          deg: [243.5]
        },
        "999": {
          name: "谢谢参与",
          deg: [-9.5,63.5, 135.5, 207.5, 279.5, 351.5]
        }
      }, rolling


  lottery.init = function(){
    lottery.init = null

    var $avardBoard = lottery.$avardBoard = $(".lottery-award"),
    $lottery = lottery.$lottery = $(".lottery"),
    $chanceLeft = lottery.$chanceLeft = $("#chance-left"),
    $lotteryBtn = lottery.$lotteryBtn = $lottery.find('.lottery-btn'),
    lotteryInfo = lottery.info = ACT_INFO.lottery

    lottery.flashLight = initFlashLight()
    if(!lotteryInfo){
      // 没有活动信息 直接结束
      btn("disable")
      _paq.push(['trackEvent' ,'lottery', 'enter_no_lottery']);
      return timebar(-1)
    }
    // 未开始
    if(lotteryInfo.startLeft > 0) {
      btn('disable nostart');
      timebar(lotteryInfo.startLeft, function(){
        $("#lottery-time-bar").replaceWith('<a class="coming-soon" href="">活动即将开始点击刷新</a>');
        setTimeout(function(){
          _paq.push(['trackEvent' ,'lottery', 'waited_start_reload', lotteryInfo.activityId]);
          setTimeout(function(){
            location.reload()
          },100)
        }, 5e3)
        _paq.push(['trackEvent' ,'lottery', 'waited_start', lotteryInfo.activityId]);
      })
    _paq.push(['trackEvent' ,'lottery', 'enter_not_start', lotteryInfo.activityId]);
    }else if(lotteryInfo.endLeft < 1  ){
      // 活动已结束
      btn("disable isend");
      $lottery.find(".chance-left").text("本轮活动已结束");
      _paq.push(['trackEvent' ,'lottery', 'enter_end', lotteryInfo.activityId])
    }else {
      // 正在活动
      if(lotteryInfo.status==01){//刷新页面
        btn('disable nostart');
        $("#lottery-time-bar").show();
        $("#lottery-time-bar").replaceWith('<a class="coming-soon" href="">活动即将开始点击刷新</a>');
      }
      getChanceNum(function(data){
        setChance(data);
        if(parseInt(data)>0&&lotteryInfo.status==02){
          btn("active");
        }
        bindClick();
      })
      return;
    }

    getChanceNum(function(data){
      setChance(data);
    })
    bindClick();
    function bindClick() {
      $lottery.on('click', '.lottery-btn.active', roll);
      $lottery.on('click', '.lottery-btn.disable-canshowrule', function () {
        $("#rule-lottery").click()
      })
      $lottery.on('click', '.lottery-btn.disable-nochance', function () {
        openTipsLayer("luckNoChance NoChanceStyle","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>");
      });
      $lottery.on('click', '.lottery-btn.nostart', function () {
        openTipsLayer("", "活动未开始，请稍等 . . .");
      });
      $lottery.on('click', '.lottery-btn.isend', function () {
        openTipsLayer("", "本轮活动已结束，下波活动敬请期待!");
      });
      loadAwardList("#lottery-list",{
        act_id: lotteryInfo.activityId,
        type: lotteryInfo.activityTypeId
      })
      if(lotteryInfo.startLeft < 1){
        // 活动已开始加载中奖列表

        // 不显示倒计时
        timebar(-1)
      }
    };
    function getChanceNum(callback) {//获取抽奖机会
      $.get("/activity/chance", {
        act_id: lotteryInfo.activityId,
        t: Date.now()
      }, function (res) {
        if (callback) {
          callback(res.data.ticketStock)
        }
      });
    }

  }

  function setChance(chance){
    var chance=chance||0;
    if(parseInt(chance)<=0){
      chance=0;
    }
    lottery.$chanceLeft.text(chance)
    if(chance < 1 && lottery.info.startLeft < 1 && lottery.info.endLeft > 0 ) {
      btn('disable-nochance')
    }
  }
  function btn(c){
    lottery.$lotteryBtn.removeClass('active disable disable-canshowrule').addClass(c)
  }

  function timebar(t, callback){
    if(t < 0){
      $("#lottery-time-bar").remove()
    }else {
      $("#lottery-time-bar").timebar(t,callback)
    }
  }

  function initFlashLight(){
    var lightsInfo = {
      radius: 230,
      amount: 30,
      fix: function(lamp){
        // 这次切图 灯的偏移为：28px 29px
        lamp.left -= 28
        lamp.top -= 29
        return lamp
      }
    },

    lampHtml = circleLamp(lightsInfo),

    lotteryFlash = $("#lottery-lights").html(lampHtml).flash('yellow blue green purple'.split(' '))

    return lotteryFlash
  }


  function loadAward(){
    $.get("/activity/roll", {
      act_id: lottery.info.activityId,
      t: Date.now()
    }, function(res){
      //var res={"status":0,"data":{"remainTime":77,"prizeLevel":"01","tradingPrizeList":[{"couponAmt":1000}]},"msg":""}
      if(res.status){
        rotate(1000, 360) //停止转盘
        _paq.push(['trackEvent' ,'lottery', 'rolled_system_error', lottery.info.activityId]);
      }
      if(res.status == 1){
        btn('disable')
        _paq.push(['trackEvent' ,'lottery', 'rolled_no_chance', lottery.info.activityId]);
        openTipsLayer("luckNoChance NoChanceStyle","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>");
        return setChance(0)
      }
      if(res.status == 2){
        btn('disable')
        _paq.push(['trackEvent' ,'lottery', 'rolled_ended', lottery.info.activityId]);
        $(".lottery").find(".chance-left").text("本轮活动已结束");
        openTipsLayer("","活动已结束！");
        return
      }
      if(res.status == 3){
        _paq.push(['trackEvent' ,'lottery', 'rolled_status3', lottery.info.activityId]);

        return layer.alert(res.msg)
      }
      var data = res.data;
      //additional_award st
      if (data.tradingPrizeList&&data.tradingPrizeList[0]) {
        var List = data.tradingPrizeList[0];
        if ((data.prizeLevel == '10' || data.prizeLevel == '11') && List.dealerCoupons.length > 0) {
          //优惠券
          if (data.prizeLevel == '11') {
            var additional_packet = 'additional_cop';
            var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p><p class='additional_list'>可购买：" + List.dealerCoupons[0].goodsName + "</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的优惠券！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
          } else {
            //红包
            var additional_packet = 'additional_packet';
            var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的经销商红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
          }
          openTipsLayer(additional_packet, packet, function (dom) {
          });
          setChance(data.remainTime)
          rolling = false
          return
        }
      }
    //additional_award end


      _paq.push(['trackEvent' ,'lottery', 'rolled_prize_level_'+ lottery.info.activityId , data.prizeLevel]);
      // 因为返回的整形
      if($.browser.msie && ($.browser.version == '7.0' || $.browser.version == '8.0') ){
        lottery.flashLight.restart(1e3) //停止慢速闪灯
        showPrize()
      }else{
        rotateToAward(data.prizeLevel + "", showPrize)
      }

      function showPrize(){
        setChance(data.remainTime)
        if(data.prizeLevel && data.tradingPrizeList) {
          var money=countCouponList(data.tradingPrizeList);
          money=money/100;
          openTipsLayer("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",function(dom){
            dom.find(".rob_money").append("<div class='money-title'><span>"+dom.find('.rob_my_tip span').html()+"</span>元</div>");
          });
        }else {
          openTipsLayer("","很遗憾，没有抽中。下次再接再厉！")
        }
        rolling = false
      }
    })

  }

  // 抽奖操作
  function roll(){
    if(rolling) return;
    _paq.push(['trackEvent' ,'lottery', 'roll_click', lottery.info.activityId]);
    rolling = true

    // 在服务器抽奖结果返回之前，先让转盘转起来
    rotate(2000, initdeg+360)

    loadAward()
  }

  // 滚到相应奖项
  function rotateToAward(awardId, callback){
    awardId.toString();
    var award = lottery.AWARDS[awardId] || lottery.AWARDS["999"],
        awardDeg = randomPick(award.deg)
    
    rotate(13e3,awardDeg , callback)
  }

  // 滚动转盘
  function rotate(time, angle, callback){
    var awar=Math.floor(initdeg/360)*360;
    var init=initdeg;
    var angle=angle+awar+360*5;
    initdeg=angle;
    lottery.flashLight.restart(100) //转起来时，加快闪灯
    lottery.$avardBoard.stopRotate();
    lottery.$avardBoard.rotate({
      angle: init,
      duration: time,
      animateTo: angle ,
      callback:function(){
        lottery.flashLight.restart(1e3) //停止慢速闪灯
        $.isFunction(callback) && callback()
      }
    })
  }


  function showNoChance(){
    popup("抱歉，您已经没机会！")
  }

  return lottery
})();

