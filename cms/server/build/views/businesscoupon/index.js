/**
 * Created by danlu on 2016/9/22.
 */

var query=urlParse();

/*
*  品牌控件，为品牌控件添加事件和数据
 *  @fn branchControl
*  @param obj
*   {
*         slected:"#screeningConditionsDiv",    已选品牌展示selector
*         searchBox:"#brand_div",               部分单选品牌展示selector
*        searchMoreBox:"#brand_more_div",        多选和单选的展示selector
*        MoreSelectedClass:"more_select_list",    切换成多选时，在searchMoreBox上加的class
*        startCall:function(that){   创建对象时调用的函数
*       }
*   }
*
* */

function branchControl (obj){
    var obj=obj;
    this.slected=$(obj.slected);
    this.searchBox=$(obj.searchBox);
    this.searchMoreBox=$(obj.searchMoreBox);
    this.MoreSelectedClass=obj.MoreSelectedClass;
    this.brandData={};
    this.brandData={categoryCode:"C01L0101"};
    obj.startCall(this);
    this.addChangeEvent=function(obj,fn){
        var testinput = document.createElement('input');
        if('oninput' in testinput){
            obj.addEventListener("input",fn,false);
        }else{
            obj.onpropertychange = fn;
        }
    };
    if(obj.changeData){
        this.changeData=obj.changeData;
    }
    this._start();
}
//初始化事件
branchControl.prototype._start=function(){
    var that=this;
    //更多的
    this.searchBox.find(".clear_check_cat").click(function(){
        that.showMore();
    });
    this.searchMoreBox.find(".clear_check_cat").click(function(){
        that.searchBoxShow();
    });
    //多选按钮
    this.searchBox.find(".clear_check_cat2").click(function(){
        that.showMoreSelected();
    });
    this.searchBox.find(".dl-cat-list li").click(function(){//单选品牌
        var ids=[],
            titles=[];
        ids.push($(this).attr('data-id'));
        titles.push($(this).attr('title'));
        that.selectedInfo(ids,titles);
    });
    this.searchMoreBox.find(".clear_check_cat2").click(function(){
        that.showMoreSelected();
    });
    this.searchMoreBox.find(".clear-button").click(function(){//取消多选
        that.clearSlectedData();
    });
    this.searchMoreBox.find("#letterList li").click(function(){//字母添加事件
        var obj=$(this);
        var initial= $.trim(obj.find('a').text());
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        that.searchMoreBox.find("#brandUl").empty();
    //    that.searchMoreBox.find("#selectedBrandShow").hide();
       // that.searchMoreBox.find("#brandConfirm").css("display","inline-block");
        obj.addClass("on");
        that.loadBrand(2,initial)
    });
    this.addChangeEvent(this.searchMoreBox.find("#brandNameValue")[0],function(){//input搜索改变事件
        var obj=$(this);
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        var val=obj.val();
        that.loadBrand(3,val)
    })
    this.searchMoreBox.find("#searchCon").click(function(){//多选确定
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        var val=that.searchMoreBox.find("#brandNameValue").val();
        that.loadBrand()
    });
    this.searchMoreBox.find("#brandUl li").click(function(){//选择品牌处理函数
        var $obj=$(this);
        that.addOneConditions($obj)
    });
    this.slected.find(".clear_check").click(function(){//清空已选
        var $obj=$(this);
        that.clearSlectedData($obj)
    });//
    this.searchMoreBox.find("#brandConfirmSelected").click(function(){//多选确定
        var $obj=$(this);
        var ids=[],titles=[];
        $.each(that.searchMoreBox.find("#brandAdd li"),function(i,v){
            ids.push($(v).attr('data-id'));
            titles.push($(v).attr('title'));
        })
        that.selectedInfo(ids,titles);
    });
}
//更多的事件handle
branchControl.prototype.showMore=function(){
    this.searchBox.hide();
    this.slected.hide();
    this.searchMoreBox.show();
    this.searchMoreBox.removeClass(this.MoreSelectedClass);
}
//多选事件handle
branchControl.prototype.showMoreSelected=function(){
    this.searchBox.hide();
    this.searchMoreBox.show();
    this.slected.hide();
    this.searchMoreBox.addClass(this.MoreSelectedClass);;
}
//取消事件handle
branchControl.prototype.searchBoxShow=function(){
    this.searchBox.show();
    this.searchMoreBox.hide();
    this.slected.hide();
}
branchControl.prototype.selecltedBrandClick=function(obj){
    var $obj=$(obj);
    var id=$obj.attr('data-id');
    var brandAdd=this.searchMoreBox.find('#brandAdd');
    var lis=brandAdd.find('li');
    $('#'+id).removeClass('sl-check')
    if(lis.length==1){
        brandAdd.empty();
        this.searchMoreBox.find("#selectedBrandShow").hide();
        this.searchMoreBox.find("#brandConfirmSelected").hide();
         this.searchMoreBox.find("#brandConfirm").css("display","inline-block");
    }else {
        $obj.remove();
    }
}
branchControl.prototype.loadBrand=function(type,val){//根据赛选条件加载品牌列表
    var type=type;
    var Brand=this.getBrandData();
    var uri='/dealerCoupon/getBrands';
    var data={categoryCodesStr:Brand.categoryCode}
    if(type==3){
        data.brandName=typeof val!='undefined'?val:'';
    }
    else {
        if(type==2){
            data.initial=val;
        }
        this.searchMoreBox.find("#brandNameValue").val('');
    }
    var that=this;
    $.ajax({
        type:"get",
        data:data,
        url:uri,
        success:function(data){
            var brandUl=that.searchMoreBox.find("#brandUl");
            brandUl.empty();
            if(data.status==0&&typeof data.data!='undefined'){
                if(type==1){// 单选处理
                    var searchBoxUl=that.searchBox.find(".dl-cat-list")
                    searchBoxUl.empty();
                }
                var brandAdd=that.searchMoreBox.find("#brandAdd li");
                $.each(data.data,function(i,v){
                    var selClass='';
                    $.each(brandAdd,function(j,val){
                        var selCal=$(val).attr('data-id');
                        if(v.brandId==selCal){
                            selClass='sl-check';
                        }
                    });
                    var el=$('<li data-id="'+v.brandId+'" id="'+v.brandId+'" class="sl-none '+selClass+'" title="'+ v.brandName+'"> <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i> <a href="javascript:void(0)" title="'+ v.brandName+'">'+ v.brandName+'</a></li>');
                    brandUl.append(el);
                    if(type==1&&i<22){
                        searchBoxUl.append('<li title="'+ v.brandName+'" data-id="'+v.brandId+'"> <a href="javascript:void(0)">'+ v.brandName+' </a></li>')
                    }
                });
                that.searchMoreBox.find("#brandUl li").click(function(){
                    that.addOneConditions($(this))
                });
                if(type==1){
                    that.searchBox.find(".dl-cat-list li").click(function(){//单选品牌 事件
                        var ids=[],
                            titles=[];
                        ids.push($(this).attr('data-id'));
                        titles.push($(this).attr('title'));
                        that.selectedInfo(ids,titles);
                    });
                }
            }

        }
    })
}

