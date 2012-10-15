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
			// Check to see if the first car atom that is not a cons is a symbol.
			//
			if ( car.type == constants.CONS ) {
				
				//
				// If we have a cons inside of a cons then we go down the rabbit hole...
				//
				car = this.eval(car.car);
			}	
			
			
			if ( car.type == constants.SYMBOL ) {
			
				//
				// Look the symbol up in the symbol table.
				//
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
			}
			else if ( car.type == constants.LAMBDA ) {
				
				this.lambda( car, cdr );
			}	
			
	
		}
		else {
			
			//
			// If the sexpr is not a cons then it is an atom.
			//
			return SEXPR.val;
		}
	},
	//
	// Primitive Built-in Macro Lambda
	//
	lambda : function ( car, cdr ) {
	

		// If function is not called with actualls then we dont have to eval it.
	
		var formals = car.formals;
		var body = car.body;
		var actuals = cdr;
	
	
		//
		// Check to make sure that the number of actuals is correct. 
		//
		
		var helpers = require('helpers/lambda.js');
		if ( !helpers.parameterChecking(actuals, formals) ) {
			return constants.FALSE;
		}
		
		
		// Throw the variables onto the run time stack. 
		
		
		
		return 0;		
	}	
};

module.exports = evaluation;