import React, {useState, useCallback} from 'react'
import {Upload, Icon, message, Modal as AntModal} from 'antd'


export const UploadingModal = ({visible, handleOk, confirmLoading, handleCancel, upladingURL, uploadOnChange}) => {
  const { Dragger } = Upload;
  return (
    <AntModal
      title="Upload"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Dragger
        name="file"
        multiple={true}
        action={upladingURL}
        onChange={uploadOnChange}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </AntModal>
  )
}

export const useUploadingModal = () => {
  // TODO: This url should be an external variable changed by tenant-wise
  const upladingURL = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
  const [visible, setVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const newOnClick = useCallback(
      () => {
        setVisible(true)
      }
    , [visible]
  )
  const handleOk = useCallback(() => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 300)
  }, [visible, confirmLoading, modalText])

  const handleCancel = useCallback(() => {
    setVisible(false)
  }, [visible])

  const uploadOnChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  return {visible, handleOk, newOnClick, confirmLoading, handleCancel, upladingURL, uploadOnChange}
}

