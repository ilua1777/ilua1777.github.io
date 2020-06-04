var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var AllOrderUrl=myUrl+"/order/all"
var SumOrderUrl=myUrl+"/order/sum"
var ViewOrdeProductUrl=myUrl+"/product/AllIdOrderView"
var DeleteOrdeProductUrl=myUrl+"/order/DeleteOrder"
var ViewEmployeeDelivery=myUrl+"/employee/Delivery"
var CreateDelivery=myUrl+"/employee/CreateDeliveryQueue"
var ViewQueueUrl=myUrl+"/queue"
var ViewQueueNoUrl=myUrl+"/queue/no"
var DeleteDelivery=myUrl+"/employee/DeleteDeliveryQueue"
var EndDelivery=myUrl+"/queue/end"
var POSTorder=myUrl+"/order/close"
var CountAllOrderUrl=myUrl+"/order/allcount"
var DropOrder=[];
var CountOrder=-1;

setInterval(SetLoad,10000);

function SetLoad()
{
    $.ajax({
        url: CountAllOrderUrl,
        dataType:"json",
        method:'POST',
        success:function(data){
            var cot=data.count;
            if(CountOrder<cot && CountOrder!=cot){
                loadorder();
            }
        }
    })
}

loadorder();
function loadorder(){
    $('#grid-view').html("");
    $('#list-view').html("");
$.ajax({
    url: AllOrderUrl,
    dataType:"json",
    method:'POST',
    success:function(data){
        CountOrder=data.count;
        data.order.forEach(function(item){
            $.ajax({
                url: SumOrderUrl,
                data:{
                    order_id:item.id,
                },
                dataType:"json",
                method:'POST',
                success:function(data){
        $('#grid-view').append('<!-- Start Single Product -->'+
        '<div id="test'+item.id+'" onclick="colorGreen('+item.id+');" data-order_id="'+item.id+'" class="col-md-3 col-lg-4 col-sm-4 col-xs-12 box11_margin">'+
            '<div class="product" style="margin-top: 0px;">'+
            '<h3 style="color:red;">Заказ №'+item.id+'</h3>'+    
                '<div style="padding-right: 15px;padding-top: 5px;" class="product__details">'+
                '<h3 style="margin-bottom: 5px;">Телефон:</h3>'+    
                '<h2 style="margin-bottom: 5px;">'+item.phone+'</h2>'+
                '<h3 style="margin-bottom: 5px;">Адрес:</h3>'+    
                '<h2 style="word-wrap: break-word;">'+item.adress+'</h2>'+
                    '<ul class="product__price">'+
                        '<li style="color:black;" class="__price">'+data.Sum+'руб.</li>'+
                        '<li class="new__price">'+item.create_time+'</li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<!-- End Single Product -->');
        $('#list-view').append('<!-- Start List Content-->'+
        '<div class="single__list__content clearfix">'+
            '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-12">'+
                '<div class="list__thumb">'+
                    '<div id="testdel'+item.id+'" onclick="colorGreen('+item.id+');" data-order_id="'+item.id+'" class="col-md-3 col-lg-4 col-sm-4 col-xs-12 box11_margin">'+
                        '<div class="product" style="margin-top: 0px;">'+
                        '<h3 style="color:red;">Заказ №'+item.id+'</h3>'+    
                            '<div style="padding-right: 15px;padding-top: 5px;" class="product__details">'+
                            '<h3 style="margin-bottom: 5px;">Телефон:</h3>'+    
                            '<h2 style="margin-bottom: 5px;">'+item.phone+'</h2>'+
                            '<h3 style="margin-bottom: 5px;">Адрес:</h3>'+    
                            '<h2 style="word-wrap: break-word;">'+item.adress+'</h2>'+
                                '<ul class="product__price">'+
                                    '<li style="color:black;" class="__price">'+data.Sum+'руб.</li>'+
                                    '<li class="new__price">'+item.create_time+'</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- End Single Product -->'+
                '</div>'+
            '</div>'+
            '<div class="col-md-9 col-lg-9 col-sm-8 col-xs-12">'+
                '<div id="product'+item.id+'" class="list__details__inner">'+
                '<ul>'+
                '<li>'+
                '<h2><a href="product-details.html">Заказ:</a></h2>'+
                    
                '</div>'+
                '</li>'+
                '<li style="margin-left: 525px;padding-top: 5px;margin-top: -80px;list-style-type: none;">'+
                '<a onclick="delete_tovar('+item.id+');" data-order_id="'+item.id+'" style="right: 0px; left: auto; text-align: center; text-indent: 0px; font-size: 18px;">X</a>'+
                '</li>'+
                '</ul>'+
            '</div>'+
        '</div>'+
        '<!-- End List Content-->');
        list_product(item.id);
        
                }
            }); 
        });
        ViewQueue();
   }
})
}

function View()
{
    $.ajax({
        url: ViewEmployeeDelivery,
        method:'POST',
        success: function(data){    
            data.status.forEach(function(item){
                $('#select-box1').append(
                    '<option value="'+item.id+'">'+item.f_name+' '+item.i_name+'</option>'    
                )
                $('#deldelivery').append(
                    '<option value="'+item.id+'">'+item.f_name+' '+item.i_name+'</option>'    
                )      
            })
      }
    });
}

