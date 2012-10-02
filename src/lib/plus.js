//
// + Function
//
// Prim function id: 2
//
//

module.exports = {

	plus : function (sexpr) {
			
		var plus = sexpr[0]; // The plus sign
	
		var value = evaluation.eval(sexpr[1]); // The first element after the + sign goes on the left hand side of the plus sign.
	
		//
		// Loop through the rest of the elments and add them up.
		//
		for (var i = 2; i < sexpr.length; i++) {
	
			value += evaluation.eval(sexpr[i]);
		}
	
		return value;
	}
}