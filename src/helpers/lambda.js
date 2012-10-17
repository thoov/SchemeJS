var constants = require('../constants.js');
var symbolTable = require('../symbolTable.js');

module.exports = {
	
	bindParameters : function (formals, actuals) {
		
		
		//
		// Check for Sole Formal Form.
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
		
		
		
		if( formals.cdr.type === constants.NULL ) {
			
			//
			// We have a proper list and there should be no more actuals.
			//
			
			if ( actuals.cdr.type !== constants.NULL ) {
				
				console.log("Invalid number of parameters. The formals were in Proper List Form and need to match 1:1 with the actuals.");
				return constants.FALSE;
			}
			
			return constants.TRUE;
		}
		else if ( formals.cdr.type === constants.SYMBOL ) {
			
			//
			// We have a improper list and the rest of the actuals are bound to the final cdr parameter.
			//
			return symbolTable.push(formals.cdr, actuals.cdr);
		}
		else {
			
			return this.bindParameters( formals.cdr, actuals.cdr );
		}
		
	}
	
}
