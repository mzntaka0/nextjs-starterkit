import React, {useState, useCallback} from 'react'
import {NextPage} from 'next'
import {Button as AntButton} from 'antd'
import {Modal as AntModal} from 'antd'
import { Upload, Icon, message } from 'antd'

import {getLayout} from './lib/layout'
import Button from '../../_atoms/Button'
import Logo from '../../_atoms/Logo'


type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
type Props = {
  userAgent?: string
}


const Page: ExtendedNextPage<Props> = ({userAgent}) => {
  const upladingURL = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
  const { Dragger } = Upload;
  const [visible, setVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')

  const handleOk = useCallback(() => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 50)
  }, [visible, confirmLoading, modalText])

  const showModal = useCallback(() => {
    setVisible(true)
  }, [visible])

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
  return (
    <div>
      <Logo />
      <p>
        Hello world! user agent: {userAgent}
        upload
      </p>
      <Button buttonText='yay' type='danger' size='default' />
      <AntButton onClick={showModal}>Show Modal</AntButton>
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
    </div>
  );
}

Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  return {userAgent}
}


export default Page;
