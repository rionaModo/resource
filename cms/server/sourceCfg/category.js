
/**
 * Created by danlu on 2016/10/10.
 */
var fa = global.fa,
    bee = fa.bee,
    urlParse= require('url'),
    category = bee('category');


module.exports =function getRequestInfo(req, res, next){
    var user = res.data('user');
    var urlObj=urlParse.parse(req.url,true);
    var query=urlObj.query;
    var source={
        request:category,
        sourcePath:{
            'businesscoupon':{
                //"isRoot":true,//只是路由功能
                needLogin:false,
                category:{
                    uri:'',
                    method: 'GET'
                }
            }
        }
    }
    return source;
};