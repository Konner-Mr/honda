// pages/mine/mine.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    formData: null,
    formFields: null,
    formAnswer: null,
    barcodeUrl:'https://7e.7-event.cn/d/s/t/'
  },
  onLoad:function(){
    this.setData({
      formData:app.globalData.formData,
      formFields: app.globalData.formFields,
      formAnswer: app.globalData.formAnswer
    });
  },
  pickerChange:function(e){
    var formData = this.data.formData;
    formData[e.currentTarget.id] = e.detail.value;
    this.setData({
      formData: formData
    })
  },
  regSubmit: function (e){
    var that = this;
    var regMobile = /^1(3[0-9]|4[57]|5[0-35-9]|6[6]|7[0135678]|8[0-9]|19[89])[0-9]{8}$/;
    var formData = e.detail.value;
    for (var i in formData) {
      if (util.inArray(i, app.globalData.formMustFillIn) && formData[i] === '') {
        app.showMsgAction('请输入' + this.data.formFields[i]);
        return false;
      } else if (util.inArray(i, app.globalData.formMustFillIn) && formData[i] === 0) {
        app.showMsgAction('请选择' + this.data.formFields[i]);
        return false;
      } else if (i == 'mobile' && regMobile.test(formData[i]) === false) {
        app.showMsgAction(this.data.formFields[i] + '格式错误');
        return false;
      }
    }

    formData.session_id_3rd = app.globalData._session_id_3rd;
    app.requestAction(app.globalData.url['reg'], formData, function (result) {
      if (result.error == 1) {
        app.showMsgAction(result.msg);
      } else {
        app.globalData.step = result.step;
        app.globalData.formData = that.data.formData;
        app.showMsgAction(result.msg,function(){
          wx.switchTab({ url: '/pages/remind/remind' });
        });
      }
    });
  }
})