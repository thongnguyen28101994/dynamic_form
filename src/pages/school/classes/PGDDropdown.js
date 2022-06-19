import React, { useState, useEffect } from "react";
import {
  Select
} from "antd";
const { Option } = Select;

const PGDDropdown = ({PGDs,ID,selectedIDF}) => {
  return(
    <><Select
          placeholder="Chọn Phòng Giáo dục"
          showSearch
          style={{ width: 300 }}
          optionFilterProp="children"
          allowClear
          value={ID}
          onChange={selectedIDF}
          >
            {PGDs.map((value) => (
                <Option key={value.PGDID} value={value.PGDID}>
                  {value.TenPGD}
                </Option>
            ))}
          </Select>
          </>
  );
}
export default PGDDropdown
