/**
 * Created by danlu on 2016/9/22.
 */
var fa = global.fa,
    bee = fa.bee,
    urlParse= require('url'),
    company = bee('company');


module.exports =function getRequestInfo(req, res, next){
    var user = res.data('user');
    var urlObj=urlParse.parse(req.url,true);
    var query=urlObj.query;
    var source={
        request:company,
        sourcePath:{

        }
    }
    return source;
};

