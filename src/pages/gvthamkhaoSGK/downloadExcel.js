import React, { useState, useEffect } from "react";
import { message, PageHeader } from "antd";
import { useHistory } from "react-router-dom";
import { axiosClientKhaosat7 } from "../../apis/axiosClient";
import { Select } from "antd";
import "./downloadExcel.css";
const DownloadExcel = () => {
  const { Option } = Select;
  let history = useHistory();
  const [dsForm, setDSForm] = useState([]);
  const [selectedURL, SetSelectedURL] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axiosClientKhaosat7.get(
      "https://apigateway.hcm.edu.vn/WAPINetCore/Misc/getDMFormThongKe"
    );
    setDSForm(res.result);
  };

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => history.goBack()}
        title="Tải File Excel"
      ></PageHeader>
      <div className="download">
        <div className="download-dropdown">
          <Select
            placeholder="Chọn Sự kiện"
            showSearch
            style={{ width: "100%" }}
            optionFilterProp="children"
            allowClear
            onChange={(item) => {
              let newItem = item && item.split("_")[0];
              SetSelectedURL(newItem);
            }}
          >
            {dsForm.map((item) => (
              <Option
                key={item.formThongKeID}
                value={item.apI_Url + "_" + item.formThongKeID}
              >
                {item.tenSuKien}
              </Option>
            ))}
          </Select>
        </div>
        <button
          className="download-button"
          onClick={async () => {
            if (selectedURL !== "" && selectedURL !== undefined) {
              var children =
                document.getElementsByClassName("download-link")[0];
              var spining = document.getElementsByClassName("download-spin")[0];
              axiosClientKhaosat7.customRequest = () => {
                spining.style.display = "inline-block";
                children.innerHTML = "Đang Convert File Excel";
              };
              axiosClientKhaosat7.customResponse = (response) => {
                children.innerHTML = "";
                spining.style.display = "none";
                if (response !== "" && response !== undefined) {
                  if (response.statusCode === 200) {
                    var link = document.createElement("a");
                    var fileName = response.result.split("/");
                    link.href = response.result;
                    link.target = "_blank";
                    link.innerHTML = fileName[fileName.length - 1];
                    link.rel = "noopener noreferrer";
                    children.appendChild(link);
                  } else message.error(response.message);
                }
              };
              await axiosClientKhaosat7.get(selectedURL);
            } else {
              message.error("Vui lòng chọn sự kiện");
            }
          }}
        >
          Tải File
        </button>
        <div className="download-spin"></div>
        <div className="download-link"></div>
      </div>
    </>
  );
};
export default DownloadExcel;
