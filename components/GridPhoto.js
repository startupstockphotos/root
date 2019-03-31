import React from 'react'
import { Link } from 'rola'
import Image from '@/components/Image.js'

export default function GridPhoto (props) {
  return (
    <li id={props.id} className='grid__photo rel'>
      <Link href={`/photos/${props.id}`} className='block rel'>
        <Image className='grid__photo__image rel' images={props.images} alt={props.description} color={props.stats.color} />
      </Link>
    </li>
  )
}
