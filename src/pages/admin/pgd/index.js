import React, { useState, useEffect,useRef } from "react";
import {
  PageHeader,
  Table,
  Select,
  Button
} from "antd";
import adminApi from "../../../apis/adminApi";
import { CSVLink } from "react-csv";
import ResetPasswordForm from "../pgd/resetPasswordForm";
const { Option } = Select;

const PGD = () => {
  const csvLink = useRef(null);
  //params
  const [listUserTable,setListUserTable] = useState([]);
  const [listUser,setListUser] = useState([]);
  const [modalRsPass,setModalRsPass]=useState(false);
  const [searchParams,setSearchParams]= useState({TK:"Trg",CapDo:"MN"})
  const [isloading,setIsLoading] =useState(true);
  //columns
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Họ Tên",
      dataIndex: "FullName"
    },
    {
      title: "Mật khẩu",
      dataIndex: "InitialPassword",
    },
    {
      title: "Loại Tài khoản",
      dataIndex: "AccountType",
    }
   
  ];
 
  //function 
  const testData = () => {
    let newArray = listUser.map(item=>{
      let obj={};
      obj['Tên Trường']=item.FullName;
      obj['UserName']=item.UserName;
      obj['Mật Khẩu']=item.InitialPassword;
      obj['Cấp 1']=item.Cap1;
      obj['Cấp 2']=item.Cap2;
      obj['Mầm non']=item.IsMamNon;
     return obj;
    });
   return newArray;

  }
  const handleDownloadExcelAccount = async () => {
    
  
    csvLink.current.link.click();
  };

  const CloseModalReset=() =>{
    setModalRsPass(false);

  }
  const getAccount = async () => {
    setIsLoading(true);
    await adminApi.getAccountSchoolByAccountType(searchParams.TK)
                  .then((res)=>{
                    if(res.StatusCode === 200)
                    {
                      setListUser(res.Result);
                      changeCapHoc(res.Result,searchParams.CapDo);
                      setIsLoading(false);
                    }
                  })
  }
  const onChangeUserType = async (type) => {
    setIsLoading(true);
    await adminApi.getAccountSchoolByAccountType(type)
    .then((res)=>{
      if(res.StatusCode === 200)
      {
        setListUser(res.Result);
        setSearchParams({...searchParams,TK:type})
        changeCapHoc(res.Result,searchParams.CapDo);
        setIsLoading(false);
      }
    })
  }
  const changeCapHoc = (listUser,type) => {
    switch(type){
      case "MN":
       setListUserTable(listUser.filter(x=>x.IsMamNon===1));
        break;
      case "TH":
        setListUserTable(listUser.filter(x=>x.Cap1===1));
        break;
        case "THCS":
          setListUserTable(listUser.filter(x=>x.Cap2===1));
          break;
      default:
        break;
    }
  
  }
  const onChangeCapHoc = (type) => {
    setSearchParams({...searchParams,CapDo:type})
    changeCapHoc(listUser,type);
  }
   //khoi tao
   useEffect(()=>{
    getAccount();
  },[]);
   
  return (
  <>
     <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Danh sách tài khoản"
        extra={[
          <Select
            key="1"
            showSearch
            style={{ width: 200 }}
            defaultValue={"Trg"}
            onChange={onChangeUserType}
          >
            <Option value="Trg">
              Tài khoản trường
            </Option>
            <Option value="GV">
              Tài khoản Giáo viên
            </Option>
          </Select>,
           <Select
           key="2"
           showSearch
           style={{ width: 200 }}
           defaultValue={"MN"}
           onChange={onChangeCapHoc}
         >
           <Option value="MN">
             Mầm non
           </Option>
           <Option value="TH">
             Tiểu học
           </Option>
           <Option value="THCS">
             Trung học Cơ sở
           </Option>
         </Select >,
          <CSVLink key="3" data={testData()} ref={csvLink}></CSVLink>,
          <Button key="4" onClick={() => handleDownloadExcelAccount()} type="primary">
            Dữ liệu tài khoản(excel)
          </Button>,
          <Button key="5" onClick={() =>setModalRsPass(true) } type="primary">
          Reset Mật khẩu
        </Button>,
        ]}
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={listUserTable}
        rowKey="UserID"
       loading={isloading}
        pagination={false}
      />
      <ResetPasswordForm DonViIDs={listUser} isShowModal={modalRsPass} ShowModalF={CloseModalReset}></ResetPasswordForm>
  </>)
}
export default PGD;
