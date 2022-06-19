import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  message,
  Select,
  Form,
  Input,
  Modal,
  Row,
  Col,
} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import schoolAPI from "../../../apis/schoolApi";
import globalAPI from "../../../apis/globalApi";
const CapNhatHocSinh = ({ record, ReloadPage, showModal, setCloseModal }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [updateField, setUpdateField] = useState([]);
  const [selectedUpdateField, setSelecttedUpdateField] = useState(0);
  const [tinhs, setTinhs] = useState([]);
  const [huyens, setHuyens] = useState([]);
  const [xas, setXas] = useState([]);
  const [arrayToSelect, setArrayToSelect] = useState([]);
  const getUpdateField = async () => {
    // const data = await schoolAPI.getUpdateField();
    // setUpdateField(data.Result);
    const data = [
      {
        Id: 1,
        Props: "email",
        Name: "Email",
      },
      // {
      //   Id: 2,
      //   Props: "ten",
      //   Name: "Tên",
      // },
      {
        Id: 3,
        Props: "gioiTinh",
        Name: "Giới Tính",
      },
      // {
      //   Id: 4,
      //   Props: "ngaySinh",
      //   Name: "Ngày Sinh",
      // },
      {
        Id: 5,
        Props: "noiSinh",
        Name: "NoiSinh",
      },
      {
        Id: 6,
        Props: "cmnd",
        Name: "CMND",
      },
      {
        Id: 7,
        Props: "danTocID",
        Name: "TenDanToc",
      },
      {
        Id: 8,
        Props: "tonGiaoID",
        Name: "TenTonGiao",
      },
      {
        Id: 9,
        Props: "tenCha",
        Name: "TenCha",
      },
      {
        Id: 10,
        Props: "sdtCha",
        Name: "SDTCha",
      },
      {
        Id: 11,
        Props: "tenMe",
        Name: "TenMe",
      },
      {
        Id: 12,
        Props: "sdtMe",
        Name: "SDTMe",
      },
      {
        Id: 13,
        Props: "tenNguoiGiamHo",
        Name: "TenNguoiGiamHo",
      },
      {
        Id: 14,
        Props: "sdtNguoiGiamHo",
        Name: "SDTNguoiGiamHo",
      },
      {
        Id: 15,
        Props: "hoKhau_DiaChi",
        Name: "HoKhau_DiaChi",
      },
      {
        Id: 16,
        Props: "hoKhau_XaID",
        Name: "HoKhau_Xa",
      },
      {
        Id: 19,
        Props: "dctT_DiaChi",
        Name: "DCTT_DiaChi",
      },
      {
        Id: 20,
        Props: "dctT_XaID",
        Name: "DiaChi_Xa",
      },
      {
        Id: 23,
        Props: "khuyetTatID",
        Name: "KhuyetTatID",
      },
    ];
    setUpdateField(data);
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
  const HandleChangeUpdateField = async (param) => {
    setSelecttedUpdateField(param);
    switch (param) {
      case 3:
        setArrayToSelect([
          { ID: 1, Name: "Nữ" },
          { ID: 0, Name: "Nam" },
        ]);
        break;
      case 7:
        const dantoc = await globalAPI.getDanToc();
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
        setArrayToSelect([]);
        break;
    }
  };
  const onSubmit = async () => {
    await form.validateFields();
    var updateProps = updateField.filter(
      (x) => x.Id === form.getFieldValue("sua")
    )[0].Props;
    var data = {
      hocSinhID: record.HocSinhID,
    };
    data[updateProps] = form.getFieldValue("newValue");
    //  console.log(data);
    const res = await schoolAPI.PostUpdateHS_New(data);
    if (res.statusCode === 200) {
      message.success("Cập nhật thành công");
      // ReloadPage();
      form.resetFields();
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    getUpdateField();
  }, []);
  return (
    <>
      <Modal
        onCancel={() => {
          setCloseModal();
          form.resetFields();
          ReloadPage();
        }}
        title="Cập Nhật Học Sinh"
        visible={showModal}
        footer={null}
        width="1000px"
      >
        <PageHeader
          className="site-page-header-responsive"
          // title="Cập nhật thông tin học sinh"
          extra={[
            <Button key="1" type="primary" onClick={onSubmit}>
              <PlusSquareOutlined /> Lưu
            </Button>,
          ]}
        >
          <Form form={form}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="sua"
                  label="Nội dung cần sửa đổi"
                  rules={[{ required: true, message: "chưa nhập thông tin" }]}
                >
                  <Select
                    placeholder="Chọn thông tin cần sửa"
                    allowClear
                    onChange={HandleChangeUpdateField}
                  >
                    {updateField.map((value) => (
                      <Option key={value.Id} value={value.Id}>
                        {value.Name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {selectedUpdateField !== 16 && selectedUpdateField !== 20 ? (
                <Col span={24}>
                  <Form.Item
                    name="newValue"
                    label="Dữ liệu mới"
                    rules={[{ required: true, message: "chưa nhập thông tin" }]}
                  >
                    {arrayToSelect.length > 0 ? (
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
                  <Col span={8}>
                    <Form.Item
                      name="tinh"
                      label="Tỉnh"
                      rules={[{ required: true }]}
                    >
                      <Select showSearch allowClear onChange={handleChangeTinh}>
                        {tinhs.map((value) => (
                          <Option key={value.ID} value={value.ID}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
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
                  <Col span={8}>
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
          </Form>
        </PageHeader>
      </Modal>
    </>
  );
};

export default CapNhatHocSinh;
