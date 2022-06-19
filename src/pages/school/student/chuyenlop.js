import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, message, Select, Form, Input } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import schoolAPI from "../../../apis/schoolApi";

const ChuyenLop = ({ studentL, CurrentYear, CurrentClass, ReloadPage }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [classes, setClasses] = useState([]);
  const getSelectedStudent = (students) => {
    setSelectedStudent(students);
  };
  const SubmitChangeClass = () => {
    form.validateFields().then(async () => {
      const data = {
        LopID: form.getFieldValue("LopID"),
        HocSinhID: selectedStudent,
      };
      setLoading(true);
      await schoolAPI.xepLopHocSinh(data).then(async (res) => {
        if (res.StatusCode === 200) {
          message.success("Thành công");
          ReloadPage();
          getListStudent();
          setLoading(false);
        } else {
          message.error(res.Message);
        }
      });
    });
  };
  const getListStudent = () => {
    studentL.sort((a, b) => a.Ten.localeCompare(b.Ten));
    setStudents(studentL);
  };
  const searchHocSinh = (e) => {
    var search = e.target.value;
    setLoading(true);
    setTimeout(() => {
      let data = search
        ? studentL.filter((word) => word.HocSinhID === search)
        : studentL;
      setStudents(data);
      setLoading(false);
    }, 500);
  };
  const getListClass = async () => {
    const data = await schoolAPI.getLopsByKhoi(CurrentYear, CurrentClass.Khoi);
    if (data.StatusCode === 200) {
      setClasses(data.Result);
    } else {
      message.error("không tải được lớp");
    }
  };
  useEffect(() => {
    getListClass();
  }, [CurrentClass]);
  useEffect(() => {
    getListStudent();
  }, [studentL]);
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
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
  ];
  return (
    <PageHeader
      className="site-page-header-responsive"
      title="Chuyển lớp"
      extra={[
        <Input
          key="1"
          type="primary"
          style={{ width: 200 }}
          onChange={searchHocSinh}
          placeholder={"Tìm theo mã học sinh"}
        ></Input>,
        <Button key="2" type="primary" onClick={SubmitChangeClass}>
          <PlusSquareOutlined /> Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="LopID"
          label=" Chọn lớp"
          rules={[
            {
              required: true,
              message: "Chưa chọn lớp",
            },
          ]}
        >
          <Select placeholder="Chọn lớp cần chuyển" allowClear>
            {classes.map((value) => (
              <Option key={value.LopID} value={value.LopID}>
                {value.TenLop}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Table
        rowSelection={{
          onChange: getSelectedStudent,
        }}
        columns={columns}
        dataSource={students}
        pagination={true}
        loading={loading}
        rowKey="HocSinhID"
      />
    </PageHeader>
  );
};

export default ChuyenLop;
