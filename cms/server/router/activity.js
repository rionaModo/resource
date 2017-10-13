var fa = global.fa,
    bee = fa.bee,
    validate = fa.validate,
    promotionx = bee('promotionx')

module.exports = {



  // 抽奖或者抢红包
  roll: [ 
    validate.common.param({
      act_id:"not_empty"
    }),
    function (req, res, next) {
      var user = res.data('user'),
          actId = req.validate.act_id
      promotionx.post("/activity/create_trading",{
        json: {
          activityId: actId,
          companyId: user.companyId
        }
      }).json()
      .spread(function(json){
        res.json(json)
      })
      .catch(next)
    }]
  ,



  // 剩余次数
  leftChance: [
    validate.common.param({
      act_id:"not_empty"
    }),

    function(req, res, next){
      var act_id = req.validate.act_id,
          user = res.data('user')
      promotionx.get("/activity/ticket",{
        qs: {
        activityId: act_id,
            companyId: user.companyId
      }
      }).json().spread(function(json){
        res.json(json)
      })
      .catch(next)
    }
  ],

// 获取中奖列表
  getAwardList: [
    validate.common.param({
      act_id:"not_empty",
      type:"not_empty"
    }), function(req, res, next){
      var actId = req.validate.act_id,
          typeId = req.query.type
      promotionx.get("/issue",{
        qs: {
          activityId: actId,
          activityType: typeId
        }
      })
      .json()
      .spread(function(json){
        res.json(json)
      })
      .catch(next)

    }]
}

