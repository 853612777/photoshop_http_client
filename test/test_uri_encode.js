#include "../libs/uriEncode.js";
#include "../libs/assert.js";

assert.equal( encodeURIComponent('InstallFunctions++V8'), "InstallFunctions%2B%2BV8" );
assert.equal( encodeURIComponent('中文'), "%E4%B8%AD%E6%96%87" );
assert.equal( encodeURIComponent('&!@%#%+$#=12a'),"%26!%40%25%23%25%2B%24%23%3D12a" );

assert.report();