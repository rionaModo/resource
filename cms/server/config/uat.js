var nodePath = require('path'),
    viewPath = nodePath.join(__dirname, "../build/views")

module.exports = {
  fa: {
    port: "9501",
    view: {
      dir: viewPath,
      cache: true
    }
  },
  sso: {
    login: "http://123.57.152.182:9002/login",
    auth: "http://123.57.152.182:9002/serviceValidate",
    logout: "http://123.57.152.182:9002/logout"
  },
  middleware: {
    session: {
      store: 'connect-redis',
      "connect-redis":{
        host: "10.163.12.171",
        port: "19001"
      }
    },
    "static": {
      "urlPattern": "/static/",
      "publicDir": nodePath.join(__dirname, '../build/static'),
      "notFound": function (req, res, next) {
        next()
      },
      "level": 69
    }
  },

  bee: {
    "releases": {
      "company": {
        "defaults": {}, 
        "servers": [
          {
            "baseUrl": "http://10.44.186.129:9000/"
          }
        ]
      },
      "promotionx": {
        "defaults": {}, 
        "servers": [
             {
            "baseUrl": "http://10.44.186.105:9000/"
          }
        ]
      },
      "category": {
        "defaults": {},
        "servers": [
          {
            "baseUrl": "http://10.51.68.210:9000/category"
          }
        ]
      }
    }
  }
}
