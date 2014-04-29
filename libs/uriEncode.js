var hexCharCodeArray = 0;

function URIAddEncodedOctetToBuffer(octet, result, index) {
  result[index++] = 37; // Char code of '%'.
  result[index++] = hexCharCodeArray[octet >> 4];
  result[index++] = hexCharCodeArray[octet & 0x0F];
  return index;
}

function URIEncodeOctets(octets, result, index) {
  if (hexCharCodeArray === 0) {
    hexCharCodeArray = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
                        65, 66, 67, 68, 69, 70];
  }
  index = URIAddEncodedOctetToBuffer(octets[0], result, index);
  if (octets[1]) index = URIAddEncodedOctetToBuffer(octets[1], result, index);
  if (octets[2]) index = URIAddEncodedOctetToBuffer(octets[2], result, index);
  if (octets[3]) index = URIAddEncodedOctetToBuffer(octets[3], result, index);
  return index;
}

function URIEncodeSingle(cc, result, index) {
  var x = (cc >> 12) & 0xF;
  var y = (cc >> 6) & 63;
  var z = cc & 63;
  var octets = [];
  if (cc <= 0x007F) {
    octets[0] = cc;
  } else if (cc <= 0x07FF) {
    octets[0] = y + 192;
    octets[1] = z + 128;
  } else {
    octets[0] = x + 224;
    octets[1] = y + 128;
    octets[2] = z + 128;
  }
  return URIEncodeOctets(octets, result, index);
}

function URIEncodePair(cc1 , cc2, result, index) {
  var u = ((cc1 >> 6) & 0xF) + 1;
  var w = (cc1 >> 2) & 0xF;
  var x = cc1 & 3;
  var y = (cc2 >> 6) & 0xF;
  var z = cc2 & 63;
  var octets = new $Array(4);
  octets[0] = (u >> 2) + 240;
  octets[1] = (((u & 3) << 4) | w) + 128;
  octets[2] = ((x << 4) | y) + 128;
  octets[3] = z + 128;
  return URIEncodeOctets(octets, result, index);
}

// ECMA-262, section 15.1.3
function Encode(uri, unescape) {
  var uriLength = uri.length;
  var array = [];
  var index = 0;
  for (var k = 0; k < uriLength; k++) {
    var cc1 = uri.charCodeAt(k);
    if (unescape(cc1)) {
      array[index++] = cc1;
    } else {
      if (cc1 >= 0xDC00 && cc1 <= 0xDFFF) throw new "URI malformed";
      if (cc1 < 0xD800 || cc1 > 0xDBFF) {
        index = URIEncodeSingle(cc1, array, index);
      } else {
        k++;
        if (k == uriLength) throw "URI malformed";
        var cc2 = uri.charCodeAt(k);
        if (cc2 < 0xDC00 || cc2 > 0xDFFF) throw new "URI malformed";
        index = URIEncodePair(cc1, cc2, array, index);
      }
    }
  }

  var result = '';
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}
// ECMA-262 - 15.1.3.4
function encodeURIComponent(component) {
  var unescapePredicate = function(cc) {
    if (/[0-9a-zA-Z]/.test( String.fromCharCode(cc))) return true;
    // !
    if (cc == 33) return true;
    // '()*
    if (39 <= cc && cc <= 42) return true;
    // -.
    if (45 <= cc && cc <= 46) return true;
    // _
    if (cc == 95) return true;
    // ~
    if (cc == 126) return true;

    return false;
  };

  var string = component.toString();
  return Encode(string, unescapePredicate);
}
