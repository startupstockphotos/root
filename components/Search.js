import React from 'react'
import { withState } from 'hypr'

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    const { query, hydrate } = this.props

    return (
      <form className='header__search rel s4 z1 x'>
        <input
          name='search'
          type='search'
          className='block x'
          placeholder='Search - ⌘s'
          value={query}
          onChange={e => {
            hydrate({ query: e.target.value })()
          }} />
        <input type='submit' value='Search' />
        <button type='button' className='abs top right bottom mya'>
          <svg viewBox="0 0 16 16" className='abs fill ma'>
            <use xlinkHref="#x"></use>
          </svg>
        </button>
      </form>
    )
  }
}

export default withState(state => {
  return {
    query: state.query
  }
})(Search)
