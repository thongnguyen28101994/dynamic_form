import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  message,
  Select,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Space,
  Spin,
  Table,
} from "antd";
import {
  PlusSquareOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import schoolAPI from "../../apis/schoolApi";

const TableThongTinHS = ({ columns, formValue, ReloadTable }) => {
  const [isload, setIsLoad] = useState(false);
  const [valueCol, setValueCol] = useState([]);
  const [renderColumns, SetRenderColumns] = useState([]);
  const { Column } = Table;
  const [form] = Form.useForm();
  const getFormColumns = () => {
    let defaultColumn = [
      {
        title: "Họ Tên",
        render: (text, record, index) => {
          return record.Ho + " " + record.Ten;
        },
      },
      {
        title: "Ngày Sinh",
        dataIndex: "NgaySinh",
        render: (text, record, index) => {
          return record.NgaySinh !== null
            ? moment(record.NgaySinh).format("DD/MM/YYYY")
            : "";
        },
      },
    ];
    let renderColumns = columns.map(({ columnID, columnName, width }) => {
      return {
        title: columnName,
        dataIndex: columnID,
        width: width
      };
    });
    if (columns[0].dataCategory === "HocSinhID") {
    } else {
    }
    switch (columns[0].dataCategory) {
      case "HocSinhID": {
        defaultColumn.unshift({
          title: "Mã Học Sinh",
          dataIndex: "HocSinhID",
          fixed: "left",
          width: 100
        });
        defaultColumn.unshift({
          title: "Lớp",
          dataIndex: "TenLop",
          fixed: "left",
          width: 100
        });
        break;
      }
      case "GiaoVienID": {
        defaultColumn.unshift({
          title: "Mã Giáo Viên",
          dataIndex: "GiaoVienID",
          fixed: "left",
          width: 100
        });
        break;
      }
      case "SchoolID": {
        defaultColumn = [];
        defaultColumn.unshift({
          title: "Tên Trường",
          dataIndex: "TenTruong",
          fixed: "left",
          width: 100
        });
        defaultColumn.unshift({
          title: "Mã Trường",
          dataIndex: "SchoolID",
          fixed: "left",
          width: 100
        });
        break;
      }
      default:
        break;
    }
    let renderColumnsThaoTac = [
      {
        title: "Thao Tác",
        dataIndex: "ThaoTac",
        fixed: "right",
        width: 100,
        render: (text, value, index) => {
          return (
            <Button
              danger
              onClick={() => {
                deleteNewRow(value.RowID);
              }}
            >
              <MinusCircleOutlined /> Xóa
            </Button>
          );
        },
      },
    ];
    let ColCombine = [
      ...defaultColumn,
      ...renderColumns,
      ...renderColumnsThaoTac,
    ];
    SetRenderColumns(ColCombine);
  };
  const deleteNewRow = async (id) => {
    setIsLoad(true);
    const response = await schoolAPI.deleteFormRow(id);
    if (response.statusCode === 200) {
      message.success("Xóa dòng thành công");
      ReloadTable();
      setIsLoad(false);
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  useEffect(() => {
    if (columns.length > 0) getFormColumns();
  }, [columns]);
  useEffect(() => {
    setIsLoad(true);
    setTimeout(() => {
      setIsLoad(false);
    }, 100);
  }, [formValue]);
  return (
    <>
      <Spin tip="Loading..." spinning={isload}>
        {columns.length > 0 ? (
          <Table
            dataSource={formValue}
            columns={renderColumns}
            pagination={false}
            bordered
            scroll={{ x: 1500, y: 300 }}
          ></Table>
        ) : null}
      </Spin>
    </>
  );
};
export default TableThongTinHS;
