/* top-nav部分 */
//鼠标放下出现下拉菜单
// !function($) {
//     $('.showNav').on('mouseenter', function() {
//         console.log(111);
//         const $hiddenNav = $('.hiddenNav');
//             $hiddenNav.stop(true).animate({
//                 top: 0
//             })
//     });
// }(jQuery);

//轮播图 - 二级菜单
!function($){
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
        $secondMenu.hide();
    });
    //二级菜单的移入移出
    $secondMenu.on('mouseover',function(){
        $(this).show();
    });
    $secondMenu.on('mouseout',function(){
        $(this).hide();
    });
}(jQuery)

//轮播图
 


// 回到顶部
!function($){
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },200);
    })
}(jQuery)