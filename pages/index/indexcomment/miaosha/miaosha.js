// pages/index/indexcomment/miaosha/miaosha.js
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
        times: [],
        sholist: [],
        kby: 0,
        h: 0,
        m: 0,
        s: 0

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tab(e) { //tab切换
            // console.log(e.currentTarget.dataset.index)
            // console.log(e.currentTarget.dataset.id.id);
            let tom = 1;
            if (e.currentTarget.dataset.id.status) {
                tom = 0
            }
            wx.request({
                url: "https://x.dscmall.cn/api/visual/visual_seckill",
                data: {
                    id: e.currentTarget.dataset.id.id,
                    tomorrow: tom
                },
                success: (res) => {
                    this.setData({
                            sholist: res.data.data.seckill_list
                        })
                        // console.log(res.data.data.seckill_list)
                }
            })
            this.setData({
                kby: e.currentTarget.dataset.index
            })
        }
    },
    attached() { //组件的声明周期
        wx.request({
            url: 'https://x.dscmall.cn/api/visual/visual_seckill',
            data: {},
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {

                this.setData({
                    times: result.data.data.time_list
                })
                let arr = this.data.times;
                let index = arr.findIndex((item) => {
                    if (item.status == true) return true
                })
                this.setData({
                    kby: index
                })
                console.log(arr)
                setInterval(() => {
                    let index = arr.findIndex((item) => {
                        if (item.status == true) return true
                    })

                    let time = +new Date();
                    // console.log(time)
                    let timer = arr[index].frist_end_time;
                    let newtime = +new Date(timer);
                    let long = (newtime - time) / 1000
                        // console.log(long);
                    let h = parseInt(long / 60 / 60 % 24);
                    h = h < 10 ? "0" + h : h;
                    let m = parseInt(long / 60 % 60);
                    m = m < 10 ? "0" + m : m;
                    let s = parseInt(long % 60);
                    s = s < 10 ? "0" + s : s;
                    this.setData({
                        h: h,
                        m: m,
                        s: s,

                    })
                }, 1000);


                // console.log(result.data.data)
            },
            fail: () => {},
            complete: () => {}
        });


        wx.request({
            url: "https://x.dscmall.cn/api/visual/visual_seckill",
            data: {
                id: 28,
                tomorrow: 1
            },
            success: (res) => {
                this.setData({
                        sholist: res.data.data.seckill_list
                    })
                    // console.log(res.data.data.seckill_list)
            }
        })
    }
})