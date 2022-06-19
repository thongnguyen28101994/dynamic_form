import axiosClient from "../apis/axiosClient";

const globalAPI = {
  getSession: () => {
    const url = `/wapiquanly/getSessionData`;
    return axiosClient.get(url);
  },
  getDonViHanhChinh: () => {
    const url = `/wapiquanly/getDonviHanhChinh`;
    return axiosClient.get(url);
  },

  getTonGiao: () => {
    const url = "/wapiquanly/getTonGiao";
    return axiosClient.get(url);
  },
  getDanToc: () => {
    const url = "/wapiquanly/getDanToc";
    return axiosClient.get(url);
  },
  getTinh: () => {
    const url = "/wapiquanly/getTinh";
    return axiosClient.get(url);
  },
  getHuyen: (params) => {
    const url = `/wapiquanly/getHuyen/${params}`;
    return axiosClient.get(url);
  },
  getXa: (params) => {
    const url = `/wapiquanly/getXa/${params}`;
    return axiosClient.get(url);
  },
  getLKTat: () => {
    const url = `/wapiquanly/getDMLoaiKhuyetTat`;
    return axiosClient.get(url);
  },
  getDTCSach: () => {
    const url = `/wapiquanly/getDMDoiTuongChinhSach`;
    return axiosClient.get(url);
  },
  getLopById: (params) => {
    const url = `/apiChuyenTruong/getLopbyID/${params}`;
    return axiosClient.get(url);
  },
  getDotDiemByYear: (params) => {
    const url = `wapiquanly/getDMDotDiembyNamHoc/${params}`;
    return axiosClient.get(url);
  },
  getPhongGiaoDuc: () => {
    const url = `wapiquanly/getPhongGiaoDuc`;
    return axiosClient.get(url);
  },
  getDonVi: () => {
    const url = `wapiquanly/getDonVi`;
    return axiosClient.get(url);
  },
  getKyThiByNamHocId: (namHocId) => {
    const url = `apiKyThi/getKyThi/${namHocId}`;
    return axiosClient.get(url);
  },
  getMonThiByKyThiId: (kyThiID) => {
    const url = `apiKyThi/getMonThi/${kyThiID}`;
    return axiosClient.get(url);
  },
  getThiSinhDuThiByKyThiId: (kyThiID) => {
    const url = `apiKyThi/getThiSinhDuThi/${kyThiID}`;
    return axiosClient.get(url);
  },
  getThiSinhDuThiByKyThiIdAndMonThiId: (kyThiID, monThiId) => {
    const url = `apiKyThi/getThiSinhDuThi/${kyThiID}/${monThiId}`;
    return axiosClient.get(url);
  },
  postDangKyThiSinhKyThi: (params) => {
    const url = `apiKyThi/postDangKyThiSinhKyThi`;
    return axiosClient.post(url, params);
  },
  postHuyDangKyThiSinhKyThi: (parmas) => {
    const url = `apiKyThi/postHuyDangKyThiSinhKyThi`;
    return axiosClient.post(url, parmas);
  },
  getDMLoaiBienDong: () => {
    const url = `wapiquanly/getDMLoaiBienDong`;
    return axiosClient.get(url);
  },
  getDSBienDong: (DotDiemID) => {
    const url = `wapiquanly/getDSBienDong/${DotDiemID}`;
    return axiosClient.get(url);
  },
  postXoaBienDong: (BienDongID) => {
    const url = `wapiquanly/deleteBienDong/${BienDongID}`;
    return axiosClient.get(url);
  }

};
export default globalAPI;
