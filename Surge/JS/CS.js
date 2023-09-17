let url = $request.url
let body = null

if (url.includes("intsig.net/purchase")) {  // 扫描全能王
    body = '{"data":{"psnl_vip_property":{"expiry":"3287462400"}}}'
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}
