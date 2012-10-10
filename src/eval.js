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
			
			
			//
			// We have a cons inside of a cons.
			//
			if ( car.type == constants.CONS ) {
				
				//
				// Look at the inner cons and see what to do.
				//
				if ( car.car.car.type == constants.SYMBOL && car.car.car.val.toUpperCase() == constants.LAMBDA ) {
								
					//
					// The lambda list is the car.
					// The actuals is the cdr. ( Cdr can be null )
					//
					return primFunctions.lambda(SEXPR);
				}
			}
 			else {
	 			
	 			
	 			//
	 			//
	 			//
	 			if ( car.type == constants.SYMBOL ) {
	 				
	 				var lookupValue = symbolTable.lookup( car );
	 				
	 				if ( lookupValue.type == constants.PRIM ) {
	 					
	 					//
	 					// If the lookup value is prim then the symbol we are looking at is a primitive function.
	 					// We pass everything that is connected with the symbol which is all nodes off of the cdr.
	 					//
	 					// lookupValue.val is the array index of where the prim function is located.
	 					//
	 				
	 					return primFunctions.primfns[lookupValue.val]( cdr );
	 				
	 				}
	 				else if ( lookupValue.type != constants.NULL ) {
	 				
	 					return lookupValue.val;
	 				}
	 				else {
	 				
	 					console.log("Undefined symbol: " + car.val);
	 					return false;
	 				}
	 			}
	 			else {
	 				
	 				//
	 				// If the sexpr is not a cons then it is an atom.
	 				//
	 				
	 				return car.val;
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