branchControl.prototype.addOneConditions=function($obj){ //选中品牌点击事件
    var that=this;
    var $obj=$obj;
    var title=$obj.attr("title");
    var id=$obj.attr('data-id');
    var op=this.searchMoreBox.find("#selectedBrandShow");
    if(this.searchMoreBox.hasClass(this.MoreSelectedClass)){
        if($obj.hasClass('sl-check')){
            $obj.removeClass('sl-check');
            op.find("#brandAdd #list-"+id).remove();
        }else {
            if(op.find("#brandAdd li").length>=5){
                return
            }
            $obj.addClass('sl-check');
            op.show();
            var el=$(' <li id="list-'+id+'" class="sl-check" title="'+title+'" data-id="'+id+'"> <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i> <a href="javascript:void(0)" title="'+title+'"> '+title+' </a> </li>');
            el.click(function(){
                that.selecltedBrandClick(this);
            });
            op.find("#brandAdd").append(el);
        }
        if(op.find("#brandAdd li").length>0){
            this.searchMoreBox.find("#brandConfirmSelected").css("display","inline-block");
            this.searchMoreBox.find("#brandConfirm").hide();
        }else{
            this.searchMoreBox.find("#brandConfirmSelected").hide();
            this.searchMoreBox.find("#brandConfirm").css("display","inline-block");
        }
    }else {
        var ids=[],titles=[];
        ids.push($obj.attr('data-id'));
        titles.push($obj.attr('title'))
        this.selectedInfo(ids,titles);
    }

}
branchControl.prototype.selectedInfo=function(ids,titles){//选中品牌
    this.setBrandData('brandId',ids);
    this.brandData.brandTitle=titles;
    var id=ids.join(','),title=titles.join('、');
    this.slected.show();
    this.searchBox.hide();
    this.searchMoreBox.hide();
    var that=this;
    var slectes=this.slected.find("#screeningConditions");
    slectes.empty();
    slectes.append('<li id="brand" data-id="id">品牌：'+title+'<i class="on" onclick=""></i></li>');
    slectes.find('li .on').click(function(){
        that.clearSlectedData()
    });
}
branchControl.prototype.clearSlectedData=function(){//取消所有已选择信息
    this.setBrandData('brandId',[]);
    this.searchBoxShow();
    var slectes=this.slected.find("#screeningConditions").empty();
    this.searchMoreBox.find("#brandAdd").empty();
    this.searchMoreBox.find("#selectedBrandShow").hide();
    this.searchMoreBox.find("#brandConfirmSelected").hide();
    this.searchMoreBox.find("#brandConfirm").css("display","inline-block");
    this.searchMoreBox.find("#brandUl li.sl-check").removeClass("sl-check");
    this.searchMoreBox.find("#letterList li.on").removeClass("on");
}
branchControl.prototype.getBrandData=function(){
    return this.brandData;
}
branchControl.prototype.setBrandData=function(key,value){
    if(typeof key!='undefined'&&typeof value!='undefined')this.brandData[key]=value;
    if(this.changeData){
        this.changeData(key,value,this);
    }
    return this.brandData;
}
var brand=new branchControl({
    slected:"#screeningConditionsDiv",
    searchBox:"#brand_div",
    searchMoreBox:"#brand_more_div",
    MoreSelectedClass:"more_select_list",
    changeData:function(key,value){
        setSearchDefault();
        var pData=getSearchParam();
        var opUl=$("#packets-ctt-cop");
        opUl.empty();
        addContent(pData,"#packets-ctt-cop");
    },
    startCall:function(that){//选择品牌处理函数
        var $obj=$("#categories li .coupon-ls.selected");
        var categoryCode=$obj.attr("categoryCode");
        that.brandData.categoryCode=categoryCode;
    }
});

