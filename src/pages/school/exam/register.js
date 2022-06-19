import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Table,
  Modal,
  Select,
  Popconfirm,
  message,
} from "antd";
import {
  PlusSquareOutlined,
  // EyeFilled,
  // SearchOutlined,
  // FileExcelOutlined,
  // UserSwitchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useParams } from "react-router-dom";
import globalAPI from "../../../apis/globalApi";
import schoolAPI from "../../../apis/schoolApi";

const { Option } = Select;
const Index = () => {
  const [lops, setLops] = useState([]);
  const [monhocs, setMonhocs] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentInModal, setStudentInModal] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedMonThi, setSelectedMonThi] = useState("");
  const [selectedLop, setSelectedLop] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenInsertStudentModal, setOpenInsertStudentModal] = useState(false);
  const { kyThiID } = useParams();
  useEffect(() => {
    const geData = async () => {
      await globalAPI.getMonThiByKyThiId(kyThiID).then(function (res) {
        setMonhocs(res.Result);
      });
      await schoolAPI.getClass(2021).then(function (res) {
        setLops(res.Result);
      });
      setIsLoading(false);
    };
    geData();
  }, []);
  const onChangeMonHoc = async (ID) => {
    setIsLoading(true);
    await globalAPI
      .getThiSinhDuThiByKyThiIdAndMonThiId(kyThiID, ID)
      .then(function (res) {
        setStudents(res.Result);
      });
    setSelectedMonThi(ID);
    setIsLoading(false);
  };
  const onChangeLop = async (lopID) => {
    setIsLoading(true);
    setSelectedLop(lopID);
    await globalAPI.getDotDiemByYear(2021).then(async function (res) {
      await schoolAPI
        .getHsByLopID(lopID, res.Result[res.Result.length - 1].DotDiemID)
        .then(function (res) {
          setStudentInModal(res.Result);
          setIsLoading(false);
        });
    });
  };

  const onSelectStudent = (student) => {
    setSelectedStudents(student);
  };
  const closeModal = () => {
    setSelectedLop(null);
    setStudentInModal(null);
    setSelectedStudents(null);
    setOpenInsertStudentModal(false);
  };
  const dangKyHocSinhVaoKyThi = async () => {
    let data = {
      KyThiID: kyThiID,
      MonThiID: selectedMonThi,
      HocSinhID: selectedStudents,
    };
    await globalAPI.postDangKyThiSinhKyThi(data).then(function (res) {
      if (res.StatusCode === 400) message.error(res.Message);
      else {
        onChangeMonHoc(selectedMonThi);
        message.success(res.Message);
        closeModal();
      }
    });
  };
  const XoaHsTrongKyThi = async (record) => {
    let data = {
      KyThiID: record.KythiID,
      MonThiID: record.MonThiID,
      HocSinhID: record.HocSinhID,
    };
    await globalAPI.postHuyDangKyThiSinhKyThi(data).then(function (res) {
      if (res.StatusCode === 400) message.error(res.Message);
      else {
        onChangeMonHoc(selectedMonThi);
        message.success(res.Message);
      }
    });
  };
  //columns
  const commonColumns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
  ];
  const mainColumns = [
    ...commonColumns,
    {
      title: "Mã Học Sinh",
      dataIndex: "HocSinhID",
      key: "HocSinhID",
    },
    {
      title: "SBD",
      key: "SBD",
    },
    {
      title: "Họ",
      dataIndex: "Ho",
      key: "Ho",
    },
    {
      title: "Tên",
      dataIndex: "Ten",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "NgaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Môn Thi",
      dataIndex: "TenMonThi",
    },
    {
      title: "Hội Đồng",
      dataIndex: "TenHoiDong",
    },
    {
      title: "PGDID",
      dataIndex: "PGDID",
    },
    {
      title: "Thao tác",
      dataIndex: "ID",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Popconfirm
          title="Xác nhận xóa?"
          onConfirm={() => XoaHsTrongKyThi(record)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="danger">XÓA</Button>
        </Popconfirm>
      ),
    },
  ];
  const modal1Columns = [
    ...commonColumns,
    {
      title: "Mã Học Sinh",
      dataIndex: "HocSinhID",
      key: "HocSinhID",
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
      title: "Ngày Sinh",
      dataIndex: "NgaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
  ];
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Đăng ký thi"
        extra={[
          <Select
            key="1"
            placeholder="Chọn Môn"
            style={{ width: 200 }}
            onChange={onChangeMonHoc}
          >
            {monhocs.map((value) => (
              <Option key={value.MonThiID} value={value.MonThiID}>
                {value.TenMonThi}
              </Option>
            ))}
          </Select>,
          <Button
            key="2"
            type="primary"
            onClick={() => {
              if (selectedMonThi === "") {
                message.error("Chưa Chọn Môn Thi");
              } else setOpenInsertStudentModal(true);
            }}
          >
            <PlusSquareOutlined /> Thêm Học Sinh
          </Button>,
        ]}
      ></PageHeader>
      <Table
        columns={mainColumns}
        dataSource={students}
        rowKey="KyThiID"
        loading={isLoading}
        pagination={false}
      />
      <Modal
        visible={isOpenInsertStudentModal}
        title={`Chọn học sinh tham gia kỳ thi `}
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          closeModal();
        }}
        width="1000px"
        footer={[
          <Button
            key="1"
            type="secondary"
            onClick={() => dangKyHocSinhVaoKyThi()}
          >
            Đăng Ký
          </Button>,
          <Button key="back" onClick={() => closeModal()}>
            Đóng
          </Button>,
        ]}
      >
        <PageHeader
          className="site-page-header-responsive"
          extra={[
            <Select
              key="1"
              placeholder="Chọn Lớp"
              style={{ width: 200 }}
              onChange={(value) => onChangeLop(value)}
              value={selectedLop}
            >
              {lops.map((value) => (
                <Option key={value.LopID} value={value.LopID}>
                  {value.TenLop}
                </Option>
              ))}
            </Select>,
          ]}
        ></PageHeader>
        <Table
          columns={modal1Columns}
          rowSelection={{ selectedStudents, onChange: onSelectStudent }}
          dataSource={studentInModal}
          pagination={false}
          loading={isLoading}
          rowKey="HocSinhID"
        />
      </Modal>
    </>
  );
};

export default Index;
