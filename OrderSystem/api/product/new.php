<?php
    $host='140.127.49.168';
    $db = 'project114';
    $username = 'minlab';
    $password = '970314970314';
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$db;", $username, $password, array(PDO::ATTR_PERSISTENT => true));
    if(!$pdo){
       echo(json_encode(['status'=>'failure']));
    }
    $sql = "INSERT INTO public.products(name, cost)
        VALUES (:name, :cost);
    ";
    
    $_add = $pdo->prepare($sql);
    $_add->bindValue(':name', $_POST['name'], PDO::PARAM_STR);
    $_add->bindValue(':cost', $_POST['cost'], PDO::PARAM_INT);
    try {
        if ($_add->execute()) {
            echo "true";
        } else {
            echo "false";
        }
    } catch (PDOException $e) {
        echo "false";
    }
?>