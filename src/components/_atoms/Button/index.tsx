import * as React from 'react'
import {Button as AntButton} from 'antd'
import {useState} from 'react'


type Props = {
  buttonText?: string
  type?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link'
  size?: 'default' | 'small' | 'large'
}

const Button: React.FC<Props> = (props) => {
  let [count, setCount] = useState(0)
  // bad practice
  return <AntButton onClick={() => setCount(prev => prev + 1)} size={props.size || 'default'} type={props.type || 'primary'}>{props.buttonText} {count}</AntButton>
  //return <AntButton onClick={() => setCount(prev => prev + 1)}> hoge {count}</AntButton>
}

//interface Person {
//  name: 'rashomon'
//}
//
//interface Rashomon: Person = {
//  name: 'rashomon',
//}


//export default Button
export default Button
