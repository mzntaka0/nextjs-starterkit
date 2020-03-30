import React, {useState} from 'react'
import Headroom from 'react-headroom'
import dynamic from 'next/dynamic'

import DocumentMenu from '../../../objects/DocumentMenu'
import DocumentTable from '../../../objects/DocumentTable'
import TestLinks from '../../../objects/TestLinks'
import {Document} from '../../../../entities/Document'
//import DocumentStats from '../../objects/DocumentStats'


const DocumentStats = dynamic(
  () => import('../../../objects/DocumentStats'),
  { ssr: false }
)


// TODO: Delete userAgent after testing
const DocumentContent: React.FC<{dataSource: Document[] |  undefined, userAgent?: string}> = ({dataSource, userAgent}) => {
  const [documents, setDocuments] = useState<Document[] | undefined>(dataSource)
  userAgent
  return (
    <>
      <DocumentMenu />
      {/*<DocumentStats />*/}
      <DocumentTable dataSource={documents} />
    </>
  )
}


export default DocumentContent
