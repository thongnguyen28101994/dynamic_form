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
  Checkbox,
  DatePicker,
  Upload,
} from "antd";
import {
  PlusSquareOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const FormRender = (props) => {
  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const changeFileList = (data) => {
    setFileList(data);
  };
  function beforeUpload(file) {
    const isPDF =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword";
    //console.log(isPDF);
    if (!isPDF) {
      message.error("You can only upload PDF or Word file!");
      return false;
    }
  }
  // useEffect(() => {
  //   let data =
  //     props.formValue.getFieldsValue().users[props.fieldKey][props.columnID];
  //   changeFileList(data);
  // }, []);
  // const uploadProps = {
  //   name: "file",
  //   action:
  //     "https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/UploadFile/" +
  //     props.formValue.getFieldsValue().users[props.fieldKey].RowID +
  //     "/" +
  //     props.columnID,
  //   headers: {
  //     token: sessionStorage.getItem("token"),
  //   },
  //   onChange(info) {
  //     let fileList = [...info.fileList];
  //     fileList = fileList.slice(-1);
  //     fileList = fileList.map((file) => {
  //       if (file.response) {
  //         // Component will show file.url as link
  //         file.url = file.response.url;
  //       }
  //       return file;
  //     });
  //     changeFileList(fileList);
  //     if (info.file.status !== "uploading") {
  //       // console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  switch (props.inputType) {
    case "select":
      let selectkey = JSON.parse(props.inputValue);
      return (
        <Select showSearch placeholder={`${props.columnName}`}>
          {selectkey.map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      );
    case "checkbox":
      return <Checkbox></Checkbox>;
    case "date":
      return <DatePicker format="DD/MM/YYYY" />;
    // case "tel":
    //   return <Input.Tel placeholder={props.columnName} />;
    case "number":
      return (
        <Input
          placeholder={props.columnName}
          onChange={(e) =>
            onHandleChangeNumeric(
              e,
              props.formValue,
              props.fieldKey,
              props.columnID
            )
          }
        />
      );
    // case "file":
    //   return (
    //     <Upload
    //       {...uploadProps}
    //       fileList={fileList}
    //       maxCount={1}
    //       beforeUpload={beforeUpload}
    //     >
    //       <Button icon={<UploadOutlined />}>Click to Upload</Button>
    //     </Upload>
    //   );
    case "tel":
      return (
        <Input
          placeholder={props.columnName}
          onChange={(e) =>
            onHandleChangeNumeric(
              e,
              props.formValue,
              props.fieldKey,
              props.columnID
            )
          }
        />
      );
    default:
      return <Input placeholder={props.columnName} />;
  }
};
const onHandleChangeNumeric = (e, formValue, fieldKey, columnID) => {
  let valu = Number.parseInt(e.target.value);
  let formVal = formValue.getFieldsValue();
  if (!Number(valu) && valu.length > 0) {
    message.warning("Chỉ nhập số trong cột này");
    formVal.users[fieldKey][columnID] = "";
    formValue.setFieldsValue(formVal);
  }
};
const FormCustom = React.memo(({ ...restProps }) => {
  return (
    <>
      <Form.Item
        label={restProps.columnName}
        key={restProps.columnID}
        name={[restProps.name, restProps.columnID + ""]}
        valuePropName={restProps.inputType === "checkbox" ? "checked" : "value"}
        // fieldKey={[restProps.fieldKey, restProps.columnID]}
        rules={[
          {
            required: !restProps.allowNull,
            message: `Missing ${restProps.columnName}`,
          },
        ]}
      >
        {FormRender(restProps)}
      </Form.Item>
    </>
  );
});

export default FormCustom;
