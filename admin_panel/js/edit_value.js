var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var EditValueUrl=myUrl+"/Value/Edit"
var ViewValueUrl=myUrl+"/Value"

$.ajax({
    url: ViewValueUrl,
    method: 'POST',
    success: function (data) {
        if(data.status!='error') $('#val_order').val(data.status.cena);
    }
    });

    function empty_value_order()
    {
        var txt = $('#val_order').val();
        if(txt == '' )
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите стоимость!',
                footer: ''
            })
            return false;
        }
        

    var fd = new FormData($('#val_or')[0]);

    $.ajax({
        url: EditValueUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
            Swal.fire(
            'Отлично!',
            'Изменения внесены успешно!',
            'success'
            )
       }
    })
    return false;
}