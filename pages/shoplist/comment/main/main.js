// pages/shoplist/comment/main/main.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        btn: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        btn(e) {
            console.log(e.currentTarget.dataset.index);
            this.setData({
                btn: e.currentTarget.dataset.index
            })
            this.triggerEvent("mydata", e.currentTarget.dataset.index);
        }
    }
})