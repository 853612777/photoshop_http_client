#include "../libs/url.js";
#include "../libs/assert.js";

var location = url.parse('https://code.google.com/p/v8/source/browse/branches/bleeding_edge/src/promise.js?r=18113');
var location_data = { protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'code.google.com',
  port: null,
  hostname: 'code.google.com',
  hash: null,
  search: '?r=18113',
  query: 'r=18113',
  pathname: '/p/v8/source/browse/branches/bleeding_edge/src/promise.js',
  path: '/p/v8/source/browse/branches/bleeding_edge/src/promise.js?r=18113',
  href: 'https://code.google.com/p/v8/source/browse/branches/bleeding_edge/src/promise.js?r=18113' 
};
for( var k in location_data ){
  assert.equal( location[k], location_data[k]);
}

assert.report();