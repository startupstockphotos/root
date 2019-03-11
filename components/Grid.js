import React from 'react'
import { withState } from 'hypr'
import GridPhoto from '@/components/GridPhoto.js'
import LoadMore from '@/components/LoadMore.js'

function Grid (props) {
  return (
    <section className='grid rel'>
      <div>
        <ul className='grid__row rel f fw'>
          {props.photos.map(photo => {
            return <GridPhoto key={photo.id} {...photo} />
          })}
        </ul>
      </div>

      <LoadMore />
    </section>
  )
}

export default withState(state => {
  return {
    photos: state.photos
  }
})(Grid)
