//app.js
const util = require('utils/util.js');

App({
  globalData: {
    _session_id:'',
    _session_id_3rd:'',
    url:{
      login:'https://7e.7-event.cn/d/ci/7e/ApiWeChat/loginAction/6',
      verifyInviteCode:'https://7e.7-event.cn/d/ci/7e/ApiWeChat/verifyInviteCodeAction/6'
    },
    step:-1
  },
  onLaunch: function () {
    var that = this;

    /*// 显示加载状态
    wx.showLoading({title: '加载中',mask: true});

    // 登陆
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.requestAction(that.globalData.url['login'], { code: res.code }, function (result) {
          wx.hideLoading();
          if (result.error == 1) {
            that.showMsgAction(result.msg);
          } else {
            that.globalData._session_id = result.session_id;
            that.globalData._session_id_3rd = result.session_id_3rd;

            that.globalData.step = result.step;
            if (that.globalData.step == -1) {
              wx.redirectTo({ url: '/pages/login/login' });
            } else if (that.globalData.step == 0) {
              wx.redirectTo({ url: '/pages/tip/tip' });
            } else {
              wx.switchTab({ url: '/pages/remind/remind' });
            }
          }
        });
      }
    });*/
  },
  requestAction: function (url, data, callback) {
    var header = { 'content-type': 'application/x-www-form-urlencoded' };
    if (this.globalData._session_id != '') {
      header['Cookie'] = 'ci_session=' + this.globalData._session_id;
    }

    wx.request({
      url: url,
      data: data,
      header: header,
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        typeof callback === 'function' && callback(res.data);
      },
      fail: function (e) {
        console.log(e.errMsg)
      }
    });
  },
  showMsgAction: function (msg, callback) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        typeof callback === 'function' && callback(res);
      }
    });
  }
});