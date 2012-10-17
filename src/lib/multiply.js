//
// Multiply Function
//
// Prim function id: 5
//
//

module.exports = {

	multiply : function (sexpr) {

		var multiplcation = sexpr[0]; // The * sign
	
		var value = evaluation.eval(sexpr[1]); // The first element after the * sign goes on the left hand side of the plus sign.
	
	
		//
		// Loop through the rest of the elments and add them up.
		//
		for (var i = 2; i < sexpr.length; i++) {
	
			value *= evaluation.eval(sexpr[i]);
		}
	
		return value;
	}
}