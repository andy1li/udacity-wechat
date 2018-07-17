import { service, settings } from '../../../config'
import _ from '../../../utils/util'

// pages/movie/list/list.js
Page({
  data: {
    movieList: []
  },

  onLoad(options) {
    this.getMovieList()
  },

  onPullDownRefresh() {
    this.getMovieList(wx.stopPullDownRefresh)
  },

  getMovieList(callback) {
    _.API({
      url: service.movie,
      data: {
        limit: settings.movieListLimit
      },
      success: movieList => 
        this.setData({ movieList }),
      callback,

    })
  },

})