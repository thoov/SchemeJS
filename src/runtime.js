//
// This is the runtime stack.
//

module.exports = {

	activeRecord : { type:'NULL' },

	makeCons : function ( car, cdr ) {
		return { type:'CONS', car:car, cdr:cdr };
	},
	makeItem : function ( identifier, value ) {

		if( value == null ) { // If value is null then we are creating a null token

			return { type:identifier.toUpperCase() };
		}

		return { type:identifier.toUpperCase(), val:value };
	},

	initialize : function () {

	},

	search : function (symbol) {

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

	//
	// Push a symbol onto the stack.
	//
	push : function( symbol ) {
		
		
	},

	//
	// Pop symbols off of the runtime stack.
	//
	pop : function (symbol) {

	}
}