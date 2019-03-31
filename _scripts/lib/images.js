import vsbl from 'vsbl'

export default function images () {
  [].slice.call(document.querySelectorAll('[data-src]')).map(img => {
    const src = img.getAttribute('data-src')

    let int

    int = vsbl(img)(() => {
      const i = document.createElement('img')

      i.onload = e => {
        img.src = src
        int && int()
      }

      i.src = src
    })
  })
}
