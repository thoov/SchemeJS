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
		
		
		// 
		// Load all of the primitive functions that are in lib.
		//
		var pFunctions = [];
		var count = 0;
		require("fs").readdirSync("./src/lib").forEach(function(file) {
		
			//
			// Only require javascript files in lib folder.
			//	
			if ( file.substr(file.length - 3, file.length).toLowerCase() === '.js' ) {
				
				var functionName = file.substr(0, file.length - 3);
				
				var primitiveFile = require('./lib/' + file);
				
				pFunctions[++count] = primitiveFile[functionName];
				
				// Add this to the symbol table.
				symbolTable.pushPrimitive( primitiveFile.symbol, count );
			}
			
		});
		
		this.primfns = pFunctions;		
	}
}