var wxCharts = require("../../utils/wxcharts.js");
var app = getApp();
var pieChart = null;
const DB = wx.cloud.database().collection("dayLog");
Page({
  data: {
    imageUrl:
      "cloud://gongshijie-2d87t.676f-gongshijie-2d87t-1301785064/test.jpg",
    cloudFlag: true,
    photoFlag: true,
    undoLogName: [],
    allUserList: [],
    doneList: [],
    allUser: 0,
    allUndoLog: 0,
    mitemKey:"",
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onShow: function () {
    DB.where({
      itemKey: this.data.mitemKey,
    }).get({
      success: (res) => {
        var countallUndo = 0;
        this.data.undoLogName=[];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].content.userFlag === false) {
            countallUndo++;
            this.data.undoLogName = this.data.undoLogName.concat(
              res.data[i].content.userName
            );
          }
        }
        console.log("未打卡的人名称：", this.data.undoLogName);
        this.setData({
          allUserList: res.data,
          allUser: res.data.length,
          undoLogName: this.data.undoLogName,
          allUndoLog: countallUndo,
        });
        var series = [
          {
            name: "已打卡",
            data: this.data.allUser - this.data.allUndoLog,
          },
          {
            name: "未打卡",
            data: this.data.allUndoLog,
          },
        ];
        pieChart.updateData({
          series: series,
        });
      },
    });
  },
  onLoad: function (e) {
    //画饼
    var windowWidth = 220;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error("getSystemInfoSync failed!");
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: "pieCanvas",
      type: "pie",
      series: [
        {
          name: "已打卡",
          data: 0,
        },
        {
          name: "未打卡",
          data: 0,
        },
      ],
      width: windowWidth,
      height: 220,
      dataLabel: true,
    });

    //获取到对应打卡项目 Key
    var itemKey = e.itemKey;
    this.setData({mitemKey:e.itemKey});
    
  },
  showDone() {
    console.log("所有参与者信息：", this.data.allUserList);
    //提取所有已经打卡的信息
    this.data.doneList=[];
    for (var i = 0; i < this.data.allUserList.length; i++) {
      if (this.data.allUserList[i].content.userFlag === true) {
        this.data.doneList = this.data.doneList.concat(
          this.data.allUserList[i].content
        );
      }
    }
    console.log("已打卡的人：", this.data.doneList);
    this.setData({
      doneList: this.data.doneList,
    });
    var photoFlag = this.data.photoFlag;
    photoFlag = !photoFlag;
    this.setData({
      photoFlag: photoFlag,
    });
  },

  showUndo() {
    var cloudFlag = this.data.cloudFlag;
    cloudFlag = !cloudFlag;
    this.setData({
      cloudFlag: cloudFlag,
    });
  },
  navigeteToFormLog(){
    console.log("传递的参数：", this.data.mitemKey);
    var passdata = this.data.mitemKey;
    
    wx.navigateTo({
      url: '/pages/formLog/formLog?itemKey=' + passdata
    })
  },

});
