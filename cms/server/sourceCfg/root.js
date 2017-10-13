/**
 * Created by danlu on 2016/10/10.
 */
var fa = global.fa,
    bee = fa.bee,
    urlParse= require('url');


module.exports =function getRequestInfo(req, res, next){
    var user = res.data('user');
    var urlObj=urlParse.parse(req.url,true);
    var query=urlObj.query;
    var source={
        sourcePath:{
            'businesscoupon/instruction':{
                needLogin:false,
            }
        }
    }
    return source;
};