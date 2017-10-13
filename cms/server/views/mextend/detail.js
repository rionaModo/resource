/**
 * Created by lingxiaohua@danlu.com on 2016/9/29.
 */
var query=urlParse();
/*
 * @fn zoom
 * 图片放大
 * **/
function zoomImg(obj){
    if(isEmpty(obj.id)||isEmpty(obj.src)){
        return
    }
    var id=obj.id;
    var src=obj.src;
    var ctrn= $("#"+id);
    var isClick=ctrn.attr("isClick");
    var img=document.createElement("img");
    img.src=src;
    $(img).load(function() {
        var imgw = width = img.offsetWidth || img.width;
        var imgh = height = img.offsetHeight || img.height;
        var style={};
        width / height > 1 ? (imgw = 600, imgh = 600 * height / width, style['padding-top']=(imgw - imgh) / 2 + 'px')  : (imgh = 600, imgw = 600 * width / height,style['padding-left'],(imgh - imgw) / 2 + 'px');
        style.width=imgw;
        style.height=imgh;
        ctrn.find('img').css(style);
        ctrn.show();
        ctrn.find('img')[0].src = src;
        if (isEmpty(isClick)) {
            ctrn.click(function () {
                $(this).hide();
            });
        }
    });
}
(function(){
    var channel={
        'S011': '烟酒专卖店',
        'S012':'便利店',
        'S013':'餐饮店',
        'S014':'商业超市',
        'S015':'其它'
    };
    function  getCoupon(){
        var el=$(this);
        var phone=$("#"+el.attr("phoneId"));
        var elTel=phone.val();
        if(!isPhone(elTel)){
            alert('请输入正确的手机号！');
            return
        }
        var data=  {
            "userPhone": elTel||"",
            "activityId":query.activityId|| "",
        };
        $.ajax({
            type: "POST",
            url: "/dealer/share_dealer_trading",
            data:JSON.stringify(data),
            contentType:"application/json",
            dataType: "json",
            success: function(data){
                if(typeof data.err=="undefined"&&typeof data.status!="undefined"){
                    couponHandle(data);
                    phone.val("输入手机号领取优惠券");
                }
            }
        });
    }
    function couponHandle(cop){
        var limitNum=0;
        if(!isEmpty(cop.data)&&!isEmpty(cop.data.limitNum)){
            limitNum=cop.data.limitNum;
        }
        var code={
            0:{msg:'券已领取成功，可在"我的优惠券"中进行查看！',cls:"clink-getIt",addInfo:true},
            1:{msg:'该链接已失效',cls:"tipscouface"},
            2:{msg:'对不起，您还不是丹露终端店注册用户，请先注册！<a href=\"http://www.danlu.com/registerNew/terminal-step1.html\">前往注册</a>',cls:"tipscouface"},
            3:{msg:'对不起，该优惠券仅限终端店用领取，请您关注丹露其它促销活动！',cls:"tipscouface"},
            4:{msg:'对不起，由于你所在的区域不在本次发放区域内，您无法领取该优惠券！',cls:"tipscouface"},
            5:{msg:'对不起，由于售卖权不匹配，您无法领取该优惠券！',cls:"tipscouface"},
            6:{msg:'您的账号还在审批中，请审批通过后再进行领取!',cls:"tipscouface"},
            7:{msg:'对不起，该券一人只能领'+limitNum+'次，您已领取'+limitNum+'次，无法再次领取！',cls:"clink-geted",addInfo:true},
            8:{msg:'您已领取该券，请使用后再进行领取！',cls:"clink-geted",addInfo:true},
            9:{msg:'对不起，您来晚了，券已被领完，下次加油！',cls:"clink-getedAll",addInfo:true},
            10:{msg:'对不起，由于您的终端店类型不匹配本券的发放限制，您无法领取该优惠券！',cls:"tipscouface"}
        }
        var coupon=cop.data
        $(".cgetInfos").html(code[cop.status].msg);
        addfaceClass("#mfaceInfos,#pcCopFace",code[cop.status].cls);
        if(!isEmpty(code[cop.status].addInfo)&&code[cop.status].addInfo==true){
            $(".coupon-info .cop-list-left .packets-money").html(coupon.couponMinAmt/100);
            $(".coupon-info .cop-list-left .packets-info").html("满"+coupon.effectiveAmt/100+"可以使用");
            var listRight=$(".coupon-info .cop-list-right");
            var avai=coupon.dealerCouponDto.availableChannel;
            var chaA=[];
            if(isEmpty(avai)){
                chaA.push('全部');
            }else {
                var avais=avai.split(',');
                for(var i= 0,len=avais.length;i<len;i++){
                    if(!isEmpty(avais[i])){
                        chaA.push(channel[trim(avais[i])]);
                    }
                }
            }
            listRight.find(".platform_limit").html((isEmpty(coupon.dealerCouponDto.platformLimit)?"WEB;APP":coupon.dealerCouponDto.platformLimit)+"可用");
            listRight.find(".effectiveTime").html(getDate(coupon.effectiveTime)+"-"+getDate(coupon.uneffectiveTime));
            listRight.find(".dealer_name").html(coupon.dealerCouponDto.dealerName);
            listRight.find(".goods_name").html("【"+chaA.join(',')+"】"+coupon.dealerCouponDto.goodsName);
            listRight.find(".goods_name").attr("title","【"+chaA.join(',')+"】"+coupon.dealerCouponDto.goodsName);
            var $img=listRight.find(".goods-icon img");
            $img[0].src=isEmpty(coupon.dealerCouponDto.dealerCouponImgUrl)?__uri('/images/businesscoupon/default.jpg'):coupon.dealerCouponDto.dealerCouponImgUrl;
            $img.click(function(){
                zoomImg({src:$img[0].src,id:'pic-layer-content'})
            })
        }

        if(cop.status==1){
            $(".main,.Mmain").hide();
            $(".invalidLinked").show();
        }
    }
    function addfaceClass(selecter,addclass){
        $(selecter).removeClass("clink-geted clink-getIt tipscouface clink-getedAll couface").addClass(addclass);
    }
    function inputBlur(){
        var el=$(this);
        if($.trim(el.val())==''){
            el.val("输入手机号领取优惠券");
        }
    }
    function inputFocus(){
        var el=$(this);
        var value=$.trim(el.val());
        if(value=="输入手机号领取优惠券"){
            el.val("");
        }
        if(!isNumber(value)){
            el.val("");
        }
    }
    $(".telInpu").focus(inputFocus).blur(inputBlur);
    $(".getActivity").click(getCoupon);
})();



