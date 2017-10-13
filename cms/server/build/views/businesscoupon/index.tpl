<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit" />
    <title></title>
    <link rel="stylesheet" href="/vendor/layer/skin/layer.css">
    <link rel="stylesheet" href="/businesscoupon/index.less">
</head>
<body>
    <div class="main clearfix" id="main">
        <div class="cop-header"></div>
        <div class="cop-packets-c" id="cop-packets-c">
            <div class="cop-packets">
                <div class="cop-packets-ti"></div>
                <div class="cop-packets-ct">
                    <ul class="packets-ctt clearfix" id="packets-ctt-pac">
                        {% for v in coupon.data.data_list %}
                        <li  id="list-{{v.activityId}}" class="{%if v.couponMinAmt!=0%}packetsMoneyTop{% endif %} {% if v.dealerCouponStatus==1&&v.expiredStatus==1 %}hasTimeout {% endif %} {%if v.dealerCouponStatus==4 %}cop-timeout{% elseif v.dealerCouponStatus==3%}cop-endrob{% elseif v.dealerCouponStatus==2%}cop-hasrob{%endif%}">
                            <div class="cop-list-left packetCt">
                                <p class="packets-get">{%if v.couponMinAmt!=0%} <span class="mon-icon">￥</span><span class="packets-money">{{v.couponMinAmt/100}}</span>{% else %}<span title="{{v.dealerCouponName}}">{{v.dealerCouponName}} <span>{% endif %}</p>
                                <p class="packets-info">{%if v.effectiveAmt==0%} {% else %}满{{v.effectiveAmt/100}}可以使用{% endif %}</p>
                            </div>
                            <div class="cop-list-right packetCt">
                                <p class="packets-info"> {{v.platformLimit}}可用</p>
                                <p class="packets-info"> {{v.effectiveDate}}-{{v.unEffectiveDate}}</p>
                                <p class="packets-info dealerName-info" title="{{v.dealerName}}">{{v.dealerName}}</p>
                                <div class="packets-icon" activityId="{{v.activityId}}" type="1"></div>
                            </div>
                            <div class="iscoming" >
                            </div>
                        </li>
                        {% endfor %}
                    </ul>
                    <div class="nosearchinfo" {% for v in coupon.data.data_list %}{%if loop.last==true &&loop.length>0%}style="display: none" {% endif %}{% endfor %}>
                        很抱歉，当前无可领取的红包!
                    </div>
                </div>
                <div class="cop-packets-more">
                    <div class="packets-btn" id="packets-btn" type="1" {% for coupon in packets.data.data_list %}{%if loop.last==true &&loop.length!=0%}style="display: block" {% endif %}{% endfor %}></div>
                </div>

            </div>
        </div>
        <div class="coupon clearfix" id="coupon">
            <div class="coupon-ti clearfix">
                <div class="coupon-ti-icon"></div>
            </div>
        <div class="coupon-resultSearch">
            <div class="resultSearch">
                <div class="resultlist banch-list">
                    <ul class="clearfix" id="categories">
                        <li class="clearfix">
                            <div class="coupon-ls selected" categoryCode="C01L0101">
                                <div class="bandList-1"><span class="coupon-icon"></span></div>
                                <p >白酒</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="coupon-ls" categoryCode="C01L0102">
                                <div class="bandList-2"><span class="coupon-icon"></span></div>
                                <p >葡萄酒</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="coupon-ls" categoryCode="C01L0103">
                                <div class="bandList-3"><span class="coupon-icon"></span></div>
                                <p >洋酒</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="coupon-ls" categoryCode="C01L0104">
                                <div class="bandList-4"><span class="coupon-icon"></span></div>
                                <p >啤酒</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="coupon-ls" categoryCode="C01T01">
                                <div class="bandList-5"><span class="coupon-icon"></span></div>
                                <p>茶</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="coupon-ls" categoryCode="C01X01">
                                <div class="bandList-6"><span class="coupon-icon"></span></div>
                                <p>饮料</p>
                            </div>
                        </li>
                        <li class="clearfix  last"  >
                            <div class="coupon-ls" categoryCode="C01OTHER">
                                <div class="bandList-7"><icon class="coupon-icon"></icon></div>
                                <p >其他</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="resultlist clearfix">
                    {% include "./part/branch.tpl" %}
                </div>
                <div class="resultlist search-inputs clearfix">
                    <span class="search-ti">在下列结果中搜索：</span>
                    <div class="label clearfix"> <span>店铺：</span><span class="get-input-info" id="shopNameD"><input id="shopName" value="{{_REQUEST.dealerName}}"/></span></div>
                    <div class="label "> <span>商品：</span><span class="get-input-info" id="goodsNameD"><input id="goodsName"/></span></div>
                    <button id="searchBtn">搜索</button>
                </div>
                <div class="resultlist result-sort" id="result-sort">
                    <span class="sort-list selected" sort="default">默认</span>
                    <span class="sort-list" sort="couponMinAmt">面额
                        <span class="resultSorts">
                            <i class="sortUp "></i>  <!--增加class selected  -->
                            <i class="sortDown"></i>
                        </span>
                    </span>
                    <span class="sort-list" sort="expiredTime">过期时间
                        <span class="resultSorts">
                            <i class="sortUp"></i>
                            <i class="sortDown"></i>
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="coupon-reslut">
            <div class="cop-packets">
                <div class="cop-packets-ct ">
                    <ul class="packets-ctt clearfix" id="packets-ctt-cop">
                        {% for v in packets.data.data_list  %}
                        <li id="list-{{v.activityId}}" class="{%if v.couponMinAmt!=0%}packetsMoneyTop{% endif %} {% if v.dealerCouponStatus==1&&v.expiredStatus==1 %}hasTimeout {% endif %}{%if v.dealerCouponStatus==4 %}cop-timeout{% elseif v.dealerCouponStatus==3%}cop-endrob{% elseif v.dealerCouponStatus==2%}cop-hasrob{%endif%}">
                            <div class="cop-list-left packetCt">
                                <p class="packets-get">{%if v.couponMinAmt!=0%} <span class="mon-icon">￥</span><span class="packets-money">{{v.couponMinAmt/100}}</span>{% else %}<span title="{{v.dealerCouponName}}">{{v.dealerCouponName}} <span>{% endif %}</p>
                                <p class="packets-info">{%if v.effectiveAmt==0%} {% else %}满{{v.effectiveAmt/100}}可以使用{% endif %}</p>
                            </div>
                            <div class="cop-list-right packetCt">
                                <p class="geCouponM" > <span class="geCoupon" activityId="{{v.activityId}}" type="2">立即领取</span></p>
                                <div class="goods-infos">
                                    <p class="packets-info">  {{v.platformLimit}}可用</p>
                                    <p class="packets-info">  {{v.effectiveDate}}-{{v.unEffectiveDate}}</p>
                                    <p class="packets-info">{{v.dealerName}}</p>
                                    <div class="goods-icon">
                                        <img  width="90" height="79" {%if !v.dealerCouponImgUrl %}class="addDefailtImg" {% endif %}   {%if v.dealerCouponImgUrl %} src="{{v.dealerCouponImgUrl}}"{% endif %}/>
                                    </div>
                                </div>
                                <p class="packets-info" title="【{{v.availableChannel}}】{{v.goodsName}} ">【{{v.availableChannel}}】{{v.goodsName}} </p>
                            </div>
                            <div class="iscoming" >
                            </div>
                        </li>
                        {% endfor %}
                    </ul>
                    <div id="no-result" class="nosearchinfo" {% for v in packets.data.data_list %}{%if loop.last==true &&loop.length>0%}style="display: none" {% endif %}{% endfor %}>
                        很抱歉，当前无对应条件的优惠券!
                    </div>
                </div>
            </div>
            <div class="cop-packets-more">
                <div class="packets-btn" id="coupon-btn" type="2" {% for v in packets.data.data_list %}{%if loop.last==true &&loop.length!=0%}style="display: block" {% endif %}{% endfor %}></div>
            </div>
        </div>
        </div>
    </div>
    <div class="targetM">
        <a class="targetM-1 targetSelected" href="#cop-packets-c">
            <p class="tar-first">经销商</p>
            <p>红包</p>
        </a>
        <a class="targetM-2" href="#coupon">
            <p class="tar-first">经销商</p>
            <p>优惠券</p>
        </a>
        <a class="targetM-3" href="#main">
            <p class="tar-first">返回</p>
            <p>顶部</p>
        </a>
    </div>
    {% include "./part/clayer.tpl" %}
    {% include "../common/footer.tpl" %}
    {% block footscript %}
    {% include "../common/fis3/fis3Fun.tpl" %}
    <script type="text/javascript">
        var defaultImg="/images/businesscoupon/default.jpg";
        var SYS_JS_COURCE=[
            "/vendor/layer/layer.js", "/vendor/lib.js","/businesscoupon/index.js"];
    </script>
    {% endblock %}
    {% include "../common/addScript.tpl" %}
    {% include "../common/addPiwik.tpl" %}
</body>
</html>