var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var CreatePositionUrl=myUrl+"/position/create";
var DelPositionUrl = myUrl+"/position/del";
var ViewPositionUrl = myUrl+"/position";

    function empty_new_position()
    {
        var txt = $('#name').val();
        var txt1 = $('#opis').val();
        if(txt == '' )
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите название!',
                footer: ''
            })
            return false;
        }
        else
        {
                if(txt1 == '')
                {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Введите описание!',
                    footer: ''
                })
                return false;
                }
    }

    var fd = new FormData($('#new_position')[0]);

    //fom(fd);
    $.ajax({
        url: CreatePositionUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
        $('#new_position')[0].reset();
            Swal.fire(
            'Отлично!',
            'Новая должность добавлена!',
            'success'
            ).then(function(){
                location.reload();
                })
       }
    })
    return false;
}

$.ajax({
    url: ViewPositionUrl,
    method: 'GET',
    success: function (data) {
        if(data.signs!='empty')
        {
            data.signs.forEach(function(item){
            $('#del_position').append('<h3><a><option class="dele" data-position_id="'+
            item.id+'">'+
            item.name+'</option></a></h3>');
        });
        }
    
    $('.dele').on('click',function(item){
        Swal.fire({
            title: 'Вы действительно хотите удалить эту должность?',
            text: "Это может привести к необратимым последствиям!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Отменить',
            confirmButtonText: 'Да, удалить!'
          }).then((result) => {
            if (result.value) {
                var deleteId=$(this).data('position_id');
                $.ajax({
                    url: DelPositionUrl+"/"+deleteId,
                    method:'POST',
                    success: function(data){
                        if(data.status == 'success')
                        {
                            Swal.fire(
                                'Дожность удалена!',
                                'Удаление прошло успешно.',
                                'success'
                              ).then(function(){
                                location.reload();
                              })
                        }
                    }
                });
            }
          })
    });    
    }
    })