import { service } from '../../../config'
import _ from '../../../utils/util'

const audioContext = wx.createInnerAudioContext()

// pages/review/preview/preview.js
Page({
  data: {
    isAudio: null,
    isPlaying: false,
    isSubmitting: false,
    movie: null,
    audio: '',
    text: '',
  },

  onLoad(options) {
    let { movie, audio } = options
    audio = _.unescape(audio)
    this.setData({
      ...options,
      isAudio: audio.length > 0,
      movie: JSON.parse(movie),
      audio
    })

    audioContext.src = audio
    audioContext.obeyMuteSwitch = false

    audioContext.onStop(() =>
      this.setData({ isPlaying: false })
    )
    audioContext.onEnded(() =>
      this.setData({ isPlaying: false })
    )
  },

  onTapPlay() {
    const { isPlaying } = this.data

    if (isPlaying) audioContext.stop()
    else audioContext.play()

    this.setData({ isPlaying: !isPlaying })
  },

  onTapPublish() {
    const { isSubmitting, isAudio } = this. data
    if (!isSubmitting) {
      wx.showLoading({
        title: '正在发表影评'
      })
      this.setData({ isSubmitting: true })
      
      if (isAudio) this.uploadAudio(this.addReview)
      else this.addReview()
    }
  },

  uploadAudio(callback) {
    wx.uploadFile({
      url: service.uploadUrl,
      filePath: this.data.audio,
      name: 'file',
      success: res => {
        const { data } = JSON.parse(res.data)
        callback && callback(data.imgUrl)
      },
      fail: _.showError
    })
  },  

  addReview(audio = '') {
    const { 
      movie, isAudio, text, duration 
    } = this.data

    _.API({
      url: service.review,
      method: 'POST',
      data: {
        movie_id: movie.id,
        movie_image: movie.image,
        movie_title: movie.title,
        is_audio: +isAudio,
        text,
        audio,
        duration
      }, 
      login: true,
      success: () => {
        wx.showToast({ title: '发表影评成功' })
        this.setData({ isSubmitting: false })
        this.toReviewList()
      },
      fail: () => this.setData({ 
        isSubmitting: false 
      }),
      canBeEmpty: true
    })
  },

  toReviewList() {
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/review/list/list'
        + '?movie=' + JSON.stringify(this.data.movie),
      })
    }, 1000)
  },
  
})