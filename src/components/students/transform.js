import React, { useState } from "react";
import {
  Col,
  Row,
  Select,
  Input,
  Form,
  DatePicker,
  Button,
  PageHeader,
  Table,
  message,
  Popconfirm,
  Card,
  Tooltip,
} from "antd";
import globalApi from "../../apis/globalApi";
import schoolApi from "../../apis/schoolApi";
export const TransferSchoolInsideHCM = (props) => {
  const [schools, setschools] = useState([]);
  const [form] = Form.useForm();

  return <></>;
};

export const TransferSchoolOutsideHCM = () => {
  const [schools, setschools] = useState([]);
  const [form] = Form.useForm();

  return <></>;
};

export const LeaveSchool = (props) => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(() => {
      const data = {
        NgayBienDong: form.getFieldValue("ngayBienDong").format(),
        LoaiBienDongID: props.bienDongId,
        HocSinhID: props.HocSinhID,
        LyDoBienDong: form.getFieldValue("ghiChu")
          ? form.getFieldValue("ghiChu")
          : null,
      };
      schoolApi.postBienDongThoiHocHocSinh(data);
    });
  };
  console.log(props);
  return (
    <div>
      <Form name="basic" onFinish={submit} form={form}>
        <Form.Item
          name="ngayBienDong"
          label="Ngày biến động"
          rules={[{ required: true, message: "Vui lòng nhập" }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <Input />
        </Form.Item>
        <Form.Item>
          <p style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              XÁc NHẬN
            </Button>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};
