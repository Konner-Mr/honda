// pages/mine/mine.js
Page({
  data: {
    index: 0,
    positionList: ['请选择', '程序员', '运营专员', '项目经理']
  },
  positionChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
  }
})