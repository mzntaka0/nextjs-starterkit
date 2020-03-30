import React from 'react'
import {useRouter} from 'next/router'
import {Menu} from 'antd'

import documentMenuSettings from './documentMenuSettings'


const style = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
}

const DocumentMenu: React.FC = () => {
  const router = useRouter()
  return (
    <Menu {...documentMenuSettings["meta"]}>
      {documentMenuSettings["contents"].map((content) => {
        return (
          <Menu.Item key={content["key"]} onClick={() => router.push(content["url"])} disabled={content["disabled"]}>
            <span>{content["text"]}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}


export default DocumentMenu
