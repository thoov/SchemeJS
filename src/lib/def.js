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
	
			//
			// This is a lambda function. We need to go and rename variables.
			// Here we need to pre process functions to protect local variables.
			//
	
	
			var prefixFunctionName = variable;
			var prefixedParameterNames = [];
	
			//
			// Convert the old parameters into the new ones.
			//
			for (var i = 0; i < value.parameters.length; i++) {
				prefixedParameterNames.push( value.parameters[i].val );
	
				value.parameters[i].val = prefixFunctionName.val + '_' + value.parameters[i].val;
			}        
	
			//
			// Replace local variables with new names.
			//
			for (var i = 0; i < value.expression.length; i++) {
	
				if (prefixedParameterNames.contains(value.expression[i].val)) {
	
					value.expression[i].val = prefixFunctionName.val + '_' + value.expression[i].val;
				}
			}  
	
			alist.alist = alist.makeCons( alist.makeCons(variable, value),  alist.alist);
		}
		else {
	
			console.log("Feature not added yet.");
			process.exit(1);
		}
	
		return true;
	}
}