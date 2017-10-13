var nodePath = require('path'),
  express = require('express'),
  fa = global.fa,
  config = fa.config,
  siteConfig = config.site,
  middleware = fa.middleware,
  Routers = fa.util.loadWholeDirectory(nodePath.join(__dirname, 'router')),
  auth = middleware.get("auth")(),
  apiProxy = middleware.get("api")()

module.exports = function(router) {

  // 开发时才能有，watch文件自动加载
  if (config.fa.liveload) {
    liveload(router)
  }

  //全局数据
  globalData(router)
  router.use(Routers.main);
  // 登录逻辑和页面
  router.get("/login", Routers.login.get)
  router.get("/logout", Routers.login.logout)
  router.get(Routers.login.ticketRecievePath, Routers.login.ssoTickedLogin)
 // router.get("/businesscoupon", Routers.businesscoupon.mainHandle);
 // router.get("/businesscoupon/detail", Routers.businesscoupon.detailHandle);
  router.get("/", Routers.index.get)
  router.get("/m", Routers.index.mobileIndex)
  router.get("/error", Routers.index.errorHandle);

 // router.get("/m/detail", Routers.index.mobileIndex)
  // 之后的请求都需要登录
  router.use(auth);

  router.get("/login/user", Routers.api.loginUser)
  router.get("/activity/chance", Routers.activity.leftChance)
  router.get("/activity/roll", Routers.activity.roll)
  router.get("/activity/award_list", Routers.activity.getAwardList);
  //router.use(function(req,res,next){
  //  var mm=req.path
  //  res('11222')
  //});

}



function globalData(router){
  router.use(function(req, res, next){
    res.data('user', req.session.user)
    res.data('site', siteConfig)
    next()
  })

}