var alist = require('./symbolTable.js');
var helpers = require('./helpers.js');
var primFunctions = require('./primitives.js');

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
		
		alist.initialize();
		primFunctions.initialize();
		this.primfns = primFunctions.primfns;
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
		
		//
		// Set a key value pair of parameter name to sexpr
		//
		for (var i = 1; i < sexpr.length; i++) {
			
			parameters[lambda.parameters[i-1].val] = sexpr[i];
		}
		
		
		//
		// Replace all occurances of parameters with their sexpr
		//
		for (var i = 0; i < lambda.expression.length; i++) {
						
			if( typeof parameters[lambda.expression[i].val] !== "undefined" ) {
				
				lambda.expression[i] = parameters[lambda.expression[i].val];
			}
		}
		
		//
		// Evaluate the function expression.
		//
		return this.eval({ type:'LIST', val:lambda.expression });
	}	
};

module.exports = evaluation;