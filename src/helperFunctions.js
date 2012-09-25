//
// Generic helper functions 
//
Array.prototype.contains = function(obj) { var i = this.length; while (i--) { if (this[i] === obj) { return true; } } return false; }

GLOBAL.isArray = function (x) { return ( x instanceof Array ); }