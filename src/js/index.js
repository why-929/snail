 /* top-nav部分 */
//鼠标放下出现下拉菜单
// !function($) {
//     const $showli=$('.showNav .dropBox');
//     const $hideNav = $('.hideNav');
//     $showli.hover(function() {
//         $hideNav.stop(true).animate({
//             top: 0
//         })
//     },function(){
//         $hideNav.stop(true).animate({
//             top: -190
//         })
//     });
// }(jQuery);

!function($){
    //一、轮播图 - 二级菜单
    const $menuUl = $('.banner-menu');//一级菜单ul
    const $menuLi = $('.banner-menu li');//一级菜单li
    const $secondMenu = $('.second-menu');//二级菜单
    const $items = $('.second-menu .item');//二级菜单分项
    //一级菜单移入移出
    $menuLi.on('mouseover',function(){
        $(this).addClass('munuActive').siblings('.banner-menu li').removeClass('munuActive');
        $secondMenu.show();//鼠标移入一级菜单，显示二级菜单
        $items.eq($(this).index()).show().siblings('.second-menu .item').hide();//显示对应的二级菜单分项
    });
    //鼠标移出一级菜单二级菜单隐藏
    $menuLi.on('mouseout',function(){
        // $menuLi.eq($(this).index()).removeClass('munuActive');
        $secondMenu.hide();
    });
    //二级菜单的移入移出
    $secondMenu.on('mouseover',function(){
        $(this).show();
    });
    $secondMenu.on('mouseout',function(){
        $(this).hide();
    });

    //二、轮播图
    const $banner = $('.banner');//轮播图盒子
    const $bannerUl = $('.banner ul');
    const $Imgli = $('.banner ul li');//五张图片
    const $circleBtn = $('.banner ol li');//五个圆圈按钮
    const $leftBtn = $('.leftBtn');
    const $rightBtn = $('.rightBtn');
    let $index = 0;
    let $timer = null;
    //1.改变布局
    let $cloneImg = $Imgli.first().clone(true, true); //克隆第一张图片
    let $Imgwidth = $Imgli.eq(0).width();//图片的宽度
    $bannerUl.append($cloneImg).css({//追加并设置图片盒子的宽度
        width: $bannerUl.children().length * $Imgwidth
    });
    //封装运动过程
    function bannerSwitch(){
        $index ++;
        //当点击到索引为最后clone的那张时，将图片拉回
        if($index === $circleBtn.length + 1){
            $bannerUl.css({
                left:0
            });
            $index = 1;//第二张图片
        }
        //当点击到索引为第一张之前时,拉到最后一张
        if($index === -1){
            $bannerUl.css({
                left:-$circleBtn.length * $Imgwidth
            });
            $index = $circleBtn.length - 1;
        }
        //当索引为最后一个圆圈按钮时,给第一个小圆圈按钮添加类名
        if($index === $circleBtn.length){
            $circleBtn.eq(0).addClass('olActive').siblings('ol li').removeClass('olActive');
        }else{
            $circleBtn.eq($index).addClass('olActive').siblings('ol li').removeClass('olActive')
        }
        //给图片盒子加left值让图片运动
        $bannerUl.stop(true).animate({
            left: -$Imgwidth * $index
        }); 
    }
    //2.点击圆圈按钮，图片位置发生变化
    $circleBtn.on('click',function(){
        $index = $(this).index() - 1;//-1抵消bannerSwitch()中的index++
        bannerSwitch()
    })
    //3.箭头添加点击事件
    $rightBtn.on('click',function(){
        bannerSwitch();
    })
    $leftBtn.on('click',function(){
        $index -=2;//bannerSwitch()中index+1,本身应该-1,所以-2
        bannerSwitch();
    })
    $timer = setInterval(() => {
        bannerSwitch();
    }, 3500);

    //三、人气单品部分的渲染
    const $rqdp = $('.module-rqdp-left');
    $.ajax({
        url: 'http://10.31.162.31/snail/php/data.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            if(index<4){
                $strhtml += `
                <a href="javascript:;" class="module-rqdp-product">
                    <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                    <div class="module-rqdp-product-name">${value.title}</div>
                    <div class="module-rqdp-product-price">￥${value.price}元</div>
                </a>
                `;
            }
        });
        $strhtml += '</ul>';
        $rqdp.html($strhtml);
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //四、游戏道具部分渲染
    const $yxdj = $('.module-yxdj-render');
    $.ajax({
        url: 'http://10.31.162.31/snail/php/data.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            if(3< index && index<7){
                $strhtml += `
                <a href="javascript:;" class="module-yxdj-product">
                    <div class="module-yxdj-product-name">${value.title}</div>
                    <div class="module-yxdj-product-price">${value.price}元</div>
                    <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                </a>`
            }
        });
        $strhtml += '</ul>';
        $yxdj.html($strhtml);
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //五、蜗牛手机卡部分渲染
    const $SIMcard = $('.module-SIMcard-render');
    $.ajax({
        url: 'http://10.31.162.31/snail/php/data.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            if(11< index && index<16){
                $strhtml += `
                <a href="javascript:;" class="module-SIMcard-product">
                <div class="module-SIMcard-render-title">${value.title}</div>
                <div class="module-SIMcard-render-describe">${value.describe}</div>
                <div class="module-SIMcard-render-price">${value.price}元</div>
                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
            </a>`
            }
        });
        $strhtml += '</ul>';
        $SIMcard.html($strhtml);
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //六、蜗牛国际手机卡部分渲染
    const $INTcard = $('.module-INTcard-render');
    $.ajax({
        url: 'http://10.31.162.31/snail/php/data.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            if(15< index && index<20){
                $strhtml += `
                <a href="javascript:;" class="module-INTcard-product">
                <div class="module-INTcard-render-title">${value.title}</div>
                <div class="module-INTcard-render-describe">${value.describe}</div>
                <div class="module-INTcard-render-price">${value.price}元</div>
                <img  class="lazy" data-original="${value.url}" width="200" height="200"/>
            </a>`
            }
        });
        $strhtml += '</ul>';
        $INTcard.html($strhtml);
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //七、应用部分
    $w = $('.module-use-product-container img').width();
    $h = $('.module-use-product-container img').height();
    $w2 = $w + 10;
    $h2 = $h + 10;
    $('.module-use-product-container img').hover(function(){
        $(this).stop().animate({
            height:$h2,
            width:$w2,
        },300);
    },function(){
        $(this).stop().animate({
            height:$h,
            width:$w,
        },300);
    })

    //八、分享方式
    $('.sideBar-share').hover(function(){
        $('.sideBar-share').css({
            backgroundPosition: '-55px -947px'
        })
        $('.sideBar-share-way').css({
            display: 'block'
        })
    },function(){
        $('.sideBar-share').css({
            backgroundPosition: '0 -947px'
        })
        $('.sideBar-share-way').css({
            display: 'none'
        })
    })
    //论坛方式
    $('.sideBar-forum').hover(function(){
        $('.sideBar-forum').css({
            backgroundPosition: '-55px -228px'
        })
        $('.sideBar-forum-way').css({
            display: 'block'
        })
    },function(){
        $('.sideBar-forum').css({
            backgroundPosition: '-55px -152px'
        })
        $('.sideBar-forum-way').css({
            display: 'none'
        })
    })

    //九、回到顶部
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },800);
    })

    //十、显示登陆名
    const $admin = $('.one')
    const $logout = $('.two')
    if(localStorage.getItem('username')){//当有本地存储的时候，登陆变为用户名；注册变为注销
        let $user = localStorage.getItem('username');
        $admin.html($user);
        $logout.html('注销')
    }
    $logout.on('click',function(e){
        e.preventDefault()//阻止a标签的跳转
        if($logout.html('注销')){//当内容为注销时，刷新页面，删除本地存储
            window.location.reload();
            localStorage.removeItem('username') 
        }
    })
    
    //没登录时，购物车无法点击
    // $('.car').on('click',function(e){
    //     const $admin = $('.one')
    //     const $carBtn = $('.car a')
    //     if($admin.html('登陆') ){
    //         e.preventDefault()
    //     }
    // })
}(jQuery)
