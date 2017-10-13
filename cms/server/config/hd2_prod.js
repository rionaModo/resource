var nodePath = require('path'),
    viewPath = nodePath.join(__dirname, "../build/views")

module.exports = {
  "fa": {
    port: "9500",
    "view": {
      dir: viewPath,
      cache: true
    }
  },
  "sso": {
    "login": "http://sso.danlu.com/login",
    "auth": "http://sso.danlu.com/serviceValidate",
    "logout": "http://sso.danlu.com/logout"
  },
  middleware: {
    session: {
      store: 'connect-redis',
      "connect-redis":{
        host: "172.19.0.38",
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
    releases: {
      company: {
        servers:[
          {
            "baseUrl": "http://172.19.0.35:9000" 
          }
        ]
      },
      promotionx: {
        servers: [
        {
          "baseUrl": "http://sale.danlu.com/"
        }
        ]
      },
      "category": {
        "defaults": {},
        "servers": [
          {
            "baseUrl": "http://172.19.0.11:9000/category"
          }
        ]
      }
    }
  }
}