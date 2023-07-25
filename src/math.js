export function add() {
  return [...arguments].reduce((p, c) => p + c, 1)
}