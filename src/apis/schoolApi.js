import axiosClient, {
  axiosClientPostFormData,
  axiosClientAdminToken,
} from "../apis/axiosClient";

const schoolAPI = {
  getHsLenLop: (khoi) => {
    const url = `/apiChuyenTruong/getHocSinhLenLop/${khoi}`;
    return axiosClient.get(url);
  },
  getHsByLopID: (lopID, dotDiemID) => {
    const url = `/apiChuyenTruong/getHocSinhInfobyLopID/${lopID}/${dotDiemID}`;
    return axiosClient.get(url);
  },
  xepLopHocSinh: (params) => {
    const url = `/apiChuyenTruong/postXepLopHocSinh`;
    return axiosClient.post(url, params);
  },
  xepLopHocSinhDotDiem: (params) => {
    const url = `/apiChuyenTruong/postXepLopHocSinhDotDiem`;
    return axiosClient.post(url, params);
  },
  nopHocSinh: (params) => {
    const url = `/apiChuyenTruong/CreateHocSinh`;
    return axiosClient.post(url, params);
  },
  insertStudent: (params) => {
    const url = "/apiChuyenTruong/CreateHocSinhIDBased";
    return axiosClient.post(url, params);
  },
  getPGD: () => {
    const url = "/wapiquanly/getPhongGiaoDuc";
    return axiosClient.get(url);
  },
  insertClass: (params) => {
    const url = "/apiChuyenTruong/CreateLop";
    return axiosClient.post(url, params);
  },
  getClass: (params) => {
    const url = `/apiChuyenTruong/GetLop/${params}`;
    return axiosClient.get(url);
  },
  getDotDiem: () => {
    const url = "/wapiquanly/getDMDotDiem";
    return axiosClient.get(url);
  },
  getHocSinhChoDuyetByLopId: (params) => {
    const url = `/apiChuyenTruong/getHocSinhChoDuyetbyLopID/${params}`;
    return axiosClient.get(url);
  },
  xoaHocSinhChoDuyet: (params) => {
    const url = `/apiChuyenTruong/deleteHocSinhTemp/${params}`;
    return axiosClient.get(url);
  },
  searchHocSinh: (params) => {
    const url = `/apiChuyenTruong/searchHocSinhID`;
    return axiosClient.post(url, params);
  },
  xoaLop: (params) => {
    const url = `/apiChuyenTruong/DeleteLop`;
    return axiosClient.post(url, params);
  },
  searchHocSinhById: (HocSinhId) => {
    const url = `apiChuyenTruong/getHocSinhByID/${HocSinhId}`;
    return axiosClient.get(url);
  },
  tiepNhanHocSinhDauCap: (params) => {
    const url = `/apiChuyenTruong/TiepNhanHocSinhDauCap`;
    return axiosClient.post(url, params);
  },
  getHocSinhChoDuyetByPhong: (namID, duyet) => {
    const url = `/apiChuyenTruong/getHocSinhChoDuyetbyPhong/${namID}/${duyet}`;
    return axiosClient.get(url);
  },
  getdonvi: () => {
    const url = "wapiquanly/getDonVi";
    return axiosClient.get(url);
  },
  approvedHocSinh: () => {
    const url = "apiChuyenTruong/ApproveHocSinh";
    return axiosClient.post(url);
  },
  getLopsByKhoi: (NamHocID, Khoi) => {
    const url = `apiChuyenTruong/GetLop/${NamHocID}/${Khoi}`;
    return axiosClient.get(url);
  },
  getHocSinhTrungTuyen10: (NamHocID) => {
    const url = `apiChuyenTruong/getHocSinhTrungTuyen10/${NamHocID}`;
    return axiosClient.get(url);
  },
  getHocSinhInfobyTruongID: (dotDiemID) => {
    const url = `apiChuyenTruong/getHocSinhInfobyTruongID/${dotDiemID}`;
    return axiosClient.get(url);
  },
  postBienDongThoiHocHocSinh: (params) => {
    const url = "apiChuyenTruong/postBienDongThoiHocHocSinh";
    return axiosClient.post(url, params);
  },
  postUpdateLop: (params) => {
    const url = "apiChuyenTruong/postUpdateLop";
    return axiosClient.post(url, params);
  },
  getTruongInfobyID: () => {
    const url = `apiTruong/getTruongInfobyID`;
    return axiosClient.get(url);
  },
  postTruongInfobyID: (params) => {
    const url = "apiTruong/postUpdateTruongInfo";
    return axiosClient.post(url, params);
  },
  getUpdateField: () => {
    const url = `apiChuyenTruong/GetUpdateField`;
    return axiosClient.get(url);
  },
  PostUpdateHS: (params) => {
    const url = "apiChuyenTruong/PostUpdateHS";
    return axiosClient.post(url, params);
  },
  getHocSinhUpDateLog: () => {
    const url = `apiChuyenTruong/getHocSinhUpDateLog`;
    return axiosClient.get(url);
  },
  deleteUpdateHS: (params) => {
    const url = `apiChuyenTruong/DeleteUpdateHS`;
    return axiosClient.post(url, params);
  },
  postXepLopHocSinhchuaxeplop: (params) => {
    const url = `apiChuyenTruong/postXepLopHocSinhchuaxeplop`;
    return axiosClient.post(url, params);
  },
  postTiepNhanHocSinhBiThieu: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/ChuyenTruongHocSinh`;
    return axiosClient.post(url, params);
  },
  createDiemTruong: (params) => {
    const url = `apiTruong/createDiemTruong`;
    return axiosClient.post(url, params);
  },
  getDiemTruong: () => {
    const url = `apiTruong/getDiemTruong`;
    return axiosClient.get(url);
  },
  deleteDiemTruong: (id) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/GIS/deleteDiemTruong/${id}`;
    return axiosClient.get(url);
  },
  postSchoolImage: (params, diemTruongId) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/GIS/PostSchoolImage/${diemTruongId}`;
    return axiosClientPostFormData.post(url, params);
  },
  getHocSinhData: (params) => {
    const url = `AdminAPI/getHocSinhData`;
    return axiosClientAdminToken.post(url, params);
  },
  getHocSinhbyKhoi: (khoi) => {
    const url = `apiChuyenTruong/getHocSinhbyKhoi/${khoi}`;
    return axiosClient.get(url);
  },
  getHocSinhChuyenDenModel: () => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Misc/getHocSinhChuyenDen`;
    return axiosClient.get(url);
  },
  postUploadFile: (autoID, fileName, file) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Misc/UploadHoSoChuyenDen/${autoID}/${fileName}`;
    return axiosClient.post(url, file);
  },
  getHSChuyenDenHoSo: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Misc/getHSChuyenDenHoSo/${params}`;
    return axiosClient.get(url);
  },
  deleteImageHSChuyenDenHoSo: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Misc/deleteHSChuyenDenHoSo/${params}`;
    return axiosClient.get(url);
  },
  PostUpdateHS_New: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/updateHocSinh`;
    return axiosClient.post(url, params);
  },
  PostDeleteHS: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/deleteHocSinh/${params}`;
    return axiosClient.get(url);
  },
  GetBienDong: (NamID) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/getBienDong/${NamID}/true`;
    return axiosClient.get(url);
  },
  XoaBienDong: (id) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/deleteBienDong/${id}`;
    return axiosClient.get(url);
  },
  //form báo cáo
  getFormColumn: (formID) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getFormColumn/${formID}`;
    return axiosClient.get(url);
  },
  getDMForm: (isPublish) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getForm/${isPublish}`;
    return axiosClient.get(url);
  },
  getFormValue: (formID, page) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getFormValue/${formID}/50/${
      page - 1
    }`;
    return axiosClient.get(url);
  },
  addFormRow: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/createNewRow`;
    return axiosClient.post(url, params);
  },
  addMultiFormRow: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/createMultiRow`;
    return axiosClient.post(url, params);
  },
  getRowCount: (RowID) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getFormRowCount/false/${RowID}`;
    return axiosClient.get(url);
  },
  deleteFormRow: (RowID) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/deleteRow/${RowID}`;
    return axiosClient.get(url);
  },
  saveFormValue: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/saveFormValue`;
    return axiosClient.post(url, params);
  },
  updateForm: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/updateForm`;
    return axiosClient.post(url, params);
  },
  postGetHocSinh: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/HocSinh/getHocSinh`;
    return axiosClient.post(url, params);
  },
  getDSGiaoVien: () => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/GiaoVien/getGiaoVien`;
    return axiosClient.get(url);
  },
  deleteFile: (rowID, columnID) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/DeleteFile/${rowID}/${columnID}`;
    return axiosClient.get(url);
  },
  getDMDiemTruong: () => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/getDiemTruong`;
    return axiosClient.get(url);
  },
  getDMLoaiChuongTrinh: () => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Truong/GetDMLoaiChuongTrinh`;
    return axiosClient.get(url);
  },
  getLoaiChuongTrinh: () => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Truong/LoaiChuongTrinh`;
    return axiosClient.get(url);
  },
  InsertLoaiChuongTrinh: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Truong/InsertLoaiChuongTrinh`;
    return axiosClient.post(url, params);
  },
  DeleteLoaiChuongTrinh: (params) => {
    const url = `https://apigateway.hcm.edu.vn/WAPINetCore/Truong/DeleteLoaiChuongTrinh/${params}`;
    return axiosClient.post(url);
  },
};

export default schoolAPI;
