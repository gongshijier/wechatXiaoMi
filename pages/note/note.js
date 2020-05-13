// miniprogram/pages/note/note.js
<<<<<<< HEAD
=======
const db = wx.cloud.database();
>>>>>>> devNoteZHB
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    bookIndex: 0,
    bookArray: ["笔记一", "笔记二"],
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

=======
    bookId:'a',
    bookName: '',
    noteArray: [],
  },

  noteAdd: function() {
    wx.navigateTo({
      url: '../writeNote/writeNote?bookid=' + this.data.bookId,
    })  },

  noteModify: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../writeNote/writeNote?noteid='+id+'&bookid='+this.data.bookId,
    })
  },

  noteDelete: function(e) {
    var id = e.currentTarget.dataset.id;
    var page = this;
    wx.showModal({
      title: '',
      content: '确认删除吗？',
      confirmColor: "#000000", 
      cancelColor: "#999999",
      success: function(res) {
        if(res.confirm) {
          db.collection('notes').doc(id).remove();
          page.onShow();
        }
      }
    }); 
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var bookid = e.bookid;
    var page = this;
    this.setData({
      bookId: bookid
    })
    db.collection('notebooks').doc(bookid).get({
      success: function (res) {
        console.log("onLoad get:", res.data);
        page.setData({
          bookName: res.data.name
        })
      }
    })
    console.log("page data:",this.data);
    
>>>>>>> devNoteZHB
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
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
=======
  onShow: function (e) {
    var page = this;
    db.collection('notes').where({
      bookid: page.data.bookId
    }).get({
      success: function(res) {
        console.log(res.data)
        page.setData({
          noteArray: res.data
        })
      }
    })    
>>>>>>> devNoteZHB
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