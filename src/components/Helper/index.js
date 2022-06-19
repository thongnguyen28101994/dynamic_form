import React, { useState, useEffect } from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/entry.webpack";
import pdf from "../../statics/HD_QuanLyHCMEDU_V2108.pdf";
import { Button, Space, Typography } from "antd";

const { Text } = Typography;
const Helper = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const previous = () => setPageNumber(pageNumber - 1);
  const next = () => setPageNumber(pageNumber + 1);
  return (
    <div>
      <Document width="1024px" file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <p style={{ textAlign: "center" }}>
        <Text type="secondary">
          Page {pageNumber} of {numPages}
        </Text>
      </p>
      <p style={{ textAlign: "center" }}>
        <Space>
          <Button
            disabled={pageNumber > 1 ? false : true}
            onClick={() => previous()}
          >
            Trước
          </Button>
          <Button onClick={() => next()}>Sau</Button>
        </Space>
      </p>
    </div>
  );
};

export default Helper;
