import React, { useState, useEffect } from "react";
import { Table, Checkbox, PageHeader, Select, Button, message } from "antd";
import globalApi from "../../../apis/globalApi";
import moment from "moment";
import { GoldFilled } from "@ant-design/icons";
import globalAPI from "../../../apis/globalApi";
import adminApi from "../../../apis/adminApi";
import adminAPI from "../../../apis/adminApi";
const { Option } = Select;
const DuyetHocSinh = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState();
  const [students, setStudents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const getData = async () => {
    await globalAPI.getDonVi().then((s) => setSchools(s.Result));
  };

  const handleChangeSchool = async (schoolId) => {
    setSelectedSchoolId(schoolId);
    await adminAPI
      .getStudentUpdate(schoolId)
      .then((s) => setStudents(s.Result));
  };
  // const handleChangeStatus = async (status) => {
  //   setSelectedStatus(status);
  //   await adminAPI
  //     .getStudentUpdate(selectedSchoolId, status)
  //     .then((s) => setStudents(s.Result));
  // };
  const handleAcceptStudentUpdate = async (hocSinhID, status, reason) => {
    const data = {
      HocSinhUpdateLogID: hocSinhID,
      isApproved: status,
      LyDo: reason,
    };
    const res = await adminAPI.acceptStudenUpdate(data);
    if (res.StatusCode === 200) {
      message.success("Thành công!", 3);
      getData();
    } else {
      message.error(res.Message);
    }
  };
  const columns = [
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
      title: "Dữ liệu",
      dataIndex: "Name",
    },
    {
      title: "Giá trị cũ",
      dataIndex: "OldValue",
    },
    {
      title: "Giá trị mới",
      dataIndex: "NewValue",
    },
    {
      title: "Trạng thái",
      dataIndex: "ApprovedBy",
      width: 150,
      fixed: "right",
      render: (text) =>
        text !== null ? (text ? "Đã duyệt" : "Từ chối") : "Chưa duyệt",
    },
    {
      title: "Thao tác",
      fixed: "right",
      dataIndex: "Id",
      render: (text) => (
        <Button
          onClick={() => handleAcceptStudentUpdate(text, true, "Ok")}
          type="secondary"
        >
          Duyệt
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Danh sách duyệt cập nhật học sinh"
        extra={[
          <Select
            key="3"
            placeholder="Chọn Trường"
            style={{ width: 300 }}
            allowClear
            clearIcon
            showSearch
            onChange={(e) => handleChangeSchool(e)}
            optionFilterProp="children"
          >
            {schools.map((s) => (
              <Option key={s.SchoolID} value={s.SchoolID}>
                {s.TenTruong}
              </Option>
            ))}
          </Select>,
          // <Select
          //   key="4"
          //   placeholder="Trang thái"
          //   style={{ width: 200 }}
          //   onChange={(e) => handleChangeStatus(e)}
          //   defaultValue={false}
          // >
          //   <Option key="1" value={false}>
          //     Chưa duyệt
          //   </Option>
          //   <Option key="2" value={true}>
          //     Đã duyệt
          //   </Option>
          // </Select>,
        ]}
      ></PageHeader>
      <Table columns={columns} dataSource={students} rowKey="Id"></Table>
    </>
  );
};

export default DuyetHocSinh;
