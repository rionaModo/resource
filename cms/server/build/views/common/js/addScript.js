/**
 * Created by danlu on 2016/8/5.
 * author:lingxiaohua@danlu.com
 * 延迟加载页面的js
 */
"use strict"


/**
 * _initScript 创造script标签，加载js
 * */
function _initScript(srcs, callback){
    var isArray = false;
    var loadCount = 0;
    var doLoad = function(){
        if (Object.prototype.toString.apply(srcs) === "[object Array]"){
            if(srcs.length == 0){
                if(callback){
                    callback();
                }
                return;
            }
            isArray = true;
            for(var i = 0, len = srcs.length; i < len; i++){
                createScriptObj(srcs[i]);
            }
        }else{
            if(!srcs){
                if(callback){
                    callback();
                }
                return;
            }
            createScriptObj(srcs);
        }

    };
    var createScriptObj = function(src){
        var scriptObj = document.createElement('script');
        scriptObj.type = 'text/javascript';
        scriptObj.src = src;

        if (scriptObj.readyState){ //IE
            scriptObj.onreadystatechange = function(){
                if (scriptObj.readyState == "loaded" || scriptObj.readyState == "complete"){
                    scriptObj.onreadystatechange = null;
                    loadCount++;
                    if(!isArray || (isArray && loadCount == srcs.length)){
                        if(callback){
                            callback();
                        }
                    }
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            scriptObj.onload = function(){
                loadCount++;
                if(!isArray || (isArray && loadCount == srcs.length)){
                    if(callback){
                        callback();
                    }
                }
            };
        }
        document.getElementsByTagName("body")[0].appendChild(scriptObj);
    };
    setTimeout(doLoad, 0);
}
/**
 * 将所有的操作放在dom加载之后
 * */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = function(){
            func();
        };
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
};

(function(){
    addLoadEvent(function(){
        window.SYS_JS_COURCE=window.SYS_JS_COURCE||[];
        var jquery="../vendor/jquery_1.7.1.min.js";
        SYS_JS_COURCE.unshift(jquery);
        var i= 0,len=SYS_JS_COURCE.length;
            function addScript(callback){
                _initScript(SYS_JS_COURCE[i],function(){
                    if(i<len){
                        i++;
                        addScript()
                    }else{
                        callback&&callback();
                    }
                })
            }
        addScript();
    });
})()
;