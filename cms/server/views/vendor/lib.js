/**
 * Created by lingxiaohua@danlu.com on 2016/10/7.
 */

/**
 * json2.js
 * */
this.JSON||(this.JSON={}),function(){function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,f,o,u,i=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(o=a.length,n=0;o>n;n+=1)u[n]=str(n,a)||"null";return f=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,f}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;o>n;n+=1)r=rep[n],"string"==typeof r&&(f=str(r,a),f&&u.push(quote(r)+(gap?": ":":")+f));else for(r in a)Object.hasOwnProperty.call(a,r)&&(f=str(r,a),f&&u.push(quote(r)+(gap?": ":":")+f));return f=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,f}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var n,r,f=t[e];if(f&&"object"==typeof f)for(n in f)Object.hasOwnProperty.call(f,n)&&(r=walk(f,n),void 0!==r?f[n]=r:delete f[n]);return reviver.call(t,e,f)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();


function __uri(uri){
    return uri;
}
/**
 * 判断一个对象是否为手机号
 */
function isPhone(phone){
    var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(phone);
}
/**
 * 判断一个对象是否为数字
 */
function isNumber(num){
    var reg=/^[0-9]+$/;
    return reg.test(num);
}
/**
 * 判断一个对象是否为空
 */
function isEmpty(obj){
    if(typeof obj=='undefined'||obj==null||obj=={}||obj==''||obj.length <= 0)return true;
    return false
}
/**
 * 获取字符串长度，返回值字符串长度，中文的为2个字符
 */
function strLen(str) {
    var chineseRegex = /[^\x00-\xff]/g;
    return str.replace(chineseRegex,"**").length;
}

var gload = function(call, time){
    time = typeof(time) == "undefined" ? 100 : time;
    setTimeout(function(){
        call();
    }, time);
};
//动态加载js
function loadScript(srcs, callback){
    var isArray = false;
    var loadCount = 0;
    var doLoad = function(){
        if (Object.prototype.toString.apply(srcs) === "[object Array]"){
            isArray = true;
            for(var i = 0, len = srcs.length; i < len; i++){
                createScriptObj(srcs[i]);
            }
        }else{
            createScriptObj(srcs);
        }

    };
    var createScriptObj = function(src){
        var scriptObj = document.createElement('script');
        scriptObj.type = 'text/javascript';
        scriptObj.src = src;
        if(callback){
            if (scriptObj.readyState){ //IE
                scriptObj.onreadystatechange = function(){
                    if (scriptObj.readyState == "loaded" || scriptObj.readyState == "complete"){
                        scriptObj.onreadystatechange = null;
                        loadCount++;
                        if(!isArray || (isArray && loadCount == srcs.length)){
                            callback();
                        }
                    }
                };
            } else { //Others: Firefox, Safari, Chrome, and Opera
                scriptObj.onload = function(){
                    loadCount++;
                    if(!isArray || (isArray && loadCount == srcs.length)){
                        callback();
                    }
                };
            }
        }
        document.getElementsByTagName("body")[0].appendChild(scriptObj);
    };
    gload(doLoad, 10);
}

//为input增加change事件
function addChangeEvent(obj,fn){
    var testinput = document.createElement('input');
    if('oninput' in testinput){
        obj.addEventListener("input",fn,false);
    }else{
        obj.onpropertychange = fn;
    }
}
/**
 * 去除字符串首尾空格
 * */

function trim(str){
    if(isEmpty(str))return '';
    return str.replace(/(^\s*)|(\s*$)/g,"")
}
/*
* 解析url search
* 返回对象
* */

function urlParse() {
    var query = {};
    var search = location.search;
    if (search.indexOf('?') >= 0) {
        var url = search.split('?')[1].split('&');
        for (var i = 0, len = url.length; i < len; i++) {
            var q = url[i].split('=');
            isEmpty(trim(q[0])) ? '' : query[trim(q[0])] = trim(q[1]);
        }
    }
    return query;
}

/**
 * @param unix,segmentation
 * eg:1477888679,-  or 1477888679000,-
 * @return date string
 * 返回unix以segmentation隔开的时间字符串
 * */

function getDate(unix,segmentation){
    var time=unix||Date.parse(new Date());
    var segmentation=segmentation||".";
    var tiA=[],mouth=00,day=00;
    if(time.toString().length==10){
        time=parseInt(time)*1000;
    }
    var date=new Date(time);
    mouth=parseInt(date.getMonth())+1;
    day=date.getDate();
    tiA.push(date.getFullYear());
    if(parseInt(mouth)<10){
        mouth='0'+mouth.toString();
    }
    if(parseInt(day)<10){
        day='0'+day.toString();
    }
    tiA.push(mouth);
    tiA.push(day);
    return tiA.join(segmentation);
}