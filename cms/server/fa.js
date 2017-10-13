//直接引入bluebird
require('./env')
require('./promise')
var fa = global.fa = require("fa")(),
    app = fa.app,
    filters = require('./inc/filters')
app.set("views", fa.config.fa.view.dir);
for(var i in filters){
  fa.swig.swig.setFilter(i, filters[i])
}
require('./inc/middleware');
fa.validate = require('./inc/validate');
require("./inc/util");
require('./routes')(fa.horse);

module.exports = fa;