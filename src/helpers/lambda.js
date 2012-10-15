

module.exports = {

	parameterChecking : function ( actuals, formals ) {

		/*		
		Proper List - Each member of the list must be a symbol, and each is a formal argument. When calling this lambda form, the arity of formals and actuals must match.
		Improper List - Each member of the list must be a symbol and the improper tail must also be a symbol. When calling this lambda form, formals (symbols) are bound with actuals with the improper tail being bound to a list of remaining actuals, thus the number of actuals must be the same or exceed the number of formals.
		Sole Symbol - is the formal argument representing all the formals. When calling the lambda form, the symbol is bound to a list of all the actuals.		
		*/
				
		var formalType = null;
		var numberOfFormals = 0;
		if (formals.type === constants.SYMBOL) {
			formalType = 'SOLE_SYMBOL';
			numberOfFormals = 1;
		}
		else {
			var formalCheck = formals;
			while ( true ) {
							
				if ( formalCheck.type === constants.NULL ) {
					formalType = 'PROPER_LIST';
					break;
				}
				else if ( formalCheck.type === constants.SYMBOL ) {
					formalType = 'IMPROPER_LIST';
					numberOfFormals++;
					break;
				}
				else if ( formalCheck.type === constants.NUMBER || formalCheck.type === constants.STRING ) {
					console.log("Formals cannot contain numbers of strings.");
					return constants.FALSE;
				}
				formalCheck = formalCheck.cdr;
				numberOfFormals++;
			}
		}
		
		var actualCheck = actuals;
		var numberOfActuals = 0;
		while ( true ) {
						
			if ( actualCheck.type === constants.NULL ) {
				break;
			}
			else if ( actualCheck.type === constants.SYMBOL || actualCheck.type === constants.NUMBER || actualCheck.type === constants.STRING ) {
				numberOfActuals++;
				break;
			}
		
			actualCheck = actualCheck.cdr;
			numberOfActuals++;
		}
		
		switch (formalType) {
			
			case 'SOLE_SYMBOL':
				break;
				
			case 'IMPROPER_LIST':
				
				if ( numberOfActuals >= numberOfFormals )
					break;
			
			case 'PROPER_LIST': 
			
				if ( numberOfActuals === numberOfFormals )
					break; 
				
			default:
				console.log("Invalid number of parameters.");
				return constants.FALSE;	
		}
		
	}
}
