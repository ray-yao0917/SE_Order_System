import { AppstoreOutlined,} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
const { Header, Content, Footer } = Layout;

const items = [
  {
    label: (
      <a href="/" rel="noopener noreferrer">
        首頁
      </a>
    ),
    key: 'Home',
  },
  {
    label: '瀏覽',
    key: 'surf',
  },
  {
    label: '店家',
    key: 'SubMenu',
    children: [
        {
          label: (
            <a href="/drinks" rel="noopener noreferrer">
              Drinks
            </a>
          ),
          key: 'setting:1',
          icon: <AppstoreOutlined />,
        },
        {
            label: (
                <a href="/Addtion" rel="noopener noreferrer">
                  Addtion
                </a>
              ),
          key: 'setting:2',
          icon: <AppstoreOutlined />,
        },
        {
            label: (
                <a href="/order" rel="noopener noreferrer">
                  Order
                </a>
              ),
          key: 'setting:3',
          icon: <AppstoreOutlined />,
        },
    ],
  },
  {
    label: (
      <a href="/login" rel="noopener noreferrer">
        登入
      </a>
    ),
    key: 'login',
  },
];
export default () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 2,
            width: '100%',
            backgroundColor:'black'
          }}
        >
          <div className="center" />
          <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={items} 
          theme="dark"
          triggerSubMenuAction="hover"
          />
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: '0 50px',
            marginTop: 96,
          }}
        >
      <Outlet />
    </Content>
  </Layout>;
};