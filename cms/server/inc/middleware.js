var nodePath = require('path'),
    fa = global.fa

var wares = fa.util.loadWholeDirectory(nodePath.join(__dirname,'middleware'));

for(var i in wares){
  fa.middleware.add(i,wares[i], true);
}
