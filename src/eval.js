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
		this.primfns[1] = require('./lib/def.js').def;
		
		//
		// Prim function for +
		//
		this.primfns[2] = require('./lib/plus.js').plus;
		
		//
		// Prim function for -
		//
		this.primfns[3] = require('./lib/minus.js').minus;
		
		//
		// Prim function for lambda
		//
		// (def exp (lambda (x) (* x x)))
		//
		this.primfns[4] = require('./lib/lambda.js').lambda;
		
		//
		// Prim function for *
		//
		// (* 2 3 4)
		//
		this.primfns[5] = require('./lib/multiply.js').multiply;
		
		//
		// Prim function for /
		//
		// (/ 4 2)
		//
		this.primfns[6] = require('./lib/divide.js').divide;
		
		//
		// Prim function for equals = 
		//
		// (= 0 1)
		//
		this.primfns[7] = require('./lib/equals.js').equals;
		
		//
		// Prim function for if
		//
		// (if TEST THEN
		//				ELSE)
		//
		this.primfns[8] = require('./lib/if.js').if;
		
		//
		// Prim function for quote
		//
		// (quote 1) => 1
		// (quote "testing") => "testing"
		// (quote a) => a
		// (quote (1 2)) => (1 2)
		// (quote ()) => ()
		//
		//
		this.primfns[9] = require('./lib/quote.js').quote;
		
		//
		// Prim function for cons
		//
		// (cons 1 2) => (1 . 2)
		//
		this.primfns[10] = require('./lib/cons.js');
		
		
		
		//
		// Prim function for length
		//
		// (length (23 23 23))
		// 		=> 3
		//
		this.primfns[11] = require('./lib/length.js').len;
		
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