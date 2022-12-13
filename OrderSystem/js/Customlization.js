var chkbox=Array();
var product_id = 0;
function init() {
    getinfo(0)
    $(document).on('click', '#drink_kind', function () {
        product_id = $(this).val();
        getinfo(product_id);
    })
    $(document).on('click', '#suger_button', function () {
        $("input[name=sweetnness]:checked").each(function(i){
            chkbox.push($(this).val());
        });
        suger_set(product_id,chkbox);
        chkbox.length = 0;
    })
    $(document).on('click', '#ice_button', function () {
        $("input[name=iceamount]:checked").each(function(i){
            chkbox.push($(this).val());
        });
        ice_set(product_id,chkbox);
        chkbox.length = 0;
    })
    $(document).on('click', '#addition_button', function () {
        $("input[name=additionthing]:checked").each(function(i){
            chkbox.push($(this).val());
        });
        addition_set(product_id,chkbox);
        chkbox.length = 0;
    })
}


function suger_set(i,n){
    $.ajax({
        type:"POST",
        data:JSON.stringify({id:i,suger:n}),
        url:"./api/revise.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("設定成功");
                getinfo(product_id);
            }else{
                alert("設定失敗");
            }
        }
    })
}
function ice_set(i,n){
    $.ajax({
        type:"POST",
        data:JSON.stringify({id:i,ice:n}),
        url:"./api/revise.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("設定成功");
                getinfo(product_id);
            }else{
                alert("設定失敗");
            }
        }
    })
}
function addition_set(i,n){
    $.ajax({
        type:"POST",
        data:JSON.stringify({id:i,feed:n}),
        url:"./api/revise.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("設定成功");
                getinfo(product_id);
            }else{
                alert("設定失敗");
            }
        }
    })
}
function getinfo(n){
    console.log(n)
    $.ajax({
        type:"get",
        data:{id:n},
        url:"http://localhost:8080/lab/1/user/userhome.php",
        datatype:"json",
        success:function(json) {
            $("#suger_info").empty();
            $(json["suger"]).each(function(index,element){
                $("#suger_info").append(`<li value="${element.id}">${element.sweet}</li>`);
            })  
        }
    })
    $.ajax({
        type:"get",
        data:{id:n},
        url:"http://localhost:8080/lab/1/user/userhome.php",
        datatype:"json",
        success:function(json) {
            $("#ice_info").empty();
            $(json["ice"]).each(function(index,element){
                $("#ice_info").append(`<li value="${element.id}">${element.ice}</li>`);
            }) 
        }
    })
    $.ajax({
        type:"get",
        data:{id:n},
        url:"http://localhost:8080/lab/1/user/userhome.php",
        datatype:"json",
        success:function(json) {
            $("#suger_info").empty();
            $(json["suger"]).each(function(index,element){
                $("#suger_info").append(`<li value="${element.id}">${element.sweet}</li>`);
            })  
        }
    })
}