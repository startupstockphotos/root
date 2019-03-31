import 'styles/main.css'

import operator from 'operator'
import picoapp from 'picoapp'

import * as actions from 'scripts/lib/actions.js'
import initialState from 'scripts/lib/initialState.js'

import images from 'scripts/lib/images.js'
import search from 'scripts/components/search.js'
import grid from 'scripts/components/grid.js'
import header from 'scripts/components/header.js'
import loadMore from 'scripts/components/loadMore.js'

const app = picoapp({
  search,
  grid,
  header,
  loadMore
}, initialState, actions)

const router = operator('#root')

router.on('after', state => {
  window.history.pushState({}, '', state.pathname)

  if (!/about|photos/.test(state.pathname) && !app.state.hasHistory) {
    app.hydrate({ hasHistory: true })
  }

  if (/photos\//.test(state.pathname)) {
    document.getElementById('header').classList.add('is-photo-route')
  } else {
    document.getElementById('header').classList.remove('is-photo-route')
  }

  if (state.pathname === '/') {
    app.actions.resetSearch()
  }

  app.mount()
  images()
})

app.mount()
images()

export {
  app,
  router
}
