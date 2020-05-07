// miniprogram/pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookIndex: 0,
    bookArray: ["笔记a", "笔记b"],
    noteIndex: 0,
    noteArray: [],

  },

  noteModify: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../writeNote/writeNote?id='+id,
    })
  },

  noteDelete: function() {
    var notes = wx.getStorageSync('notes') || [];
    notes.shift();
    wx.setStorageSync('notes', notes);
    this.onShow();
  },

  notebookChange: function(e) {
    this.setData({
      bookIndex: e.detail.value
    })
  },

  tapAddNote: function() {
    wx.navigateTo({
      url: '../writeNote/writeNote',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var notes = wx.getStorageSync('notes') || [];
    if(notes.length) {
      notes.forEach((item, i) => {
        var t = new Date(Number(item.time));
        item.time=t;
      })
    }
    this.setData({
      noteArray: notes
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})