function openlayer(option,data,callback){//
    if(arguments.length=2){
        var callback=data;
        var data=option;
        var option={};
    }
    var lay=option.content||$("#coupon-pakerts-layer").html();
    layer.open({
        type: 1,
        scrollbar: option.scrollbar||false,
        title: option.title||false,
        closeBtn: 0,
        area: option.area||['838px','262px'],
        shadeClose: option.shadeClose||true,
        shade:[0.5,"#000"],
        content:lay,
        success: function(dom,index){
            dom.css({
                "background":"none",
                "box-shadow":"none"
            });
            if(typeof callback=="function"){
                callback(data,dom,index);
            }
        }
    });
}//弹出层
function create_dealer(obj){//立即领取
    var $obj=isEmpty(obj)?$(this):$(obj);
    var type= $obj.attr("type");
    var activityid=$obj.attr("activityid")||"";
    var query=urlParse();
    var data={
        "companyId": isEmpty(query.companyId)?'':query.companyId,
        "activityId": activityid
    };
    $.ajax({
        type: "POST",
        url: "/dealer/create_dealer_trading",
        data:JSON.stringify(data),
        contentType:"application/json",
        dataType: "json",
        success: function(data){
            if(typeof data.err!="undefined"||typeof data.status=='undefined'){
                if(type==1){
                    data.status=1;
                }else {
                    data.status=3;
                }
            }
            if(type==1){
                if(data.status!=0&&data.status!=1){
                    data.status=1;
                }
            }
            if(type==2){
                if(data.status!=2&&data.status!=3&&data.status!=8){
                    data.status=3;
                }else if(data.status==8){
                    data.status=4;
                }
            }
            data.type=type;
            if(data.status==3||data.status==1||data.status==4){
                if(data.status==4){
                    $("#list-"+activityid).addClass('cop-hasrob');
                }else {
                    $("#list-"+activityid).addClass('cop-endrob');
                }
            }else {
                if(data.status==2||(isEmpty(data.data.remainNum)&&data.data.remainNum==0)){
                    $("#list-"+activityid).addClass('cop-hasrob');
                    $("#list-"+activityid+" .packets-get").html('<span>￥</span><span class="packets-money">'+data.data.couponAmt/100+'</span>');
                }
            }
            openlayer(data,openLayerHandle);
        }
    });
}
function openLayerHandle(data,dom,index){//立即领取请求成功处理函数
    dom.find('.clayer-close').click(function(){layer.close(index);});
    var page=data.status;
    var list=dom.find('.clayer-lists').eq(page);
    list.show();
    list.find('.clayer-close-time').html(3);
    if(data.status==0||data.status==2){
        list.find('.clayer-packets-info').html("( "+data.data.couponAmt/100+"元 )");
        list.find('.clayer-packets-get span').html(data.data.couponAmt/100);
    }
    function changeTime(time){
        if(time==0){
            layer.close(index);
        }else{
            time--;
            setTimeout(function(){
                changeTime(time);
                dom.find('.clayer-close-time').html(time);
            },1000);
        }
    }
    changeTime(3);
}
/*@fn :associate
* html:<div class="parent"> <input /> </div> or <span class="parent"> <input /> </span>  parent relative
* param:
* {
*  target:".parent",   //input的父元素 即
*  data：{},    //obj or string
*  dataFormat:{data:GoodsList,value:,text:}
*  url:"12",
*  headers:{}
*  }
*
*  依赖：jquery
* */
function associate(obj){
    var param={
        type:"GET",
        headers:{}
    }
    $.extend(param,obj);
    if(isEmpty(param.target)){
        alert('缺少联想父元素');
        return;
    }
    if(isEmpty(param.url)){
        alert('缺少请求地址');
        return;
    }
    if(isEmpty(param.dataFormat)){
        alert('缺少返回数据格式');
        return;
    }
    $.ajax({
        type: param.type,
        url: param.url,
        data:param.data,
        headers:param.headers,
        dataType: "json",
        success: function(data){
            var dataFormat=param.dataFormat;
            if(!isEmpty(data)){
                var associateCtent=$(param.target).find(".associateCtent");
                if(associateCtent.length==0){
                    $(param.target).append("<div class='associateCtent'></div>");
                    associateCtent=$(param.target).find(".associateCtent");
                    var input=$(param.target).find('input');
                    var close=function() {
                        var obj=this;
                        var target = obj.target || obj.srcElement;
                        var parentNode = target;
                        while (parentNode != document && parentNode != window && parentNode != null&&typeof parentNode!='undefined') {
                          if(parentNode==$(param.target)[0]||input==parentNode){
                              return;
                          }
                            parentNode = target.parentNode;
                        }
                        associateCtent.hide()
                    }
                        $(document).click(close)
                }
                associateCtent.html("");
                if(!isEmpty(data.data)&&!isEmpty(data.data)){
                    associateCtent.show();
                    var lists=data.data;
                    if(!isEmpty(dataFormat.data)&&!isEmpty(data.data[dataFormat.data])){
                        var lists=data.data[dataFormat.data];
                    }
                    var html="<ul class='associateUl'>";
                    var vKey=dataFormat.value;
                    var tKey=dataFormat.text;
                    $.each(lists,function(i,v){
                        html=html+"<li data-id='"+v[vKey]+"' data-text='"+v[tKey]+"'>"+ v[tKey]+"</li>"
                    })
                    html=html+"</ul>";
                    associateCtent.append(html);
                    associateCtent.find("li").click(function(){
                        var input=$(param.target).find('input');
                        var obj=$(this);
                        var dataId=obj.attr("data-id");
                        var dataText=obj.attr("data-text");
                        input.val(dataText);
                        input.attr("data-id",dataId);
                        associateCtent.hide();
                    })
                }
            }
        }
    });
}
/*
* @fn zoom
* 图片放大
* **/
function zoom(obj){
    var src=$(obj).find('img').attr('src');
    isEmpty(src)?src=defaultImg:'';
    var img=document.createElement("img");
    img.src=src;
    $(img).load(function(){
        var imgw=width= img.offsetWidth||img.width;
        var imgh=height=img.offsetHeight||img.height;
        var style=''
        width/height>1?(imgw=600,imgh=600*height/width,style='padding-top:'+(imgw-imgh)/2+'px'):(imgh=600,imgw=600*width/height,style='padding-left:'+(imgh-imgw)/2+'px');
        layer.open({
            type: 1,
            title: false,
            scrollbar: false,
            closeBtn: 0,
            area: ['600px','600px'],
            shadeClose: true,
            shade:[0.5,"#000"],
            content:'<div class="layer-content" style="width: 100%;height: 100%"><img style="'+style+'" width="'+imgw+'" height="'+imgh+'" src="'+src+'"></div>',
            success: function(dom,index){
                dom.find(".layer-content").click(function(){
                    layer.close(index)
                });
                dom.css({
                    "background":"#fff",
                    "box-shadow":"none"
                });
            }
        });
    });

}

