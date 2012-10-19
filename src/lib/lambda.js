var constants = require('../constants.js');
var helper = require('../helpers/lambda.js');

/*

Creates a standard lambda format that looks like this example:

{type: "LAMBDA",
 formals: {typ: "CONS",
		   car: {typ: "SYMBOL", val: "xx"},
		   cdr: {typ: "CONS",
				 car: {typ: "SYMBOL", val: "yy"},
				 cdr: {typ: "NULL"}}},
 body:  {typ: "CONS", 
		 car: {typ: "+", val: "xx"}, 
		 cdr: {typ: "CONS",
			   car: {typ: "SYMBOL", val: "xx"},
			   cdr: {typ: "CONS",
					 car: {typ: "SYMBOL", val: "yy"},
					 cdr: {typ: "CONS",
						   car: {typ: "NUMBER", val: 33},
						   cdr: {typ: "NULL"}}}}}}
*/
module.exports = {
	
	symbol : "lambda",
	
	lambda : function ( SEXPR ) {

		var car = SEXPR.car; // The formals are in the car
		var cdr = SEXPR.cdr; // The body is in the cdr

		var closedBody = helper.closure( cdr.car, car ); // Make sure that we encapsulate the body (closure)

		return { type:constants.LAMBDA, formals:car, body:closedBody };
	}
};

