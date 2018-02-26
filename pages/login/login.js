// pages/login/login.js
//获取应用实例
const app = getApp();

Page({
  loginSubmit:function(e){
    var inviteCode = e.detail.value.inviteCode;
    if (inviteCode == '') {
      app.showMsgAction('请输入邀请码')
    }
  }
})