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
  DatePicker,
} from "antd";
import {
  PlusSquareOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import schoolAPI from "../../apis/schoolApi";
import FormCustom from "./formbaocao";

const FormBaoCao = () => {
  const { Option } = Select;
  const [columns, setColumns] = useState([]);
  const [dmForm, setDMForm] = useState([]);
  const [isload, setIsLoad] = useState(false);
  const [valueCol, setValueCol] = useState([]);
  const [defaultvalueCol, setDefaulValueCol] = useState([]);
  const [lops, setLops] = useState([]);
  const [dshs, setDshs] = useState([]);
  const [selectedHS, setSelectedHs] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});
  const [selectedLop, setSelectedLop] = useState([]);
  // const [selectedHs, setSelectedHs] = useState("");
  const [form] = Form.useForm();
  const getFormColumn = async (e) => {
    setIsLoad(true);
    setSelectedForm(dmForm.find((x) => x.FormID === e));
    const result = await schoolAPI.getFormColumn(e);
    setColumns(result.result);
    await getFormValue(e, result.result);
    setIsLoad(false);
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
  const getFormValue = async (formId, cols) => {
    const result = await schoolAPI.getFormValue(formId);
    // setFormValue(result.result);
    const data = result.result ?? [];
    console.log(data);
    const listData =
      data.length > 0
        ? data.map((record) => {
            let curData = {};
            curData.RowID = record.RowID;
            cols.map((c) => {
              if (c.inputType === "date") {
                // console.log(record[c.columnID]);
                curData[c.columnID] =
                  record[c.columnID] != null ? moment(record[c.columnID]) : "";
              } else curData[c.columnID] = record[c.columnID];
            });
            return curData;
          })
        : [];
    console.log(listData);
    setValueCol(listData);
    setDefaulValueCol(listData);
  };
  const addEmptyRow = (RowID, add) => {
    let curData = {};
    curData.RowID = RowID;
    columns.map((c) => {
      curData[c.columnID] = "";
    });
    //return curData;
    add(curData);
    let newValCod = valueCol;
    newValCod.push(curData);
    setValueCol(newValCod);
  };
  const getDMLop = async () => {
    const result = await schoolAPI.getClass(2021);
    setLops(result.Result);
  };
  const addNewRow = async (objectID, emptyRow, add) => {
    console.log({
      instanceID: selectedForm.InstanceID,
      objectID: objectID,
    });
    const response = await schoolAPI.addFormRow({
      instanceID: selectedForm.InstanceID,
      objectID: objectID,
    });
    if (response.statusCode === 200) {
      message.success("Tạo dòng thành công");
      // console.log(response.result);
      emptyRow(response.result.RowID, add);
    } else {
      message.error("Lỗi: " + response.message);
    }

    return 10;
  };
  const deleteNewRow = async (id) => {
    const response = await schoolAPI.deleteFormRow(id);
    if (response.statusCode === 200) {
      message.success("Xóa dòng thành công");
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    let data = [];
    let col = columns;
    data = values.users.map((record) => {
      let rowID = record.RowID;
      let curdata = {};
      col.map((c) => {
        if (c.inputType === "date") {
          curdata = {
            rowID: rowID,
            columnID: c.columnID,
            value: moment(record[c.columnID]).format(),
          };
        }
        curdata = {
          rowID: rowID,
          columnID: c.columnID,
          value: record[c.columnID],
        };
        return curdata;
      });
      console.log(curdata);
      return curdata;
    });
    // console.log(data);
    let response = await schoolAPI.saveFormValue(data);
    if (response.statusCode === 200) {
      message.success("Lưu thành công");
    } else {
      message.error("Lỗi: " + response.message);
    }
  };
  useEffect(() => {
    getDMForm();
    getDMLop();
    if (defaultvalueCol.length > 0) {
      form.setFieldsValue({
        users: defaultvalueCol,
      });
    }
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      users: defaultvalueCol,
    });
  }, [defaultvalueCol]);
  return (
    <>
      <Spin tip="Loading..." spinning={isload}>
        <PageHeader
          className="site-page-header-responsive"
          title="Form Báo Cáo"
          extra={[
            <Select
              showSearch
              placeholder={`Chọn Lớp`}
              allowClear
              key="1"
              optionFilterProp="children"
              onChange={(e) => {
                setSelectedLop(e);
                getDSHocSinh(e);
              }}
            >
              {lops.map((value) => (
                <Option key={value.LopID} value={value.LopID}>
                  {value.TenLop}
                </Option>
              ))}
            </Select>,
            <Select
              showSearch
              placeholder={`Chọn Học Sinh`}
              allowClear
              key="3"
              optionFilterProp="children"
              onChange={(e) => {
                setSelectedHs(e);
              }}
            >
              {dshs.map((value) => (
                <Option key={value.hocSinhID} value={value.hocSinhID}>
                  {value.ho + " " + value.ten}
                </Option>
              ))}
            </Select>,
            <Select
              key="2"
              placeholder="Chọn báo cáo"
              allowClear
              onChange={getFormColumn}
            >
              {dmForm.map((value) => (
                <Option key={value.FormID} value={value.FormID}>
                  {value.FormName}
                </Option>
              ))}
            </Select>,
            <Button
              key="4"
              type="primary"
              onClick={() => {
                console.log(valueCol);
              }}
            >
              <PlusSquareOutlined /> Lưu
            </Button>,
          ]}
        >
          {columns.length > 0 ? (
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          hidden={true}
                          name={[name, "RowID"]}
                          fieldKey={[fieldKey, "RowID"]}
                          rules={[{ required: true, message: "Missing RowID" }]}
                        >
                          <Input placeholder="RowID" />
                        </Form.Item>

                        {columns.map(
                          ({ columnID, columnName, ...restProps }) => (
                            <>
                              <FormCustom
                                name={name}
                                fieldKey={fieldKey}
                                columnID={columnID}
                                columnName={columnName}
                                {...restProps}
                              />
                            </>
                          )
                        )}
                        <Button
                          danger
                          onClick={() => {
                            //  console.log(valueCol[fields[name].key].RowID);

                            let RowID = valueCol[fields[name].key].RowID;
                            deleteNewRow(RowID);
                            let newValCol = valueCol.map(
                              (x) => x.RowID !== RowID
                            );
                            setValueCol(newValCol);
                            setDefaulValueCol(newValCol);

                            return remove(name);
                          }}
                        >
                          <MinusCircleOutlined /> Xóa
                        </Button>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          addNewRow(selectedHS, addEmptyRow, add);

                          //  return add(newRow);
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : null}
        </PageHeader>
      </Spin>
    </>
  );
};
export default FormBaoCao;
