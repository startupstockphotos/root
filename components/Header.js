import React from 'react'
import cx from 'classnames'
import { Link, withState } from 'rola'
import Search from '@/components/Search.js'
import { Logo } from '@/components/Icons.js'

class CollectionsMenu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.button = React.createRef()
    this.drop = React.createRef()

    this.handleDocClick = this.handleDocClick.bind(this)
  }

  handleDocClick (e) {
    if (
      e.target !== this.button.current
      && e.target !== this.drop.current
      && !this.button.current.contains(e.target)
      && !this.drop.current.contains(e.target)
    ) {
      this.toggle()
    }
  }

  toggle (e) {
    const { open } = this.state

    if (open) {
      this.setState({ open: false })
      document.removeEventListener('click', this.handleDocClick)
    } else {
      this.setState({ open: true })
      document.addEventListener('click', this.handleDocClick)
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocClick)
  }

  render () {
    const { open } = this.state

    return (
      <div className={cx('header__collections rel f aic', {
        'is-active': open
      })}>
        <button ref={this.button} className='f aic rel' onClick={this.toggle.bind(this)}>
          <span className='block track caps'>Browse</span>
          <img src='https://icon.now.sh/chevron/down' className='block abs top bottom right' />
        </button>

        <div ref={this.drop} className='header__collections__drop abs bottom right h6 f'>
          <ul>
            <li><Link href='/collections/people'>Offices <img src='https://icon.now.sh/chevron' /></Link></li>
            <li><Link href='/collections/people'>People <img src='https://icon.now.sh/chevron' /></Link></li>
            <li><Link href='/collections/people'>Mac <img src='https://icon.now.sh/chevron' /></Link></li>
            <li><Link href='/collections/people'>PC <img src='https://icon.now.sh/chevron' /></Link></li>
          </ul>
          <ul>
            <li><Link href='/collections/people'>Outdoors <img src='https://icon.now.sh/chevron' /></Link></li>
            <li><Link href='/collections/people'>Colorful <img src='https://icon.now.sh/chevron' /></Link></li>
            <li><Link href='/collections/people'>Coworking <img src='https://icon.now.sh/chevron' /></Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

function Header ({ query, isPhotoRoute, hydrate }) {
  return (
    <React.Fragment>
      <header className={cx(['header rel z10 fix top left right x',
        isPhotoRoute && 'is-photo-route'
      ])}>
        <div className='header__inner rel f aic jcb'>
          <div className='header__left rel f aic x'>
            <Link href='/' className='header__logo block rel f aic' onClick={e => {
              hydrate({ homeScrollPosition: 0 })
            }}>
              <Logo />
            </Link>

            <Link
              href={'/' + (query || '')}
              role='button'
              className='header__back button button button--outline rel ml075 s6'>
              &larr; back
            </Link>

            <div className='header__divider rel mx075 s4'>/</div>

            <Search />
          </div>

          <div className='header__mid rel f aic'>
            <CollectionsMenu />
            <button className='header__donate button'>Donate</button>
          </div>

          <div className='header__right f aic'>
            <button className='header__menu-toggle rel'>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className='header-spacer rel'></div>
    </React.Fragment>
  )
}

export default withState(state => {
  return {
    query: state.query,
    isPhotoRoute: /^\/photos\/[0-9]+$/.test(state.router.location)
  }
})(Header)
