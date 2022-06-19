import React, { useState, useEffect } from "react";
import {
  Button,
  PageHeader,
  Table,
  message,
  Popconfirm,
} from "antd";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { FileExcelOutlined } from "@ant-design/icons";
import schoolAPI from "../../../apis/schoolApi";
const Index = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  const { lopID } = useParams();

  const columns = [
    {
      title: "Họ",
      width: 200,
      dataIndex: "Ho",
      fixed: "left",
    },
    {
      title: "Tên",
      width: 100,
      dataIndex: "Ten",
      fixed: "left",
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
      width: 150,
      render: (text) => (text ? "Nữ" : "Nam"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Tên cha",
      dataIndex: "TenCha",
      width: 150,
    },
    {
      title: "SĐT cha",
      dataIndex: "SDTCha",
      width: 150,
    },
    {
      title: "Tên mẹ",
      dataIndex: "TenMe",
      width: 150,
    },
    {
      title: "SĐT mẹ",
      dataIndex: "SDTMe",
      width: 150,
    },
    {
      title: "Nơi sinh",
      dataIndex: "NoiSinh",

      width: 150,
    },
    {
      title: "Dân tộc",
      dataIndex: "TenDanToc",

      width: 150,
    },
    {
      title: "Tôn giáo",
      dataIndex: "TenTonGiao",

      width: 150,
    },
    {
      title: "Khuyết tật",
      dataIndex: "TenKhuyetTat",

      width: 150,
    },
    {
      title: "Đ.Tượng C.Sách",
      dataIndex: "TenDTCS",
      width: 150,
    },
    {
      title: "Số CMND",
      dataIndex: "CMND",
      width: 150,
    },
    {
      title: "Hộ khẩu - Số nhà,tên đường",
      dataIndex: "HoKhau_DiaChi",
      width: 150,
    },
    {
      title: "Hộ khẩu - Xã",
      dataIndex: "HKXa",
      width: 150,
    },
    {
      title: "Hộ khẩu - Huyện",
      dataIndex: "HKHuyen",
      width: 150,
    },
    {
      title: "Hộ khẩu - Tỉnh",
      dataIndex: "HKTinh",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Số nhà tên đường",
      dataIndex: "DCTT_DiaChi",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Xã",
      dataIndex: "DCXa",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Huyện",
      dataIndex: "DCHuyen",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Tỉnh",
      dataIndex: "DCTinh",
      width: 150,
    },
    { title: "Tên người giám hộ", dataIndex: "TenNguoiGiamHo", width: 150 },
    { title: "SĐT người giám hộ", dataIndex: "SDTNguoiGiamHo", width: 150 },
    {
      title: "Trạng thái",
      dataIndex: "HocSinhID",
      width: 150,
      fixed: "right",
      render: (text) =>
        text ? (text === "x" ? "Từ chối" : "Đã duyệt") : "Chưa duyệt",
    },
    {
      title: "Thao tác",
      dataIndex: "ID",
      width: 150,
      fixed: "right",
      render: (text) => (
        <Popconfirm
          title="Xác nhận xóa?"
          onConfirm={() => handleDeleteStudent(text)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">XÓA</Button>
        </Popconfirm>
      ),
    },
  ];
  const getHocSinhChoDuyet = async () => {
    let result = await schoolAPI.getHocSinhChoDuyetByLopId(lopID);
    setStudents(result.Result);
  };
  useEffect(() => {
    getHocSinhChoDuyet();
    setIsLoading(false);
  }, []);
  const handleDeleteStudent = async (id) => {
    await schoolAPI.xoaHocSinhChoDuyet(id).then(async (res) => {
      if (res.StatusCode === 200) {
        message.success("Xóa thành công", 3);
        setIsLoading(true);
        await schoolAPI
          .getHocSinhChoDuyetByLopId(lopID)
          .then((res) => setStudents(res.Result));
        setIsLoading(false);
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Tạo mới học sinh vào lớp"
        extra={[
          <Button
            key="2"
            type="primary"
            onClick={() => history.push(`/nophocsinhexcel/${lopID}`)}
          >
            <FileExcelOutlined /> THÊM HOC SINH TỪ FILE EXCEL
          </Button>,
        ]}
      ></PageHeader>
      <Table
        pagination={false}
        dataSource={students}
        columns={columns}
        // scroll={{ x: 1500, y: window.screen.height - 400 }}
        loading={isLoading}
        rowKey="ID"
      />
    </>
  );
};

export default Index;
