import { Collapse, Input, Row, Col, Typography} from 'antd';
import {Button as AntButton} from 'antd'

import BasicInfo from './BasicInfo'
import DetailedInfo from './DetailedInfo'

const { Panel } = Collapse;

type Document = {
  id: string,
  name: string,
  document_type: string,
  document_content: string,
  tenant: string
}

const CollapseMenu: React.FC<
{
  documentObject: string | undefined
}
> = (props) => {
  console.log(props.documentObject)
  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={4}>
            Basic Information
          </Typography.Title>
          <BasicInfo documentObject={props.documentObject} />

        </Col>
      </Row>
      <div style={{ margin: '24px 0' }} />
      <Row>
        <Col>
          <Typography.Title level={4}>
            Detailed Information
          </Typography.Title>
          <DetailedInfo documentObject={props.documentObject} />
        </Col>
      </Row>
    </>
  )
}


export default CollapseMenu
