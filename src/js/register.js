!function($){
    const $form = $('#registerBox');
    const $username = $('.username');
    const $password = $('.password');
    const $repass = $('.repass');
    const $tel = $('.tel');
    const $span = $('#registerBox span'); //获取多个

    //每一个表单一个标记。
    let $userflag = true; //标记
    let $passflag = true;
    let $repassflag = true;
    let $telflag = true;

    //1.用户名
    $username.on('focus', function() {
        $span.eq(0).html('6-25位字母数字或下划线组成').css({
            color: '#ccc'
        });
    });
    let REGusername = /^\w{6,25}$/;
    $username.on('blur', function() {
        if ($(this).val() !== '') { //有值
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length; //将中文转换成两个英文计算长度
            if (6 < len && len < 25) {
                if(!REGusername.test($username.val())){
                    $span.eq(0).html('该用户名规则不对').css({
                        color: 'red'
                    });
                    $userflag = false;
                }
                $.ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/snail/php/register.php',
                    data: {
                        username: $username.val()//将用户名传给后端
                    }
                }).done(function(result) {
                    if (!result) { //不存在
                        $span.eq(0).html('√').css('color', 'green');
                        $userflag = true;
                    }else{
                        $span.eq(0).html('该用户名已经存在').css('color', 'red');
                        $userflag = false;
                    }
                })
            }else{
                $span.eq(0).html('该用户名长度不对').css({
                    color: 'red'
                });
                $userflag = false;
            }
        }else {
            $span.eq(0).html('用户名不能为空').css({
                color: 'red'
            });
            $userflag = false;
        }
    });

    //2.密码
    let REGpassword = /^\w{6,20}$/;
    $password.on('focus', function() {
        $span.eq(1).html('6-20个字符组成,至少包含2种字符').css({
            color: '#ccc'
        });
    });
    $password.on('input', function() {
        let $pass = $(this).val();
        if ($pass.length >= 6 && $pass.length <= 20) {
        
            let REGnum = /\d+/;//数字
            let REGupper = /[A-Z]+/;
            let REGlower = /[a-z]+/;
            let REGother = /[\W\_]+/; //其他字符

            //test():匹配存在感
            let $count = 0; //计数
            if (REGnum.test($pass)) {
                $count++;
            }
            if (REGupper.test($pass)) {
                $count++;
            }
            if (REGlower.test($pass)) {
                $count++;
            }
            if (REGother.test($pass)) {
                $count++;
            }
            switch ($count) {
                case 1:
                    $span.eq(1).html('密码强度-弱').css({
                        color: 'red'
                    });
                    $passflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(1).html('密码强度-中').css({
                        color: 'yellow'
                    });
                    $passflag = true;
                    break;
                case 4:
                    $span.eq(1).html('密码强度-强').css({
                        color: 'green'
                    });
                    $passflag = true;
                    break;
            }
        } else {
            $span.eq(1).html('密码长度错误').css({
                color: 'red'
            });
            $passflag = false;
        }
    });

    $password.on('blur', function() {
        if(!REGpassword.test($password.val())){
            $span.eq(1).html('密码规则不对').css({
                color: 'red'
            });
            $passflag = false;
        }
        if ($(this).val() !== '') {
            if ($passflag) {
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                $passflag = true;
            }
        } else {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            $passflag = false;
        }
    });

    //3.确认密码
    $repass.on('blur', function() {
        if ($(this).val() !== '') {
            if($repass.val()!==$password.val()){
                $span.eq(2).html('两次密码不一致').css({
                    color: 'red'
                });
                $repassflag = false;
            }
        if($repass.val()==$password.val()) {
            $span.eq(2).html('√').css({
                color: 'green'
            });
            $repassflag = true;
        }
        } else {
            $span.eq(2).html('确认密码不能为空').css({
                color: 'red'
            });
            $repassflag = false;
        }
    });

    //4.手机号
    let REGtel = /^1[345678]\d{9}$/;
    $tel.on('blur', function() {
        if ($(this).val() !== '') {
            if(!REGtel.test($tel.val())){
                $span.eq(3).html('手机号规则不对').css({
                    color: 'red'
                });
                $telflag = false;
            }
            if(REGtel.test($tel.val())){
                $span.eq(3).html('√').css({
                    color: 'green'
                });
                $telflag = true;
            }
        } else {
            $span.eq(3).html('手机号不能为空').css({
                color: 'red'
            });
            $telflag = false;
        }
    });

    $form.on('submit', function() {
        if ($username.val() === '') {
            $span.eq(0).html('该用户名不能为空').css({
                color: 'red'
            });
            $userflag = false;
        }
        if ($password.val() === '') {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            $passflag = false;
        }
        if ($repass.val() === '') {
            $span.eq(2).html('确认密码不能为空').css({
                color: 'red'
            });
            $repassflag = false;
        }
        if ($tel.val() === '') {
            $span.eq(3).html('手机号不能为空').css({
                color: 'red'
            });
            $telflag = false;
        }
        //阻止跳转：DOM 0级事件 return false   DOM 2级  event.perventDefault() / event.returnValue = false
        if (!$userflag || !$passflag ||!$repassflag ||!$telflag ) {
            return false;
        }
    });
}(jQuery)