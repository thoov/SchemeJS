var constants = require('../constants.js');

//
// Lambda Function
//
// Example: 
/*

{typ: "LAMBDA",
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

	lambda : function ( SEXPR ) {

		var car = SEXPR.car; // The parameters are in the car
		var cdr = SEXPR.cdr; // The expresion is in the cdr

		return { type:constants.LAMBDA, formals:car, body:cdr };
	}
}

