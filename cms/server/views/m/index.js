// shim layer
var rollTime=5;
(function(){
  window.layer = {
    open: function(opt) {
      var ele = $('<div class="shadowMask"></div>'),
          content = $('<div class="wrap"></div>')

      content.html(opt.content)
      ele.append(content)
      $(document.body).append(ele)
      ele.show()
      opt.success(content, 1)
      $("html").css("overflow", 'hidden')
    },
    close: function(i) {
      $(".shadowMask").remove()
      $("html").css("overflow", 'auto')
    },
    alert: function(msg){
      alert(msg)
    }
  }
  //初始化月度排名
  monthWinList="";
 var  winningList=ACT_INFO.winningList;
  if(winningList.content){
    monthWinList="<dl>"
    if(winningList.title)monthWinList=monthWinList+"<p class='tac'><b>"+winningList.title+"</b></p>"
    monthWinList=monthWinList+winningList.content+"</dl>"
  }else {
    monthWinList=winningList.default||"敬请期待！";
    return
  }
  luckyRuleHTML=luckyRuleHTML+'<p>9)  奖励由本公司提供，与苹果官方无关；</p>';
  regRuleHTML=regRuleHTML+'<p>8)  奖励由本公司提供，与苹果官方无关；</p>';
  lotteryRuleHTML=lotteryRuleHTML+'<p>11)  奖励由本公司提供，与苹果官方无关；</p>';
  monthRuleHTML=monthRuleHTML+'<p>9)  奖励由本公司提供，与苹果官方无关；</p>';
})();

function showNoChance() {
  popup("抱歉，您已经没机会！")
}
$(function() {
  initLucky()
  initLottery()
  initCommon()
  //$(window).on("error",function(event){
  //  alert(err.message)
  //  alert(JSON.stringify(err.stack))
  //})
  // alert($(window).width())
});

