import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {Button as AntButton} from 'antd'

import Button from './index'


const stories = storiesOf('Button', module)

stories
  .add('With text', () => <Button buttonText="Hello World!" />)
  .add('With text2', () => <Button buttonText="yay!" />)
  .add('ant Button', () => <AntButton />)
