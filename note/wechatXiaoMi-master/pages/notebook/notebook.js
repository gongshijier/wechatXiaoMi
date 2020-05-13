// miniprogram/pages/notebook/notebook.js
const db = wx.cloud.database();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notebookArray:[],
    modalHidden: true,
    _id: '',
    name: '',
    time: ''
  },

  notebookModify: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log("bookid:",id);
    wx.navigateTo({
      url: '../note/note?bookid='+id
    })
  },

  notebookAdd: function() {
    this.setData({
      modalHidden: false
    })
  },

  modalInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  modalConfirm: function() {
    var page = this;
    db.collection('notebooks').add({
      data: {
        time: util.formatTime(new Date()),
        name: page.data.name
      }
    })
    this.setData({
      modalHidden: true
    })
    this.onShow();
  },

  modalCancel: function() {
    this.setData({
      modalHidden: true
    })  
    this.onShow();
    },

  notebookDelete: function (e) {
    var id = e.currentTarget.dataset.id;
    var page = this;
    wx.showModal({
      title: '',
      content: '确认删除吗？',
      confirmColor: "#000000",
      cancelColor: "#999999",
      success: function (res) {
        if (res.confirm) {
          db.collection('notebooks').doc(id).remove();
          page.onShow();
        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var page = this;
    db.collection('notebooks').where({

    }).get({
      success: function (res) {
        console.log(res.data)
        page.setData({
          notebookArray: res.data
        })
      }
    })    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})