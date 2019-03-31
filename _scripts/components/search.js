import { component } from 'picoapp'

export default component(({ node: form, state, actions }) => {
  const [ input ] = form.getElementsByTagName('input')
  const reset = form.getElementsByTagName('button')[0]

  let timeout

  function update () {
    window.history.replaceState({}, '', input.value || '/')
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      input.value ? (
        actions.search(input.value).then(() => {
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 50)
        })
      ) : (
        actions.resetSearch()
      )
    }, 500)
  }

  input.addEventListener('keyup', update)
  input.addEventListener('change', update)
  form.addEventListener('submit', e => {
    e.preventDefault()
    update()
  })

  reset.addEventListener('click', e => {
    input.value = ''
    update()
  })

  document.addEventListener('keydown', e => {
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault()
      input.focus()
    }
  })

  return {
    onStateChange (state) {
      input.value = state.query
    }
  }
})
