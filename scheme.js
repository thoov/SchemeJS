var tokenizer = require('./src/tokenizer.js');
var parse = require('./src/parse.js');
var evaluation = require('./src/eval.js');
var constants = require('./src/constants.js');
evaluation.initialize();


var DEBUG = false;
var TESTS = false;
var FILE = false;
var PASSED = true;

console.log("Welcome to the Scheme REPL");

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.argv.forEach(function (val, index, array) {

	if( val === '-f' ){

		FILE = array[index + 1];
	}
	else if( val === '-t' ) {

		TESTS = true;
	}
});

if (TESTS) {

	var tests = require('./tests/manager.js');
	PASSED = tests.run();
}

//
// If we passed all of the test go to the REPL.
//
if (PASSED) {
	if( !FILE ) process.stdout.write("> ");
}
else
	process.exit(1);



if ( FILE ) {
	
	var sourceFileHelper = require('./src/helpers/sourceFile.js');
	sourceFileHelper.run( FILE );
}


process.stdin.on('data', function (text) {


	text = text.trim();

	if( text != "" ) {

		if (text.toLowerCase() == 'print alist') {

			evaluation.printSymbols();
		}
		else if (text.toLowerCase() == 'print tokens') {

			parse.print(); 
		}
		else {

			var result = tokenizer.tokenize( text );
			if ( result !== null )
				console.log(tokenizer.tokenize( text ));
		}
	}
	process.stdout.write("> ");
});
