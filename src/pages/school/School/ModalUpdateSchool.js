import React, { useEffect, useState } from "react";
import schoolAPI from "../../../apis/schoolApi";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  message,
  Col,
  Row,
  Popconfirm,
  Table,
} from "antd";
import globalAPI from "../../../apis/globalApi";
import UpdateAddress from "../../../components/schools/updateAddress";

const { Option } = Select;

const ModalUpdateSchool = ({ showModalSchool, showModalSchoolF }) => {
  const [PGDs, setPGDs] = useState([]);
  const columnsDiemTruong = [
    {
      title: "Tên Điểm Trường",
      width: 200,
      dataIndex: "TenDiemTruong",
    },
    {
      title: "Địa Chỉ",
      width: 400,
      dataIndex: "DiaChi",
      render: (text, record) =>
        `${record.DiaChi}, ${record.TenXa}, ${record.TenHuyen}, ${record.TenTinh}`,
    },
    {
      title: "Kinh Độ",
      dataIndex: "Longitude",
      width: 100,
    },
    {
      title: "Vĩ Độ",
      dataIndex: "Latitude",
      width: 100,
    },
    {
      title: "Thao tác",
      dataIndex: "ID",
      width: 100,
      fixed: "right",
      render: (text) => (
        <Popconfirm
          title="Xác nhận xóa?"
          onConfirm={() => handleDeleteDiemTruong(text)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">XÓA</Button>
        </Popconfirm>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);
  const [isShowUpdateDiemTruong, setIsShowUpdateDiemTruong] = useState(false);
  const [diemTruong, setdiemTruong] = useState([]);
  //Function
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
    await schoolAPI.getPGD().then((res)=>{setPGDs(res.Result)});
    await schoolAPI.getDiemTruong().then((s) => setdiemTruong(s.Result));
    await changeHuyen(79);
    await schoolAPI.getTruongInfobyID().then((res) => {
      if (res.Result.HuyenID != null) {
        changeXa(res.Result.HuyenID);
      }
      form.setFieldsValue(res.Result);
    });
  };
  const handleDeleteDiemTruong = async (id) => {
    await schoolAPI.deleteDiemTruong(id).then(async (res) => {
      if (res.statusCode === 200) {
        message.success("Xóa thành công!", 3);
        await schoolAPI.getDiemTruong().then((s) => setdiemTruong(s.Result));
      } else {
        message.error(res.message);
      }
    });
  };
  const submitData = async () => {
    var request= {
      ...form.getFieldsValue()
    }
    await schoolAPI.postTruongInfobyID(request).then((res) => {
      if (res.StatusCode === 200) {
        message.success("Thành công");
        form.resetFields();
        showModalSchoolF();
      } else {
        message.error("Lỗi: " + res.Message);
      }
    });
  };
  const handleCloseUpdateDiemTruongModal = async () => {
    setIsShowUpdateDiemTruong(false);
    await schoolAPI.getDiemTruong().then((s) => setdiemTruong(s.Result));
  };
  const validate = () => ({
    validator(rule, value) {
      if (value === undefined) {
        return Promise.reject("Chưa Nhập Số Điện Thoại");
      }
      if (isNaN(value)) {
        if (value.toLowerCase() === "không có") return Promise.resolve();
        else return Promise.reject("Nhập không đúng định dạng số điện thoại");
      } else {
        return Promise.resolve();
      }
    },
  });
  useEffect(() => {
    getdata();
  }, [showModalSchool]);
  return (
    <>
      <Modal
        visible={isShowUpdateDiemTruong}
        title={`Điểm trường`}
        width={900}
        onCancel={() => {
          setIsShowUpdateDiemTruong(false);
        }}
        footer={null}
      >
        <UpdateAddress
          handleCloseUpdateDiemTruongModal={handleCloseUpdateDiemTruongModal}
        />
      </Modal>
      <Modal
        visible={showModalSchool}
        title={`Cập nhật thông tin trường`}
        width={1200}
        onCancel={() => {
          showModalSchoolF();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              showModalSchoolF();
            }}
          >
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={submitData}>
            Cập Nhật
          </Button>,
        ]}
      >
        <Form
          // {...{
          //   labelCol: { span: 8 },
          //   wrapperCol: { span: 8 },
          // }}
          form={form}
          initialValues={{ LopHoc2Buoi: false }}
          name="control-hooks"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="LoaiHinhTruongID"
                label="Loại hình trường:"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Chọn loại hình trường">
                  <Option value={"CL"}> Công lập </Option>
                  <Option value={"NCL"}> Ngoài Công lập </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="HieuTruong"
                label="Hiệu trưởng (Ví dụ: Nguyễn Văn An):"
                labelCol={15}
                wrapperCol={2}
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="DT_HieuTruong"
                label="Điện thoại di động của Hiệu trưởng"
                rules={[{ required: true }]}
                labelCol={15}
                wrapperCol={2}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Địa Chỉ" required>
                <Button
                  type="primary"
                  onClick={() => setIsShowUpdateDiemTruong(true)}
                >
                  Thêm mới
                </Button>
                <Table
                  pagination={false}
                  dataSource={diemTruong}
                  columns={columnsDiemTruong}
                  rowKey="ID"
                />
                {/* <Input.Group compact>
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
                    rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                  >
                    <Input />
                  </Form.Item>
                </Input.Group> */}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="SDT"
                label="Số điện thoại cố định"
                rules={[{ required: true }, validate]}
                labelCol={4}
                wrapperCol={2}
              >
                <Input
                  placeholder="Nếu không có số Điện thoại thì nhập không có"
                  onBlur={(e) => {
                    form.setFieldsValue({ SDT: e.target.value.trim() });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="Email"
                label="Hộp thư điện tử (Email):"
                labelCol={6}
                wrapperCol={2}
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
              >
                <Input placeholder="Nếu không có Email thì nhập không có"
                  onBlur={(e) => {
                    form.setFieldsValue({ Email: e.target.value.trim() });
                  }}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Website"
                label="Website trường"
                labelCol={2}
                wrapperCol={6}
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
              >
                <Input  placeholder="Nếu không có Website thì nhập không có"
                  onBlur={(e) => {
                    form.setFieldsValue({ Website: e.target.value.trim() });
                  }}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Fax"
                label="Fax"
                labelCol={4}
                wrapperCol={2}
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
              >
                <Input placeholder="Nếu không có Fax thì nhập không có"
                  onBlur={(e) => {
                    form.setFieldsValue({ Fax: e.target.value.trim() });
                  }}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ThuocVungKinhTeKK"
                label="Thuộc vùng kinh tế khó khăn"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={1}
              >
                <Select placeholder="Thuộc vùng kinh tế khó khăn">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="DatChuanQG"
                label="Đạt chuẩn Quốc gia"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={4}
                wrapperCol={2}
              >
                <Select placeholder="Đạt chuẩn quốc gia">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoChiBoDang"
                label="Có chi bộ Đảng"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Có chi bộ Đảng">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoLopHoc2Buoi"
                label="Có lớp học 2 buổi"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Lớp học 2 buổi">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoHSBanTru"
                label="Có học sinh bán trú"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Học sinh bán trú">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoHSNoiTru"
                label="Có học sinh nội trú"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Học sinh nội trú">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="TruongQuocTe"
                label="Trường Quốc tế"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Trường Quốc tế">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoHSKhuyetTat"
                label="Có học sinh khuyết tật"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Học sinh khuyết tật">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoDayNghePT"
                label="Có dạy nghề phổ thông"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Dạy nghề phổ thông">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoPhoBien_HIV_SKSS"
                label="Có phổ cập kiến thức sức khỏe sinh sản, HIV"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={8}
                wrapperCol={2}
              >
                <Select placeholder="Phổ cập kiến thức">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Cap1"
                label="Có cấp Tiểu học"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Cấp Tiểu học">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Cap2"
                label="Có cấp Trung học cơ sở"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Cấp Trung học cơ sở">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Cap3"
                label="Có cấp Trung học phổ thông"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Cấp Trung học phổ thông">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="IsGDTX"
                label="Giáo dục thường xuyên"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Trường Giáo dục Thường Xuyên">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="IsMamNon"
                label="Mầm non"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Trường Mầm non">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="TruongChuyen"
                label="Trường Chuyên"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Trường Chuyên">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="TruongTichHop"
                label="Trường Tích Hợp"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Trường Tích Hợp">
                  <Option value={1}> Có </Option>
                  <Option value={0}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="CoLopThuong"
                label="Lớp thường"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
                <Select placeholder="Có Lớp Thường">
                  <Option value={true}> Có </Option>
                  <Option value={false}> Không </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="PGDID"
                label="Phòng Giáo dục"
                rules={[{ required: true, message: "Thông tin bắt buộc" }]}
                labelCol={6}
                wrapperCol={2}
              >
               <Select
                placeholder="Chọn Phòng Giáo dục"
                showSearch
                style={{ width: 300 }}
                optionFilterProp="children"
                allowClear
                >
                  {PGDs.map((value) => (
                      <Option key={value.PGDID} value={value.PGDID}>
                        {value.TenPGD}
                      </Option>
                  ))}
              </Select>
              </Form.Item>
            </Col>
            {/* <Form.Item
                name="Khoi"
                label="Khối"
                rules={[
                  {
                    required: true,
                    message: "Chưa Chọn Khối",
                  },
                ]}
              >
                <Select placeholder="Chọn Khối">
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
               
              </Form.Item>
              <Form.Item name="LopHoc2Buoi" valuePropName="checked">
                <Checkbox>Học 2 Buổi</Checkbox>
              </Form.Item> */}
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateSchool;