function initLucky() {
  var presentLuckyInfo = ACT_INFO.lucky.pre,
      nextLuckyInfo = ACT_INFO.lucky.next,
      noChance = false,
      nowTime = Date.now(),
      rolling = false;
      presentLuckyInfo?noWactivityId=presentLuckyInfo.activityId:'';
  $('#lucky-lights').flash('yellow blue green'.split(' '))

  var bindClick=function(){
    $('.lucky-activity').on('click', '.btn_rob', luckyRoll);
    $('.lucky-activity').on('click', 'luckother-btn', luckyRoll);

  }



  // 如果当前活动存在
  if (presentLuckyInfo) {
    if(presentLuckyInfo.startLeft>0){
      showTime(presentLuckyInfo.startLeft,function(){
          $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
          $(".lucky-activity .coming-soon").html('抢红包活动进行中！');
        btn('btn_rob');
        $('.lucky-activity').find( '.rob-tag').addClass("luckother-btn");
        bindClick();
        //nextLuckhandle();
      });
      btn('btn_coming',"");
      return
    }
    else if (presentLuckyInfo.endLeft<0) {
      // 当前活动已结束
      btn('btn_end')
      _paq.push(['trackEvent', 'mobile_lucky', 'enter_ended', presentLuckyInfo.activityId]);
      nextLuckhandle(1);
    } else {
      // 当前活动还在进行
      if(presentLuckyInfo.status==01){
        $("#lucky-time-bar").replaceWith('<div class="coming-soon"><a href="">活动即将开始,点击刷新</a></div>');
        $(".lucky-activity .coming-soon").html('<a href="">活动即将开始,点击刷新</a>');
        return
      }
      // 红包抢完
     // if (presentLuckyInfo.couponStock < 1&&presentLuckyInfo.additionalCouponStock<1) {
        if ((presentLuckyInfo.couponStock < 1&&presentLuckyInfo.additionalCouponStock!=null&&presentLuckyInfo.additionalCouponStock<1)||(presentLuckyInfo.couponStock < 1&&presentLuckyInfo.additionalCouponStock==null)) {
        // 红包已经抢光
        btn('btn_out')
        _paq.push(['trackEvent', 'mobile_lucky', 'enter_lucky_out', presentLuckyInfo.activityId]);
        nextLuckhandle();
      } else {
        setBufferChance(presentLuckyInfo.activityId);
      }
    }
  } else {
    btn("btn_end")
    _paq.push(['trackEvent', 'mobile_lucky', 'no_present_lucky']);
    nextLuckhandle(1);
  }
  //对机会进行重新设定
  function setBufferChance(activityId,boo){
    var next=boo==false?false:true;
    $.get("/activity/chance", {
      act_id: activityId,
      t: Date.now()
    }, function(res) {
      if (res.status) {
        _paq.push(['trackEvent', 'mobile_lucky', 'getchance_error', activityId]);
        btn('btn_gray',"机会已用完");
        if(next){
          nextLuckhandle(1);
        }
        return
      }
      if (res.data.ticketStock < 1) {
        noChance = true;
        btn('btn_gray',"机会已用完");
        _paq.push(['trackEvent', 'mobile_lucky', 'enter_nochance', activityId]);
        if(next){
          nextLuckhandle();
        }
        return
      }
     // if(!next){
        $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
        $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
   //   }
      btn('btn_rob');
      $('.lucky-activity').find( '.rob-tag').addClass("luckother-btn");
      bindClick();
      if(next){
        nextLuckhandle(2);
      }
    })
  }
  function nextLuckhandle(tag){
    if (nextLuckyInfo) {
      //如果有下一个活动
      if(tag==1){
        btn('btn_coming',"");
        noWactivityId=nextLuckyInfo.activityId;
        if(nextLuckyInfo.startLeft<0){
          $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
          $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
          setBufferChance(noWactivityId,false);
        }else {
          showTime(nextLuckyInfo.startLeft,function(){
            $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
            $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
            setBufferChance(noWactivityId,false);
          });
        }
      }else {
        if(tag!=2){
          showTime(nextLuckyInfo.startLeft);
        }
      }
    } else {
      // 没有就敬请期待了
      if(tag!=2){
        $("#lucky-time-bar").replaceWith('<div class="coming-soon">下波活动敬请期待!</div>')
        $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
      }
      _paq.push(['trackEvent', 'mobile_lucky', 'no_next_lucky']);
    }
  }





  function btn(c,html) {
    $('#lucky-action-btn').removeClass("btn_rob btn_out btn_end btn_gray btn_coming").addClass(c);
    if(!!html){
      $('#lucky-action-btn').html(html);
    }else {
      $('#lucky-action-btn').html("");
    }
  }
  function luckyRoll() {
    if (noChance){
      showLayer(getLayerContent("luckNoChance","您的本轮抢红包机会已用完，下轮继续！"));
      return  btn('btn_gray',"机会已用完");
    }
    var isReturn=false;
    var timer;
    var luckcallHandle=function(){
      $(".lucky-activity .coming-soon").html('抢红包活动进行中！');
      showLayer(getLayerContent("more_one","<p>今天抢红包的小伙伴太多了。</p><p>再抢一次吧</p>"),function(dom,index){
        dom.find('.close').html("再抢一次");
      });
    };
    function timeM(n,dom,index){
      dom.find('.showTime').html(n);
      n--;
      if(n==0||rollTime-n>=6){
        timer=setTimeout(function(){
          layer.close(index);
          clearTimeout(timer);
          luckcallHandle();
        },1000);
        return;
      }
      timer= setTimeout(function(){
        timeM(n,dom,index);
      },1000);
    }

    showLayer(getLayerContent("luck_money","<p class='rob_my_minutes'><span class='showTime'>"+rollTime+"</span></p><p class='rob_my_tip'>抢红包了，排队中！</p><p class='rob_my_time'> (千万别关掉我)</p>",true),function(dom,index){
      timeM(rollTime,dom,index);
    })

    _paq.push(['trackEvent', 'mobile_lucky', 'roll_click', presentLuckyInfo.activityId]);
    if (rolling) return


    rolling = true
    $.get("/activity/roll", {
      act_id: noWactivityId,
      t: Date.now()
    }, function(res) {
      isReturn=true;
      rolling = false;
      if(res.status==403){
        location.reload();
      }
      if (res.status == 1) {
        luckcallHandle=function(){
          btn('btn_gray',"机会已用完");
          noChance = true;
          isReturn=true;
          _paq.push(['trackEvent', 'mobile_lucky', 'rolled_no_chance', presentLuckyInfo.activityId]);
          showLayer(getLayerContent("luckNoChance","您的本轮抢红包机会已用完，下轮继续！"),function(dom,index){
           // if(nextLuckyInfo&&nextLuckyInfo.activityId!=noWactivityId){
              dom.find('.close').click(function(){location.reload();})
              dom.find('.left-close').click(function(){location.reload();})
          //  }
          });
          $(".lucky-activity .coming-soon").html('下波活动敬请期待！');
          $('.lucky-activity').find( '.rob-tag').removeClass("luckother-btn");
        }
        return
      }
      if (res.status == 4||res.status == 5) {
        return
      }
      if (res.status == 2||res.status==6) {
        luckcallHandle=function(){
          btn('btn_end')
          _paq.push(['trackEvent', 'mobile_lucky', 'rolled_ended', presentLuckyInfo.activityId]);
          showLayer(getLayerContent("","活动已结束！"),function(dom,index){
           // if(nextLuckyInfo&&nextLuckyInfo.activityId!=noWactivityId){
              dom.find('.close').click(function(){location.reload();})
              dom.find('.left-close').click(function(){location.reload();})
           // }
          });
          $(".lucky-activity .coming-soon").html('下波活动敬请期待！');
          $('.lucky-activity').find( '.rob-tag').removeClass("luckother-btn");
        }
        return
      }
      if (res.status == 3) {
        luckcallHandle=function(){
          _paq.push(['trackEvent', 'mobile_lucky', 'rolled_system_error', presentLuckyInfo.activityId]);
          showLayer(getLayerContent("",res.msg));
          $('.lucky-activity').find( '.rob-tag').removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待！');
        }
        return
      }
      luckcallHandle=function(){
        var data = res.data
        if (!data.tradingPrizeList) {
          _paq.push(['trackEvent', 'mobile_lucky', 'rolled_lucky_out', presentLuckyInfo.activityId]);
          showLayer(getLayerContent("rob_all","<p>抢红包的小伙伴们手太快啦！！ </p><p>下轮继续加油哦！</p>"),function(dom,index){
         //   if(nextLuckyInfo&&nextLuckyInfo.activityId!=noWactivityId){
              dom.find('.close').click(function(){location.reload();})
              dom.find('.left-close').click(function(){location.reload();})
           // }
          });
          btn('btn_out');
          $('.lucky-activity').find( '.rob-tag').removeClass("luckother-btn");
          return
        }
        if (data.remainTime < 1) {
          noChance = true;
          btn('btn_gray',"机会已用完");
          $('.lucky-activity').find( '.rob-tag').removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待！');
        }

        //additional_award st
        var List=data.tradingPrizeList[0];
        if((data.prizeLevel=='10'||data.prizeLevel=='11')&&List.dealerCoupons.length>0) {
          //优惠券
          if (data.prizeLevel== '11') {
            showLayer(getLayerContent("additional_cop","<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p><p class='additional_list'>可购买：  "+List.dealerCoupons[0].goodsName+"</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"),function(dom,index){
            });
          } else {
            //红包
            showLayer(getLayerContent("additional_packet","<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"),function(dom,index){
            });
          }
          return
        }
        //additional_award end

        var money = countCouponList(data.tradingPrizeList)
        _paq.push(['trackEvent', 'mobile_lucky', 'rolled_get_' + presentLuckyInfo.activityId, money]);
        money = money/100;
        showLayer(getLayerContent("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",null,"<div class='money_show'>"+money+"元</div>"),function(dom,index){
          if (data.remainTime < 1) {
            dom.find('.close').click(function(){location.reload();})
            dom.find('.left-close').click(function(){location.reload();})
          }
        });

      }

    })
  }

  function showTime(time,call) {
    $("#lucky-time-bar").timebar(time, function() {
      if(call&&typeof call=="function"){
        call();
      }else {
        $("#lucky-time-bar").replaceWith('<div class="coming-soon"><a href="">活动即将开始,点击刷新</a></div>')
        $(".lucky-activity .coming-soon").html('<a href="">活动即将开始,点击刷新</a>');
      }
      _paq.push(['trackEvent', 'mobile_lucky', 'waited_start', nextLuckyInfo.activityId]);
    })
  }
}


