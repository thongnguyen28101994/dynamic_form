import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  message,
  Form,
  Input,
  Spin,
  Select,
  Table,
  Tooltip,
  Pagination,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import schoolAPI from "../../apis/schoolApi";
import FormCustom from "./formbaocao";
import SELECT_CHON_BAOCAO from "./component/Select/SELECT_CHON_BAOCAO";
import SELECT_CHON_OBJECTID from "./component/Select/SELECT_CHON_OBJECTID";
const FormBaoCao = () => {
  const [columns, setColumns] = useState([]);
  const [dmForm, setDMForm] = useState([]);
  const [isload, setIsLoad] = useState(false);
  const [valueCol, setValueCol] = useState([]);
  const [lops, setLops] = useState([]);
  const [dshs, setDshs] = useState([]);
  const [selectedHS, setSelectedHs] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});
  const [selectedPage, setSelectedPage] = useState(0);
  const [isChooseMulti, setIsChooseMulti] = useState(false);
  // const [formValue, setFormValue] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [isDisableAddField, setIsDisableAddField] = useState(false);
  const [selectedRowEdit, SetSelectedRowEdit] = useState();
  const { Column } = Table;
  const [form] = Form.useForm();
  const getRowCount = async (RowID) => {
    const result = await schoolAPI.getRowCount(RowID);
    setTotalRow(result.result[0].TotalCount);
  };
  const getDMForm = async () => {
    const result = await schoolAPI.getDMForm(false);
    setDMForm(result.result);
  };
  const getFormColumn = async (e) => {
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
    let customData = result.result.map((e) => {
      return {
        hocSinhID: e.ID,
        TenDiemTruong: e.TenDiemTruong,
        DiaChi: e.DiaChi,
      };
    });

    setDshs(customData);
  };
  const ReloadTable = async () => {
    getRowCount(selectedForm.FormID);
    getFormValue(selectedForm.FormID, columns);
  };
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
              curData.HocSinhID = record["TenTruong"] + " " + record["DiaChi"];
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
  const getDMLop = async () => {
    const result = await schoolAPI.getClass(2021);
    setLops(result.Result);
  };
  const addMultiRow = async () => {
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
      //console.log(response.result);
      ReloadTable();
    }
  };
  const addNewRow = async (objectID, emptyRow, add) => {
    // console.log({
    //   instanceID: selectedForm.InstanceID,
    //   objectID: objectID,
    // });
    const response = await schoolAPI.addFormRow({
      instanceID: selectedForm.InstanceID,
      objectID: objectID + "",
    });
    if (response.statusCode === 200) {
      message.success("Tạo dòng thành công");
      // console.log(response.result.RowID);
      let valCol = valueCol;
      setValueCol([]);
      SetSelectedRowEdit({ RowID: response.result.RowID });
      emptyRow(response.result.RowID, valCol, add);
    } else {
      message.error("Lỗi: " + response.message);
    }
    return 10;
  };
  const addEmptyRow = (RowID, valCol, add) => {
    let curData = {};
    curData.RowID = RowID;
    // console.log(selectedHS);
    if (columns[0].dataCategory === "SchoolID") {
      curData.HocSinhID =
        "Điểm trường: " +
        dshs.find((x) => x.hocSinhID === selectedHS).TenDiemTruong +
        " Địa chỉ: " +
        dshs.find((x) => x.hocSinhID === selectedHS).DiaChi;
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
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  const saveValueRow = async (data) => {
    let response = await schoolAPI.saveFormValue(data);
    if (response.statusCode === 200) {
      message.success("Lưu thành công");
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    setValueCol(values.users);
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
    saveValueRow(data);
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
            <SELECT_CHON_BAOCAO getColumn={getFormColumn} dmForm={dmForm} />,
          ]}
        >
          {columns.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Pagination
                  showSizeChanger={false}
                  showTotal={(total) => `Tổng cộng ${total} dòng`}
                  onChange={(page) => {
                    //console.log(page);
                    setSelectedPage(page);
                    getFormValue(selectedForm.FormID, columns, page);
                  }}
                  defaultPageSize={50}
                  defaultCurrent={1}
                  total={totalRow}
                  style={{
                    marginBottom: 10,
                    textAlign: "left",
                    display: "inline-block",
                  }}
                />
                {/* <div style={{ width: "12%" }}>
                  <Input
                    type="text"
                    placeholder="Nhập Mã Giáo Viên"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    style={{ width: "70%" }}
                  ></Input>
                  <Button type="button" onClick={() => {}}>
                    <SearchOutlined />
                  </Button>
                </div> */}
              </div>
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
                        scroll={{ x: 1500, y: 650 }}
                        title={() => {
                          return (
                            <>
                              <SELECT_CHON_OBJECTID
                                columns={columns}
                                dshs={dshs}
                                lops={lops}
                                setSelectedHs={setSelectedHs}
                                getDSHocSinh={getDSHocSinh}
                                isChooseMulti={setIsChooseMulti}
                                setAddRowButtonOpen={setIsDisableAddField}
                              />
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  disabled={isDisableAddField}
                                  onClick={() => {
                                    if (isChooseMulti)
                                      addNewRow(selectedHS, addEmptyRow, add);
                                    else addMultiRow();
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
            </>
          ) : null}
        </PageHeader>
      </Spin>
    </>
  );
};
export default FormBaoCao;
