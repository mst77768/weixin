// pages/Category/comment/right/right.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgsrc: String,
        shoplist: Array,
        left: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        hig: 0,
        y: 60,
        flag: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        top() {
            this.setData({
                y: 65,
                flag: true
            });
            // console.log("到顶了");
            let str = 2;
            this.triggerEvent("right", str); //子传父通信的方法
        },
        botm() {
            this.setData({
                y: 65,
                flag: true
            });
            // console.log("到底了");
            let str = 1;
            this.triggerEvent("right", str); //子传父通信的方法
            console.log(this.data.left);
        },
        goshoplist(e) {
            let id = e.currentTarget.dataset.cid; //获取商品分类的id
            console.log(e.currentTarget.dataset.cid)
            wx.navigateTo({ //跳转商品页面的方法
                url: '../shoplist/shoplist?cid=' + id,
            })
        },

    },
    attached() {
        const res = wx.getSystemInfoSync();
        console.log(res.screenHeight);
        this.setData({
            hig: res.screenHeight - 178,
        })

    }
})