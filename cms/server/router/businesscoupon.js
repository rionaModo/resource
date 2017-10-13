/**
 * Created by danlu on 2016/9/18.
 */
module.exports = {
    mainHandle:function(req,res){
        res.render('businesscoupon/index', res.data.get(), function(err, pageHTML) {
            res.send(pageHTML)
        })
    },
    detailHandle:function(req,res){
        res.render('businesscoupon/detail', res.data.get(), function(err, pageHTML) {
            res.send(pageHTML)
        })
    }
}