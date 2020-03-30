import React, {useState, useCallback} from 'react'
import {NextPage} from 'next'
import {Button as AntButton} from 'antd'
import {Drawer as AntDrawer} from 'antd'

import {getLayout} from './lib/layout'
import Button from '../../_atoms/Button'
import Logo from '../../_atoms/Logo'
import CompanyContent from '../../sections/Contents/CompanyContent'


type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
type Props = {
  userAgent?: string
}


const Page: ExtendedNextPage<Props> = ({userAgent}) => <CompanyContent userAgent={userAgent} />


Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  return {userAgent}
}


export default Page;
