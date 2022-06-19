import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, Space, Form,Modal, Select, Input, DatePicker } from "antd";
import { PlusSquareOutlined, EyeFilled } from "@ant-design/icons";
import moment from "moment";
import schoolApi from "../../../apis/schoolApi";
import { useParams, useHistory } from "react-router-dom";
import globalAPI from "../../../apis/globalApi";

const { Option } = Select;

const SearchStudent = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isShowingCreateClass,setIsShowingCreateClass]=useState(false)
    const [listStudents,setListStudents] = useState([])
  useEffect(() => {

    setIsLoading(false);
  }, []);
  const onSearchStudent = () => {
      form.validateFields().then( async () => {
        let NgaySinh = form.getFieldValue("NgaySinh").format();
        let respone = {
          ...form.getFieldValue(),
          NgaySinh: NgaySinh,
        };
        await schoolApi.searchHocSinh(respone)
        .then((res) => { setListStudents(res.Result) })
        
      })
  }
  const columnsStudents = [
    {
      title: "HocSinhID",
      dataIndex: "HocSinhID",
    },
    {
      title: "Họ",
      dataIndex: "Ho",
    },
    {
      title: "Tên",
      dataIndex: "Ten",
    },
    {
      title: "Tên cha",
      dataIndex: "TenCha",
    },
    {
      title: "Tên mẹ",
      dataIndex: "TenMe",
    },
    {
      title: "Thao tác",
      key: "tags",
      dataIndex: "tags",
      fixed: "right",
      width: 70,
      render: () => (
        <Space size="middle">
          <Button type="secondary" >
            <EyeFilled /> Xem Biến Động
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        //onBack={() => history.goBack()}
        title="Tìm kiếm Học Sinh"
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
        >
          <Form.Item
            name="Ho"
            rules={[{ required: true}]}
          >
              <Input />
          </Form.Item>
          <Form.Item
            name="Ten"
            rules={[{ required: true}]}
          >
              <Input />
          </Form.Item>
          <Form.Item
            name="NgaySinh"
            rules={[{ required: true}]}
          >
              <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item>
            <Button onClick={onSearchStudent}>Tìm Kiếm</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columnsStudents}
          dataSource={listStudents}
          pagination={false}
          loading={isLoading}
          rowKey="HocSinhID"
        />
      </PageHeader>
      <Modal
        visible={isShowingCreateClass}
        title={`Danh sách học sinh năm học ${
          moment().year() - 1
        }-${moment().year()}`}
       // onOk={() => setIsShowingCreateClass(false)}
       // onCancel={() => setIsShowingCreateClass(false)}
        width="1024px"
        footer={[
          <Button
            key="back"
            onClick={() => {
             // setIsShowingCreateClass(false);
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            //onClick={() => xepLopHs()}
          >
            Chọn
          </Button>,
        ]}
      >
        <Table
        //  rowSelection={{ selectedStudentsXepLop, onChange: onSelectChange }}
         // columns={columnsHsLenLop}
         // dataSource={listStudentsLenLop}
          pagination={false}
          rowKey="HocSinhID"
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default SearchStudent;
