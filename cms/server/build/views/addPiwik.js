/**
 * Created by danlu on 2016/8/5.
 */
(function(){
      _paq = _paq || []
      _paq.push(['trackPageView']);
       _paq.push(['enableLinkTracking']);
       var u="//piwik.danlu.com/piwik/";
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', 4]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; //s.parentNode.insertBefore(g,s);
        nosct=d.createElement('noscript');
        nosct.innerHTML='<p><img src="//piwik.danlu.com/piwik/piwik.php?idsite=4" style="border:0;" alt="" /></p>';
        document.getElementsByTagName("body")[0].appendChild(nosct);
       document.getElementsByTagName("body")[0].appendChild(g);
})();


