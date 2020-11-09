// pages/shoplist/shoplist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cid: "",
        shopdata: [],
        arr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.cid)
        let that = this;
        // this.setData({
        //     cid: options.cid
        // })
        if (options.cid !== undefined) {
            wx.request({
                url: 'https://x.dscmall.cn/api/catalog/goodslist',
                data: {
                    cat_id: options.cid,
                },
                method: 'post',
                success: (result) => {
                    console.log(result.data.data)

                    let nuarr = result.data.data;
                    let arr1 = nuarr.concat();
                    let arr2 = nuarr.concat();
                    arr2.sort((a, b) => {
                        return a.add_time - b.add_time
                    })
                    let arr3 = nuarr.concat();
                    arr3.sort((a, b) => {
                        return b.sale - a.sale
                    })
                    let arr4 = nuarr.concat();
                    arr4.sort((a, b) => {
                        return a.shop_price - b.shop_price
                    })
                    let arr = [arr1, arr2, arr3, arr4];
                    that.setData({
                        shopdata: result.data.data,
                        arr: arr
                    });


                },
                fail: () => {},
                complete: () => {}
            });
        } else {
            wx.request({
                url: 'https://x.dscmall.cn/api/catalog/goodslist',
                data: {
                    keywords: options.id,
                    size: 20,
                },
                method: 'post',
                success: (result) => {
                    console.log(result.data.data)

                    let nuarr = result.data.data;
                    let arr1 = nuarr.concat();
                    let arr2 = nuarr.concat();
                    arr2.sort((a, b) => {
                        return a.add_time - b.add_time
                    })
                    let arr3 = nuarr.concat();
                    arr3.sort((a, b) => {
                        return b.sale - a.sale
                    })
                    let arr4 = nuarr.concat();
                    arr4.sort((a, b) => {
                        return a.shop_price - b.shop_price
                    })
                    let arr = [arr1, arr2, arr3, arr4];
                    that.setData({
                        shopdata: result.data.data,
                        arr: arr
                    });
                },
                fail: () => {},
                complete: () => {}
            });
        }

    },
    fn(data) {
        console.log("拿到了", data.detail);
        let index = data.detail;
        // let arr = this.data.shopdata;
        // arr.sort((a, b) => {
        //     return a.add_time - b.add_time;
        // })
        this.setData({
            shopdata: this.data.arr[index]
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
        console.log("到底了")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})