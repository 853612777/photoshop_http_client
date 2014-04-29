#include '../libs/request.js'

var page  = request({
              method : 'post',
              url    : 'http://update.client.baidu.com/bin/phoenix.fcgi',
              headers: {
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
                'Accept-Language': 'zh-CN,zh;q=0.8,ja;q=0.6,en;q=0.4,zh-TW;q=0.2',
              },
              socket : {
                host : 'localhost',
                port : 8888
              },
              data   : {
                'product_name'   :'BaiduPinyin',
                'type'           :'auto',
                'updater_version':'1.0',
                'sign_algorithm' :'rsa',
                'comp_names'     :'uiframe,autoupdate',
                'comp_versions'  :'1.0.0.114,1.1.2.49',
                'comp_infos'     :'td=0;kv=2.9.2.42,',
                'osver'          :'6.1.7601',
                'inner_ip'       :'172.22.139.133',
                'external_ip'    :'61.135.169.79',
                'baiduid'        :'ssddi456',
                'area'           :'IP_LOCATION_2'
              }
            });

$.writeln(page.body);
$.writeln(page.headers);