// pages/list/list.js

import { 
  clean,
  getType 
} from '../../utils/utils'
  
import { 
  categories, 
  listURL,
  drawerOpenWidth 
} from '../../utils/config'

Page({
  data: {
    categories,
    currentCategory: categories[0].name,
    currentType: getType(categories[0].name),
    drawerWidth: "0rpx",
    jumbotron: {},
    newsList: []
  },

  getNewsList(callback = ()=>{}) {
    wx.request({
      url: listURL,
      data: {
        type: this.data.currentType
      },
      success: this.setNewsList,
      fail: console.log,
      complete: callback 
    })
  },

  onLoad() {
    this.getNewsList()
  },
  
  onPullDownRefresh() {
    this.getNewsList(wx.stopPullDownRefresh)
  },

  setCategory(e) {
    const currentCategory = e.currentTarget.id
    const currentType = getType(currentCategory)

    this.setData({ 
      currentCategory,
      currentType
    })

    this.getNewsList()
    this.toggleDrawer()
  },

  setNewsList(res) {
    const newList = res.data.result.map(clean)
    this.setData({
      jumbotron: newList[0],
      newsList: newList.slice(1)
    })
  },

  toDetail(e) {    
    const { id } = e.currentTarget 
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  toggleDrawer() {
    this.setData({
      drawerWidth: 
        this.data.drawerWidth == drawerOpenWidth
          ? "0rpx"
          : drawerOpenWidth,
    })
  },

  closeDrawer(e) {
    const { x, y } = e.detail
    if (x > 120 && x > 60) { 
      this.setData({ drawerWidth: "0rpx" })
    }
  }
})