function addPackets(v,type){
    var liClass='';
    if(v.dealerCouponStatus==1&&v.expiredStatus==1){
        liClass='hasTimeout';
    }else if(v.dealerCouponStatus==2){
        liClass='cop-hasrob';
    }else if(v.dealerCouponStatus==3){
        liClass='cop-endrob';
    }else if(v.dealerCouponStatus==4){
        liClass='cop-timeout';
    }
    if(v.couponMinAmt!=0){
        liClass=liClass+' packetsMoneyTop';
    }
    var right1= '<p class="packets-info">'+v.platformLimit+'可用</p>'
        + '<p class="packets-info">'+v.effectiveDate+'-'+v.unEffectiveDate+'</p>'
        +'<p class="packets-info dealerName-info" title="'+v.dealerName+'">'+v.dealerName+'</p>'
        +'<div class="packets-icon" activityId="'+v.activityId+'" type="1" onclick="create_dealer(this)"></div>'
    var right2= '<p class="geCouponM" ><span class="geCoupon" activityId="'+v.activityId+'" type="2"  onclick="create_dealer(this)"> 立即领取</span></p>'
        +'<div class="goods-infos">'
        +'<p class="packets-info">'+v.platformLimit+'可用</p>'
        +' <p class="packets-info">'+v.effectiveDate+'-'+v.unEffectiveDate+'</p>'
        +'<p class="packets-info">'+v.dealerName+'</p>'
        +'<div class="goods-icon" onclick="zoom(this)">'
        +'<img src="'+(isEmpty(v.dealerCouponImgUrl)?defaultImg:v.dealerCouponImgUrl)+'" width="90" height="79"/>'
        +'</div>'
        +'</div>'
        +'<p class="packets-info" title="【'+v.availableChannel+'】'+v.goodsName+' ">【'+v.availableChannel+'】'+v.goodsName+'</p>';
   var paket='<span>'+v.dealerCouponName+'</span>';
    if(v.couponMinAmt!=0){
        paket='<span class="mon-icon">￥</span><span class="packets-money">'+v.couponMinAmt/100+'</span>';
    }
    var html='<li class="'+liClass+'" id="list-'+v.activityId+'"><div class="cop-list-left packetCt">' +
        '<p class="packets-get">' +paket +'</p>'
        +'<p class="packets-info">'+(v.effectiveAmt==0?"":'满'+v.effectiveAmt/100+'可以使用')+'</p></div>'
        +'<div class="cop-list-right packetCt">'
        +(type==1?right1:right2)
        +'</div>'
        +'<div class="iscoming">'
        +'</div>'
        +'</li>';
    return html;
}
/*
 * fn:getSearchParam
 * @return  obj 获取搜索数据
 * */
