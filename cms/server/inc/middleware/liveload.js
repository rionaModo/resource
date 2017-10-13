module.exports = function (conf) {
  var 
  liveload = require("liveload"),
  debug = require('debug')('liveload')

  debug('liveload listens at port: %s', conf.port)
  return function(req, res, next) {
    // 可以做一些判断，以避免下载文件时给文件加莫名其妙的东西
    liveload(conf)(req, res, next)
  }
}