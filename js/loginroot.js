var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var signcreateUrl=myUrl+"/sign/createlogin";
var signViewUrl = myUrl + "/sign";
var signAdminUrl = myUrl + "/signpass";
var StoreNameUrl=myUrl+"/Store/name";


function logout(){
    deleteCookie("userID");
    location.href='../index.html';
}

$.ajax({
    url: signViewUrl,
    method:'GET',
    success:function(data){
            if(data.signs!='empty')
            {
                $('#ulstyle').append('<ul class="login__register__menu" role="tablist">'+
                        '<li role="presentation" class="login active"><a href="#login" role="tab" data-toggle="tab">Войти</a></li>'+
                        '</ul>');
                $('#divclickstyle').append('<a onclick="signadmin();" class="sign">Войти</a>');
            }
            else
            {
                $('#ulstyle').append('<ul class="login__register__menu" role="tablist">'+
                        '<li style="margin-bottom: -45px;text-align: center;" role="presentation" class="login active"><a href="#login" role="tab" data-toggle="tab">Добро пожаловать в систему</a></li>'+
                    '</ul>'+
                    '<a style="font-size: 20px;text-align: center;margin-left: 85px;" href="">Пожалуйста, для начала зарегистрируйтесь:</a>');
                $('#regist_start').append('<input id="p_pass" name="p_passn" type="password" placeholder="Повторите пароль">');
                
                $('#divclickstyle').append('<a onclick="start_reg();" style="width: 300px;" class="sign" id="reg">Зарегистироваться</a>');     
            }
    }
})

        function start_reg(){
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
    

    var fd = new FormData($('#regist_start')[0]);

    //fom(fd);
    $.ajax({
        url: signcreateUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
         if(data.status!='error'){   console.log(data);
        $('#regist_start')[0].reset();
            Swal.fire(
            'Отлично!',
            'Новый администратор добавлен в список',
            'success'
            ).then(function(){
                setCookie("userID", data.id_new_admin);
                location.href="admin_panel/index_log.html";
		 })
		 }
		 else{
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

    function signadmin(){
        var txt = $('#login').val();
        var txt2 = $('#pass').val();
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
                if(txt2 == '')
                {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Введите пароль!',
                    footer: ''
                })
                return false;
                }
        }
    

    var fd = new FormData($('#regist_start')[0]);

    //fom(fd);
    $.ajax({
        url: signAdminUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
            console.log(data);
            if(data.status == 'success')
            {
                console.log(data.level);
                if(data.level == '1')
                {
                    setCookie("userID", data.id_new_admin);
                    location.href="admin_panel/index_log.html";
                }
                if(data.level == '2')
                {
                    setCookie("manID", data.id_new_admin);
                location.href="manager_panel/index.html";
                }
                
            }
            if(data.status == 'error')
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Введен неправильный логин или пароль!',
                    footer: ''
                }).then(function(){
                    $('#regist_start')[0].reset();        
                })
            }
       }
    })
    return false;
    }
