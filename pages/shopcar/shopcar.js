// pages/shopcar/shopcar.js
let { request } = require("../../utils/request")

let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
        shoparr: [],
        flag: true,
        many: 0,
        show: true,
        shoplist1: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let url = app.globalData.url
        request(url + "goods/goodsguess", {
            page: 1,
            size: 10
        }, "post").then(rout => {
            // console.log(rout.data)
            this.setData({
                shoplist1: rout.data
            })
        })
        let shoparr = wx.getStorageSync("shop") || [];
        if (shoparr.length == 0) {
            this.setData({
                show: false
            })
        } else {
            this.setData({
                show: true
            })
        }
        let nb = shoparr.every((item) => {
            return item.showall == true
        })
        this.setData({
                shoparr: shoparr,
                flag: nb
            })
            // this.sum()
    },
    chang(e) {
        console.log(e.detail.value);
        this.setData({
            region: e.detail.value
        })
    },
    showall() {
        this.setData({
            flag: !this.data.flag
        })
        let arr = this.data.shoparr;
        for (let i = 0; i < arr.length; i++) {
            arr[i].showall = this.data.flag
            for (let j = 0; j < arr[i].shoplist.length; j++) {
                arr[i].shoplist[j].isshow = this.data.flag
            }
        }
        this.setData({
            shoparr: arr
        })
        this.sum()
    }, //全选的点击按钮
    show(e) {
        let index = e.currentTarget.dataset.index;
        let arr = this.data.shoparr
        arr[index].showall = !arr[index].showall;
        for (let i = 0; i < arr[index].shoplist.length; i++) {
            arr[index].shoplist[i].isshow = arr[index].showall
        }
        console.log(arr)
        let nb = arr.every((item) => {
            return item.showall == true
        })
        this.setData({
            shoparr: arr,
            flag: nb
        })
        this.sum();

    },
    btnshow(e) { //每个商品前面的单选事件
        let index = e.currentTarget.dataset.index; //品牌里面商品的索引
        let pinpaiindex = e.currentTarget.dataset.findex; //品牌的索引
        console.log(pinpaiindex)
        let arr = this.data.shoparr; //全部商品数据
        let flag = true;
        arr[pinpaiindex].shoplist[index].isshow = !arr[pinpaiindex].shoplist[index].isshow;
        for (let i = 0; i < arr[pinpaiindex].shoplist.length; i++) {
            if (!arr[pinpaiindex].shoplist[i].isshow) {
                flag = false
            }
        }
        arr[pinpaiindex].showall = flag;
        let nb = arr.every((item) => {
            return item.showall == true
        })
        this.setData({
            shoparr: arr,
            flag: nb
        })
        this.sum()
    },
    sum() { //求合计总价的
        let arr = this.data.shoparr; //获取所有的商品
        let sum = 0;
        arr.forEach((item, index) => {
            item.shoplist.forEach(shoplist => {
                if (shoplist.isshow) {
                    sum += shoplist.shoppice * shoplist.buynum
                }
            })
        });
        this.setData({
            many: sum
        })
        wx.setStorageSync('shop', this.data.shoparr);
    },
    jia(e) { //加符号
        let index = e.currentTarget.dataset.index; //品牌里面商品的索引
        let pinpaiindex = e.currentTarget.dataset.findex; //品牌的索引
        let arr = this.data.shoparr;
        arr[pinpaiindex].shoplist[index].buynum += 1
        this.setData({
            shoparr: arr
        })
        this.sum()

    },
    jian(e) { //减符号
        let index = e.currentTarget.dataset.index; //品牌里面商品的索引
        let pinpaiindex = e.currentTarget.dataset.findex; //品牌的索引
        let arr = this.data.shoparr;
        if (arr[pinpaiindex].shoplist[index].buynum > 1) {
            arr[pinpaiindex].shoplist[index].buynum -= 1
        }
        this.setData({
            shoparr: arr
        })
        this.sum()
    },
    umber(e) { //输入
        console.log(e.detail.value)
        let index = e.currentTarget.dataset.index; //品牌里面商品的索引
        let pinpaiindex = e.currentTarget.dataset.findex; //品牌的索引
        let arr = this.data.shoparr;
        if (e.detail.value <= 0) {
            arr[pinpaiindex].shoplist[index].buynum = 1;
        } else {
            arr[pinpaiindex].shoplist[index].buynum = parseInt(e.detail.value);
        }
        this.setData({
            shoparr: arr
        })
        this.sum()
    },
    del(e) {
        let index = e.currentTarget.dataset.index; //品牌里面商品的索引
        let pinpaiindex = e.currentTarget.dataset.findex; //品牌的索引
        console.log(index)
        console.log(pinpaiindex)
        let arr = this.data.shoparr;
        let that = this;
        console.log(arr)
        wx.showModal({
            title: '提示',
            content: '亲！确定要删除该宝贝？',
            success(res) {
                if (res.confirm) {
                    arr[pinpaiindex].shoplist.splice(index, 1) //删除
                    if (arr[pinpaiindex].shoplist.length == 0) {
                        arr.splice(pinpaiindex, 1) //删除整个品牌
                    }
                    if (arr.length == 0) {
                        that.setData({
                            flag: false
                        })
                    }
                    that.setData({
                        shoparr: arr
                    })
                    if (that.data.shoparr.length == 0) {
                        that.setData({
                            show: false
                        })
                    } else {
                        that.setData({
                            show: true
                        })
                    }
                    that.sum() //重新计算总钱数

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.sum()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let shoparr = wx.getStorageSync("shop") || [];
        if (shoparr.length == 0) {
            this.setData({
                show: false
            })
        } else {
            this.setData({
                show: true
            })
        }
        let nb = shoparr.every((item) => {
            return item.showall == true
        })
        this.setData({
            shoparr: shoparr,
            flag: nb
        })
        this.sum()
    },
    goindex() {
        wx.switchTab({
            url: "/pages/index/index"
        })
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