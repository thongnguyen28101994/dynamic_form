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
import { useHistory } from "react-router-dom";
import adminAPI from "../../apis/adminApi";
import globalApi from "../../apis/globalApi";
import Table from "rc-table/lib/Table";
import moment from "moment";

const { Option } = Select;

const CreateForm = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const [formColumn] = Form.useForm();
  const [dataType, setDataType] = useState([]);
  const [inputType, setInputType] = useState();
  const [inputTypeHandle, setInputTypeHandle] = useState([]);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [columnPreview, setColumnPreview] = useState();
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const { TextArea } = Input;

  const onFinishCreateForm = () => {
    console.log(moment(form.getFieldValue("expireDay")));
    form.validateFields().then(async (s) => {
      formColumn.validateFields().then(async (s) => {
        console.log(s);
        if (s.createColumns) {
          if (s.createColumns.length > 0) {
            await adminAPI
              .createNewForm({
                formName: form.getFieldValue("formName"),
                expiredAt: moment(form.getFieldValue("expireDay")).format(),
                dataCategory: form.getFieldValue("dataCategory"),
                accountType: "Trg",
              })
              .then(async (res) => {
                let donViID = [];
                const capBaoBao = form.getFieldValue("donViID");
                await capBaoBao.map(async (s) => {
                  let donvis = [];
                  if (s === "Cap 1") {
                    donvis = await adminAPI.getTruong({ cap1: 1 });
                    donViID.push(donvis.result.map((s) => s.schoolID));
                  } else if (s === "Cap 2") {
                    donvis = await adminAPI.getTruong({ cap2: 1 });
                    donViID.push(donvis.result.map((s) => s.schoolID));
                  } else if (s === "Cap 3") {
                    donvis = await adminAPI.getTruong({ cap3: 1 });
                    donViID.push(donvis.result.map((s) => s.schoolID));
                  } else if (s === "mam non") {
                    donvis = await adminAPI.getTruong({ mamNon: 1 });
                    donViID.push(donvis.result.map((s) => s.schoolID));
                  } else if (s === "gdtx") {
                    donvis = await adminAPI.getTruong({ gdtx: 1 });
                    donViID.push(donvis.result.map((s) => s.schoolID));
                  } else if (s === "pgd") {
                    donvis = await globalApi.getPhongGiaoDuc();
                    donViID.push(donvis.Result.map((s) => s.PGDID));
                  }
                  await adminAPI.addInstance({
                    formID: res.result[0].FormID,
                    donViID: donViID[0],
                  });
                });
                const columnsAdd = formColumn.getFieldsValue().createColumns;
                console.log(columnsAdd);
                columnsAdd.map(async (s) => {
                  await adminAPI.addColumn({
                    formID: res.result[0].FormID,
                    columnIndex: s.columnIndex,
                    columnName: s.columnName,
                    dataType:
                      s.inputType === "number"
                        ? "numeric"
                        : s.inputType === "date"
                        ? "datetime"
                        : s.inputType === "checkbox"
                        ? "bit"
                        : s.inputType === "file"
                        ? "file"
                        : "text",
                    width: s.width,
                    inputValue: s.inputValue
                      ? `[${s.inputValue.split(",").map((s) => '"' + s + '"')}]`
                      : "",
                    allowNull: s.allowNull,
                    inputType: s.inputType,
                    colDescription: s.colDescription,
                  });
                });
              });
            message.success("Lưu thành công!");
            history.push("/listform");
          } else {
            message.error("Chưa tạo cột");
          }
        } else {
          message.error("Chưa tạo cột");
        }
      });
    });
  };

  const handleChangeInputType = (inputType, index) => {
    let inputTypeHandleTmp = [...inputTypeHandle];
    inputTypeHandleTmp[index] = { index, inputType };
    setInputTypeHandle(inputTypeHandleTmp);
  };

  const handlePreview = () => {
    let columns = formColumn.getFieldsValue().createColumns
      ? formColumn.getFieldsValue().createColumns.length > 0
        ? formColumn.getFieldsValue().createColumns.map((s) => {
            return {
              columnName: s.columnName,
              width: s.width,
              columnIndex: s.columnIndex,
            };
          })
        : null
      : null;
    setColumnPreview(columns);
  };

  const initData = async () => {
    const dataTypeRes = await adminAPI.getDataType();
    setDataType(dataTypeRes.result);
    const inputTypeRes = await adminAPI.getInputType();
    setInputType(inputTypeRes.result);
    console.log(inputTypeRes.result);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Tạo báo cáo"
        extra={[
          <Button
            icon={<EyeFilled />}
            size="large"
            key="1"
            type="primary"
            onClick={() => {
              handlePreview();
              setIsShowPreview(true);
            }}
          >
            XEM THỬ
          </Button>,
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
            <Select placeholder="Đối tượng báo cáo" allowClear>
              <Option value="HocSinhID">Học sinh</Option>
              <Option value="GiaoVienID">Giáo viên</Option>
              <Option value="SchoolID">Trường</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...{
              wrapperCol: { offset: 0, span: 8 },
            }}
            label="Cấp báo cáo"
            name="donViID"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Cấp báo cáo"
              // onChange={handleChange}
            >
              <Option value="mam non">Mầm non</Option>
              <Option value="Cap 1">Cấp 1</Option>
              <Option value="Cap 2">Cấp 2</Option>
              <Option value="Cap 3">Cấp 3</Option>
              <Option value="gdtx">GDTX</Option>
              <Option value="pgd">PGD</Option>
            </Select>
          </Form.Item>
        </Form>
        <h3>Nôi dung báo cáo </h3>
        <Form
          name="createColumns"
          onFinish={onFinishCreateForm}
          autoComplete="off"
          form={formColumn}
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
                            <TextArea
                              placeholder="giá trị 1,giá trị 2,giá trị 3"
                              autoSize
                              style={{ resize: "none", width: 350 }}
                            />
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
      <Modal
        visible={isShowPreview}
        onOk={() => setIsShowPreview(false)}
        onCancel={() => setIsShowPreview(false)}
        title="Xem thử hiện thị dạng bảng"
        width="100%"
      >
        {/* <Table columns={columnPreview} dataSource={null} /> */}
        {/* <Space> */}
        <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
          {columnPreview ? (
            <>
              <Input
                value="Đối tượng báo cáo"
                disabled
                style={{ width: 200, display: "inline-block" }}
              />
              {columnPreview
                ? columnPreview.length > 0
                  ? columnPreview
                      .sort((a, b) =>
                        a.columnIndex > b.columnIndex
                          ? 1
                          : b.columnIndex > a.columnIndex
                          ? -1
                          : 0
                      )
                      .map((s) => (
                        <Input
                          value={s.columnName}
                          key={s.columnName}
                          disabled
                          style={{ width: s.width, display: "inline-block" }}
                        />
                      ))
                  : null
                : null}
            </>
          ) : null}
          {/* </Space> */}
          <br />
          {/* <Space> */}
          {columnPreview ? (
            <>
              <Input disabled style={{ width: 200, display: "inline-block" }} />
              {columnPreview
                ? columnPreview.length > 0
                  ? columnPreview
                      .sort((a, b) =>
                        a.columnIndex > b.columnIndex
                          ? 1
                          : b.columnIndex > a.columnIndex
                          ? -1
                          : 0
                      )
                      .map((s) => (
                        <Input
                          key={s.columnName}
                          disabled
                          style={{ width: s.width, display: "inline-block" }}
                        />
                      ))
                  : null
                : null}
            </>
          ) : null}
          {/* </Space> */}
          <br />
          {/* <Space> */}
          {columnPreview ? (
            <>
              <Input disabled style={{ width: 200, display: "inline-block" }} />
              {columnPreview
                ? columnPreview.length > 0
                  ? columnPreview
                      .sort((a, b) =>
                        a.columnIndex > b.columnIndex
                          ? 1
                          : b.columnIndex > a.columnIndex
                          ? -1
                          : 0
                      )
                      .map((s) => (
                        <Input
                          key={s.columnName}
                          disabled
                          style={{ width: s.width, display: "inline-block" }}
                        />
                      ))
                  : null
                : null}
            </>
          ) : null}
          {/* </Space> */}
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
};

export default CreateForm;
