//
// Generic helper functions 
//
Array.prototype.contains = function(obj) { 
	var i = this.length; 

	while (i--) { 

		if (this[i] === obj) { 
			return true; 
		} 
	} 
	return false; 
}

module.exports = {
	isArray : function (x) { 
	
		return ( x instanceof Array ); 	
	}
}