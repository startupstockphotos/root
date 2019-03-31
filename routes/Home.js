import React from 'react'
import api from '@/util/api.js'
import App from '@/components/App.js'
import Grid from '@/components/Grid.js'

export const pathname = '/:query?'

export function load (state, req) {
  return Promise.all([
    api.photos({
      query: state.router.params.query || ''
    })
  ]).then(([ apiResponse ]) => {
    return {
      state: {
        ...apiResponse,
        meta: {
          title: 'Startup Stock Photos',
          description: ''
        },
      }
    }
  })
}

export function view ({ state }) {
  return (
    <App>
      <Grid />
    </App>
  )
}