var getSearchParam=function (){
    var pData={};
    var branddata=brand.getBrandData();
    pData.categoryCode=branddata.categoryCode;
    pData.dealerCouponType="11";
    pData.companyId=isEmpty(query.companyId)?'':query.companyId;
    pData.brandIds=isEmpty(branddata.brandId)?[]:branddata.brandId;
    pData.pageIndex=1;
    pData.pageSize=10;
    pData.showWay="0";
    var sortObj=$("#result-sort .sort-list.selected");
    var key=isEmpty(sortObj.attr('key'))?"default":sortObj.attr('key');
    if(sortObj.hasClass('asc')&&key!='default'){
        key=key+":asc";
    }else if(sortObj.hasClass('desc')&&key!='default'){
        key=key+":desc";
    }
    pData.sortParams=key;
    isEmpty(trim($('#shopName').val()))?"":pData.dealerName=$('#shopName').val();
    isEmpty(trim($('#goodsName').val()))?"":pData.goodsName=$('#goodsName').val();
    return pData;
}
/**
 * @fn addContent
 * @param: qs,selector  [ 请求参数，选择器]
 * @intr：向元素中添加优惠券、红包的信息
 * **/
function addContent(qs,selector,type){
    var type=isEmpty(type)?2:type;
    $.ajax({
        type:'POST',
        url: '/dealer/getCenterCouponDetail',
        data: JSON.stringify(qs),
        contentType:"application/json",
        dataType: "json",
        success: function (coupon) {
            if(!isEmpty(coupon.data)&&!isEmpty(coupon.data.data_list)){
                if(coupon.data.data_list.length<10){
                    if(type==1){
                        $('#packets-btn').hide();
                    }else {
                        $("#coupon-btn").hide();
                        if(coupon.data.data_list.length==0&&type==3){//type==3 从搜索按钮进来
                            $("#no-result").show();
                        }
                    }
                }
                var opUl=$(selector);
                $.each(coupon.data.data_list,function(i,v){
                    var html=addPackets(v,type);opUl.append(html);
                })
            }else{
                if(type==1){
                    $('#packets-btn').hide();
                }else {
                    $("#coupon-btn").hide();
                    if(type==3){
                        $("#no-result").show();
                    }
                }
            }
        }
    });
}

