import React from 'react'
import { withState } from 'hypr'
import api from '@/util/api.js'
import GridPhoto from '@/components/GridPhoto.js'
import LoadMore from '@/components/LoadMore.js'

class Grid extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      query: props.query,
      limit: props.limit,
      offset: props.offset
    }

    this.query = props.query
    this.limit = props.limit
    this.offset = props.offset

    this.fetchTimeout = null
  }

  next () {
    const { query, limit, offset } = this.state
    this.fetch({ query, limit, offset: offset + limit })
  }

  fetch ({ query, limit, offset }) {
    return api.photos({ query, limit, offset }).then(res => {
      const { query, offset, limit, photos } = res

      this.setState({ query, offset, limit })
      this.props.hydrate(res)()
    })
  }

  debounce (props) {
    this.fetchTimeout && clearTimeout(this.fetchTimeout)
    this.fetchTimeout = setTimeout(() => {
      this.fetch(props)
    }, 500)
  }

  isInvalidated (props) {
    const keys = [ 'query', 'limit', 'offset' ]

    for (let i = 0; i < keys.length; i++) {
      if (props[keys[i]] !== this.state[keys[i]]) {
        return true
      }
    }

    return false
  }

  componentWillReceiveProps (props) {
    const invalidated = this.isInvalidated(props)

    if (invalidated) this.debounce(props)
  }

  render () {
    const { photos, next, collection } = this.props

    return (
      <section className='grid rel'>
        {collection && (
          <div>{collection.description}</div>
        )}

        <div>
          <ul className='grid__row rel f fw'>
            {photos.map(photo => {
              return <GridPhoto key={photo.id} {...photo} />
            })}
          </ul>
        </div>

        {next && <LoadMore next={() => this.next()} />}
      </section>
    )
  }
}

export default withState(state => {
  return {
    next: !!state.next,
    query: state.query,
    limit: state.limit,
    offset: state.offset,
    photos: state.photos,
    collection: state.collection
  }
})(Grid)