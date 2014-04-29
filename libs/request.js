#target photoshop

#include './utils.js'
#include './uriEncode.js'
#include './url.js'

var request = (function(){

  var default_options = {
    method : "get",
    port   : 80,
    host   : "localhost"
  };

  function request ( options  ){
      options = $.extend({}, default_options, options);

      if( options.url ){
        $.extend(options, url.parse(options.url) );
      }
      var host, port;
      if( options.socket  ){
        host = options.socket.host ? options.socket.host : options.host;
        port = options.socket.port ? options.socket.port : options.port;
      } else {
        host = options.host
        port = options.port
      }

      $.writeln ( host + ' : ' + port );
      $.writeln ( options.hostname + ' : ' + options.pathname );

      options.headers = $.extend(options.headers || {}, {
                          'HOST' : options.hostname + (options.port  && (':' + options.port) || '')
                        });
      var socket = new Socket(),
          pathname = "/",
          bin;
      options.method = options.method.toUpperCase();
      if(socket.open( host + ":" + port,"binary")) {
        $.writeln( options.method + 
                      " " + options.pathname +
                      (( options.method == 'GET' && options.data )?
                        '?' + querystring.stringify(options.data):
                        '' ) +" HTTP/1.1\r\n");
        socket.write( options.method + 
                      " " + options.pathname +
                      (( options.method == 'GET' && options.data )?
                        '?' + querystring.stringify(options.data):
                        '' ) +" HTTP/1.1\r\n");

        if( options.method == 'POST' && ( options.data || options.files ) ){
          if ( options.files && options.files.length ){
            uploadFiles( socket, options);
          } else {
            var body = querystring.stringify(options.data);
            options.headers['Content-Length'] = body.length;
            options.headers['Content-Type']   = 'application/x-www-form-urlencoded';
            
            socket.write( headerBuilder(options.headers).join('\r\n') );
            socket.write('\r\n\r\n');

            socket.write( body );
            socket.write('\r\n\r\n');
          }

        } else {

          socket.write( headerBuilder(options.headers).join('\r\n') );
          socket.write('\r\n\r\n');

        }
        //todos : deal with content_length and chucked...

        var chuck = socket.read();
        var first_pack = responce(chuck);
        var bin = chuck + socket.read( first_pack.headers['Content-Length'] - first_pack.body.length);

        socket.close();
        return responce(bin);
      } else {
        $.writeln(' cannot connect to host ' + host + ' : ' + port );
      }
  }

  function headerBuilder ( headers ) {
    if( !headers ){
      return [];
    }
    var ret = [];
    for(var k in headers ){
      ret.push(k + ': ' + headers[k]);
    }
    return ret;
  }

  function responce ( bin ) {
    var headers_index = bin.indexOf('\r\n\r\n');

    var headers = bin.slice(0,headers_index);
    var body    = bin.slice(headers_index+4);

    var _headers = {};
    headers.split('\r\n').forEach(function( line, idx ) {
      if( !idx ){
        return line;
      }
      var header = line.split(': ');
      _headers [ header[0] ] = header[1];
    });
    return {
      headers : _headers,
      body    : body
    }
  }
  function caculate_body_length( body ){
    var ret = 0;
    body.forEach(function( item ){
      ret += item.length;
    });
    return ret;
  }
  function uploadFiles ( socket, options ){
    var boundary = '----psuploader' + 
                      String( Date.now() + (Math.random() + '').slice(2)*1 ).slice(0,16);
    var crlf     = '\r\n';

    var body = querystring.stringify(options.data);
    options.headers['Content-Type']   = 'multipart/form-data; boundary=' + boundary;

    var body = ['--'];
    options.files.forEach(function( file ){
      var file = new File(file);
      body.push(boundary + crlf +
        'Content-Disposition: form-data; name="sources"; filename="' + file.name + '"' + crlf +
        'Content-Type: octet-stream'  + crlf + crlf);
      body.push( file );
      body.push( crlf+'--' );  
    });

    if(options.data && !util.isEmptyObject(options.data) ){
      for( var k in options.data ){
        body.push(boundary + crlf +
          'Content-Disposition: form-data; name="' + k + '"' + 
           crlf + crlf);
        body.push( options.data[k] );
        body.push( crlf + '--' );  
      }
    }
    body.push( boundary + '--' );

    options.headers['Content-Length'] = caculate_body_length(body);

    socket.write( headerBuilder(options.headers).join('\r\n') );
    socket.write('\r\n\r\n');

    body.forEach(function( item ){
      if( util.isString(item) ){
        socket.write( item );
      } else {
        item.encoding="binary";
        item.open('r');
        socket.write(item.read());
        item.close();
      }
    });

    socket.write('\r\n\r\n');
  }

  return request;

})();