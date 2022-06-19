import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Classes from "../pages/school/classes/index";
import Student from "../pages/school/student/index";
import ImportStudentFromExcel from "../pages/school/student/importFromExcel";
import CreateStudent from "../pages/school/student/createStudent";
import AcceptUpdateStudent from "../pages/admin/sgd/studentUpdate";
import Exam from "../pages/school/exam/index";
import Register from "../pages/school/exam/register";
import Direction from "./direction";
import Lop10NCL from "../pages/school/lop10NCL";
import { LeaveSchool } from "../components/students/transform";
import UpdateInfo from "../pages/school/student/updateInfo";
import PGD from "../pages/admin/pgd/index";
import KhaoSat7 from "../pages/khaosat7/index";
import ThiThu from "../pages/thithu/index";
import ThamKhaoSGK from "../pages/gvthamkhaoSGK/index";
import DownloadExcel from "../pages/gvthamkhaoSGK/downloadExcel";
import AllocateGrade6ToSchool from "../pages/admin/pgd/allocateGrade6ToSchool";
import AllocateGrade6 from "../pages/admin/pgd/allocateGrade6";
import HsChuyenDen from "../pages/qlihoso";
import CreateForm from "../pages/dynamicForm/createForm";
import ListForm from "../pages/dynamicForm/listForm";
import ReportForm from "../pages/dynamicForm/reportForm";
import EditForm from "../pages/dynamicForm/editForm";
import InstanceInfo from "../pages/dynamicForm/listInstance";

import FormBaoCao from "../pages/baocao/index";
import SchoolInformation from "../pages/school/School/schoolInfomation";

const hist = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/token/:token/:page/">
          <Direction />
        </Route>
        <Route
          exact
          path="/danhsachlop"
          render={() => {
            if (sessionStorage.getItem("token")) {
              return <Classes />;
            }
          }}
        ></Route>
        <Route exact path="/danhsachtaikhoan">
          <PGD />
        </Route>
        <Route exact path="/danhsachhocsinh/:lopID/:namID">
          <Student />
        </Route>
        <Route exact path="/nophocsinhexcel/:lopID">
          <ImportStudentFromExcel />
        </Route>
        <Route exact path="/nophocsinh/:lopID">
          <CreateStudent />
        </Route>
        <Route exact path="/nophocsinh10ngoaitinh/:lopID">
          <Lop10NCL />
        </Route>
        <Route exact path="/danhsachkythi">
          <Exam />
        </Route>
        <Route exact path="/dangkythi/:kyThiID">
          <Register />
        </Route>
        <Route
          exact
          path="/duyetcapnhat"
          render={() => {
            if (sessionStorage.getItem("session")) {
              const session = JSON.parse(sessionStorage.getItem("session"));
              if (session.AccountType === "SGD") {
                return <AcceptUpdateStudent />;
              }
            }
          }}
        ></Route>
        <Route exact path="/biendong">
          <LeaveSchool />
        </Route>
        <Route exact path="/thongtintruong">
          <SchoolInformation />
        </Route>
        <Route exact path="/xincapnhat">
          <UpdateInfo />
        </Route>
        <Route exact path="/khaosat7">
          <KhaoSat7 />
        </Route>
        <Route exact path="/thithpt">
          <ThiThu />
        </Route>
        <Route exact path="/dschuyenden">
          <HsChuyenDen />
        </Route>
        <Route exact path="/danhsachthamkhaoSGK">
          <ThamKhaoSGK />
        </Route>
        <Route exact path="/filethongke">
          <DownloadExcel />
        </Route>
        <Route exact path="/phanbokhoi6">
          <AllocateGrade6 />
        </Route>
        <Route exact path="/phanbokhoi6vaotruong/:schoolId">
          <AllocateGrade6ToSchool />
        </Route>
        <Route exact path="/createForm">
          <CreateForm />
        </Route>
        <Route exact path="/listform">
          <ListForm />
        </Route>
        <Route exact path="/reportForm/:formId">
          <ReportForm />
        </Route>
        <Route exact path="/editForm/:formId">
          <EditForm />
        </Route>
        <Route exact path="/instanceInfo/:formId">
          <InstanceInfo />
        </Route>
        <Route exact path="/formbaocao">
          <FormBaoCao />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