/*
*@fn:setSearchDefault
*将搜索相关的数据恢复默认
* **/
function setSearchDefault(type){
    if(isEmpty(type)||type!=1){
        $('#shopName').val('');
        $('#goodsName').val('');
    }
    var sorts=$("#result-sort .sort-list");
    sorts.removeClass("selected asc desc");
    sorts.eq(0).addClass("selected");
    $("#no-result").hide();
    $("#coupon-btn").show();
    $("#coupon-btn")[0].page=1;
}
(function(){
    $("#categories li .coupon-ls").click(function(){//选择品牌处理函数
        var $obj=$(this);
        $("#categories li .coupon-ls").removeClass('selected');
        $obj.addClass('selected');
        var categoryCode=$obj.attr("categoryCode");
        brand.brandData.categoryCode=categoryCode;
        brand.loadBrand(1)
        brand.clearSlectedData();
    });
    $('#searchBtn').click(function(){
        var pData=getSearchParam();
        setSearchDefault(1);
        var opUl=$("#packets-ctt-cop");
        opUl.empty();
        addContent(pData,"#packets-ctt-cop",3);
        $('#coupon-btn')[0].page=1;
    });
    $("#result-sort .sort-list").click(function(){//为排序按钮添加事件
        $obj=$(this);
        var pData=getSearchParam();
        $('#coupon-btn').show();
        $('#coupon-btn')[0].page=1;
        var sorts=$("#result-sort .sort-list");
        sorts.removeClass("selected");
        var key=$obj.attr('sort');
        if(key!='default'){
            if($obj.hasClass('desc')||(!$obj.hasClass('desc')&&!$obj.hasClass('asc'))){
                $obj.removeClass("selected asc desc").addClass('selected asc');
                pData.sortParams=key+":asc"
            }else {
                $obj.removeClass("selected asc desc").addClass('selected desc');
                pData.sortParams=key+":desc"
            }
        }else {
            sorts.removeClass("selected asc desc")
            sorts.eq(0).addClass("selected");
        }
        var opUl=$("#packets-ctt-cop");
        opUl.empty();
        addContent(pData,"#packets-ctt-cop")
    });
    $("#packets-ctt-pac li .packets-icon,#packets-ctt-cop li .geCoupon").click(function(){
        create_dealer(this);
    });//点击领券获取事件
    $("#packets-ctt-cop li .goods-icon").click(function(){
        zoom(this);
    });
    $("#packets-btn,#coupon-btn").click(function(){
        var $obj=$(this);
        var type=$obj.attr('type');
        var pData=getSearchParam();
        var page=isEmpty($obj[0].page)?1:$obj[0].page;
        pData.pageIndex=++page;
        $obj[0].page=page;
        var data = {
            "dealerCouponType": "10",
            "companyId": isEmpty(query.companyId)?'':query.companyId,
            "pageIndex": page,
            "pageSize": 10,
            "showWay": "0",
            "sortParams": "default"
        }
        type==1?pData=data:"";
        var opSelector=type==1?"#packets-ctt-pac":"#packets-ctt-cop";
        addContent(pData,opSelector,type)
    });//分页按钮
    addChangeEvent($("#shopName")[0],function(){
        var $obj=$(this);
        if(isEmpty($.trim($obj.val()))){
            $(this.parentNode).find('.associateCtent').length>0?$(this.parentNode).find('.associateCtent').hide():'';
            return
        }
        var data={dealerName:$obj.val(),companyType:"S02",pageIndex:1,pageSize:10};
        associate({
            url:"/dealer/getStoreName",
            target:"#shopNameD",
            dataFormat:{value:"companyId",text:"companyName"},
            data:data
        })
    });//店铺联想
    addChangeEvent($("#goodsName")[0],function(){
        var $obj=$(this);
        if(isEmpty($.trim($obj.val()))){
            $(this.parentNode).find('.associateCtent').length>0?$(this.parentNode).find('.associateCtent').hide():'';
            return
        }
        var data={goodsName:$obj.val(),pageIndex:1,pageSize:10};
        associate({
            url:"/dealer/getGoodsName",
            target:"#goodsNameD",
            dataFormat:{value:"goodsId",text:"goodsName"},
            data:data
        })
    });//商品联想
    $(".targetM a").click(function(){
        $(".targetM a").removeClass('targetSelected');
        if(!$(this).hasClass('targetM-3'))$(this).addClass('targetSelected');
    });
$("#packets-ctt-cop .addDefailtImg").attr('src',defaultImg)
})();