function initLottery() {
  var lottery = (function() {
  var initdeg=-9.5;
    var lottery = {},
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
        },
      rolling


    lottery.init = function() {
      lottery.init = null

      var $avardBoard = lottery.$avardBoard = $(".lottery-award"),
          $lottery = lottery.$lottery = $(".lottery"),
          $chanceLeft = lottery.$chanceLeft = $("#chance-left"),
          $lotteryBtn = lottery.$lotteryBtn = $lottery.find('.lottery-btn'),
          lotteryInfo = lottery.info = ACT_INFO.lottery
      lottery.flashLight = initFlashLight()
      if (!lotteryInfo) {
        // 没有活动信息 直接结束
        btn("disable")
        _paq.push(['trackEvent', 'mobile_lottery', 'enter_no_lottery']);
        return timebar(-1)
      }
      if (lotteryInfo.startLeft < 1) {
        // 不显示倒计时
        timebar(-1)
      }
      // 未开始
      if (lotteryInfo.startLeft > 0) {
        btn('disable nostart');

        timebar(lotteryInfo.startLeft, function() {
          $("#lottery-time-bar").replaceWith('<div class="coming-soon">活动即将开始<br><a href="">点击刷新</a></div>')
          _paq.push(['trackEvent', 'mobile_lottery', 'waited_start', lotteryInfo.activityId]);
        })
        _paq.push(['trackEvent', 'mobile_lottery', 'enter_not_start', lotteryInfo.activityId]);
      } else if(lotteryInfo.endLeft >0&&lotteryInfo.startLeft <= 0&&lotteryInfo.status==01){
        btn('disable');
        $("#lottery-time-bar").replaceWith('<div class="coming-soon">活动即将开始<br><a href="">点击刷新</a></div>')

        // 正在活动
      }
      else if (lotteryInfo.endLeft < 1) {
        // 活动已结束
        btn("disable isend");
        $(".lottery").find(".chance-left").text("本轮活动已结束");
        _paq.push(['trackEvent', 'mobile_lottery', 'enter_end', lotteryInfo.activityId])
      } else {
        // 正在活动
        if(lotteryInfo.status==01){//刷新页面
          btn('disable nostart');
          $("#lottery-time-bar").show();
          $("#lottery-time-bar").replaceWith('<div class="coming-soon">活动即将开始<br><a href="">点击刷新</a></div>')
        }
        getChanceNum(function(data){
          setChance(data);
          if(parseInt(data)>0){
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
        $lottery.on('click', '.lottery-btn.active', roll)
        $lottery.on('click', '.lottery-btn.disable-canshowrule', function () {
          $("#rule-lottery").click()
        });
        $lottery.on('click', '.lottery-btn.nostart', function () {
          showLayer(getLayerContent("", "活动未开始，请稍等 . . ."));
        });
        $lottery.on('click', '.lottery-btn.isend', function () {
          showLayer(getLayerContent("", "本轮活动已结束，下波活动敬请期待!"));
        });
        $lottery.on('click', '.lottery-btn.disable-nochance', function () {
          showLayer(getLayerContent("noChance","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>"));
        })
    }
      function getChanceNum(callback){//获取抽奖机会
        $.get("/activity/chance", {
          act_id: lotteryInfo.activityId,
          t: Date.now()
        }, function(res) {
          if(callback) {
            callback(res.data.ticketStock)
          }
        });
      }
    }
    function setChance(chance) {
      var chance=chance||0;
      if(parseInt(chance)<=0){
        chance=0;
      }
      lottery.$chanceLeft.html(chance)
      if (chance < 1 && lottery.info.startLeft < 1 && lottery.info.endLeft > 0) {
        btn('disable-nochance')
      }
    }

    function btn(c) {
      lottery.$lotteryBtn.removeClass('active disable disable-canshowrule').addClass(c)
    }

    function timebar(t, callback) {
      if (t < 0) {
        $("#lottery-time-bar").hide()
      } else {
        $("#lottery-time-bar").show();
        $("#lottery-time-bar").timebar(t, callback)
      }
    }

    function initFlashLight() {
      var lightsInfo = {
            radius: 165,
            amount: 30,
            fix: function(lamp) {
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

    function loadAward() {
      $.get("/activity/roll", {
        act_id: lottery.info.activityId,
        t: Date.now()
      }, function(res) {
        if (res.status) {
          //  rotate(1000, 360) //停止转盘
          _paq.push(['trackEvent', 'mobile_lottery', 'rolled_system_error', lottery.info.activityId]);
        }
        if (res.status == 1) {
          btn('disable')
          showLayer(getLayerContent("noChance","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>"));
          _paq.push(['trackEvent', 'mobile_lottery', 'rolled_no_chance', lottery.info.activityId]);
          return setChance(0)
        }
        if (res.status == 2) {
          btn('disable')
          _paq.push(['trackEvent', 'mobile_lottery', 'rolled_ended', lottery.info.activityId]);
          $(".lottery").find(".chance-left").text("本轮活动已结束");
          showLayer(getLayerContent("","活动已结束！"));
          return;
        }
        if (res.status == 3) {
          _paq.push(['trackEvent', 'mobile_lottery', 'rolled_status3', lottery.info.activityId]);
          return layer.alert(res.msg)
        }
        var data = res.data;
        //additional_award st
        if (data.tradingPrizeList&&data.tradingPrizeList[0]) {
          var List = data.tradingPrizeList[0];
          if ((data.prizeLevel == '10' || data.prizeLevel == '11') && List.dealerCoupons.length > 0) {
            //优惠券
            if (data.prizeLevel == '11') {
              showLayer(getLayerContent("additional_cop", "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                  "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                  "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p><p class='additional_list'>可购买：  " + List.dealerCoupons[0].goodsName + "</p></div></div>" +
                  "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"), function (dom, index) {
              });
            } else {
              //红包
              showLayer(getLayerContent("additional_packet", "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                  "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                  "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p></div></div>" +
                  "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"), function (dom, index) {
              });
            }
            setChance(data.remainTime)
            rolling = false;
            return
          }
        }
        //additional_award end

        _paq.push(['trackEvent', 'mobile_lottery', 'rolled_prize_level_' + lottery.info.activityId, data.prizeLevel]);
        // 因为返回的整形
        rotateToAward(data.prizeLevel + "", showPrize)

        function showPrize() {
          setChance(data.remainTime)
          if (data.prizeLevel && data.tradingPrizeList) {
            // showCoupon();
            var money=countCouponList(data.tradingPrizeList);
            money=money/100;
            showLayer(getLayerContent("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",null,"<div class='money_show'>"+money+"元</div>"));
          } else {
            showLayer(getLayerContent("","很遗憾，没有抽中。下次再接再厉！"))
          }
          rolling = false
        }
      })

    }

    // 抽奖操作
    function roll() {
      if (rolling) return;
      rolling = true
      _paq.push(['trackEvent', 'mobile_lottery', 'roll_click', lottery.info.activityId]);
      // 在服务器抽奖结果返回之前，先让转盘转起来
      // rotate(1000, initdeg+360)

      loadAward()
    }

    // 滚到相应奖项
    function rotateToAward(awardId, callback) {
      var award = lottery.AWARDS[awardId] || lottery.AWARDS["999"],
          awardDeg = randomPick(award.deg)

      rotate(8e3, awardDeg, callback)
    }

    // 滚动转盘
    function rotate(time, angle, callback) {
      var awar=Math.floor(initdeg/360)*360;
      var angle=angle+awar+360*4;
      initdeg=angle;
      lottery.flashLight.restart(100) //转起来时，加快闪灯
      lottery.$avardBoard.animate({
            rotate: angle + "deg"
          },
          time,
          "ease-out",
          function() {
            lottery.flashLight.restart(1e3) //停止慢速闪灯
            $.isFunction(callback) && callback()
          })
    }

    function showNoChance() {
      popup("抱歉，您已经没机会！")
    }

    return lottery
  })();
  lottery.init()
}


function initCommon() {
  var panel = $(".rule-panel");
  var api = "/activity/award_list";
  var ctentH=$(window).height() * 0.85
  panel.find(".content").find(".rules").height(ctentH-180);
  panel.find(".content").height(ctentH);
  panel.find(".close,.layer-cls-btn").click(function() {
    panel.hide()
    $('html').css("overflow-y", 'auto')
    panel.find('.rules').html('');
  })
  // title 11 个字
  $("#lucky-rule").click(function() {
    var ctentH=$(window).height() * 0.85
    panel.find(".content").find(".rules").height(ctentH-180);
    panel.find(".content").height(ctentH);
    panel.find(".content").removeClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("每日随机抢", luckyRuleHTML)
  });
  $("#lucky-winning").click(function(){
    panel.find(".content").height(346);
    panel.find(".content").find(".rules").height(225);
    panel.find(".content").addClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("抢红包中奖公布", winningList);
    if(typeof luckData !='undefined'){
      addWinningList(panel.find(".content").find(".list-wrap"),luckData);
    }else {
      if(!ACT_INFO.lucky.pre.activityId){
        return
      }
      $.get(api,{
        act_id: ACT_INFO.lucky.pre.activityId,
        type: ACT_INFO.lucky.pre.activityTypeId,
        t:Date.now()
      },function(res){
        if(res.status){
          return
        }
        luckData = res.data;
        addWinningList(panel.find(".content").find(".list-wrap"),luckData);
      })
    }
  });
  $("#lottery-winning").click(function(){
    panel.find(".content").height(346);
    panel.find(".content").find(".rules").height(225);
    panel.find(".content").addClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("幸运轮盘中奖公布", winningList)
    if(typeof lotteryData !='undefined'){
      addWinningList(panel.find(".content").find(".list-wrap"),lotteryData);
    }else {
      if(!ACT_INFO.lottery.activityId){
        return
      }
      $.get(api,{
        act_id: ACT_INFO.lottery.activityId,
        type: ACT_INFO.lottery.activityTypeId,
        t:Date.now()
      },function(res){
        if(res.status){
          return
        }
        lotteryData = res.data;
        addWinningList(panel.find(".content").find(".list-wrap"),lotteryData);

      })
    }
  });
  $("#mouth-winning").click(function(){
    var ctentH=$(window).height() * 0.85
    panel.find(".content").find(".rules").height(ctentH-155);
    panel.find(".content").height(ctentH);
    panel.find(".content").removeClass("content-nodecre");
    panel.find(".content").addClass("mouth-nodecre");
    showRule("TOP排行中奖公布", monthWinList)
  });
  $("#lottery-rule").click(function() {
    var ctentH=$(window).height() * 0.85
    panel.find(".content").find(".rules").height(ctentH-180);
    panel.find(".content").height(ctentH);
    panel.find(".content").removeClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("幸运轮盘每周抽", lotteryRuleHTML)
  });
  $("#month-rule").click(function() {
    var ctentH=$(window).height() * 0.85
    panel.find(".content").find(".rules").height(ctentH-180);
    panel.find(".content").height(ctentH);
    panel.find(".content").removeClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("赢TOP排行", monthRuleHTML)
  })
  $("#reg-rule").click(function() {
    var ctentH=$(window).height() * 0.85
    panel.find(".content").find(".rules").height(ctentH-180);
    panel.find(".content").height(ctentH);
    panel.find(".content").removeClass("content-nodecre");
    panel.find(".content").removeClass("mouth-nodecre");
    showRule("注册红包立即送", regRuleHTML)
  })
}


function showRule(title, content) {
  var panel = $(".rule-panel")
  panel.find(".rules").html(content)
  panel.find(".title").html(title)
  $('html').css("overflow", 'hidden')
  panel.show()
}


//增加中奖名单列表
function addWinningList($container,data){

  var $list=$container.find(".list");
  var $container=jQuery(($container||$(document.body))[0]);
  var list=list||data;
  var html = ""

  $.each(list, function(i, v){
    var
        n = v.name || "**********",
        p = v.tel || "**********",
        m = (v.couponAmt/100)

    html += '<div class="row'+ (i % 2 == 1 ? " even": "") +'">'+
        '<div class="col">'+ n.substr(0,2) + '*****' + n.substr(-1, 1) + '</div>' +
        '<div class="col">'+ p.substr(0,3) + '****' + p.substr(-1, 4) + '</div>' +
        '<div class="col">'+ m +'元红包</div>'+
        '</div>';
  })
  $list.html(html)
  if(list.length > 6 ){
    //scrolling = true
    $container.scrollbox({
      autoPlay:true,
      linear: true,
      distance:30,
      step: 1,
      delay: 0,
      speed: 50,
      listElement: ".list",
      listItemElement: '.row'
    });
  }
}



function showLayer(content,callback) {//展示弹层
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    shadeClose: false,
    shade:[0.5,"#000"],
    scrollbar: false,
    content: content,
    success: function(dom,index){
      dom.css({
        "background":"none",
        "box-shadow":"none"
      })
      if(callback){
        callback(dom,index);
      }
      dom.find('.close').click(function(){
        layer.close(index)
      })
    }
  });
}
function getLayerContent(classN,tips,needClose,otherHtml){
  var classN=classN||'',close='<a  class="close">确     认</a>',otherHtml=otherHtml||'';
  if(!!needClose){
    close='';
  }

  var html='<div class="layer-noprize '+classN+'">'+otherHtml+'<div class="layer-tips">'+tips+'</div>'+close+'</div>';
  return html;
}


