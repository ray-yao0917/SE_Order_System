import './App.css';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Header from './Component/header'
import Drinks from './Pages/drinks'
import Addtion from './Pages/addition'
import Order from './Pages/order'
import Login from './Pages/login'
import Register_buyer from './Pages/register_buyer'
import Register from './Pages/register'
import Register_store from './Pages/register_store'
import Forget_password from './Pages/forget_password'
import HomePage from './Pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element = {<HomePage />}/>
          <Route path={'/drinks'} element={<Drinks />}/>
          <Route path={'/addtion'} element={<Addtion />}/>
          <Route path={'/order'} element={<Order />}/>
        </Route>
        <Route path="/" element={<Header />}>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/register'} element={<Register />}/>
          <Route path={'/forget_password'} element={<Forget_password />}/>
        </Route>
        <Route path="/" element={<Header />}>
          <Route path={'/register_store'} element={<Register_store />}/>
          <Route path={'/register_buyer'} element={<Register_buyer />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
