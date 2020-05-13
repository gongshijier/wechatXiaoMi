const DB = wx.cloud.database().collection("logItem");
const DB_DayLog = wx.cloud.database().collection("dayLog");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    submit: true,
  },

  tapLog: function () {
    this.hello = "hello";
    console.log("点击事件捕获" + this.hello);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(() => {
      this.setData({
        loading: true,
      });
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  countryChange: function (e) {
    this.setData({
      country: e.detail.value,
    });
  },

  dateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },

  timeChange: function (e) {
    this.setData({
      time: e.detail.value,
    });
  },
  submitForm: function (e) {
    console.log(e);
    DB.add({
      data: {
        itemKey: e.detail.value.logItemKey,
        itemName: e.detail.value.logItemName,
        userName: e.detail.value.myName,
      },
    }),
    
      DB_DayLog.add({
        data: {
          content: {
            userFlag: false,
            userName: e.detail.value.myName,
            userPhoto: "",
          },
          itemKey: e.detail.value.logItemKey,
          itemName: e.detail.value.logItemName,
        },
        success:(res) => {
          console.log("插入的数据：", res._id);
          DB_DayLog.where({
            _id: res._id,
          }).get({
            success: (res) => {
              console.log("数据库查询数据", res.data);
              wx.setStorage({
                key:"openID",
                data:res.data[0]._openid
              })
            },
          });
        },
      }),
      
      setTimeout(() => {
        this.setData({
          submit: true,
        });
        wx.showToast({
          title: "已提交",
        });
      }, 800);
  },
  resetForm: function (e) {
    this.setData({}),
      wx.showToast({
        title: "已重置",
      });
  },
});
