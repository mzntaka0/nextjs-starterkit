import React, {useState, useCallback} from 'react'
import {NextPage} from 'next'
import {Button as AntButton} from 'antd'
import {Drawer as AntDrawer} from 'antd'

import {getLayout} from './lib/layout'
import Button from '../../_atoms/Button'
import Logo from '../../_atoms/Logo'


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


const Page: ExtendedNextPage<Props> = ({userAgent}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSecondOpen, setIsSecondOpen] = useState<boolean>(false)
  const onClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])
  const onSecondClick = useCallback(() => {
    setIsSecondOpen(!isSecondOpen)
  }, [isSecondOpen])
  return (
    <div>
      <Logo />
      <p>
        Hello world! user agent: {userAgent}
        company
      </p>
      <Button buttonText='yay' type='danger' size='default' />
      <DrawerButton onClick={onClick} />
      <AntDrawer
        title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={onClick}
        visible={isOpen}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
