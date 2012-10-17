var constants = require('./constants.js');

//
// All of the methods that are used to tokenize the users input string.
//
module.exports = {
	
	tokenized : null,
	
	//
	// Print the tokens from the last parsing.
	//
	print : function () {
		
		console.log('> Tokenized: ');
		console.log(JSON.stringify(this.tokenized, null, 4));
	},
	
	//
	// Create a new atom, this is either a SYMBOL, NUMBER, or STRING.
	//
	createAtom : function (identifier, value) { 
		
		return { type:identifier.toUpperCase(), val:value }; 	
	},
	
	//
	// Create a NULL token.
	//
	createNull : function () { 
		
		return { type:constants.NULL }; 
	},

	//
	// Create a standard cons with car and cdr fields.
	//
	// More info on internal structure can be found here:
	//		http://icem-www.folkwang-hochschule.de/~finnendahl/cm_kurse/doc/schintro/schintro_93.html
	//	
	createCons : function (car, cdr) {
	
		if( cdr == null ) {
			
			return { type:constants.CONS, car:car, cdr:this.createNull() };
		}
	
		return { type:constants.CONS, car:car, cdr:cdr };	
	}
}