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
    $id = $data["id"];
    unset($data["id"]);
    $statement = "";
    $array = [];
    $values = [];
    
    if (array_key_exists('ice', $data)) {
        $values = $data["ice"];
        $remove = "DELETE FROM public.product_ice
        WHERE product_id = :id";
        $sql = "INSERT INTO public.product_ice(product_id, ice_id)
                VALUES ";
    }
    if (array_key_exists('suger', $data)) {
        $values = $data["suger"];
        $remove = "DELETE FROM public.product_suger
        WHERE product_id = :id";
        $sql = "INSERT INTO public.product_suger(product_id, suger_id)
                VALUES ";
    }
    if (array_key_exists('feed', $data)) {
        $values = $data["feed"];
        $remove = "DELETE FROM public.product_feed
        WHERE product_id = :id";
        $sql = "INSERT INTO public.product_feed(product_id, feed_id)
                VALUES ";
    }
    foreach($values as $key => $value){
        $statement .= "(:product_id, :value_{$key}),";
        $array["product_id"] = $id;
        $array["value_{$key}"] = $value;
    }
    $statement = rtrim($statement, ",");
    $sql .= $statement;

    $_revise = $pdo->prepare($remove);
    $_revise->bindValue(":id", $id, PDO::PARAM_INT);
    $_revise->execute();

    $_revise = $pdo->prepare($sql);


    if(!$_revise->execute($array)){
        echo (json_encode(['status'=>'failure','info'=>$_revise->errorInfo()]));
    }else{
        echo "true";
    }
?>