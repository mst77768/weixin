// pages/shop/shop.js

let { request } = require("../../utils/request")
var WxParse = require('../../wxParse/wxParse.js');
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [],
        shoplist: [],
        bg: 0,
        flag: 0,
        open: false,
        animationData: "",
        shoplist1: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
            // console.log(options.goods_id)
        let url = app.globalData.url
        request(url + "goods/show", {
            goods_id: options.goods_id
        }, "post").then(rout => {
            // console.log(rout.data)
            that.setData({
                imgs: rout.data.gallery_list,
                shoplist: rout.data
            })
            WxParse.wxParse('article', 'html', rout.data.goods_desc, that, 5);

            // gallery_list
        })
        request(url + "goods/goodsguess", {
            page: 1,
            size: 10
        }, "post").then(rout => {
            // console.log(rout.data)
            this.setData({
                shoplist1: rout.data
            })
        })

        for (let i = 0; i < 3; i++) {
            var query = wx.createSelectorQuery()
            query.select('#ppt' + i).boundingClientRect((res) => {
                    console.log(res)
                }).exec()
                // query.selectViewport().scrollOffset()
                // query.exec(function(res) {
                //     console.log(res[0]) // #the-id节点的上边界坐标
                // })
        }

    },
    tab(e) {

        this.setData({
            flag: e.currentTarget.dataset.t
        })
    },
    fn(e) {
        console.log(e.detail);
        // this.setData({
        //     open: e.detail
        // })
        let animation = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease-in'
        })
        animation.translateY(-225).step();
        this.setData({
            open: e.detail,
            animationData: animation.export()
        })
    },
    close() {
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'linear'
        })
        animation.translateY(0).step();
        this.setData({
            animationData: animation.export(),
            open: false
        })
    },
    gocar() { //添加购物车
        this.addobj()
            // console.log(this.data.shoplist)
            // let shoparrb = wx.getStorageSync("shop") || [];
            // console.log(shoparrb)

    },
    becar() {
        wx.switchTab({
            url: '/pages/shopcar/shopcar'
        })
    },
    addobj() {
        wx.showToast({
            title: '加入成功！',
            icon: 'success',
            duration: 1000
        })
        let arr = this.data.shoplist;
        let shopname = arr.goods_name; //商品名称
        let shoppice = arr.shop_price; //商品价格
        let id = arr.goods_id; //商品id
        let buynum = 1; //商品数量
        let pinpaiid = arr.basic_info.id //品牌id
        let pinpainame = arr.basic_info.shop_name //品牌名字
        let shopimg = arr.goods_img //商品图片
        let shoparr = wx.getStorageSync("shop") || [];

        console.log(shoparr == true)
        let chobj = {
            id: id,
            buynum: buynum,
            shopname: shopname,
            shoppice: shoppice,
            isshow: true,
            img: shopimg
        }
        let obj = { //更新的数据
            pinid: pinpaiid,
            pinpainame: pinpainame,
            showall: true,
            shoplist: [chobj]
        }

        if (shoparr.length == 0) {
            shoparr.push(obj) //把数据信息添加进去
            wx.setStorageSync('shop', shoparr);
        } else {
            for (let i = 0; i < shoparr.length; i++) {
                if (shoparr[i].pinid == obj.pinid) { //如果品牌名字一样就放到一个品牌对象里面
                    let list = shoparr[i].shoplist;
                    for (let j = 0; j < list.length; j++) {
                        if (list[j].id == chobj.id) {
                            shoparr[i].shoplist[j].buynum = ++shoparr[i].shoplist[j].buynum;
                            wx.setStorageSync('shop', shoparr);
                            return false
                        }
                    }
                    shoparr[i].shoplist.push(chobj);
                    wx.setStorageSync('shop', shoparr);
                    return false
                }
            }


            shoparr.push(obj); //把整个新品牌添加完毕！
            wx.setStorageSync('shop', shoparr);
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
    onPageScroll: function(e) {
        // console.log(e.scrollTop)
        if (e.scrollTop > 20) {
            this.setData({
                bg: 1
            })
        } else {
            this.setData({
                bg: 0
            })
        }

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function(e) {
        console.log(e)
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