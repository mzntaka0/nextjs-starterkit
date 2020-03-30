import React from 'react'
import { Input, Typography} from 'antd';

type Document = {
  id: string,
  name: string,
  document_type: string,
  document_content: string,
  tenant: string
}

const BasicInfo: React.FC<
{
  documentObject: string | undefined
}
> = (props) => {
  const d = JSON.parse(props.documentObject as string)
  return (
    <Input.Group compact={true} size='default'>
      <Input
        defaultValue={d['name']}
        addonAfter='Name'
        allowClear={true}
        key={d['name']}
      />
      <div style={{ margin: '24px 0' }} />
      <Input
        defaultValue={d['document_content']['doc_object'][0]['instances'][1]['会社名']}
        addonAfter='Company'
        allowClear={true}
        key={d['document_content']['doc_object'][0]['instances'][1]['会社名']}
      />
      <div style={{ margin: '24px 0' }} />
      <Input
        defaultValue={d['document_type']}
        addonAfter='Document Type'
        allowClear={true}
        key={d['document_type']}
      />
      <div style={{ margin: '24px 0' }} />
      <Input
        defaultValue={d['document_content']['created_at']}
        addonAfter='Uploaded Date'
        allowClear={true}
        key={d['document_content']['created_at']}
      />
    </Input.Group>
  )
}


export default BasicInfo
