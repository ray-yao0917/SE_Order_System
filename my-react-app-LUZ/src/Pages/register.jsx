import React from 'react';
import {Button, Col, Row} from 'antd';
import {useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    return (
        <Row justify="center">
            <Col span={12}>
                <div className='center'>
                <Button type="primary" onClick={() => { navigate('/register_buyer')}} className='sep'>
                    買家
                </Button>
                <Button type="primary" onClick={() => { navigate('/register_store')}} className='sep'>
                    店家
                </Button>
                </div>
            </Col>
        </Row> 
    );
};
export default Home;