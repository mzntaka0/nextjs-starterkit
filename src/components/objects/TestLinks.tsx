import React from 'react'

import {Button as AntButton} from 'antd'
import {CSVLink} from 'react-csv'

type Data = {
    key: string,
    name: string,
    age: number,
    address: string,
    theImageURL: string
}

const data: Data[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '6',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
  {
    key: '7',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    theImageURL: 'https://www.cocodecow.com/forest/goods/images/p/559098a.jpg'
  },
];

const TestLinks: React.FC = () => {
  return (
    <>
      <AntButton><a href='/about'>about</a></AntButton>
      <AntButton><a href='/forget'>forget</a></AntButton>
      <AntButton><a href='/login'>login</a></AntButton>
      <AntButton><a href='/register'>register</a></AntButton>
      <AntButton><a href='/search'>search</a></AntButton>
      <AntButton><a href='/settings'>settings</a></AntButton>
      <AntButton><a href='/upload'>upload</a></AntButton>
      <AntButton><a href='/company'>company</a></AntButton>
      {/*<CSVLink data={data}>
        download me
        </CSVLink>*/}
    </>
  )
}

export default TestLinks
