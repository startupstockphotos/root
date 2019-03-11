import React from 'react'
import { Link } from 'hypr'

export default function GridPhoto (props) {
  return (
    <li id={props.id} className='grid__photo rel'>
      <img className='x y fill z0' src={props.images.placeholder} data-src={props.images.display} />
      <Link href={`/photos/${props.id}`} className='abs fill z1' />
    </li>
  )
}
