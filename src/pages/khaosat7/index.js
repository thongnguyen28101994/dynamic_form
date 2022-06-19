import React, { useState, useEffect, useRef } from "react";
import { PageHeader, Table, Spin } from "antd";
import adminApi from "../../apis/adminApi";
import { Button } from "antd/lib/radio";

const columns = [
  {
    title: "STT",
    key: "STT",
    render: (text, record, index) => index + 1,
  },

  {
    title: "Tên trường",
    dataIndex: "tenTruong",
  },
  {
    title: "Phòng giáo dục",
    dataIndex: "tenPGD",
  },
  {
    title: "Tham gia lúc",
    dataIndex: "joinTime",
  },
  {
    title: "Rời khỏi lúc",
    dataIndex: "leaveTime",
  },
  {
    title: "Lý do",
    dataIndex: "TenLop",
  },
];
const Index = () => {
  const [url, setUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialData = async () => {
    await adminApi.getK12Participant().then((s) => {
      setUrl(s.result);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    initialData();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="THỐNG KÊ THAM GIA"
        // subTitle="This is a subtitle"
        backIcon={false}
      >
        {/* <Table dataSource={schools} columns={columns} pagination={false} />; */}
        {isLoading ? (
          <Spin />
        ) : (
          <a href={url} target="_blank" rel="noopener noreferrer" role="button">
            Download
          </a>
        )}
      </PageHeader>
    </>
  );
};

export default Index;
