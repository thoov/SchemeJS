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

		console.log(cdr);
		
		return 0;
	
	
		
		var lambdaParameters = lambdaFunction.parameters;
		var lambdaExpression = lambdaFunction.expression;
		
		if (lambdaParameters.length !== parentExpression.length - 1) {
		
			console.log("Lambda function " + parentExpression[0].val + " invoked with invalid parameters.");
			process.exit(1);
		}
		
		
		//
		// Add the temp variables into the alist.
		//
		for (var i = 1, j = 0; i < parentExpression.length; i++, j++) {
		
			alist.alist = alist.makeCons( alist.makeCons(lambdaParameters[j], alist.makeItem( "NUMBER", parentExpression[i].val)),  alist.alist);
		}
		
		//
		// Evaluate the function expression.
		//
		return evaluation.eval({ type:'LIST', val:lambdaExpression });
		
	}	
};

module.exports = evaluation;