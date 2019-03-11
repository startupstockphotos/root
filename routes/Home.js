import React from 'react'
import api from '@/util/api.js'
import App from '@/components/App.js'
import Grid from '@/components/Grid.js'

export const pathname = '/'

export function config () {
  return load()
}

export function load (state, req) {
  return Promise.all([
    api.photos()
  ]).then(([ apiResponse ]) => {
    return {
      meta: {
        title: 'Startup Stock Photos',
        description: ''
      },
      props: {
        query: apiResponse.query,
        next: apiResponse.next,
        photos: apiResponse.items
      }
    }
  })
}

export function view (props) {
  return (
    <App>
      <Grid />
    </App>
  )
}
