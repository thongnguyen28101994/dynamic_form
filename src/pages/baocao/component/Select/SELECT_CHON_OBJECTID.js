import React, { useState, useEffect } from "react";
import { Select, Form, Button } from "antd";
import moment from "moment";
import schoolAPI from "../../../../apis/schoolApi";
import { PlusOutlined } from "@ant-design/icons";
const SELECT_CHON_OBJECTID = React.memo(
  ({
    columns,
    dshs,
    lops,
    setSelectedHs,
    getDSHocSinh,
    isChooseMulti,
    setAddRowButtonOpen,
  }) => {
    const [ischoose, setIsChoose] = useState(false);
    return (
      <>
        <Form.Item key={1}>
          <Select
            showSearch
            placeholder={`Thêm dòng toàn bộ hoặc một object `}
            optionFilterProp="children"
            defaultValue={0}
            onChange={(e) => {
              isChooseMulti(e);
              setIsChoose(e);
              if (e === 1) setAddRowButtonOpen(true);
              else setAddRowButtonOpen(false);
            }}
          >
            <Select.Option value={0}>Thêm Dòng Tất Cả</Select.Option>
            <Select.Option value={1}>Thêm Từng Dòng</Select.Option>
          </Select>
        </Form.Item>
        {ischoose ? (
          <>
            {columns[0].dataCategory === "HocSinhID" ? (
              <>
                <Form.Item key={1}>
                  <Select
                    showSearch
                    placeholder={`Chọn Lớp`}
                    optionFilterProp="children"
                    onChange={(e) => {
                      getDSHocSinh(e);
                    }}
                  >
                    {lops.map((value) => (
                      <Select.Option key={value.LopID} value={value.LopID}>
                        {value.TenLop}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item key={2}>
                  <Select
                    showSearch
                    placeholder={`Chọn Học Sinh`}
                    optionFilterProp="children"
                    onChange={(e) => {
                      setSelectedHs(e);
                      setAddRowButtonOpen(false);
                    }}
                  >
                    {dshs.map((value) => (
                      <Select.Option
                        key={value.hocSinhID}
                        value={value.hocSinhID}
                      >
                        {value.hocSinhID + " " + value.ho + " " + value.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            ) : columns[0].dataCategory === "GiaoVienID" ? (
              <Form.Item key={1}>
                <Select
                  showSearch
                  placeholder={`Chọn Giáo Viên`}
                  optionFilterProp="children"
                  onChange={(e) => {
                    setSelectedHs(e);
                    setAddRowButtonOpen(false);
                  }}
                >
                  {dshs.map((value) => (
                    <Select.Option
                      key={value.hocSinhID}
                      value={value.hocSinhID}
                    >
                      {value.hocSinhID + " " + value.ho + " " + value.ten}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item key={1}>
                <Select
                  showSearch
                  placeholder={`Chọn Điểm Trường`}
                  optionFilterProp="children"
                  onChange={(e) => {
                    setSelectedHs(e);
                    setAddRowButtonOpen(false);
                  }}
                >
                  {dshs.map((value) => (
                    <Select.Option
                      key={value.hocSinhID}
                      value={value.hocSinhID}
                    >
                      <b>Điểm trường: </b> {`${value.TenDiemTruong} `}
                      {","}
                      <b>Địa Chỉ:</b> {`${value.DiaChi}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </>
        ) : null}
      </>
    );
  }
);

export default SELECT_CHON_OBJECTID;
