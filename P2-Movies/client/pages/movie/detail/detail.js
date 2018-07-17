import { service, pages, settings } from '../../../config'
import _ from '../../../utils/util'
const app = getApp()

// pages/movie/detail/detail.js
Page({
  data: {
    movie: null
  },

  onLoad(options) {
    this.getMovieDetail(options.id)
  },

  getMovieDetail(id) {
    _.API({
      url: service.movie + id,
      success: movie => {
        this.setData({
          movie: {
            ...movie,
            description: movie.description.length > settings.descTruncation
              ? movie.description.slice(0, settings.descTruncation) + '...'
              : movie.description
          }
        })
      }
    })
  },

  onTapReviewList() {
    wx.navigateTo({
      url: pages.reviewList + '?movie=' + JSON.stringify(this.data.movie)
    })
  },

  onTapAddReview() {
    app.toAddReview({ 
      movie: this.data.movie
    })
  },

})