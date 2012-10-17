var evaluation = require('./eval.js');
var symbolTable = require('./symbolTable.js');

//
//
// All of the primitive functions or built-in functions.
//
//
module.exports = {
	
	primfns : [],
	
	initialize : function() {
		
		/*
		// 
		// Load all of the primitive functions that are in lib.
		//
		var pFunctions = [];
		var count = 0;
		require("fs").readdirSync("./src/lib").forEach(function(file) {
			
			// TODO: make sure they are only .js files.
			
			var functionName = file.substr(0, 3);
			console.log(file)
			pFunctions[++count] = require('./lib/' + file)[functionName];
		});


		console.log(pFunctions);		
		*/
		
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
		this.primfns[8] = require('./lib/iff.js').iff;
		
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
		this.primfns[11] = require('./lib/length.js').length;
		
	}
}