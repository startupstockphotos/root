import fetch from 'isomorphic-fetch'

const assetsUrl = 'https://ssp-static.now.sh'
const apiUrl = 'http://localhost:3000/api/v1/photos'

const photoCache = new Map()

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
   * { query, limit, offset } = opts
   */
  photos (opts = {}) {
    const q = stringify({
      query: opts.query || '',
      limit: opts.limit || 24,
      offset: opts.offset || 0
    })

    return fetch(apiUrl + (q ? '?' + q : ''))
      .then(r => r.json())
      .then(responseHandler)
      .catch(e => {
        console.error(`api.photos failed`)
        console.error(e)
      })
  },
  photo (id) {
    const photo = photoCache.get(id)

    // TODO add catch
    return Promise.resolve(
      photo || fetch(apiUrl + '/' + id).then(r => r.json())
    )
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
