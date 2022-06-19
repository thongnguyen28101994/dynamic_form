import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import globalAPI from "../../../apis/globalApi";
const Index = () => {
  const [listExams, setListExams] = useState([]);
  //const [listSubjectByExamSelected, setListSubjectByExamSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const geData = async () => {
      const res = await globalAPI.getKyThiByNamHocId(2021);
      setListExams(res.Result);
      setIsLoading(false);
    };
    geData();
  }, []);

  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên kì thi",
      dataIndex: "TenKyThi",
      key: "TenKyThi",
    },
    {
      title: "Hạn chót đăng ký",
      dataIndex: "HanChotDangKy",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
    },
    {
      title: "Phòng Giáo dục",
      dataIndex: "TenPGD",
    },
    {
      title: "Kỳ Thi Cấp",
      dataIndex: "KyThiCap",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "NgayTao",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Thao tác",
      key: "Thaotac",
      dataIndex: "Thaotac",
      render: (text, record) => (
        <Link to={`/dangkythi/${record.KyThiID}`}>
          <Button type="secondary">Đăng ký</Button>
        </Link>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Đăng ký thi"
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={listExams}
        rowKey="KyThiID"
        loading={isLoading}
        pagination={false}
      />
    </>
  );
};
export default Index;
