<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <meta name="renderer" content="webkit" />
  <title>感恩丹露，一触即发</title>
  <link rel="stylesheet" href="/static/m/index_cab9871.css">
  {% autoescape false %}
  <script>
    var _paq = _paq || []
    //活动的信息
    var ACT_INFO = {{activityInfo | json}}
  </script>
  {% endautoescape %}
</head>
<body>
<div class="act-bg"><img src="/static/m/images/banner.jpg" alt=""></div>
<div class="tac" style="background-color: #b11e28;"><img src="/static/m/images/title_hongbao.jpg" alt=""></div>
<div class="lucky-activity-ctt ">
  <div class="lucky-activity">
    <div class="lamp-board" id="lucky-lights">
      <div class="lamp" style="left:0;top:0;"></div>
      <div class="lamp" style="left: 50px;top:0;"></div>
      <div class="lamp" style="left: 100px;top: 0;"></div>
      <div class="lamp" style="left: 150px;top: 0;"></div>
      <div class="lamp" style="left: 200px;top: 0;"></div>
      <div class="lamp" style="left: 250px;top: 0;"></div>
      <div class="lamp" style="left: 300px;top: 0;"></div>
      <div class="lamp" style="left: 350px;top: 0;"></div>
      <div class="lamp" style="right: -10px;top: 0;"></div>
      <div class="lamp" style="right: -10px;top: 50px;"></div>
      <div class="lamp" style="right: -10px;top: 100px;"></div>
      <div class="lamp" style="right: -10px;top: 150px;"></div>
      <div class="lamp" style="right: -10px;top: 200px;"></div>
      <div class="lamp" style="right: -10px;top: 250px;"></div>
      <div class="lamp" style="right: -10px;top: 300px;"></div>
      <div class="lamp" style="right: -10px;top: 350px;"></div>
      <div class="lamp" style="right: -10px;top: 400px;"></div>
      <div class="lamp" style="left: 350px;bottom:22px;"></div>
      <div class="lamp" style="left: 300px;bottom:22px;"></div>
      <div class="lamp" style="left: 250px;bottom:22px;"></div>
      <div class="lamp" style="left: 200px;bottom:22px;"></div>
      <div class="lamp" style="left: 150px;bottom:22px;"></div>
      <div class="lamp" style="left: 100px;bottom:22px;"></div>
      <div class="lamp" style="left: 50px;bottom:22px"></div>
      <div class="lamp" style="left:0;bottom:22px"></div>
      <div class="lamp" style="left: -0;top: 350px;"></div>
      <div class="lamp" style="left: -0;top: 300px;"></div>
      <div class="lamp" style="left: -0;top: 250px;"></div>
      <div class="lamp" style="left: -0;top: 200px;"></div>
      <div class="lamp" style="left: -0;top: 150px;"></div>
      <div class="lamp" style="left: -0;top: 100px;"></div>
      <div class="lamp" style="left: -0;top: 50px;"></div>
    </div>
    <a  class="rob-tag"></a>
    <div  id="lucky-action-btn" class="btn btn_gray">即将开始</div>
    <div class="timebar" id="lucky-time-bar">
      <div class="time-group hour">
        <div class="time-item"></div>
        <div class="time-item"></div>
      </div>
      <div class="time-group min">
        <div class="time-item"></div>
        <div class="time-item"></div>
      </div>
      <div class="time-group sec">
        <div class="time-item"></div>
        <div class="time-item"></div>
      </div>
    </div>
  </div>
</div>
<div class="tac btn-rob fisrt-ch">
  <a  id="lucky-rule" class="btn-rule">查看规则</a>
  <a  id="lucky-winning" class="btn-rule">查看中奖名单</a>
</div>
<div class="lottery-area">
  <div class="caidai"></div>
  <div class="tac mt20 group"><img src="/static/m/images/activity/title_lottery.png" width="80%" alt=""></div>
  <p class="lorry-money"> {{activityInfo.lotteryMoneyTips.app}} </p>

  <div class="timebar" id="lottery-time-bar">
    <div class="time-group hour">
      <div class="time-item"></div>
      <div class="time-item"></div>
    </div>
    <div class="time-group min">
      <div class="time-item"></div>
      <div class="time-item"></div>
    </div>
    <div class="time-group sec">
      <div class="time-item"></div>
      <div class="time-item"></div>
    </div>
  </div>

  <div class="lottery" id="lottery-anchor">
    <div class="lottery-award" style="
    transform: rotate(-9.5deg);
"></div>
    <div class="bg_board"></div>
    <div class="lamp-board" id="lottery-lights"></div>
    <div class="chance-left">您还剩下<strong id="chance-left">0</strong>次机会</div>
    <div class="lorry-Tips">（下单越多抽奖越多，详见抽奖规则）</div>
    <a  class="lottery-btn disable"><span class="pointer"></span><span class="face"></span></a>
  </div>
  <div class="tac btn-rob rob-mrg" >
    <a  id="lottery-rule" class="btn-rule">查看规则</a>
    <a  id="lottery-winning" class="btn-rule">查看中奖名单</a>
  </div>
</div>

<div class="caidai"></div>
<div class="month tac">
  <img src="/static/m/images/month.jpg" alt="">

  <div class="tac btn-rob">
    <a  id="month-rule" class="btn-rule">查看规则</a>
    <a  id="mouth-winning" class="btn-rule">查看中奖名单</a>
  </div>
</div>

<div class="caidai"></div>
<div class="register tac">
  <img src="/static/m/images/zhuce.jpg" alt="">
  <div class="tac btn-rob last_rob" style="text-align: center">
    <a  id="reg-rule" class="btn-rule">查看规则</a>
  </div>

</div>
<div class="rule-panel">
  <div class="layer-content">
    <div class="layer-cls-btn"></div>
    <div class="bg-t"></div>
    <div class="bg-m">
      <div class="content">
        <div class="rule-tip">活动规则：</div>
        <div class="title"></div>
        <div class="rules"></div>
        <a href="javascript:" class="close">关闭</a>
      </div>
    </div>
    <div class="bg-b"></div>
  </div>
</div>
{% include "../common/addPiwik.tpl" %}
<script type="text/javascript" src="/static/m/addScript.js"></script>
</body>
</html>


