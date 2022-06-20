import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import globalAPI from "../apis/globalApi";
const Direction = () => {
  let location = useLocation();
  let history = useHistory();
  sessionStorage.setItem(
    "token",
    decodeURIComponent(location.search.substring(7))
  );

  useEffect(() => {
    globalAPI.getSession().then(async (res) => {
      if (res.StatusCode === 200) {
        sessionStorage.setItem("session", JSON.stringify(res.Result[0]));
        console.log(res);
        if (res.Result[0].AccountType === "Trg") {
          history.push("/truong");
        }
      }
    });
  }, [history]);
  return <></>;
};

export default Direction;
