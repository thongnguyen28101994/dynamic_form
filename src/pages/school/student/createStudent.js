import React, { useState, useEffect } from "react";
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
import { FileExcelOutlined } from "@ant-design/icons";
import schoolAPI from "../../../apis/schoolApi";
import globalAPI from "../../../apis/globalApi";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const CreateStudent = () => {
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

  const [dantoc, setDanToc] = useState([]);
  const [tongiao, setTonGiao] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [form] = Form.useForm();
  const [huyen, setHuyen] = useState({ hokhau_huyen: [], dctt_huyen: [] });
  const [xa, setXa] = useState({ hokhau_xa: [], dctt_xa: [] });
  const [khuyetTat, setKhuyetTat] = useState([]);
  const [chinhSach, setChinhSach] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lopID } = useParams();
  let history = useHistory();
  //function
  const getDanToc = async () => {
    let result = await globalAPI.getDanToc();
    setDanToc(result.Result);
  };
  const getTonGiao = async () => {
    let result = await globalAPI.getTonGiao();
    setTonGiao(result.Result);
  };
  const getLKTat = async () => {
    let result = await globalAPI.getLKTat();
    setKhuyetTat(result.Result);
  };
  const getDTCSach = async () => {
    let result = await globalAPI.getDTCSach();
    setChinhSach(result.Result);
  };
  const getTinh = async () => {
    let result = await globalAPI.getTinh();
    result.Result.shift();
    setTinh(result.Result);
  };
  const getHocSinhChoDuyet = async () => {
    let result = await schoolAPI.getHocSinhChoDuyetByLopId(lopID);
    setStudents(result.Result);
  };
  const changeHKTinh = async (params) => {
    let result = await globalAPI.getHuyen(params);
    setHuyen({ ...huyen, hokhau_huyen: result.Result });
  };
  const changHKHuyen = async (params) => {
    let result = await globalAPI.getXa(params);
    setXa({ ...xa, hokhau_xa: result.Result });
  };
  const changTinh = async (params) => {
    let result = await globalAPI.getHuyen(params);
    setHuyen({ ...huyen, dctt_huyen: result.Result });
  };
  const changHuyen = async (params) => {
    let result = await globalAPI.getXa(params);
    setXa({ ...xa, dctt_xa: result.Result });
  };
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
  const onSubmit = () => {
    form.validateFields().then(async () => {
      let NgaySinh = form.getFieldValue("NgaySinh").format();
      let respone =
       {
        LopID: lopID,
        HocSinhData:[
          {
            ...form.getFieldValue(),
            NgaySinh: NgaySinh
          }
        ]
      };
      const result = await schoolAPI.insertStudent(respone).then((res) => {
        if (res.StatusCode === 200) {
          message.success("Thành công");
        } else {
          message.error("Có lỗi xảy ra");
        }
      });
      getHocSinhChoDuyet();
      form.resetFields();
    });
  };
  const onReset = () => {
    form.resetFields();
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

  //validateMessage
  const validateMessage = {
    required: "Chưa Nhập",
  };
  //khoi tao
  useEffect(() => {
    getDanToc();
    getTonGiao();
    getTinh();
    getDTCSach();
    getLKTat();
    getHocSinhChoDuyet();
    setIsLoading(false);
  }, []);
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
      <Row>
        <Col span={20} offset={2}>
          <div
            className={{
              padding: 30,
              backGroundColor: "#ececec",
            }}
          >
            <Card style={{ width: "100%" }}>
              <Form
                // {...{
                //     labelCol: { span: 4 },
                //     wrapperCol: { span: 12 },
                // }}
                form={form}
                name="control-hooks"
                validateMessages={validateMessage}
                initialValues={{ ClientHocSinhID: 0 }}
              >
                <Row>
                  <Col span={20}>
                    <Tooltip
                      placement="top"
                      title={
                        <span>
                          Mã phần mềm quản lí nhà
                          trường(VietSchool,SMAS,QuanIch)
                        </span>
                      }
                    >
                      <Form.Item name="ClientHocSinhID" label="ClientHocSinhID">
                        <Input />
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="Ho"
                      rules={[{ required: true }]}
                      label="Họ và Tên Lót"
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({ Ho: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="Ten"
                      rules={[{ required: true }]}
                      label="Tên"
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({ Ten: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={4}>
                    <Form.Item
                      name="GioiTinh"
                      label="Giới Tính"
                      rules={[{ required: true }]}
                    >
                      <Select>
                        <Option value={false}>Nam</Option>
                        <Option value={true}>Nữ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="CMND"
                      label="CMND"
                      rules={[{ required: true }, validate]}
                    >
                      <Input
                        placeholder="Nếu không có CMND thì nhập không có"
                        onBlur={(e) => {
                          form.setFieldsValue({ CMND: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="SDT"
                      label="Điện Thoại"
                      rules={[{ required: true }, validate]}
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({ SDT: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="NgaySinh"
                      label="Ngày Sinh"
                      rules={[{ required: true }]}
                    >
                      <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="NoiSinh"
                      label="Nơi Sinh"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="DanTocID"
                      label="Dân Tộc"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Dân Tộc" showSearch allowClear>
                        {dantoc.map((value) => (
                          <Option key={value.ID} value={value.ID}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="TonGiaoID"
                      label="Tôn Giáo"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Tôn Giáo" showSearch allowClear>
                        {tongiao.map((value) => (
                          <Option key={value.ID} value={value.ID}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Địa Chỉ" required>
                      <Input.Group compact>
                        <Form.Item
                          name="HoKhau_Tinh"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Tỉnh"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            onChange={changeHKTinh}
                            allowClear
                          >
                            {tinh.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="HoKhau_Huyen"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Huyện"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            allowClear
                            onChange={changHKHuyen}
                          >
                            {huyen.hokhau_huyen.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="HoKhau_XaID"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Xã"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            allowClear
                          >
                            {xa.hokhau_xa.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="HoKhau_DiaChi"
                          rules={[{ required: true }]}
                        >
                          <Input
                            placeholder="Số Nhà"
                            style={{ width: "100%" }}
                            onBlur={(e) => {
                              form.setFieldsValue({
                                HoKhau_DiaChi: e.target.value.trim(),
                              });
                            }}
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Địa Chỉ TT" required>
                      <Input.Group compact>
                        <Form.Item
                          name="DCTT_Tinh"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Tỉnh"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            allowClear
                            onChange={changTinh}
                          >
                            {tinh.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="DCTT_Huyen"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Huyện"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            allowClear
                            onChange={changHuyen}
                          >
                            {huyen.dctt_huyen.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="DCTT_XaID"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Xã"
                            showSearch
                            optionFilterProp="children"
                            style={{ width: 180 }}
                            allowClear
                          >
                            {xa.dctt_xa.map((value) => (
                              <Option key={value.ID} value={value.ID}>
                                {value.Name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="DCTT_DiaChi"
                          rules={[{ required: true }]}
                        >
                          <Input
                            placeholder="Số Nhà"
                            style={{ width: "100%" }}
                            onBlur={(e) => {
                              form.setFieldsValue({
                                DCTT_DiaChi: e.target.value.trim(),
                              });
                            }}
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="KhuyetTatID"
                      label="Khuyết Tật"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Khuyết Tật"
                        showSearch
                        optionFilterProp="children"
                        style={{ width: 180 }}
                        allowClear
                      >
                        {khuyetTat.map((value) => (
                          <Option
                            key={value.KhuyetTatID}
                            value={value.KhuyetTatID}
                          >
                            {value.TenKhuyetTat}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="DoiTuongChinhSachID"
                      label="Đối tượng chính sách"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Đối Tượng Chính Sách"
                        showSearch
                        optionFilterProp="children"
                        style={{ width: 180 }}
                        allowClear
                      >
                        {chinhSach.map((value) => (
                          <Option key={value.ID} value={value.ID}>
                            {value.TenDTCS}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="TenCha"
                      label="Tên Cha"
                      rules={[{ required: true }]}
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({
                            TenCha: e.target.value.trim(),
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="SDTCha"
                      label="Điện Thoại"
                      rules={[{ required: true }, validate]}
                    >
                      <Input
                        placeholder="Nếu không có SDT thì nhập không có"
                        onBlur={(e) => {
                          form.setFieldsValue({
                            SDTCha: e.target.value.trim(),
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="TenMe"
                      label="Tên Mẹ"
                      rules={[{ required: true }]}
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({ TenMe: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="SDTMe"
                      label="Điện Thoại"
                      rules={[{ required: true }, validate]}
                    >
                      <Input
                        placeholder="Nếu không có SDT thì nhập không có"
                        onBlur={(e) => {
                          form.setFieldsValue({ SDTMe: e.target.value.trim() });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="TenNguoiGiamHo"
                      label="Tên Người Giám Hộ"
                      rules={[{ required: true }]}
                    >
                      <Input
                        onBlur={(e) => {
                          form.setFieldsValue({
                            TenNguoiGiamHo: e.target.value.trim(),
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="SDTNguoiGiamHo"
                      label="Điện Thoại"
                      rules={[{ required: true }, validate]}
                    >
                      <Input
                        placeholder="Nếu không có SDT thì nhập không có"
                        onBlur={(e) => {
                          form.setFieldsValue({
                            SDTNguoiGiamHo: e.target.value.trim(),
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} offset={12}>
                    <Button type="primary" onClick={onSubmit}>
                      THÊM MỚI
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      RESET
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
      <Table
        pagination={false}
        dataSource={students}
        columns={columns}
        scroll={{ x: 1500, y: window.screen.height - 400 }}
        loading={isLoading}
        rowKey="ID"
      />
    </>
  );
};

export default CreateStudent;
