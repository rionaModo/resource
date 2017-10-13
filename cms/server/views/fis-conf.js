var fs = require("fs");
fis.set("project.ignore",[ 'node_modules/**',"/fis-conf.js"])
var prod = fis.media("prod");

var outputDir = "../build";

// 发布到 output文件夹中,并加上md5戳
var local_dilvery = [fis.plugin('local-deliver', {
      to: outputDir
    })];

fis.match("*",{
  deploy: local_dilvery,
  useHash: true
});

// 默认发布到static（供本地访问）
fis.match("*",{
  release : "/static/$0"
})
fis.match("*.tpl",{
  release : "/views/$0",
  useHash: false
})

// 编译less
fis.match("**.less",{
  parser: fis.plugin('less',{
    paths:[ [__dirname,"views"].join("/") ]
  }),
  rExt:"css"
});

console.log("开始清理结果目录:%s",outputDir);
clean(outputDir);
function clean(folder){
  if(!fs.existsSync(folder)){
    return;
  }
  var stat  = fs.statSync(folder);
  if(stat.isFile()){
    fs.unlinkSync(folder);
    return;
  }
  var sub_files = fs.readdirSync(folder);
  if(sub_files.length === 0 ){
    fs.rmdirSync(folder);
    return;
  }
  sub_files.forEach(function(sub){
    clean(folder+"/"+sub);
  });
}

function replacer(opt) {
    if (!Array.isArray(opt)) {
        opt = [opt];
    }
    var r = [];
    opt.forEach(function (raw) {
      // console.log(raw);
        r.push(fis.plugin('replace', raw));
    });
    return r;
};

var prod = fis.media("prod")

var uglifyjs = fis.plugin("uglify-js");
var clean_css = fis.plugin('clean-css-2x', {
    keepBreaks: true,
    keepSpecialComments: 0
  });
prod.match("!*.tpl",{
  release: "/coupon/$0",
  domain: "//static.danlu.com"
}).match("{*.less,*.css}",{
  optimizer: clean_css
}).match("*.js", {
  optimizer: uglifyjs
})


