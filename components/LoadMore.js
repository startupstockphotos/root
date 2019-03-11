import React from 'react'
import cx from 'nanoclass'
import vsbl from 'vsbl'
import { withState } from 'hypr'
import api from '@/util/api.js'

class LoadMore extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false,
      loading: false
    }

    this.ref = React.createRef()
  }

  componentDidMount () {
    this.watcher = vsbl(this.ref.current)(() => {
      this.setState({ active: true })
    }, () => {
      this.setState({ active: false })
    })
  }

  render () {
    const { active, loading } = this.state
    const { loadMore, hydrate } = this.props

    return loadMore ? (
      <div ref={this.ref} className={cx([
        'load-more abs bottom left right f aic x jcc z10',
        active && 'is-active'
      ])}>
        <button className='button button--large button--white' onClick={e => {
          this.setState({ loading: true })
          loadMore().then(response => {
            hydrate(state => ({
              next: response.next,
              photos: state.photos.concat(response.items)
            }))()
          })
        }}>
          <span>Load More</span>
          <svg className='block abs fill ma' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><line x1='12' y1='2' x2='12' y2='6'></line><line x1='12' y1='18' x2='12' y2='22'></line><line x1='4.93' y1='4.93' x2='7.76' y2='7.76'></line><line x1='16.24' y1='16.24' x2='19.07' y2='19.07'></line><line x1='2' y1='12' x2='6' y2='12'></line><line x1='18' y1='12' x2='22' y2='12'></line><line x1='4.93' y1='19.07' x2='7.76' y2='16.24'></line><line x1='16.24' y1='7.76' x2='19.07' y2='4.93'></line></svg>
        </button>
      </div>
    ) : null
  }
}

export default withState(state => {
  if (!state.next) return {}

  return {
    loadMore () {
      return api.load(state.next)
    }
  }
})(LoadMore)
