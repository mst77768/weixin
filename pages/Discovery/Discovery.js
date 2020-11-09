// pages/Discovery/Discovery.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slecet: ["马帅涛", "西瓜", "柠檬", "苹果", "葡萄", "西红柿"],
        index: 0,
        region: ['广东省', '广州市', '海珠区'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    selchang(e) {
        this.setData({
            index: e.detail.value
        })
        console.log(e.detail.value);
    },
    chang(e) {
        console.log(e.detail.value);
        this.setData({
            region: e.detail.value
        })
    },
    onLoad: function(options) {

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