import React, { useState } from "react";
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  PageHeader,
  Alert,
  Typography,
  Space,
  message,
} from "antd";
import moment from "moment";
import readXlsxFile from "read-excel-file";
import { useHistory, useParams } from "react-router-dom";
import schoolApi from "../../../apis/schoolApi";
import ExcelSample from "../../../statics/mau-nop-hs-theo-lop.xlsx";
const { Text } = Typography;

const MyUpload = () => {
  const columns = [
    {
      title: "STT",
      width: 100,
      dataIndex: "STT",
      fixed: "left",
    },
    {
      title: "Họ",
      width: 100,
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
      title: "SĐT",
      dataIndex: "SDT",
      width: 150,
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
      width: 150,
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      width: 150,
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
      dataIndex: "DanToc",

      width: 150,
    },
    {
      title: "Tôn giáo",
      dataIndex: "TonGiao",

      width: 150,
    },
    {
      title: "Khuyết tật",
      dataIndex: "KhuyetTat",

      width: 150,
    },
    {
      title: "Đ.Tượng C.Sách",
      dataIndex: "DoiTuongChinhSach",

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
      dataIndex: "HoKhau_Xa",
      width: 150,
    },
    {
      title: "Hộ khẩu - Huyện",
      dataIndex: "HoKhau_Huyen",
      width: 150,
    },
    {
      title: "Hộ khẩu - Tỉnh",
      dataIndex: "HoKhau_Tinh",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Số nhà tên đường",
      dataIndex: "DCTT_DiaChi",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Xã",
      dataIndex: "DCTT_Xa",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Huyện",
      dataIndex: "DCTT_Huyen",
      width: 150,
    },
    {
      title: "Chỗ ở H.Tại - Tỉnh",
      dataIndex: "DCTT_Tinh",
      width: 150,
    },
    { title: "Tên người giám hộ", dataIndex: "TenNguoiGiamHo", width: 150 },
    { title: "SĐT người giám hộ", dataIndex: "SDTNguoiGiamHo", width: 150 },
    { title: "ClientHocSinhID", dataIndex: "ClientHocSinhID", width: 50 },
  ];
  const [students, setStudents] = useState([]);
  const [messageError, setMessageError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  let { lopID } = useParams();
  const upload = () => {
    const input = document.getElementById("input");
    input.addEventListener("change", () => {
      readXlsxFile(input.files[0]).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        // debugger
        console.log(rows);

        if (rows.length > 1) {
          const students = [];
          rows.map((s, index) => {
            const student = {
              STT: index,
              Ho: s[1],
              Ten: s[2],
              SDT: s[3],
              GioiTinh: s[4],
              NgaySinh: s[5],
              TenCha: s[6],
              SDTCha: s[7],
              TenMe: s[8],
              SDTMe: s[9],
              NoiSinh: s[10],
              DanToc: s[11],
              TonGiao: s[12],
              KhuyetTat: s[13],
              DoiTuongChinhSach: s[14],
              CMND: s[15],
              HoKhau_DiaChi: s[16],
              HoKhau_Xa: s[17],
              HoKhau_Huyen: s[18],
              HoKhau_Tinh: s[19],
              DCTT_DiaChi: s[20],
              DCTT_Xa: s[21],
              DCTT_Huyen: s[22],
              DCTT_Tinh: s[23],
              TenNguoiGiamHo: s[24],
              SDTNguoiGiamHo: s[25],
              ClientHocSinhID: s[26]
            };
            students.push(student);
          });
          students.shift();
          setStudents(students);
        }
      });
    });
  };
  const handleSubmit = async () => {
    setMessageError([]);
    let messagesErrorTmp = [];
    students.map((student, index) => {
      student.NgaySinh = moment(student.NgaySinh, "DD/MM/YYYY").format(
        "YYYY/MM/DD"
      );
      Object.entries(student).forEach(([key, val]) => {
        if (
          (val === null || val === "" || val === undefined) &&
          key !== "CMND"
        ) {
          let error = {
            message: `STT ${student.STT}: ${key} không dược bỏ trống, nếu không có ghi "Không có"`,
          };
          messagesErrorTmp.push(error);
        }
      });
    });
    if (messagesErrorTmp.length > 0) {
      setMessageError(messagesErrorTmp);
    } else {
      setIsLoading(true);
      const data = {
        LopID: lopID,
        data: students,
      };
      await schoolApi.nopHocSinh(data).then((res) => {
        if (res.StatusCode === 200) {
          history.push(`/nophocsinh/${lopID}`);
        } else {
          res.Result.map((s) => {
            let error = {
              message: `STT ${parseInt(s.Row) + 1}: Cột ${
                s.Column
              } không hợp lệ,`,
            };
            messagesErrorTmp.push(error);
          });
          setMessageError(messagesErrorTmp);
          setIsLoading(false);
        }
      });
    }
  };
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Nộp học sinh bằng file EXCEL(.xlxs)"
        extra={
          students.length > 0
            ? [
                <Button
                  key="1"
                  type="danger"
                  onClick={() => window.location.reload()}
                >
                  <DeleteOutlined /> XÓA LÀM LẠI
                </Button>,
                <Button
                  key="2"
                  onClick={() => handleSubmit()}
                  disabled={isLoading}
                >
                  <PlusSquareOutlined /> NỘP DỮ LIỆU
                </Button>,
              ]
            : [
                <Button key="1" type="warning">
                  <a href={ExcelSample} download="mau-nop-hs-theo-lop">
                    TẢI FILE EXCEL MẪU
                  </a>
                </Button>,
              ]
        }
      >
        {!students.length > 0 ? (
          <p style={{ textAlign: "center" }}>
            {" "}
            CHỌN FILE EXCEL(.xlsx){" "}
            <input
              type="file"
              id="input"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onClick={() => upload()}
            />
          </p>
        ) : null}
        {messageError.length > 0 ? (
          <Alert
            message={
              <Space direction="vertical">
                {messageError.map((s, index) => (
                  <Text key={index}>{s.message}</Text>
                ))}
              </Space>
            }
            type="error"
            closable
          />
        ) : null}
        <Table
          pagination={false}
          columns={columns}
          dataSource={students}
          scroll={{ x: 1500, y: window.screen.height - 400 }}
          rowKey="STT"
          loading={isLoading}
        />
      </PageHeader>
    </>
  );
};
export default MyUpload;
