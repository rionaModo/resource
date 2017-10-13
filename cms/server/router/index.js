"use strict";

var fa = global.fa,
  bee = fa.bee,
  config = fa.config,
  faUtil = fa.util,
  siteConfig = config.site,
  activityConfig = siteConfig.activity,
    winningList=siteConfig.winningList,
  promotionx = bee('promotionx'),
  validate = fa.validate

module.exports = {
  // PC首页
  get: makeActivityPage("index"),

  // 移动端页面
  mobileIndex: [
    validate.common.param({
      token: 'not_empty',
      jsessionid: 'not_empty',
      company_id: "not_empty"
    }),
    function(req, res, next) {
      var user = res.data('user'),
        params = req.validate

      return (user && user.companyId == params.company_id) ? next() : getUserInfo()

      function getUserInfo(){
        bee("company").post("/companyInfo/getCompanyInfoById", {
          json: {
            paramsList: params.company_id
          }
        }).json().spread(function(data) {
          if (data.status || !data.data || !data.data[params.company_id]) {
            throw "登录异常：" + data.msg
          }
          return Object.assign({}, data.data[params.company_id])
        })
        .then(function(user) {
          req.session.user = user
          res.data('user', user)
          next()
        })
        .catch(function(err) {
          res.send(err instanceof Error ? err.message : String(err))
        })
      }
    },
    makeActivityPage("m/index")
  ],
  //登录异常处理 --跳转到错误页面
  errorHandle:function(req, res, next){
    res.render('error', function(err, pageHTML) {
      res.send(pageHTML)
    })
  }
}

function welcome(req, res, next) {
  res.render("m/welcome")
}

// 创造一个渲染活动的页面的中间件（移动端页面和PC页面的数据一样，只是页面不一样）
function makeActivityPage(tplPath) {
  // 可以配置根据区域来缓存编译后的页面，PC端页面已经自动根据是否缓存页面，将用户信息放在了页面ajax异步获取了
  var zonePageCache = {}
  return function(req, res, next) {
    var user = res.data('user'),
      province = user ? user.regAreaCode.substring(0, 7) : 'default',
      cacheKey = user ? province + "-" + user.companyType : province,
      companyId = (user && user.companyId) || "",
      userActivity = activityConfig[province] || activityConfig['default']


    if (siteConfig.static_cache && zonePageCache[cacheKey]) {
      return res.send(zonePageCache[cacheKey])
    }

    //太长
    var fieldsReciever = faUtil.field('id activityTypeId activityTypeName activityId activityName startTime' +
      ' endTime activityDesc couponStock additionalCouponStock')

    var recentLuckyRequest = promotionx.get("/activity/recent", {
        qs: {
          areaCode: province == "default" ? "" : province,
          companyType: user ? user.companyType : "",
          activityType: "02"
        }
      }).json(fieldsReciever).catch(function(err) {
        // 当时的后端他们自己没数据时会500，内容为空，导致json解析出问题，所以这里给他直接返回空数据
        return [{
          status: 0,
          data: []
        }]
      }),

      lotteryRequest = promotionx.get("/activity/" + userActivity.lottery).json(fieldsReciever)
      .catch(function() {
        // 取不到配置的活动信息就返回空活动，或者配置的活动id，不存在活动信息
        return [{
          status: 0,
          data: null
        }]
      })

    Promise.all([recentLuckyRequest, lotteryRequest])

    .spread(function(recent, lottery) {
      recent = recent[0]
      lottery = lottery[0]
      if (recent.status) {
        throw "获取最近抢红失败" + recent.msg
      }
      if (lottery.status) {
        throw "获取抽奖活动信息失败" + lottery.msg
      }

      var acts = [recent.data[0], recent.data[1], lottery.data],
        nowTime = Date.now()

      for (let i = 0, length = acts.length; i < length; i++) {
        let act = acts[i]
        if (!act) {
          continue;
        }
        act.startLeft = act.startTime - nowTime
        act.endLeft = act.endTime - nowTime
      }
      return acts
    })

    .spread(function(lupre, lunext, lotteryInfo) {
        res.data('activityInfo', {
          lucky: {
            pre: lupre,
            next: lunext
          },
          lottery: lotteryInfo,
          lotteryMoney:userActivity.lotteryMoney,
          lotteryMoneyTips:userActivity.lotteryMoneyTips,
          winningList:winningList
        })
        res.render(tplPath, res.data.get(), function(err, pageHTML) {
          if (err) return next(err)
          if (siteConfig.static_cache) {
            zonePageCache[province] = pageHTML
          }
          res.send(pageHTML)
        })

      })
      .catch(next)
  }
}