var qcloud = require('../vendor/wafer2-client-sdk/index')
import { service } from '../config'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showError = url => {
  wx.hideNavigationBarLoading()
  wx.hideLoading()
  wx.showToast({
    title: url+'数据加载错误',
    icon: 'none'
  })
}

const isEmpty = x => 
  Object.keys(x).length === 0

const escape = x =>
  x.replace('=', '≠')

const unescape = x =>
  x.replace('≠', '=')

const API = ({
  url, data,
  success, fail, callback,
  method, login,
  canBeEmpty
}) => {

  wx.showLoading()
  qcloud.request({
    url,
    data,
    method,
    login,
    success: result => {
      wx.hideLoading()
      const { code, data } = result.data

      if (!code && (canBeEmpty || !isEmpty(data))) {
        success && success(data)
        callback && callback()
      }
      else showError(url)
    },
    fail: () => {
      wx.hideLoading()
      fail && fail()    
      if (!canBeEmpty) showError(url)
      callback && callback()  
    }
  })
}

export default {
  formatTime, formatNumber,
  showError, isEmpty,
  escape, unescape,
  API
}