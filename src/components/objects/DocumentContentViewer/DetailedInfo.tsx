import React from 'react'
import { Collapse, Input, Row, Col } from 'antd';

type Document = {
  id: string,
  name: string,
  document_type: string,
  document_content: string,
  tenant: string
}

export type DocElement = {
  name: string,
  instances: Instance[]
}

type Instance = {
  [key: string]: string | DocElement
}

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}


const DetailedInfo: React.FC<
{
  documentObject: string | undefined
}
> = (props) => {
  const d = JSON.parse(props.documentObject as string)
  const doc_object = d['document_content']['doc_object']
  return (
      <Collapse onChange={callback}>
        {doc_object.map((docElement) => {
          return (
            <Panel header={docElement['name']} key={docElement['name']}>
              <RecursivePanel instances={docElement['instances']} />
            </Panel>
          )
        })}
      </Collapse>
  )
}


const RecursivePanel: React.FC<
{
  instances: Instance[]
}
> = (props) => {
  return (
    <>
        {
          props.instances.map((instance) => {
            return (
              <>
                {
                  props.instances.length > 1 ?
                    (
                      <Collapse onChange={callback}>
                        <Panel header={instance[Object.keys(instance)[0]].toString()} key={instance[Object.keys(instance)[0]].toString()}>
                          <DocElementContants instance={instance} />
                        </Panel>
                      </Collapse>
                  ) :
                    (<DocElementContants instance={instance} />)
                }
              </>
            )
          })
        }
    </>
  )
}


const DocElementContants: React.FC<
{
  instance: Instance
}
> = (props) => {
  const instance = props.instance
  return (
    <>
      {
        Object.keys(instance).map((key) => {
          const value = instance[key]
          switch ((typeof value).toString()) {
            case 'string':
              return (
                <>
                  <Input
                    defaultValue={value.toString()}
                    addonAfter={key}
                    allowClear={true}
                    key={value.toString()}
                  />
                  <div style={{ margin: '24px 0' }} key={value.toString()} />
                </>
              )
            case 'object':
              return (
                <Collapse onChange={callback}>
                  <Panel header={instance[key]['name']} key={instance[key]['name']}>
                    <RecursivePanel instances={value['instances']} />
                  </Panel>
                </Collapse>
              )
            default:
              return
          }})
      }
    </>
  )
}


export default DetailedInfo
