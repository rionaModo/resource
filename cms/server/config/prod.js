var nodePath = require('path'),
    viewPath = nodePath.join(__dirname, "../build/views")

module.exports = {
  fa: {
    port: "9500",
    view: {
      dir: viewPath,
      cache: true
    }
  },
  sso: {
    login: "http://sso.danlu.com/login",
    auth: "http://sso.danlu.com/serviceValidate",
    logout: "http://sso.danlu.com/logout"
  },
  middleware: {
    session: {
      store: 'connect-redis',
      "connect-redis":{
        host: "10.171.134.153",
        port: "19001"
      }
    },
    "static": {
      "urlPattern": "/static/",
      "publicDir": nodePath.join(__dirname, '../build/static'),
      "notFound": function (req, res, next) {
        next()
      },
      "options": {
        setHeaders: function (res) {
          var d = new Date();
          var year = d.getFullYear() + 1;
          res.header('date', d.toUTCString());
          d.setYear(year)
          res.header("Expires", d.toUTCString());
          res.header('Cache-Control', 'public,max-age=31536000');

        }
      },
      "level": 69,
      "disable": true
    }
  },

  bee: {
    "releases": {
      "company": {
        "defaults": {}, 
        "servers": [
          {
            "baseUrl": "http://10.172.95.98:9002/"
          },
          {
            "baseUrl": "http://10.172.165.196:9002/"
          }
        ]
      },
      "category": {
        "defaults": {},
        "servers": [
          {
            "baseUrl": "http://10.172.95.95:9000/category"
          },
          {
            "baseUrl": "http://10.172.95.78:9000/category"
          }
        ]
      },
      "promotionx": {
        "defaults": {}, 
        "servers": [
             {
            "baseUrl": "http://dlpromotionx.danlu.com/"
          }
        ]
      }
    }
  }
}
