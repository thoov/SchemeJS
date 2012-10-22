var constants = require('../constants.js');
var helper = require('../helpers/lambda.js');

module.exports = {

	symbol : "let*",

	letStar : function ( SEXPR ) {

		var car = SEXPR.car; // The formals are in the car
		var cdr = SEXPR.cdr; // The body is in the cdr

		var closedBody = helper.closure( cdr.car, car ); // Make sure that we encapsulate the body (closure)

		return { type:constants.MACRO, formals:car, body:closedBody };
	}
};

