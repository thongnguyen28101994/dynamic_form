import React, { useState, useEffect } from "react";
import schoolAPI from "../../../apis/schoolApi";
import { Button, Modal, Form, Input, Select, Checkbox, message, Table } from "antd";
import globalAPI from "../../../apis/globalApi";
const { Option } = Select;
const ModalDanhSachBienDong = ({
  title,
  isShowModal,
  ShowModalF
}) => {
  const [form] = Form.useForm();
  const [dsbiendong,setDsBienDong]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [selectedBienDongID,setSelectedBienDongID]=useState([]);
  //function
  const xoaBienDong = async (ID) => {
    await globalAPI.postXoaBienDong(ID).then(res=>{
      if(res.Message==='Success')
      {
        getDanhSachBienDong(12);
      }
    })
  };
  const getDanhSachBienDong = async (DotDiemID) => {
    const data=await globalAPI.getDSBienDong(DotDiemID);
    setDsBienDong(data.Result);
    setIsLoading(false);
  }
  const GetChangedSelectBienDongID = (ID) => {
    console.log(ID);
  }
  useEffect(()=>{
    if(isShowModal)
    {
      getDanhSachBienDong(12);
    }
  },[isShowModal])

 
   const columns = [
    {
      title: "ID",
      dataIndex:"ID",
      key: "ID"
    },
    {
      title: "HocSinhID",
      dataIndex: "HocSinhID",
      key: "HocSinhID"
    },
    {
      title: "Họ",
      dataIndex: "Ho"
    },
    {
      title: "Tên",
      dataIndex: "Ten"
    },
    {
      title: "Đợt Điểm",
      dataIndex: "DotDiemID"
    },
    {
      title: "Khối",
      dataIndex: "Khoi"
    },
    {
      title: "Lớp",
      dataIndex: "TenLop"
    },
    {
      title: "Biến Động",
      dataIndex: "TenLoai"
    }
   ]
  return (
    <>
      <Modal
        visible={isShowModal}
        title={title}
        maskClosable={false}
        width='800px'
        onCancel={() => {
          setDsBienDong([]);
          setIsLoading(true);
          ShowModalF(false);
        }}
        footer={[
       
        ]}
      >
    <Table
        rowSelection={{
          selectedBienDongID,
          onChange:GetChangedSelectBienDongID
        }}
        columns={columns}
        dataSource={dsbiendong}
        rowKey="ID"
        loading={isLoading}
        pagination={false}
      />
      </Modal>
    </>
  );
};

export default ModalDanhSachBienDong;
