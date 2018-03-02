// pages/remind/remind.js
//获取应用实例
const app = getApp();

Page({
  data: {
    show: {
      weather: false,
      flight: false
    },
    weather: null,
    flight: null
  },
  onLoad: function () {
    this.getWeatherAction();
  },
  getWeatherAction: function () {
    var that = this;
    app.requestAction(app.globalData.url['getWeather'], { session_id_3rd: app.globalData._session_id_3rd }, function (result) {
      if (result.error == 1) {
        console.log(result.msg);
      }
    
      that.setData({
        weather: result.weather
      });
    });
  },
  close: function (event) {
    var show = this.data.show;
    show[event.currentTarget.dataset.type] = true;
    this.setData({
      show: show
    });
  },
  refresh: function (event) {
    if (event.currentTarget.dataset.type=='weather'){
      this.getWeatherAction();
    }
  }
})