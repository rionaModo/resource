var nodePath = require('path'),
    viewPath = nodePath.join(__dirname, "../build/views")

module.exports = {
  "fa": {
    "view": {
      dir: viewPath,
      cache: true
    }
  },
  "sso": {
    "login": "http://101.200.122.39:9002/login",
    "auth": "http://101.200.122.39:9002/serviceValidate",
    "logout": "http://101.200.122.39:9002/logout"
  },
  middleware: {
    session: {
      store: 'connect-redis',
      "connect-redis":{
        host: "123.57.224.109",
        port: "19002"
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
            "baseUrl": "http://10.172.83.103:9000" 
          }
        ]
      },
      promotionx: {
        servers: [
        {
          "baseUrl": "http://10.51.102.27:9001/"
        }
        ]
      },
      "category": {
        "defaults": {},
        "servers": [
          {
            "baseUrl": "http://123.57.216.123:9000/category"
          }
        ]
      }
    }
  }
}