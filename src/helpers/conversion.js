var constants = require('../constants.js');

module.exports = {
	
	//
	//
	//
	convert : function ( ATOM ) {
		
		if ( ATOM === undefined || ATOM === constants.FALSE || ATOM === constants.TRUE ) {
			
			return ATOM;
		}
		else if ( ATOM.type === constants.STRING || ATOM.type == constants.NUMBER ) {
			
			return ATOM.val;
		}
		else if ( ATOM.type === constants.LAMBDA ) {
			
			return ATOM;
		}
 		else {
			
			console.log("Unsupported conversion:");
			console.log(ATOM);
			return constants.FALSE;
		}
	},
	
	toScreen : function ( ATOM ) {
		
		if ( ATOM === undefined || ATOM === constants.FALSE || ATOM === constants.TRUE ) {
		
			return ATOM;
		}
		else if ( ATOM.type === constants.STRING || ATOM.type == constants.NUMBER ) {

			return ATOM.val;
		}
		else if ( ATOM.type === constants.LAMBDA ) {

			return "#<primitive-builtin-macro! lambda>";
		}
		else {

			console.log("Unsupported conversion:");
			console.log(ATOM);
			return constants.FALSE;
		}
	}
}