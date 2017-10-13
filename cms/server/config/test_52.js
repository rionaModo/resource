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
    "login": "http://192.168.100.52:8087/login",
    "auth": "http://192.168.100.52:8087/serviceValidate",
    "logout": "http://192.168.100.52:8087/logout"
  },
  middleware: {
    session: {
      store: 'connect-redis',
      "connect-redis": {
        host: "192.168.100.51",
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
        servers: [
          {
            "baseUrl": "http://192.168.100.52:8093"
          }
        ]
      },
      promotionx: {
        servers: [
          {
            "baseUrl": "http://192.168.100.52:8091/"
          }
        ]
      },
      "category": {
        "defaults": {},
        "servers": [
          {
            "baseUrl": "http://192.168.100.52:8089/category"
          }
        ]
      }
    }
  }
}
