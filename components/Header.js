import React from 'react'
import cx from 'nanoclass'
import { Link, withState } from 'rola'
import Search from '@/components/Search.js'
import { Logo } from '@/components/Icons.js'

function Header ({ query, isPhotoRoute }) {
  return (
    <React.Fragment>
      <header className={cx(['header rel z10 fix top left right x',
        isPhotoRoute && 'is-photo-route'
      ])}>
        <div className='header__inner rel f aic jcb'>
          <div className='header__left rel f aic x'>
            <Link href='/' className='header__logo block rel f aic'>
              <Logo />
            </Link>

            <Link
              href={'/' + query}
              role='button'
              className='header__back button button button--outline rel ml075 s6'>
              &larr; back
            </Link>

            <div className='header__divider rel mx075 s4'>/</div>

            <Search />
          </div>

          <div className='header__mid f aic'>
            <div className='header__collections rel'>
              <button className='rel'>
                Collections
                <img src='https://icon.now.sh/chevron/down' className='abs top bottom right mya' />
              </button>

              <div className='header__collections__drop abs bottom right'>
                <ul>
                  <li><Link href='/collections/people'>People</Link></li>
                </ul>
              </div>
            </div>
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
    isPhotoRoute: false ///^\/photos\/[0-9]+$/.test(state.router.location)
  }
})(Header)
