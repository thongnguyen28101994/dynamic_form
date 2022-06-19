import React from "react";
import { Table, Tag, Space, Button } from "antd";
const columns = [
  {
    title: "Tên Trường",
    dataIndex: "name",
    key: "name",
    render: (text) => text,
  },
  {
    title: "Cấp học",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Trạng Thái",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag === "Chưa chấm" ? "geekblue" : "green";
          if (tag === "Chưa nộp") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary">Xem</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "THPT Lê Hồng Phong",
    age: 3,
    address: "New York No. 1 Lake Park",
    tags: ["Đã chấm"],
  },
  {
    key: "2",
    name: "THPT Trần Đại Nghĩa",
    age: 3,
    address: "London No. 1 Lake Park",
    tags: ["Chưa nộp"],
  },
  {
    key: "3",
    name: "Phòng Giáo dục Quân 1",
    age: "PGD",
    address: "Sidney No. 1 Lake Park",
    tags: ["Chưa chấm"],
  },
];

const ListSchoolDanhGia = () => {
  return (
    <div>
      <h2 id="h2-tieude">danh sách trường đánh gia CNTT</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ListSchoolDanhGia;
