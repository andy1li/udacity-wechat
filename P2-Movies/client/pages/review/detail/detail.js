import { pages, service } from '../../../config'
import _ from '../../../utils/util'

const app = getApp()
const audioContext = wx.createInnerAudioContext()

// pages/review/detail/detail.js
Page({
  data: {
    userInfo: null,
    myReviews: [],
    favReviews: [],
    isFavReview: false,
    isMyReview: false,
    myReviewId: -1,
    isPlaying: false,
    reviewId: -1,
    movieId: -1,
    movieImage: '',
    movieTitle: '',
    userId: '',
    userName: '',
    userAvatar: '',
    isAudio: null,
    text: '',
    audio: '',
    duration: -1,
  },

  onLoad(options) {
    this.getReviewDetail(options.id)
    app.checkSession(this.initObejct())
    this.setAudioHandlers()
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

  getReviewDetail(id) {
    _.API({
      url: service.review + id,
      success: this.setReview,
    })
  },

  getReviews() {
    app.getMyReviews({
      success: myReviews => {
        this.setData({ myReviews })
        this.setMyReview( myReviews )
      }
    })
    app.getFavReviews({
      success: favReviews => {
        this.setData({ favReviews })
        this.setFavReview( favReviews )
      }
    })
  },

  onTapLogin() {
    app.login(this.initObejct())
  },

  onTapPlay() {
    const { isPlaying } = this.data

    if (isPlaying) audioContext.stop()
    else audioContext.play()

    this.setData({ isPlaying: !isPlaying })
  },

  onTapFavorite() {
    app.toggleFavReview({
      data: {
        id: this.data.reviewId
      },
      success: ({ result }) => {
        if (result=='added') this.setData({
          isFavReview: true
        })
        else if (result=='deleted') this.setData({
          isFavReview: false
        })
      }
    })
  },

  onTapRightBtn() {
    const { 
      isMyReview, 
      myReviewId, 
      movieId,
      movieImage,
      movieTitle,
    } = this.data

    if (isMyReview) {
      wx.showToast({
        title: '当前影评已是我的影评',
        icon: 'none'
      })
    } else if (myReviewId) {
      wx.navigateTo({
        url: pages.reviewDetail + '?id=' + myReviewId
      })
    } else {
      app.toAddReview({
        movie: {
          id: movieId,
          image: movieImage,
          title: movieTitle,
        }
      })
    }
  },

  setAudioHandlers() {
    audioContext.obeyMuteSwitch = false
    audioContext.onStop(() =>
      this.setData({ isPlaying: false })
    )
      audioContext.onEnded(() =>
      this.setData({ isPlaying: false })
    )
  },

  setReview(data) {
    this.setData({
      reviewId: +data.id,
      movieId: +data.movie_id,
      movieImage: data.movie_image,
      movieTitle: data.movie_title,
      userId: data.user_id,
      userName: data.user_name,
      userAvatar: data.user_avatar,
      isAudio: !!data.is_audio.data[0],
      text: data.text,
      audio: data.audio,
      duration: data.duration,
    })
    audioContext.src = data.audio
  },

  setFavReview(favReviews) {
    this.setData({
      isFavReview: favReviews
        .some(r => r.id == this.data.reviewId)
    })
  },

  setMyReview(myReviews) {
    let myReviewId = 0
    let isMyReview = false

    for (let r of myReviews) {
      if (r.movie_id === this.data.movieId)
        myReviewId = r.id
      if (r.id === this.data.reviewId)
        isMyReview = true
    }    

    this.setData({
      myReviewId,
      isMyReview
    })
    console.log(this.data)
  },
})