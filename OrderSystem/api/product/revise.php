<?php
    $host='140.127.49.168';
    $db = 'project114';
    $username = 'minlab';
    $password = '970314970314';

    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$db;", $username, $password, array(PDO::ATTR_PERSISTENT => true));
    if(!$pdo){
        echo(json_encode(['status'=>'failure']));
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $product_name = $data['name'];
    $cost = $data['cost'];

    $sql = "UPDATE public.products
	SET name = :product_name, cost = :cost
 	WHERE id = :id";

    $_revise = $pdo->prepare($sql);
    $_revise->bindValue(":id", $id, PDO::PARAM_INT);
    $_revise->bindValue(":product_name", $product_name, PDO::PARAM_STR);
    $_revise->bindValue(":cost", $cost, PDO::PARAM_INT);

    if(!$_revise->execute()){
        echo (json_encode(['status'=>'failure','info'=>$_revise->errorInfo()]));
    }else{
        echo "true";
    }
?>