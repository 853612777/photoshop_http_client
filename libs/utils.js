#include './es5-shim.js'

var util = {
  isNull : function(o) { return o === null },
  isNullOrUndefined : function(o) { return o === null || o === undefined; },
  isObject : function(o) { return typeof o == 'object'; },
  isFunction : function(o) { return typeof o == 'function'; },
  isString : function(o) { return o === String(o) || o instanceof String; },
  isNumber : function(o) { return typeof o === 'number' },
  isBoolean:function(o) { return typeof o === 'boolean'; },
  isArray  : function(o) { return o instanceof Array; },
  isEmptyObject : function(o){ for(var i in o){ return false;} return true;},
  installFunctions : function( proxy, func_name, func ) {
    if( !proxy[func_name] ){
      proxy[func_name] = func;
    } else {
      if( proxy[func_name] != func){
        throw 'duplicate func name ' + func_name;
      }
    }
  },
  layerWalker:function(layerRoot, walker ) {
    if (!walker && util.isFunction( layerRoot )){
      walker = layerRoot;
      layerRoot = app.activeDocument;
    }
    function readLayers ( node ){
      var i = 0, n = node.layers.length;
      var layers = node.layers;
      var layer;
      for(;i<n;i++){
        layer = layers[i];
        if ( !layer.kind && layer.layers && layer.layers.length ){
          readLayers( layer );
        } else {
          walker(layer);
        }
      }
    }
    readLayers( layerRoot );
  },

};
$.extend = function  ( target ) {
  var origins = [].slice.call(arguments,1);
  var k, origin;
 
  for (var i = 0, n = origins.length; i < n; i++ ){
    origin = origins[i];
    for(k in origin ){
      if( !util.isNullOrUndefined( origin[k]) ){
        target[k] = origin[k];
      }
    }
  }
  return target;
}