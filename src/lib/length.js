var constants = require('../constants.js');
var evaluation = require('../eval.js');

module.exports = {
	
	symbol : "length",
	
	length : function ( SEXPR ) {
				
		var lengthCount = 0;
		
		if ( SEXPR.type === constants.NULL ) {
			
			console.log("Must pass an argument into length.");
			return constants.FALSE;
		}
		else if (SEXPR.car.type === constants.NULL ) {
			
			return lengthCount;
		}
		
		SEXPR = evaluation.eval(SEXPR.car);
						
									
		//
		// SEXPR must be a list.
		//
		if ( SEXPR.type !== constants.NULL && SEXPR.type !== constants.CONS ) {
			
			console.log('Length must be passed a list.');
			return constants.FALSE;
		}

		var list = SEXPR;
		while ( list.type !== constants.NULL ) {
			
			lengthCount++;			
			list = list.cdr;
		}

		return lengthCount;
	}
}