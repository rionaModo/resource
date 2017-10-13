/**
 * Created by danlu on 2016/9/22.
 */
var fa = global.fa,
    bee = fa.bee,
    urlParse= require('url'),
    promotionx = bee('promotionx');


module.exports =function getRequestInfo(req, res, next){
    debugger
    var user = res.data('user');
    var urlObj=urlParse.parse(req.url,true);
    var urlStr=urlParse.parse(req.url);
    var query=urlObj.query;
    var source={
        request:promotionx,
        sourcePath:{
            'index/detail':{
                renderPath:"index",//渲染模板路径
                getRest:{
                    encoding: null,
                   // baseUrl: 'http://123.57.239.53:9001/',
                    qs: { areaCode: 'CHNP035', companyType: 'S01', activityType: '02' },
                    uri: '/activity/recent',
                    method: 'GET'
                },
                getRest2:{
                    encoding: null,
                    uri: '/activity/2344555',
                    method: 'GET',
                }
            },
            'businesscoupon':{
                //"isRoot":true,//只是路由功能
                needLogin:false,
                coupon:{
                  //  baseUrl: 'http://192.168.50.233:9002',
                     uri: '/dealerCoupon/getCenterCouponDetail',
                     method: 'POST',
                     json: {
                         "companyId": query.companyId||"",
                         "dealerCouponType": "10",
                         "showWay": "0",
                         "pageIndex": 1,
                         "pageSize": 10
                     }
                },
             packets:{
                   // baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/getCenterCouponDetail',
                    method: 'POST',
                    json: {
                        "companyId": query.companyId||"",
                        "dealerCouponType": "11",
                        "categoryCode": "C01L0101",
                        "showWay": "0",
                        "pageIndex": 1,
                        "dealerName":query.dealerName||null,
                        "pageSize": 10,
                        "sortParams":"default"
                    }
                },
                brands:{
                //    baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/getBrands',
                    method: 'GET',
                    qs:{ categoryCodesStr: 'C01L0101' }
                }
            },
            'mextend/getcoupon':{
                isRoot:true,//只是路由功能
                 needLogin:false //不需要登录
            },
            'dealer/getCenterCouponDetail':{//优惠券信息 领券中心
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                coupon:{
              //      baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/getCenterCouponDetail',
                    method: 'POST',
                    json: req.body
                }
            },
            'dealer/create_dealer_trading':{//领券中心 立即领取
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                coupon:{
                 //   baseUrl: 'http://123.57.239.53:9001',
                    uri: '/dealer/create_dealer_trading',
                    method: 'POST',
                    json:req.body
                }
            },
            'dealer/getStoreName':{//领券中心 店铺联想
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                store:{
                  //  baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/nameMatching',
                    method: 'GET',
                    qs:urlObj.query
                }
            },
            'dealer/getGoodsName':{//领券中心 商品联想
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                goods:{
                    //baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/goodsMatching',
                    method: 'GET',
                    qs:urlObj.query
                }
            },
            'dealerCoupon/getBrands':{//领券中心 根据类目Code，字母或者品牌名称查询品牌
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                brands:{
                   // baseUrl: 'http://192.168.50.233:9002',
                    uri: '/dealerCoupon/getBrands',
                    method: 'GET',
                    qs:urlObj.query
                 //   body: urlStr.query
                }
            },
            'dealer/share_dealer_trading':{//链接领券 立即领取
                isRoot:true,//只是路由功能
                needLogin:false,//是否需要登录
                coupon:{
                  //  baseUrl: 'http://123.57.239.53:9001',
                    uri: '/dealer/share_dealer_trading',
                    method: 'POST',
                    json: req.body
                }
            }
        }
    }
    return source;
};

