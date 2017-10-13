var util = fa.util

util.field = function (str) {
  // 字段白名单
  return makeJsonReciever(str, false)
}
  // 字段黑名单
util.nofield = function (str) {
  return makeJsonReciever(str, true)
}
util.randomPick = function(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}
util.isNumberic = isNumberic;










// 必须有的字段，这三字段是所有接口默认含有的
var mustIn = 'status msg data'

function makeJsonReciever(fields, no){
  var 
  whiteFields = mustIn.split(' '),
  blackFields = [],

  white = {},
  black = {}
  if(typeof fields === 'string') {
    fields = fields.split(' ')
  }

  if(!no) {
    whiteFields = whiteFields.concat(fields)
  }else {
    blackFields = blackFields.concat(fields)
  }

  blackFields.forEach(function (v, i) {
    if(v.trim() === "") return 
    black[v] = true
  })
  whiteFields.forEach(function (v, i) {
    if(v.trim() === "") return 
    white[v] = true
  })
  var parser = function(k,v){
    //返回根元素
    if(k === '' || isNumberic(k)) return v

    // 获取白名单中的key
    if(white[k]) return v

    // 去掉黑名单中的key
    if(black[k]) return 

    // 黑名单模式，则默认获取；白名单默认不获取
    return no ?  v : undefined 
  }
  
  return parser
}

// 从jQuery抄来的，验证参数是不是一个有效数字
function isNumberic(obj) {
    var type = typeof obj
    return ( type === "number" || type === "string" ) && 

    !isNaN( obj - parseFloat( obj ) );
}