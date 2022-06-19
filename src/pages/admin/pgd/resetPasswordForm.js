import React, { useState, useEffect } from "react";
import {
    AutoComplete,
  Input,
  Button,
  Modal,
  message
} from "antd";
import adminApi from "../../../apis/adminApi";
const ResetPasswordForm = ({DonViIDs,isShowModal,ShowModalF}) => {
    const [schoolID,SetSchoolID]=useState('');
    const mapData =() =>{
      var newData = DonViIDs.map(item=>{
            var data=[];
            //data['value']=item.DonViID;
            data['value']=item.FullName;
            data['label']=item.FullName;
            return data;
        })
        return newData;
    }
    const onSelect = (data) => {
      var newData= DonViIDs.filter((o)=>{return o.FullName===data})[0].DonViID;
      SetSchoolID(newData.toUpperCase());
      };
    const submitData = async () =>{
        await adminApi.resetPasswordBySchoolID(schoolID).then((res)=>{
            message.success("Thành công");
        })
        console.log(schoolID);
    }
  return(
    <>
    <Modal
        visible={isShowModal}
        width={350}
        title={'Reset Mật khẩu'}
        onCancel={() => {
          ShowModalF();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              ShowModalF();
            }}
          >
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={submitData}>
              Reset Mật khẩu
          </Button>,
        ]}
      >
    <AutoComplete
    onSelect={onSelect}
    dropdownMatchSelectWidth={300}
    style={{
      width: 300,
    }}
    options={mapData()}
    filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
  >
    <Input size="medium" placeholder="nhập tên trường" />
  </AutoComplete>
    </Modal>
          </>
  );
}
export default ResetPasswordForm
