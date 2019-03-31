import React from 'react'
import vsbl from 'vsbl'
import cx from 'nanoclass'

function loadImage (src, cb) {
  let unmounted

  const img = document.createElement('img')

  img.onload = () => {
    !unmounted && cb(src)
  }

  img.src = src

  return () => {
    unmounted = true
  }
}

export default class Image extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      placeholderLoaded: false,
      displayLoaded: false
    }

    this.img = React.createRef()
  }

  componentDidMount () {
    this.lazy = vsbl(this.img.current)(
      () => this.setState({ visible: true })
    )

    this.lazy.update()
  }

  componentWillUnmount () {
    this.lazy && this.lazy.destroy()
  }

  render () {
    const { visible, placeholderLoaded, displayLoaded } = this.state
    const { images, alt } = this.props

    return (
      <div ref={this.img} className='image'>
        <img
          alt={alt}
          src={images.placeholder}
          className={cx(['block x y fill z0 is-loaded'])}
          onLoad={e => {
            this.setState({ placeholderLoaded: true })
          }} />

        {visible && (
          <img
            alt={alt}
            src={images.display}
            className={cx(['block x y fill z0', displayLoaded && 'is-loaded'])}
            onLoad={e => {
              this.setState({ displayLoaded: true })
            }} />
        )}
      </div>
    )
  }
}
