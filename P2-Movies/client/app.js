//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
import { pages, service, settings  } from './config'
import _ from './utils/util'

App({
  onLaunch: function () {
    qcloud.setLoginUrl(service.loginUrl)
  },

  login({ success, fail }) {
    qcloud.login({
      success: result => {
        if (result) success && success(result)
        else this.getUserInfo({ success, fail })
      },
      fail
    })
  },

  checkSession({ success, fail }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, fail })
      },
      fail,
    })
  },

  getUserInfo({ success, fail }) {
    _.API({
      url: service.requestUrl,
      success, fail,
      canBeEmpty: true
    })
  },

  getMyReviews({ success, fail }) {
    _.API({
      url: service.myReview,
      login: true,
      success, fail,
      canBeEmpty: true
    })
  },

  getFavReviews({ success, fail }) {
    _.API({
      url: service.favReview,
      login: true,
      success, fail,
      canBeEmpty: true
    })
  },

  toggleFavReview({ data, success, fail }) {
    _.API({
      url: service.favReview,
      method: 'POST',
      data, login: true,
      success, fail,
    })
  },

  toAddReview: ({ movie }) =>
    wx.showActionSheet({
      itemList: ['文字影评', '语音影评'],
      success: res =>
        wx.navigateTo({
          url: pages.addReview
            + '?movie=' + JSON.stringify(movie)
            + '&isAudio=' + res.tapIndex
        })
    })

})