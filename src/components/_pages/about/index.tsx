import React from 'react'
import {NextPage} from 'next'
import {getLayout} from './lib/layout'
import fetcher, {URL, query} from './lib/fetch'
//import fetch from 'isomorphic-fetch'
//import { request } from 'graphql-request'
import useSWR from 'swr'


// TODO: move this type to other module for readability
type ExtendedNextPage<P> = NextPage<P> & {getLayout?(page: React.ReactNode): any}
type Props = {
  initialData: any
}


const Page: ExtendedNextPage<Props> = ({initialData}) => {
  const {data, error, isValidating, revalidate} = useSWR(query, fetcher, {initialData})
  return (
    <div>hoge {data}</div>
  );
}

Page.getLayout = getLayout

// refer here: https://codeconqueror.com/blog/fetching-data-in-next-js
Page.getInitialProps = async () => {
  //const query = `
  //{
  //  users {
  //    firstName,
  //  }
  //}
  //`
  const initialData = await fetcher(query)
  return {initialData}
}


export default Page;
