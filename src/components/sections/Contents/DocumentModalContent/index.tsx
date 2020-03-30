import React from 'react'
import { Row, Col, Affix } from 'antd';

import ImagePreviewer from '../../../objects/ImagePreviewer'
import DocumentContentViewer from '../../../objects/DocumentContentViewer'

type Document = {
  id: string,
  name: string,
  document_type: string,
  document_content: string,
  tenant: string
}

const DocumentModalContent: React.FC<
{
  imagePath: string,
  documentObject: string | undefined
}
> = (props) => {
  return (
    <Row type='flex' gutter={6} justify="space-around">
      <Col span={12}>
        <DocumentContentViewer documentObject={props.documentObject} />
      </Col>
      <Col span={12}>
        <Affix offsetTop={50}>
          <ImagePreviewer imagePath={props.imagePath} width={'90%'} />
        </Affix>
      </Col>
    </Row>
  )
}


export default DocumentModalContent
