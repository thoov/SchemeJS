var constants = require('./constants.js');
//
// This is where the symbol table or alist is stored. It also contains helper
// functions to search and store new items into the symbol table.
//

module.exports = {
	
	alist : { type:'NULL' },
	
	currentStackLevel : 0,
	
	makeCons : function ( car, cdr ) {
		return { type:'CONS', car:car, cdr:cdr };
	},
	makeItem : function ( identifier, value ) {
		
		if( value == null ) { // If value is null then we are creating a null token
			
			return { type:identifier.toUpperCase() };
		}
		
		return { type:identifier.toUpperCase(), val:value };
	},
	makePrimFunction : function ( number ) {
	
		return { type:'PRIM', val:number };
	},	
	initialize : function () {
		
		//
		// load the constants into the alist.
		//
		this.alist = this.makeCons( this.makeCons(this.makeItem( constants.SYMBOL , 'PI' ), this.makeItem( constants.NUMBER, 3.14)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( constants.SYMBOL , constants.TRUE ), this.makeItem( constants.BOOL , constants.TRUE )),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( constants.SYMBOL , constants.FALSE ), this.makeItem( constants.BOOL , constants.FALSE )),  this.alist);

	},
	
	lookup : function (symbol) {

		var alistPtr = this.alist;
	
		while (alistPtr.type !== constants.NULL) {

			if (alistPtr.car.car.val == symbol.val) {
	
				// The return value is like { type:'PRIM', val:1 } or { type:'NUMBER', val:23}
				return alistPtr.car.cdr;
			}
			else {
	
				alistPtr = alistPtr.cdr; // "advance the pointer"
	
				// If null then we are at the end of the alist.
				if ( alistPtr.type === constants.NULL ) { alistPtr = { type:constants.NULL }; } 
			}
		}
	
		return this.makeItem(constants.NULL);
	},
	
	//
	// Push runtime variables onto the symbol table. They are divided by stack levels.
	//
	push : function ( formal, actual ) {
		
		this.alist = this.makeCons( this.makeCons( this.makeItem( constants.SYMBOL , formal.val ), actual ),  this.alist );
	},
	
	//
	// Add primitive functions that are dynamically loaded to the symbol table.
	//
	pushPrimitive : function ( symbol, number ) {
		
		this.alist = this.makeCons( this.makeCons(this.makeItem( constants.SYMBOL, symbol), this.makePrimFunction(number)),  this.alist);
	},
	
	//
	// Push a runtime stack onto the symbol table.
	//
	pushStackLevel : function () {
		
		this.currentStackLevel = ++this.currentStackLevel;
		this.alist = this.makeCons( this.makeCons(this.makeItem( constants.LEVEL, "STACK LEVEL " + this.currentStackLevel ), this.makeItem( constants.NUMBER, this.currentStackLevel)),  this.alist);
	},
	
	//
	// Pop off the top stack level.
	//
	popOffTopStackLevel : function () {
		
		var alistPtr = this.alist;
				
		while ( alistPtr.type !== constants.NULL ) {
						
			this.alist = alistPtr;
			
			if ( alistPtr.car.car.type == constants.LEVEL ) {
						
				this.alist = alistPtr.cdr; // Pop off the stack level cons.
				break;
			}
			
			alistPtr = alistPtr.cdr; // "advance the pointer" 
		}

		this.currentStackLevel = --this.currentStackLevel;
		
		return constants.TRUE;
	},
	
	print : function () {

		var alistPtr = this.alist;
	
		while (alistPtr.type !== constants.NULL) {
	
			console.log(alistPtr.car.car.val + ' - ' + JSON.stringify(alistPtr.car.cdr) );
			alistPtr = alistPtr.cdr; // "advance the pointer"
	
			// If null then we are at the end of the alist.
			if ( alistPtr.type === constants.NULL ) { alistPtr = { type:constants.NULL }; }     
		}
	}
	
}