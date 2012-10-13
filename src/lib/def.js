var constants = require('../constants.js');
var evaluation = require('../eval.js');
var symbolTable = require('../symbolTable.js');

//
// Def Function
//
module.exports = {

	def : function (SEXPR) {

		console.log(SEXPR);
		
		//
		// This is the symbol that we are defining
		//
		var variable = SEXPR.car;
		
		if (variable.type !== constants.SYMBOL) {
		
			console.log('Invalid definition type. Must be a symbol, a ' + variable.type + ' given.');
			process.exit(1);
		}
			
		var value = evaluation.eval(SEXPR.cdr);
		
			
		//
		// Insert into symbol table the new variable that was defined.
		//
		if (typeof value === 'number') {
	
			symbolTable.alist = symbolTable.makeCons( symbolTable.makeCons(variable, symbolTable.makeItem( constants.NUMBER, value)), symbolTable.alist);   
		}
		else if (typeof value === 'string') {
	
			symbolTable.alist = symbolTable.makeCons( symbolTable.makeCons(variable, symbolTable.makeItem( constants.STRING, value)),  symbolTable.alist);
		}
		else if (typeof value === 'object') {
	

			return constants.TRUE;
		}
	}
}