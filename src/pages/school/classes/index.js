import React, { useState, useEffect, useRef } from "react";
import {
  PageHeader,
  Button,
  Table,
  Space,
  Modal,
  Select,
  message,
  Row,
} from "antd";
import {
  PlusSquareOutlined,
  EyeFilled,
  DeleteOutlined,
  EditOutlined,
  FileExcelFilled,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import schoolApi from "../../../apis/schoolApi";
import Helper from "../../../components/Helper/index";
import { CSVLink } from "react-csv";
import ModalCreateUpdateClass from "../classes/ModalCreate_UpdateClass";
import ModalUpdateSchool from "../School/ModalUpdateSchool";
const { Option } = Select;
const showhleper = JSON.parse(sessionStorage.getItem("SHOWHELPER"));
const Classes = () => {
  let history = useHistory();
  const [isShowingCreateClass, setIsShowingCreateClass] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [Lops, setLops] = useState([]);
  const [PGDTams, setPGDTams] = useState([]);
  const [DotDiems, setDotDiems] = useState([]);
  const [Year, setYear] = useState(1);
  const [isShowCreateButton, setIsShowCreateButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingHelper, setIsShowingHelper] = useState(
    //showhleper === true ? false : true
    false
  );
  const [dataUpdate, setDataUpdate] = useState({});
  // cap nhật trường
  const [showModalSchool, setShowModalSchool] = useState(false);
  /////////
  const csvLink = useRef(null);
  //Excel file download
  const [studentsAll, setStudentsAll] = useState([]);
  const handleDownloadExcelStudents = async () => {
    debugger;
    await schoolApi
      .getHocSinhInfobyTruongID(16)
      .then((res) => setStudentsAll(res.Result));
    csvLink.current.link.click();
  };
  //End
  //cap nhat truong function
  const showModalSchoolF = () => {
    setShowModalSchool(false);
  };
  ////
  const deleteLop = async (record) => {
    await schoolApi.xoaLop(record).then((res) => {
      if (res.StatusCode === 200) {
        message.success("Thành công");
        let lops = [...Lops];
        lops.splice(
          lops.findIndex((x) => x.LopID === record.LopID),
          1
        );
        setLops(lops);
      } else {
        message.error("Lỗi: " + res.Message);
      }
    });
  };
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Lớp Id",
      dataIndex: "LopID",
      key: "LopID",
    },
    {
      title: "Tên Lớp",
      dataIndex: "TenLop",
      //render: text =>{text},
    },
    {
      title: "Khối",
      dataIndex: "Khoi",
    },
    {
      title: "Phòng Giáo dục",
      dataIndex: "TenPGD",
    },
    {
      title: "Lớp 2 Buổi",
      dataIndex: "LopHoc2Buoi",
      key: "LopHoc2Buoi",
      render: (text) => (text === true ? "Có" : "Không"),
    },
    {
      title: "Thao tác",
      key: "LopID",
      dataIndex: "LopID",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/danhsachhocsinh/${text}/${Year}`}>
            <Button type="secondary">
              <EyeFilled />
              Xem học sinh
            </Button>
          </Link>
          <Button
            onClick={() => {
              setIsShowingCreateClass(true);
              setTitleModal("Cập Nhật Lớp");
              setDataUpdate(record);
            }}
            danger
          >
            <EditOutlined /> Cập Nhật
          </Button>
          <Button
            onClick={() => {
              deleteLop(record);
            }}
            type="danger"
          >
            <DeleteOutlined /> Xóa
          </Button>
        </Space>
      ),
    },
  ];
  //function
  const getClass = async (year, pgds) => {
    setIsLoading(true);
    const lop = await schoolApi.getClass(year);
    let result = lop.Result.map((value) => {
      var pgd = pgds.findIndex((x) => x.PGDID === value.PGDID);

      return {
        ...value,
        TenPGD: pgd === -1 ? "TRỰC THUỘC SỞ" : pgds[pgd].TenPGD,
      };
    });
    setLops(result);
    setIsLoading(false);
  };

  const getDefaultYear = () => {
    return Year;
  };
  const changeYear = async (year) => {
    if (year === DotDiems[DotDiems.length - 1].NamHocID) {
      setIsShowCreateButton(false);
    } else {
      setIsShowCreateButton(true);
    }
    setYear(year);
    getClass(year, PGDTams);
  };
  const ReloadClassF = () => {
    getClass(Year, PGDTams);
  };
  const isShowModalF = (param) => {
    setIsShowingCreateClass(param);
  };
  function onlyUnique(value, index, self) {
    return self.findIndex((x) => x.NamHocID === value.NamHocID) === index;
  }
  //khoi tao
  useEffect(() => {
    const laydata = async () => {
      try {
        const respone = await schoolApi.getPGD();
        const dotdiem = await schoolApi.getDotDiem();
        setDotDiems(dotdiem.Result);
        setIsLoading(false);
        setPGDTams(respone.Result);
        let unique = dotdiem.Result.filter(onlyUnique);
        setDotDiems(unique);
        setYear(unique[unique.length - 1].NamHocID);
        getClass(unique[unique.length - 1].NamHocID, respone.Result);
        //setDataLop({"Khoi":6,"TenLop":"test","PGDID":4838});
      } catch (error) {
        console.log("Loi", error);
      }
    };
    laydata();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Danh sách lớp"
        extra={[
          <Select
            key="1"
            showSearch
            style={{ width: 100 }}
            value={getDefaultYear()}
            onChange={changeYear}
          >
            {DotDiems.map((value) => (
              <Option key={value.NamHocID} value={value.NamHocID}>
                {value.NamHocID}
              </Option>
            ))}
          </Select>,
          <Button
            key="2"
            type="primary"
            onClick={() => {
              setIsShowingCreateClass(true);
              setTitleModal("Tạo Mới Lớp");
              setDataUpdate(null);
            }}
            disabled={isShowCreateButton}
          >
            <PlusSquareOutlined /> TẠO LỚP MỚI
          </Button>,

          <Button
            key="3"
            danger
            onClick={() => {
              setShowModalSchool(true);
            }}
          >
            Thông tin trường
          </Button>,
          <CSVLink key="4" data={studentsAll} ref={csvLink}></CSVLink>,
          <Button
            key="5"
            onClick={() => handleDownloadExcelStudents()}
            type="primary"
          >
            DỮ LIỆU TOÀN TRƯỜNG(excel)
          </Button>,
          <Button
            key="6"
            type="primary"
            onClick={() => {
              setIsShowingHelper(true);
            }}
            disabled={isShowCreateButton}
          >
            <PlusSquareOutlined /> HƯỚNG DẪN PHẦN MỀM
          </Button>,
          <Button
            key="7"
            type="primary"
            onClick={() => history.push(`/formbaocao`)}
          >
            <PlusSquareOutlined /> Báo Cáo
          </Button>,
        ]}
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={Lops}
        rowKey="LopID"
        loading={isLoading}
        pagination={false}
      />
      {/* <EditableTable datas={Lops} isUpdate={isUpdate} /> */}
      <ModalCreateUpdateClass
        title={titleModal}
        dataUpdate={dataUpdate}
        PGDs={PGDTams}
        isShowModal={isShowingCreateClass}
        ShowModalF={isShowModalF}
        ReloadClassF={ReloadClassF}
      />
      <Modal
        width="1024px"
        visible={isShowingHelper}
        title="Hướng dẫn"
        onCancel={() => {
          setIsShowingHelper(false);
          sessionStorage.setItem("SHOWHELPER", true);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsShowingHelper(false);
              sessionStorage.setItem("SHOWHELPER", true);
            }}
          >
            Dóng
          </Button>,
        ]}
      >
        <Row type="flex" justify="center" align="middle">
          <Helper />
        </Row>
      </Modal>
      <ModalUpdateSchool
        showModalSchool={showModalSchool}
        showModalSchoolF={showModalSchoolF}
      />
    </>
  );
};
export default Classes;
