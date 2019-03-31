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

          <div className='header__mid rel f aic'>
            <div className='header__collections rel f aic'>
              <button className='f aic rel'>
                <span className='block track caps'>Browse</span>
                <img src='https://icon.now.sh/chevron/down' className='block abs top bottom right' />
              </button>

              <div className='header__collections__drop abs bottom right h6 f'>
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
