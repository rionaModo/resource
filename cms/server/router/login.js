var bee = fa.bee,
    sso = fa.config.sso,
    url = require('url'),
    bee = fa.bee,
    request = bee.request,
    xml2js = require('xml2js'),
    parseXmlString = xml2js.parseString

var login = module.exports = {
  get: function(req, res) {
    if(req.session.user){
      // 登录了就不重复登录了
      return res.redirect("/");
    }

    var
    ssoHost = url.parse(sso.login),
    query = ssoHost.query = ssoHost.query || {},
    ticketRecieveUrl = query.service = returnUrl(req, login.ticketRecievePath),
    ssoUrl = url.format(ssoHost)

    res.redirect(ssoUrl)
  },

  logout(req, res, next){
    if(req.query.sso_return == '1'){
      req.session.user = null
      return res.redirect("/")
    }

    var ssoLogoutHost = url.parse(sso.logout),
    query = ssoLogoutHost.query = ssoLogoutHost.query || {},
    logoutUrl = query.service = returnUrl(req, "/logout", {sso_return: 1}),
    ssoUrl = url.format(ssoLogoutHost)

    res.redirect(ssoUrl)
  },

  ssoTickedLogin: function(req, res, next){
    var
    ticket = req.query.ticket,
    user = {},
    authHost = url.parse(sso.auth),
    query = authHost.query || {}

    query.ticket = ticket
    query.service = returnUrl(req, login.ticketRecievePath)

    authHost.query = query
    authHost.search = null

    var uri = url.format(authHost)

    request.get(uri).str().spread(function(data, header, bee){

      return new Promise(function(resolve, reject){
        xml2js.parseString(data, function (err, xml) {
          if(err) return reject(err)
          resolve(xml)
        })
      })
    })
    .then(function(xml){
      var casSuccess = xml['cas:serviceResponse']['cas:authenticationSuccess'],
          casFailer = xml['cas:serviceResponse']['cas:authenticationFailure']

      if(casFailer) return Promise.reject(casFailer)

      return casSuccess[0]
    })
    .then(getLoginInfo)

    .then(function(info){
      if(!info.companyId||info.loginType=='terminal'){
        res.redirect("/error")
      }
      var param = {
        paramsList: info.companyId
      },

      infoP = bee("company").post("/companyInfo/getCompanyInfoById",{
        json: param
      }).json().spread(function(data){
        if(data.status || !data.data || !data.data[info.companyId]){
            res.redirect("/error")
        //  throw "登录异常：" + data.msg
        }
        return Object.assign({}, info, data.data[info.companyId])
      })

      return Promise.resolve(infoP)
    })
    .then(function(info){
      req.session.user = info
      res.redirect("/")
    })
    .catch(next)

  },

  // sso登录 ticket 回调地址
  ticketRecievePath: "/login/ticket"
}

/**
 * [returnUrl 自动根据运行环境获取ticket回调地址]
 * @param  {[type]} req [http请求对象]
 * @return {[type]}     [回调地址]
 */
function returnUrl(req, path, query){
  var uri = url.format({
    host: req.headers.host,
    pathname: path ,
    query: query,
    protocol: req.protocol
  })
  return uri
}


/**
 * 获取登录信息
 */
function getLoginInfo(casSuccess){
  var info = {},
      casUser = casSuccess['cas:user'][0],
      casInfo = casSuccess['cas:attributes'][0]

  info.userId = getKey('cas:userId')
  info.loginType = getKey('cas:loginType')
  info.userEmail = getKey('cas:userEmail')
  info.userPhone = getKey('cas:userPhone')
  info.userType = getKey('cas:userType')
  info.companyId = getKey('cas:companyId')

  function getKey(key){
    return (casInfo[key] && casInfo[key][0]) || ""
  }
  // info.cas = casSuccess
  return info
}

