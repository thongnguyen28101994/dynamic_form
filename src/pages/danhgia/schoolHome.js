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
        <Button type="primary">XEM SỞ ĐÁNH GIÁ</Button>
        <Button type="primary">ĐÁNH GIÁ</Button>
        <Button type="primary">IN</Button>
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
];
const SchoolHome = () => {
  return (
    <div>
      <h2 id="h2-tieude">đánh giá CNTT</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default SchoolHome;
