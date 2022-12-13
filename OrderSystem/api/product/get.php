<?php

    $host='140.127.49.168';
    $db = 'project114';
    $username = 'minlab';
    $password = '970314970314';

    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$db;", $username, $password, array(PDO::ATTR_PERSISTENT => true));
    if(!$pdo){
        echo(json_encode(['status'=>'failure']));
    }
    // 基本菜單
    $product_sql = "SELECT * FROM public.products 
        ORDER BY id ASC";

    $_get = $pdo->prepare($product_sql);

    if(!$_get->execute()){
        echo (json_encode(['status'=>'failure','info'=>$_get->errorInfo()]));
    }else{
        echo (json_encode($_get->fetchAll(PDO::FETCH_ASSOC)));
    }
?>
