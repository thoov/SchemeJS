//
// All the built in macros
//
module.exports {
	
	lambda : function () {
		
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
		
	},
	
	def : function ( SEXPR ) {
		
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
		
	},
	
	let : function () {
		
	},
	
	letStar : function () {
		
		
	}
}	