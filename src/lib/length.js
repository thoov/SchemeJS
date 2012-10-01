//
// Length Function
//
// Prim function id: 11
//
// Returns the length of parameters passed into length.
//
// Example: 
// (length (23 23 23))	=> 3
//

module.exports = {
	
	len : function (sexpr) {
		
		var lengthKeyword = sexpr[0];
			
		return sexpr.length - 1; // Everything except the keyword
	}
}