{% extends 'common/layouts/lay_0.tpl' %}

{% block seo %}
<title>丹露红包大抽奖</title>
{% endblock %}

{% block content %}
{% parent %}
{% autoescape false %}
<script>
  //活动的信息
  var ACT_INFO = {{activityInfo | json}};
  var ACT_INFO２ = {{getRest | json}};
</script>
{% endautoescape %}
<link rel="stylesheet" href="/index.less">
<link rel="stylesheet" href="/vendor/layer/skin/layer.css">

<div class="activity-banner"></div>
<div class="lucky-area act-box">
  <div class="container group">
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
        <div class="luck-rob-btn "></div>
        <div class="btn btn_gray">即将开始</div>
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

      <div class="award-list" id="lucky-list">
        <div class="title tac">中奖公布</div>
        <div class="list-table">
          <div class="wrap">
            <div class="row head">
              <div class="col">终端店名</div>
              <div class="col">手机号</div>
              <div class="col">所中奖项</div>
            </div>
            <div class="list-wrap">
              <div class="list"></div>
            </div>
          </div>
        </div>
      </div>
      {# 中奖列表end #}

      <a  id="rule-lucky" class="btn-viewrule">查看详细规则</a>
  </div>
</div>
{# 抢券end #}

<div class="lottery-area act-box">
  <div class="container h3000" ms-controller="lottery">
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

      <div class="lottery">
        <div class="lottery-award"></div>
        <div class="bg_board"></div>
        <div class="lamp-board" id="lottery-lights"></div>
        {% raw %}
        <div class="chance-left">您还剩下<strong id="chance-left">0</strong>次机会</div>
        <div class="chance-tips">（下单越多抽奖越多，详见抽奖规则）</div>
        {% endraw %}

        <div href="javascript:" class="lottery-btn disable">
          <div class="lottery-btnshow">
            <span class="pointer"></span><span class="face"></span>
          </div>
        </div>
      </div>


    <div class="prize-tips">{% autoescape false %}{{ activityInfo.lotteryMoneyTips.web}}{% endautoescape %}<a href="javascript:" id="rule-lottery" class="btn-viewrule">查看详细规则</a> </div>

    <div class="award-list" id="lottery-list">
        <div class="title tac">中奖公布</div>
        <div class="list-table">
          <div class="wrap">
            <div class="row head">
              <div class="col">终端店名</div>
              <div class="col">手机号</div>
              <div class="col">所中奖项</div>
            </div>
            <div class="list-wrap">
              <div class="list"></div>
            </div>
          </div>
        </div>
      </div>
      {# 中奖列表end #}

  </div>
</div>
{# 抽奖end #}

<div class="act-month act-box">
  <div class="container">
    <a href="javascript:" id="rule-month" class="btn-viewrule">查看详细规则</a>
    <a href="javascript:" id="mouth-reg" class="btn-viewrule btn-viewrule-bg mouth-top">查看中奖名单</a>
  </div>
</div>

<div class="act-reg act-box">
  <div class="container">
    <a href="javascript:" id="rule-reg" class="btn-viewrule btn-viewrule-bg"></a>
  </div>
</div>

{% endblock %}

{% block footscript %}
{% include "./common/fis3/fis3Fun.tpl" %}
{% parent %}
<script type="text/javascript">
  var SYS_JS_COURCE=[
    [__uri("/vendor/rotate.js"),__uri("/vendor/scrollbox.js"),__uri("/vendor/layer/layer.js"),__uri("/lib.js"),__uri("/rule.js")],
    [__uri("/lucky.js"),__uri("/lottery.js")],[__uri("/index.js")]];
</script>
{% endblock %}  