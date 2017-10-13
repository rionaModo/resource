<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit" />
    <title></title>
    <link rel="stylesheet" href="/mextend/detail.less">
</head>
<body>
<div class="main clearfix">
    <div class="sub_nav">
        <ul class="clearfix">
            <li class="left" style="float: left !important;">
                <a href="http://www.danlu.com/main/home.html" class="home">返回首页</a>
            </li>
            <li><a href="http://www.danlu.com/registerNew/terminal-step1.html">快速注册</a><!--│--></li>
            <li><a href="http://www.danlu.com/main/newLogin.html">快速登录</a>│</li>
            <li><span>您好！</span></li>
        </ul>
    </div>
    <div class="mainCenter">

        <div class="clink-tit couface" id="pcCopFace">
            <p class="title-info"><input value="输入手机号领取优惠券" class="telInpu" id="pcPhoneInput" type="text"/><span class="getActivity" phoneId="pcPhoneInput">立即领取</span></p>
            <div class="coupon-info clearfix">
                <div class="cop-list-left packetCt">
                    <p class="packets-get"><span>￥</span><span class="packets-money">50</span></p>
                    <p class="packets-info">满200可以使用</p>
                </div>
                <div class="cop-list-right packetCt">
                    <div class="goods-infos">
                        <p class="packets-info platform_limit">  WEB；APP可用</p>
                        <p class="packets-info effectiveTime"> 2016.07.04-2106.07.05</p>
                        <p class="packets-info dealer_name">湖北人人大可用</p>
                        <div class="goods-icon">
                            <img src="" width="90" height="79">
                        </div>
                    </div>
                    <p class="packets-info goods_name" title="湖北人人大 【烟酒专卖店】白云边1979 45度 ">湖北人人大 【烟酒专卖店】白云边1979 45度 </p>
                </div>
            </div>
            <p class="coupon-info-tips cgetInfos">券已领取成功，可在"我的优惠券"中进行查看！</p>
        </div>
        <div class="clink-rule">
            <p>活动说明</p>
            <p> 1、仅限终端店用户领取   2、仅限该券售卖权范围内的用户领取   3、券数量有限，先到先领</p>
        </div>
    </div>
</div>
<div class="Mmain clearfix">
    <div class="mC-tit"></div>
    <div class="mget-info flexBox">
        <div class="mget-inf-left flex"><input placeholder="输入手机号领取优惠券"  id="mPhoneInput" type="number"/></div>
        <a class="mget-btn getActivity flex" phoneId="mPhoneInput">立即领取</a>
    </div>
    <div class="couface " id="mfaceInfos">
        <div class="clink-tit ">
            <div class="coupon-info clearfix">
                <div class="cop-list-left packetCt">
                    <p class="packets-get"><span class="packets-money">0</span></p>
                    <p class="packets-info">满0可以使用</p>
                </div>
                <div class="cop-list-right packetCt">
                    <div class="goods-infos">
                        <p class="packets-info platform_limit"> </p>
                        <p class="packets-info effectiveTime"> </p>
                        <p class="packets-info dealer_name"></p>
                        <div class="goods-icon">
                            <img src="" >
                        </div>
                    </div>
                    <p class="packets-info goods_name" title=" "> </p>
                </div>
            </div>
        </div>
        <p class="cgetInfos">您已领取该券，请使用后再进行领取!</p>
    </div>

    <div class="mIntroduce">
        <p>活动说明 </p>
        <p>1、仅限终端店用户领取</p>
        <p>2、仅限该券售卖权范围内的用户领取   </p>
        <p>3、券数量有限，先到先领</p>
    </div>
    <a class="cgohome">前往丹露网></a>
</div>
<div class="invalidLinked">
    <div class="pcNolink">
        <a href="http://danlu.com/"></a>
    </div>
    <div class="mNolink">
        <a href="http://danlu.com/"></a>
    </div>
</div>

<div class="layui-layer-shade" id="pic-layer-content" style="display:none;z-index:19891014; position: fixed;top: 0;left:0; width: 100%; height: 100%;">
   <div style="position: absolute;top: 0;left:0; width: 100%; height: 100%;background-color:#000; opacity:0.5; filter:alpha(opacity=50);"></div>
    <div   style="z-index: 19891017;margin-top: -300px;margin-left: -300px; width: 600px; height: 600px; top:50%; left: 50%;position: absolute; box-shadow: none; background: #fff;">
        <div id="" class="layui-layer-content" style="height: 600px;height: 600px">
            <img   src="/images/businesscoupon/default.jpg"></div>
    </div>
</div>
{% include "../common/fis3/fis3Fun.tpl" %}
{% block footscript %}
<script type="text/javascript">
    var SYS_JS_COURCE=[
        "/vendor/lib.js","/mextend/detail.js"];
</script>
{% endblock %}
{% include "../common/addScript.tpl" %}
{% include "../common/addPiwik.tpl" %}
</body>
</html>