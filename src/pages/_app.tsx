import React from 'react'
import {NextPage} from 'next'
import App from 'next/app'


//type ExtendedNextPage = NextPage & {getLayout?(page: React.ReactNode): any}

type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
type Props = {}

class MyApp extends App<{Component: ExtendedNextPage<Props>, pageProps: any, router: any }> {
  render() {
    const { Component, pageProps, router } = this.props

    const getLayout = Component.getLayout || (page => page)

    return getLayout(<Component {...pageProps}></Component>)
  }
}

export default MyApp
