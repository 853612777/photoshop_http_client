#include './utils.js'
var fs = {};
(function( exports ){
  
  function saveCurrentFileToPng ( path, options ) {
    var file = new File(path);
    app.activeDocument.saveAs( 
      file, 
      $.extend(new PNGSaveOptions(), options || {}),
      true,
      Extension.LOWERCASE);
    return file;
  }

  function saveCurrentLayerToPng( path, options ){
    var clyr = app.activeDocument.activeLayer;
    var visibles = [];
    util.layerWalker(function( layer ) {
      if( clyr != layer ){
        visibles.push ( layer.visible);
        layer.visible          = false;
      }
    });
   
    var file = saveCurrentFileToPng( path, options );
   
    util.layerWalker(function( layer ) {
      if( clyr != layer ){
        layer.visible          = visibles.shift();
      }
    });
    return file;
  }

  util.installFunctions( exports, 'saveCurrentFileToPng',  saveCurrentFileToPng);
  util.installFunctions( exports, 'saveCurrentLayerToPng', saveCurrentLayerToPng);

})(fs);