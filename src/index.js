import React from "react";
import ReactDOM from "react-dom";
import "./statics/css/style.css";
import App from "./routers/index";
import "react-datasheet/lib/react-datasheet.css";
import * as serviceWorker from "./serviceWorker";
import DuyetHocSinh from "../src/pages/school/student/duyetHocSinh";
import DanhGia from "../src/pages/danhgia/Index";
import DanhGiaSGD from "../src/pages/danhgia/sgdreview";
import ListSChoolDanhGia from "../src/pages/danhgia/listsSchoolDanhGia";
import SchoolHome from "../src/pages/danhgia/schoolHome";
import PrintDanhGia from "../src/pages/danhgia/printDanhGia";
import UpdateStudent from "../src/pages/school/student/updateInfo";

import UpdateAddress from "./components/schools/updateAddress";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
