var alist = require('./symbolTable.js');
alist.initialize();

var helpers = require('./helpers.js');

//
// The evaluation and lambda evaluation methods.
// Also contains the primitive functions.
//
var evaluation = {
	
	primfns : [],

	printSymbols : function () {
		alist.print();	
	},
	initialize : function () {
		
		//
		// Prim function for def
		//
		// TODO: make sure correct types.
		//
		this.primfns[1] = function (sexpr) {
		
		
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
		
		//
		// Prim function for +
		//
		this.primfns[2] = function (sexpr) {
					
			var plus = sexpr[0]; // The plus sign
	
			var value = evaluation.eval(sexpr[1]); // The first element after the + sign goes on the left hand side of the plus sign.
		
			//
			// Loop through the rest of the elments and add them up.
			//
			for (var i = 2; i < sexpr.length; i++) {
		
				value += evaluation.eval(sexpr[i]);
			}
		
			return value;
		}
		
		//
		// Prim function for -
		//
		this.primfns[3] = function (sexpr) {
		
			var minus = sexpr[0]; // The minus sign
		
			var value = evaluation.eval(sexpr[1]); // The first element after the - sign goes on the left hand side of the minus sign.
		
		
			//
			// Loop through the rest of the elments and subtract them up.
			//
			for (var i = 2; i < sexpr.length; i++) {
		
				value -= evaluation.eval(sexpr[i]);
			}
		
			return value;
		}
		
		//
		// Prim function for lambda
		//
		// (def exp (lambda (x) (* x x)))
		//
		// TODO: make sure correct types.
		//
		this.primfns[4] = function (sexpr) {
				
			var lambda = sexpr[0]; // The lambda keyword is the first token on the stack.
			var parameters = sexpr[1]; // The second token is the variable being defined.
			var body = sexpr[2]; // The third element is the expression of the function.
		
			return { type:'LAMBDA', parameters:parameters.val, expression:body.val };
		}
		
		//
		// Prim function for *
		//
		// (* 2 3 4)
		//
		// TODO: make sure correct types.
		//
		this.primfns[5] = function (sexpr) {
		
			var multiplcation = sexpr[0]; // The * sign
		
			var value = evaluation.eval(sexpr[1]); // The first element after the * sign goes on the left hand side of the plus sign.
		
		
			//
			// Loop through the rest of the elments and add them up.
			//
			for (var i = 2; i < sexpr.length; i++) {
		
				value *= evaluation.eval(sexpr[i]);
			}
		
			return value;
		}
		
		//
		// Prim function for /
		//
		// (/ 4 2)
		//
		// TODO: make sure correct types.
		//
		this.primfns[6] = function (sexpr) {
		
			var division = sexpr[0]; // The / sign
		
			var value = evaluation.eval(sexpr[1]); // The first element after the / sign goes on the left hand side of the plus sign.
		
		
			//
			// Loop through the rest of the elments and add them up.
			//
			for (var i = 2; i < sexpr.length; i++) {
		
				value /= evaluation.eval(sexpr[i]);
			}
		
			return value;
		}
		
	},
	
	invoke : function (number, sexpr) {
		
		return this.primfns[number](sexpr);
	},
	
	eval : function( SEXPR ) {


		var currentSexpr = SEXPR;
		var parentExpression = SEXPR;
				
		//
		// If the sexpr is a list then we want to eval the array.
		//
		if (SEXPR.type === 'LIST') {
			currentSexpr = SEXPR.val[0];
			parentExpression = SEXPR.val;
		}
		
		//
		// Look for anonymous lambda functions.
		//
		if( helpers.isArray(SEXPR.val) && SEXPR.val.length >= 2  ) {
			
			if(SEXPR.val[0].val[0].val == 'lambda') {

				return this.anonymous(SEXPR.val);
			}	
		}

		
		if (currentSexpr.type === 'SYMBOL') {
	
			var lookupValue = alist.lookup( currentSexpr );
	
			if (lookupValue.type === 'PRIM') {
	
				return this.invoke(lookupValue.val, parentExpression );
			}
			else if (lookupValue.type === 'LAMBDA') {
				
				return this.lambda( parentExpression, lookupValue );
			}
			else if (lookupValue.type !== 'NULL') {
	
				return lookupValue.val;
			}
			else {
	
				// Error invalid symbol not defined.  
				process.exit(1); 
			}
		}
		else if(currentSexpr.type === 'LIST') {
	
			return this.eval(currentSexpr.val);
		}
		else { // Numbers and strings
	
			return currentSexpr.val;
		}
	},
	
	lambda : function ( parentExpression, lambdaFunction ) {
		
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
		return this.eval({ type:'LIST', val:lambdaExpression });
	},
	
	anonymous : function ( sexpr ) {
		
		var lambda = this.invoke(4, sexpr[0].val); // the lambda function.		
		
		var parameters = [];
		
		for (var i = 1; i < sexpr.length; i++) {
			
			parameters[lambda.parameters[i-1].val] = sexpr[i];
		}
		
		
		for (var i = 0; i < lambda.expression.length; i++) {
						
			if( typeof parameters[lambda.expression[i].val] !== "undefined" ) {
				
				lambda.expression[i] = parameters[lambda.expression[i].val];
			}
		}
		
		//
		// Evaluate the function expression.
		//
		return this.eval({ type:'LIST', val:lambda.expression});
	}	
};

module.exports = evaluation;