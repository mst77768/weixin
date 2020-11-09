let request = function(url, obj = {}, method = 'GET') {
    return new Promise((resolove, rejects) => {
        wx.request({
            url: url,
            data: obj,
            header: { 'content-type': 'application/json' },
            method: method,
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                resolove(result.data)
            },
            fail: (err) => {
                rejects("错误！" + err)
            },
            complete: () => {}
        });
    })
}
module.exports = {
    request
}