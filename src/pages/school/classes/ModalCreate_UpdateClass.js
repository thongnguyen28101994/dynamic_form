import React, { useState, useEffect } from "react";
import schoolAPI from "../../../apis/schoolApi";
import { Button, Modal, Form, Input, Select, Checkbox, message,Tooltip } from "antd";
import PGDDropdown from "./PGDDropdown";
const { Option } = Select;
const ModalCreateUpdateClass = ({
  title,
  PGDs,
  dataUpdate,
  isShowModal,
  ShowModalF,
  ReloadClassF,
}) => {
  const [PGDSelect, setPGDSelects] = useState(PGDs);
  const [PGDID,setPGDID]=useState(null);
  const [form] = Form.useForm();
  
  //function
  const insertClass = () => {
    try {
      form.validateFields().then(async () => {
        if(dataUpdate!==null)
        {
          let result= [{
            ...form.getFieldsValue(),LopID:dataUpdate.LopID
          }]
            await schoolAPI.postUpdateLop(result).then((res) => {
            if (res.StatusCode === 200) {
              message.success("Thành công");
              form.resetFields();
              ShowModalF(false);
            } else {
              message.error("Lỗi: " + res.Message);
            }
          });
        }
        else
        {
           await schoolAPI.insertClass([form.getFieldValue()]).then((res) => {
            if (res.StatusCode === 200) {
              message.success("Thành công");
              form.resetFields();
              ShowModalF(false);
            } else {
              message.error("Lỗi: " + res.Message);
            }
          });
        }
         ReloadClassF();
      });
    } catch (error) {
      console.log("Loi:", error);
    }
  };
  useEffect(()=>{
    setPGDSelects(PGDs);
  },[PGDs])
  useEffect(()=>{
    if(dataUpdate!=null)
    {
      changeKhoi(dataUpdate.Khoi);
      setPGDID(dataUpdate.PGDID);
      form.setFieldsValue(dataUpdate);
    }
    else
    {
      setPGDID(null);
      form.resetFields();
    }
  },[isShowModal])
  const changeKhoi = (khoi) => {
    let result = [...PGDs];
      form.setFieldsValue({ PGDID: null });
      if (khoi < 10) {
        setPGDSelects(result.splice(1));
      } else {
        setPGDSelects([result[0]]);
      }
  };
  const selectedIDF = (ID) => {
    setPGDID(ID);
    form.setFieldsValue({
      ...form.getFieldValue(),
      PGDID: ID,
    });
    return ID;
  };
  
  return (
    <>
      <Modal
        visible={isShowModal}
        title={title}
        onCancel={() => {
          ShowModalF(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              ShowModalF(false);
            }}
          >
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={insertClass}>
            Cập Nhật
          </Button>,
        ]}
      >
        <Form
          {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}
          form={form}
          initialValues={{ LopHoc2Buoi: false,ClientLopID: 0  }}
          name="control-hooks"
        >
            <Tooltip
                      placement="top"
                      title={
                        <span>
                          Mã phần mềm quản lí nhà
                          trường(VietSchool,SMAS,QuanIch)
                        </span>
                      }
                    >
                      <Form.Item name="ClientLopID" label="ClientLopID">
                        <Input />
                      </Form.Item>
                    </Tooltip>
          <Form.Item
            name="TenLop"
            label="Tên lớp"
            rules={[{ required: true, message: "Chưa Nhập Tên Lớp" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Khoi"
            label="Khối"
            rules={[
              {
                required: true,
                message: "Chưa Chọn Khối",
              },
            ]}
          >
            <Select disabled={dataUpdate===null?false:true} placeholder="Chọn Khối" onChange={changeKhoi} allowClear>
              <Option value={6}> Khối 6</Option>
              <Option value={7}> Khối 7</Option>
              <Option value={8}> Khối 8</Option>
              <Option value={9}> Khối 9</Option>
              <Option value={10}> Khối 10</Option>
              <Option value={11}> Khối 11</Option>
              <Option value={12}> Khối 12</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="PGDID"
            label="Phòng Giáo dục"
            rules={[
              {
                required: true,

                message: "Chưa Chọn Phòng Giáo dục",
              },
            ]}
          >
            <PGDDropdown PGDs={PGDSelect} ID={PGDID}  selectedIDF={selectedIDF} />
          </Form.Item>
          <Form.Item name="LopHoc2Buoi" valuePropName="checked">
            <Checkbox>Học 2 Buổi</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateClass;
