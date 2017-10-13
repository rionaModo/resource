<link rel="stylesheet" href="/common/top.less">
<div class="top">
  <div class="container group">
    <div class="nav">
      <a href="//www.danlu.com" class="active">首页</a>
    </div>
    <div class="fr">
      <div class="user-nav">
        <span>您好！</span>
        {% if user %}
        <a href="http://www.danlu.com/main/province.html">{{user.companyName}} </a>
        <span>|</span>
        <a href="/logout">退出 </a>
        {% else %}
        <a href="http://www.danlu.com/registerNew/terminal-step1.html" target="_blank">快速注册</a>
        <span>|</span>
        <a href="http://www.danlu.com/registerNew/terminal-step1.html" target="_blank">快速登录</a>
        {% endif %}
      </div>
    </div>
  </div>
</div>