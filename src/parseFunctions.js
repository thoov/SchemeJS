GLOBAL.tokenized = null;
GLOBAL.createItem = function (identifier, value) { return { type:identifier.toUpperCase(), val:value}; };
GLOBAL.createNull = function () { return { type:'NULL' }; }
GLOBAL.createList = function (x) { 

	if ( isArray(x) ) { return { type:'LIST', val:x }; }

	return { type:'LIST', val:[x] }; 
}

//
// Turn an improper list into a proper list.
//
// Examples: 
//    (+ 2 2 . ( 2 2) ) = (+ 2 2 2 2)
//
GLOBAL.createDotList = function (x, y) { 

	var array = []; // this holds the "proper" array

	//
	// Before the dot
	//
	if ( isArray(x.val) ) {

		for ( var i = 0; i < x.val.length; i++ )
			array.push(x.val[i]);
	}
	else if(isArray(x)) {

	   for ( var i = 0; i < x.length; i++ )
			array.push(x[i]);
	}
	else { array.push(x); }


	//
	// After the dot
	//
	if ( isArray(y.val) ) {

		for ( var i = 0; i < y.val.length; i++ )
			array.push(y.val[i]);
	}
	else { array.push(y); }

	//
	// Turn the improper list into a proper list.
	//
	return createList(array);
}

//
// Push list tokens into the "stack"
//
GLOBAL.arrayAppend = function (x, y) { 

	if( isArray(x) ) { x.push(y); return x; }

	return [x,y];    
}
