//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var areaData = require('../../utils/area.js'); //引入自己定义区域数据
Page({
  /**
     * 页面的初始数据
     */
  data: {
    content: [],
    px: ['最新发布', '推荐排序', '租金由低到高', '租金由高到低', '面积由小到大', '面积由大到小'], //排序列表内容
    qyopen: false, //点击地铁区域筛选滑动弹窗显示效果，默认不显示
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    nzopen: false, //价格筛选弹窗
    pxopen: false, //排序筛选弹窗
    nzshow: true,
    pxshow: true,
    isfull: false,
    cityleft: areaData.getCity(), //获取地铁区域的下拉框筛选项内容
    citycenter: {}, //选择地铁区域左边筛选框后的显示的中间内容部分
    cityright: {}, //选择地铁区域的中间内容部分后显示的右边内容
    select1: '地铁', //地铁区域选中后的第二个子菜单，默认显示地铁下的子菜单
    select2: '', //地铁区域选择部分的中间
    select3: '', //地铁区域选择部分的右边
    shownavindex: '',
    // 价格筛选框设置
    price:['不限','0-700元','700-900','900-1100','1100-1500','1500以上'],
    //leftMin: 0,
    //leftMax: 10000, //左边滑块最大值
   // rightMin: 0, //右边滑块的最小值
   // rightMax: 10000, //右边滑块最大值
   // leftValue: 1000, //左边滑块默认值
   // rightValue: 6000, //右边滑块默认值
   // leftPer: '50', //左边滑块可滑动长度：百分比
   // rightPer: '50', //右边滑块可滑动长度

    pxIndex: 0, //排序内容下拉框，默认第一个
    priceIndex:0,
  },
  // 地铁区域列表下拉框是否隐藏
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },

  // 地铁区域第一栏选择内容
  selectleft: function (e) {
    console.log('用户选中左边菜单栏的索引值是：' + e.target.dataset.city);
    this.setData({
      cityright: {},
      citycenter: this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  // 地铁区域中间栏选择的内容
  selectcenter: function (e) {
    this.setData({
      cityright: this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  // 地铁区域左边栏选择的内容
  selectright: function (e) {
    console.log('选中地铁线下的地铁站' + e.currentTarget.dataset.city);
    this.setData({
      select3: e.currentTarget.dataset.city
    });
  },

  // 地铁区域选择筛选项后，点击提交
  submitFilter: function () {
    console.log('选择的一级选项是：' + this.data.select1);
    console.log('选择的二级选项是：' + this.data.select2);
    console.log('选择的三级选项是：' + this.data.select3);
    // 隐藏地铁区域下拉框
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: false,
      isfull: false,
      shownavindex: 0
    })
  },

  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: false,
        shownavindex: 0,
      }) 
      
    }
     else {
      this.setData({
        content: this.data.px,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target);
  },
  // 排序内容下拉框筛选
  selectPX: function (e) {
    console.log('排序内容下拉框筛选的内容是' + e.currentTarget.dataset.index);
    this.setData({
      pxIndex: e.currentTarget.dataset.index,
      nzopen: false,
      pxopen: false,
      qyopen: false,
      nzshow: true,
      pxshow: false,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    });
    console.log('当前' + this.data.pxIndex);
  },
  selectprice:function(e)
  {
    console.log('排序内容下拉框筛选的内容是' + e.currentTarget.dataset.index);
    this.setData({
      priceIndex: e.currentTarget.dataset.index,
      nzopen: false,
      pxopen: false,
      qyopen: false,
      nzshow: false,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    });
    console.log('当前' + this.data.pxIndex);
  },
  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
    })
  },
  // 价格下拉框是否隐藏
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  // 价格筛选框重置内容
  PriceEmpty: function () {
    this.setData({
      leftValue: 1000, //左边滑块默认值
      rightValue: 6000, //右边滑块默认值
    })
  },
  // 价格筛选框提交内容
  submitPrice: function () {
    // 隐藏价格下拉框选项
    this.setData({
      nzopen: false,
      pxopen: false,
      qyopen: false,
      nzshow: false,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    })
  },
  // 左边滑块滑动的值
  leftSchange: function (e) {
    console.log('左边改变的值为：' + e.detail.value);
    let currentValue = parseInt(e.detail.value);
    let currentPer = parseInt(currentValue)
    var that = this;
    that.setData({
      leftValue: e.detail.value //设置左边当前值
    })
  },
  //事件处理函数
 /* bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  getFocusImgs:function()
  {
    util.request(api.IndexUrl).then(function (res){


    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
