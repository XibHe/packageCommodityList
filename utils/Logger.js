const __ENV__ = process.env.NODE_ENV !== 'production'

const log = (...args) => {
  if (__ENV__) console.log(...args)
}
const warn = (...args) => {
  if (__ENV__) console.warn(...args)
}
const error = (...args) => {
  if (__ENV__) console.error(...args)
}

export default {
  log,
  warn,
  error
}
