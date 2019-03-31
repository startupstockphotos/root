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
   * { query, limit, offset, fetchStats } = opts
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
      .then(res => {
        if (!opts.fetchStats) return res

        return Promise.all(
          res.photos.map(photo => this.stats(photo))
        ).then(stats => {
          return {
            ...res,
            photos: res.photos.map((photo, i) => {
              return {
                ...photo,
                stats: stats[i]
              }
            })
          }
        })
      })
      .catch(e => {
        console.error(`api.photos failed`)
        console.error(e)
      })
  },
  photo (id) {
    const photo = photoCache.get(id)
    const stats = statsCache.get(id)

    console.log(stats)

    return Promise.resolve(
      photo || fetch(apiUrl + '/' + id).then(r => r.json())
    ).then(photo => {
      return this.stats(photo)
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
  stats (photo) {
    const cached = statsCache.get(photo.id)

    return Promise.resolve(cached || fetch(photo.stats).then(r => r.json()))
      .then(stats => {
        statsCache.set(photo.id, stats)
        return stats
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
