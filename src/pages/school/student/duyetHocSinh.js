import React, { useEffect,useState } from 'react';
import { Table,PageHeader } from 'antd';
const columns = [
    {
      title: 'Họ',
      width: 100,
      dataIndex: 'Ho',
      key: 'Ho',
      fixed: 'left',
    },
    {
      title: 'Tên',
      width: 100,
      dataIndex: 'Ten',
      key: 'Tên',
      fixed: 'left',
    },
    {
      title: 'Tên cha',
      dataIndex: 'TenCha',
      key: 'TenCha',
      width: 150,
    },
    {
        title: 'SDT Cha',
        dataIndex: 'SDTCha',
        key: 'SDTCha',
        width: 150,
    },
    {
      title: 'Tên mẹ',
      dataIndex: 'TenMe',
      key: 'TenMe',
      width: 150,
    },
    {
        title: 'SDT Me',
        dataIndex: 'SDTMe',
        key: 'SDTMe',
        width: 150,
    },
    {
      title: 'Chọn ',
      key: 'thaotac',
      fixed: 'right',
      width: 100,
   // render: (text,record) =>{ <Checkbox></Checkbox>},
    },
  ];
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      Ho: `Edrward `,
      Ten:'test',
      TenCha: 'Nguyen Van A',
      SDTCha: '098758920',
      TenMe:'Nguyen Thi B',
      SDTMe: `098482919`,
    });
  }
const DuyetHocSinh = () => {
const [hocSinhChoDuyet] = useState([])
//function
const getHocSinhs = async () => {
  // await schoolApi.getHocSinhChoDuyetByPhong(2020,1).then(async (res) => {
  //   console.log(res.Result);
  //   //setHocSinhChoDuyet(res.Result);
   
  // })
  // await schoolApi.getdonvi().then((res)=> {
  //   console.log(res.Result)
  // })

}
useEffect(() => {
   getHocSinhs();
},[])
    return (
        <>
        <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title="Danh sách duyệt"
        ></PageHeader>
       <Table columns={columns} dataSource={hocSinhChoDuyet} scroll={{x:1500,y:300}}></Table>
       </>
    );
};

DuyetHocSinh.propTypes = {
    
};

export default DuyetHocSinh;

