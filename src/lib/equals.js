//
// Equals Function
//
// Prim function id: 6
//
//

module.exports = {

	equals : function (sexpr) {

		var equals = sexpr[0]; // The = sign
		
		var value = evaluation.eval(sexpr[1]); // The first element after the = sign goes on the left hand side of the equals sign.
		
		//
		// Loop through the rest of the elments and add them up.
		//
		for (var i = 2; i < sexpr.length; i++) {
			
			if( value != evaluation.eval(sexpr[i]) ) {
				return '#f';
			}
		}
		
		return '#t';
	}
}