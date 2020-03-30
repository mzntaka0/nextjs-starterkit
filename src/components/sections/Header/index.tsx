import React, {useState, useCallback} from 'react'
import Link from 'next/link'
import {Layout, Button, Icon} from 'antd'
import {CSVLink} from 'react-csv'

import Logo from '../../_atoms/Logo'
import Download from '../../_atoms/Download'
import {UploadingModal, useUploadingModal} from '../../../lib/hooks/useUploadingModal'

//const data = [
//  {
//    key: '1',
//    name: 'John Brown',
//    age: 32,
//    address: 'New York No. 1 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '2',
//    name: 'Joe Black',
//    age: 42,
//    address: 'London No. 1 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '3',
//    name: 'Jim Green',
//    age: 32,
//    address: 'Sidney No. 1 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '4',
//    name: 'Jim Red',
//    age: 32,
//    address: 'London No. 2 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '5',
//    name: 'Jim Red',
//    age: 32,
//    address: 'London No. 2 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '6',
//    name: 'Jim Red',
//    age: 32,
//    address: 'London No. 2 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//  {
//    key: '7',
//    name: 'Jim Red',
//    age: 32,
//    address: 'London No. 2 Lake Park',
//    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
//  },
//];
//
//const CSVData = [
//  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
//];
//
//const headers = [
//  { label: "First Name", key: "firstname" },
//  { label: "Last Name", key: "lastname" },
//  { label: "Email", key: "email" }
//];

const Header = ({_menuIcon}) => {
  const {visible, handleOk, newOnClick, confirmLoading, handleCancel, upladingURL, uploadOnChange} = useUploadingModal()
  return (
    <Layout.Header
      className="header"
      style={{
        opacity: 0.8,
        boxShadow: "-2px -2px 8px rgba(0, 0, 0, 0.80)"
      }}
    >
      <div
        style={{
          float: "left"
        }}
      >
        <_menuIcon />
      </div>
      <div style={{float: "right"}}>
        <Button type="primary" onClick={newOnClick}>
          + New
        </Button>
      </div>
      <div style={{float: "right"}}>
        <Icon
          type="reload"
          onClick={() => window.location.reload(false)}
          style={{
            color: "white",
            width: "80px",
          }}
        />
      </div>
      <div
        className="logo"
        style={{
          textAlign: "center",
        }}
      >
        <a href="/">
          <Logo />
        </a>
      </div>
      <UploadingModal visible={visible} handleOk={handleOk} confirmLoading={confirmLoading} handleCancel={handleCancel} upladingURL={upladingURL} uploadOnChange={uploadOnChange} />
    </Layout.Header>
  )
}

export default Header
