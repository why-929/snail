!function ($) {
    
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    let prev = null;
    let next = null;

    //列表页渲染
    const $cardBox = $('#cardBox');
    $.ajax({
        url: 'http://10.31.162.31/snail/php/listdata.php',
        dataType: 'json'
    }).done(function (data) {
        // console.log(data);
        let $strhtml ="";
        $.each(data, function (index, value) {
            $strhtml += `
            <div class="cardInner">
                <a href="detail.html?id=${value.id}" target="_blank">
                    <h4 class="cardWrapper-title">${value.title}</h4>
                    <p class="descript">${value.describe}</p>
                    <p class="price">￥${value.price}</p>
                    <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                </a>
            </div>`
        });
        $cardBox.html($strhtml);
        
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = []; //排序前的li数组
        array = []; //排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.cardInner').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });

    });
    //分页效果
    $('.page').pagination({
        pageCount: 2,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '<',
        nextContent: '>',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://10.31.162.31/snail/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml ="";
                $.each(data, function (index, value) {
                    $strhtml += `
                    <div class="cardInner">
                        <a href="detail.html?id=${value.id}" target="_blank">
                            <h4 class="cardWrapper-title">${value.title}</h4>
                            <p class="descript">${value.describe}</p>
                            <p class="price">￥${value.price}</p>
                            <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        </a>
                    </div>`
                });
                $cardBox.html($strhtml);
                //添加懒加载
                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                array_default = [];//排序前的数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的class="cardInner"的元素加载到两个数组中
                $('.cardInner').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });
    
    //排序
    //默认排序-重置
    $('button').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('#cardBox').append(value);
        });
        return;
    });
    //价格升序
    $('button').eq(1).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function(index, value) {
            console.log(value); 
            $('#cardBox').append(value);
        });
    });
}(jQuery);

// //鼠标悬停图片上图片放大
// $(function(){
//     $w = $('#cardBox img').width();
//     $h = $('#cardBox img').height();
//     $w2 = $w + 10;
//     $h2 = $h + 10;
 
//     $('#cardBox img').hover(function(){
//         $(this).stop().animate({
//             height:$h2,
//             width:$w2,
//         },500);
//     },function(){
//         $(this).stop().animate({
//             height:$h,
//             width:$w,
//         },500);
//     });
// });


// 回到顶部
!function($){
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },200);
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