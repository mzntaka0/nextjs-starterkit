import {useState, useCallback} from 'react'
import {Icon} from 'antd'


const useSideBar = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const toggle = useCallback(
    () => setVisible(!visible),
    [visible]
  )
  return {
    visible: visible,
    toggle: toggle,
    menuIcon: visible ?
      () => <Icon type="close" style={{color: "white"}} onClick={toggle} /> : () => <Icon type="menu" style={{color: "white"}} onClick={toggle} />
  }
}


export default useSideBar
