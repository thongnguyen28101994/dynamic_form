import React, { useState, useEffect } from "react";
import { PageHeader, Table, Select, Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import adminAPI from "../../apis/adminApi";
import globalApi from "../../apis/globalApi";
const { Option } = Select;

const InstanceInfo = () => {
  let history = useHistory();
  let { formId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [capHocs, setCapHocs] = useState([]);

  const initialData = async () => {
    await adminAPI.getInstanceInfo(formId).then((s) => {
      setData(s.result);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    initialData();
  }, []);
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã Đơn Vị",
      dataIndex: "DepartmentID",
      key: "DepartmentID",
    },
    {
      title: "Tên Trường",
      dataIndex: "TenTruong",
    },
    {
      title: "Phòng giáo dục ID",
      dataIndex: "PGDID",
    },
    {
      title: "Phòng Giáo dục",
      dataIndex: "TenPGD",
    },
  ];
  const handleUpdateCapBaoCao = async () => {
    let donViID = [];
    capHocs.map(async (s) => {
      let donvis = [];
      if (s === "Cap 1") {
        donvis = await adminAPI.getTruong({ cap1: 1 });
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      } else if (s === "Cap 2") {
        donvis = await adminAPI.getTruong({ cap2: 1 });
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      } else if (s === "Cap 3") {
        donvis = await adminAPI.getTruong({ cap3: 1 });
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      } else if (s === "mam non") {
        donvis = await adminAPI.getTruong({ mamNon: 1 });
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      } else if (s === "gdtx") {
        donvis = await adminAPI.getTruong({ gdtx: 1 });
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      } else if (s === "pgd") {
        donvis = await globalApi.getPhongGiaoDuc();
        donViID = donvis.result.map((s1) => {
          return s1.schoolID;
        });
        const data = {
          formID: formId,
          donViID: donViID,
        };
        await adminAPI.addInstance(data);
      }
    });
  };
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Danh sách các đơn vị được yêu cầu báo cáo"
        extra={[
          <Select
            mode="multiple"
            allowClear
            style={{ width: 400 }}
            key="1"
            placeholder="Cấp báo cáo"
            onChange={(e) => setCapHocs(e)}
          >
            <Option value="mam non">Mầm non</Option>
            <Option value="Cap 1">Cấp 1</Option>
            <Option value="Cap 2">Cấp 2</Option>
            <Option value="Cap 3">Cấp 3</Option>
            <Option value="gdtx">GDTX</Option>
            <Option value="pgd">PGD</Option>
          </Select>,
          <Button
            key="2"
            type="primary"
            onClick={() => {
              handleUpdateCapBaoCao();
            }}
          >
            CẬP NHẬT
          </Button>,
        ]}
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="DepartmentID"
        loading={isLoading}
        pagination={false}
      />
      {/* <EditableTable datas={Lops} isUpdate={isUpdate} /> */}
    </>
  );
};
export default InstanceInfo;
