//index.js
//获取应用实例
// import goog from 'google-protobuf';
var protoFactory = require('../../proto/test').jspb.test.Simple1;
console.log(protoFactory)
debugger
const app = getApp()

var ws;
var a = 0;
var _self= this;
Page({
  data: {
    motto: 'Hello 2 World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   this.initWs();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  initWs() {
    ws = wx.connectSocket({
      url: 'ws://127.0.0.1:8095/webSocket',
      header: {
        'test': 'aaa'
      }
    });

    ws.onOpen(function () {
      console.log("连接已打开");

    });
    ws.onMessage(function (response) {
      let uint8Array = new Uint8Array(response.data);
      let instance2 = protoFactory.decode(uint8Array);
      console.log(instance2);
      console.log("收到服务器消息" + JSON.stringify(response) + "   " + response);
    });
    ws.onClose(function (data) {
      console.log("端口关闭" + JSON.stringify(data));
    });
    ws.onError(function (data) {
      console.log("错误！" + JSON.stringify(data));
    });
  },
  getUserInfo: function (e) {
    var _self = this;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  testProtoBuf: function (e) {
    console.log(protoFactory);
    var $int = 9999999;
    var step = 10;
    var Long = require("long");
    var base64 = require("@protobufjs/base64");
    var longVal = new Long(0x7FFFFFFF, 0x7FFFFFFF);
    console.log(longVal.toString());
      let instance = protoFactory.create();
      let buffer = protoFactory.encode(instance).finish();
    console.log(instance);
    if (ws && ws.readyState === 1) {
      // ws.send({ data: '数据为' + buffer });
      ws.send({data:buffer.buffer.slice()});
      // ws.send({data:1});
    } else {
      _self.initWs();
      console.log(ws);
    }
  }

})