function addQueue(){
    View();
    Swal.fire({
        title: 'Выберите сотрудника для добавления в очередь:',
        html: '<select name="deliv_id" id="select-box1" class="custom-select">'+
        '<option selected>Выберите:</option>'+
        
       '</select>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Добавить',
        cancelButtonText: 'Отменить',
      }).then((result) => {
        if (result.value) {
    $.ajax({
    url: CreateDelivery,
    data:{
        id_em:$('#select-box1').val(),
    },
    method:'POST',
    success: function(data){    
        if(data.status=='error'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Этот сотрудник уже добавлен в очередь!',
                footer: ''
            })
        }
        else
        {
            $('#queue_yes').append('<li><a onclick="startQueue('+data.employee.id+');" style="font-family: Verdana, Helvetica, Arial, sans-serif;text-transform: uppercase;">'+data.employee.i_name+' '+data.employee.f_name+'</a></li>')    
        }
  }
});
}
});
return CountOrder;
}

function DeleteQueue(){
    View();
    Swal.fire({
        title: 'Выберите сотрудника которого хотите убрать из очереди:',
        html: '<select name="deldeliv_id" id="deldelivery" class="custom-select">'+
        '<option selected>Выберите:</option>'+
        
       '</select>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Убрать',
        cancelButtonText: 'Оставить',
      }).then((result) => {
        if (result.value) {
    $.ajax({
    url: DeleteDelivery,
    data:{
        id_em:$('#deldelivery').val(),
    },
    method:'POST',
    success: function(data){    
        if(data.status=='error'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Этого сотрудника нет в очереди!',
                footer: ''
            })
        }
        else
        {
            ViewQueue();    
        }
  }
});
}
});
}

function delete_tovar(OrderId){
        Swal.fire({
            title: 'Вы действительно хотите удалить это заказ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отменить',
          }).then((result) => {
            if (result.value) {
        $.ajax({
        url: DeleteOrdeProductUrl+"/"+OrderId,
        method:'POST',
        success: function(data){    
            location.reload();
      }
    });
    }
  });
}

function list_product(id_order)
{
    var id='#product'+id_order;
    $.ajax({
        url: ViewOrdeProductUrl,
        data:{
            id_or:id_order,
        },
        dataType:"json",
        method:'POST',
        success:function(data){
            data.product.forEach(function(item){
                $(id).append('<p>'+item.name+'</p>')
                })
            }
        });
}

function colorGreen(number)
{
    var name='#test'+number;
    var name2='#testdel'+number;
    $(name).toggleClass('box11_margin').toggleClass('box12_margin');
    $(name2).toggleClass('box11_margin').toggleClass('box12_margin');
    if(DropOrder.indexOf(number) != -1)
    {
        var inu=[];
        for(var i=0;i<DropOrder.length;i++)
        {
            if(DropOrder[i]==number)DropOrder[i]=0;
        }
        for(var i=0;i<DropOrder.length;i++)
        {
            if(DropOrder[i]!=0)inu.push(DropOrder[i]);
        }
        DropOrder=inu;
    }
    else
    {
        DropOrder.push(number);
    }
    if(DropOrder.length!=0)
    {
        $('#posted').css('display','block');
    }
    else
    {
        $('#posted').css('display','none');
    }
}

function ViewQueue(){
    $('#queue_yes').html("");
    $('#queue_no').html("");
    $.ajax({
        url: ViewQueueUrl,
        dataType:"json",
        method:'POST',
        success:function(data){
            data.em.forEach(function(item){
                $('#queue_yes').append('<li><a onclick="startQueue('+item.id+');" style="font-family: Verdana, Helvetica, Arial, sans-serif;text-transform: uppercase;">'+item.i_name+' '+item.f_name+'</a></li>');
                })
            }
        });
        $.ajax({
            url: ViewQueueNoUrl,
            dataType:"json",
            method:'POST',
            success:function(data){
                data.em.forEach(function(item){
                    $('#queue_no').append('<li><a onclick="addQueueOrder('+item.id+');" style="font-family: Verdana, Helvetica, Arial, sans-serif;text-transform: uppercase;">'+item.i_name+' '+item.f_name+'</a></li>')                    })
                }
            });

}

function addQueueOrder(id){
    $.ajax({
        url: DeleteDelivery,
        data:{
            id_em:id,
        },
        method:'POST',
        success: function(data){    
            if(data.status=='error'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Произошла непредвиденная ошибка!',
                    footer: ''
                })
            }
            else
            {
                $.ajax({
                    url: CreateDelivery,
                    data:{
                        id_em:id,
                    },
                    method:'POST',
                    success: function(data){    
                        if(data.status=='error'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Произошла непредвиденная ошибка!',
                                footer: ''
                            })
                        }
                        else
                        {
                            ViewQueue();    
                        }
                  }
                });
            }
        }
        });
}

function startQueue(id)
{
    Swal.fire({
        title: 'Куда следует перенести:',
        html: '<div class="form_radio">'+
        '<input id="radio-1" type="radio" name="radio" value="1" checked>'+
        '<label for="radio-1">Перенести в начало</label>'+
    '</div>'+
    '<div style="margin-left: -13px;" class="form_radio">'+
        '<input id="radio-2" type="radio" name="radio" value="2">'+
        '<label for="radio-2">Перенести в конец</label>'+
    '</div>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Перенести',
        cancelButtonText: 'Оставить',
      }).then((result) => {
        if (result.value) {
        if($('input[name=radio]:checked').val()==1)
        {
        $.ajax({
        url: EndDelivery,
        data:{
            id_em:id,
        },
        method:'POST',
        success: function(data){    
            ViewQueue();    
                }
            });
        }
        if($('input[name=radio]:checked').val()==2)
        {
            addQueueOrder(id);
        }
        }
    })
}

function posted()
{
    $.ajax({
        url: POSTorder,
        data:{
            id_or:DropOrder,
        },
        method:'POST',
        success: function(data){    
            loadorder();
                DropOrder=[];
                $('#posted').css('display','none');
            if(data.status == 'error')
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Очередь пуста!',
                    footer: ''
                })
            }
          }
            });
}