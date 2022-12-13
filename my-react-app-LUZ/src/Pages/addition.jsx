import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Button, Modal, Table, List, Select, Row, Col } from 'antd';
const Home = () => {
    const { Option } = Select;
    const [id, setid] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customlization_id, setcustomlization_id] = useState(0);
    const [customlization_list, setcustomlization_list] = useState();
    const [customlization_Options, setcustomlization_Options] = useState();
    const handleChange = (value) => {
        setid(value);
        getinfo();
    };
    const edit = (n) => {
        setcustomlization_id(n);
        switch (customlization_id) {
            case "suger":
                setcustomlization_Options([
                    {key:1,label:"diabetes",value:1}, 
                    {key:2,label:"2/3 Suger",value:2}, 
                    {key:3,label:"1/2 Suger",value:3}, 
                    {key:4,label:"1/3 Suger",value:4}, 
                    {key:5,label:"No Suger",value:5}]);
                break;
            case "ice":
                setcustomlization_Options([
                    {key:1,label:"Ice Age",value:1}, 
                    {key:2,label:"2/3 Ice",value:2}, 
                    {key:3,label:"1/2 Ice",value:3}, 
                    {key:4,label:"1/3 Ice",value:4}, 
                    {key:5,label:"No Ice",value:5}]);
                break;
            case "feed":
                setcustomlization_Options();
                break;
        }
        setIsModalOpen(true);
    }
    const suger_set = (i, n) => {
        axios.patch("http://localhost:8087/api/revise.php", { id: i, suger: n })
            .then((res) => {
                res === "true" ? alert("設定成功") : alert("設定失敗");
             })
            .catch((error) => console.log(error));
        setcustomlization_list([]);
    }
    const ice_set = (i, n) => {
        axios.patch("http://localhost:8087/api/revise.php", { id: i, ice: n })
            .then((res) => {
                res === "true" ? alert("設定成功") : alert("設定失敗");
            })
            .catch((error) => console.log(error));
        setcustomlization_list([]);
    }
    const addition_set = (i, n) => {
        const newData = [...info_lists];
        newData.splice(2, 1, {
            feed:{}
        });
        //setdata(newData);
        axios.patch("http://localhost:8087/api/revise.php", { id: i, feed: n })
            .then((res) => {
                res === "true" ? alert("設定成功") : alert("設定失敗");
            })
            .catch((error) => console.log(error));
        setcustomlization_list([]);
    }
    const [info_lists,setinfo_lists] = useState();
    const columns = [
        {
            title: '項目',
            dataIndex: 'name',
        },
        {
            title: '選項',
            dataIndex: 'info',
        },
        {
            title: '編輯',
            dataIndex: '',
            render: (_, record) => <Button type="primary" onClick={() => edit(record.name)}>edit</Button>,
        },
    ];
    const getinfo = () => {
        axios.get('http://localhost:8087/api/customlization/items',/*{params: {
            id: n,
        }}*/)
        .then((res) => { 
            let lists = [];
            let customlization_name =Object.keys(res.data);
            lists.push({"name":customlization_name[0],"info":<List
                dataSource={res.data.suger}
                renderItem={(item) => <List.Item value={item.id} >{item.sweet}</List.Item>}
            />});
            lists.push({"name":customlization_name[1],"info":<List
                dataSource={res.data.ice}
                renderItem={(item) => <List.Item value={item.id} >{item.ice}</List.Item>}
            />});
            lists.push({"name":customlization_name[2],"info":<List
                dataSource={res.data.feed}
                renderItem={(item) => <List.Item value={item.id} >{item.feed}</List.Item>}
            />});
            setinfo_lists(lists);
        })
        .catch( (error) => console.log(error));
    }
    var drink_list = [<Option value="0" key={"drinkAll"}>all</Option>,];
    const Getinfo1 = () => {
        axios.get('http://localhost:8087/api/product/items')
        .then((res) => {
            res.data.forEach(info => {
                drink_list.push(<Option value={info.id} key={"drink" + info.id}>{info.name}</Option>);
            });
            return(
                <>
                    <Select
                        defaultValue="all"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                    >
                        {drink_list}
                    </Select>
                </>
            );
        })
        .catch( (error) => console.log(error));
    }
    const [selectionType, setSelectionType] = useState('checkbox');
    const rowSelection = {
        onChange: (selectedRows) => {
            console.log(selectedRows);
            setcustomlization_list(selectedRows);
        },
        getCheckboxProps: (record) => ({
          name: record.name,
        }),
      };
    useEffect(() => {
        getinfo(id);
    })
    const columns2 = [
        {
            title: '選項',
            dataIndex: 'label',
            value:'value',
        },
    ];
    return (
        <>
            <Row justify="center">
                <Col span={22}>
                    <Getinfo1/>
                    <Table columns={columns} dataSource={info_lists} pagination={false} />
                    <Modal title="新增資料" closable={false} open={isModalOpen} footer={[
                        <Button type="primary" onClick={() => {
                            setIsModalOpen(false);
                            switch (customlization_id) {
                                case "suger":
                                    suger_set(id, customlization_list);
                                    break;
                                case "ice":
                                    ice_set(id, customlization_list);
                                    break;
                                case "feed":
                                    addition_set(id, customlization_list);
                                    break;
                            };
                        }}>修改</Button>,
                        <Button type="primary" onClick={() => setIsModalOpen(false)}>取消</Button>
                    ]}>
                        <Table
                            rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                            }}
                            columns={columns2}
                            dataSource={customlization_Options} 
                            pagination={false}
                        />
                    </Modal>
                </Col>
            </Row>
        </>)
}
export default Home;