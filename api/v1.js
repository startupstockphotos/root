import url from 'url'
import qs from 'qs'
import flexsearch from 'flexsearch'
import router from 'router'

import database from '@/api/database.js'
import collections from '@/api/collections.js'

const assets = 'https://ssp-static.now.sh'

const photos = database
  .map(({ id, tags, description }) => ({
    id,
    tags,
    description,
    stats: `${assets}/photos/processed/${id}/stats.json`,
    images: {
      placeholder: `${assets}/photos/processed/${id}/placeholder.jpg`,
      display: `${assets}/photos/processed/${id}/display.jpg`,
      raw: `${assets}/photos/raw/${id}.jpg`
    }
  }))
  .reverse()

const index = flexsearch.create({
  doc: {
    id: 'id',
    field: [
      'id',
      'tags',
      'description'
    ]
  }
})

index.add(photos)

function getNextURL ({ query, offset, limit }) {
  const base = 'http://localhost:3000/api/v1/photos'

  const q = qs.stringify({
    query,
    limit,
    offset:
    offset + limit
  })

  return base + '?' + q
}

function search ({
  query = '',
  limit = 24,
  offset = 0,
}) {
  offset = parseInt(offset)
  limit = parseInt(limit)

  let next
  let items

  if (query) {
    const operation = index.search(query, {
      limit,
      page: offset ? offset + '' : true // must be string
    })

    items = operation.result
    next = operation.next ? getNextURL({ query, limit, offset }) : null
  } else {
    items = photos.slice(offset, offset + limit)
    next = (items.length + offset) < photos.length ? getNextURL({ query, limit, offset }) : null
  }

  return {
    query,
    limit,
    offset,
    next,
    photos: items,
    collection: collections[query] || {}
  }
}

export default router()
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })
  .get('/photos/:id', (req, res) => {
    const result = photos.filter(p => p.id == req.params.id)[0]

    if (result) {
      res.write(JSON.stringify(result))
      res.end()
    }
  })
  .get('/photos', (req, res) => {
    const args = qs.parse(url.parse(req.url).query || '')

    let payload

    try {
      payload = JSON.stringify(search(args))
    } catch (e) {
      payload = JSON.stringify({
        errors: [ e.message ]
      })
    }

    res.write(payload)
    res.end()
  })
