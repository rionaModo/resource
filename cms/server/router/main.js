/**
 * Created by danlu on 2016/9/23.
 */

var fa = global.fa,
    bee = fa.bee,
    promotionx = bee('promotionx'),
    _=require("lodash")
    config = fa.config,
    nodePath = require('path'),
    urlParse= require('url'),
    querystring=require('querystring');
    faUtil = fa.util,
    sourceCfgs = fa.util.loadWholeDirectory(config.sourceCfg);


module.exports=function(req, res, next){
    var urlQueryObj=urlParse.parse(req.url,true).query;
    var uri=urlParse.parse(req.url).pathname;
     uri=uri.split('.')[0];
    if(uri.length>1&&uri.charAt(uri.length-1)=='/'){
        uri=uri.substring(0,uri.length-1);
    }
    if(uri.charAt(0)=='/'){
        uri=uri.substring(1,uri.length);
    }
    if(uri.length==0){
        uri="index";
    }
    var requestPeo=[];
    var renderPath=uri;
    var isRoot=false;//是否只是向后台请求；
    var hasPage=false;//是否已配置;
    var needLogin=true;//是否需要登陆
    var keys=[];//数据key值
    _.forIn(sourceCfgs, function(value, key) {
        debugger
        var source=value(req, res, next);
        var _request=source.request;
        sourcePath=source.sourcePath;
        if(sourcePath[uri]) {
            hasPage = true;
            var nowPagePath = sourcePath[uri];
            renderPath = nowPagePath.renderPath || renderPath;
            isRoot = nowPagePath.isRoot || isRoot;
            needLogin = nowPagePath.needLogin === false ? false : needLogin;
            if (source.request) {
                var _request = source.request;
            _.forIn(sourcePath[uri], function (value, key) {
                if (key != 'renderPath' && key != 'needLogin' && key != 'isRoot') {
                    keys.push(key);
                    var list = _request(value);
                    var promise = list.json().spread(function (data, response, bee) {
                        debugger
                        res.data(key, data);
                        return [data, response, bee]
                    }).catch(function () {
                        // 取不到配置的活动信息就返回空活动，或者配置的活动id，不存在活动信息
                        var v = {status: 0, data: null, err: -1};
                        res.data(key, v);
                        return v;
                    });
                    requestPeo.push(promise);
                }
            });
        }
        }
    });
    if (needLogin&&!req.session.user&&hasPage) {//未登录
        if(req.is('text/html')){
            res.redirect("/login");
        }else{
            !req.xhr && res.status(403)
            res.send({
                status: 403,
                msg:"未登录或登录失效"
            })
        }
        return
    }
    //已经登录或者不需要登录
    if(keys.length==0){
        if(hasPage){
            res.render(renderPath, res.data.get(), function(err, pageHTML) {
                debugger
                if(err){
                    next();
                }
                res.send(pageHTML);
            });
        }else {
            next();
        }
        return;
    }
    Promise.all(requestPeo).spread(function(data){
        if(isRoot){
            var reqData=res.data.get(),resObj={};
            if(keys.length==0) res.json(data);
            if(keys.length==1) res.json(reqData[keys[0]]);
            if(keys.length>1){
                _.forIn(keys, function(value, key) {
                    resObj[value]=reqData[value]
                });
                res.json(resObj);
            }
            return
        }

        res.data('_REQUEST', urlQueryObj);
        res.render(renderPath, res.data.get(), function(err, pageHTML) {
            if (err) return next(err)
            res.send(pageHTML)
        });
    });
}


