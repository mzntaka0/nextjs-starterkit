import React, {useState, useCallback} from 'react'
import {NextPage} from 'next'
import {Button as AntButton} from 'antd'
import {Drawer as AntDrawer} from 'antd'
import {useRouter} from 'next/router'

import {getLayout} from './lib/layout'
import Button from '../../../_atoms/Button'
import Logo from '../../../_atoms/Logo'
import IndexPage from '../../index'


type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
type Props = {
  userAgent?: string
}


const DrawerButton = ({onClick}) => {
  return (
    <AntButton onClick={onClick}>
      Drawer
    </AntButton>
  )
}


const Page: ExtendedNextPage<Props> = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isSecondOpen, setIsSecondOpen] = useState<boolean>(false)
  const onClick = useCallback(() => {
    setIsOpen(!isOpen)
    router.push('/')
  }, [isOpen])
  const onSecondClick = useCallback(() => {
    setIsSecondOpen(!isSecondOpen)
  }, [isSecondOpen])
  return (
    <div>
      <IndexPage />
      <AntDrawer
        title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={onClick}
        visible={isOpen}
        width="80%"
        height="70%"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <img src='https://www.cocodecow.com/forest/goods/images/p/559098a.jpg' />
        <DrawerButton onClick={onSecondClick} />
        <AntDrawer
          title="Basic Second Drawer"
          placement="right"
          closable={true}
          onClose={onSecondClick}
          visible={isSecondOpen}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </AntDrawer>
      </AntDrawer>
    </div>
  );
}

Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  return {userAgent}
}


export default Page;
