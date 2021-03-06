var constants = require('../constants.js');
var helper = require('../helpers/makeStructure.js');
var evaluation = require('../eval.js');

module.exports = {

	symbol : "list",
	
	list : function ( SEXPR ) {

		var arguments = SEXPR;
		
		var list = helper.makeItem( constants.NULL );
		
		while ( arguments.type !== constants.NULL ) {

			var value = evaluation.eval(arguments.car);
			
			if (typeof value === 'number') {
			
				list = helper.makeCons( helper.makeItem( constants.NUMBER , value ),  list);
			}
			else if (typeof value === 'string') {
			
				list = helper.makeCons( helper.makeItem( constants.STRING , value.substr(1, value.length - 2) ),  list);
			}
			else {		
				
				list = helper.makeCons( value,  list);
			}

			arguments = arguments.cdr;			
		}
		
		
		//
		// TODO: This is a very lazy implementation basically the while statments create a list but in reverse order.
		// So we do it twice to create a list in the correct order.
		//
		
		arguments = list;
		
		list = helper.makeItem( constants.NULL );
		
		while ( arguments.type !== constants.NULL ) {
		
			var value = evaluation.eval(arguments.car);
			
			if (typeof value === 'number') {
			
				list = helper.makeCons( helper.makeItem( constants.NUMBER , value ),  list);
			}
			else if (typeof value === 'string') {
			
				list = helper.makeCons( helper.makeItem( constants.STRING , value.substr(1, value.length - 2) ),  list);
			}
			else {		
				
				list = helper.makeCons( value,  list);
			}
		
			arguments = arguments.cdr;			
		}
								
		return list;
	},
	
	
	rlist : function ( SEXPR ) {
		
		
	}
}