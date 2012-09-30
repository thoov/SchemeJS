console.log("Welcome to the Scheme REPL by Travis Hoover");

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write("> ");

process.argv.forEach(function (val, index, array) {
	if( val === '--debug' || val === '-d' ){
		DEBUG = true;
	}
});

//
// Here is the "REPL"
//
process.stdin.on('data', function (text) {

	text = text.trim();

	if( text != "" ) {

		if (text.toLowerCase() == 'print alist') {

			eval.printSymbols();
		}
		else if (text.toLowerCase() == 'print tokens') {

			//console.log('> Tokenized: ');
			//console.log(JSON.stringify(tokenized)); 
		}
		else {

			if( ( error_count = __NODEJS_parse( text, error_offsets, error_lookaheads ) ) > 0 ) {

				for( var i = 0; i < error_count; i++ )
					console.log( "Parse error near " + text.substr( error_offsets[i] ) + ", expecting \"" + error_lookaheads[i].join() + "\"" );
			}
			else {

				//console.log(eval(tokenized)); // Print the evaluated expression ( P )
			}
		}
	}
	process.stdout.write("> "); // now loop or wait for user input again ( L )
});