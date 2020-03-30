import React, {useState, useEffect} from 'react'
import useSWR from 'swr'

import {getLayout} from './lib/layout'
import DocumentContent from '../../sections/Contents/DocumentContent'
import {documentFetcher} from './lib/fetch'
import {ExtendedNextPage} from '../../../entities/ExtendedNextPage'
import {Document} from '../../../entities/Document'


type Props = {
  userAgent?: string
  result?: Document[]
}

// FIXME: need to fix to get apiURL correctly
const apiURL = process.env.API_DOMAIN
const idToken = process.env.TESTUSER_IDTOKEN

const Page: ExtendedNextPage<Props> = ({userAgent, result}) => {
  //useEffect(() => {
  //  const documents_ = documentFetcher({apiURL, idToken})
  //    .then((res) => {
  //      setDocuments(res)
  //    })
  //    .catch((err) => {
  //      console.log(err)
  //    })
  //}, [])
  return (
    <>
      <DocumentContent dataSource={result} userAgent={userAgent} />
    </>
  )
}

Page.getLayout = getLayout

Page.getInitialProps = async ({req}) => {
  const userAgent = req? req.headers['user-agent'] : navigator.userAgent
  const result = await documentFetcher({apiURL, idToken})
  return {userAgent, result}
}


export default Page;
