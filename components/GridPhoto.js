import React from 'react'
import { Link, withState } from 'rola'
import Image from '@/components/Image.js'

export default withState(state => ({}))(
  function GridPhoto (props) {
    return (
      <li id={props.id} className='grid__photo rel'>
        <Link href={`/photos/${props.id}`} className='block rel' onClick={e => {
          props.hydrate({ homeScrollPosition: window.pageYOffset })
        }}>
          <Image className='grid__photo__image rel' images={props.images} alt={props.description} color={props.stats.color} />
        </Link>
      </li>
    )
  }
)
