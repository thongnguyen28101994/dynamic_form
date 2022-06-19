import React, { useState, useEffect } from "react";
import { PageHeader } from "antd";
import adminAPI from "../../../apis/adminApi";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
// import {} from "";

const AllocateGrade6 = () => {
  const [schools, setSchools] = useState([]);
  const [user, setUser] = useState(() => sessionStorage.getItem("token"));

  const column = [
    {
      title: "SchoolID",
      key: "schoolID",
      dataIndex: "schoolID",
      render: (text) => text,
    },
    {
      title: "Tên Trường",
      dataIndex: "tenTruong",
    },
    {
      title: "Thao Tác",
      dataIndex: "schoolID",
      render: (text) => (
        <Link to={`/phanbokhoi6vaotruong/${text}`}>
          <Button type="secondary">Phân bổ</Button>
        </Link>
      ),
    },
  ];

  const initData = async () => {
    const data = { pgdid: user.PDGID, cap2: 1 };
    const schoolRes = await adminAPI.getTruong(data);
    setSchools(schoolRes.result);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        // onBack={() => window.history.back()}
        title="PHÂN BỔ KHỐI 6"
      >
        <Table columns={column} dataSource={schools} pagination={false} />
      </PageHeader>
    </>
  );
};

export default AllocateGrade6;