import {useState, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Layout, Menu, Icon} from 'antd'
import Headroom from 'react-headroom'

import sidebarSettings from './sidebarSettings'


const SideBar = () => {
  const router = useRouter()
  return (
    <Layout.Sider
      trigger={null}
      style={{
        opacity: 0.9
      }}
    >
      <Menu {...sidebarSettings["meta"]}>
        {sidebarSettings["contents"].map((content) => {
          return (
            <Menu.Item key={content["key"]} onClick={() => router.push(content["url"])} disabled={content["disabled"]}>
              <Icon type={content["icon"]} />
              <span>{content["text"]}</span>
            </Menu.Item>
          )
        })}
      </Menu>
    </Layout.Sider>
  )
}

//const SideBar = () => {
//  const router = useRouter()
//  return (
//    <Layout.Sider
//      trigger={null}
//      style={{
//        opacity: 0.9
//      }}
//    >
//      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//        <Menu.Item key="0" onClick={() => router.push('/')}>
//          <Icon type="home" onClick={() => router.push('/')} />
//          <span>Home</span>
//        </Menu.Item>
//        <Menu.Item key="1" onClick={() => router.push('/company')}>
//          <Icon type="idcard" onClick={() => router.push('/company')} />
//          <span>Company</span>
//        </Menu.Item>
//        <Menu.Item key="2" onClick={() => router.push('/upload')}>
//          <Icon type="setting" />
//          <span>Settings</span>
//        </Menu.Item>
//        <Menu.Item key="3" onClick={() => router.push('/')}>
//          <Icon type="logout" />
//          <span>Logout</span>
//        </Menu.Item>
//      </Menu>
//    </Layout.Sider>
//  )
//}

export default SideBar
