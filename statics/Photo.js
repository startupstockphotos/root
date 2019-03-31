import React from 'react'
import api from '@/util/api.js'
import * as Photo from '@/routes/Photo.js'

export function load () {
  return Promise.all([
    api.photos({
      limit: 200
    })
  ]).then(([ apiResponse ]) => {
    return apiResponse.photos.map(photo => {
      return {
        pathname: `/photos/${photo.id}`,
        state: {
          photo,
          meta: {
            title: '#' + photo.id + ' | Startup Stock Photos'
          }
        }
      }
    })
  })
}

export const view = Photo.view
