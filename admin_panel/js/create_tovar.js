var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var createTovarUrl=myUrl+"/tovar/create";
var categoriesUrl=myUrl+"/categories";

$.ajax({
    url: categoriesUrl,
    method: 'GET',
    success: function (data) {
    data.tovars.forEach(function(item){
    $('#select-box1').append('<option value="'+item.id+'">'+item.categories+'</option>');
        });    
    }
})

function fom(fd)
    {
    for (var pair of fd.entries())
        {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
    }

function empty_tovar()
{
    var txt5 = $('#select-box1').val();
    var txt = $('#nam').val();
    var txt1 = $('#cen').val();
    var txt2 = $('#opis').val();
    var txt3 = $('#img').val();
    
    if(txt5 == null)
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Сначала добавьте категорию!',
            footer: ''
          })
        return false;
    }
    if(txt == '' )
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите имя!',
            footer: ''
          })
        return false;
    }
    else
    {
        if(txt1 == '' )
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Введите цену!',
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
                text: 'Введите описание!',
                footer: ''
              })
            return false;
            }
            else
            {
                if(txt3=='')
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Выберите фото!',
                        footer: ''
                      })
                    return false;
                }
                else 
                {
                    if(txt5='')
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Выберите категорию!',
                            footer: ''
                          })
                        return false;
                    }   
                }
            }   
        }   
    }

    var fd = new FormData($('form')[0]);
    //fom(fd);
    $.ajax({
        url: createTovarUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
        $('#new_tovar')[0].reset();
//        console.log(data.src);
            Swal.fire(
            'Отлично!',
            'Товар добавлен',
            'success'
            )
       }
    })
    return false;
}

