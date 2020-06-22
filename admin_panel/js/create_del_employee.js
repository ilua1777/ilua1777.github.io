var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var ViewPositionUrl = myUrl+"/position";
var CreateEmployeeUrl = myUrl+"/employee/create";
var EditEmployeeUrl =myUrl+"/employee/edit";
var ViewEmployeeUrl =myUrl+"/employee";
var ViewFirstEmployeeUrl=myUrl+"/position/view";
var DeleteEmployeeUrl=myUrl+"/employee/del";

$.ajax({
    url: ViewPositionUrl,
    method: 'GET',
    success: function (data) {
    if(data.signs!='empty')
    {
        data.signs.forEach(function(item){
            $('#select-box1').append('<option value="'+item.id+'">'+item.name+'</option>');
        })
    }
  }
});

function empty_new_employee(){
    var txt = $('#f_name').val();
    var txt1 = $('#i_name').val();
    var txt2 = $('#birthday').val();
    var txt3 = $('#img').val();
    var txt4 = $('#select-box1').val();
    var txt5 = $('#Email').val();

    if(txt5=='')
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите email!',
            footer: ''
        })
        return false;
    }
    if(txt4=="Выберите:")
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Чтобы продолжить добавьте хоть одну должность!',
            footer: ''
        })
        return false;
    }
    if(txt == '' )
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите фамилию!',
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
                text: 'Введите имя!',
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
                    text: 'Введите дату рождения!',
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
                            text: 'Добавьте фото!',
                            footer: ''
                            })
                        return false;
                    }
                }

            }
    }

    var fd = new FormData($('#new_employee')[0]);

    //fom(fd);
    $.ajax({
        url: CreateEmployeeUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
        if(data.status!='error'){
		$('#new_employee')[0].reset();
            Swal.fire(
            'Отлично!',
            'Новый сотрудник добавлен!',
            'success'
            ).then(function(){
                location.reload();
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

$.ajax({
    url: ViewEmployeeUrl,
    method: 'GET',
    success: function (data) {
        if(data.employee!='empty')
        {
            data.employee.forEach(function(item){
            $('#employee_select').append('<h3><a><option class="dele" data-employee_id="'+
            item.id+'">'+
            item.f_name+' '+item.i_name+' '+item.o_name+' '+item.birthday+'</option></a></h3>');
        });
        }
    
    $('.dele').on('click',function(item){
        var EditId=$(this).data('employee_id');
        setCookie("EditIdEmployee", EditId);
        $.ajax({
        url: ViewFirstEmployeeUrl+"/"+EditId,
        method:'POST',
        success: function(data){
        if(data.status == 'success')
            {
                $('#f_name').val(data.employee.f_name);
                $('#i_name').val(data.employee.i_name);
                $('#o_name').val(data.employee.o_name);
                $('#birthday').val(data.employee.birthday);
                $('#select-box1').val(data.employee.position_id);
                $('#Email').val(data.employeeEmail);
                location.href="#top";
                $('#link_on').remove();
                $('#link_save').remove();
		$('#link_del').remove();
		$('#new_employee').append('<a id="link_save" onclick="empty_edit_employee();" style="margin-top: 29px;" class="btn btn-primary">Сохранить</a>');
                $('#new_employee').append('<a id="link_del" onclick="del_employee();" style="margin-top: 29px;" class="btn btn-primary">Удалить сотрудника</a>');
        }
      }
    });
            
    });    
    }
    })

function empty_edit_employee()
{
    var txt = $('#f_name').val();
    var txt1 = $('#i_name').val();
    var txt2 = $('#birthday').val();
    var txt4 = $('#select-box1').val();
    var txt5 = $('#Email').val();

    if(txt5=='')
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите email!',
            footer: ''
        })
        return false;
    }
    if(txt4=="Выберите:")
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Чтобы продолжить добавьте хоть одну должность!',
            footer: ''
        })
        return false;
    }
    if(txt == '' )
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите фамилию!',
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
                text: 'Введите имя!',
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
                    text: 'Введите дату рождения!',
                    footer: ''
                    })
                return false;
                }

            }
    }

    var fd = new FormData($('#new_employee')[0]);
    fd.append('id_employee', getCookie("EditIdEmployee"));
  
    $.ajax({
        url: EditEmployeeUrl,
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
                deleteCookie("EditIdEmployee");
                location.reload();
			})
			}else
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

function del_employee()
{
    var id_employee=getCookie("EditIdEmployee");
    $.ajax({
        url: DeleteEmployeeUrl,
        data:
        {
            id_em:id_employee,
        },
        dataType:"json",
        method:'POST',
        success:function(data){
            Swal.fire(
            'Отлично!',
            'Удаление прошло успешно!',
            'success'
            ).then(function(){
                deleteCookie("EditIdEmployee");
                location.reload();
                })
       }
    })
    return false;
}
