import React from "react";
import { PageHeader } from "antd";
import FormUpdateSchool from "../School/FormUpdateSchool";
const SchoolInformation = () => {
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        // onBack={() => window.history.back()}
        title="Thông tin trường"
      ></PageHeader>
      <FormUpdateSchool />
      
    </>
  );
};

export default SchoolInformation;
