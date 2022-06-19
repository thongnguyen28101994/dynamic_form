import React from "react";
import { useState } from "react";
import { Steps, Button, message, Row, Col } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
function App() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Row>
        <Col span={8} style={{ textAlign: "center" }}>
          <p>ỦY BAN NHÂN DÂN</p>
          <p>THÀNH PHỐ HỒ CHÍ MINH</p>
          <p>
            <b>SỞ GIÁO DỤC VÀ ĐÀO TẠO</b>{" "}
          </p>
        </Col>
        <Col span={16} style={{ textAlign: "center" }}>
          <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
          <p>
            <b>Độc lập - Tự do - Hạnh phúc</b>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <p>
            <b>TIÊU CHUẨN ĐÁNH GIÁ THI ĐUA</b>
          </p>
          <p>
            <b>NHIỆM VỤ CÔNG NGHỆ THÔNG TIN</b>
          </p>
          <p>
            <b>
              (Đối với các trường THCS, THPT, trường phổ thông có nhiều cấp học)
            </b>
          </p>
          <p>
            <b>Tiêu chuẩn: 100 điểm</b>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              border: "solid",
            }}
          >
            <tr>
              <th>STT</th>
              <th>NỘI DUNG</th>
              <th>Điểm chuẩn</th>
              <th>Tự chấm</th>
              <th>Minh Chứng</th>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td>1</td>
              <td>
                Ứng dụng CNTT trong đổi mới phương pháp dạy - học và kiểm tra,
                đánh giá
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>1.1</td>
              <td>
                Đảm bảo 100% cán bộ quản lý giáo dục, giáo viên đơn vị biết sử
                dụng CNTT trong công tác.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>
                Tổ chức tốt việc ứng dụng CNTT&TT trong dạy - học một cách thực
                chất, thường xuyên, có áp dụng, theo dõi, thống kê việc sử dụng
                thiết bị CNTT, phần mềm phục vụ dạy học (phần mềm trình chiếu,
                mô phỏng, thí nghiệm ảo, phần mềm dạy học…).
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>1.3</td>
              <td>
                Thực hiện tốt việc kiểm tra, đánh giá, khảo sát học sinh trong
                các ứng dụng trực tuyến, trắc nghiệm khách quan trên máy tính
                đúng qui định.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>1.4</td>
              <td>
                Tổ chức tốt việc sử dụng và khai thác các hệ thống dạy học trực
                tuyến nhằm nâng cao hiệu quả hoạt động chuyên môn, công tác dạy
                - học.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>1.5</td>
              <td>
                CBQL và GV hoàn thành các nội dung, yêu cầu tập huấn trên mạng
                theo yêu cầu của công tác đào tạo - bồi dưỡng chương trình giáo
                dục phổ thông 2018.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td>2</td>
              <td>Ứng dụng CNTT trong công tác quản lý, điều hành</td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>2.1</td>
              <td>
                Đảm bảo việc phân công, tổ chức thu thập thông tin, cập nhật
                CSDL đầy đủ trên hệ thống quản lý dữ liệu ngành theo yêu cầu của
                Bộ GD&ĐT, Sở GD&ĐT.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>
                Hoàn thành CSDL đầy đủ, chính xác, đúng thời gian qui định.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>
                Triển khai các phần mềm trực tuyến hỗ trợ công tác quản lý, điều
                hành trong hoạt động giáo dục của đơn vị; Các ứng dụng CNTT nhằm
                trao đổi thông tin giữa nhà trường - giáo viên - học sinh và phụ
                huynh học sinh. (Ưu tiên các ứng dụng OTT, email, website)
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>
                Sử dụng sổ điểm điện tử và các loại hồ sơ học vụ điện tử đúng
                qui định. Có chế độ lưu trữ (sao in, niêm phong, quản lý) đảm
                bảo cho yêu cầu công tác kiểm tra, thanh tra theo qui định.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td>3</td>
              <td>Ứng dụng CNTT trong công tác thông tin</td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.1</td>
              <td>
                Cổng thông tin điện tử của trường được xây dựng đúng theo hướng
                dẫn tại VB số 4210/GDĐT-TTTT ngày 16/12/2020 của Sở GD&ĐT. (TT
                37/2020/TT-BGDĐT ngày 05/10/2020; Nghị định số 43/2011/NĐ-CP
                ngày 13/6/2011)
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.2</td>
              <td>
                Cổng thông tin điện tử được tích hợp trong hệ thống Cổng thông
                điện tử của Sở tại địa chỉ hcm.edu.vn
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.3</td>
              <td>
                Thông tin trên hệ thống Cổng thông tin của đơn vị cần được thực
                hiện đầy đủ, thường xuyên… (tối thiểu 40 tin bài/năm học);
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.4</td>
              <td>
                Có chuyên mục công khai riêng theo từng năm học để công khai các
                nội dung theo TT số 36/2017/TT-BGDĐT ngày 28/12/2017 của Bộ Giáo
                dục và Đào tạo Ban hành Quy chế thực hiện công khai đối với cơ
                sở giáo dục và đào tạo thuộc hệ thống giáo dục quốc dân trên
                Cổng thông tin điện tử của đơn vị.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.5</td>
              <td>
                Ứng dụng CNTT trong cải cách hành chính: Có chuyên mục biểu mẫu
                riêng đăng tải đầy đủ các mẫu đơn xin nghỉ học, mẫu đơn xin phúc
                khảo bài kiểm tra, bài thi, thông tin xét tuyển học sinh đầu
                cấp… trên cổng thông tin của trường theo qui định.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>3.6</td>
              <td>Thực hiện báo cáo trực tuyến đầy đủ, đúng hạn.</td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td>4</td>
              <td>Công tác tổ chức thực hiện nhiệm vụ CNTT</td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>4.1</td>
              <td>
                Xây dựng kế hoạch thực hiện nhiệm vụ CNTT hàng năm và gửi về Sở
                GD&ĐT đúng nội dung, thời hạn; Tham gia đầy đủ các hội nghị,
                cuộc họp, tập huấn lĩnh vực CNTT trong giáo dục do Sở Giáo dục
                và Đào tạo tổ chức.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>
                Ban hành Quyết định phân công cụ thể lãnh đạo nhà trường và quản
                trị các hệ thống thông tin của nhà trường đúng hướng dẫn.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>4.3</td>
              <td>
                Đảm bảo hạ tầng CNTT đáp ứng yêu cầu ứng dụng CNTT&TT trong công
                tác dạy - học và quản lý, điều hành; hệ thống internet nhà
                trường được kết nối cáp quang dung lượng đủ mạnh để triển khai
                các ứng dụng trực tuyến.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr>
              <td>4.4</td>
              <td>
                Chủ động triển khai mô hình Ứng dụng CNTT trong trường phổ thông
                theo văn bản 257/GDĐT-TTTT ngày 25/1/2019.
              </td>
              <td>30</td>
              <td>30</td>
              <td></td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td></td>
              <td>Tổng cộng</td>
              <td>100</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <p>* Kết quả</p>
          <br />
          <table style={{ marginLeft: 30 }}>
            <tr>
              <td>- Xuất sắc</td>
              <td>từ 90 - 100 điểm</td>
            </tr>
            <tr>
              <td>- Tốt</td>
              <td>từ 80 – 89 điểm</td>
            </tr>
            <tr>
              <td>- Khá</td>
              <td>từ 70 - 79 điểm</td>
            </tr>
            <tr>
              <td>- Trung bình</td>
              <td>từ 50 - 69 điểm</td>
            </tr>
            <tr>
              <td>- Yếu</td>
              <td>dưới 50 điểm</td>
            </tr>
          </table>
        </Col>
      </Row>
      {/* <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </>
  );
}

export default App;
