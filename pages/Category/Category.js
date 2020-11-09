// pages/Category/Category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        imgsrc: "https://x.dscmall.cn/storage/data/touch_catads/15630384831872.jpg",
        shoplist: [],
        flag: 0
    },
    getlist(id) {
        let that = this;
        let str = `https://x.dscmall.cn/api/catalog/list/${id}`;
        wx.request({
            url: str,
            success: (result) => {
                that.setData({
                    shoplist: result.data.data
                })
                wx.hideLoading();
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        wx.showLoading({
            title: '数据拼命加载中...',
        })
        wx.request({
            url: 'https://x.dscmall.cn/api/catalog/list',
            method: 'GET',
            success: (result) => {
                that.setData({
                    list: result.data.data
                })
                console.log(result.data.data)
            },
            fail: () => {},
            complete: () => {}
        });
        wx.request({
            url: `https://x.dscmall.cn/api/catalog/list/858`,
            success: (result) => {
                that.setData({
                    shoplist: result.data.data
                })
                wx.hideLoading();
            }
        })
    },
    fn(data) { //监听孩子组件发来的数据
        console.log(data.detail);
        wx.showLoading({
            title: '数据拼命加载中...',
        })
        this.setData({
            imgsrc: data.detail.img
        });
        this.getlist(data.detail.curr);
    },
    rfn(data) {
        if (data.detail == 1) {
            this.setData({
                flag: 1
            })
        } else if (data.detail == 2) {
            this.setData({
                flag: 2
            })
        }
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