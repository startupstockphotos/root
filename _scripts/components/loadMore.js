import { component } from 'picoapp'
import vsbl from 'vsbl'
import wait from 'w2t'

export default component(({ node, state, actions }) => {
  let page = state.page
  let pages = state.pages

  vsbl(node)(
    () => {
      if (page < pages) {
        node.classList.add('is-active')
      }
    },
    () => {
      node.classList.remove('is-active')
    }
  )

  node.getElementsByTagName('button')[0].addEventListener('click', e => {
    node.classList.add('is-loading')

    wait(1000, [
      actions.loadMore()
    ]).then(() => {
      node.classList.remove('is-active')
      setTimeout(() => {
        node.classList.remove('is-loading')
      }, 800)
    })
  })

  return {
    onStateChange (state) {
      page = state.page
      pages = state.pages
    }
  }
})
