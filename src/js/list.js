//列表页渲染
!function ($) {
    const $cardBox = $('#cardBox');
    $.ajax({
        url: 'http://127.0.0.1/snail/php/listdata.php',
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        let $strhtml ="";
        $.each(data, function (index, value) {
            $strhtml += `
            <div class="cardInner">
                <a href="javascript:;">
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
                url: 'http://127.0.0.1/snail/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml ="";
                $.each(data, function (index, value) {
                        $strhtml += `
                        <div class="cardInner">
                            <a href="javascript:;">
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

                // array_default = [];//排序前的li数组
                // array = [];//排序中的数组
                // prev = null;
                // next = null;

                // //将页面的li元素加载到两个数组中
                // $('.list li').each(function (index, element) {
                //     array[index] = $(this);
                //     array_default[index] = $(this);
                // });
            })
        }
    });
}(jQuery);

//鼠标悬停图片上图片放大
$(function(){
    $w = $('#cardBox img').width();
    $h = $('#cardBox img').height();
    $w2 = $w + 10;
    $h2 = $h + 10;
 
    $('#cardBox img').hover(function(){
        $(this).stop().animate({
            height:$h2,
            width:$w2,
        },500);
    },function(){
        $(this).stop().animate({
            height:$h,
            width:$w,
        },500);
    });
});




// 回到顶部
!function($){
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },200);
    })
}(jQuery)