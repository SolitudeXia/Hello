let url = $request.url
let body = null
if (url.includes('app.bilibili.com/x/v2/account/myinfo?')) {  // 解锁会员画质
    let obj = JSON.parse($response.body)
    if (obj.data?.vip && !obj.data.vip.status) {
        obj.data.vip.type = 2
        obj.data.vip.status = 1
        obj.data.vip.vip_pay_type = 1
        obj.data.vip.due_date = 4669824160000
        body = JSON.stringify(obj)
    }
}else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}
