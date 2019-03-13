import React from 'react'
import api from '@/util/api.js'
import App from '@/components/App.js'
import Grid from '@/components/Grid.js'

export const pathname = '/:query?'

// add initialstate to biti
// export function config () {
//   return load().then(res => {
//     return {
//       ...res,
//       pathname: '/' // can't have query in static
//     }
//   })
// }

export function load (state, req) {
  return Promise.all([
    api.photos({
      query: state.router.params.query || ''
    })
  ]).then(([ apiResponse ]) => {
    return {
      meta: {
        title: 'Startup Stock Photos',
        description: ''
      },
      props: {
        ...apiResponse
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
