"use strict";!function(e){e(".loginBtn").on("click",function(){e.ajax({type:"post",url:"http://127.0.0.1/snail/php/login.php",data:{user:e(".username").val(),pass:hex_sha1(e(".password").val())}}).done(function(a){a?(location.href="index.html",localStorage.setItem("username",e(".username").val())):(e(".password").val(""),alert("用户名或者密码错误"))})})}(jQuery);