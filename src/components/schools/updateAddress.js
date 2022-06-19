import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, message, Col } from "antd";

import globalAPI from "../../apis/globalApi";
import schoolAPI from "../../apis/schoolApi";

const { Option } = Select;
const UpdateAddress = ({ handleCloseUpdateDiemTruongModal }) => {
  const [form] = Form.useForm();

  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const changeHuyen = async (params) => {
    let result = await globalAPI.getHuyen(params);
    setHuyen(result.Result);
  };
  const changeXa = async (params) => {
    form.setFieldsValue({ ...form.getFieldsValue(), XaID: null });
    let result = await globalAPI.getXa(params);
    setXa(result.Result);
  };
  const getdata = async () => {
    await changeHuyen(79);
    await schoolAPI.getTruongInfobyID().then((res) => {
      if (res.Result.HuyenID != null) {
        changeXa(res.Result.HuyenID);
      }
      form.setFieldsValue(res.Result);
    });
  };
  const onSubmit = async () => {
    await schoolAPI.createDiemTruong(form.getFieldValue()).then(async (res) => {
      if (res.StatusCode === 200) {
        await schoolAPI
          .postSchoolImage(selectedImage, res.Result)
          .then(async (mageRes) => {
            debugger;
            if (mageRes.data.StatusCode === 200) {
              message.success("Thành công");
              handleCloseUpdateDiemTruongModal();
            } else {
              await schoolAPI.deleteDiemTruong(res.Result);
              message.error("Lỗi: " + mageRes.data.Message);
            }
          });
      } else {
        message.error("Lỗi: " + res.Message);
      }
    });
  };
  const handleUploadImage = async (event) => {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    setSelectedImage(formData);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <Form
        // {...{
        //   labelCol: { span: 8 },
        //   wrapperCol: { span: 8 },
        // }}
        form={form}
        initialValues={{ LopHoc2Buoi: false, TinhID: 79 }}
        name="control-hooks"
        onFinish={onSubmit}
      >
        <Col span={24}>
          <Form.Item
            label="Tên Điểm Trường"
            name="TenDiemTruong"
            // label="Địa chỉ trường (Số nhà, tên đường)"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" required>
            <Input.Group compact>
              <Form.Item name="HuyenID" rules={[{ required: true }]}>
                <Select
                  placeholder="Quận/Huyện"
                  showSearch
                  optionFilterProp="children"
                  // style={{ width: 180 }}
                  allowClear
                  onChange={changeXa}
                >
                  {huyen.map((value) => (
                    <Option key={value.ID} value={value.ID}>
                      {value.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="XaID" rules={[{ required: true }]}>
                <Select
                  placeholder="Phường/Xã"
                  showSearch
                  optionFilterProp="children"
                  //style={{ width: 180 }}
                  allowClear
                >
                  {xa.map((value) => (
                    <Option key={value.ID} value={value.ID}>
                      {value.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="DiaChi"
                // label="Địa chỉ trường (Số nhà, tên đường)"
                placeholder="Số nhà, tên đường"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
              >
                <Input />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            <Input.Group compact>
              <Form.Item
                name="Latitude"
                label="Vĩ Độ"
                // placeholder="Số nhà, tên đường"
                rules={[{ required: true, message: "Thông tin bắt buộc" },() => ({
                  validator(_, value) {
                    var faction= value.split(".")[1];
                    if (!value || faction.length>4) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject(new Error('độ dài sau dấu . lớn hơn 4'));
                  },
                }),]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Longitude"
                label="Kinh Độ"
                // placeholder="Số nhà, tên đường"
                rules={[{ required: true, message: "Thông tin bắt buộc" },() => ({
                  validator(_, value) {
                    var faction= value.split(".")[1];
                    if (!value || faction.length>4) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject(new Error('độ dài sau dấu . lớn hơn 4'));
                  },
                }),]}
              >
                <Input />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="upload"
            label="Hình ảnh trường"
            extra="Ưu tiên chọn hình cổng trường"
          >
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleUploadImage}
              required
            />
          </Form.Item>
          <p style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </p>
        </Col>
      </Form>
    </div>
  );
};

export default UpdateAddress;
