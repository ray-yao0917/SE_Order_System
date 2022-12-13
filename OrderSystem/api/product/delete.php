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

    
?>