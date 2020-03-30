import React from 'react'
import Link from 'next/link'
import {Layout} from 'antd'

import CompanyLogo from '../../_atoms/CompanyLogo'


type Props = {
  yearFrom?: number
}

const Footer: React.FC<Props> = ({yearFrom=2018}) => {
  const isCorrect: boolean = new Date().getFullYear() > yearFrom
  const currentYear = new Date().getFullYear()
  return (
    <Layout.Footer>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <CompanyLogo />&nbsp;&nbsp;
        &copy; {isCorrect ?  yearFrom : null} - {currentYear},&nbsp; Sample Inc. &nbsp;&nbsp;
        <a href="/">
          Terms of Use
        </a>
      </div>
    </Layout.Footer>
  )
}


export default Footer
