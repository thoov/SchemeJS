//
// Equals Function
//
// Prim function id: 6
//
//

module.exports = {

	if : function (sexpr) {
	
		var ifSymbol = sexpr[0]; // The if keyword
		
		
		if( sexpr.length !== 4 ) {
			console.log('Invaid arguments passed to if.');
			process.exit(1);
		}
		
		var test = evaluation.eval(sexpr[1]); // The first element after the = sign goes on the left hand side of the equals sign.
		
		
		if( test == '#t' ) {
			
			return evaluation.eval(sexpr[2]); // The then part 
		}
		else {
			
			return evaluation.eval(sexpr[3]); // The else part 
		}
		
	}
}