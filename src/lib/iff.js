var constants = require('../constants.js');
var evaluation = require('../eval.js');

module.exports = {
	
	symbol : "if",

	iff : function ( SEXPR ) {
	
	
		//
		// Check to make sure that the correct number of parameters are passed into the if function.
		//
		if ( SEXPR.type === constants.NULL ) {
			
			console.log("Missing conditional expression.");
			return constants.FALSE;
		}
		else if ( SEXPR.cdr.type === constants.NULL ) {
			
			console.log("Missing then expression.");
			return constants.FALSE;
		}
		else if ( SEXPR.cdr.cdr.cdr !== undefined && SEXPR.cdr.cdr.cdr.type !== constants.NULL ){
			
			console.log("Too many parameters passed into if.");
			return constants.FALSE;
		}
	
	
		var expression = evaluation.eval(SEXPR.car);
		
		if ( expression !== constants.FALSE ) {
			
			return evaluation.eval(SEXPR.cdr.car);
		}
		else if( SEXPR.cdr.cdr.car !== undefined ) {
			
			return evaluation.eval(SEXPR.cdr.cdr.car);
		}
	}
}