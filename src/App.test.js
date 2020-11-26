import App from './App'
import React from 'react'
import { ReactDom } from 'react-dom'

test('renders learn react link', () => {
  const div = document.createElement('div')
  ReactDom.render(<App></App>, div)
  ReactDom.unmountComponentAtNode(div)
})
