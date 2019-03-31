export default Object.assign(
  {
    query: '',
    page: 0,
    hasHistory: !/about|photos/.test(window.location.pathname)
  },
  { photoCache: window.__hydrate.photos || [] },
  window.__hydrate
)
