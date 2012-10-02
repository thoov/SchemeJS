//
// Def Function
//
// Prim function id: 1
//

module.exports = {

	def : function (sexpr) {

		if (sexpr.length !== 3) {
	
			console.log('Invalid call of definition. Must have 3 elements, ' + sexpr.length + ' elements present.');
			process.exit(1);
		}
	
		var def = sexpr[0]; // The def keyword is the first token on the stack.
	
		var variable = sexpr[1]; // The second token is the variable being defined.
	
		if (variable.type !== 'SYMBOL') {
	
			console.log('Invalid definition type. Must be a symbol, a ' + variable.type + ' given.');
			process.exit(1);
		}
	
		//
		// The third param is the value for the variable
		// It can either be an atom or a sub list. We eval it to get a value.
		//
		var value = evaluation.eval(sexpr[2]);
	
	
		//
		// Insert into alist the new variable that was defined.
		//
		if (typeof value === 'number') {
	
			alist.alist = alist.makeCons( alist.makeCons(variable, alist.makeItem( 'NUMBER', value)), alist.alist);   
		}
		else if (typeof value === 'string') {
	
			alist.alist = alist.makeCons( alist.makeCons(variable, alist.makeItem( 'STRING', value)),  alist.alist);
		}
		else if (typeof value === 'object') {
	
			//
			// This is a lambda function. We need to go and rename variables.
			// Here we need to pre process functions to protect local variables.
			//
	
	
			var prefixFunctionName = variable;
			var prefixedParameterNames = [];
	
			//
			// Convert the old parameters into the new ones.
			//
			for (var i = 0; i < value.parameters.length; i++) {
				prefixedParameterNames.push( value.parameters[i].val );
	
				value.parameters[i].val = prefixFunctionName.val + '_' + value.parameters[i].val;
			}        
	
			//
			// Replace local variables with new names.
			//
			for (var i = 0; i < value.expression.length; i++) {
	
				if (prefixedParameterNames.contains(value.expression[i].val)) {
	
					value.expression[i].val = prefixFunctionName.val + '_' + value.expression[i].val;
				}
			}  
	
			alist.alist = alist.makeCons( alist.makeCons(variable, value),  alist.alist);
		}
		else {
	
			console.log("Feature not added yet.");
			process.exit(1);
		}
	
		return true;
	}
}