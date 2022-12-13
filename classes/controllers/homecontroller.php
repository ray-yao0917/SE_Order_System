<?php

use \Psr\Container\ContainerInterface;
use \Slim\Views\PhpRenderer;

class homecontroller extends Controller
{

    public function register($data){
        $home = new home($this->container->db);
        $result_account = $home->post_account($data);
        $result_user = $home->post_store_buyer($data);
        $result_account_role = $home->post_account_role($data);
        if ($result_account === $result_user && $result_account === $result_account_role){
            return $result_account;
        }else{
            return $result_account;
        }
    }
    public function get($request, $response, $args){
        $home = new home($this->container->db);
        $data = $request->getQueryParams();
        $result = $home->get($data);
        $this->responseJson($response, $result);
    }


    public function get_role($request, $response, $args){
        $home = new home($this->container->db);
        $data = $request->getQueryParams();
        $result = $home->get_role($data);
        $this->responseJson($response, $result);
    }

    public function post_account($request, $response, $args){
        $home = new home($this->container->db);
        $data = $request->getParsedBody();
        $result = [
            'return'=>$this->register($data)
        ];
        $this->responseJson($response, $result);
    }
    public function patch($request, $response, $args){
        $home = new home($this->container->db);
        $data = $request->getParsedBody();
        $result = [
            'return'=>$home->patch($data)
        ];
        $result['data'] = $data;
        $this->responseJson($response, $result);
    }

    public function delete($request, $response, $args){
        $home = new home($this->container->db);
        $data = $request->getParsedBody();
        $result = [
            'return'=>$home->delete($data)
        ];
        $result['data'] = $data;
        $this->responseJson($response, $result);
    }
}