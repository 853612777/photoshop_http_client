var assert = {
  equal : function( val, val2 ) {
    this.logs.test ++
    if( val !== val2 ){
      var log = val + ' not equal to ' + val2 ;
      this.logs.errors ++;
      this.logs.error_msg.push(log);
    }
  },
  logs : {
    test : 0,
    errors : 0,
    error_msg : []
  },
  report : function() {
    var msg =  this.logs.test + ' tests, ' + this.logs.errors + ' fails \n'+
               this.logs.error_msg.join('\n') + '\n';
    $.write(msg);
  }
};
