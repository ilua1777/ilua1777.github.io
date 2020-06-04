var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var signUrl=myUrl+"/sign/createlogin";
var signdelUrl = myUrl+"/sign/dellogin";
var signViewUrl = myUrl+"/sign";

function fom(fd)
    {
    for (var pair of fd.entries())
        {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
    }

    function empty_login_root()
    {
        var txt = $('#login').val();
        var txt2 = $('#pass').val();
        var txt3 = $('#p_pass').val();
        if(txt == '' )
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите логин!',
                footer: ''
            })
            return false;
        }
        else
        {
                if(txt2 == '' || txt3 == ''|| txt2 != txt3)
                {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Пароли не совпадают!',
                    footer: ''
                })
                return false;
                }
    }

    var fd = new FormData($('#new_admin')[0]);

    //fom(fd);
    $.ajax({
        url: signUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
        $('#new_admin')[0].reset();
            Swal.fire(
            'Отлично!',
            'Новый администратор добавлен в список',
            'success'
            ).then(function(){
                location.reload();
                })
       }
    })
    return false;
}

$.ajax({
    url: signViewUrl,
    method: 'GET',
    success: function (data) {
    data.signs.forEach(function(item){
    $('#del_admin').append('<h3><a><option class="dele" data-admin_id="'+
    item.id+'">'+
    item.email+'</option></a></h3>');
    });

    $('.dele').on('click',function(item){
        Swal.fire({
            title: 'Вы действительно хотите удалить администратора?',
            text: "Это может привести к необратимым последствиям!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отменить',
          }).then((result) => {
            if (result.value) {
                var deleteId=$(this).data('admin_id');
                $.ajax({
                    url: signdelUrl+"/"+deleteId,
                    method:'POST',
                    success: function(data){
                        if(data.status == 'success')
                        {
                            Swal.fire(
                                'Администратор удален!',
                                'Удаление прошло успешно.',
                                'success'
                              ).then(function(){
                                location.reload();
                              })
                        }
                        if(data.status == 'error')
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Вы не можете удалить единственного администратора!',
                                footer: ''
                              })
                            return false;
                        }
                    }
                });
            }
          })
    });    
    }
    })

    $.ajax({
        url:signViewUrl,
        method:'GET',
        success: function(data){
            data.signs.forEach(function(item) {
                $('#tovars').append('');
            
            });
        }
    })