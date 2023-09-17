// 百度网盘-开屏广告(RuCu6)
if (!$response.body) $done({});
const url = $request.url;
let body = $response.body;

if (body) {
  switch (true) {
    case /^https:\/\/pan\.baidu\.com\/api\/getsyscfg\?/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.splash_advertise_fetch_config_area?.cfg_list) {
          obj.splash_advertise_fetch_config_area.cfg_list =
            obj.splash_advertise_fetch_config_area.cfg_list.filter(
              (i) =>
                ![
                  "svip_user_special_advertise_config", // 生日开屏
                  "autoScroll_timeInterval", // banner广告轮播间隔时间
                  "splash_svip_default_advertise_config", // 开屏超级会员兜底广告相关配置
                  "splash_default_advertise_config", // 开屏普通用户兜底广告相关配置
                  "splash_advertise_config" // 开屏广告相关配置
                ].includes(i?.node_key)
            );
          for (let i of obj.splash_advertise_fetch_config_area.cfg_list) {
            if (i?.switch) {
              i.switch = "0";
            }
          }
        }
        if (obj?.splash_advertise_type_area?.cfg_list) {
          for (let i of obj.splash_advertise_type_area.cfg_list) {
            if (i?.switch) {
              i.switch = "0";
            }
          }
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`百度网盘-开屏广告, 出现异常: ` + error);
      }
      break;
  }
  $done({ body });
}
