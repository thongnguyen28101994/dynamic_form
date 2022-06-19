import axiosClient, {
  axiosClientKhaosat7,
  axiosApiGateway,
} from "../apis/axiosClient";
const adminAPI = {
  getStudentUpdate: (schoolId) => {
    const url = `/apiChuyenTruong/getHocSinhUpDateLog/${schoolId}`;
    return axiosClient.get(url);
  },
  acceptStudenUpdate: (data) => {
    const url = `/apiChuyenTruong/postApproveUpdateHS`;
    return axiosClient.post(url, data);
  },
  getAccountSchoolByAccountType: (type) => {
    const url = `/wapiquanly/getAccountbyPGD/${type}`;
    return axiosClient.get(url);
  },
  resetPasswordBySchoolID: (SchoolID) => {
    const url = `/wapiquanly/ResetTUserPassword/${SchoolID}/admin`;
    return axiosClient.get(url);
  },

  getK12Participant: () => {
    const url = `/WAPINetCore/Misc/getSGKPreView`;
    return axiosClientKhaosat7.get(url);
  },
  getHocSinh: (params) => {
    const url = `/HocSinh/getHocSinh`;
    return axiosApiGateway.post(url, params);
  },
  getTruong: (params) => {
    const url = `/Truong/getTruong`;
    return axiosApiGateway.post(url, params);
  },
  chuyencapHocSinh: (params) => {
    const url = `/HocSinh​/ChuyenTruongHocSinh`;
    return axiosApiGateway.post(url, params);
  },
  deleteBienDong: (hocSinhID) => {
    const url = `/HocSinh/deleteBienDong/${hocSinhID}`;
    return axiosApiGateway.get(url);
  },
  createNewForm: (params) => {
    const url = `/DynamicForm/createNewForm`;
    return axiosApiGateway.post(url, params);
  },

  addInstance: (params) => {
    const url = `/DynamicForm/addInstance`;
    return axiosApiGateway.post(url, params);
  },
  getForms: (isPublisher, isDisable) => {
    const url = `/DynamicForm/getForm/${isPublisher}/${isDisable}`;
    return axiosApiGateway.get(url);
  },
  addColumn: (params) => {
    const url = `/DynamicForm/addColumn`;
    return axiosApiGateway.post(url, params);
  },
  getDataType: () => {
    const url = `/DynamicForm/getDataType`;
    return axiosApiGateway.get(url);
  },
  getFormValue: (formId, maxPerPage, pageNumber) => {
    const url = `/DynamicForm/getFormResult/${formId}/${maxPerPage}/${pageNumber}`;
    return axiosApiGateway.get(url);
  },
  getInputType: () => {
    const url = `/DynamicForm/getInputType`;
    return axiosApiGateway.get(url);
  },
  getFormColumns: (params) => {
    const url = `/DynamicForm/getFormColumn/${params}`;
    return axiosApiGateway.get(url);
  },
  getFormInfo: (params) => {
    const url = `/DynamicForm/getFormData/${params}`;
    return axiosApiGateway.get(url);
  },
  getInstanceInfo: (params) => {
    const url = `/DynamicForm/getInstance/${params}`;
    return axiosApiGateway.get(url);
  },
  duplicateForm: (params) => {
    const url = `/DynamicForm/duplicateForm/${params}`;
    return axiosApiGateway.get(url);
  },
  deleteCol: (params) => {
    const url = `/DynamicForm/removeColumn/${params}`;
    return axiosApiGateway.post(url);
  },
  deleteForm: (params) => {
    const url = `/DynamicForm/deleteForm/${params}`;
    return axiosApiGateway.post(url);
  },
  updateCol: (params) => {
    const url = `/DynamicForm/updateColumn`;
    return axiosApiGateway.post(url, params);
  },

  getFormResultXlsx: (formId) => {
    const url = `/DynamicForm/getFormResultXlsx/${formId}`;
    return axiosApiGateway.get(url);
  },
};

export default adminAPI;
