var tokenizer = require('../tokenizer.js');	

module.exports = {
	
	run : function ( FILE ) {
		
		var fs = require('fs');
		var array = fs.readFileSync(FILE).toString().split("\n");
		
		
		for(i in array) {
		
			console.log(tokenizer.tokenize(array[i]));
		}
	}
}