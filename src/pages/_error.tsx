import * as React from 'react'
import { useRouter } from 'next/router'
import {Button, Result} from 'antd'


type ErrorContent = {
  title: string
  subTitle: string
  extra: React.ReactElement
}


type Errors = {
  [errorNum: string]: ErrorContent
}


function Error({ statusCode }) {
  const router = useRouter()
  const BackButton: React.FC = () => <Button type="primary" onClick={() => router.back()}> Back </Button>

  const _errors: Errors = {
    "403": {
      title: "403",
      subTitle: "Sorry, you are not authorized to access this page.",
      extra: (<BackButton />)
    },
    "404": {
      title: "404",
      subTitle: "Sorry, the page you visited does not exist.",
      extra: (<BackButton />)
    },
    "500": {
      title: "500",
      subTitle: "Sorry, the server is wrong.",
      extra: (<BackButton />)
    }
  }
  return (
    <>
      <Result {..._errors[statusCode]} />
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
