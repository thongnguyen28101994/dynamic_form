import React, { useState, useEffect } from "react";
import { PageHeader, Table } from "antd";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ThiThu = () => {
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
    (() => {
      return axios
        .get("https://apigateway.hcm.edu.vn/WAPINetCore/Misc/getThiThuThpt", {
          headers: {
            Token: sessionStorage.getItem("token"),
          },
        })
        .then(function (response) {
          setListStudents1(response.data.result);
          setIsLoading(false);
        });
    })();
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
      title: "HocSinhID",
      dataIndex: "hocSinhID",
    },
    {
      title: "Họ",
      dataIndex: "ho",
      key: "ho",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      key: "ngaySinh",
    },
    {
      title: "Lớp ID",
      dataIndex: "lopID",
      key: "lopID",
    },
    {
      title: "Tên lớp",
      dataIndex: "tenLop",
      key: "tenLop",
    },
    {
      title: "Tên Trường",
      dataIndex: "tenTruong",
      key: "tenTruong",
    },

    {
      title: "Môn",
      dataIndex: "mon",
      key: "mon",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
      key: "diem",
    },
    {
      title: "Bắt đầu",
      dataIndex: "batDau",
      key: "batDau",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "thoiGianLamBai",
      key: "thoiGianLamBai",
    },
    {
      title: "Chưa làm bài",
      dataIndex: "chuaLamBai",
      render: chuaLamBai => chuaLamBai = chuaLamBai = true ? 'X' : '',
      key: "chuaLamBai",
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Danh sách học sinh thi thử"
      >
        <Table
          columns={columnsDataTable}
          dataSource={listStudents1}
          pagination={false}
          loading={isLoading}
          rowKey="HocSinhID"
        />
      </PageHeader>
    </>
  );
};
export default ThiThu;
