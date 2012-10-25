var constants = require('../constants.js');
var evaluation = require('../eval.js');

//
// Equals Function
//
//
module.exports = {
	
	symbol : "=",

	equals : function ( SEXPR ) {

		if ( SEXPR.type === constants.NULL )
			return constants.TRUE; 

		var compareAgainstValue = evaluation.eval(SEXPR.car);
			
		//
		// Type checking
		//
		if ( compareAgainstValue.type !== constants.NUMBER ) {
			
			console.log("Wrong type: " + compareAgainstValue.val);
			return constants.FALSE;
		}		
	
		SEXPR = SEXPR.cdr; // Move passed the first term as that is now in compareAgainstValue.
				
		while ( SEXPR.type !== constants.NULL ) {
			
			var checkValue = evaluation.eval(SEXPR.car);
				
			//
			// Type checking
			//
			if ( checkValue.type !== constants.NUMBER ) {
				
				console.log("Wrong type: " + checkValue.val);
				return constants.FALSE;
			}		
			
			
			//
			// Both value and type checking
			//		
			if( compareAgainstValue.type !== checkValue.type || compareAgainstValue.val !== checkValue.val )
				return constants.FALSE;
			
			SEXPR = SEXPR.cdr;
		}
				
		return constants.TRUE;
	}
}