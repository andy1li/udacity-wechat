const app = getApp()

// pages/user/user.js
Page({
  data: {
    userInfo: null,
    myReviews: [],
    favReviews: [],
    pickerRange: ['收藏影评', '我的影评'],
    pickerIndex: 0
  },

  onLoad(options) {
    app.checkSession(this.initObejct())
  },

  onShow() {
    this.getReviews()
  },

  initObejct() {
    return {
      success: userInfo => {
        this.setData({ userInfo })
        this.getReviews()
      },
      fail: () => this.setData({
        userInfo: 'unloggedin'
      })
    }
  },

  getReviews() {
    app.getMyReviews({
      success: myReviews => {
        this.setData({
          myReviews: myReviews.map(
            r => ({
              ...r,
              text: r.text.length > 15
                ? r.text.slice(0, 12) + '...'
                : r.text
            })
          )
        })
      }
    })
    app.getFavReviews({
      success: favReviews => {
        this.setData({ favReviews: favReviews.map(
            r => ({
              ...r,
              text: r.text.length > 15
                ? r.text.slice(0, 12) + '...'
                : r.text
            })
          )
        })
      }
    })
  },

  bindPickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
  },

  onTapLogin() {
    app.login(this.initObejct())
  },

})