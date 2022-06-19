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
  Descriptions,
} from "antd";
import { useParams, useHistory } from "react-router-dom";
import schoolAPI from "../../../apis/schoolApi";
import globalAPI from "../../../apis/globalApi";

import moment from "moment";

const { Option } = Select;

const UpdateInfo = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [updateField, setUpdateField] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [tinhs, setTinhs] = useState([]);
  const [huyens, setHuyens] = useState([]);
  const [xas, setXas] = useState([]);
  const [selectedUpdateField, setSelectedUpdateField] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [arrayToSelect, setArrayToSelect] = useState([]);
  const [requestUpdates, setRequestUpdates] = useState([]);
  const [dotdiemID, setDotDiemID] = useState([]);
  const [lopID, setLopID] = useState("");
  //validateMessage
  const validateMessage = {
    required: "Chưa Nhập",
  };
  const selectUpdateConstrain = [3, 7, 8, 16, 20, 23];

  const handleDeleteRequest = async (ID) => {
    const data = { HocSinhUpdateLogID: ID };
    const res = await schoolAPI.deleteUpdateHS(data);
    if (res.StatusCode === 200) {
      message.success("Xóa thành công", 3);
      getDataUpdateStudent();
    } else {
      message.error(res.Message);
    }
  };
  const getDataUpdateStudent = async () => {
    const res = await schoolAPI.getHocSinhUpDateLog();
    setRequestUpdates(res.Result);
  };
  const columns = [
    {
      title: "HocSinhID",
      width: 100,
      dataIndex: "HocSinhID",
      fixed: "left",
    },
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
      title: "Trường dữ liệu",
      dataIndex: "Name",
      width: 150,
      //   render: (text) => (text ? "Nữ" : "Nam"),
    },
    {
      title: "Dữ liệu cũ",
      dataIndex: "OldValue",
      width: 200,
    },
    {
      title: "Dữ liệu mới",
      dataIndex: "NewValue",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "ApprovedBy",
      width: 150,
      fixed: "right",
      render: (text) =>
        text !== null ? (text ? "Đã duyệt" : "Từ chối") : "Chưa duyệt",
    },
    {
      title: "Thao tác",
      dataIndex: "Id",
      width: 150,
      fixed: "right",
      render: (text) => (
        <Popconfirm
          title="Xác nhận xóa?"
          onConfirm={() => handleDeleteRequest(text)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">XÓA</Button>
        </Popconfirm>
      ),
    },
  ];

  const getClasses = async () => {
    const data = await schoolAPI.getClass(2021);
    setClasses(data.Result);
  };

  const changeYear = async (year) => {
    const data = await schoolAPI.getClass(year);
    setClasses(data.Result);
    const data1 = await globalAPI.getDotDiemByYear(year);
    setDotDiemID(data1.Result);
  };
  const changeLop = function (lopID) {
    setLopID(lopID);
  };
  const getStudentByClassId = async (DotDiemID) => {
    const data = await schoolAPI.getHsByLopID(lopID, DotDiemID);
    setStudents(data.Result);
  };
  const handleSelectStudent = (HocSinhID) => {
    const student = students.filter((s) => s.HocSinhID === HocSinhID);
    setSelectedStudent(student[0]);
  };

  const getUpdateField = async () => {
    const data = await schoolAPI.getUpdateField();
    setUpdateField(data.Result);
  };

  const getTinh = async () => {
    await globalAPI.getTinh().then(async (s) => {
      setTinhs(s.Result);
    });
  };

  const handleChangeTinh = async (tinhID) => {
    await globalAPI.getHuyen(tinhID).then(async (s) => {
      setHuyens(s.Result);
    });
  };

  const handleChangeHuyen = async (huyenId) => {
    const xa = await globalAPI.getXa(huyenId);
    setXas(xa.Result);
  };
  const handleChangeSelectUpdateField = async (id) => {
    setSelectedUpdateField(id);
    const gender = [
      { ID: 1, Name: "Nữ" },
      { ID: 0, Name: "Nam" },
    ];
    if (selectUpdateConstrain.includes(id)) {
      setIsSelect(true);
      switch (id) {
        case 3:
          setArrayToSelect(gender);
          break;
        case 7:
          const dantoc = await globalAPI.getDanToc();
          console.log(dantoc);
          setArrayToSelect(dantoc.Result);
          break;
        case 8:
          const tonGiao = await globalAPI.getTonGiao();
          setArrayToSelect(tonGiao.Result);
          break;
        case 16:
          getTinh();
          break;
        case 20:
          getTinh();
          break;
        case 23:
          const khuyetTat = await globalAPI.getLKTat();
          let newArray = khuyetTat.Result.map((x) => {
            return {
              ID: x.KhuyetTatID,
              Name: x.TenKhuyetTat,
            };
          });
          setArrayToSelect(newArray);
          break;
        default:
          break;
      }
    } else {
      setIsSelect(false);
    }
  };

  const onSubmit = async () => {
    let formData = form.getFieldValue();
    debugger;
    let updateFieldName = updateField.filter(
      (s) => s.Id === formData.UpdatedFiedId
    )[0].Props;
    // let OldValue = students.filter(s => s.HocSinhID === formData.HocSinhID)[0];
    let OldValue = selectedStudent[updateFieldName];
    let data = { ...form.getFieldValue(), OldValue: OldValue };
    const res = await schoolAPI.PostUpdateHS(data);
    if (res.StatusCode === 200) {
      message.success("Gửi yêu cầu thành công", 3);
      getDataUpdateStudent();
    } else {
      message.error(res.Message);
    }
  };
  // const getStudentUpdates =  async () => {
  //   const data = await schoolAPI.getupda
  // }
  useEffect(() => {
    getClasses();
    (async function () {
      const data1 = await globalAPI.getDotDiemByYear(2021);
      console.log(data1);
      setDotDiemID(data1.Result);
    })();
    getUpdateField();
    getDataUpdateStudent();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Cập nhật học sinh"
        extra={[
          <Select
            key="1"
            showSearch
            style={{ width: 100 }}
            defaultValue={2021}
            onChange={changeYear}
          >
            <Option value={2018}>2018</Option>
            <Option value={2019}>2019</Option>
            <Option value={2020}>2020</Option>
            <Option value={2021}>2021</Option>
          </Select>,
        ]}
      ></PageHeader>
      <Row>
        <Col span={12}>
          <Card title="CHỌN HỌC SINH" style={{ width: "100%" }}>
            <Form
              {...{
                labelCol: { span: 4 },
                wrapperCol: { span: 12 },
              }}
              form={form}
              name="control-hooks"
              validateMessages={validateMessage}
              //   initialValues={{ ClientHocSinhID: 0 }}
            >
              <Form.Item
                name="LopID"
                label="Lớp"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Lớp"
                  showSearch
                  allowClear
                  onChange={changeLop}
                >
                  {classes.map((value) => (
                    <Option key={value.LopID} value={value.ID}>
                      {value.TenLop}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="DotDiemID"
                label="Học Kỳ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Học Kỳ"
                  showSearch
                  allowClear
                  onChange={getStudentByClassId}
                >
                  {dotdiemID.map((value) => (
                    <Option key={value.DotDiemID} value={value.DotDiemID}>
                      {value.TenDotDiem}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="HocSinhID"
                label="Học Sinh"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Học sinh"
                  showSearch
                  allowClear
                  onChange={handleSelectStudent}
                >
                  {students.map((value) => (
                    <Option key={value.HocSinhID} value={value.HocSinhID}>
                      {`${value.HocSinhID} - ${value.Ho} ${value.Ten}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="UpdatedFiedId" label="Dữ liệu thay đổi">
                <Select
                  placeholder="Dữ liệu thay đổi"
                  showSearch
                  allowClear
                  onChange={handleChangeSelectUpdateField}
                >
                  {updateField.map((value) => (
                    <Option key={value.Id} value={value.Id}>
                      {value.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Row>
                {selectedUpdateField !== 16 && selectedUpdateField !== 20 ? (
                  <Col span={24}>
                    <Form.Item
                      name="newValue"
                      label="Dữ liệu mới"
                      rules={[{ required: false }]}
                    >
                      {isSelect ? (
                        <Select showSearch allowClear>
                          {arrayToSelect.map((value) => (
                            <Option key={value.ID} value={value.ID}>
                              {value.Name}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                ) : (
                  <>
                    <Col span={12}>
                      <Form.Item
                        name="tinh"
                        label="Tỉnh"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          allowClear
                          onChange={handleChangeTinh}
                        >
                          {tinhs.map((value) => (
                            <Option key={value.ID} value={value.ID}>
                              {value.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="huyen"
                        label="Huyện"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          allowClear
                          onChange={handleChangeHuyen}
                        >
                          {huyens.map((value) => (
                            <Option key={value.ID} value={value.ID}>
                              {value.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="newValue"
                        label="Xã"
                        rules={[{ required: true }]}
                      >
                        <Select showSearch allowClear>
                          {xas.map((value) => (
                            <Option key={value.ID} value={value.ID}>
                              {value.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
              <p style={{ textAlign: "center" }}>
                <Button type="primary" onClick={onSubmit}>
                  GỬI YÊU CẦU
                </Button>
              </p>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="THÔNG TIN HỌC SINH" style={{ width: "100%" }}>
            <Descriptions>
              <Descriptions.Item label="HocSinhID">
                <b>{selectedStudent ? selectedStudent.HocSinhID : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Họ">
                <b>{selectedStudent ? selectedStudent.Ho : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Tên">
                <b>{selectedStudent ? selectedStudent.Ten : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Tên Cha">
                <b>{selectedStudent ? selectedStudent.TenCha : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Tên mẹ">
                <b>{selectedStudent ? selectedStudent.TenMe : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Tên người giám hộ">
                <b>{selectedStudent ? selectedStudent.TenNguoiGiamHo : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="SĐT cha">
                <b>{selectedStudent ? selectedStudent.SDTCha : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="SĐT mẹ">
                <b>{selectedStudent ? selectedStudent.SDTMe : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                <b>{selectedStudent ? selectedStudent.NgaySinh : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Nơi sinh">
                <b>{selectedStudent ? selectedStudent.NoiSinh : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Dân tộc">
                <b>{selectedStudent ? selectedStudent.DanToc : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Tôn giáo">
                <b>{selectedStudent ? selectedStudent.TonGiao : null}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Nơi ở">
                <b>
                  {selectedStudent
                    ? `${selectedStudent.DCTT_DiaChi}, ${selectedStudent.DiaChi_Xa}, ${selectedStudent.DiaChi_Huyen}, ${selectedStudent.DiaChi_Tinh}`
                    : null}
                </b>
              </Descriptions.Item>
              <Descriptions.Item label="Hộ khẩu">
                <b>
                  {selectedStudent
                    ? `${selectedStudent.HoKhau_DiaChi}, ${selectedStudent.HoKhau_Xa}, ${selectedStudent.HoKhau_Huyen}, ${selectedStudent.HoKhau_Tinh}`
                    : null}
                </b>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row>
        <Table
          pagination={false}
          dataSource={requestUpdates}
          columns={columns}
          scroll={{ x: 1500, y: window.screen.height - 400 }}
          // loading={isLoading}
          rowKey="Id"
        />
      </Row>
    </>
  );
};

export default UpdateInfo;
