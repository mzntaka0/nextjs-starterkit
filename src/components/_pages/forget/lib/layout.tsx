import React from 'react'
import {NextComponentType} from 'next'


const SiteLayout: React.FC = ({ children }) => (
  <div>{children}</div>
)


export const getLayout = (page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>

export default SiteLayout
