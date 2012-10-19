var constants = require('../constants.js');
var evaluation = require('../eval.js');

module.exports = {

	symbol : "*",
	
	multiply : function ( SEXPR ) {

		if ( SEXPR.type === constants.NULL ) {
			
			console.log("Invalid number of arguments.");
			return constants.FALSE;
		}
		
		var leftOperand = evaluation.eval(SEXPR.car);
						
		var currentExpression = SEXPR.cdr;
				
		while ( currentExpression.type != constants.NULL ) {
			
			leftOperand *= evaluation.eval(currentExpression.car);
			currentExpression = currentExpression.cdr; // Advance the "pointer" to the next token
		}
		
		return leftOperand;
	}
}