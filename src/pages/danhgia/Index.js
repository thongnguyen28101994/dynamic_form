import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Form, message } from "antd";
import defaultColumn from "../danhgia/ColumnConfig";
import Data from "../danhgia/Data";
import "../danhgia/Table.css";
import { PlusSquareOutlined } from "@ant-design/icons";
const EditableContext = React.createContext(null);
const DanhGia = () => {
  const [dataSource, setdataSource] = useState([]);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;
    if (typeof record !== "undefined") {
      if (!isNaN(record.STT) && record.STT.toString().indexOf(".") === -1) {
        childNode = (
          <div
            //className="editable-cell-value-wrap"
            style={{
              fontWeight: "bold",
            }}
          >
            {children}
          </div>
        );
      } else {
        if (editable) {
          childNode = editing ? (
            <Form.Item
              style={{
                margin: 0,
              }}
              name={dataIndex}
              rules={[
                {
                  required: true,
                  message: ` Y??u c???u nh???p m???c n??y .`,
                },
              ]}
            >
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
          ) : (
            <div
              className="editable-cell-value-wrap"
              style={{
                paddingRight: 24,
              }}
              onClick={toggleEdit}
            >
              {children}
            </div>
          );
        }
      }
    }
    return <td {...restProps}>{childNode}</td>;
  };
  useEffect(() => {
    //khoi tao datasource
    setdataSource(Data);
  }, []);
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.STT === item.STT);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setdataSource(newData);
  };
  const columns = defaultColumn.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div>
      <h2 id="h2-tieude">B???ng ??i???m ????nh gi?? c??ng ngh??? th??ng tin</h2>

      <Table
        components={{
          body: {
            cell: EditableCell,
            row: EditableRow,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) =>
          !isNaN(record.STT) && record.STT.toString().indexOf(".") === -1
            ? "row-bold"
            : "editable-row"
        }
        pagination={false}
      />
      <p style={{ textAlign: "center" }}>
        <Button
          key="1"
          type="primary"
          // style={{float:'right'}}
          onClick={() => {
            console.log(dataSource);
            message.success("C???p nh???t th??nh c??ng");
          }}
        >
          <PlusSquareOutlined /> L??U
        </Button>
      </p>
    </div>
  );
};
export default DanhGia;
