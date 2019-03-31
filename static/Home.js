import React from 'react'
import api from '@/util/api.js'
import * as Home from '@/routes/Home.js'

export const pathname = '/'

export function load () {
  return Promise.all([
    api.photos({
      fetchStats: true
    })
  ]).then(([ apiResponse ]) => {
    return {
      state: {
        ...apiResponse,
        meta: {
          title: 'Startup Stock Photos',
          description: ''
        }
      }
    }
  })
}

export const view = Home.view
