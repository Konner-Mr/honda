// pages/login/login.js
//获取应用实例
const app = getApp();

Page({
  loginSubmit:function(e){
    var inviteCode = e.detail.value.inviteCode;
    if (inviteCode == '') {
      app.showMsgAction('请输入邀请码')
    }else{
      app.requestAction(app.globalData.url['verifyInviteCode'], { session_id_3rd: app.globalData._session_id_3rd, inviteCode: inviteCode }, function (result) {
        if(result.error==1){
          app.showMsgAction(result.msg);
        }else{
          app.globalData.step = result.step;
          if (app.globalData.step == 0) {
            wx.redirectTo({ url: '/pages/tip/tip' });
          } else {
            wx.redirectTo({ url: '/pages/remind/remind' });
          }
        }
      });
    }
  }
})