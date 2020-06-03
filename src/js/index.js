/* top-nav部分 */
//鼠标放下出现下拉菜单
! function($) {
    $('.showNav').on('mouseenter', function() {
        console.log(111);
        const $hiddenNav = $('.hiddenNav');
            $hiddenNav.stop(true).animate({
                top: 0
            })
    });
}(jQuery);