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
    "login": "http://101.200.122.39:9002/login",
    "auth": "http://101.200.122.39:9002/serviceValidate",
    "logout": "http://101.200.122.39:9002/logout"
  },
  middleware: {
    //session: {
    //  store: 'connect-redis',
    //  "connect-redis":{
    //    host: "101.200.201.92",
    //    port: "19002"
    //  }
    //},

    "session": {
      "session-file-store": {
        "path": nodePath.join(__dirname, '../tmp/session')
      },
      "connect-redis": {
        "host": "192.168.100.21",
        "port": 6380
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
            "baseUrl": "http://123.56.71.180:9000/companyInfo"
          }
        ]
      },
      promotionx: {
        servers: [
        {
          "baseUrl": "http://123.57.239.53:9001/"
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