// pages/My/My.js
let { request } = require("../../utils/request")
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let Systeminfo = wx.getSystemInfoSync(); //获取实例化对象
        Systeminfo.windowWidth;
        this.setData({
                width: Systeminfo.screenWidth, //把屏幕的宽度给修改了
            })
            // console.log(app.globalData.url)
        let url = app.globalData.url
        request(url + "catalog/list").then(roust => {
            console.log(roust.data)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})