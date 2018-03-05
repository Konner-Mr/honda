// pages/login/login.js
//获取应用实例
const app = getApp();

Page({
  data: {
    formFields: null,
    formAnswer: null
  },
  onLoad: function () {
    this.setData({
      formFields: app.globalData.formFields,
      formAnswer: app.globalData.formAnswer
    });
  },
  loginSubmit:function(e){
    var regIDNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var formData = e.detail.value;
    for (var i in formData) {
      if (formData[i] === '') {
        app.showMsgAction('请输入' + this.data.formFields[i]);
        return false;
      } else if (formData[i] == 0) {
        app.showMsgAction('请选择' + this.data.formFields[i]);
        return false;
      } else if (i == 'id_number' && regIDNumber.test(formData[i]) === false) {
        app.showMsgAction(this.data.formFields[i] + '格式错误');
        return false;
      }
    }

    formData.session_id_3rd = app.globalData._session_id_3rd;
    app.requestAction(app.globalData.url['verify'], formData, function (result) {
      if (result.error == 1) {
        app.showMsgAction(result.msg);
      } else {
        app.globalData.step = result.step;
        app.globalData.formData = result.formData;
        if (app.globalData.step == 0) {
          wx.switchTab({ url: '/pages/mine/mine' });
        } else {
          wx.switchTab({ url: '/pages/remind/remind' });
        }
      }
    });
  }
})