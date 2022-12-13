function init() {
    getinfo();
    $(document).on('click', '#create_button', function () {
        Create($("#create_product_name").val(),$("#create_cost").val());
    })
    $(document).on('click', '#edit_button', function () {
        
        var n1 = $(this).parents("tr").attr("value");
        var n2 = $(this).parents("tr").find("td").eq(0).text();
        var n3 = $(this).parents("tr").find("td").eq(1).text();
        
        $("#product_name").val(n2);
        $("#cost").val(n3);
        $(document).on('click', '#updata_button', function () {
            Update(n1,$("#product_name").val(),$("#cost").val())
        })
        $(document).on('click', '#delete_button', function () {
            Delete(n1);
        })
    })
}
function Create(n1,n2){
    $.ajax({
        type:"POST",
        data:{name: n1, cost: n2},
        url:"./api/product/new.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("刪除成功");
                getinfo();
            }else{
                alert("刪除失敗");
            }
        }
    })
}
function Delete(n){
    $.ajax({
        type:"delete",
        data:{id:n},
        url:"http://localhost:8080/lab/1/user/userdelete.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("刪除成功");
                getinfo();
            }else{
                alert("刪除失敗");
            }
        }
    })
}
function Update( n1,n2,n3){
    $.ajax({
        type:"post",
        data:{ 
            id:n1,name: n2, cost: n3
        },
        url:"./api/product/revise.php",
        datatype:"json",
        success:function(json) {
            if(json == "true"){
                alert("修改成功");
                getinfo();
            }else{
                alert("修改失敗");
            }
        }
    })
}
function getinfo(){
    $.ajax({
        type:"get",
        url:"./api/product/get.php",
        datatype:"json",
        success:function(json) {
            $("#product_info").empty();
            json =JSON.parse(json);
            for (var index = 0; index < json.length; index++) {
                $("#product_info").append(`
                <tr value= "${json[index].id}">
                    <th scope="row">${index+1}</th>
                    <td>${json[index].name}</td>
                    <td>$${json[index].cost}</td>
                    <td><button type="button" id="edit_button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">...</button></td>
                </tr>`);
                
            }
        }
    })
}
