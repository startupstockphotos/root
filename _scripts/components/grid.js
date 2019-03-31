/** @jsx h */
import { h, patch, recycle } from 'superfine'
import { component } from 'picoapp'
import images from 'scripts/lib/images.js'

// duplicate of ./markup/components/GridPhoto.js
function GridPhoto (props) {
  return (
    <li id={props.id} className='grid__photo rel'>
      <img className='x y fill z0' src={props.images.placeholder} data-src={props.images.display} />
      <a href={`/photos/${props.id}`} className='abs fill z1'></a>
    </li>
  )
}

function Grid (props) {
  return (
    <ul className='grid__row rel f fw'>
      {props.photos.map(photo => (
        <GridPhoto key={photo.id} {...photo} />
      ))}
    </ul>
  )
}

export default component(({ node, state, actions }) => {
  const app = (view, container, n) => state => {
    n = patch(recycle(node), view(state), container)
  }

  const render = app(Grid, node)

  render(state)

  return {
    onStateChange(state) {
      render(state)
      images()
    }
  }
})
