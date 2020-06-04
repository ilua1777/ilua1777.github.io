var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var AllOrderUrl=myUrl+"/order/allEnd"
var SumOrderUrl=myUrl+"/order/sumEnd"

loadorder();
function loadorder(){
    $('#End_order').html("");
    $.ajax({
    url: AllOrderUrl,
    dataType:"json",
    method:'POST',
    success:function(data){
        CountOrder=data.count;
        console.log(data.order);
        data.order.forEach(function(item){
            $.ajax({
                url: SumOrderUrl,
                data:{
                    order_id:item.id,
                },
                dataType:"json",
                method:'POST',
                success:function(data){
        $('#End_order').append('<!-- Start Single Product -->'+
        '<div id="test'+item.id+'" onclick="colorGreen('+item.id+');" data-order_id="'+item.id+'" class="col-md-3 col-lg-4 col-sm-4 col-xs-12 box11_margin">'+
            '<div class="product" style="margin-top: 0px;">'+
            '<h3 style="color:red;">Заказ №'+item.id+'</h3>'+    
                '<div style="padding-right: 15px;padding-top: 5px;" class="product__details">'+
                '<h3 style="margin-bottom: 5px;">Телефон:</h3>'+    
                '<h2 style="margin-bottom: 5px;">'+item.phone+'</h2>'+
                '<h3 style="margin-bottom: 5px;">Адрес:</h3>'+    
                '<h2 style="word-wrap: break-word;">'+item.adress+'</h2>'+
                '<h3 style="margin-bottom: 5px;">Сотрудник:</h3>'+    
                '<h2 style="word-wrap: break-word;">'+data.employ.f_name+' '+data.employ.i_name+'</h2>'+
                    '<ul class="product__price">'+
                        '<li style="color:black;" class="__price">'+data.Sum+'руб.</li>'+
                        '<li class="new__price">'+item.create_time+'</li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<!-- End Single Product -->');
                }
            }); 
        });
   }
})
}