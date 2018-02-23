//app.js
App({
  globalData: {
    step: 0,
    userInfo: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/

    // 登录
    wx.login({
      success: res => {
        console.log(res.code);
        this.requestAction('https://7e.7-event.cn/d/ci/7e/ApiWeChat/loginAction/6', { code: res.code }, function (res){
          console.log(res);
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              /*this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }*/
            }
          })
        }
      }
    })
  },
  requestAction:function(url,data,callback){
    wx.request({
      url: url,
      data: data,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        typeof callback === 'function' && callback(res.data);
      },
      fail: function (e) {
        console.log(e.errMsg)
      }
    });
  }
})