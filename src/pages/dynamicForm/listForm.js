import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  PageHeader,
  message,
  Popconfirm,
  Switch,
  Dropdown,
  Menu,
  Select,
} from "antd";
import {
  SaveOutlined,
  EyeFilled,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  DownOutlined,
  DatabaseOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import adminAPI from "../../apis/adminApi";
import schoolAPI from "../../apis/schoolApi";
import { Link } from "react-router-dom";
import moment from "moment";

const ListForm = () => {
  const [listForms, setListForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formID, setFormID] = useState();
  const [isformDisable, setFormDisable] = useState(true);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a
          href={
            "https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getDataSheet/" +
            formID
          }
        >
          <Button type="secondary">
            <EyeFilled />
            Yêu cầu báo cáo
          </Button>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/reportForm/${formID}`}>
          <Button type="secondary">
            <DatabaseOutlined />
            Dữ liệu báo cáo
          </Button>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên báo cáo",
      dataIndex: "FormName",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ExpiredAt",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Đơn vị tạo",
      dataIndex: "Publisher",
    },
    {
      title: "Công bố",
      key: "Disabled",
      dataIndex: "Disabled",
      render: (text, record) => (
        <Switch
          defaultChecked={!text}
          onChange={(onChange) =>
            handleUpdateForm(
              record.FormID,
              record.FormName,
              record.ExpiredAt,
              record.PGDViewable,
              onChange
            )
          }
        ></Switch>
      ),
      width: "10%",
    },
    {
      title: "Cho PGD xem",
      key: "PGDViewable",
      dataIndex: "PGDViewable",
      render: (text, record) => (
        <Switch
          defaultChecked={text}
          onChange={(onChange) =>
            handleUpdatePGD(
              record.FormID,
              record.FormName,
              record.ExpiredAt,
              record.Disabled,
              onChange
            )
          }
        ></Switch>
      ),
      width: "10%",
    },

    {
      title: "",
      key: "FormID",
      dataIndex: "FormID",
      render: (text, record) => (
        <Space size="middle">
          <Dropdown
            overlay={menu}
            onVisibleChange={() => {
              setFormID(text);
            }}
          >
            <Button>
              Xem <DownOutlined />
            </Button>
          </Dropdown>
          <Link to={`/editForm/${text}`}>
            <Button type="secondary">
              <EditOutlined />
              Điều chỉnh
            </Button>
          </Link>
          <Popconfirm
            title="Xác nhận tạo?"
            onConfirm={() => createDuplicate(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button primary>
              <CopyOutlined /> Tạo bản sao
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Xác nhận xoá?"
            onConfirm={() => handleDeleteForm(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              <DeleteOutlined /> Xoá
            </Button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];

  const handleDeleteForm = async (formId) => {
    const deleteRes = await adminAPI.deleteForm(formId);
    if (deleteRes.statusCode === 200) {
      const formRes = await adminAPI.getForms(true);
      setListForms(formRes.result);
      message.success("Xoá thành công");
    } else {
      message.error(deleteRes.message);
    }
  };
  const createDuplicate = async (formId) => {
    const createRes = await adminAPI.duplicateForm(formId);
    if (createRes.statusCode === 200) {
      const formRes = await adminAPI.getForms(true);
      setListForms(formRes.result);
      message.success("Tạo bản sao thành công");
    } else {
      message.error(createRes.message);
    }
  };
  const handleUpdateForm = async (
    formId,
    formName,
    expiredAt,
    pgd,
    disabled
  ) => {
    const data = {
      formID: formId,
      formName: formName,
      expiredAt: expiredAt,
      disabled: !disabled,
      pgdViewable: pgd,
    };

    const updateRes = await schoolAPI.updateForm(data);
    if (updateRes.statusCode === 200) {
      if (disabled == true) {
        message.success("Công bố hành công");
      } else {
        message.success("Đóng thành công");
      }
    } else {
      message.error(updateRes.message);
    }
  };
  const handleUpdatePGD = async (
    formId,
    formName,
    expiredAt,
    disabled,
    pgd
  ) => {
    const data = {
      formID: formId,
      formName: formName,
      expiredAt: expiredAt,
      disabled: disabled,
      pgdViewable: pgd,
    };

    const updateRes = await schoolAPI.updateForm(data);
    if (updateRes.statusCode === 200) {
      message.success("Cập nhật hành công");
    } else {
      message.error(updateRes.message);
    }
  };
  const initData = async () => {
    const formRes = await adminAPI.getForms(true, isformDisable);
    setListForms(formRes.result);
    setIsLoading(false);
  };
  const getNewForm = async (e) => {
    const formRes = await adminAPI.getForms(true, e);
    setListForms(formRes.result);
    setFormDisable(e);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Tạo báo cáo"
        extra={[
          <Select
            key="1"
            style={{ width: 180 }}
            size="large"
            value={isformDisable}
            onChange={(e) => getNewForm(e)}
          >
            <Select.Option value={true}>Báo Cáo Mới</Select.Option>
            <Select.Option value={false}>Báo Cáo Hết Hạn</Select.Option>
          </Select>,
          <Link to="/createform" key="1">
            <Button icon={<SaveOutlined />} size="large" type="primary">
              TẠO MỚI
            </Button>
          </Link>,
        ]}
      >
        <Table
          columns={columns}
          dataSource={listForms}
          rowKey="FormID"
          loading={isLoading}
          pagination={false}
        />
      </PageHeader>
    </>
  );
};

export default ListForm;
