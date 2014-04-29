photoshop_http_client
=====================

http client for photoshop

Not full tested, it devs on ps cs 6, so I think it works on cs3 or higher.

Inspired by nodejs package ```require```, and copy code from node's core.

features :

* http get

* http post

* http file upload

not support :

* chunked encoding

* gzip

* utf8 only

## params

### request options : 

```js
{
  url : 'http://dev073.baidu.com:8556/', // will parse as host header
  headers : {  // http headers
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
    'Accept-Language': 'zh-CN,zh;q=0.8,ja;q=0.6,en;q=0.4,zh-TW;q=0.2',
  },
  method : 'post', // http method
  socket : {  // custom socket option
    host : 'localhost',
    port : 8888
  },
  data   : {       // request data, when
                   // when method == get,  it will be query string
                   // when method == post, it will be form data
  }
  files  : []      // files to upload, method must be post
                   // now its form name hard code as sources
                   // and only upload with basename
}

```

### responce : 

```js
{
  headers : { // http resp headers

  },
  body    : ''// resp body text
}

```