 const formatTimstamp = (ts) => {
  const t = new Date(ts)
  const r = {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes(),
    second: t.getSeconds()
  }

  if (r.month < 10) r.month = `0${r.month}`
  if (r.day < 10) r.day = `0${r.day}`
  if (r.hour < 10) r.hour = `0${r.hour}`
  if (r.minute < 10) r.minute = `0${r.minute}`
  if (r.second < 10) r.second = `0${r.second}`

  return r
}
export default {
  formatTimstamp
}
