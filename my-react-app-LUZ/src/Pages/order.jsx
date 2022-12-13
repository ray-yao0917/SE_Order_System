import React from 'react';
import axios from 'axios';
import { Table } from 'antd';
const Home = () => {
  axios.get('http://localhost:8087/get.php')
    .then((res) => {
      let columns1 = [
        {
          title: '產品名稱',
          dataIndex: 'name',
        },
        {
          title: '冰塊',
          dataIndex: 'ice',
        },
        {
          title: '甜度',
          dataIndex: 'sweet',
        },
        {
          title: '加料',
          dataIndex: 'feed',
        },
      ];
      let columns = [
        {
          title: 'NO',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '價格',
          dataIndex: 'total',
          key: 'total'
        },
        {
          title: '交易時間',
          dataIndex: 'date',
          key: 'date'
        }
      ];
      res.data.forEach((info, index) => {
        info.key = index.toString();
      })
      return (
        <>
          <Table
            rowKey={res.data.id}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Table columns={columns1} dataSource={record.product} pagination={false} />
              ),
            }}
            dataSource={res.data}
          />
        </>
      );
    })
    .catch((error) => console.log(error));
}
export default Home;