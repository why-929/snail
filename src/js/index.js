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

// 回到顶部
!function($){
    $('.sideBar-top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },200);
    })
}(jQuery)