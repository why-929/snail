!function($){
    //1.获取列表页传来的id
    let $id = location.search.substring(1).split('=')[1];

    const $smallpic = $(".smallpic")//小图
    const $bigpic = $(".bigpic")//大图
    const $title = $(".title")//标题
    const $subtitle = $(".subtitle")//二级标题 - 描述
    const $price = $(".price")//价格
    const $info = $(".info")//商品信息
    //如果$sid不存在，默认$sid = 1
    if (!$id) {
        $id = 1;
    }

    //2.将id传给后端
    $.ajax({
        url: 'http://127.0.0.1/snail/php/getid.php',
        data: {
            id: $id
        },
        dataType: 'json'
    }).done(function(d) {
        console.log(d);
        $smallpic.attr('src', d.url);
        $smallpic.attr('id', d.id); //给图片添加唯一的id
        $bigpic.attr('src', d.url);
        $title.html(d.title);
        $subtitle.html(d.describe);
        $info.html(d.describe);
        $price.html("￥" + d.price);
        // 渲染小图
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr, function(index, value) {
            $strhtml += '<li><img src="' + value + '"/>></li>';
        });
        $('.smallImglist ul').html($strhtml);
    });

    //放大镜效果
    const $smallBox = $(".smallBox");//小放
    const $shade = $(".shade"); //遮罩
    const $bigBox = $(".bigBox"); //大放
    const $left = $(".left");//左箭头
    const $right = $(".right");//右箭头
    const $smallImglist = $("smallImglist");//小图列表

    //小放/大放=小图/大图
    $shade.width($smallBox.width() * $bigBox.width() / $bigpic.width());
    $shade.height($smallBox.height() * $bigBox.height() / $bigpic.height());
    let $bili = $bigpic.width() / $smallBox.width(); //比例大于1 放大效果

    $smallBox.hover(function(){
        $shade.css('visibility', 'visible');
        $bigBox.css('visibility', 'visible');
        $(this).on('mousemove',function(e){
            let $leftvalue = e.pageX - $('.smallBox').offset().left - $shade.width()/2;
            let $topvalue = e.pageY - $('.smallBox').offset().top - $shade.height()/2;
            if($leftvalue < 0){
                $leftvalue = 0;
            }else if($leftvalue>=$smallBox.width()- $shade.width()){
                $leftvalue =  $smallBox.width()- $shade.width();
            }

            if($topvalue < 0){
                $topvalue = 0;
            }else if($topvalue>=$smallBox.height()- $shade.height()){
                $topvalue =  $smallBox.height()- $shade.height();
            }

            $shade.css({
                left: $leftvalue,
                top: $topvalue
            })
            $bigpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            })

        })
    },function(){
        $shade.css('visibility', 'hidden');
        $bigBox.css('visibility', 'hidden');
    });

    //小图切换
    $('.smallImglist ul').on('click','li',function(){
        let $imgurl = $(this).find('img').attr('src');//获取当前点击的li里面图片的src
        // $(this).find('img').addClass('smallImgActive').siblings('img').removeClass('smallImgActive');
        $smallpic.attr('src',$imgurl);//赋值小图
        $bigpic.attr('src',$imgurl);//赋值大图
    });
    //左右箭头事件
    let $num = 6;//列表显示的图片个数
    //右键点击
    $right.on('click',function(){
        let $smallImglists = $('.smallImglist ul li');
        if($smallImglists.size()> $num){//限制点击的条件
            $num++;
            $left.css('color','#333');
            if($smallImglists.size() == $num){
                $right.css('color','#fff');
            }
            $('.smallImglist ul').animate({
                left:-($num - 6) * $smallImglists.eq(0).outerWidth(true)
            })
        }
    });
    //左键点击
    $left.on('click',function(){
        let $smallImglists = $('.smallImglist ul li');
        if($num >6){//限制点击的条件
            $num--;
            $right.css('color','#333');
            if($num <= 6){
                $left.css('color','#fff');
            }
            $('.smallImglist ul').animate({
                left:-($num - 6) * $smallImglists.eq(0).outerWidth(true)
            })
        }
    })

    //购物车的存储--数组
    let arrid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。

    //取出cookie,才能判断是第一次还是多次点击
    function cookietoarray() {
        if ($.cookie('cookieid') && $.cookie('cookienum')) {
            arrid = $.cookie('cookieid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrid = [];
            arrnum = [];
        }
    }
    $('.carBtn').on('click',function(){
        let $id = $(this).parents('#details').find('.smallpic').attr('id');
        cookietoarray();
        // console.log($id);
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1)
        if($.inArray($id, arrid) != -1){
            let $num = parseInt(arrnum[$.inArray($id,arrid)]) + parseInt($('#count').val()); //取值
            arrnum[$.inArray($id, arrid)] = $num; //赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }else{
            arrid.push($id); //将编号$id push到arrid数组中
            $.cookie('cookieid',arrid,{expires: 10, path: '/'});
            arrnum.push($('#count').val()); //将数量push到arrnum数组中
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        $('#mask').css({
            visibility: 'visible',
        })
        $('#addcarBox').css({
            visibility: 'visible',
        })
    })

    //加入购物车弹出框的关闭
    $('.close').on('click',function(){
        $('#mask').css({
            visibility: 'hidden',
        })
        $('#addcarBox').css({
            visibility: 'hidden',
        })
    })
}(jQuery);

// 回到顶部
!function($){
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },800);
    })

    
//显示登陆名
const $admin = $('.one')
const $logout = $('.two')
if(localStorage.getItem('username')){
    let $user = localStorage.getItem('username');
    $admin.html($user);
    $logout.html('注销')
}
$logout.on('click',function(){
    if($logout.html('注销')){
        window.location.reload();
        localStorage.removeItem('username') 
    }
})
}(jQuery)


