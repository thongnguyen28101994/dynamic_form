import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  PageHeader,
  Select,
  Space,
  Table,
  Transfer,
} from "antd";
import {
  DeleteColumnOutlined,
  DeleteFilled,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { Option } from "rc-select";
import globalAPI from "../../../apis/globalApi";
import AdminAPI from "../../../apis/adminApi";
import adminAPI from "../../../apis/adminApi";
import moment from "moment";

const AllocateGrade6ToSchool = () => {
  let { schoolId } = useParams();
  const [pgds, setPgds] = useState([]);
  const [schools, setSchools] = useState([]);
  const [user, setUser] = useState(() => sessionStorage.getItem("token"));
  const [students, setStudents] = useState([]);
  const [studentAllocated, setStudentAllocated] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);
  const [studentsFiltered, setStudentsFiltered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const column = [
    {
      title: "HocSinhID",
      dataIndex: "hocSinhID",
      render: (text) => text,
    },
    {
      title: "Họ",
      dataIndex: "ho",
      render: (text) => text,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      render: (text) => text,
    },
    {
      title: "Năm sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Lớp",
      dataIndex: "tenLop",
      render: (text) => text,
    },
  ];
  const columnAlocate = [
    {
      title: "HocSinhID",
      dataIndex: "hocSinhID",
      render: (text) => text,
    },
    {
      title: "Họ",
      dataIndex: "ho",
      render: (text) => text,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      render: (text) => text,
    },
    {
      title: "Năm sinh",
      dataIndex: "ngaySinh",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Lớp",
      dataIndex: "tenLop",
      render: (text) => text,
    },
    {
      title: "Thao tác",
      dataIndex: "bienDongID",
      render: (text) => (
        <Button
          danger
          icon={
            <DeleteFilled onClick={() => handleRemoveStudentAllcated(text)} />
          }
        />
      ),
    },
  ];

  const initData = async () => {
    setIsLoading(true);
    const pgdRes = await globalAPI.getPhongGiaoDuc();
    setPgds(pgdRes.Result);
    const schoolRes = await adminAPI.getTruong({ pgdid: user.PDGID, cap1: 1 });
    setSchools(schoolRes.result);

    const studentRes = await adminAPI.getHocSinh({
      schoolID: schoolId,
      namHocID: 2021,
      khoi: 6,
    });
    setStudentAllocated(studentRes.result);
    setIsLoading(false);
  };

  const handleChangeSchool = async (value) => {
    setIsLoading(true);
    const data = {
      schoolID: value,
      namHocID: 2020,
      khoi: 5,
    };
    const studentRes = await adminAPI.getHocSinh(data);
    setStudents(studentRes.result);
    const classRes = studentRes.result.map((s) => {
      return { tenLop: s.tenLop, lopID: s.lopID };
    });

    setClasses(
      classRes.filter(
        (tag, index, array) =>
          array.findIndex(
            (t) => t.lopID === tag.lopID && t.tenLop === tag.tenLop
          ) === index
      )
    );
    setSelectedClass(0);
    setStudentsFiltered(null);
    setSelectedStudent([]);
    setIsLoading(false);
  };

  const handleChangeClass = (value) => {
    setSelectedClass(value);
    value === 0
      ? setStudentsFiltered(null)
      : setStudentsFiltered(students.filter((s) => s.lopID === value));
  };
  const handleAlocateStudent = async () => {
    // let studentId = studenIdsAlocate;
    // selectedStudent.map((s) => studentId.push(s.hocSinhID));
    let studentTMP = studentAllocated;
    selectedStudent.map((s) =>
      studentTMP.push(
        students.filter((student) => student.hocSinhID === s.hocSinhID)[0]
      )
    );
    console.log(studentTMP);
    setStudentAllocated([...new Set(studentTMP)]);
  };
  const handleRemoveStudentAllcated = async (value) => {
    console.log(value);
    const delRes = await adminAPI.deleteBienDong(value);
    if (delRes.statusCode === 200 || delRes.statusCode === 403) {
      setStudentAllocated(
        studentAllocated.filter((s) => s.bienDongID !== value)
      );
    }
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    let hocSinhID = studentAllocated.map((s) => s.hocSinhID);
    const res = await adminAPI.chuyencapHocSinh({
      schoolID: schoolId,
      hocSinhID: hocSinhID,
    });
    if (res.statusCode === 200) {
      message.success("Thành công!");
      const studentRes = await adminAPI.getHocSinh({
        schoolID: schoolId,
        namHocID: 2021,
        khoi: 6,
      });
      setStudentAllocated(studentRes.result);
      setIsLoading(false);
    } else {
      message.error("Có lỗi xảy ra!");
    }
  };
  useEffect(() => {
    initData();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedStudent(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.isActive === false,
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title={`PHÂN BỔ KHỐI 6`}
        extra={[
          <Button type="primary" onClick={handleSubmit}>
            LƯU
          </Button>,
        ]}
      >
        <Select
          style={{ width: 500 }}
          placeholder="Chọn trường"
          onChange={handleChangeSchool}
        >
          {schools.map((s) => (
            <Option key={s.schoolID} value={s.schoolID}>
              {s.tenTruong}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          placeholder="Chọn lớp"
          onChange={handleChangeClass}
          defaultValue={selectedClass}
        >
          <Option key={0} value={0}>
            Tất cả
          </Option>
          {classes.map((s) => (
            <Option key={s.lopID} value={s.lopID}>
              {s.tenLop}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Space align="start">
          <Table
            rowKey="hocSinhID"
            columns={column}
            rowSelection={rowSelection}
            loading={isLoading}
            dataSource={
              studentsFiltered
                ? studentsFiltered.sort((a, b) =>
                    a.ten > b.ten ? 1 : b.ten > a.ten ? -1 : 0
                  )
                : students.sort((a, b) =>
                    a.ten > b.ten ? 1 : b.ten > a.ten ? -1 : 0
                  )
            }
          />
          <Button
            style={{ marginTop: 100 }}
            icon={<DoubleRightOutlined />}
            onClick={handleAlocateStudent}
          ></Button>
          <Table
            loading={isLoading}
            columns={columnAlocate}
            dataSource={studentAllocated.sort((a, b) =>
              a.ten > b.ten ? 1 : b.ten > a.ten ? -1 : 0
            )}
          />
        </Space>
      </PageHeader>
    </>
  );
};

export default AllocateGrade6ToSchool;
