// pages/tip/tip.js
//获取应用实例
const app = getApp();

Page({
  onLoad:function(){
    if (app.globalData.step == -1) {
      wx.redirectTo({ url: '/pages/login/login' });
    } else if(app.globalData.step != 0){
      wx.switchTab({ url: '/pages/remind/remind' });
    }
  },
  fillIn: function (event) {
    wx.switchTab({ url: '/pages/mine/mine' });
  }
})