import { component } from 'picoapp'
import tickl from 'tickl'
import { router } from 'scripts/index.js'

export default component(({ node, state }) => {
  const toggle = document.getElementById('menuToggle')
  const back = document.getElementById('headerBack')

  let query = state.query

  back.onclick = e => {
    router.go('/' + query)
  }

  return {
    onStateChange (state) {
      query = state.query
    }
  }
})
