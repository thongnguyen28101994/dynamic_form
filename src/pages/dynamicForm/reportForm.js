import React, { useState, useEffect } from "react";
import { Button, PageHeader, Pagination, Spin } from "antd";

import { DownloadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import adminAPI from "../../apis/adminApi";
import { JsonToTable } from "react-json-to-table";

const ReportForm = () => {
  let { formId } = useParams();
  let history = useHistory();
  const [datas, setDatas] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleDownloadFile = async () => {
    const file = await adminAPI.getFormResultXlsx(formId);
    window.open(file.result);
    // fileDownload(file, "report.xlsx");
  };
  const initData = async () => {
    const valuesRes = await adminAPI.getFormValue(formId, 100, 0);
    if (valuesRes.statusCode === 200) {
      setDatas(valuesRes.result);
      setCount(valuesRes.result[0].TotalRow);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Xem báo cáo"
        extra={[
          <Button
            key="1"
            icon={<DownloadOutlined />}
            size="large"
            type="primary"
            onClick={handleDownloadFile}
          >
            Excel
          </Button>,
        ]}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <JsonToTable
              json={datas}
            />
            <Pagination
              defaultCurrent={currentPage + 1}
              total={count}
              showTotal={total => `Tổng ${total}`}
              currentPage={currentPage + 1}
            />
          </>
        )}
      </PageHeader>
    </>
  );
};

export default ReportForm;
