import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Table,
  Space,
  Modal,
  message,
  Select,
  Form,
  Input,
  DatePicker,
  Typography,
  Dropdown,
  Menu,
  Row,
  Col,
} from "antd";
import {
  PlusSquareOutlined,
  EyeFilled,
  SearchOutlined,
  FileExcelOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import schoolApi from "../../../apis/schoolApi";
import { useParams, useHistory } from "react-router-dom";
import globalAPI from "../../../apis/globalApi";
import ReactDataSheet from "react-datasheet";
import { LeaveSchool } from "../../../components/students/transform";
import ModalDanhSachBienDong from "./ModalDanhSachBienDong";
import schoolAPI from "../../../apis/schoolApi";
import ChuyenLop from "./chuyenlop";
import CapNhatHocSinh from "./capnhathocsinh";
import axios from "axios";
// import ModalXepLopHsKhiBietMa from "./ModalXepLopHsKhiBietMa";
import HocsinhCC6 from "../../../components/schools/hocsinhCC6";
import XoaBienDong from "./xoabiendong";
const { Option } = Select;
const { Text } = Typography;
const datasheetInit = [
  [
    { value: "\xa0\xa0 STT \xa0\xa0", readOnly: true },
    { value: "\xa0\xa0\xa0\xa0 HocSinhID \xa0\xa0\xa0\xa0", readOnly: true },
  ],
];
const Students = () => {
  const [isShowingCreateClass, setIsShowingCreateClass] = useState(false);
  const [selectedStudentsXepLop, setSelectedStudentsXepLop] = useState([]);
  const [listStudents, setListStudents] = useState([]);
  const [listStudentsLenLop, setListStudentsLenLop] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listDotDiems, setListDotDiems] = useState([]);
  const [isLoadingXepLop, setIsLoadingXepLop] = useState(false);
  const [selectedDotDiemID, setSelectedDotDiemID] = useState("");
  const [lopInfo, setLopInfo] = useState({});
  const [DDIDList, setDDIDList] = useState([]);
  const [LoaiBienDongs, setLoaiBienDongs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listStudents1, setListStudents1] = useState([]);
  const [isShowModalHsBiThieu, setisShowModalHsBiThieu] = useState(false);
  //modal se hien de dang ki bien dong loai nào
  //1. display chuyển đi ngoài tỉnh
  //2. display chuyển đi trong thành phố
  //3. display thôi học
  const [selectedLoaiBienDong, setselectedLoaiBienDong] = useState();
  const [isShowBienDong, setisShowBienDong] = useState();
  //modal Tiep Nhan Học Sinh Đầu Cấp
  const [isShowModalHsDauCap, setIsShowModalHsDauCap] = useState(false);
  const [listStudentsTiepNhan, setListStudentsTiepNhan] = useState([]);

  const [selectedStudentsTiepNhan, setSelectedStudentsTiepNhan] = useState([]);
  //modal Tiep Nhan Học Sinh Bị Thiếu
  //modal tiep nhan hoc sinh khi da biet ma
  const [isShowModalHsDauCapIdentifyID, setIsShowModalHsDauCapIdentifyID] =
    useState(false);
  //modal Chuyển Sang Lớp Khác Cho Học Sinh
  const [isShowModalChuyenLop, setIsShowModalChuyenLop] = useState(false);
  const [lops, setLops] = useState([]);
  const [lopChon, setLopChon] = useState("");
  const [hocSinhID, setHocSinhID] = useState([]);
  const [isShowModalDsBienDong, SetIsShowModalDsBienDong] = useState(false);
  // get Info Truong
  const [infoSchool, setInfoSchool] = useState([]);
  const [showModalChuyenLop, setShowModalChuyenLop] = useState(false);
  const showModalDsBienDong = (params) => {
    SetIsShowModalDsBienDong(params);
  };
  const [isShowModalHSCC, setIsShowModalHSCC] = useState(false);
  // open modal xếp lớp học sinh lơ lửng
  const [isShowModalXLHSLL, SetIsShowModalXLHSLL] = useState(false);
  // open modal cap nhat hs
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [rowRecord, setRowRecord] = useState([]);
  //open modal xoa bien dong
  const [showModalXoaBienDong, setShowModalXoaBienDong] = useState(false);
  const showModalXLHSLL = (params) => {
    SetIsShowModalXLHSLL(params);
  };
  const openModalChuyenLop = async () => {
    await schoolApi.getLopsByKhoi(namID, lopInfo.Khoi).then((res) => {
      setLops(res.Result);
      setIsShowModalChuyenLop(true);
    });
  };
  const changeLops = (lopID) => {
    setLopChon(lopID);
  };
  const SubmitChuyenLop = async () => {
    const data = {
      LopID: lopChon,
      HocSinhID: [hocSinhID],
    };
    await schoolApi.xepLopHocSinh(data).then(async (res) => {
      if (res.StatusCode === 200) {
        message.success("Thành công");
        setIsLoading(true);
        await schoolApi.getHsByLopID(lopID, selectedDotDiemID).then((res) => {
          setListStudents(res.Result);
          setIsLoading(false);
          setIsShowModalChuyenLop(false);
        });
      } else {
        message.error(res.Message);
      }
    });
  };
  const ReloadPage = async () => {
    await schoolApi.getHsByLopID(lopID, selectedDotDiemID).then((res) => {
      setListStudents(res.Result);
      setIsLoading(false);
    });
  };
  const GetInfoSchool = async () => {
    await schoolAPI.getTruongInfobyID().then(function (res) {
      if (res.StatusCode === 200) setInfoSchool(res.Result);
    });
  };
  //khởi tạo datasheet
  const [grid, setGrid] = useState(() => {
    for (let index = 1; index <= 60; index++) {
      datasheetInit.push([{ value: index, readOnly: true }, { value: "" }]);
    }
    return datasheetInit;
  });
  // const [grid, setGrid] = useState(datasheetInit)
  const [form] = Form.useForm();
  const [formXepLopHS] = Form.useForm();
  ///
  const onSelectChange = (students) => {
    setSelectedStudentsXepLop(students);
  };
  let history = useHistory();
  const { lopID, namID } = useParams();
  const getDotDiemByYear = async () => {
    const result = await globalAPI.getDotDiemByYear(namID).then(async (res) => {
      setDDIDList(res.Result);
    });
  };
  const getDefaultDotDiem = () => {
    return selectedDotDiemID;
  };
  const onChangeDotDiem = async (dotDiemId) => {
    setSelectedDotDiemID(dotDiemId);
    setIsLoading(true);
    await schoolApi.getHsByLopID(lopID, dotDiemId).then((res) => {
      setListStudents(res.Result);
      setIsLoading(false);
    });
  };
  const deleteHocSinh = async (HocSinhID) => {
    const result = await schoolApi.PostDeleteHS(HocSinhID);
    if (result.statusCode === 200) {
      message.success("Xóa thành công");
      ReloadPage();
    } else {
      message.error(result.message);
    }
  };
  useEffect(() => {
    getDotDiemByYear();
    GetInfoSchool();
    const getData = async () => {
      await globalAPI.getDotDiemByYear(namID).then(async (res) => {
        setListDotDiems(res.Result);
        setSelectedDotDiemID(res.Result[res.Result.length - 1].DotDiemID);
        await schoolApi
          .getHsByLopID(lopID, res.Result[res.Result.length - 1].DotDiemID)
          .then((res) => {
            setListStudents(res.Result);
            setIsLoading(false);
          });
      });
      await globalAPI.getLopById(lopID).then((res) => {
        setLopInfo(res.Result[0]);
      });
      await globalAPI.getDMLoaiBienDong().then((res) => {
        setLoaiBienDongs(res.Result);
      });
    };
    getData();
  }, []);
  const getHsLenLop = async () => {
    setIsLoading(true);
    console.log(lopInfo);
    await schoolApi.getHsLenLop(lopInfo.Khoi - 1).then((res) => {
      setListStudentsLenLop(res.Result);
      setIsLoading(false);
    });
  };
  const getHsLuuBan = async () => {
    setIsLoading(true);
    await schoolApi.getHsLenLop(lopInfo.Khoi).then((res) => {
      setListStudentsLenLop(res.Result);
      setIsLoading(false);
    });
  };
  const xepLopHs = async () => {
    setIsLoadingXepLop(true);
    const data = {
      LopID: lopID,
      DotDiemID: listDotDiems[listDotDiems.length - 1].DotDiemID,
      HocSinhID: selectedStudentsXepLop,
    };
    await schoolApi.xepLopHocSinh(data).then(async (res) => {
      setIsLoadingXepLop(false);
      if (res.StatusCode === 200) {
        setIsShowingCreateClass(false);
        message.success("Thành công");
        setIsLoading(true);
        await schoolApi.getHsByLopID(lopID, selectedDotDiemID).then((res) => {
          setListStudents(res.Result);
          setIsLoading(false);
        });
      } else {
        message.error(res.Message);
      }
    });
  };
  //Tìm kiếm Học Sinh Theo HocSinhID
  const searchStudentByHocSinhId = async () => {
    let NgaySinh = moment(
      form.getFieldValue("NgaySinh").format("YYYY-MM-DD")
    ).format();
    let request = {
      ...form.getFieldValue(),
      NgaySinh: NgaySinh,
    };
    form.validateFields().then(async () => {
      await schoolApi.searchHocSinh(request).then((res) => {
        if (res.StatusCode === 200 && res.Result.length < 1) {
          message.warning("Không tồn tại học sinh với thông tin đã nhập");
        } else {
          setListStudentsTiepNhan(res.Result);
        }
      });
    });
  };
  //Tiếp nhận học sinh
  const resetForm = () => {
    form.resetFields();
  };
  const getHocSinhTuyenSinh10 = async () => {
    await schoolApi.getHocSinhTrungTuyen10(namID).then((res) => {
      setListStudentsTiepNhan(res.Result);
    });
  };
  const onSelectHSTiepNhan = (students) => {
    setSelectedStudentsTiepNhan(students);
  };
  //tiep nhan hoc sinh bi thieu
  const onSelectChangeRow = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const submitTiepNhanHSBiThieu = () => {
    setIsLoading(true);
    form.validateFields().then(async function () {
      let NgaySinh = moment(
        form.getFieldValue("ngaySinh").format("YYYY-MM-DD")
      ).format("YYYY-MM-DD");
      let request = {
        hocSinh: [{ ...form.getFieldValue(), ngaySinh: NgaySinh }],
        lopID: lopID,
      };
      await schoolApi.postTiepNhanHocSinhBiThieu(request).then(async (res) => {
        if (res.statusCode === 200) {
          message.success("Thành công");
          resetForm();
        } else {
          message.error("Lỗi: " + res.message);
        }
        setIsLoading(false);
      });
    });
  };

  //tiep nhan hoc sinh dau cap
  const submitTiepNhanHS = async () => {
    let resquest = {
      HocSinhID: selectedStudentsTiepNhan,
      LopId: lopID,
    };
    await schoolApi.tiepNhanHocSinhDauCap(resquest).then(async (res) => {
      if (res.StatusCode === 200) {
        message.success("Thành công");
        await schoolApi
          .getHsByLopID(lopID, selectedDotDiemID)
          .then((res) => setListStudents(res.Result));
        resetForm();
      } else {
        message.error("Lỗi: " + res.Message);
        resetForm();
      }
    });
  };
  const postXepLopHsChuaXepLop = async () => {
    formXepLopHS.validateFields().then(async function () {
      setIsLoading(true);
      const data = {
        LopID: lopID,
        HocSinhID: selectedRowKeys,
      };
      await schoolApi.xepLopHocSinhDotDiem(data).then(async (res) => {
        if (res.StatusCode === 200) {
          message.success("Thành công");
          formXepLopHS.resetFields();
          setIsLoading(false);
          await schoolApi.getHsByLopID(lopID, selectedDotDiemID).then((res) => {
            setListStudents(res.Result);
          });
        } else {
          message.error(res.Message);
        }
      });
    });
  };
  const handleSbmitTiepNhanWithMuti = async () => {
    const hocSinhID = [];
    grid.shift();
    grid
      .filter((s) => s[1].value !== "")
      .map((s) => {
        hocSinhID.push(s[1].value.trim());
      });
    let resquest = {
      HocSinhID: hocSinhID,
      LopId: lopID,
    };
    await schoolApi.tiepNhanHocSinhDauCap(resquest).then(async (res) => {
      if (res.StatusCode === 200) {
        message.success("Thành công");
        await schoolApi
          .getHsByLopID(lopID, selectedDotDiemID)
          .then((res) => setListStudents(res.Result));
      } else {
        message.error("Lỗi: " + res.Message + " " + res.Result.join(", "));
      }
    });
  };
  const columnsHsLenLop = [
    {
      title: "HocSinhID",
      dataIndex: "HocSinhID",
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
      title: "Tên Cha",
      dataIndex: "TenCha",
    },
    {
      title: "Tên Mẹ",
      dataIndex: "TenMe",
    },
    {
      title: "Lớp cũ",
      dataIndex: "TenLop",
      sorter: (a, b) => a.TenLop.length - b.TenLop.length,
    },
  ];
  const SelectDotDiem = () => {
    return (
      <Select
        key="2"
        placeholder="Chọn Đợt Điểm"
        style={{ width: 200 }}
        onChange={onChangeDotDiem}
      >
        {DDIDList.map((value) => (
          <Option key={value.DotDiemID} value={value.DotDiemID}>
            {value.TenDotDiem}
          </Option>
        ))}
      </Select>
    );
  };
  const columnsDefault = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
      fixed: "left",
    },
    {
      title: "HocSinhID",
      dataIndex: "HocSinhID",
      fixed: "left",
    },
    {
      title: "Họ",
      dataIndex: "Ho",
      fixed: "left",
    },
    {
      title: "Tên",
      dataIndex: "Ten",
      fixed: "left",
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      fixed: "left",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    // {
    //   title: "Tên lớp",
    //   dataIndex: "tenlop",
    // },
    {
      title: "Tên cha",
      dataIndex: "TenCha",
    },
    {
      title: "Điện Thoại",
      dataIndex: "SDTCha",
    },
    {
      title: "Tên mẹ",
      dataIndex: "TenMe",
    },
    {
      title: "Điện Thoại",
      dataIndex: "SDTMe",
    },
    {
      title: "Tên Người Giám Hộ",
      dataIndex: "TenNguoiGiamHo",
    },
    {
      title: "Điện Thoại",
      dataIndex: "SDTNguoiGiamHo",
    },
  ];
  //datatable thêm hs bằng mã hs
  const columnsDataTable = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "HocSinhID",
      dataIndex: "hocSinhID",
    },
    {
      title: "Họ",
      dataIndex: "ho",
      key: "ho",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      key: "ngaySinh",
    },
    {
      title: "Nơi sinh",
      dataIndex: "noiSinh",
      key: "noiSinh",
    },
    {
      title: "Lớp ID",
      dataIndex: "lopID",
      key: "lopID",
    },
    {
      title: "Tên lớp",
      dataIndex: "tenLop",
      key: "tenLop",
    },
    {
      title: "Tên Trường",
      dataIndex: "tenTruong",
      key: "tenTruong",
    },
    {
      title: "Lí Do Biến Động",
      dataIndex: "lyDoBienDong",
      key: "lyDoBienDong",
    },
  ];
  const menuBienDong = (
    <Menu>
      <Menu.Item onClick={openModalChuyenLop} key="1">
        Chuyển lớp
      </Menu.Item>
      {LoaiBienDongs.filter((s) => s.Nhom === 3).map((s) => (
        <Menu.Item
          key={s.LoaiID}
          onClick={() => {
            setselectedLoaiBienDong(3);
            setisShowBienDong(true);
          }}
        >
          {s.TenLoai}
        </Menu.Item>
      ))}
    </Menu>
  );
  const columnsStudents = [
    ...columnsDefault,
    {
      title: "Nơi sinh",
      dataIndex: "NoiSinh",
    },
    {
      title: "Địa chỉ Hộ Khẩu",
      render: (text, record, index) => {
        return (
          record.HoKhau_DiaChi +
          " " +
          record.HoKhau_Xa +
          "," +
          record.HoKhau_Huyen +
          "," +
          record.HoKhau_Tinh
        );
      },
    },
    {
      title: "Địa chỉ Thường Trú",
      render: (text, record, index) => {
        return (
          record.DCTT_DiaChi +
          " " +
          record.DiaChi_Xa +
          "," +
          record.DiaChi_Huyen +
          "," +
          record.DiaChi_Tinh
        );
      },
    },
    {
      title: "CMND/CCCD",
      dataIndex: "CMND",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Tôn Giáo",
      dataIndex: "TenTonGiao",
    },
    {
      title: "Đối Tượng Chính Sách",
      dataIndex: "TenDTCS",
    },
    {
      title: "Thao tác",
      key: "tags",
      dataIndex: "tags",
      fixed: "right",
      width: 250,
      render: (text, record) => {
        //  lopInfo.Khoi === 6 || lopInfo.Khoi === 10 ?
        return (
          <Space size="middle">
            <Button
              danger
              onClick={() => {
                console.log(record);
                setRowRecord(record);
                setShowModalUpdate(true);
              }}
            >
              <UserSwitchOutlined /> Cập nhật
            </Button>
            <Button
              type="secondary"
              onClick={() => {
                deleteHocSinh(record.HocSinhID);
              }}
            >
              <EyeFilled /> Xóa
            </Button>
          </Space>
        );

        //: null;
        // const date = new Date();
        // if (
        //   namID ===
        //     (date.getMonth() + 1 >= 8
        //       ? date.getFullYear()
        //       : date.getFullYear() - 1) &&
        //   selectedDotDiemID === listDotDiems[listDotDiems.length - 1].DotDiemID
        // ) {
        //   return (
        //     <Space size="middle">
        //       <Dropdown overlay={menuBienDong}>
        //         <Button
        //           danger
        //           onClick={() => {
        //             setHocSinhID(record.HocSinhID);
        //           }}
        //         >
        //           <UserSwitchOutlined /> Biến động
        //         </Button>
        //       </Dropdown>
        //       <Button
        //         type="secondary"
        //         onClick={() => {
        //           showModalDsBienDong(true);
        //         }}
        //       >
        //         <EyeFilled /> Ds Biến Động
        //       </Button>
        //     </Space>
        //   );
        // }
      },
    },
  ];
  const columnsHsDauCap = [
    ...columnsDefault,
    {
      title: "Trường tốt nghiệp THCS",
      dataIndex: "TenTruong",
    },
  ];
  //Cac phim chuc nang
  const functionButton = [
    <Select
      key="1"
      placeholder="Chọn Đợt Điểm"
      value={getDefaultDotDiem()}
      style={{ width: 200 }}
      onChange={onChangeDotDiem}
    >
      {DDIDList.map((value) => (
        <Option key={value.DotDiemID} value={value.DotDiemID}>
          {value.TenDotDiem}
        </Option>
      ))}
    </Select>,
    <Button
      key="2"
      type="primary"
      onClick={() => {
        setIsShowingCreateClass(true);
        getHsLenLop();
      }}
    >
      <PlusSquareOutlined /> THÊM HOC SINH TỪ NĂM HỌC CŨ
    </Button>,
    <Button
      key="3"
      type="primary"
      disabled={false}
      onClick={() => {
        setIsShowingCreateClass(true);
        getHsLuuBan();
      }}
    >
      <PlusSquareOutlined /> THÊM HOC SINH LƯU BAN
    </Button>,
    <Button
      key="4"
      type="primary"
      onClick={async () => {
        setIsLoading(true);
        // await getHsBiThieu();
        setisShowModalHsBiThieu(true);
        setIsLoading(false);
      }}
    >
      <PlusSquareOutlined /> TIẾP NHẬN HỌC SINH
    </Button>,
    <Button
      key="6"
      type="primary"
      disabled={infoSchool.IsGDTX === true ? false : true}
      onClick={() => history.push(`/nophocsinh/${lopID}`)}
    >
      <PlusSquareOutlined /> HỌC SINH MỚI (GDTX)
    </Button>,
    <Button
      key="8"
      type="primary"
      onClick={() => {
        setShowModalChuyenLop(true);
      }}
    >
      <PlusSquareOutlined /> CHUYỂN LỚP
    </Button>,
    <Button
      key="9"
      type="primary"
      onClick={() => {
        setShowModalXoaBienDong(true);
      }}
    >
      <PlusSquareOutlined /> BIẾN ĐỘNG
    </Button>,
  ];
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Danh sách học sinh lớp"
        extra={
          lopInfo
            ? lopInfo.Khoi !== 6
              ? lopInfo.Khoi === 10
                ? [
                    ...functionButton,
                    // <Button
                    //   key="2"
                    //   type="primary"
                    //   onClick={() => {
                    //     setIsShowModalHsDauCap(true);
                    //     //load du lieu hoc sinh dau cap
                    //     getHocSinhTuyenSinh10();
                    //   }}
                    // >
                    //   <PlusSquareOutlined /> TIẾP NHẬN HỌC SINH ĐẦU CẤP
                    // </Button>,
                    // <Button
                    //   key="7"
                    //   type="primary"
                    //   onClick={() => {
                    //     history.push(`/nophocsinh10ngoaitinh/${lopID}`);
                    //   }}
                    // >
                    //   <PlusSquareOutlined /> THÊM HỌC SINH 10 NGOÀI TỈNH
                    // </Button>,
                    <Button
                      key="10"
                      type="primary"
                      onClick={() => history.push(`/nophocsinh/${lopID}`)}
                    >
                      <PlusSquareOutlined /> THÊM HỌC SINH 10 NGOÀI TỈNH
                    </Button>,
                  ]
                : functionButton
              : [
                  ...functionButton,
                  <Button
                    key="10"
                    type="primary"
                    onClick={() => history.push(`/nophocsinh/${lopID}`)}
                  >
                    <PlusSquareOutlined /> HỌC SINH MỚI
                  </Button>,
                ]
            : null
        }
      >
        <Table
          columns={columnsStudents}
          dataSource={listStudents}
          pagination={false}
          loading={isLoading}
          rowKey="HocSinhID"
          scroll={{ x: 2500 }}
        />
      </PageHeader>
      <Modal
        visible={isShowingCreateClass}
        title={`Danh sách học sinh năm học ${
          moment().year() - 1
        }-${moment().year()}`}
        onOk={() => setIsShowingCreateClass(false)}
        onCancel={() => setIsShowingCreateClass(false)}
        width="1024px"
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsShowingCreateClass(false);
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => xepLopHs()}
            disabled={isLoadingXepLop}
          >
            Chọn
          </Button>,
        ]}
      >
        <Table
          rowSelection={{ selectedStudentsXepLop, onChange: onSelectChange }}
          columns={columnsHsLenLop}
          dataSource={listStudentsLenLop}
          pagination={false}
          rowKey="HocSinhID"
          loading={isLoading}
        />
      </Modal>
      {/* Tiep Nhan Hoc Sinh Bi Thieu */}
      <Modal
        visible={isShowModalHsBiThieu}
        title={`Tìm kiếm và tiếp nhận học sinh`}
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          setisShowModalHsBiThieu(false);
          resetForm();
        }}
        width="1200px"
        footer={[
          // <Button key="submit" onClick={postXepLopHsChuaXepLop}>
          //   Xếp lớp
          // </Button>,
          <Button
            key="back"
            onClick={() => {
              setisShowModalHsBiThieu(false);
              resetForm();
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <Form form={form} validateMessages={{ required: "Chưa Nhập" }}>
          <Row>
            <Col span={8}>
              <Form.Item
                name="ho"
                rules={[{ required: true }]}
                label="Họ và tên"
              >
                <Input placeholder="Họ" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ten" rules={[{ required: true }]}>
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ngaySinh" rules={[{ required: true }]}>
                <DatePicker
                  placeholder="nhập ngày-tháng-năm"
                  format="DD-MM-YYYY"
                  style={{ height: "auto", width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="tenCha"
                rules={[{ required: true }]}
                label="Họ Tên Phụ Huynh"
              >
                <Input placeholder="Cha" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="tenMe" rules={[{ required: true }]}>
                <Input placeholder="Mẹ" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="tenNguoiGiamHo" rules={[{ required: true }]}>
                <Input placeholder="Người Giám Hộ (không có ghi không)" />
              </Form.Item>
            </Col>
            {/* <Col span={15}>
              <Form.Item
                name="LyDoBienDong"
                rules={[{ required: true }]}
                label="Lý Do"
              >
                <Input />
              </Form.Item>
            </Col> */}
            {/* <Col span={9}>
              <Form.Item name="DotDiemID" rules={[{ required: true }]}>
                <Select placeholder="Chọn Hoc kỳ chuyển về trường">
                  {DDIDList.map((value) => (
                    <Option key={value.DotDiemID} value={value.DotDiemID}>
                      {value.TenDotDiem}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Button
                style={{ margin: "0 50%" }}
                key="tn"
                type="secondary"
                onClick={() => submitTiepNhanHSBiThieu()}
              >
                Chuyển Học Sinh
              </Button>
              ,
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* Tiep Nhan Hoc Sinh Dau Cap */}
      <Modal
        visible={isShowModalHsDauCap}
        title={`Tìm kiếm và tiếp nhận học sinh đầu cấp`}
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          setIsShowModalHsDauCap(false);
          resetForm();
        }}
        width="1200px"
        footer={[
          <Button type="secondary" onClick={() => submitTiepNhanHS()}>
            Tiếp nhận
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setIsShowModalHsDauCap(false);
              resetForm();
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <Form form={form} name="horizontal_login" layout="inline">
          <Form.Item name="Ho" rules={[{ required: true }]} label="Họ">
            <Input />
          </Form.Item>
          <Form.Item name="Ten" rules={[{ required: true }]} label="Tên">
            <Input />
          </Form.Item>
          <Form.Item
            name="NgaySinh"
            rules={[{ required: true }]}
            label="Ngày Sinh"
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={searchStudentByHocSinhId}>
              <SearchOutlined />
              Tìm Kiếm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                setIsShowModalHsDauCapIdentifyID(true);
                setIsShowModalHsDauCap(false);
              }}
            >
              <FileExcelOutlined />
              Thêm khi đã biết mã học sinh
            </Button>
          </Form.Item>
        </Form>
        <br />
        <Table
          columns={columnsHsDauCap}
          rowSelection={{
            selectedStudentsTiepNhan,
            onChange: onSelectHSTiepNhan,
          }}
          dataSource={listStudentsTiepNhan}
          pagination={false}
          rowKey="HocSinhID"
        />
      </Modal>
      <Modal
        visible={isShowModalHsDauCapIdentifyID}
        title={`Tiếp nhận học sinh đầu cấp khi đã biết mã học sinh`}
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          setIsShowModalHsDauCapIdentifyID(false);
        }}
        maskClosable={false}
        width="300px"
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => {
              handleSbmitTiepNhanWithMuti();
            }}
          >
            Nộp
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setIsShowModalHsDauCapIdentifyID(false);
              resetForm();
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <Text type="danger">
          Có thể dán từ file excel với số lượng tối đa 60 mã học sinh
        </Text>
        <ReactDataSheet
          data={grid ? grid : []}
          valueRenderer={(cell) => cell.value}
          onCellsChanged={(changes) => {
            const grids = grid.map((row) => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grids[row][col] = { ...grids[row][col], value };
            });
            setGrid(grids);
          }}
        />
      </Modal>
      <Modal
        visible={isShowModalChuyenLop}
        title="Chuyển Lớp"
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          setIsShowModalChuyenLop(false);
        }}
        maskClosable={false}
        width="300px"
        footer={[
          <Button type="primary" key="submit" onClick={SubmitChuyenLop}>
            Xác nhận
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setIsShowModalChuyenLop(false);
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <Select
          key="1"
          placeholder="Chọn Lớp"
          style={{ width: 200 }}
          onChange={changeLops}
        >
          {lops.map((value) => (
            <Option key={value.LopID} value={value.LopID}>
              {value.TenLop}
            </Option>
          ))}
        </Select>
        <br />
        <Text>
          Học sinh đã chọn:<span> {hocSinhID}</span>
        </Text>
      </Modal>
      <Modal
        visible={isShowBienDong}
        title="Biến động"
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          setisShowBienDong(false);
        }}
        maskClosable={false}
        width="1200px"
      >
        {selectedLoaiBienDong === 3 ? (
          <LeaveSchool
            HocSinhID={hocSinhID}
            LoaiBienDongID={selectedLoaiBienDong}
          />
        ) : null}
      </Modal>
      <ModalDanhSachBienDong
        title="Danh sách biến động"
        isShowModal={isShowModalDsBienDong}
        ShowModalF={showModalDsBienDong}
      />
      <Modal
        visible={showModalChuyenLop}
        maskClosable={true}
        footer={null}
        onCancel={() => setShowModalChuyenLop(false)}
        width="1200px"
      >
        <ChuyenLop
          studentL={listStudents}
          CurrentClass={lopInfo}
          CurrentYear={namID}
          ReloadPage={ReloadPage}
        />
      </Modal>
      {/* <ModalXepLopHsKhiBietMa
        title="Thêm Học Sinh Đã Được Cấp Mã"
        isShowModal={isShowModalXLHSLL}
        ShowModalF={showModalXLHSLL}
      /> */}
      <Modal
        onCancel={() => {
          setIsShowModalHSCC(false);
          ReloadPage();
        }}
        title="HOC SINH CHUYỄN CẤP 6"
        visible={isShowModalHSCC}
        footer={null}
        width="1280px"
      >
        <HocsinhCC6 lopId={lopID} />
      </Modal>
      <CapNhatHocSinh
        record={rowRecord}
        ReloadPage={ReloadPage}
        showModal={showModalUpdate}
        setCloseModal={() => {
          setShowModalUpdate(false);
        }}
      />
      <XoaBienDong
        CurYear={2021}
        ReloadPage={ReloadPage}
        LopID={lopID}
        showModal={showModalXoaBienDong}
        setCloseModal={() => {
          setShowModalXoaBienDong(false);
        }}
      />
    </>
  );
};
export default Students;
