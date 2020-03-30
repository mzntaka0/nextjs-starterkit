import {Icon} from 'antd'
import React from 'react'
import {CSVLink} from 'react-csv'

type Data = {
  key: string,
  name: string,
  age: number,
  address: string,
  theImageURL: string
}

const Download: React.FC<Data[]> = (data) => {
  return (
    <CSVLink data={data}>
      <Icon
        type="cloud-download"
        style={{
          color: "white",
          width: "80px",
        }}
      />
    </CSVLink>
  )
}


export default Download
