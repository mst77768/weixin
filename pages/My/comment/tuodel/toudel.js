// pages/My/comment/tuodel/toudel.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        sx: 0,
        x: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        startFn(e) {
            this.setData({
                sx: e.touches[0].pageX
            })
            console.log(e.touches[0].pageX)
        },
        endFn(e) {
            let cha = e.changedTouches[0].pageX - this.data.sx;
            if (cha > 70) {
                this.setData({
                    x: -this.data.width / 10 * 7
                })
            } else {
                this.setData({
                    x: 0
                })
            }
            if (cha > -70) {
                this.setData({
                    x: 0
                })
            } else {
                this.setData({
                    x: -this.data.width / 10 * 7
                })
            }
            console.log(e.changedTouches[0].pageX)
        }
    }
})