const defaultColumn = [
  {
    title: "STT",
    dataIndex: "STT",
    width: "0.2%",
  },
  {
    title: "NỘI DUNG",
    dataIndex: "title",
    width: "10%",
  },
  {
    title: "Điểm chuẩn",
    dataIndex: "DiemChuan",
    width: "1%",
  },
  {
    title: "Tự chấm",
    dataIndex: "TuCham",
    width: "1%",
    editable: true,
  },
];
export const defaultColumnSDG = [
  {
    title: "STT",
    dataIndex: "STT",
    width: "0.2%",
  },
  {
    title: "NỘI DUNG",
    dataIndex: "title",
    width: "10%",
  },
  {
    title: "Điểm chuẩn",
    dataIndex: "DiemChuan",
    width: "1%",
  },
  {
    title: "Tự chấm",
    dataIndex: "TuCham",
    width: "1%",
    editable: false,
  },
  {
    title: "SDG chấm",
    dataIndex: "SGDCham",
    width: "1%",
    editable: true,
  },
  {
    title: "Ghi chú",
    dataIndex: "GhiChu",
    width: "1%",
    editable: true,
  },
];

export default defaultColumn;
