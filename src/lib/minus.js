//
// - Function
//
// Prim function id: 3
//
//

module.exports = {

	minus : function (sexpr) {

		var minus = sexpr[0]; // The minus sign
	
		var value = evaluation.eval(sexpr[1]); // The first element after the - sign goes on the left hand side of the minus sign.
	
	
		//
		// Loop through the rest of the elments and subtract them up.
		//
		for (var i = 2; i < sexpr.length; i++) {
	
			value -= evaluation.eval(sexpr[i]);
		}
	
		return value;
	}
}