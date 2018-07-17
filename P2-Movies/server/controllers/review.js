const DB = require('../utils/db.js')

// GET /review/random
const random = async ctx => {
  const randomReviews = await DB.query('SELECT * FROM reviews ORDER BY RAND() LIMIT 1;')

  ctx.state.data = randomReviews.length
    ? randomReviews[0]
    : (await DB.query('SELECT * FROM movies ORDER BY RAND() LIMIT 1;'))[0]   
}

// GET /review/user
const user = async ctx => {
  const user_id = ctx.state.$wxInfo.userinfo.openId

  ctx.state.data = await DB.query('SELECT * FROM reviews WHERE user_id = ?;', [user_id])
}

// GET /review/favorite
const getFavorite = async ctx => {
  const user_id = ctx.state.$wxInfo.userinfo.openId

  ctx.state.data = await DB.query('SELECT * FROM reviews WHERE id IN (SELECT review_id FROM favorite_reviews WHERE user_id = ?);', [user_id])
}

// GET /review/:id
const detail = async ctx => {
  const reviewId = +ctx.params.id
  ctx.state.data = !isNaN(reviewId)
    ? (await DB.query('SELECT * FROM reviews WHERE id = ?', [reviewId]))[0]
    : {}
}

// GET /review
const list = async ctx => {
  const movie_id = +ctx.request.query.movieId

  ctx.state.data = await DB.query('SELECT * FROM reviews WHERE movie_id = ?;', [movie_id])
}

// POST /review/favorite
const toggleFavorite = async ctx => {
  const user_id = ctx.state.$wxInfo.userinfo.openId
  const review_id = +ctx.request.body.id

  const fav = await DB.query('SELECT * FROM favorite_reviews WHERE user_id = ? and review_id = ?;', [user_id, review_id])

  if (fav[0]) {
    await DB.query('DELETE FROM favorite_reviews WHERE user_id = ? and review_id = ?;', [user_id, review_id])

    ctx.state.data = { result: 'deleted' }

  } else {
    await DB.query('INSERT INTO favorite_reviews(user_id, review_id) VALUES (?, ?);', [user_id, review_id])

    ctx.state.data = { result: 'added' }
  }
}

// POST /review
const add = async ctx => {
  const user_id = ctx.state.$wxInfo.userinfo.openId
  const user_name = ctx.state.$wxInfo.userinfo.nickName
  const user_avatar = ctx.state.$wxInfo.userinfo.avatarUrl

  const {
    movie_id,
    movie_image,
    movie_title,
    is_audio,
    text,
    audio,
    duration
  } = ctx.request.body
  
  if (!isNaN(movie_id)) {
    await DB.query('INSERT INTO reviews(movie_id, movie_image, movie_title, user_id, user_name, user_avatar, is_audio, text, audio, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [+movie_id, movie_image, movie_title, user_id, user_name, user_avatar, is_audio, text, audio, duration])
  }

  ctx.state.data = {}
}

module.exports = {
  random,
  user,
  detail,
  list,
  getFavorite,
  toggleFavorite,
  add,
}