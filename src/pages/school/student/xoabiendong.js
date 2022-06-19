import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, message, Modal, Input } from "antd";
import { PlusSquareOutlined, UserSwitchOutlined } from "@ant-design/icons";
import schoolAPI from "../../../apis/schoolApi";
import moment from "moment";
const XoaBienDong = ({
  CurYear,
  LopID,
  ReloadPage,
  showModal,
  setCloseModal,
}) => {
  const [biendongs, setBienDongs] = useState([]);
  const [searchbiendongs, setSearchBienDongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [selectedBienDong, setSelectedBienDong] = useState([]);
  const getBienDong = async () => {
    setLoading(true);
    const result = await schoolAPI.GetBienDong(CurYear);
    let filterResult =
      result.result && result.result.filter((x) => x.lopID === LopID);
    setBienDongs(filterResult);
    setSearchBienDongs(filterResult);
    setLoading(false);
  };
  // const getSelectedBienDong = (biendong) => {
  //   setSelectedBienDong(biendong);
  // };
  const Submit = async (id) => {
    setLoading(true);
    const res = await schoolAPI.XoaBienDong(id);
    if (res.statusCode === 200) {
      message.success("Cập nhật thành công");
      getBienDong();
      ReloadPage();
      setLoading(false);
    } else {
      message.error(res.message);
    }
  };
  const searchHocSinh = (e) => {
    var search = e.target.value;
    setLoading(true);
    setTimeout(() => {
      let data = search
        ? biendongs.filter((word) => word.hocSinhID === search)
        : biendongs;
      setSearchBienDongs(data);
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    getBienDong();
  }, [LopID]);
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Mã Học Sinh",
      dataIndex: "hocSinhID",
    },
    {
      title: "Họ",
      dataIndex: "ho",
    },
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Mã Biến động",
      dataIndex: "loaiBienDongID",
    },
    {
      title: "Biến động",
      dataIndex: "tenBienDong",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "ngayBienDong",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      render: (text) => {
        return (
          <Button danger onClick={() => Submit(text)}>
            <UserSwitchOutlined /> Xóa
          </Button>
        );
      },
    },
  ];
  return (
    <Modal
      onCancel={() => {
        ReloadPage();
        setCloseModal();
      }}
      title="Cập Nhật Học Sinh"
      visible={showModal}
      footer={null}
      width="1000px"
    >
      <PageHeader
        className="site-page-header-responsive"
        title="Danh sách biến động"
        extra={[
          <Input
            key="1"
            type="primary"
            style={{ width: 200 }}
            onChange={searchHocSinh}
            placeholder={"Tìm theo mã học sinh"}
          ></Input>,
          // <Button key="2" type="primary" onClick={Submit}>
          //   <PlusSquareOutlined /> Xóa
          // </Button>,
        ]}
      >
        <Table
          // rowSelection={{
          //   onChange: getSelectedBienDong,
          // }}
          columns={columns}
          dataSource={searchbiendongs}
          pagination={true}
          loading={loading}
          rowKey="id"
        />
      </PageHeader>
    </Modal>
  );
};

export default XoaBienDong;
