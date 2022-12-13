import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import {useNavigate } from 'react-router-dom';
import '../App.css';
//import sha512 from 'crypto-js/sha512'
const onFinish = (values) => {
    //values.password = sha512(values.password).words;
    axios.get('http://localhost:8087/api/account/items',{params: values})
    .then((res) => {
        if(res.data.status === "true"){
            useNavigate('/account');
        }else{
            alert("帳密錯誤");
        }
    })
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
        <Row justify="center">
            <Col span={12}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    labelCol={24}
                    wrapperCol={24}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className='center'
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        className='center'
                    >
                        <Button type="primary" htmlType="submit" className='sep'>
                            登入
                        </Button>
                        <Button type="primary" onClick={() => navigate("/register")} className='sep'>
                            註冊
                        </Button>
                        <Button type="primary" onClick={() => navigate("/forget_password")} className='sep'>
                            忘記密碼
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </>
    );
};
export default Home;