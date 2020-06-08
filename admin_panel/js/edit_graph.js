var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var ViewEmployeeUrl =myUrl+"/employee";
var employee_graph_est=myUrl+"/graph/employee";
var SaveEmployeeGraphUrl=myUrl+"/graph/editcreate"

$.ajax({
    url: ViewEmployeeUrl,
    method: 'GET',
    success: function (data) {
        if(data.employee!='empty')
        {
            data.employee.forEach(function(item){
            console.log(item.id);
                if(item.id=='4'){
                    console.log('yes');
                $('#employee_select').append('<option value="'+
            item.id+'">'+
            item.f_name+' '+item.i_name+' '+item.o_name+' '+item.birthday+'</option>');
            }
        });
        }
    }
});

employee_select.oninput = function() {

    var employee_id=$('#employee_select').val();
    
    $.ajax({
    url: employee_graph_est,
    method: 'POST',
    data:{
        em_id:employee_id
    },
    success: function (data) {
        if(data.status != 'empty')
        {
            var i=0;
            
            data.status.forEach(function(item){
                var empty_st_t='#time_start'+i+'n';
                var empty_en_t='#time_end'+i+'n';
                $(empty_st_t).val(item.time_nach);
                $(empty_en_t).val(item.time_okonch);
                $('#date0').val(item.data);
                i++;
            })
            var datetype = $('#date0').val()
            var day_1=translate_in_calendar(datetype,1);
            var day_2=translate_in_calendar(datetype,2);
            var day_3=translate_in_calendar(datetype,3);
            var day_4=translate_in_calendar(datetype,4);
            var day_5=translate_in_calendar(datetype,5);
            var day_6=translate_in_calendar(datetype,6);
            $('#date1').val(day_1);
            $('#date2').val(day_2);
            $('#date3').val(day_3);
            $('#date4').val(day_4);
            $('#date5').val(day_5);
            $('#date6').val(day_6);
        }
        else
        {
            for(var i=0;i<7;i++)
            {
                var empty_st_t='#time_start'+i+'n';
                var empty_en_t='#time_end'+i+'n';
                var empty_date='#date'+i;
                $(empty_st_t).val('');
                $(empty_en_t).val('');
                $(empty_date).val('');
            }
        }
        }
    });
}

function save_graph_form()
{
    if($('#employee_select').val()=="Выберите:")
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Выберите сотрудника!',
            footer: ''
          })    
        return false;
    }

    for(var i=0;i<7;i++)
    {
        var empty_st_t='#time_start'+i+'n';
        var empty_en_t='#time_end'+i+'n';
        var empty_date='#date'+i;
        if($(empty_st_t).val()=='' || $(empty_en_t).val()=='' || $(empty_date).val()=='')
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Не все поля заполнены!',
                footer: ''
              })    
            return false;
        }
    }

    var fd = new FormData($('#graph_form')[0]);
    $.ajax({
        url: SaveEmployeeGraphUrl,
        data:fd,
        dataType:"json",
        method:'POST',
        processData: false,
        cache:false,
        contentType : false,
        success:function(data){
            console.log(data.status);
            Swal.fire(
            'Отлично!',
            'Новые данные сохранены!',
            'success'
            ).then(function(){
                location.reload();
            })
       }
    })
    return false;
    
} 

function fom(fd)
    {
    for (var pair of fd.entries())
        {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
    }

function chek_a_week(datetype)
{
    var D = new Date(datetype);
    var DayNedeli=D.getDay();
    if(DayNedeli==1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function translate_in_calendar(datetype,kol)
{
    var D = new Date(datetype);
    D.setDate(D.getDate() + kol);
    var Day=D.getDate();
    var month=D.getMonth()+1;
    if(month<10)
    {
        month='0'+month;
    }
    if(Day<10)
    {
        Day='0'+Day;
    }
    var day_1=D.getFullYear()+'-'+month+'-'+Day;
    return day_1;
}

date0.oninput = function() {
    var datetype = $('#date0').val()
    if(chek_a_week(datetype))
    {
        var day_1=translate_in_calendar(datetype,1);
        var day_2=translate_in_calendar(datetype,2);
        var day_3=translate_in_calendar(datetype,3);
        var day_4=translate_in_calendar(datetype,4);
        var day_5=translate_in_calendar(datetype,5);
        var day_6=translate_in_calendar(datetype,6);
        $('#date1').val(day_1);
        $('#date2').val(day_2);
        $('#date3').val(day_3);
        $('#date4').val(day_4);
        $('#date5').val(day_5);
        $('#date6').val(day_6);
    }
    else
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Выберите понедельник!',
            footer: ''
          })
          $('#date0').val('');
    }
};
