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


var primfns = [];

//
// Prim function for def
//
// TODO: make sure correct types.
//
primfns[1] = function (sexpr) {


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
	var value = eval(sexpr[2]);


	//
	// Insert into alist the new variable that was defined.
	//
	if (typeof value === 'number') {

		alist = makeCons( makeCons(variable, makeItem( 'NUMBER', value)),  alist);   
	}
	else if (typeof value === 'string') {

		alist = makeCons( makeCons(variable, makeItem( 'STRING', value)),  alist);
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

		alist = makeCons( makeCons(variable, value),  alist);
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
primfns[2] = function (sexpr) {

	console.log(sexpr);

	var plus = sexpr[0]; // The plus sign

	var value = eval(sexpr[1]); // The first element after the + sign goes on the left hand side of the plus sign.


	//
	// Loop through the rest of the elments and add them up.
	//
	for (var i = 2; i < sexpr.length; i++) {

		value += eval(sexpr[i]);
	}

	return value;
}

//
// Prim function for -
//
primfns[3] = function (sexpr) {

	var minus = sexpr[0]; // The minus sign

	var value = eval(sexpr[1]); // The first element after the - sign goes on the left hand side of the minus sign.


	//
	// Loop through the rest of the elments and subtract them up.
	//
	for (var i = 2; i < sexpr.length; i++) {

		value -= eval(sexpr[i]);
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
primfns[4] = function (sexpr) {

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
primfns[5] = function (sexpr) {

	var multiplcation = sexpr[0]; // The * sign

	var value = eval(sexpr[1]); // The first element after the * sign goes on the left hand side of the plus sign.


	//
	// Loop through the rest of the elments and add them up.
	//
	for (var i = 2; i < sexpr.length; i++) {

		value *= eval(sexpr[i]);
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
primfns[6] = function (sexpr) {

	var division = sexpr[0]; // The / sign

	var value = eval(sexpr[1]); // The first element after the / sign goes on the left hand side of the plus sign.


	//
	// Loop through the rest of the elments and add them up.
	//
	for (var i = 2; i < sexpr.length; i++) {

		value /= eval(sexpr[i]);
	}

	return value;
}



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
