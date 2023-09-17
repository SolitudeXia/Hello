let url = $request.url
let body = null

if (url.includes("mp.weixin.qq.com/mp/getappmsgad")) {  // 微信公众号
    let obj = JSON.parse($response.body)
    obj["advertisement_num"] = 0
    obj["advertisement_info"] = []
    body = JSON.stringify(obj)
} else if (url.includes("amdc/mobileDispatch")) {  // 高德地图 | 菜鸟
    let header = $request.headers
    let ua = header["User-Agent"] || header["user-agent"]
    if (ua.includes("AMap") || ua.includes("Cainiao")) {
        if ('undefined' !== typeof $task) $done({status: 'HTTP/1.1 404 Not Found'})
        else $done()
    } else $done({})
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}
