import { service } from '../../../config'
import _ from '../../../utils/util'


// pages/review/list/list.js
Page({
  data: {
    movie: null,
    reviewList: [],
  },

  onLoad(options) {
    const movie = JSON.parse(options.movie)
    this.setData({ movie })

    wx.setNavigationBarTitle({
      title: movie.title,
    })
    this.getMovieList(movie.id)
  },

  onPullDownRefresh() {
    this.getMovieList(this.data.movie.id,wx.stopPullDownRefresh)
  },

  getMovieList(movieId, callback) {
    _.API({
      url: service.review,
      data: { movieId },
      success: reviewList => 
        this.setData({
          reviewList: reviewList.map(
            r => ({
              ...r, 
              text: r.text.length > 60
                ? r.text.slice(0, 55) + '...'
                : r.text
            })
          )
      }),
      callback,
      canBeEmpty: true
    })
  },

})