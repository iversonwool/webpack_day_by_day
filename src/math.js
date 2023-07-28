export function add() {
  return [...arguments].reduce((p, c) => p + c, 1)
}

export function triple(a) {
  console.log('triple')
  return a * a * a
}