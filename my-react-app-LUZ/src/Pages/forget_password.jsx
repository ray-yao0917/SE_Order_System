import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import {useNavigate } from 'react-router-dom';
const onFinish = (values) => {
    axios.get('',{params: values})
    .then((res) => {
        if(res.data.staut === "true"){
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
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" onClick={() => navigate("/register")}>
                            登入
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </>
    );
};
export default Home;