#include "../libs/fs.js";

var slp = fs.saveCurrentLayerToPng('D:/backup/photoshopScripts/out/test_png_single_layer.png');
slp.execute();
slp.close();