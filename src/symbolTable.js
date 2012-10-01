//
// This is where the symbol table or alist is stored. It also contains helper
// functions to search and store new items into the symbol table.
//

module.exports = {
	
	alist : { type:'NULL' },
	
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
		// load the primative functions and constants into the alist.
		//
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', 'def'), this.makePrimFunction(1)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', '+'), this.makePrimFunction(2)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', '-'), this.makePrimFunction(3)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', 'PI'), this.makeItem( 'NUMBER', 3.14)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', 'lambda'), this.makePrimFunction(4)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', '*'), this.makePrimFunction(5)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', '/'), this.makePrimFunction(6)),  this.alist);
		this.alist = this.makeCons( this.makeCons(this.makeItem( 'SYMBOL', '='), this.makePrimFunction(7)),  this.alist);
	},
	
	lookup : function (symbol) {

		var alistPtr = this.alist;
	
		while (alistPtr.type !== 'NULL') {
	
			if (alistPtr.car.car.val == symbol.val) {
	
				// The return value is like { type:'PRIM', val:1 } or { type:'NUMBER', val:23}
				return alistPtr.car.cdr;
			}
			else {
	
				alistPtr = alistPtr.cdr; // "advance the pointer"
	
				// If null then we are at the end of the alist.
				if (alistPtr.type === 'NULL') { alistPtr = { type:'NULL' }; } 
			}
		}
	
		return false;
	},
	
	remove : function (symbol) {
		
	},
	
	print : function () {

		var alistPtr = this.alist;
	
		while (alistPtr.type !== 'NULL') {
	
			console.log(alistPtr.car.car.val);
	
			alistPtr = alistPtr.cdr; // "advance the pointer"
	
			// If null then we are at the end of the alist.
			if (alistPtr.type === 'NULL') { alistPtr = { type:'NULL' }; }     
		}
	}
	
}