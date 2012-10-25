var constants = require('../constants.js');
var evaluation = require('../eval.js');
var conversion = require('../helpers/conversion.js');

//
// + function
//
// Returns the sum of atoms in a list.
//
module.exports = {

	symbol : "+",
	
	plus : function ( SEXPR ) {
		
		//
		// If no parameters are passed then the function returns 0.
		//
		if ( SEXPR.type === constants.NULL ) {
			
			return { type:constants.NUMBER, val:0 };
		}
																		
		var leftOperand = evaluation.eval(SEXPR.car);
		
		//
		// Type checking
		//
		if ( leftOperand.type !== constants.NUMBER ) {
			
			console.log("Wrong type: " + leftOperand.val);
			return constants.FALSE;
		}
		
		leftOperand = conversion.convert(leftOperand);
				
		var currentExpression = SEXPR.cdr;
		
		while ( currentExpression.type !== constants.NULL ) {
		
			if ( currentExpression.car === undefined ) {
					
				console.log("Wrong number of arguments.");
				return constants.FALSE;
			}

			var value = evaluation.eval(currentExpression.car);

			//
			// Type checking
			//
			if ( value.type !== constants.NUMBER ) {
				
				console.log("Wrong type: " + value.val);
				return constants.FALSE;
			}
			
			leftOperand += conversion.convert(value);
					
			currentExpression = currentExpression.cdr; // Advance the "pointer" to the next token
			
		}
				
		return { type:constants.NUMBER, val:leftOperand };
	}
}