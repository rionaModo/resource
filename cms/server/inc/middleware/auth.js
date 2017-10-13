module.exports = function () {
  return function checkLogin(req, res, next) {
    if (req.session.user) {
      return next();
    }

    if(req.is('text/html')){
      res.redirect("/login");
    }else{
      !req.xhr && res.status(403)
      res.send({
        status: 403,
        msg:"未登录或登录失效"
      })
    }
  }
}