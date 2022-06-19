import React, {useEffect, useState} from 'react';
import PGDDropdown from '../classes/PGDDropdown';
import {
   Form,
   Popconfirm,
   Input,
   Table
  } from "antd";
// object cell edit
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
})=> {
    const inputNode =  <Input />
    
    // if(inputType==='text')
    //     inputNode =  <Input />
    // else
    //     if(inputType==='Select') 
    //     inputNode =  <PGDDropdown />
    return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
};
const EditableTable = ({datas}) => {
    console.log(datas);
    const [form] = Form.useForm();
    const [data, setData] = useState(datas);
    const [editingKey, setEditingKey] = useState('');
  
    const isEditing = (record) => record.key === editingKey;
  
    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
      });
      setEditingKey(record.key);
    };
  
    const cancel = () => {
      setEditingKey('');
    };
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
   useEffect(()=>{
        setData(datas)
   },[datas])
    const columns = [
        {
            title: "STT",
            key: "STT",
            render: (text, record, index) => index + 1,
          },
          {
            title: "Lớp Id",
            dataIndex: "LopID",
            key: "LopID",
          },
          {
            title: "Tên Lớp",
            dataIndex: "TenLop",
            editable:true
            //render: text =>{text},
          },
        //   {
        //     title: "Khối",
        //     dataIndex: "Khoi",
        //     editable:true
        //   },
        //   {
        //     title: "Phòng Giáo dục",
        //     dataIndex: "TenPGD",
        //     editable:true
        //   },
          {
            title: "Lớp 2 Buổi",
            dataIndex: "LopHoc2Buoi",
            key: "LopHoc2Buoi",
            render: (text) => (text === true ? "Có" : "Không"),
          },
      {
        title: 'Thao tác',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </a>
          );
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      let inputType="text";
       if(col.dataIndex==='TenPGD')  inputType = 'Select'

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination ={false}
        />
      </Form>
    );
  };

  export default EditableTable