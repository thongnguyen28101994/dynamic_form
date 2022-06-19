import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Select,
  PageHeader,
  Input,
  Form,
  DatePicker,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  MinusCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { useHistory, useParams, Link } from "react-router-dom";
import adminAPI from "../../apis/adminApi";
import schoolAPI from "../../apis/schoolApi";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const EditForm = () => {
  let history = useHistory();
  let { formId } = useParams();
  const [form] = Form.useForm();
  const [formColumn] = Form.useForm();
  const [formAdd] = Form.useForm();

  const [infoForm, setInfoForm] = useState([]);
  const [inputType, setInputType] = useState([]);
  const [formColumns, setFormColumns] = useState();
  const [inputTypeHandle, setInputTypeHandle] = useState([]);
  // const [isShowPreview, setIsShowPreview] = useState(false);
  // const [columnPreview, setColumnPreview] = useState();

  const onFinishCreateForm = () => {
    form.validateFields().then(async () => {
      formColumn.validateFields().then(async () => {
        await schoolAPI
          .updateForm({
            formID: formId,
            formName: form.getFieldValue("formName"),
            expiredAt: moment(form.getFieldValue("expireDay")).format(),
            disabled: infoForm[0].Disabled
          })

        const columnsAdd = formColumn.getFieldsValue().createColumns;
        console.log(columnsAdd);
        columnsAdd.map(async (s) => {
          await adminAPI.updateCol({
            columnID: s.columnID,
            columnName: s.columnName,
            colDescription: s.colDescription
          });
        });
      });
      message.success("Lưu thành công");
    });
    formAdd.validateFields().then(async (s) => {
      if (s.addColumns) {
        if (s.addColumns.length > 0) {
          const columnsAdd = formAdd.getFieldsValue().addColumns;
          console.log(columnsAdd);
          columnsAdd.map(async (s) => {
            await adminAPI.addColumn({
              formID: formId,
              columnIndex: s.columnIndex,
              columnName: s.columnName,
              dataType:
                s.inputType === "number"
                  ? "numeric"
                  : s.inputType === "date"
                    ? "datetime"
                    : s.inputType === "checkbox"
                      ? "bit"
                      : "text",
              width: s.width,
              inputValue: s.inputValue
                ? `[${s.inputValue.split(",").map((s) => "'" + s + "'")}]`
                : "",
              allowNull: s.allowNull,
              inputType: s.inputType,
              colDescription: s.colDescription,
            });
          });
          message.success("Thêm cột thành công!");
          history.push("/listform");
        }
      }
    })
  };

  const handleChangeInputType = (inputType, index) => {
    let inputTypeHandleTmp = [...inputTypeHandle];
    inputTypeHandleTmp[index] = { index, inputType };
    setInputTypeHandle(inputTypeHandleTmp);
  };
  const deleteCol = async (id, name, remove) => {
    const resDelete = await adminAPI.deleteCol(id);
    if (resDelete.statusCode === 200) {
      remove(name);
      message.success("Xóa Thành Công");
    }
    else {
      message.error(resDelete.message);
    }
  }


  const initData = async () => {
    const dataFormColumns = await adminAPI.getFormColumns(formId);
    setFormColumns(dataFormColumns.result);
    const inputTypeRes = await adminAPI.getInputType();
    setInputType(inputTypeRes.result);
  };
  const getDataForm = async () => {
    const info = await adminAPI.getFormInfo(formId);
    setInfoForm(info.result);

    const dataFormColumns = await adminAPI.getFormColumns(formId);

    const listData =
      dataFormColumns.result.map((record) => {

        return { 'columnIndex': record.columnIndex, 'columnID': record.columnID, 'columnName': record.columnName, 'width': record.width, 'allowNull': record.allowNull, 'inputType': record.inputType, 'inputValue': record.inputValue, 'colDescription': record.colDescription };
      })


    setFormColumns(listData);
  }

  useEffect(() => {
    initData();
    getDataForm();
  }, []);
  useEffect(() => {
    if (inputType.length > 0) {
      formColumn.setFieldsValue({
        'createColumns': formColumns
      });
      form.setFieldsValue({
        'formName': infoForm[0].FormName,
        'expireDay': moment(infoForm[0].ExpiredAt),
        'dataCategory': infoForm[0].DataCategory,

      });
      console.log("done");
    }
  }
    , [inputType])
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Điều chỉnh báo cáo"
        extra={[
          <Link to={`/instanceInfo/${formId}`}>
            <Button type="primary">
              <EyeFilled />
              Xem đơn vị được yêu cầu báo cáo
            </Button>
          </Link>,
          <Button
            icon={<SaveOutlined />}
            size="large"
            key="2"
            type="primary"
            onClick={onFinishCreateForm}
          >
            LƯU LẠI
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 3 }}
          layout="horizontal"
          name="createFrom"
          onFinish={onFinishCreateForm}
          form={form}
        >
          <Form.Item
            label="Tiêu đề báo cáo"
            name="formName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            {...{
              wrapperCol: { offset: 0, span: 6 },
            }}
            label="Ngày kết thúc"
            name="expireDay"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY HH:mm"
              showTime={{ format: "HH:mm" }}
              placeholder="Chọn ngày"
            />
          </Form.Item>
          <Form.Item
            {...{
              wrapperCol: { offset: 0, span: 4 },
            }}
            label="Đối tượng báo cáo"
            name="dataCategory"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <Select placeholder="Đối tượng báo cáo" allowClear disabled={true}>
              <Option value="HocSinhID">Học sinh</Option>
              <Option value="GiaoVienID">Giáo viên</Option>
              <Option value="SchoolID">Trường</Option>
            </Select>
          </Form.Item>
        </Form>
        <h3>Nôi dung báo cáo </h3>
        <Form
          name="createColumns"
          onFinish={onFinishCreateForm}
          autoComplete="off"
          form={formColumn}
        // initialValues={}
        >
          <Form.List name="createColumns">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="center"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "columnIndex"]}
                      fieldKey={[fieldKey, "columnIndex"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "75px" }}
                        placeholder="STT"
                        allowClear
                        disabled={true}
                      >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                        <Option value={6}>6</Option>
                        <Option value={7}>7</Option>
                        <Option value={8}>8</Option>
                        <Option value={9}>9</Option>
                        <Option value={10}>10</Option>
                        <Option value={11}>11</Option>
                        <Option value={12}>12</Option>
                        <Option value={13}>13</Option>
                        <Option value={14}>14</Option>
                        <Option value={15}>15</Option>
                        <Option value={16}>16</Option>
                        <Option value={17}>17</Option>
                        <Option value={18}>18</Option>
                        <Option value={19}>19</Option>
                        <Option value={20}>20</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "columnID"]}
                      fieldKey={[fieldKey, "columnID"]}
                      rules={[{ required: true, message: "Vui lòng nhập" }]}
                      style={{ width: "75px" }}
                      hidden={true}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "columnName"]}
                      fieldKey={[fieldKey, "columnName"]}
                      rules={[{ required: true, message: "Vui lòng nhập" }]}
                      style={{ width: "500px" }}
                    >
                      <Input placeholder="Tên cột" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "colDescription"]}
                      fieldKey={[fieldKey, "colDescription"]}
                      rules={[{ message: "Vui lòng nhập" }]}
                      style={{ width: "500px" }}
                    >
                      <Input placeholder="Mô tả" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "width"]}
                      fieldKey={[fieldKey, "width"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "150px" }}
                        placeholder="Chiều rộng"
                        allowClear
                        disabled={true}
                      >
                        <Option value={100}>100</Option>
                        <Option value={200}>200</Option>
                        <Option value={300}>300</Option>
                        <Option value={400}>400</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "allowNull"]}
                      fieldKey={[fieldKey, "allowNull"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "150px" }}
                        placeholder="Bắt buộc nhập"
                        allowClear
                        disabled={true}
                      >
                        <Option value={false}>Bắt buộc nhập</Option>
                        <Option value={true}>Không bắt buộc</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "inputType"]}
                      fieldKey={[fieldKey, "inputType"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "200px" }}
                        placeholder="Kiểu nhập liệu"
                        allowClear
                        disabled={true}

                      >
                        {inputType.map((s) => (
                          <Option key={s.InputType} value={s.InputType}>
                            {s.Description}
                          </Option>
                        ))}

                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "inputValue"]}
                      fieldKey={[fieldKey, "inputValue"]}
                    // rules={[{ required: true, message: "Vui lòng nhập" }]}
                    >{
                        formColumns[name].inputValue === null || formColumns[name].inputValue === "" ?
                          null
                          : <Input disabled={true} style={{ width: 300 }} />
                      }

                    </Form.Item>
                    <MinusCircleOutlined onClick={() => deleteCol(formColumns[name].columnID, name, remove)} />
                  </Space>
                ))}
                {/* <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={true}
                  >
                    TẠO CỘT
                  </Button>
                </Form.Item> */}
              </>
            )}
          </Form.List>
        </Form>

        <Form
          name="addColumns"
          onFinish={onFinishCreateForm}
          autoComplete="off"
          form={formAdd}
        >
          <Form.List name="addColumns">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="center"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "columnIndex"]}
                      fieldKey={[fieldKey, "columnIndex"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "75px" }}
                        placeholder="STT"
                        allowClear
                      >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                        <Option value={6}>6</Option>
                        <Option value={7}>7</Option>
                        <Option value={8}>8</Option>
                        <Option value={9}>9</Option>
                        <Option value={10}>10</Option>
                        <Option value={11}>11</Option>
                        <Option value={12}>12</Option>
                        <Option value={13}>13</Option>
                        <Option value={14}>14</Option>
                        <Option value={15}>15</Option>
                        <Option value={16}>16</Option>
                        <Option value={17}>17</Option>
                        <Option value={18}>18</Option>
                        <Option value={19}>19</Option>
                        <Option value={20}>20</Option>
                        <Option value={21}>21</Option>
                        <Option value={22}>22</Option>
                        <Option value={23}>23</Option>
                        <Option value={24}>24</Option>
                        <Option value={25}>25</Option>
                        <Option value={26}>26</Option>
                        <Option value={27}>27</Option>
                        <Option value={28}>28</Option>
                        <Option value={29}>29</Option>
                        <Option value={30}>30</Option>
                        <Option value={31}>31</Option>
                        <Option value={32}>32</Option>
                        <Option value={33}>33</Option>
                        <Option value={34}>34</Option>
                        <Option value={35}>35</Option>
                        <Option value={36}>36</Option>
                        <Option value={37}>37</Option>
                        <Option value={38}>38</Option>
                        <Option value={39}>39</Option>
                        <Option value={40}>40</Option>
                        <Option value={41}>41</Option>
                        <Option value={42}>42</Option>
                        <Option value={43}>43</Option>
                        <Option value={44}>44</Option>
                        <Option value={45}>45</Option>
                        <Option value={46}>46</Option>
                        <Option value={47}>47</Option>
                        <Option value={48}>48</Option>
                        <Option value={49}>49</Option>
                        <Option value={50}>50</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "columnName"]}
                      fieldKey={[fieldKey, "columnName"]}
                      rules={[{ required: true, message: "Vui lòng nhập" }]}
                      style={{ width: "500px" }}
                    >
                      <Input placeholder="Tên cột" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "colDescription"]}
                      fieldKey={[fieldKey, "colDescription"]}
                      rules={[{ message: "Vui lòng nhập" }]}
                      style={{ width: "500px" }}
                    >
                      <Input placeholder="Mô tả" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "width"]}
                      fieldKey={[fieldKey, "width"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "150px" }}
                        placeholder="Chiều rộng"
                        allowClear
                      >
                        <Option value={100}>100</Option>
                        <Option value={200}>200</Option>
                        <Option value={300}>300</Option>
                        <Option value={400}>400</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "allowNull"]}
                      fieldKey={[fieldKey, "allowNull"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "150px" }}
                        placeholder="Bắt buộc nhập"
                        allowClear
                      >
                        <Option value={false}>Bắt buộc nhập</Option>
                        <Option value={true}>Không bắt buộc</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "inputType"]}
                      fieldKey={[fieldKey, "inputType"]}
                      rules={[{ required: true, message: "Vui lòng chọn" }]}
                    >
                      <Select
                        style={{ width: "200px" }}
                        placeholder="Kiểu nhập liệu"
                        allowClear
                        onChange={(e) => handleChangeInputType(e, name)}
                      >
                        {inputType.map((s) => (
                          <Option key={s.InputType} value={s.InputType}>
                            {s.Description}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>


                    <Form.Item
                      {...restField}
                      name={[name, "inputValue"]}
                      fieldKey={[fieldKey, "inputValue"]}
                    >
                      {inputTypeHandle.length > 0 ? (
                        inputTypeHandle[name] ? (
                          inputTypeHandle[name].inputType === "select" ? (
                            <TextArea placeholder="giá trị 1,giá trị 2,giá trị 3" autoSize style={{ resize: 'none', width: 350 }} />
                          ) : null
                        ) : null
                      ) : null}
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    TẠO CỘT
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>

      </PageHeader>

    </>
  );
};

export default EditForm;
