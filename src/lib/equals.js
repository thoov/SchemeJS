var constants = require('../constants.js');
var evaluation = require('../eval.js');

//
// Equals Function
//
//
module.exports = {

	equals : function ( SEXPR ) {

		if ( SEXPR.type === constants.NULL )
			return constants.TRUE; 

		var compareAgainstValue = evaluation.eval(SEXPR.car);
	
		SEXPR = SEXPR.cdr; // Move passed the first term as that is now in compareAgainstValue.
				
		while ( SEXPR.type !== constants.NULL ) {
						
			if( compareAgainstValue != evaluation.eval( SEXPR.car ) ) {
				return constants.FALSE;
			}
			
			SEXPR = SEXPR.cdr;
		}
				
		return constants.TRUE;
	}
}