require = require('esm')(module)

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const wait = require('w2t')

const cwd = process.cwd();
const origin = `https://ssp-static.now.sh`

const db = require(path.join(cwd, 'api/database.js')).default

const photos = []
const toFetch = []

for (let photo of db) {
  if (!photo.stats) {
    toFetch.push(photo)
  } else {
    photos.push(photo)
  }
}

if (toFetch.length) {
  (function get (photo) {
    wait(500, [
      fetch(`${origin}/photos/processed/${photo.id}/stats.json`)
        .then(res => res.json())
    ]).then(([ stats ]) => {
      photos.push({
        ...photo,
        stats,
        images: {
          placeholder: `${origin}/photos/processed/${photo.id}/placeholder.jpg`,
          display: `${origin}/photos/processed/${photo.id}/display.jpg`,
          raw: `${origin}/photos/raw/${photo.id}.jpg`
        }
      })

      console.log(`got ${photo.id}`)

      if (toFetch.length) {
        get(toFetch.pop())
      } else {
        write(photos)
      }
    })
  })(toFetch.pop())
}

function write (photos) {
  fs.writeFile(
    path.join(cwd, 'api/database.js'),
    'export default ' + JSON.stringify(
      photos.sort((a, b) => {
        return b.id - a.id
      }),
      null,
      '  '
    ),
    e => {
      if (e) console.error(e)
    }
  )
}
