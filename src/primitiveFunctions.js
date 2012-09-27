
//
// The evaluation functions.
//
require('./evalFunctions.js');

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

		alist = makeCons( makeCons(variable, makeNumber(value)),  alist);   
	}
	else if (typeof value === 'string') {

		alist = makeCons( makeCons(variable, makeString(value)),  alist);
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


GLOBAL.primfns = primfns;