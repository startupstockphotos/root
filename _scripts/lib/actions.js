import fetch from 'unfetch'
import { uniq } from 'scripts/lib/util.js'
import initialState from 'scripts/lib/initialState.js'

export const search = (query, page = 0) => state => {
  return fetch(`${initialState.api}/api/v1/search/${query}?page=${page}`, {
    mode: 'cors'
  })
    .then(r => r.json())
    .then(({ photos, pages, hits, query }) => {
      return {
        query,
        page: 0, // reset
        photos,
        pages,
        hits,
        photoCache: uniq('id', state.photoCache.concat(photos))
      }
    })
}

export const loadMore = () => state => {
  const page = state.page + 1

  return state.query ? (
    fetch(`${initialState.api}/api/v1/search/${state.query}?page=${page}`, {
      mode: 'cors'
    })
      .then(r => r.json())
      .then(({ photos, pages, hits, query }) => {
        return {
          query,
          page,
          photos: state.photos.concat(photos),
          pages,
          hits,
          photoCache: uniq('id', state.photoCache.concat(photos))
        }
      })
  ) : (
    fetch(`${initialState.api}/api/v1/photos?page=${page}`, {
      mode: 'cors'
    })
      .then(r => r.json())
      .then(({ photos, pages, hits }) => {
        return {
          query: '',
          page,
          photos: state.photos.concat(photos),
          pages,
          hits,
          photoCache: uniq('id', state.photoCache.concat(photos))
        }
      })
  )
}

export const resetSearch = () => state => ({
  page: 0,
  query: '',
  hits: state.photoCache.length,
  pages: Math.ceil(state.photoCache.length / 24),
  photos: state.photoCache
})
