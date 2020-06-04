var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var tovarsUrl=myUrl+"/categories";
var deleteTovarUrl=myUrl+"/categories/delete";

$.ajax({
    url: tovarsUrl,
    method: 'GET',
    success: function (data) {
    data.tovars.forEach(function(item){
    $('#tovars').append('<h3><a><option class="dele" data-tovar_id="'+
    item.id+'">'+
    item.categories+'</option></a></h3>');
    });

    $('.dele').on('click',function(item){
        var deleteId=$(this).data('tovar_id');
        $.ajax({
            url: deleteTovarUrl+"/"+deleteId,
            method:'POST',
            success: function(data){
                location.reload();
            }
        });
    });    
    }
    })

    $.ajax({
        url:tovarsUrl,
        method:'GET',
        success: function(data){
            data.tovars.forEach(function(item) {
                $('#tovars').append('');
            
            });
        }
    })