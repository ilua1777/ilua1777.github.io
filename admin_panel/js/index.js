var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var ViewPayUrl=myUrl+"/pay/date"
var PayEmployeeDos=myUrl+"/pay/PayEmployeeDos"
var PayEmployee=myUrl+"/pay/PayEmployee"

function logout(){
    deleteCookie("userID");
    location.href="../index.html";
}

$.ajax({
    url: PayEmployeeDos,
    method: 'GET',
    success: function (data) {
        if(data.employee!='error')
        {
            data.employee.forEach(function(item){
            $('#employee_select').append('<option value="'+
            item.id+'">'+
            item.f_name+' '+item.i_name+' '+item.o_name+' '+item.birthday+'</option>');
        });
        }
    }
});

function pay(){
    $('#zakaz').html('');
    var id_em=$('#employee_select').val();
    if(id_em==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Выберите сотрудника!',
            footer: ''
          })    
        return false;
    }
    var dat=$('#datet').val();
    if(dat==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите дату!',
            footer: ''
          })    
        return false;
    }
    var dat1=$('#datet1').val();
    if(dat1==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Введите дату!',
            footer: ''
          })    
        return false;
    }
    $.ajax({
        url: ViewPayUrl,
        method: 'POST',
        data:{
            em_id:id_em,
            dates:dat,
            dates1:dat1,
        },
        success: function (data) {
            if(data.status!='error'){
            $('#zakaz').html("");
            var sum=0;
            data.pay.forEach(function(item){
                sum+=item.result;
                $.ajax({
                    url: PayEmployee,
                    method: 'POST',
                    data:{
                        em_id:id_em,
                    },
                    success: function (data) {
                        $('#zakaz').append(
                            '<tr>'+
                            '<td id="tyr">'+item.data+'</td>'+
                            '<td>'+data.employee.f_name+'</td>'+
                            '<td>'+data.employee.i_name+'</td>'+
                            '<td>'+item.kolvo+'</td>'+
                            '<td>'+item.result+'</td>'+
                            '</tr>');
                    }
                })        

            })
            $('#print').css('display','block');
            $('#summa').val(sum);
          }
          else
          {
            $('#print').css('display','none');
            $('#summa').val('');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'В указанные даты этот сотрудник не работал!',
                footer: ''
              })    
          }
        }
    });
}
