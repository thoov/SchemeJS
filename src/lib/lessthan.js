var evaluation = require('../eval.js');
var constants = require('../constants.js');

module.exports = {

	symbol : "<",

	lessthan : function ( SEXPR ) {

		var value = evaluation.eval(SEXPR.car);

		var otherValue = evaluation.eval(SEXPR.cdr);
		
		if ( value < otherValue.val ) 
			return constants.TRUE;

		return constants.FALSE;
	}
}