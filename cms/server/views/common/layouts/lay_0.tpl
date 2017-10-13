<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta http-equiv="Cache-Control" content="no-transform">
  <meta http-equiv="Cache-Control" content="max-age=0">
  <meta name="HandheldFriendly" content="true">
  <meta http-equiv="expires" content="0">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="renderer" content="webkit" />
  {%block seo %}
  <title></title>
  {% endblock %}
  {% block style %}
    <link rel="stylesheet" href="/common/layouts/lay_0.less">
  {% endblock %}

  {# 没有使用 页面静态化缓存（不能直接在页面输出用户信息） #}
  {% if user && !site.static_cache %}
  {% autoescape false %}
  <script>
    var userInfo = {{user | json}}
  </script>
  {% endautoescape %}
  {% endif %}
  
  <script>
    var _paq = _paq || [];
    function loginUser(resolve,reject){
      {{!!site.static_cache}} ?  
      // 获取登录用户信息
      $.get("/login/user",function(res){
        if(res.status){
          reject()
        }
        window.userInfo = res.data
        resolve(userInfo)
      }) :
      (function(){
        if(!window.userInfo) {
          return reject()
        }
        resolve(window.userInfo)
      })()
    }
  </script>
  {% block headscript %}{% endblock %}
</head>
<body>
  {% include "../top.tpl" %}
  {% block content %}
  {% endblock %}
  {% include "../footer.tpl" %}

  {% block footscript %}
  {% include "../fis3/fis3Fun.tpl" %}
  {% endblock %}
</body>
{% include "../addScript.tpl" %}
{% include "../addPiwik.tpl" %}
</html>