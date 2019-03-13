import fetch from 'isomorphic-fetch'

const assetsUrl = 'https://ssp-static.now.sh'
const apiUrl = 'http://localhost:3000/api/v1/photos'

const photoCache = new Map()
const statsCache = new Map()

function stringify (obj) {
  return Object.keys(obj).reduce((q, key) => {
    return q.concat(key + '=' + obj[key])
  }, []).join('&')
}

function responseHandler (response) {
  response.photos.map(photo => photoCache.set(photo.id, photo))
  return response
}

export default {
  /**
   * { query, limit, offset } = args
   */
  photos (args = {}) {
    args = Object.assign({
      query: '',
      limit: 24,
      offset: 0
    }, args)

    const q = stringify(args)

    return fetch(apiUrl + (q ? '?' + q : ''))
      .then(r => r.json())
      .then(responseHandler)
  },
  photo (id) {
    const photo = photoCache.get(id)
    const stats = statsCache.get(id)

    return Promise.resolve(
      photo || fetch(apiUrl + '/' + id).then(r => r.json())
    ).then(photo => {
      return Promise.resolve(
        stats || fetch(photo.stats).then(r => r.json())
      )
        .then(stats => {
          photoCache.set(id, photo)
          statsCache.set(id, stats)

          return {
            ...photo,
            stats
          }
        })
    })
  },
  load (url) {
    return fetch(url)
      .then(r => r.json())
      .then(responseHandler)
  },
  dump () {
    return photoCache.values()
  }
}
