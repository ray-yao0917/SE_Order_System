<?php
use \Psr\Container\ContainerInterface;

class admincontroller extends Controller
{   
    public function login($request, $response, $args) {

        $data = $request->getParsedBody();

        $admin = new Admin($this->container);
        $user = $admin->retrieve_account_password($data);

        if ($user) {
            Session::set('user_id', $user['user_id']);
            $result = [
                "status" => "success",
                "message" => "登入成功"
            ];
        } else {
            $result = [
                "status" => "failed",
                "message" => "登入失敗"
            ];
        }

        return $this->responseJson($response, $result);

    }

}