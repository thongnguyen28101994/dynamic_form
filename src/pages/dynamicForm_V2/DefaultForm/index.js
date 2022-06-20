import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  message,
  Form,
  Input,
  Spin,
  Select,
  Table,
  Tooltip,
  Pagination,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FormCustom from "./formbaocao";
export default function DefaultForm() {
  const [form] = Form.useForm();
  const { Column } = Form;

  //state
  const [columns, setColumns] = useState([]);

  //effect
  useEffect(() => {
    getFormColumn();
  }, []);
  //DuLieuGia
  const getFormColumn = () => {
    const columns = [
      {
        columnID: 1,
        columnName: "Test1",
        name: "test1",
      },
      {
        columnID: 2,
        columnName: "Test2",
        name: "test2",
      },
      {
        columnID: 3,
        columnName: "Test3",
        name: "test3",
      },
      {
        columnID: 4,
        columnName: "Test4",
        name: "test4",
      },
      {
        columnID: 5,
        columnName: "Test5",
        name: "test5",
      },
    ];
    setColumns(columns);
  };

  return (
    <>
      <h1>Default Form</h1>
      <PageHeader
        className="site-page-header-responsive"
        title="Form Báo Cáo Dạng Cơ Bản"
      >
        <Form
          name="dynamic_form_nest_item"
          //onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          {columns.map(({ columnID, columnName, ...restProps }) => (
            <>
              <FormCustom
                // name={index}
                formValue={form}
                //fieldKey={index}
                columnID={columnID}
                columnName={columnName}
                {...restProps}
              />
            </>
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "5%" }}
              onClick={() => {
                //   SetSelectedRowEdit({
                //     RowID: valueCol[index].RowID,
                //   });
                message.success("Đã Lưu");
              }}
            >
              <MinusCircleOutlined /> Lưu
            </Button>
          </Form.Item>
        </Form>
      </PageHeader>
    </>
  );
}
