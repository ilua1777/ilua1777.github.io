var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var EditProfileUrl=myUrl+"/profile/edit"
var ViewProfileUrl=myUrl+"/profile/view"

$.ajax({
    url: ViewProfileUrl,
    data:{
        employee_id:getCookie("manID"),
    },
    dataType:"json",
    method:'POST',
    success:function(data){
        $('#emails').val(data.email);
        $('#images').append('<img src="'+data.image+'" style="height: 135px;width:135px;margin-left: 245px;">')
   }
})

remind_me.oninput = function() {
    if($('#passs').prop('disabled'))
    {
        $('#passs').prop('disabled', false)
        $('#p_passs').prop('disabled', false)
    }
    else
    {
        $('#passs').prop('disabled', true)
        $('#p_passs').prop('disabled', true)
    }
}

remind_img.oninput = function() {
    if($('#img').prop('disabled'))
    {
        $('#img').prop('disabled', false)
    }
    else
    {
        $('#img').prop('disabled', true)
    }
}

function empty_profile()
{
    if($('#emails').val()=='')
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Поле email пусто!',
            footer: ''
        })
        return false;
    }
    
    if(!$('#passs').prop('disabled'))
    {
        if($('#passs').val() == '' || $('#p_passs').val()=='' || $('#passs').val()!=$('#p_passs').val())
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

    var fd = new FormData($('#profile_man')[0]);
    fd.append('employee_id',getCookie("manID"));

    //fom(fd);
    $.ajax({
        url: EditProfileUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
            if(data.status!='error'){
			Swal.fire(
            'Отлично!',
            'Новые данные сохранены!',
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
                    text: 'Этот email уже есть в системе!',
                    footer: ''
                })
		  }
       }
    })
    return false;
}