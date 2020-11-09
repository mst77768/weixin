// pages/shop/comment/mian/mian.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        datalist: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        region: ['上海市', '上海市', "浦东区"]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chang(e) {
            console.log(e.detail.value);
            this.setData({
                region: e.detail.value
            })
        },
        gofa() {
            this.triggerEvent("click", true);
        }
    }
})