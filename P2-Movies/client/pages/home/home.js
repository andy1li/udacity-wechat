import { service } from '../../config'
import _ from '../../utils/util'

// pages/home/home.js
Page({
  data: {
    reviewId: -1,
    movieId: -1,
    movieImage: '',
    movieTitle: '',
    userName: '',
    userAvatar: '',
  },

  onLoad(options) {
    this.getRandomReview()
  },

  onPullDownRefresh() {
    this.getRandomReview(wx.stopPullDownRefresh)
  },

  getRandomReview(callback) {
    _.API({
      url: service.reviewRandom,
      success: this.setRecommendation,
      callback
    })
  },

  setRecommendation(data) {
    const recommendation = data.movie_id
      ? {
        ...data,
        reviewId: data.id,
        movieId: data.movie_id,
        movieImage: data.movie_image,
        movieTitle: data.movie_title,
        userName: data.user_name,
        userAvatar: data.user_avatar,
      } 
      : {
        movieId: data.id,
        movieImage: data.image,
        movieTitle: data.title,
      }

    this.setData({ 
      ...this.data,
      ...recommendation
    })
  },

})