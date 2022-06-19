import React, { useState, useEffect } from "react";
import { Select } from "antd";
import moment from "moment";
import schoolAPI from "../../../../apis/schoolApi";
const SELECT_CHON_BAOCAO = ({ dmForm, getColumn }) => {
  // const [dmForm, setDMForm] = useState([]);

  return (
    <>
      <Select
        key="1"
        placeholder="Chọn báo cáo"
        onChange={getColumn}
        style={{ width: 900 }}
      >
        {dmForm.map((value) => (
          <Select.Option key={value.FormID} value={value.FormID}>
            <b>Tên Báo Cáo: </b> {`${value.FormName} ,`}
            <b>Người Tạo: </b> {`${value.Publisher} ,`}
            <b>Ngày Tạo: </b>
            {moment(value.CreateTime).format("DD/MM/YYYY")}
            {` ,`}
            <b>Ngày Kết Thúc: </b>
            {moment(value.ExpiredAt).format("DD/MM/YYYY, h:mm:ss a")}
          </Select.Option>
        ))}
      </Select>
      ,
    </>
  );
};

export default SELECT_CHON_BAOCAO;
