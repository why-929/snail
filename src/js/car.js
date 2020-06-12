!function($){
    function showlist(id,num){
        $.ajax({
            url: 'http://10.31.162.31/snail/php/data.php',
            dataType: 'json'
        }).done(function(data){
            $.each(data,function(index,value){
                if(id == value.id){
                    let $clonebox = $('.carProducts:hidden').clone(true,true);
                    $clonebox.find('.pic').find('img').attr('src',value.url);//图片地址
                    $clonebox.find('.pic').find('img').attr('id',value.id);//id
                    $clonebox.find('.info').html(value.title);//标题
                    $clonebox.find('.oneprice').html(value.price);//单价
                    $clonebox.find('.numberBox').find('input').val(num);//数量
                    $clonebox.css('display','block');
                    $('.carProduct').append($clonebox);
                    //计算单个商品的价格
                    $clonebox.find('.oneprices').html((value.price * num).toFixed(2));
                    calcprices();//计算总价
                }
            })
        })
    }
    //2.获取cookie渲染数据
    if ($.cookie('cookieid') && $.cookie('cookienum')) {
        let s = $.cookie('cookieid').split(','); //获取cookie 同时转换成数组[1,2]
        let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
        });
    }

    //3.计算总价 - 函数封装
    function calcprices() {
        let $sum = 0; //单个商品的件数
        let $count = 0; //单个商品的总价
        $('.carProducts:visible').each(function(index, ele) {
            if ($('.type input').prop('checked')) {//如果复选框勾选
                $sum += parseInt($(ele).find('.col4 input').val());//单个商品的件数
                $count += parseFloat($(ele).find('.col5 .oneprices').html());//单个商品的总价
            }
        });
        $('.select').find('.selectNum').html($sum);//已选商品
        $('.totalPrice').html($count.toFixed(2));//合计
    }

    //4.全选
    $('.type input').on('change', function() {
        $('.carProducts:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        calcprices(); //计算总价 
    });
    let $inputs = $('.carProducts:visible').find(':checkbox');
    $('.carProducts').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        //如果复选框勾选的个数 === input复选框的个数
        if ($('.carProducts:visible').find(':checkbox').length === $('.carProducts:visible').find('input:checked').size()) {
            $('.type input').prop('checked', true);//全选按钮选中
        } else {
            $('.type input').prop('checked', false);//取消全选
        }
        calcprices(); //计算总价
    });

    //5.数量的改变

    //计算单价
    function calcsingleprice(obj) { //obj元素对象
        let $dj = parseFloat(obj.parents('.carProducts').find('.col3 .oneprice').html());
        let $num = parseInt(obj.parents('.carProducts').find('.col4 input').val());
        return ($dj * $num).toFixed(2)
    }
    $('.add').on('click', function() {//商品数量增加按钮
        let $num = $(this).parents('.carProducts').find('.col4 input').val();//获取输入框中的数值
        $num++;
        $(this).parents('.carProducts').find('.col4 input').val($num);
        $(this).parents('.carProducts').find('.col5 .oneprices').html(calcsingleprice($(this)));//计算单个商品的总价
        calcprices(); //计算总价
        setcookie($(this));
    });
    $('.minus').on('click', function() {//商品数量减少按钮
        let $num = $(this).parents('.carProducts').find('.col4 input').val();//获取输入框中的数值
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.carProducts').find('.col4 input').val($num);
        $(this).parents('.carProducts').find('.col5 .oneprices').html(calcsingleprice($(this)));//计算单个商品的总价
        calcprices(); //计算总价
        setcookie($(this));
    });
    $('.col4 .numberBox input').on('input', function() {//输入框输入商品数量
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.carProducts').find('.col5 .oneprices').html(calcsingleprice($(this)));//计算单个商品的总价
        calcprices(); //计算总价
        setcookie($(this));
    });

    //将改变后的数量存放到cookie中
    let arrid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function cookietoarray() {
        if ($.cookie('cookieid') && $.cookie('cookienum')) {
            arrid = $.cookie('cookieid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrid = [];
            arrnum = [];
        }
    }
    function setcookie(obj) {
        cookietoarray();
        let $id = obj.parents('.carProducts').find('img').attr('id');
        arrnum[$.inArray($id, arrid)] = obj.parents('.carProducts').find('.col4 input').val();
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });//将添加后的数量存入cookie
    }

    //6.删除
    function delcookie(id, arrid) { //id:当前删除的id  arrid:存放id的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        $.each(arrid, function(index, value) {
            if (id === value) {
                $index = index;
            }
        });
        arrid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookieid', arrid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }
    $('.col6 .delete').on('click', function() {//单个商品的删除
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.carProducts').remove();//删除商品元素
            delcookie($(this).parents('.carProducts').find('img').attr('id'), arrid);//删除选中商品的cookie
            calcprices(); //计算总价
        }
    });

    $('.carBox-footer-left .deleteMore').on('click', function() {//删除全部商品
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.carProducts:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();//复选框选中即删除
                    delcookie($(this).find('img').attr('id'), arrid);//删除选中多个商品的cookie
                }
            });
            calcprices(); //计算总价
        }
    });

}(jQuery)


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