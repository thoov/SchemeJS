var helpers = require('./helpers.js');

//
// All of the methods that are used to tokenize the users input string.
//
module.exports = {
	
	tokenized : null,
	
	print : function () {
		
		console.log('> Tokenized: ');
		console.log(JSON.stringify(this.tokenized));
	},
	
	createItem : function (identifier, value) { return { type:identifier.toUpperCase(), val:value}; },
	createNull : function () { return { type:'NULL' }; },
	createList : function (x) { 
	
		if ( helpers.isArray(x) ) { return { type:'LIST', val:x }; }
	
		return { type:'LIST', val:[x] }; 
	},
	createCons : function (car, cdr) {
	
		if(cdr == null) {
			return { type:'CONS', car:car, cdr:this.createNull() };
		}
	
		return { type:'CONS', car:car, cdr:cdr };	
	},
	
	//
	// Turn an improper list into a proper list.
	//
	// Examples: 
	//    (+ 2 2 . ( 2 2) ) = (+ 2 2 2 2)
	//
	createDotList : function (x, y) { 
	
		var array = []; // this holds the "proper" array
	
		//
		// Before the dot
		//
		if ( helpers.isArray(x.val) ) {
	
			for ( var i = 0; i < x.val.length; i++ )
				array.push(x.val[i]);
		}
		else if(helpers.isArray(x)) {
	
		   for ( var i = 0; i < x.length; i++ )
				array.push(x[i]);
		}
		else { array.push(x); }
	
	
		//
		// After the dot
		//
		if ( helpers.isArray(y.val) ) {
	
			for ( var i = 0; i < y.val.length; i++ )
				array.push(y.val[i]);
		}
		else { array.push(y); }
	
		//
		// Turn the improper list into a proper list.
		//
		return this.createList(array);
	},
	
	
	//
	// Push list tokens into the "stack"
	//
	arrayAppend : function (x, y) { 
	
		if( helpers.isArray(x) ) { x.push(y); return x; }
	
		return [x,y];    
	}
}



