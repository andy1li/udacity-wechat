// pages/detail/detail.js

import { clean } from '../../utils/utils'
import { detailURL } from '../../utils/config'

Page({
  data: {
    news: {}
  },

  getNewsDetail(id) {
    wx.request({
      url: detailURL,
      data: { id },
      success: res => 
        this.setData({
          news: clean(res.data.result)
        }),
      fail: console.log,
    })
  },

  onLoad(options) {
    this.getNewsDetail(options.id)
  },

  toList() {
    wx.navigateBack()
  },
})