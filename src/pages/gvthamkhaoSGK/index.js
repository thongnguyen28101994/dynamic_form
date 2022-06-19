import React, { useState, useEffect } from "react";
import { PageHeader, Table } from "antd";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { axiosClientKhaosat7 } from "../../apis/axiosClient";

const ThamKhaoSGK = () => {
  const [listStudents1, setListStudents1] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  //modal se hien de dang ki bien dong loai nào
  //1. display chuyển đi ngoài tỉnh
  //2. display chuyển đi trong thành phố
  //3. display thôi học

  let history = useHistory();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axiosClientKhaosat7.get(
      "https://apigateway.hcm.edu.vn/WAPINetCore/Misc/getSGKPreView"
    );
    setListStudents1(res.result);
    setIsLoading(false);
  };
  //tiep nhan hoc sinh dau cap
  //datatable thêm hs bằng mã hs
  const columnsDataTable = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Giáo Viên ID",
      dataIndex: "giaoVienID",
      key: "GiaoVienID",
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoTen",
      key: "HoTen",
    },
    {
      title: "Năm Sinh",
      dataIndex: "namSinh",
      key: "NamSinh",
    },
    {
      title: "Tên Môn",
      dataIndex: "tenMon",
      key: "TenMon",
    },
    {
      title: "Hoàn Thành",
      dataIndex: "passed",
      render: (passed) => (passed === true ? "Hoàn thành" : ""),
      key: "passed",
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Danh sách Giáo viên tham khảo Sách giáo khoa"
      >
        <Table
          columns={columnsDataTable}
          dataSource={listStudents1}
          pagination={false}
          loading={isLoading}
          rowKey="giaoVienID"
        />
      </PageHeader>
    </>
  );
};
export default ThamKhaoSGK;
