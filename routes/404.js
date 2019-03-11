import React from 'react'
import fetch from 'isomorphic-unfetch'

import App from '@/components/App.js'

export const pathname = '*'

export function load () {
  return {
    meta: {
      title: '404 Not Found'
    },
    props: {
    }
  }
}

export function view (props) {
  return (
    <App>
      <h1>404</h1>
    </App>
  )
}
