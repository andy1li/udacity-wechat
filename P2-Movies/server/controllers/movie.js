const DB = require('../utils/db.js')

// GET /movie
const list = async ctx => {
  const limit = +ctx.request.query.limit || 15

  ctx.state.data = await DB.query('SELECT * FROM movies ORDER BY RAND() LIMIT ?;', [limit])
}

// GET /movie/:id
const detail = async ctx => {
  const movieId = +ctx.params.id
  let movie

  if (!isNaN(movieId)) {
    movie = (await DB.query('SELECT * FROM movies WHERE id = ?', [movieId]))[0]
  } else {
    movie = {}
  }
  ctx.state.data = movie
}


module.exports = {
  list,
  detail,
}