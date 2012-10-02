//
// Lambda Function
//
// Prim function id: 11
//
//

module.exports = {

	lambda : function (sexpr) {

		var lambda = sexpr[0]; // The lambda keyword is the first token on the stack.
		var parameters = sexpr[1]; // The second token is the variable being defined.
		var body = sexpr[2]; // The third element is the expression of the function.
	
		return { type:'LAMBDA', parameters:parameters.val, expression:body.val };
	}
}

