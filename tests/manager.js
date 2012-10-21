var tokenizer = require('../src/tokenizer.js');
var parse = require('../src/parse.js');

module.exports = {

	run : function () {
		
		console.log("\n==== Running Tests ====\n");
		
		var parseTest = require('./parseTest.js');
		var TEST_COUNT = 0;
		var TEST_ERRORS = 0;
		var TEST_PASSES = 0;
		var PASSED = true;
		
		for ( i = 0; i < parseTest.tests.length; i++ ) {
		
			tokenizer.tokenize( parseTest.tests[i] );
		
			if ( JSON.stringify(parse.tokenized) != parseTest.expected[i] ) {
		
				console.log("Failed tests at: " + parseTest.tests[i]);
				console.log("Expected:  " + parseTest.expected[i]);
				console.log("Recieved:  " + JSON.stringify(parse.tokenized) + "\n");
				TEST_ERRORS++;
				PASSED = false;
			}
			else {
				TEST_PASSES++;
			}
		
		
			TEST_COUNT++;        
		}
		
		
		var evalTest = require('./evalTest.js');
		
		for ( i = 0; i < evalTest.tests.length; i++ ) {
				
			var eval = tokenizer.tokenize( evalTest.tests[i] );
			if ( eval != evalTest.expected[i] ) {
		
				console.log("Failed tests at: " + evalTest.tests[i]);
				console.log("Expected:  " + evalTest.expected[i]);
				console.log("Recieved:  " + eval + "\n");
				TEST_ERRORS++;
				PASSED = false;
			}
			else {
				TEST_PASSES++;
			}
		
		
			TEST_COUNT++;        
		}
		
		
		console.log(TEST_PASSES + " successfully tests");
		console.log(TEST_ERRORS + " failed tests");
		console.log(TEST_COUNT + " total tests\n");
		
		return PASSED;
	}
}
