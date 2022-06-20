import React, { useState, useEffect } from "react";
import FormCustom from "./formbaocao";
import {
  PageHeader,
  Button,
  message,
  Form,
  Input,
  Spin,
  Select,
  Table,
  Tooltip,
  Pagination,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
export default function InlineForm() {
  const [form] = Form.useForm();
  const { Column } = Form;
  //state
  const [columns, setColumns] = useState([]);

  //function
  const getFormValue = async () => {};
  const addNewRow = async (addEmptyRow, add) => {
    add();
  };
  const addEmptyRow = async () => {};
  const deleteNewRow = async () => {};

  const onFinish = async () => {};

  //effect
  useEffect(() => {
    getFormColumn();
  }, []);
  //DuLieuGia
  const getFormColumn = () => {
    const columns = [
      {
        columnID: 1,
        columnName: "Test1",
      },
      {
        columnID: 2,
        columnName: "Test2",
      },
      {
        columnID: 3,
        columnName: "Test3",
      },
      {
        columnID: 4,
        columnName: "Test4",
      },
      {
        columnID: 5,
        columnName: "Test5",
      },
    ];
    setColumns(columns);
  };

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        title="Form Báo Cáo Dạng Bảng"
      >
        {columns.length > 0 ? (
          <>
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    <Table
                      dataSource={fields}
                      pagination={false}
                      bordered
                      scroll={{ x: 1500, y: 650 }}
                      title={() => {
                        return (
                          <>
                            <Form.Item>
                              <Button
                                type="dashed"
                                // disabled={isDisableAddField}
                                onClick={() => {
                                  addNewRow(addEmptyRow, add);
                                  //   if (isChooseMulti)
                                  //     addNewRow(selectedHS, addEmptyRow, add);
                                  //   else addMultiRow();
                                }}
                                block
                                icon={<PlusOutlined />}
                              >
                                Thêm Dòng
                              </Button>
                            </Form.Item>
                          </>
                        );
                      }}
                    >
                      {columns.map(({ columnID, columnName, ...restProps }) => (
                        <>
                          <Column
                            dataIndex={columnID}
                            title={
                              <Tooltip title={restProps.colDescription}>
                                {columnName}
                              </Tooltip>
                            }
                            width={restProps.width}
                            // align={"center"}
                            render={(value, row, index) => {
                              return (
                                <FormCustom
                                  name={index}
                                  formValue={form}
                                  fieldKey={index}
                                  columnID={columnID}
                                  columnName={columnName}
                                  {...restProps}
                                />
                              );
                            }}
                          ></Column>
                        </>
                      ))}
                      <Column
                        dataIndex={"ThaoTac"}
                        title={"Thao Tác"}
                        fixed="right"
                        width={200}
                        render={(value, row, index) => {
                          return (
                            <>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: "5%" }}
                                onClick={() => {
                                  //   SetSelectedRowEdit({
                                  //     RowID: valueCol[index].RowID,
                                  //   });
                                }}
                              >
                                <MinusCircleOutlined /> Lưu
                              </Button>
                              <Button
                                danger
                                onClick={() => {
                                  let columnFiles = columns.filter(
                                    (x) => x.inputType === "file"
                                  );
                                  if (columnFiles.length > 0) {
                                    columnFiles.forEach((item) => {
                                      //   deleteFile(
                                      //     valueCol[index].RowID,
                                      //     item.columnID
                                      //   );
                                    });
                                  }
                                  deleteNewRow();
                                  // valueCol[index].RowID,
                                  // index,
                                  // remove
                                }}
                              >
                                <MinusCircleOutlined /> Xóa
                              </Button>
                            </>
                          );
                        }}
                      />
                    </Table>
                  </>
                )}
              </Form.List>
            </Form>
          </>
        ) : null}
      </PageHeader>
    </>
  );
}
