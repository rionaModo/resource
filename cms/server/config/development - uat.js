var nodePath = require('path'),
  //  viewsDir = nodePath.join(__dirname, '../views')
viewsDir = nodePath.join(__dirname, "../build/views");

module.exports = {
  "fa": {
    "port": 88,
    "view": {
      dir:viewsDir
    }
  },
  "middleware": {
    "session": {
      "session-file-store": {
        "path": nodePath.join(__dirname, '../tmp/session')
      },
      "connect-redis": {
        "host": "192.168.100.21",
        "port": 6380
      }
    },
    'liveless': {
      "root": viewsDir,
      "disable": false
    },
    //"liveload": {
    //  "root": viewsDir,
    //  "files": /.(js|css|html|less|tpl)$/,
    //  "excludes": /^node_modules$/,
    //  "port": parseInt(Math.random() * 1e4 + 2e4),
    //  "disable": false
    //},
    "static": {
     // "urlPattern": "/",
     // "publicDir": viewsDir,
      "urlPattern": "/static/",
      "publicDir": nodePath.join(__dirname, '../build/static'),
      "notFound": function (req, res, next) {
        next()
      },
      "level": 69
    }
  },

  "bee": {
    //global defaults to bee.
    "defaults": {
    },
    "releases": {
      "company": {
        "defaults": {}, 
        "servers": [
          {
            "baseUrl": "http://101.200.216.228:9000/"
          }
        ]
      },
      "promotionx": {
        "defaults": {}, 
        "servers": [
          {
        //    "baseUrl": "http://192.168.40.252:8030/"
            "baseUrl": "http://101.200.221.198:9000/"  //uat
          }
        ]
      }
    }
  },
  // sso 的使用方法联系，SSO微服务的负责人，肖璟
  sso: {
    login: "http://123.57.152.182:9000/login",
    auth: "http://123.57.152.182:9000/serviceValidate",
    logout: "http://123.57.152.182:9000/logout"
  }
}