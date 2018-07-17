import { pages } from '../../../config'
import _ from '../../../utils/util'

const app = getApp()
const recorderManager = wx.getRecorderManager()
const audioContext = wx.createInnerAudioContext()


// pages/review/add/add.js
const page = Page({
  data: {
    canPreview: false,
    isAudio: null,
    isPlaying: false,
    isRecording: false,
    audio: '',
    duration: 0,
    movie: null,
    text: '',
    userInfo: null,
  },

  onLoad(options) {
    const { isAudio, movie } = options
    this.setData({
      isAudio: isAudio === '1',
      movie: JSON.parse(movie)
    })

    app.checkSession(this.initObejct())
    this.setRecorderHandlers()
  },

  onTapLogin() {
    app.login(this.initObejct())
  },

  initObejct() {
    return {
      success: userInfo =>
        this.setData({ userInfo }),
      fail: () => this.setData({
        userInfo: 'unloggedin'
      })
    }
  },

  onTapPreview() {
    if (this.data.canPreview) {
      wx.navigateTo({
        url: pages.pReview
        + '?movie=' + JSON.stringify(this.data.movie)
        + '&text=' + this.data.text
        + '&audio=' + _.escape(this.data.audio)
        + '&duration=' + this.data.duration
      })
    }
  },

  onTapPlay() {
    const { isPlaying } = this.data

    if (isPlaying) audioContext.stop()
    else audioContext.play()

    this.setData({
      isPlaying: !isPlaying
    })
  },

  onTapClear() {
    this.setData({
      audio: '',
      duration: 0,
      canPreview: false,
    })
  },

  onTapRecorder() {
    const { isRecording } = this.data

    if (isRecording) recorderManager.stop()
    else recorderManager.start({
      format: 'mp3'
    })

    this.setData({
      isRecording: !isRecording
    })
  },

  onTextChange(e) {
    this.setData({
      text: e.detail.value.trim()
    })
    this.setCanPreview()
  },

  setCanPreview() {
    this.setData({
      canPreview: 
         (this.data.text.length > 0)
      || !!this.data.audio
    })
  },

  setRecorderHandlers() {
    recorderManager.onStop(res => {
      this.setData({
        audio: res.tempFilePath,
        duration: Math.round(res.duration / 1000)
      })
      audioContext.src = res.tempFilePath
      audioContext.obeyMuteSwitch = false
      this.setCanPreview()
    })

    audioContext.onStop(() =>
      this.setData({ isPlaying: false })
    )
    audioContext.onEnded(() =>
      this.setData({ isPlaying: false })
    )
  },

})