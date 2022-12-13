<?php
use \Psr\Container\ContainerInterface;

class admin extends Model
{
    public function retrieve_account_password($data) {
        $sql = "SELECT employee_id, account, password
        FROM `employee`
        WHERE account = :account AND password = :password";
        $sth = $this->container->db->prepare($sql);
        $sth->execute($data);
        return $sth->fetch();
    }
}