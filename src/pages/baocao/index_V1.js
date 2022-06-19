import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  message,
  Select,
  Form,
  Input,
  Spin,
  Table,
  Tooltip,
  Pagination,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import schoolAPI from "../../apis/schoolApi";
import FormCustom from "./formbaocao";
import TableThongTinHS from "./thongtinhs";
const FormBaoCao = () => {
  const { Option } = Select;
  const [columns, setColumns] = useState([]);
  const [dmForm, setDMForm] = useState([]);
  const [isload, setIsLoad] = useState(false);
  const [valueCol, setValueCol] = useState([]);
  const [lops, setLops] = useState([]);
  const [dshs, setDshs] = useState([]);
  const [selectedHS, setSelectedHs] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});
  const [selectedPage, setSelectedPage] = useState(0);
  // const [formValue, setFormValue] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [isDisableAddField, setIsDisableAddField] = useState(true);
  const [selectedRowEdit, SetSelectedRowEdit] = useState();
  const { Column } = Table;
  const [form] = Form.useForm();
  const getRowCount = async (RowID) => {
    const result = await schoolAPI.getRowCount(RowID);
    setTotalRow(result.result[0].TotalCount);
  };
  const getFormColumn = async (e) => {
    setIsDisableAddField(true);
    form.resetFields();
    setSelectedForm(dmForm.find((x) => x.FormID === e));
    getRowCount(e);
    const result = await schoolAPI.getFormColumn(e);
    if (result.result.length > 0) {
      let col = result.result.sort((a, b) => {
        return a.columnIndex - b.columnIndex;
      });
      switch (col[0].dataCategory) {
        case "HocSinhID":
          getDMLop();
          break;
        case "GiaoVienID":
          getDSGiaoVien();
          break;
        case "SchoolID":
          getDSDiemTruong();
          // if (sessionStorage.getItem("session")) {
          //   const session = JSON.parse(sessionStorage.getItem("session"));
          //   setSelectedHs(session.SchoolId);
          //   setIsDisableAddField(false);
          // }
          break;
        default:
          break;
      }
      setColumns(col);
      await getFormValue(e, col);
    } else {
      message.warning("Form chưa có cấu trúc cột, xin thử lại sau.");
    }
  };
  const getDMForm = async () => {
    const result = await schoolAPI.getDMForm(false);
    setDMForm(result.result);
  };
  const getDSHocSinh = async (LopID) => {
    const result = await schoolAPI.postGetHocSinh({
      lopID: LopID,
    });
    setDshs(result.result);
  };
  const getDSGiaoVien = async () => {
    let result = await schoolAPI.getDSGiaoVien();
    let ids = result.result.map((o) => o.giaoVienID);
    let filtered = result.result.filter(
      ({ giaoVienID }, index) => !ids.includes(giaoVienID, index + 1)
    );
    let customData = filtered.map((e) => {
      return {
        hocSinhID: e.giaoVienID,
        ho: e.ho,
        ten: e.ten,
      };
    });
    setDshs(customData);
  };

  const getDSDiemTruong = async () => {
    const result = await schoolAPI.getDMDiemTruong();
    setDshs(result.result);
  };
  // const ReloadTable = async () => {
  //   const result = await schoolAPI.getFormValue(selectedForm.FormID);
  //   setValueCol(result.result);
  //   console.log(result.result);
  // };
  const getFormValue = async (formId, cols, page = 1) => {
    setIsLoad(true);
    const result = await schoolAPI.getFormValue(formId, page);
    const data = result.result ?? [];
    // setFormValue(data);
    // console.log(data);
    const listData =
      data.length > 0
        ? data.map((record) => {
            let curData = {};
            curData.RowID = record.RowID;
            if (cols[0].dataCategory === "SchoolID") {
              curData.HocSinhID = record["TenTruong"];
            } else {
              curData.HocSinhID =
                record[cols[0].dataCategory] +
                " " +
                record["Ho"] +
                " " +
                record["Ten"];
            }

            cols.map((c) => {
              if (c.inputType === "date") {
                curData[c.columnID] =
                  record[c.columnID] != null ? moment(record[c.columnID]) : "";
              } else;
              switch (c.inputType) {
                case "date":
                  curData[c.columnID] = record[c.columnID]
                    ? moment(record[c.columnID])
                    : "";
                  break;
                case "file":
                  if (record[c.columnID] !== null) {
                    curData[c.columnID] = [
                      {
                        uid: "-1",
                        name:
                          record[c.columnID] !== null
                            ? record[c.columnID].includes(
                                "https://fileserver.hcm.edu.vn/FileService/"
                              )
                              ? record[c.columnID]
                              : "File Upload lỗi"
                            : "File Upload lỗi",
                        status: "done",
                        url:
                          record[c.columnID] !== null
                            ? record[c.columnID].includes(
                                "https://fileserver.hcm.edu.vn/FileService/"
                              )
                              ? record[c.columnID]
                              : "File Upload lỗi"
                            : "File Upload lỗi",
                      },
                    ];
                  } else {
                    curData[c.columnID] = record[c.columnID];
                  }

                  break;
                default:
                  curData[c.columnID] = record[c.columnID] + "";
                  break;
              }
            });
            return curData;
          })
        : [];
    setValueCol(listData);
    setIsLoad(false);
  };
  const addEmptyRow = (RowID, valCol, add) => {
    let curData = {};
    curData.RowID = RowID;
    // console.log(selectedHS);
    if (columns[0].dataCategory === "SchoolID") {
      curData.HocSinhID =
        "Điểm trường: " +
        dshs.find((x) => x.ID === selectedHS).TenDiemTruong +
        " Địa chỉ: " +
        dshs.find((x) => x.ID === selectedHS).DiaChi;
      // if (sessionStorage.getItem("session")) {
      //   //const session = JSON.parse(sessionStorage.getItem("session"));

      // } else {
      //   alert("Dùng Trên Trang Quản Lý Mới Có Session");
      // }
    } else {
      let hs = dshs.find((x) => x.hocSinhID === selectedHS);
      curData.HocSinhID = hs.hocSinhID + " " + hs.ho + " " + hs.ten;
    }
    columns.map((c) => {
      curData[c.columnID] = "";
    });
    //return curData;
    add(curData);
    valCol.unshift(curData);
    setValueCol(valCol);
  };
  const getDMLop = async () => {
    const result = await schoolAPI.getClass(2021);
    setLops(result.Result);
  };
  const addNewRow = async (objectID, emptyRow, add) => {
    // console.log({
    //   instanceID: selectedForm.InstanceID,
    //   objectID: dshs.map((e) => e.hocSinhID+""),
    // });
    const response = await schoolAPI.addMultiFormRow({
      instanceID: selectedForm.InstanceID,
      objectID: dshs.map((e) => e.hocSinhID + ""),
    });
    if (response.statusCode === 200) {
      message.success("Tạo dòng thành công");
      console.log(response.result);
      // let valCol = valueCol;
      // setValueCol([]);
      // SetSelectedRowEdit({ RowID: response.result.RowID });
      // setIsDisableAddField(true);
      // emptyRow(response.result.RowID, valCol, add);
    } else {
      //message.error("Lỗi: " + response.message);
    }

    // return 10;
  };
  const deleteFile = async (rowID, columnID) => {
    await schoolAPI.deleteFile(rowID, columnID);
  };
  const deleteNewRow = async (id, index, remove) => {
    const response = await schoolAPI.deleteFormRow(id);
    if (response.statusCode === 200) {
      message.success("Xóa dòng thành công");
      remove(index);
      let newDataValue = valueCol.filter((e) => e.RowID !== id);
      setValueCol(newDataValue);
      // ReloadTable();
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  const insertNewRow = async (data) => {
    let response = await schoolAPI.saveFormValue(data);
    if (response.statusCode === 200) {
      message.success("Lưu thành công");
      getFormValue(selectedForm.FormID, columns, selectedPage);

      // ReloadTable();
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  const onFinish = async (values) => {
    // console.log("Received values of form:", values);
    let data = [];
    let col = columns;
    let modifiesRow = values.users.filter(
      (e) => e.RowID === selectedRowEdit.RowID
    );
    modifiesRow.map((record) => {
      let rowID = record.RowID;
      let curdata = {};
      curdata = col.map((c) => {
        if (record[c.columnID] !== null) {
          if (c.inputType === "date") {
            return {
              rowID: rowID,
              columnID: c.columnID,
              value: record[c.columnID]
                ? moment(record[c.columnID]).format()
                : "",
            };
          } else if (c.inputType === "file") {
            //console.log(record[c.columnID]);
            return {
              rowID: rowID,
              columnID: c.columnID,
              value: record[c.columnID].file
                ? record[c.columnID].file.response.result
                : record[c.columnID][0].name,
            };
          } else {
            return {
              rowID: rowID,
              columnID: c.columnID,
              value: record[c.columnID] + "",
            };
          }
        }
      });
      data = curdata.filter((x) => x !== undefined);
      return curdata;
    });
    //console.log(selectedRowEdit);
    // console.log(data);
    insertNewRow(data);
    setIsDisableAddField(false);
  };
  useEffect(() => {
    getDMForm();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      users: valueCol,
    });
  }, [valueCol]);
  return (
    <>
      <Spin tip="Loading..." spinning={isload}>
        <PageHeader
          className="site-page-header-responsive"
          title="Form Báo Cáo"
          extra={[
            <Select
              key="1"
              placeholder="Chọn báo cáo"
              allowClear
              onChange={getFormColumn}
              style={{ width: 900 }}
            >
              {dmForm.map((value) => (
                <Option key={value.FormID} value={value.FormID}>
                  <b>Tên Báo Cáo: </b> {`${value.FormName} ,`}
                  <b>Người Tạo: </b> {`${value.Publisher} ,`}
                  <b>Ngày Tạo: </b>
                  {moment(value.CreateTime).format("DD/MM/YYYY")}
                  {` ,`}
                  <b>Ngày Kết Thúc: </b>
                  {moment(value.ExpiredAt).format("DD/MM/YYYY, h:mm:ss a")}
                </Option>
              ))}
            </Select>,
            // <Button
            //   key="4"
            //   type="primary"
            //   onClick={() => {
            //     console.log(valueCol);
            //   }}
            // >
            //   <PlusSquareOutlined /> Lưu
            // </Button>,
          ]}
        >
          {columns.length > 0 ? (
            <>
              {/* <Pagination
                showSizeChanger={false}
                showTotal={(total) => `Tổng cộng ${total} dòng`}
                onChange={(page) => {
                  console.log(page);
                  setSelectedPage(page);
                }}
                defaultPageSize={50}
                defaultCurrent={1}
                total={totalRow}
                style={{ marginBottom: 10, float: "right" }}
              /> */}
              <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      <Table
                        dataSource={fields}
                        pagination={false}
                        bordered
                        scroll={{ x: 1500 }}
                        title={() => {
                          return (
                            <>
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  // disabled={isDisableAddField}
                                  onClick={() => {
                                    addNewRow(selectedHS, addEmptyRow, add);

                                    // return add();
                                  }}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Thêm Dòng
                                </Button>
                              </Form.Item>
                            </>
                          );
                        }}
                      >
                        {/* <Column
                        dataIndex={"RowID"}
                        title={"RowID"}
                        render={(value, row, index) => {
                          return (
                            <Form.Item
                              hidden={true}
                              name={[index, "RowID"]}
                              fieldKey={[index, "RowID"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing RowID",
                                },
                              ]}
                            >
                              <Input placeholder="RowID" disabled={true} />
                            </Form.Item>
                          );
                        }}
                      /> */}
                        <Column
                          dataIndex={"HocSinhID"}
                          title={"Thông tin"}
                          fixed="left"
                          width={200}
                          render={(value, row, index) => {
                            return (
                              <Form.Item
                                hidden={false}
                                name={[index, "HocSinhID"]}
                                fieldKey={[index, "HocSinhID"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing ID",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  placeholder="Thông tin"
                                  autoSize={true}
                                  disabled={true}
                                  style={{ resize: "none" }}
                                />
                              </Form.Item>
                            );
                          }}
                        />
                        {columns.map(
                          ({ columnID, columnName, ...restProps }) => (
                            <>
                              <Column
                                dataIndex={columnID}
                                title={
                                  <Tooltip title={restProps.colDescription}>
                                    {columnName}
                                  </Tooltip>
                                }
                                width={restProps.width}
                                // align={"center"}
                                render={(value, row, index) => {
                                  return (
                                    <FormCustom
                                      name={index}
                                      formValue={form}
                                      fieldKey={index}
                                      columnID={columnID}
                                      columnName={columnName}
                                      {...restProps}
                                    />
                                  );
                                }}
                              ></Column>
                            </>
                          )
                        )}
                        <Column
                          dataIndex={"ThaoTac"}
                          title={"Thao Tác"}
                          fixed="right"
                          width={200}
                          render={(value, row, index) => {
                            return (
                              <>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ marginRight: "5%" }}
                                  onClick={() => {
                                    SetSelectedRowEdit({
                                      RowID: valueCol[index].RowID,
                                    });
                                  }}
                                >
                                  <MinusCircleOutlined /> Lưu
                                </Button>
                                <Button
                                  danger
                                  onClick={() => {
                                    let columnFiles = columns.filter(
                                      (x) => x.inputType === "file"
                                    );
                                    if (columnFiles.length > 0) {
                                      columnFiles.forEach((item) => {
                                        deleteFile(
                                          valueCol[index].RowID,
                                          item.columnID
                                        );
                                      });
                                    }
                                    deleteNewRow(
                                      valueCol[index].RowID,
                                      index,
                                      remove
                                    );
                                  }}
                                >
                                  <MinusCircleOutlined /> Xóa
                                </Button>
                              </>
                            );
                          }}
                        />
                      </Table>
                    </>
                  )}
                </Form.List>
              </Form>
              <Pagination
                // showSizeChanger={false}
                showTotal={(total) => `Tổng cộng ${total} dòng`}
                defaultPageSize={25}
                onChange={(page) => {
                  //console.log(page);
                  setSelectedPage(page);
                  //getFormValue(selectedForm.FormID, columns, page);
                }}
                defaultCurrent={1}
                total={totalRow}
                //  style={{ marginTop: 10, float: "right" }}
              />
            </>
          ) : null}
        </PageHeader>
      </Spin>
      {/* <TableThongTinHS
        columns={columns}
        formValue={formValue}
        ReloadTable={ReloadTable}
      /> */}
    </>
  );
};
export default FormBaoCao;
