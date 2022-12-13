<?php
use \Psr\Container\ContainerInterface;

class home extends Model
{
    public function get($data){
        $product_sql = "SELECT * FROM public.products 
            ORDER BY id ASC";

        $_get = $this->db->prepare($product_sql);
        $_get->execute();
        
        return $_get->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_role($data){
        $role_sql = "SELECT role_id, role_name
                    FROM public.role
                    ORDER BY role_id ASC";

        $_get = $this->db->prepare($role_sql);
        $_get->execute();        
        return $_get->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function post_account($data){
        $sql_account = "SELECT account
            FROM public.account
            WHERE account = $data[account]
        ";
        $temp = $this->db->prepare($sql_account);
        $temp->execute();
        if ($temp === null) {
            $sql = "INSERT INTO public.account(account, password)
                VALUES ($data[account], $data[password])
            ";

            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            return ['status'=> 1];
        }
        
        return ['status'=> 409];
    }

    public function post_store_buyer($data){
        $sql_account = "SELECT account
            FROM public.account
            WHERE account = $data[account]
        ";
        $temp = $this->db->prepare($sql_account);
        $temp->execute();
        if ($temp === null) {
            if ($data['role_id'] == 1) {
                $sql_store = "INSERT INTO public.store
                    (store_name, address)
                    VALUES ($data[store_name], $data[address])";
            
                $store_stmt = $this->db->prepare($sql_store);
                $store_stmt->excute();
                return "true";
            }else{
                $sql_buyer = "INSERT INTO public.buyer
                    (name, phone)
                    VALUES (name, phone)";
                
                $buyer_stmt = $this->db->prepare($sql_buyer);
                $buyer_stmt->excute();
                return "true";

            }
        }
    }
    public function post_account_role($data){
        $sql_account = "SELECT account
            FROM public.account
            WHERE account = $data[account]
        ";
        $temp = $this->db->prepare($sql_account);
        $temp->execute();
        if ($temp === null) {
            if ($data['role_id'] === 1) {
                $sql_user = "SELECT store_id
                    FROM public.store
                    WHERE store_name == $data[store_name] AND address == $data[address]
                ";

                $user_id = $this->db->prepare($sql_user);
                $user_id->excute();
            } else {
                $sql_user = "SELECT buyer_id
                    FROM public.buyer
                    WHERE name == $data[name] AND phone == $data[phone]
                ";
                
                $user_id = $this->db->prepare($sql_user);
                $user_id->excute();
            }
            
            $sql_account_role = "INSERT INTO public.account_role
                (role_id, 'store_id/buyer_id')
                VALUES ($data[role_id], $user_id)
            ";

            $account_role_stmt = $this->db->prepare($sql_account_role);
            $account_role_stmt->excute();
            return "true";


        }
    }

    public function patch($data){
        $sql = "SELECT 'patch'
        ";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function delete($data){
        $sql = "SELECT 'delete'
        ";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}