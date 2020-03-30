import React from 'react'
import Headroom from 'react-headroom'

import DocumentMenu from '../../../objects/DocumentMenu'
import CompanyDocumentTable from '../../../objects/CompanyDocumentTable'
import TestLinks from '../../../objects/TestLinks'


// TODO: Need to define the type of 'dataSource' argument
// TODO: Delete userAgent after testing
const DocumentContent: React.FC<{userAgent?: string}> = ({userAgent}) => {
  return (
    <>
      <DocumentMenu />
      <CompanyDocumentTable />
      <TestLinks />
      <p>{userAgent}</p>
    </>
  )
}


export default DocumentContent
