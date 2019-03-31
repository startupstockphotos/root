export function uniq (key, arr) {
  let keys = []

  for (let i = 0; i < arr.length; i++) {
    const id = arr[i][key]
    keys.indexOf(id) < 0 && keys.push(id)
  }

  let results = []

  outer: for (let k = 0; k < keys.length; k++) {
    inner: for (let a = 0; a < arr.length; a++) {
      if (arr[a][key] === keys[k]) {
        results.push(arr[a])
        continue outer
      }
    }
  }

  return results
}
