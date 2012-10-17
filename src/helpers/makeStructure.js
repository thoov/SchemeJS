

module.exports = {
	
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
	}
}