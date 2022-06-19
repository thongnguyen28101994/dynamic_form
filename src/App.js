import { Modal, Button } from 'antd';
import React, {useState} from 'react'

const Demo = () => {
  const [isShowingCreateClass, setIsShowingCreateClass] = useState(false);
  return (
    <>
        <Button type="primary" onClick={() => setIsShowingCreateClass(true)}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={isShowingCreateClass}
          title="Title"
          onOk={() => setIsShowingCreateClass(false)}
          onCancel={() => setIsShowingCreateClass(false)}
          footer={[
            <Button key="back" onClick={() => setIsShowingCreateClass(false)}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={() => setIsShowingCreateClass(false)}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
  )
}
export default Demo