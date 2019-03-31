import connect from 'connect'
import { server } from 'rola'

import v1 from '@/api/v1.js'
import routes from '@/routes.js'
import * as NotFound from '@/routes/404.js'

export default connect()
  .use('/api/v1', v1)
  .use(server(routes, {}))
  .use(server([ NotFound ], {}))
