function init() {
    $.ajax({
        type:"get",
        url:"./Order.json",
        datatype:"json",
        success:function(json) {
            $(json).each(function(index,element){
                $("#transaction_record_info").append(`
                    <tr value="${element.id}" id="${element.id}">
                        <th scope="row">${index+1}</th>
                        <td id="transaction_record_info_drink"></td>
                        <td>$${element.cost}</td>
                        <td>${element.data}</td>
                    </tr>`);
                $(element.product).each(function(index1,element1){
                    $(`#${element.id} #transaction_record_info_drink`).append(`
                        ${element1.product_name}
                        <ul class="list-style-type:disc">
                            <li>${element1.ice}</li>
                            <li>${element1.sweet}</li>
                            <li><h6>${element1.feed}</h6></li>
                        </ul>
                    `);
                    
                })
            })   
        }
    })
}

