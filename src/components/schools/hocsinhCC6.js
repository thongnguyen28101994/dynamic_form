import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import adminAPI from "../../apis/adminApi";
import moment from "moment";
import schoolApi from "../../apis/schoolApi";

const HocsinhCC6 = (props) => {
  const { lopId } = props;
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("session"))
  );
  const [isloading, setIsloading] = useState(false);
  const column = [
    {
      title: "HocSinhID",
      dataIndex: "hocSinhID",
      render: (text) => text,
    },
    {
      title: "Họ",
      dataIndex: "ho",
      render: (text) => text,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      render: (text) => text,
    },
    {
      title: "Năm sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Lớp",
      dataIndex: "tenLop",
      render: (text) => text,
    },
    {
      title: "Thao tác",
      dataIndex: "hocSinhID",
      render: (text) => {
        if (lopId) {
          return <Button onClick={() => handleAssignClass(text)}>Chọn</Button>;
        }
        return null;
      },
    },
  ];
  const handleAssignClass = async (value) => {
    await schoolApi
      .xepLopHocSinh({
        LopID: lopId,
        HocSinhID: [value],
      })
      .then((res) => {
        if (res.statusCode === 200) {
          message.success("Thành công");
        }
      });
  };
  const initData = async () => {
    setIsloading(true);
    const studentRes = await adminAPI.getHocSinh({
      schoolID: user.schoolID,
      namHocID: 2021,
      khoi: 6,
    });
    setStudents(studentRes.result);
    setIsloading(false);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div>
      <Table
        loading={isloading}
        rowKey="hocSinhID"
        columns={column}
        dataSource={students}
      />
    </div>
  );
};

export default HocsinhCC6;