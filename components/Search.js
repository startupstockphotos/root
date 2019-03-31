import React from 'react'
import { withState } from 'rola'

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.input = React.createRef()
    this.attachMacro = this.attachMacro.bind(this)
  }

  attachMacro (e) {
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault()
      this.input.current.focus()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.attachMacro)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.attachMacro)
  }

  render () {
    const { query, hydrate } = this.props

    return (
      <form className='header__search rel s4 z1 x' onSubmit={e => {
        e.preventDefault()
      }}>
        <input
          ref={this.input}
          name='search'
          type='search'
          className='block x'
          placeholder='Search - ⌘s'
          value={query}
          onChange={e => {
            hydrate({ query: e.target.value })()
          }} />
        <input type='submit' value='Search' />
        <button type='button' className='abs top right bottom mya' onClick={e => {
          hydrate({ query: '' })()
        }}>&times;</button>
      </form>
    )
  }
}

export default withState(state => {
  return {
    query: state.query
  }
})(Search)
