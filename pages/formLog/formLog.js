const DB = wx.cloud.database().collection("dayLog");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:
      "cloud://gongshijie-2d87t.676f-gongshijie-2d87t-1301785064/test.jpg",
    loading: false,
    submit: true,
    itemKey:"",
  },

  tapLog: function () {
    this.hello = "hello";
    console.log("点击事件捕获" + this.hello);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log("获取的ItemKey",e);
    this.setData({
      itemKey:e.itemKey
    })
  },

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
    this.setData({
      submit: false,
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
    this.setData({
      country: 0,
      date: "2020-03-31",
      time: "09:00",
    }),
      wx.showToast({
        title: "已重置",
      });
  },

  upload() {
    let that = this;
    console.log("点击了上传按钮");
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        that.uploadImage(res.tempFilePaths[0]);
      },
    });
  },

  uploadImage(tempFilePath) {
    let that = this;
    var _openID;
    wx.getStorage({
      key: 'openID',
      success: (res) => {
        _openID:res.data

      }
    });
      console.log("获取本地openid",_openID);
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ".png",
      filePath: tempFilePath,
      success: (res) => {
        console.log("上传成功", res);
        //update数据库值
        DB.where({
          _openid:_openID,
          itemKey:this.data.itemKey
        }).update({
          data:{
            content:{
              userFlag:true,
              userPhoto:res.fileID
            }
          }
        });
        that.setData({
          imageUrl: res.fileID,
        });
      },
    });
  },
});
