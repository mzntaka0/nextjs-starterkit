import React from 'react'
import {NextPage} from 'next'
import {Button as AntButton} from 'antd'

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
        forget
      </p>
      <Button buttonText='yay' type='danger' size='default' />
      <AntButton>Hoge</AntButton>
    </div>
  );
}

Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  return {userAgent}
}


export default Page;
