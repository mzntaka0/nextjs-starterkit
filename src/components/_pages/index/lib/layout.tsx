import React from 'react'
import {Layout} from 'antd'
import {NextComponentType} from 'next'
import Head from 'next/head'
import Headroom from 'react-headroom'

import Header from '../../../sections/Header'
import Footer from '../../../sections/Footer'
import SideBar from '../../../sections/SideBar'
import useSideBar from '../../../../lib/hooks/useSideBar'
import Store from '../../../../store'


const SiteLayout: React.FC = ({ children }) => {
  const {visible, toggle, menuIcon} = useSideBar()
  return (
    <Store>
      <Head>
        <title>nExt - OCR for any document</title>
      </Head>
      <Layout className="layout">
        <Layout>
          <Headroom>
            {/* TODO: This implementation should not be good since this has a dependency with menuIcon */}
            <Header _menuIcon={menuIcon} />
          </Headroom>
          <Layout>
            {visible ? <SideBar /> : null}
            <Layout.Content
              style={{
                background: '#fff'
              }}
            >
              {children}
            </Layout.Content>
          </Layout>
          <Footer />
        </Layout>
      </Layout>
    </Store>
  )
}


export const getLayout = (page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>

export default SiteLayout
