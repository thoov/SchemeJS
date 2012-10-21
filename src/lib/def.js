var constants = require('../constants.js');
var evaluation = require('../eval.js');
var symbolTable = require('../symbolTable.js');

//
// Def Function
//
module.exports = {
	
	symbol : "def",
	
	def : function (SEXPR) {
		
		//
		// This is the symbol that we are defining
		//
		var variable = SEXPR.car;
		
		//
		// Error checking
		//
		if (variable.type !== constants.SYMBOL) {
		
			console.log('Invalid definition type. Must be a symbol, a ' + variable.type + ' given.');
			return constants.FALSE;
		}
		else if (SEXPR.cdr.type === constants.NULL) {
			
			console.log('Invalid number of parameters passed into def. Must pass 2 only 1 given.');
			return constants.FALSE;
		}
		else if (SEXPR.cdr.cdr.type !== constants.NULL) {
			
			console.log('Invalid number of parameters passed into def. Must pass 2, more than 2 given.');
			return constants.FALSE;
		}
		
		//
		// Variable is bound to value.
		//
		var value = evaluation.eval(SEXPR.cdr.car);
		
			
		//
		// Insert into symbol table the new variable that was defined.
		//
		if (typeof value === 'number') {
	
			symbolTable.alist = symbolTable.makeCons( symbolTable.makeCons(variable, symbolTable.makeItem( constants.NUMBER, value)), symbolTable.alist);   
		}
		else if (typeof value === 'string') {
	
			symbolTable.alist = symbolTable.makeCons( symbolTable.makeCons(variable, symbolTable.makeItem( constants.STRING, value)),  symbolTable.alist);
		}
		else {		
			symbolTable.alist = symbolTable.makeCons( symbolTable.makeCons(variable, value),  symbolTable.alist);
		}
	}
}