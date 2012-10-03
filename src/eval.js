var symbolTable = require('./symbolTable.js');
var primFunctions = require('./primitives.js');
var constants = require('./constants.js');

//
// The evaluation and lambda evaluation methods.
// Also contains the primitive functions.
//
var evaluation = {
	
	printSymbols : function () {
		symbolTable.print();	
	},
	initialize : function () {
		
		symbolTable.initialize();
		primFunctions.initialize();
	},
	
	eval : function( SEXPR ) {

	
		if ( SEXPR.type == constants.CONS ) {
			
			var car = SEXPR.car;
			var cdr = SEXPR.cdr;
			
			
			if ( car.type == constants.SYMBOL ) {
				
				var lookupValue = symbolTable.lookup( car );
				
				if (lookupValue.type == constants.PRIM) {
					
					//
					// If the lookup value is prim then the symbol we are looking at is a primitive function.
					// We pass everything that is connected with the symbol which is all nodes off of the cdr.
					//
					// lookupValue.val is the array index of where the prim function is located.
					//
				
					return primFunctions.primfns[lookupValue.val]( cdr );
				
				}
				else if (lookupValue.type === 'LAMBDA') {
				

				}
				else if (lookupValue.type !== 'NULL') {
				

				}
				else {
				
					console.log("Undefined symbol: " + car.val);
					return false;
				}
			}
			
		}
		else {
			
			//
			// If the sexpr is not a cons then it is an atom.
			//
			
			return SEXPR.val;
		}
	}	
};

module.exports = evaluation;