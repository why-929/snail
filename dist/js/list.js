"use strict";!function(e){var i=[],c=[],l=null,a=e("#cardBox");e.ajax({url:"http://127.0.0.1/snail/php/listdata.php",dataType:"json"}).done(function(n){console.log(n);var t="";e.each(n,function(n,a){t+='\n            <div class="cardInner">\n                <a href="detail.html?id='+a.id+'" target="_blank">\n                    <h4 class="cardWrapper-title">'+a.title+'</h4>\n                    <p class="descript">'+a.describe+'</p>\n                    <p class="price">￥'+a.price+'</p>\n                    <img class="lazy" data-original="'+a.url+'" width="200" height="200"/>\n                </a>\n            </div>'}),a.html(t),e(function(){e("img.lazy").lazyload({effect:"fadeIn"})}),i=[],c=[],l=null,e(".cardInner").each(function(n,a){c[n]=e(this),i[n]=e(this)})}),e(".page").pagination({pageCount:2,jump:!0,coping:!0,prevContent:"<",nextContent:">",homePage:"首页",endPage:"尾页",callback:function(n){console.log(n.getCurrent()),e.ajax({url:"http://127.0.0.1/snail/php/listdata.php",data:{page:n.getCurrent()},dataType:"json"}).done(function(n){var t="";e.each(n,function(n,a){t+='\n                    <div class="cardInner">\n                        <a href="detail.html?id='+a.id+'" target="_blank">\n                            <h4 class="cardWrapper-title">'+a.title+'</h4>\n                            <p class="descript">'+a.describe+'</p>\n                            <p class="price">￥'+a.price+'</p>\n                            <img class="lazy" data-original="'+a.url+'" width="200" height="200"/>\n                        </a>\n                    </div>'}),a.html(t),e(function(){e("img.lazy").lazyload({effect:"fadeIn"})}),i=[],c=[],l=null,e(".cardInner").each(function(n,a){c[n]=e(this),i[n]=e(this)})})}}),e("button").eq(0).on("click",function(){e.each(i,function(n,a){e("#cardBox").append(a)})}),e("button").eq(1).on("click",function(){for(var n=0;n<c.length-1;n++)for(var a,t=0;t<c.length-n-1;t++){l=parseFloat(c[t].find(".price").html().substring(1)),parseFloat(c[t+1].find(".price").html().substring(1))<l&&(a=c[t],c[t]=c[t+1],c[t+1]=a)}e.each(c,function(n,a){console.log(a),e("#cardBox").append(a)})})}(jQuery),function(n){n(".sideBar-top").on("click",function(){n("html,body").animate({scrollTop:0},200)})}(jQuery);