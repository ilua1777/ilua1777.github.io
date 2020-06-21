var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var createDataUrl=myUrl+"/Data/create";
var ViewDataUrl=myUrl+"/Data/View";

function empty_data()
{
    var txt = $('#na').val();
    var txt1 = $('#ad').val();
    var txt2 = $('#ph').val();
    var txt3 = $('#em').val();
    var txt4 = $('#op').val();
    
    if(txt == '')
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Наименование магазина не заполнено!',
            footer: ''
          })
        return false;
    }
    if(txt1 == '' )
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите адрес!',
            footer: ''
          })
        return false;
    }
    else
    {
        if(txt2 == '' )
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите номер телефона!',
                footer: ''
              })
            return false;
        }
        else
        {
            if(txt3 == '' )
            {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите email!',
                footer: ''
              })
            return false;
            }
            else
            {
                if(txt4=='')
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
        }   
    }

    var fd = new FormData($('#edit_data')[0]);
    $.ajax({
        url: createDataUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
            console.log(data.status);
            if(data.status == 'success')
            {
            Swal.fire(
            'Отлично!',
            'Изменения внесены',
            'success'
            ).then(function(){
                location.reload();
            })
            }
            else 
            {
                Swal.fire({     
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Вы не добавили изображение!',
                    footer: ''
                    })
                            
            }
       }
    })
    return false;
}

$.ajax({
    url: ViewDataUrl,
    dataType:"json",
    method:'POST',
    processData: false,
    cache:false,
    contentType : false,
    success:function(data){
        if(data.status!='error'){
            $('#na').val(data.dat.name);
            $('#ad').val(data.dat.adress);
            $('#ph').val(data.dat.phone);
            $('#em').val(data.dat.Email);
            $('#op').val(data.dat.description);
        }
   }
})
