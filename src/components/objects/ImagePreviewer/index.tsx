import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


type Props = {
  imagePath: string,
  width?: number | string,
  height?: number | string,
}

const ImagePreviewer: React.FC<Props> = (props) => {
  return (
    <Zoom>
      <img src={props.imagePath} alt={props.imagePath} width={props.width} height={props.height} />
    </Zoom>
  )
}


export default ImagePreviewer
