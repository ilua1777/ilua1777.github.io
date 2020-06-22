var myUrl='https://salty-plains-22948.herokuapp.com';
//var myUrl='http://localhost/piceria56pro_backend/public'
var categoriesUrl=myUrl+"/tovars";

$.ajax({
    url: categoriesUrl,
    method: 'GET',
    success: function (data) {
    data.tovars.forEach(function(item){
        $('#edit_tovar').append('<!-- Start Single Product -->'+
    '<div class="col-md-3 single__pro col-lg-3 cat--1 col-sm-4 col-xs-12">'+
        '<div class="product foo">'
        +  '<div class="product__inner">'+
                '<div class="pro__thumb">'+
                    '<a id="chek" >'+
                    '<img src="'+item.image_src+'">'+
                    '</a>'+
                '</div>'+
            '</div>'+
            '<div class="product__details">'+
                '<h2>'+item.name+'</h2>'+
                '<div class="new__price">'+item.opisanie+'</div>' +
            '</div>'+
            '<div class="new__price">'+item.cena+' руб.</div>' +
            '</div>'+
        '</div>'+
    '</div>'+
    '<!-- End Single Product -->');
            })
        }
    });
