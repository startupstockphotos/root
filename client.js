import '@/styles/main.css'
import { client } from 'rola'
import routes from '@/routes.js'
import * as NotFound from '@/routes/404.js'

client(routes.concat(NotFound), {}, {
  resolve ({ state, pathname }) {
    console.log(pathname)
    if (/^\/$/.test(pathname) && state.homeScrollPosition) {
      requestAnimationFrame(() => {
        window.scrollTo(0, state.homeScrollPosition)
      })
    } else {
      window.scrollTo(0, 0)
    }
  }
})
