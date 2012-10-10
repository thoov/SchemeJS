var constants = require('../constants.js');

//
// Lambda Function
//
//

module.exports = {

	lambda : function ( SEXPR ) {

		var car = SEXPR.car; // The parameters are in the car
		var cdr = SEXPR.cdr; // The expresion is in the cdr


		return { type:constants.MACRO, val:constants.LAMBDA, parameters:car, expression:cdr };
	}
}

