/**
 * Created by danlu on 2016/7/20.
 */
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
}

function __uri(uri){
    return uri;
}


addLoadEvent(function(){
    _initScript(__uri("/vendor/jquery_1.7.1.min.js"),function(){
        jQuery=$.noConflict();
        _initScript([__uri('/vendor/zepto.js')], function(){
            _initScript([__uri('/vendor/scrollbox.js'),__uri('/lib.js'),__uri('/rule.js')], function(){
                _initScript(__uri('/m/index.js'), function(){
                });
            });
        });
    })

});
