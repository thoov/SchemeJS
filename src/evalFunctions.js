//
// Alist is the symbol table.
//
// Holds all of the symbols and their values along with primative functions.
//
var alist = { type:'NULL' };

//
// Constants
//
var NUMBER = 'NUMBER';
var SYMBOL = 'SYMBOL';
var STRING = 'STRING';
var CONS   = 'CONS';
var PRIM   = 'PRIM';

//
// Load the primitive functions.
//
require('./primitiveFunctions');


//
// Make functions for the alist
//
var makeItem = function (identifier, value) {
	
	if( value == null ) { // If value is null then we are creating a null token
		
		return { type:identifier.toUpperCase() };
	}
	
	return { type:identifier.toUpperCase(), val:value };
}

var makeCons = function ( car, cdr ) {

	return { type:CONS, car:car, cdr:cdr };
}
var makePrimFunction = function ( number ) {
	
	return { type:PRIM, val:number };
}



//
// load the primative functions and constants into the alist.
//
alist = makeCons( makeCons(makeItem( SYMBOL, 'def'), makePrimFunction(1)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, '+'), makePrimFunction(2)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, '-'), makePrimFunction(3)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, 'PI'), makeItem( NUMBER, 3.14)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, 'lambda'), makePrimFunction(4)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, '*'), makePrimFunction(5)),  alist);
alist = makeCons( makeCons(makeItem( SYMBOL, '/'), makePrimFunction(6)),  alist);





//
// Loopup symbols inside of the alist.
//
// @param symbol - The symbol to find inside of the alist.
// @return - { type:'PRIM', val:1 } or { type:'NUMBER', val:23} or false if not found.
//
var lookup = function (symbol) {

	var alistPtr = alist;

	while (alistPtr.type !== 'NULL') {

		if (alistPtr.car.car.val == symbol.val) {

			// The return value is like { type:'PRIM', val:1 } or { type:'NUMBER', val:23}
			return alistPtr.car.cdr;
		}
		else {

			alistPtr = alistPtr.cdr; // "advance the pointer"

			// If null then we are at the end of the alist.
			if (alistPtr.type === 'NULL') { alistPtr = { type:'NULL' }; } 
		}
	}

	return false;
}

//
// Print the symbols in the alist. Used only for debugging.
//
GLOBAL.listSymbols = function () {

	var alistPtr = alist;

	while (alistPtr.type !== 'NULL') {

		console.log(alistPtr.car.car.val);

		alistPtr = alistPtr.cdr; // "advance the pointer"

		// If null then we are at the end of the alist.
		if (alistPtr.type === 'NULL') { alistPtr = { type:'NULL' }; }     
	}
}

var evalLambda = function ( parentExpression, lambdaFunction ) {

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

		alist = makeCons( makeCons(lambdaParameters[j], makeNumber(parentExpression[i].val)),  alist);
	}

	//
	// Evaluate the function expression.
	//
	return eval({ type:'LIST', val:lambdaExpression });
}


//
// Evaluation function. Pops off sexpr from a tokenized stack of sexpr.
//
// @param SEXPR - A stack of sexpr expressions to be evaluated.
// @param RETURN - Return the value of an individual token.
//
GLOBAL.eval = function( SEXPR ) {

	var currentSexpr = SEXPR;
	var parentExpression = SEXPR;

	//
	// If the sexpr is a list then we want to eval the array.
	//
	if (SEXPR.type === 'LIST') {
		currentSexpr = SEXPR.val[0];
		parentExpression = SEXPR.val;
	}


	if (currentSexpr.type === 'SYMBOL') {

		var lookupValue = lookup( currentSexpr );

		if (lookupValue.type === 'PRIM') {

			return primfns[lookupValue.val]( parentExpression );
		}
		else if (lookupValue.type === 'LAMBDA') {

			return evalLambda( parentExpression, lookupValue );
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

		return eval(currentSexpr.val);
	}
	else { // Numbers and strings

		return currentSexpr.val;
	}
}
