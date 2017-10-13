##概述
 * 整个工程基于nodejs开发以及运行
 * web服务器是叫fa.
 * 依赖项均在package.json中
 * 在测试和产品环境下使用 pm2 对进程进行管理
 * 静态资源打包采用fis3

##fa说明
它是基于express、swig、request、node-config等等流行且稳定的模块整合的一个工具骨架，方便快速定制各种场景下的web服务开发
git：https://github.com/dodio/fa.git
它主要就是一个提供工具集合的web骨架，并不限制怎么使用它。
* PS: 为了保持程序的稳定，建议将fa从node_modules中拷贝出来放到工程目录，这样不会随着github的更新而更新 *

##目录说明

###mock
这是一个用fa做的mock服务器

static_pages 是用来开发dlmall 或者别的什么工程里的静态页面时使用的开发服务器（可以废弃掉了）


##关于FA
fa 的使用是非常自由和灵活的，但是结构肯定是清晰的，因为fa提供的是一个工具框架，或者说是骨架
包括，获取配置的系统，获取中间件，可扩展的swig模板引擎（swig），远程的http请求工具（bee）

当然，因为太灵活，所以看上去没有什么规范，在具体业务的开发上是有规范的。
所有的具体路由（controller）写在了 router目录中，
具体的url地址在 routes.js 中统一定义

##server目录讲解

###server/tmp
临时文件目录，用于存放临时的缓存文件之类的东西.目前其实只有开发时使用的session文件

###server/config
配置文件目录，配置文件是按环境来进行配置的，详细的规则请参考：
https://github.com/lorenwest/node-config/wiki/Configuration-Files[https://github.com/lorenwest/node-config/wiki/Configuration-Files]
具体的配置内容，会在下面讲解
###server/inc
通用的组件或者工具类就放在这个目录

  * middleware 该项目中自定义的写的一些中间件（中间件的开发是有规范的，都是以中间件工厂函数的形式来的，可以参考已有中间件)
  * validate 服务端参数验证工具（目前只能用于自动对url参数验证）
  * filters 给swig模板引擎添加的变量过滤器函数
  * util 工具类函数，例如生成json字段过滤器

###server/router
页面功能目录，例如首页的，登录的
它里面的目录结构逻辑，可以按照业务来自己规划了

###server/views
服务端页面目录，按照就近原则的方式来进行静态资源的存放，最终通过fis3 构建来将资源进行一个区分和打包
然后会放在build目录

###server/build
资源打包目录
