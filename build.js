require('module-alias').addAliases(
  require('./spaghetti.config.js').alias
)

const fab = require('fab.js')
const fetch = require('node-fetch')

const { NOW, WATCH } = process.env

const api = NOW ? 'https://ssp-api.now.sh' : 'http://localhost:3001'

fab.out('build')

fab.data({ api }) // for components

fab.pages([
  {
    path: '/',
    view: require('./src/markup/pages/Home.js'),
    data: {
      title: 'Startup Stock Photos',
      meta: {
        title: 'Startup Stock Photos'
      }
    },
  }
])

Promise.all([
  fetch(api + '/api/v1/photos?limit=200').then(res => res.json()),
  fetch(api + '/api/v1/photos').then(res => res.json())
])
  .then(([ { photos }, res ]) => {
    fab.data(res)

    fab.pages(photos.map(photo => {
      return {
        path: `/photos/${photo.id}`,
        view: require('./src/markup/pages/Photo.js'),
        data: {
          title: photo.id,
          meta: {
            title: photo.id
          },
          photo
        },
      }
    }))

    WATCH ? fab.watch('./src/markup/pages') : fab.render()
  })
