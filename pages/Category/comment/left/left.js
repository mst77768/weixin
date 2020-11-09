// pages/Category/comment/left/left.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        shoplist: Array,
        flag: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        hig: 0,
        current: 0,
    },
    observers: {
        "flag": function(flag) {
            if (flag == 1) {
                this.setData({
                    current: this.data.current + 1 > this.data.shoplist.length - 1 ? this.data.current : this.data.current + 1
                })
                let obj = {
                    curr: this.data.shoplist[this.data.current].cat_id,
                    img: this.data.shoplist[this.data.current].touch_catads
                }
                this.triggerEvent("mydata", obj);
            } else if (flag == 2) {
                this.setData({
                    current: this.data.current - 1 < 0 ? 0 : this.data.current - 1
                })
                let obj = {
                    curr: this.data.shoplist[this.data.current].cat_id,
                    img: this.data.shoplist[this.data.current].touch_catads
                }
                this.triggerEvent("mydata", obj);
            }

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tab(e) {
            // console.log(e.currentTarget.dataset.index);
            this.setData({
                current: e.currentTarget.dataset.index
            })
            let obj = {
                curr: e.currentTarget.dataset.id,
                img: e.currentTarget.dataset.img
            }
            this.triggerEvent("mydata", obj);
        },
    },
    attached() {
        const res = wx.getSystemInfoSync();
        console.log(res.screenHeight);
        this.setData({
            hig: res.screenHeight - 165
        })

    }
})