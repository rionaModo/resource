// shim
if(!Date.now) {
  Date.now = function () {
    return (new Date()).getTime()
  }
}

/**
 * 要记住使用 setTimeout 来实现动画效果，别用setInterval 给你们忠告
 */
(function() {

  function FlashLight(laps, gap, frequency) {
    this._laps = laps
    this._gap = gap
    this.frequency = frequency || 1e3
    this._thread = undefined
  }
  FlashLight.prototype.start = function() {
    var laps = this._laps,
      gap = this._gap,
      that = this,
      index = 0

    flash()

    function flash() {
      laps.removeClass("on")
      $.each(laps, function(i, v) {
        var lightIndex = i % gap
        if (lightIndex === index) {
          $(this).addClass("on")
        }
      })
      index = (index + 1) % gap
      start()
    }

    function start() {
      that._thread = setTimeout(flash, that.frequency)
    }
  };

  FlashLight.prototype.stop = function() {
    clearTimeout(this._thread)
  }

  FlashLight.prototype.restart = function(fre) {
    this.stop()
    this.frequency = fre;
    this.start()
  }

  $.fn.flash = function(lights, frequency) {
    var laps = $('.lamp', this)
    laps.each(function(i, v) {
      $(this).addClass(lights[i % lights.length])
    })
    var flash = new FlashLight(laps, lights.length, frequency)

    flash.start()
    return flash
  }

})();



/**
 * 时间计时器
 * @param  {[type]}   time     [倒计时的时间（秒）]
 * @param  {Function} callback [倒计时结束时的callback]
 * @return {[type]}            [description]
 */
$.fn.timebar = function(time, callback) {
  time = Math.floor(time/1000)
  var timeItem = $('.time-item', this);
  start()

  function count() {
    render(time--);
    if (time < 0) {
      typeof callback === 'function' && callback()
      return
    }
    start()
  }

  function start() {
    setTimeout(count, 1e3)
  }

  function render(time) {
    if(time < 0 ){ time = 0 }
    var second = time % 60,
      min = Math.floor(time / 60) % 60,
      hour = Math.floor(time / 3600),
      timeArr = $.map([hour, min, second], function(v, i) {
        return to2(v)
      }).join("").split("")

    $.each(timeArr, function(i, v) {
      $(timeItem.get(i)).text(v)
    })
  }

  function to2(s) {
    var str = s + ""

    if (str.length > 2) {
      str = "99"
    }
    if (str.length < 2) {
      str = "0" + str
    }
    return str
  }
}

/**
 * 按半径生成一圈灯
 * @param  {[type]} opt [radius 半径] 
 * fix 位置修正函数（修正灯的位置，一般是因为切图原因） 
 * amout 灯的数量
 * @return {[type]}     [description]
 */
function circleLamp(opt) {
  var r = opt.radius,
    fix = opt.fix,
    amount = opt.amount,
    sin = Math.sin,
    cos = Math.cos,
    lambs = [],
    tmp,
    deg

  for (var i = 0; i < amount; i++) {
    deg = (i / amount) * 2 * Math.PI
    tmp = {
      left: r * sin(deg),
      top: r * cos(deg)
    }
    if (fix) {
      tmp = fix(tmp)
    }
    lambs.push(tmp)
  }

  return $.map(lambs, function(v, i) {
    return '<div class="lamp" style="left:' + v.left + 'px;top:' + v.top + 'px;"></div>'
  }).join('')

}


function randomPick(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}


function showCoupon (money) {
  money = money/100
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['450px'],
    shadeClose: false,
    shade:[0.5,"#000"],
    scrollbar: false,
    content: '<div class="couponshow"><div class="wrap"><div class="coupon"><div class="amount"></div></div><a href="javascript:" class="btn_ok"></a></div></div>',
    success: function(dom,index){
      dom.css({
        "background":"none",
        "box-shadow":"none"
      })
      dom.find(".amount").html( money + "元")
      dom.find('.btn_ok').click(function(){
        layer.close(index)
      })
    }
  });

}

function countCouponList(list){
  var m = 0
  $.isArray(list) && $.each(list, function(i, v){
    m+= v.couponAmt
  })
  return m
}

function popup (text) {
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['285px','281px'],
    shadeClose: false,
    shade:[0.5,"#000"],
    scrollbar: false,
    content: '<div class="popup"><div class="text"></div><a href="javascript:" class="close"></a></div>',
    success: function(dom,index){
      dom.css({
        "background":"none",
        "box-shadow":"none"
      })
      dom.find('.close').click(function(){
        layer.close(index)
      })
      dom.find('.text').text(text)
    }
  });
}

function showThankyou() {
  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['195px','363px'],
    shadeClose: false,
    shade:[0.5,"#000"],
    scrollbar: false,
    content: '<div class="thankyou"><a href="javascript:" class="close"></a></div>',
    success: function(dom,index){
      dom.css({
        "background":"none",
        "box-shadow":"none"
      })
      dom.find('.close').click(function(){
        layer.close(index)
      })
    }
  });
}

function loadAwardList(dom, query, cacheSize){
  var query=query||{};
  query.t=Date.now();
  var $container = $(dom),
      $list = $container.find('.list'),
      api = "/activity/award_list",
      list = [],
      scrolling,
      cacheSize = cacheSize || 30

  getList()

  function getList(){
    $.get(api,query,function(res){
      if(res.status){
        return setTimeout(getList, 60e3) 
      }
      list = res.data
      render()
      if(list.size < cacheSize){
        // 如果列表长度不够则定时再获取新的，够了就不再获取了
        setTimeout(getList, 5e3)
      }
    })
  }

  function render(){
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
    if(list.length > 4 && !scrolling){
      scrolling = true
      $container.find(".list-wrap").scrollbox({
        linear: true,
        step: 1,
        delay: 0,
        speed: 50,
        listElement: ".list",
        listItemElement: '.row'
      });
    }
  }

}


