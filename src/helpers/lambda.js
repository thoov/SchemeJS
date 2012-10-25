var constants = require('../constants.js');
var symbolTable = require('../symbolTable.js');
var helper = require('./makeStructure.js');
var conversion = require('./conversion.js');

module.exports = {
	
	//
	// If a list contains a variable then we must look it up in the symbol table.
	// We then replace it with its value and loop to the next actual.
	//
	// The variable aList can take 1 of 2 forms:
	//
	// Proper List: Tested
	// Empty Value (a proper list with no values): Tested
	//
	// Return: The orginal aList that was passed in except that every symbol has been
	// replaced with its symbol table value.
	//
	// TODO: Check to make sure that alist is a properlist or empty and fail if it is not.
	//
	replaceWithValues : function ( aList ) {
		
		var evaluation = require('../eval.js');
		
		if ( aList.type === constants.NULL )
			return aList;
		
		//
		// Create an exact copy of aList into newList but in reverse order.
		//
		var newList = helper.makeItem( constants.NULL );
		while ( aList.type !== constants.NULL ) {
						
			newList = helper.makeCons( aList.car,  newList );
			aList = aList.cdr;			
		}
		
		//
		// Do the same thing as above this will put newList into the correct order
		// and while we are going pair by pair, if we see a symbol we look up its value in 
		// the symbol table and replace it inside of newList.
		//
		aList = newList;
		newList = helper.makeItem( constants.NULL );
		
		while ( aList.type !== constants.NULL ) {
			
			if ( aList.car.type === constants.SYMBOL ) {
				
				aList.car = symbolTable.lookup( aList.car );
			}
			else if ( aList.car.type === constants.CONS ) {
				
				//
				// Check if actuals needs to be evaluated or not.
				//
				
				var value = evaluation.eval(aList.car);
				
				if (typeof value === 'number') {

					aList.car = symbolTable.makeItem( constants.NUMBER, value );  
				}
				else if (typeof value === 'string') {
				
					aList.car = symbolTable.makeItem( constants.STRING, value );  
				}
				else {		
					aList.car = value;
				}
			}		
			
			newList = helper.makeCons( aList.car,  newList );
			aList = aList.cdr;
		}
		
		return newList;		
	},
	
	//
	// We need to binded a formal symbol with its actual value inside of the symbol table.
	// We also need to make sure that if any symbols are in the actuals then we replace the symbol with
	// its value.
	//
	// The parameter formals can take 1 of 4 forms:
	//
	// Proper List: Tested
	// Improper List: Tested
	// Sole Value: Tested
	// Empty Value (a proper list with no values): Tested
	//
	//
	// The parameter actuals can take 1 of 2 forms:
	//
	// Proper List:
	// Empty Value (a proper list with no values):
	//
	// Returns: True if we successfully added all symbols to the symbol table, or
	// False if we have an issue with the forms of one of the forms listed above.
	//
	bindParameters : function ( formals, actuals ) {
						
		//
		// Checks for Sole Formal Form and Empty Value Form:
		//
		if ( formals.type === constants.SYMBOL ) {
			
			return symbolTable.push( formals, actuals );
		} 
		else if ( formals.type === constants.NULL ) {
						
			if ( actuals.type !== constants.NULL ) {
				
				console.log("Invalid number of parameters. There should be no actuals passed.");
				return constants.FALSE;
			}
			return constants.TRUE;
		}
				
		
		//
		// A formal must be a symbol and must have at least one actual to match it. 
		//
		if ( formals.car.type === constants.SYMBOL ) {
						
			if ( typeof actuals === "undefined" || actuals.type !== constants.CONS) {
				console.log('Invalid number of parameters. To few actuals were passed.');
				return constants.FALSE;
			}
			
			symbolTable.push( formals.car, actuals.car );
		}
		else {			
			console.log("All formals must be SYMBOLS and not NUMBERS or STRINGS.");
			return constants.FALSE;
		}
		
		
		//
		// If the next formal is null then we check to make sure that there are no more
		// actuals and return TRUE if not.
		//
		if( formals.cdr.type === constants.NULL ) {
			
			if ( actuals.cdr.type !== constants.NULL ) {
				
				console.log("Invalid number of parameters. The formals were in Proper List Form and need to match 1:1 with the actuals.");
				return constants.FALSE;
			}
			
			return constants.TRUE;
		}
		//
		// If the cdr is a symbol then we have an improper list which means that all of the remaining actuals are bound to
		// this symbol.
		//
		else if ( formals.cdr.type === constants.SYMBOL ) {
			
			
			if ( actuals.cdr.type === constants.NULL ) {
				
				console.log("Invalid number of parameters. Must contain at least as many as there are formals.");
				return constants.FALSE;
			}
			
			return symbolTable.push(formals.cdr, actuals.cdr);
		}
		//
		// Else we have more formals to check so we recusion through again.
		//
		else {
			
			if ( actuals.cdr.type === constants.NULL ) {
				
				console.log("Invalid number of parameters.");
				return constants.FALSE;
			}
			
			return this.bindParameters( formals.cdr, actuals.cdr );
		}
		
	},
	
	//
	// Check to see if a symbol is within a given list.
	//
	inList : function ( symbol, list ) {
			
		while ( list.type === constants.CONS ) {
		
			if ( list.car.val === symbol.val ) {
				return constants.TRUE;
			}
			
			list = list.cdr;
		}
		
		if ( 'val' in list && list.val === symbol.val ) {
			
			return constants.TRUE;
		}
		
		return constants.FALSE;
	},
	
	//
	// Helper function to close a lambda body.
	//
	closure : function ( body, formals ) {
		
		
		//
		// Here is where we are going to add closure.
		//
		// Look for any symbols that are not formals and eval them.
		//
		
		var arguments = body;
		var newList = helper.makeItem( constants.NULL );
		while ( arguments.type !== constants.NULL ) {
						
			newList = helper.makeCons( arguments.car,  newList);
			arguments = arguments.cdr;			
		}
		
		
		//
		// New list is in reverse order. We will loop through and up it in the correct order.
		//
		
		arguments = newList;
		newList = helper.makeItem( constants.NULL );
		
		while ( arguments.type !== constants.NULL ) {
		
			//
			// Is the symbol in the formals, if so then skip.
			// Else if it is in the alist and not a prim function then replace it with its value.
			//
			var value = arguments.car;
			
			if ( value.type === constants.SYMBOL ) {
				
				if ( this.inList( value, formals ) === constants.FALSE ) {
					
					var symbolTableValue = symbolTable.lookup( value );

					if ( symbolTableValue.type !== constants.PRIM ) {
						
						value = symbolTableValue;
					}
					
				}
			}
					
			newList = helper.makeCons( value,  newList );
			arguments = arguments.cdr;
		}
		
		//console.log(JSON.stringify( newList, null, 4));
		
		return helper.makeCons(newList, helper.makeItem(constants.NULL));
	}
	
}
