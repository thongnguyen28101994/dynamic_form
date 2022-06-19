import React, { useState, useEffect, useRef } from "react";
import ImageUploader from 'react-images-upload';

import style from './style.module.css';
import {
  PageHeader,
  Button,
  Table,
  Space,
  Modal,
  message,
  Input,

} from "antd";
import {
  CloudUploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SlideShow from 'react-image-show';
import Highlighter from 'react-highlight-words';
import moment from "moment";
import { useHistory } from "react-router-dom";
import globalAPI from "../../apis/globalApi";
import schoolAPI from "../../apis/schoolApi";



const HsChuyenDen = () => {
  const [listStudents1, setListStudents1] = useState([]);
  const [dataHoso, setDataHoso] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [autoID, setAutoID] = useState();
  const [pictures, setPictures] = useState([]);
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();
  const searchInput = useRef(null);
  const [accountType, setAccountType] = useState();
  const [isModalLoading, setIsModalLoading] = useState(false);
  let fileNames = ["GiThTrngDi", "GiThChTrng", "HocBa", "BangTNTHCS", "KhaiSinh", "TrungTuyen10", "CuTru", "PhieuDiem", "XNHanhKiem", "DonChuyenTruong"];

  const onDrop = picture => {
    // setSelectedFile(picture[0]);
    setPictures(picture[0]);
  };
  const getAccountType = async () => {
    await globalAPI.getSession().then((res) => {
      setAccountType(res.Result[0].AccountType)
    });
  };
  let history = useHistory();
  useEffect(() => {
    getAccountType();
    getData();
  }, []);
  const getData = async () => {
    await schoolAPI.getHocSinhChuyenDenModel().then((res) => {
      setListStudents1(res.result);
      setIsLoading(false);
    });
  };
  const getDataHoso = async (id) => {
    setShowModal(true);
    setAutoID(id)
    await schoolAPI.getHSChuyenDenHoSo(id).then((res) => {
      console.log(res.result);
      setDataHoso(res.result);
      setIsLoading(false);
    });
  };
  const submitForm = async (fileName) => {
    const formData = new FormData();
    formData.append("File", pictures);
    await schoolAPI.postUploadFile(autoID, fileName, formData)
      .then((res) => {
        if (res.statusCode === 200) {
          setTimeout(() => {
            getDataHoso(autoID);
            message.success("Thành công");
          }, 6000);

        }
        else {
          message.error(res.message);
        }
      })
  };
  const deleteImg = async (id) => {
    await schoolAPI.deleteImageHSChuyenDenHoSo(id)
      .then((res) => {
        if (res.statusCode === 200) {
          setTimeout(() => {
            getDataHoso(autoID);
            message.success("Thành công");
          }, 6000);

        }
        else {
          message.error(res.Message);
        }
      })
  };




  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput
          }
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });

              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div >
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)

  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  //tiep nhan hoc sinh dau cap
  //datatable thêm hs bằng mã hs
  const columnsDataTable = [
    {
      title: "Phòng giáo dục",
      dataIndex: "tenPGD",
      key: "tenPGD",
      ...getColumnSearchProps('tenPGD'),
      sorter: (a, b) => a.tenPGD.length - b.tenPGD.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Tên trường",
      dataIndex: "tenTruong",
      key: "tenTruong",
      ...getColumnSearchProps('tenTruong'),
      sorter: (a, b) => a.tenTruong.length - b.tenTruong.length,
      sortDirections: ['descend', 'ascend']
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
      ...getColumnSearchProps('ten'),
      sorter: (a, b) => a.ten.length - b.ten.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      render: gioiTinh => gioiTinh = gioiTinh = true ? 'Nam' : 'Nữ',
      key: "gioiTinh",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      key: "ngaySinh",
    },
    {
      title: "Từ trường",
      dataIndex: "tuTruong",
      ...getColumnSearchProps('tuTruong'),
      key: "tuTruong",
      sorter: (a, b) => a.tuTruong.length - b.tuTruong.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Huyện",
      dataIndex: "tenHuyen",
      key: "tenHuyen",
      ...getColumnSearchProps('tenHuyen'),
      sorter: (a, b) => a.tenHuyen.length - b.tenHuyen.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Tỉnh",
      dataIndex: "tenTinh",
      key: "tenTinh",
      ...getColumnSearchProps('tenTinh'),
      sorter: (a, b) => a.tenTinh.length - b.tenTinh.length,
      sortDirections: ['descend', 'ascend']
    },

    {
      title: "Tên lớp",
      dataIndex: "tenLop",
      key: "tenLop",
      ...getColumnSearchProps('tenLop'),
      sorter: (a, b) => a.tenLop.length - b.tenLop.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Năm học",
      dataIndex: "namHocID",
      key: "namHocID",
      sorter: (a, b) => a.namHocID.length - b.namHocID.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Học sinh ID",
      dataIndex: "hocSinhID",
      key: "hocSinhID",
      ...getColumnSearchProps('hocSinhID'),
      sorter: (a, b) => a.hocSinhID.length - b.hocSinhID.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Thao tác",
      key: "LopID",
      dataIndex: "LopID",
      render: (text, record) => (
        <Space size="middle">
          <Button type="secondary" onClick={() => { setIsLoading(true); getDataHoso(record.autoID) }}>
            <CloudUploadOutlined />
            {/* {record.autoID} */}Hồ sơ
          </Button>
        </Space>
      ),
    },
  ];


  if (accountType === "SGD") {
    return (
      <>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => history.goBack()}
          title="Danh sách học sinh chuyển đến"
        >
          <Table
            columns={columnsDataTable}
            dataSource={listStudents1}
            pagination={true}
            loading={isLoading}
            rowKey="autoID"
          />
        </PageHeader>
        <Modal
          visible={showModal}
          title={`Cập nhật hồ sơ`}
          width={900}
          onCancel={() => {
            setShowModal(false);
          }}

          footer={
            <Button onClick={() => { setShowModal(false) }}>
              Đóng
            </Button>
          }
        >
          <form>
            <table className={style.tableForm}>
              <tbody>
                <tr>
                  <td className={style.tdForm}>Giấy giới thiệu của trường chuyển đi. (bản chính hoặc bản photo)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[0]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Giấy giới thiệu chuyển trường do Trưởng phòng GDĐT (đối với cấp THCS) hoặc Giám đốc Sở GDĐT (đối với cấp THPT) nơi đi cấp.</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[1]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Học bạ (bản chính), scan thứ tự từng trang (đến trang năm học đang học). Đối với đầu cấp chuyển đầu năm, giữa kỳ 1 (lớp 6, lớp 10), phải có học bạ (trang đầu). Đối với học bạ điện tử, phải in ra, đóng dấu giáp lại đầy đủ, sau đó scan. </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[2]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Bằng tốt nghiệp THCS (bản chính hoặc bản công chứng) đối với học sinh THPT; Giấy xác nhận hoàn thành chương trình tiểu học đối với học sinh THCS</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[3]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Bản sao giấy khai sinh </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[4]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Giấy chứng nhận trúng tuyển vào lớp 10 (thể hiện rõ đã trúng tuyển vào trường công lập hoặc ngoài công lập đối với cấp THPT)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[5]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Hồ sơ minh chứng cư trú đủ thời gian học hết năm học hoặc quyết định chuyển công tác của cha hoặc mẹ hoặc người giám hộ đến Thành phố Hồ Chí Minh (đối với trường công lập, xác nhận nội trú đối với trường ngoài công lập)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[6]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Nếu chuyển không đúng thời gian quy định phải có phiếu điểm, xác nhận ngày nghỉ và điểm số của trường đi</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[7]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Nếu chuyển trường học lại, có giấy xác nhận hạnh kiểm của công an địa phương khoảng thời gian không đi học</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[8]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Đơn xin chuyển trường do cha hoặc mẹ hoặc người giám hộ ký . có ký xác nhận của trường chuyển đến và trường chuyển đi. Nếu phụ huynh gửi trực tuyến (mail. Hoặc trên hệ thống (tương lai)) không có xác nhận trên đơn, cần có bổ sung: giấy Đồng ý của trường chuyển đến</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[9]) }}>Xem hình ảnh</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
        <Modal
          visible={showModalUpload}
          title={`Upload hình ảnh`}
          width={900}
          onCancel={() => {
            setShowModalUpload(false);
          }}
          destroyOnClose={true}
          footer={
            <Button onClick={() => { submitForm(fileName); setShowModalUpload(false) }}>
              Upload
            </Button>
          }
        >
          <ImageUploader
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            withPreview={true}
            label="Dung lượng tối đa 5MB, chấp nhận: jpg| jpeg|png"
            buttonText="Chọn hình ảnh"
            singleImage={true}
          />
        </Modal>
        <Modal
          visible={showModalImage}
          title={`Hình ảnh đã tải lên`}
          width={1200}
          onCancel={() => {
            setShowModalImage(false);
          }}
          footer={
            <Button onClick={() => { setShowModalImage(false) }}>
              Đóng
            </Button>
          }
        >
          <SlideShow
            images={dataHoso.map(data => "https://files.hcm.edu.vn/" + data.url)}
            width="920px"
            imagesWidth="800px"
            imagesHeight="450px"
            imagesHeightMobile="56vw"
            thumbnailsWidth="920px"
            thumbnailsHeight="12vw"
            indicators={true}
            thumbnails={true}
            fixedImagesHeight={true}
          />
        </Modal>
      </>
    );
  }
  else {
    return (
      <>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => history.goBack()}
          title="Danh sách học sinh chuyển đến"
        >
          <Table
            columns={columnsDataTable}
            dataSource={listStudents1}
            pagination={true}
            loading={isLoading}
            rowKey="autoID"
          />
        </PageHeader>
        <Modal
          visible={showModal}
          title={`Cập nhật hồ sơ`}
          width={900}
          onCancel={() => {
            setShowModal(false);
          }}

          footer={
            <Button onClick={() => { setShowModal(false) }}>
              Đóng
            </Button>
          }
        >
          <form>
            <table className={style.tableForm}>
              <tbody>
                <tr>
                  <td className={style.tdForm}>Giấy giới thiệu của trường chuyển đi. (bản chính hoặc bản photo)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[0]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[0]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Giấy giới thiệu chuyển trường do Trưởng phòng GDĐT (đối với cấp THCS) hoặc Giám đốc Sở GDĐT (đối với cấp THPT) nơi đi cấp.</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[1]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[1]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Học bạ (bản chính), scan thứ tự từng trang (đến trang năm học đang học). Đối với đầu cấp chuyển đầu năm, giữa kỳ 1 (lớp 6, lớp 10), phải có học bạ (trang đầu). Đối với học bạ điện tử, phải in ra, đóng dấu giáp lại đầy đủ, sau đó scan. </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[2]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[2]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Bằng tốt nghiệp THCS (bản chính hoặc bản công chứng) đối với học sinh THPT; Giấy xác nhận hoàn thành chương trình tiểu học đối với học sinh THCS</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[3]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[3]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Bản sao giấy khai sinh </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[4]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[4]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Giấy chứng nhận trúng tuyển vào lớp 10 (thể hiện rõ đã trúng tuyển vào trường công lập hoặc ngoài công lập đối với cấp THPT)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[5]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[5]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Hồ sơ minh chứng cư trú đủ thời gian học hết năm học hoặc quyết định chuyển công tác của cha hoặc mẹ hoặc người giám hộ đến Thành phố Hồ Chí Minh (đối với trường công lập, xác nhận nội trú đối với trường ngoài công lập)</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[6]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[6]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Nếu chuyển không đúng thời gian quy định phải có phiếu điểm, xác nhận ngày nghỉ và điểm số của trường đi</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[7]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[7]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Nếu chuyển trường học lại, có giấy xác nhận hạnh kiểm của công an địa phương khoảng thời gian không đi học</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[8]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[8]) }}>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdForm}>Đơn xin chuyển trường do cha hoặc mẹ hoặc người giám hộ ký . có ký xác nhận của trường chuyển đến và trường chuyển đi. Nếu phụ huynh gửi trực tuyến (mail. Hoặc trên hệ thống (tương lai)) không có xác nhận trên đơn, cần có bổ sung: giấy Đồng ý của trường chuyển đến</td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalImage(true); setFileName(fileNames[9]) }}>Xem hình ảnh</Button>
                  </td>
                  <td className={style.tdForm}>
                    <Button onClick={() => { setShowModalUpload(true); setFileName(fileNames[9]) }}>Upload</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
        <Modal
          visible={showModalUpload}
          title={`Upload hình ảnh`}
          width={900}
          onCancel={() => {
            setShowModalUpload(false);
          }}
          destroyOnClose={true}
          footer={
            <Button onClick={() => { setIsModalLoading(true); submitForm(fileName); setShowModalUpload(false) }}>
              Upload
            </Button>
          }
        >
          <ImageUploader
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            withPreview={true}
            label="Dung lượng tối đa 5MB, chấp nhận: jpg| jpeg|png"
            buttonText="Chọn hình ảnh"
            singleImage={true}
          />
        </Modal>
        <Modal
          visible={showModalImage}
          title={`Hình ảnh đã tải lên`}
          width={1200}
          onCancel={() => {
            setShowModalImage(false);
          }}
          footer={
            <Button onClick={() => { setShowModalImage(false) }}>
              Đóng
            </Button>
          }
        >
          <div><table><tbody>
            <tr className={style.rowImg}>
              {dataHoso && dataHoso
                .filter(data => data.name === fileName)
                .map((data) => {
                  return (
                    <td className={style.columnImg} key={data.id}>
                      <img
                        className={style.myImage}
                        src={"https://files.hcm.edu.vn/" + data.url}
                        width="50%"
                        // height="50%"
                        alt={data.name}
                      />
                      <button onClick={() => deleteImg(data.id)}>X</button>
                    </td>
                  );
                })}
            </tr>
          </tbody>
          </table>
          </div>
        </Modal>
      </>
    );
  }
};
export default HsChuyenDen;
