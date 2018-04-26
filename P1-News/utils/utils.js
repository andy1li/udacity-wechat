import { categories, blankImage } from './config'

const pad = (n, width=2) => {
  n = String(n)
  return n.length >= width 
    ? n 
    : new Array(width - n.length + 1).join('0') + n
}

const cleanDate = dateString => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${pad(date.getMinutes())}`
}

export const clean = item => {
  let { date, source, firstImage } = item
  return {
    ...item,
    date: cleanDate(date),
    firstImage: firstImage || blankImage,
    source: source || '来源不详'
  }
}

export const cleanBatch = batch => {
  return batch.map(item =>
    clean(item)
  )
}

export const getType = query => {
  for (let { name, type } of categories) {
    if (name == query) return type
  }
}