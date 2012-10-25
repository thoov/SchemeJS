var symbolTable = require('./symbolTable.js');
var primFunctions = require('./primitives.js');
var constants = require('./constants.js');
var helpers = require('./helpers/lambda.js');

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
				else if ( lookupValue.type === constants.LAMBDA ) {
								
					return this.lambda( lookupValue, cdr );
				}
				else if (lookupValue.type !== constants.NULL) {
				
					return lookupValue;
				}
				else {
				
					console.log("Undefined symbol: " + car);
					return constants.FALSE;
				}
			}
			else if ( car.type == constants.LAMBDA ) {
				
				return this.lambda( car, cdr );
			}	
			
			return car;
		}
		else if ( SEXPR.type == constants.SYMBOL ) {
			
			var lookupValue = symbolTable.lookup( SEXPR );
				
			if (lookupValue.type === constants.NULL) {
						
				console.log("Undefined symbol: " + SEXPR.val);
				return constants.FALSE;
			}
			
			return lookupValue;
		}
		else {
			
			//
			// If the sexpr is not a cons or a symbol then it is an atom.
			//
			return SEXPR;
		}
	},
	//
	// Primitive Built-in Macro Lambda
	//
	lambda : function ( car, cdr ) {
	

		// If function is not called with actualls then we dont have to eval it.
	
		var formals = car.formals;
		var body = car.body.car;
		var actuals = cdr;
	
		//
		// Push a stack level onto the symbol table.
		//
		symbolTable.pushStackLevel();
		
	
		//
		// If any actuals are symbols we need to replace them with their values.
		//
		actuals = helpers.replaceWithValues( actuals );

			
		//
		// Check to make sure that the number of actuals is correct. 
		//
		// This will also push the formals and their values onto the symbol table.
		//
		if ( helpers.bindParameters(formals, actuals) === constants.FALSE ) {
			
			symbolTable.popOffTopStackLevel(); // Remove any bad variables that may have been added to the stack.
			return constants.FALSE;
		}
								
		//
		// Now we evaluate the body.
		//
		var result = this.eval( body );		
		
		symbolTable.popOffTopStackLevel(); // Pop off a level for every level of recusion.
		
		return result;
	}	
};

module.exports = evaluation;