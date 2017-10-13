
var lucky = (function() {
  var lucky = {},noWactivityId,luckyInfo = window.ACT_INFO.lucky;

  lucky.init = function() {
    lucky.init = null
    lucky.flashLight = $('#lucky-lights').flash('yellow blue green'.split(' '))
    var  presentLucky = lucky.presentLucky = luckyInfo.pre,
      nextLucky = lucky.nextLucky = luckyInfo.next,
      nowTime = Date.now(),
      $lucky = lucky.$lucky = $('.lucky-activity'),
      $luckyBtn = lucky.$luckyBtn = $lucky.find(".btn");
    lucky.presentLucky?noWactivityId=lucky.presentLucky.activityId:'';
    var bindClick=function(){
      $lucky.on('click', '.btn_rob', luckyRoll);
      $lucky.on('click', '.luckother-btn', luckyRoll);
    }
    // 如果当前活动存在

    if (presentLucky) {
      loadAwardList("#lucky-list", {
        act_id: presentLucky.activityId,
        type: presentLucky.activityTypeId
      })
      if(presentLucky.startLeft>0){
        btn('btn_coming',"");
        showTime(presentLucky.startLeft,function(){
          $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
          btn('btn_rob');
          $lucky.find(".luck-rob-btn").addClass("luckother-btn");
          bindClick();
          //nextLuckhandle();
        })
        return
      }
      else if (presentLucky.endLeft < 0) {
        // 当前活动已结束
        btn('btn_end')
        _paq.push(['trackEvent' ,'lucky', 'enter_ended', presentLucky.activityId]);
        nextLuckhandle(1);
        return
      } else {
        if(presentLucky.status==01){
          //活动进行中，但状态没更新
          btn('btn_gray',"即将开始");
          $("#lucky-time-bar").replaceWith('<div class="coming-soon">活动即将开始,<a href="">点击刷新</a></div>');
          $(".lucky-activity .coming-soon").html('活动即将开始,<a href="">点击刷新</a>');
          return
        }
        // 当前活动还在进行
        // 红包抢完
        if ((presentLucky.couponStock < 1&&presentLucky.additionalCouponStock!=null&&presentLucky.additionalCouponStock<1)||(presentLucky.couponStock < 1&&presentLucky.additionalCouponStock==null)) {
          // 红包已经抢光
          btn('btn_out')
          _paq.push(['trackEvent' ,'lucky', 'enter_lucky_out', presentLucky.activityId]);
          nextLuckhandle();
          return
        } else {
          setBufferChance(presentLucky.activityId);
        }
      }
    } else {
      btn("btn_end")
      _paq.push(['trackEvent' ,'lucky', 'no_present_lucky']);
      nextLuckhandle(1);
    }

    //对机会进行重新设定
    function setBufferChance(activityId,boo){
      var next=boo==false?false:true;
      $.get("/activity/chance",{
        act_id: activityId,
        t: Date.now()
      },function(res){
        if(res.status){
          _paq.push(['trackEvent' ,'lucky', 'getchance_error', activityId]);
          btn('btn_gray',"红包异常");
          if(next){
            nextLuckhandle(1);
          }
          return
        }
        if (res.data.ticketStock < 1) {
          noChance = true;
          btn('btn_gray',"机会已用完");
          _paq.push(['trackEvent' ,'lucky', 'enter_nochance', activityId]);
          if(next){
            nextLuckhandle();
          }
          return
        }
      //  if(!next){
          $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
          $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
    //    }
        btn('btn_rob');
        $lucky.find(".luck-rob-btn").addClass("luckother-btn");
        bindClick();
        if(next){
          nextLuckhandle(2);
        }
    });
    }

      function  nextLuckhandle(tag){
        if (nextLucky) {
          //如果有下一个活动
          if(tag==1){
            btn('btn_coming',"");
            noWactivityId=nextLucky.activityId;
            if(nextLucky.startLeft<0){
              $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
              $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
              setBufferChance(noWactivityId,false);
            }else {
              showTime(nextLucky.startLeft,function(){
                $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
                $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
                setBufferChance(noWactivityId,false);
              });
            }
          }else {
            if(tag!=2){ showTime(nextLucky.startLeft);}
          }
        } else {
          // 没有就敬请期待了
          if(tag!=2) {
            $("#lucky-time-bar").replaceWith('<div class="coming-soon">下波活动敬请期待</div>')
            $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
            _paq.push(['trackEvent', 'lucky', 'no_next_lucky']);
          }
        }
      }
  }

  var noChance = false,
      rolling

  function luckyRoll() {
    _paq.push(['trackEvent' ,'lucky', 'roll_click', lucky.presentLucky.activityId ]);
    var $lucky=$('.lucky-activity');
    if (noChance){
      openTipsLayer("luckNoChance","您的本轮抢红包机会已用完，下轮继续！");
      $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
      return  btn('btn_gray',"机会已用完");
    }
    var isReturn=false;
    var timer;
    var luckcallHandle=function(){
      $(".lucky-activity .coming-soon").html('抢红包活动进行中！');
      openTipsLayer("more_one","<p>今天抢红包的小伙伴太多了。</p><p>再抢一次吧</p>",function(dom,index){
        dom.find('.close').html("再抢一次");
      },"1222");
    };
    function timeM(n,dom,index){
      dom.find('.showTime').html(n);
      n--;
      if(n==0||rollTime-n>=6){
        timer=setTimeout(function(){
          layer.closeAll();
          clearTimeout(timer);
          luckcallHandle();
        },1000);
        return;
      }
      timer= setTimeout(function(){
        timeM(n,dom,index);
      },1000);
    }

    openTipsLayer("luck_money","<p class='rob_my_minutes'><span class='showTime'>"+rollTime+"</span></p></p><p class='rob_my_tip'>抢红包了，排队中！</p><p class='rob_my_time_m'> (千万别关掉我)</p>",function(dom,index){
      timeM(rollTime,dom,index);
    },"1222");
    if (rolling) return
    rolling = true
    $.get("/activity/roll", {
      act_id:  noWactivityId,
      t: Date.now()
    }, function(res) {
      rolling = false;
      isReturn=true;
      if(res.status==403){
        location.reload();
      }
      if (res.status == 1) {
        luckcallHandle=function(){
          btn('btn_gray',"机会已用完");
          noChance = true;
          _paq.push(['trackEvent' ,'lucky', 'rolled_no_chance', lucky.presentLucky.activityId ]);
          openTipsLayer("luckNoChance","您的本轮抢红包机会已用完，下轮继续！",function(dom,index){
           // if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
              dom.find('.close').click(function () {
                location.reload();
              })
              dom.find('.left-close').click(function () {
                location.reload();
              })
          //  }
          });
          $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
        }
        return
      }
      if(res.status == 4||res.status ==5){
        return
      }
      if (res.status == 2||res.status==6) {
        luckcallHandle=function(){
          btn('btn_end')
          _paq.push(['trackEvent' ,'lucky', 'rolled_ended', lucky.presentLucky.activityId ]);
          openTipsLayer("","活动已结束！",function(dom,index){
          //  if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
              dom.find('.close').click(function(){location.reload();})
              dom.find('.left-close').click(function(){location.reload();})
          // }
          });
          $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
        }
        return
      }
      if (res.status == 3) {
        luckcallHandle=function(){
          _paq.push(['trackEvent' ,'lucky', 'rolled_system_error', lucky.presentLucky.activityId ]);
          openTipsLayer("",res.msg);
          $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
        }
        return
      }

      luckcallHandle=function(){
        var data = res.data
        if (!data.tradingPrizeList) {
          _paq.push(['trackEvent' ,'lucky', 'rolled_lucky_out', lucky.presentLucky.activityId ]);
          openTipsLayer("rob_all","<p>抢红包的小伙伴们手太快啦！！ </p><p>下轮继续加油哦！</p>",function(dom,index){
         //   if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
              dom.find('.close').click(function () {
                location.reload();
              })
              dom.find('.left-close').click(function () {
                location.reload();
              })
         //  }
          });
          btn('btn_out');
         $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
          return
        }
        if (data.remainTime < 1) {
          noChance = true;
          btn('btn_gray',"机会已用完");
          $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
          $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
        }

        //additional_award st
        var List=data.tradingPrizeList[0];
        if((data.prizeLevel=='10'||data.prizeLevel=='11')&&List.dealerCoupons.length>0) {
          //优惠券
          if (data.prizeLevel== '11') {
            var additional_packet='additional_cop';
            var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p><p class='additional_list'>可购买："+List.dealerCoupons[0].goodsName+"</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的优惠券！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
          } else {
            //红包
            var additional_packet='additional_packet';
            var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p></div></div>" +
                "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的经销商红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
          }
          openTipsLayer(additional_packet,packet,function(dom){
          });
          return
        }
        //additional_award end

        var money = countCouponList(data.tradingPrizeList)
        _paq.push(['trackEvent' ,'lucky', 'rolled_get_' + lucky.presentLucky.activityId , money ]);
        money = money/100;
        openTipsLayer("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",function(dom){
          dom.find(".rob_money").append("<div class='money-title'><span>"+dom.find('.rob_my_tip span').html()+"</span>元</div>");
          if (data.remainTime < 1) {
            dom.find('.close').click(function () {
              location.reload();
            })
            dom.find('.left-close').click(function () {
              location.reload();
            })
          }
        });
      }
    })
  }
  function showTime(time,call) {
    $("#lucky-time-bar").timebar(time, function() {
      if(call&&typeof call=="function"){
        call()
      }else {
        $("#lucky-time-bar").replaceWith('<div class="coming-soon">活动即将开始!</div>')
        setTimeout(function(){
          _paq.push(['trackEvent' ,'lucky', 'waited_start_reload', lucky.nextLucky.activityId]);
          setTimeout(function(){
            location.reload()
          },100)
        }, 5e3)
      }
      _paq.push(['trackEvent' ,'lucky', 'waited_start', lucky.nextLucky.activityId]);
    })
  }

  function btn(c,h) {
    lucky.$luckyBtn.removeClass("btn_rob btn_out btn_end btn_gray btn_coming").addClass(c);
    if(!!h){
      lucky.$luckyBtn.html(h)
    }else {
      lucky.$luckyBtn.html('')
    }
  }

  function showNoChance(){
    popup("抱歉，您已经没机会！")
  }

  return lucky
})();