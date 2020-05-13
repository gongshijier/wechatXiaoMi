// miniprogram/pages/writeNote/writeNote.js
var util = require('../../utils/util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    _id:'',
    time:'',
    bookid:'',
    content: ''
  },

  sure() {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    })
    console.log('_id:',this.data._id);
    var page = this;
   wx.showToast({
     title: '保存成功！',
     icon: "success",
     success: function() { 
       if (page.data.flag) {
         db.collection('notes').doc(page.data._id).set({
           data: {
             time: page.data.time,
             bookid:page.data.bookid,
             content: page.data.content
           }
         });
       }
       else {
         db.collection('notes').add({
           data: {
             time: page.data.time,
             bookid: page.data.bookid,
             content: page.data.content
           }
         })
       }
     },
     complete: function() {
      
     }
   })
   setTimeout(function() {
     wx.navigateBack({
       delta: 1
     });
   }, 1000),
   
    console.log(this.data.content); 
  },

  change(e) {
    var val = e.detail.value;
    this.setData({
      content: val
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var _id = e.noteid;
    var bookid = e.bookid;
    console.log("writenote data:",this.data);
    var page = this;
    if(_id) {
      this.data.flag = true;
      db.collection('notes').doc(_id).get({
        success: function(res) {
          page.setData({
            _id: res.data._id,
            bookid: res.data.bookid,
            content: res.data.content
          })   
          console.log(res.data)
        }
      })   
     
    }
    else {
      this.setData({
        bookid: bookid
      })
      this.data.flag = false;
    }
    console.log(this.data.value);
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