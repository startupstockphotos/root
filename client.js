import '@/styles/main.css'
import { client } from 'hypr'
import routes from '@/routes.js'
import * as NotFound from '@/routes/404.js'

client(routes.concat(NotFound), {}, {
  resolve (state) {
    window.scrollTo(0, 0)
  }
})(document.getElementById('root'))
