import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Button as AntButton} from 'antd'
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';

import {getLayout} from './lib/layout'
import Button from '../../_atoms/Button'


type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
type Props = {
  userAgent?: string
}


const Page: ExtendedNextPage<Props> = ({userAgent}) => {
  return (
    <div>
      <p>
        Hello world! user agent: {userAgent}
        search
      </p>
      <Button buttonText='yay' type='danger' size='default' />
      <AntButton>Hoge</AntButton>
      <NestedTable />
    </div>
  );
}

Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  return {userAgent}
}


const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function NestedTable() {
  const router = useRouter()
  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    type Data = {
      key: number,
      date: string,
      name: string,
      upgradeNum: string
    }

    let data: Data[] = [] as Data[];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(_record, rowIndex) => {
        return {
          onDoubleClick: _event => {router.push(`/search/${rowIndex}`)}
        }
      }}
    />;
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  type MockData = {
    key: number,
    name: string
    platform: string,
    version: string,
    upgradeNum: number,
    creator: string,
    createdAt: string,
  }

  const data: MockData[] = [] as MockData[];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i as number,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}


export default Page;
