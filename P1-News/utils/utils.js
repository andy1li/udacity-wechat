import { categories, blankImage } from './config'

const pad = (n, width=2) => {
  n = String(n)
  return n.length >= width 
    ? n 
    : new Array(width - n.length + 1).join('0') + n
}

const formatDate = dateString => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${pad(date.getMinutes())}`
}

export const clean = item => {
  const { date, firstImage, source } = item
  return {
    ...item,
    date: formatDate(date),
    firstImage: firstImage || blankImage,
    source: source || '来源不详'
  }
}

export const getType = query => {
  for (const { name, type } of categories) {
    if (name == query) return type
  }
}