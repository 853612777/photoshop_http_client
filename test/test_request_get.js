#include '../libs/request.js'

var page  = request({
              url : 'http://dev073.baidu.com:8556/',
              headers : {
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
              }
            });

$.writeln(page.body);
$.writeln(page.headers);