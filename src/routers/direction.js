import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import globalAPI from "../apis/globalApi";
const Direction = () => {
  let { token, page } = useParams();
  sessionStorage.setItem("token", decodeURIComponent(token));
  let history = useHistory();
  useEffect(() => {
    globalAPI.getSession().then((res) => {
      if (res.StatusCode === 200) {
        sessionStorage.setItem("session", JSON.stringify(res.Result[0]));
        switch (page) {
          case "danhsachlop":
            history.replace(`/danhsachlop`);
            break;
          case "danhsachtaikhoan":
            history.replace(`/danhsachtaikhoan`);
            break;
          case "danhsachkythi":
            history.replace(`/danhsachkythi`);
            break;
          case "duyetcapnhat":
            history.replace(`/duyetcapnhat`);
            break;
          case "thongtintruong":
            history.replace(`/thongtintruong`);
            break;
          case "xincapnhat":
            history.replace(`/xincapnhat`);
            break;
          case "khaosat7":
            history.replace(`/khaosat7`);
            break;
          case "thithpt":
            history.replace(`/thithpt`);
            break;
          case "dsgiaoviensgk6":
            history.replace(`/danhsachthamkhaoSGK`);
            break;
          case "filethongke":
            history.replace(`/filethongke`);
            break;
          case "phanbokhoi6":
            history.replace(`/phanbokhoi6`);
            break;
          case "dschuyenden":
            history.replace(`/dschuyenden`);
            break;
          case "listform":
            history.replace(`/listform`);
            break;
          case "formbaocao":
            history.replace(`/formbaocao`);
            break;
            
          default:
            break;
        }
      }
    });
  }, []);
  return <div className="App"></div>;
};

export default Direction;
