//app.js
const util = require('utils/util.js');

App({
  globalData: {
    _session_id:'',
    _session_id_3rd:'',
    userInfo:null
  },
  onLaunch: function () {
    var that = this;

    // 显示加载状态
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    // 检测当前用户登录态是否有效
    wx.checkSession({
      success: function () { //session未过期，并且在本生命周期一直有效
        var oldTime = wx.getStorageSync("3rd_session_time");
        if (oldTime == '' || util.getNowTimestamp() - oldTime >= 7000) { //如果本地缓存无3rd_session_time或者3rd_session_time超过2小时，则重新登录
          that.loginAction();
        } else {
          that._session_id = wx.getStorageSync("session_id");
          that._session_id_3rd = wx.getStorageSync("3rd_session");
          wx.hideLoading();
          wx.redirectTo({ url: '/pages/login/login' });
        }
      },
      fail: function () { //登录态过期则重新登录
        that.loginAction();
      }
    });

    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.getUserInfoAction();
            },
            fail() {
              that.showMsgAction('必须允许此授权方能继续，请点击确定允许', function (res) {
                if (res.confirm) {
                  wx.openSetting();
                }
              });
            }
          })
        } else { //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getUserInfoAction();
        }
      }
    });
  },
  requestAction: function (url, data, callback) {
    var header = { 'content-type': 'application/x-www-form-urlencoded' };
    if (this._session_id != '') {
      header['Cookie'] = 'ci_session='+this._session_id;
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
  },
  loginAction: function () {
    var that = this;
    wx.clearStorageSync();
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.requestAction('https://7e.7-event.cn/d/ci/7e/ApiWeChat/loginAction/6', { code: res.code }, function (result) {
          wx.hideLoading();
          if (result.error == 1) {
            that.showMsgAction(result.msg);
          } else {
            that._session_id = result.session_id;
            that._session_id_3rd = result.session_id_3rd;
            wx.setStorageSync('session_id', result.session_id);
            wx.setStorageSync('3rd_session', result.session_id_3rd);
            wx.setStorageSync('3rd_session_time', util.getNowTimestamp());
            wx.redirectTo({ url: '/pages/login/login' });
          }
        });
      }
    });
  },
  getUserInfoAction: function () {
    var that = this;
    wx.getUserInfo({
      success: res => {
        that.userInfo = res.userInfo;
        // 将 res 相关内容发送给后台处理后并获取openid等敏感信息
        that.requestAction('https://7e.7-event.cn/d/ci/7e/ApiWeChat/decryptDataAction/6', { 'session_id_3rd': that._session_id_3rd, rawData: res.rawData, signature: res.signature, iv: res.iv, encryptedData: res.encryptedData }, function (result) {
          console.log(result);
        });
      }
    });
  }
});