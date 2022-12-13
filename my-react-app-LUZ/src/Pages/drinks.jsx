import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Button, Modal, Table, Input, Row, Col } from 'antd';

const App = () => {
  const Create = (n1, n2) => {
    setdata(old => [...old,{id:'x',name:n1,cost:n2}]);
    axios.post('http://localhost:8087/api/product/items', {
      name: n1, cost: n2
    })
      .then((res) => {
        res === "true" ? setdata(old => old[old.length-1].id = res.data.id): alert("新增失敗");
      })
      .catch((error) => console.log(error));
  }
  const Delete = (n1) => {
    setdata(data.filter(item => item.id !== n1));
    axios.delete("http://localhost:8087/api/product/items", { data: { id: n1 } })
      .then((res) => {
        res === "true" ? alert("刪除成功") : alert("刪除失敗");
      })
      .catch((error) => console.log(error));
  }
  const Update = (n1, n2, n3) => {
    const newData = [...data];
    const index = newData.findIndex(item => n1 === item.id);
    newData.splice(index, 1, {
      id:n1,name:n2,cost:n3
    });
    setdata(newData);
    axios.patch("http://localhost:8087/api/product/items", { id: n1, name: n2, cost: n3 })
      .then((res) => {
        res === "true" ? alert("修改成功") : alert("修改失敗");
      })
      .catch((error) => console.log(error));
  }
  const [data, setdata] = useState();
  const columns = [
    {
      title: 'NO',
      dataIndex: 'id',
    },
    {
      title: '產品',
      dataIndex: 'name',
    },
    {
      title: '價格',
      dataIndex: 'cost',
    },
    {
      title: '編輯',
      dataIndex: '',
      render: (_, record) => <Button type="primary" onClick={() => edit(record.id)}>edit</Button>,
    }
  ];
  const  [id, setid] = useState(0);
  const edit = (n) => {
    setIsModalOpen(true);
    setid(n);
  }
  const getinfo = () => {
    axios.get('http://localhost:8087/api/product/items')
      .then((res) => setdata(res.data))
      .catch((error) => console.log(error));
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  useEffect(() => {
    getinfo();
  }, [])
  const [name, setname] = useState();
  const [cost, setcost] = useState();
  return(<>
    <Row justify="center">
      <Col span={22}>
        <Button type="primary" onClick={() => setIsModalOpen1(true)}>新增</Button>
          <div id="drink_info">
            <Table key={data => data.id} columns={columns} dataSource={data}/>
          </div>
          <Modal title="修改資料" closable={false} open={isModalOpen} footer={[
            <Button type="primary" onClick={() => { setIsModalOpen(false); Update(id, name, cost); }}>修改</Button>,
            <Button type="primary" onClick={() => { setIsModalOpen(false); Delete(id); }}>刪除</Button>,
            <Button type="primary" onClick={() => setIsModalOpen(false)}>取消</Button>
          ]}>
            產品名稱<span><Input type="text" id="product_name" onChange={(e) => setname(e.target.value)} /></span>
            <br />
            <br />
            產品價格<span><Input type="text" id="cost" onChange={(e) => setcost(e.target.value)} /></span>
            <br />
            <br />
          </Modal>
          <Modal title="新增資料" closable={false} open={isModalOpen1} footer={[
            <Button type="primary" onClick={() => { setIsModalOpen1(false); Create(name, cost); }}>新增</Button>,
            <Button type="primary" onClick={() => setIsModalOpen1(false)}>取消</Button>
          ]}>
            產品名稱<span><Input type="text" id="product_name" onChange={(e) => setname(e.target.value)} /></span>
            <br />
            <br />
            產品價格<span><Input type="text" id="cost" onChange={(e) => setcost(e.target.value)} /></span>
            <br />
            <br />
          </Modal>
        </Col>
      </Row>
  </>);
};
export default App;