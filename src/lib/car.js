var evaluation = require('../eval.js');

module.exports = {

	symbol : "car",
	
	car : function ( SEXPR ) {

		return evaluation.eval(evaluation.eval(SEXPR.car).car);
	}
}