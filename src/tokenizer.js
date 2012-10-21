
/*
	Default template driver for JS/CC generated parsers running as
	browser-based JavaScript/ECMAScript applications.
	
	WARNING: 	This parser template will not run as console and has lesser
				features for debugging than the console derivates for the
				various JavaScript platforms.
	
	Features:
	- Parser trace messages
	- Integrated panic-mode error recovery
	
	Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
	
	This is in the public domain.
*/

var NODEJS__dbg_withtrace		= false;
var NODEJS__dbg_string			= new String();
if(NODEJS__dbg_withtrace){
	var fd = require("fs").openSync("NODEJS__dbg_withtrace.log", "w+");
	require('fs').writeSync(fd, new Date );
}
function __NODEJS_dbg_print( text )
{
	NODEJS__dbg_string += text + "\n";
}

function __NODEJS_lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 13;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 8 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 12 ) || ( info.src.charCodeAt( pos ) >= 14 && info.src.charCodeAt( pos ) <= 31 ) || info.src.charCodeAt( pos ) == 33 || ( info.src.charCodeAt( pos ) >= 35 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 43 ) || info.src.charCodeAt( pos ) == 45 || info.src.charCodeAt( pos ) == 47 || info.src.charCodeAt( pos ) == 58 || ( info.src.charCodeAt( pos ) >= 60 && info.src.charCodeAt( pos ) <= 63 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 95 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) ) state = 2;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 4;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 5;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
		else if( info.src.charCodeAt( pos ) == 34 ) state = 8;
		else if( info.src.charCodeAt( pos ) == 13 ) state = 9;
		else if( info.src.charCodeAt( pos ) == 32 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 59 ) state = 14;
		else state = -1;
		break;

	case 1:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 31 ) || ( info.src.charCodeAt( pos ) >= 33 && info.src.charCodeAt( pos ) <= 40 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 2:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 31 ) || ( info.src.charCodeAt( pos ) >= 33 && info.src.charCodeAt( pos ) <= 40 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 3:
		if( info.src.charCodeAt( pos ) == 32 ) state = 11;
		else state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 5:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 12;
		else state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 6:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 12;
		else if( info.src.charCodeAt( pos ) == 32 ) state = 16;
		else state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 7:
		state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 8:
		if( info.src.charCodeAt( pos ) == 34 ) state = 7;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 33 ) || ( info.src.charCodeAt( pos ) >= 35 && info.src.charCodeAt( pos ) <= 254 ) ) state = 8;
		else state = -1;
		break;

	case 9:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 31 ) || ( info.src.charCodeAt( pos ) >= 33 && info.src.charCodeAt( pos ) <= 40 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else if( info.src.charCodeAt( pos ) == 10 ) state = 2;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 10:
		if( info.src.charCodeAt( pos ) == 40 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 4;
		else state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 12:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 12;
		else state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 13:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 254 ) ) state = 13;
		else if( info.src.charCodeAt( pos ) == 10 ) state = 15;
		else state = -1;
		break;

	case 14:
		if( info.src.charCodeAt( pos ) == 10 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 32 || info.src.charCodeAt( pos ) == 41 ) state = 13;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 31 ) || ( info.src.charCodeAt( pos ) >= 33 && info.src.charCodeAt( pos ) <= 40 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 254 ) ) state = 14;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 15:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 16:
		state = -1;
		match = 5;
		match_pos = pos;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		
switch( match )
{
	case 5:
		{
		 info.att = parseFloat( info.att ); 
		}
		break;

	case 6:
		{
		 /*symbols cannot begin with digits, parens, quotes, dots, etc.*/ 
		}
		break;

	case 7:
		{
		 info.att = info.att.substr( 1, info.att.length - 2 ); 
		}
		break;

}


	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __NODEJS_parse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* readonce' */, 1 ),
	new Array( 9/* readonce */, 1 ),
	new Array( 8/* sexpr */, 1 ),
	new Array( 8/* sexpr */, 1 ),
	new Array( 11/* list */, 2 ),
	new Array( 11/* list */, 4 ),
	new Array( 11/* list */, 3 ),
	new Array( 11/* list */, 3 ),
	new Array( 11/* list */, 4 ),
	new Array( 12/* members */, 2 ),
	new Array( 12/* members */, 2 ),
	new Array( 12/* members */, 1 ),
	new Array( 10/* atom */, 1 ),
	new Array( 10/* atom */, 1 ),
	new Array( 10/* atom */, 1 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 ),
	/* State 1 */ new Array( 13/* "$" */,0 ),
	/* State 2 */ new Array( 13/* "$" */,-1 ),
	/* State 3 */ new Array( 13/* "$" */,-2 , 4/* "DOT" */,-2 , 5/* "NUMBER" */,-2 , 6/* "SYMBOL" */,-2 , 7/* "STRING" */,-2 , 3/* "LPAREN" */,-2 , 2/* "RPAREN" */,-2 ),
	/* State 4 */ new Array( 13/* "$" */,-3 , 4/* "DOT" */,-3 , 5/* "NUMBER" */,-3 , 6/* "SYMBOL" */,-3 , 7/* "STRING" */,-3 , 3/* "LPAREN" */,-3 , 2/* "RPAREN" */,-3 ),
	/* State 5 */ new Array( 13/* "$" */,-12 , 4/* "DOT" */,-12 , 5/* "NUMBER" */,-12 , 6/* "SYMBOL" */,-12 , 7/* "STRING" */,-12 , 3/* "LPAREN" */,-12 , 2/* "RPAREN" */,-12 ),
	/* State 6 */ new Array( 13/* "$" */,-13 , 4/* "DOT" */,-13 , 5/* "NUMBER" */,-13 , 6/* "SYMBOL" */,-13 , 7/* "STRING" */,-13 , 3/* "LPAREN" */,-13 , 2/* "RPAREN" */,-13 ),
	/* State 7 */ new Array( 13/* "$" */,-14 , 4/* "DOT" */,-14 , 5/* "NUMBER" */,-14 , 6/* "SYMBOL" */,-14 , 7/* "STRING" */,-14 , 3/* "LPAREN" */,-14 , 2/* "RPAREN" */,-14 ),
	/* State 8 */ new Array( 2/* "RPAREN" */,11 , 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 ),
	/* State 9 */ new Array( 2/* "RPAREN" */,12 , 4/* "DOT" */,15 , 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 ),
	/* State 10 */ new Array( 2/* "RPAREN" */,17 , 4/* "DOT" */,15 , 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 ),
	/* State 11 */ new Array( 13/* "$" */,-4 , 2/* "RPAREN" */,-4 , 4/* "DOT" */,-4 , 5/* "NUMBER" */,-4 , 6/* "SYMBOL" */,-4 , 7/* "STRING" */,-4 , 3/* "LPAREN" */,-4 ),
	/* State 12 */ new Array( 13/* "$" */,-7 , 2/* "RPAREN" */,-7 , 4/* "DOT" */,-7 , 5/* "NUMBER" */,-7 , 6/* "SYMBOL" */,-7 , 7/* "STRING" */,-7 , 3/* "LPAREN" */,-7 ),
	/* State 13 */ new Array( 2/* "RPAREN" */,18 ),
	/* State 14 */ new Array( 4/* "DOT" */,15 , 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 , 2/* "RPAREN" */,-11 ),
	/* State 15 */ new Array( 5/* "NUMBER" */,5 , 6/* "SYMBOL" */,6 , 7/* "STRING" */,7 , 3/* "LPAREN" */,8 ),
	/* State 16 */ new Array( 2/* "RPAREN" */,21 ),
	/* State 17 */ new Array( 13/* "$" */,-6 , 2/* "RPAREN" */,-6 , 4/* "DOT" */,-6 , 5/* "NUMBER" */,-6 , 6/* "SYMBOL" */,-6 , 7/* "STRING" */,-6 , 3/* "LPAREN" */,-6 ),
	/* State 18 */ new Array( 13/* "$" */,-8 , 2/* "RPAREN" */,-8 , 4/* "DOT" */,-8 , 5/* "NUMBER" */,-8 , 6/* "SYMBOL" */,-8 , 7/* "STRING" */,-8 , 3/* "LPAREN" */,-8 ),
	/* State 19 */ new Array( 2/* "RPAREN" */,-9 ),
	/* State 20 */ new Array( 2/* "RPAREN" */,-10 ),
	/* State 21 */ new Array( 13/* "$" */,-5 , 2/* "RPAREN" */,-5 , 4/* "DOT" */,-5 , 5/* "NUMBER" */,-5 , 6/* "SYMBOL" */,-5 , 7/* "STRING" */,-5 , 3/* "LPAREN" */,-5 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 9/* readonce */,1 , 8/* sexpr */,2 , 10/* atom */,3 , 11/* list */,4 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array(  ),
	/* State 4 */ new Array(  ),
	/* State 5 */ new Array(  ),
	/* State 6 */ new Array(  ),
	/* State 7 */ new Array(  ),
	/* State 8 */ new Array( 11/* list */,9 , 10/* atom */,10 ),
	/* State 9 */ new Array( 12/* members */,13 , 8/* sexpr */,14 , 10/* atom */,3 , 11/* list */,4 ),
	/* State 10 */ new Array( 12/* members */,16 , 8/* sexpr */,14 , 10/* atom */,3 , 11/* list */,4 ),
	/* State 11 */ new Array(  ),
	/* State 12 */ new Array(  ),
	/* State 13 */ new Array(  ),
	/* State 14 */ new Array( 12/* members */,19 , 8/* sexpr */,14 , 10/* atom */,3 , 11/* list */,4 ),
	/* State 15 */ new Array( 8/* sexpr */,20 , 10/* atom */,3 , 11/* list */,4 ),
	/* State 16 */ new Array(  ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array(  ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"readonce'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"RPAREN" /* Terminal symbol */,
	"LPAREN" /* Terminal symbol */,
	"DOT" /* Terminal symbol */,
	"NUMBER" /* Terminal symbol */,
	"SYMBOL" /* Terminal symbol */,
	"STRING" /* Terminal symbol */,
	"sexpr" /* Non-terminal symbol */,
	"readonce" /* Non-terminal symbol */,
	"atom" /* Non-terminal symbol */,
	"list" /* Non-terminal symbol */,
	"members" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __NODEJS_lex( info );
	while( true )
	{
		act = 23;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		if( NODEJS__dbg_withtrace && sstack.length > 0 )
		{
			__NODEJS_dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 23 )
		{
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 23 && la != 13 )
			{
				if( NODEJS__dbg_withtrace )
					__NODEJS_dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 23 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 23;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 23 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __NODEJS_lex( info );
			}
			
			if( act == 23 )
			{
				if( NODEJS__dbg_withtrace )
					__NODEJS_dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 23 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{			
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __NODEJS_lex( info );
			
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		 parse.tokenized = vstack[ vstack.length - 1 ]; 
	}
	break;
	case 2:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 3:
	{
		 rval = vstack[ vstack.length - 1 ]; 
	}
	break;
	case 4:
	{
		 rval = parse.createNull(); 
	}
	break;
	case 5:
	{
		 rval = parse.createCons(vstack[ vstack.length - 3 ], vstack[ vstack.length - 2 ]); /* a list must first start with a symbol */ 
	}
	break;
	case 6:
	{
		 rval = parse.createCons(vstack[ vstack.length - 2 ]); 
	}
	break;
	case 7:
	{
		 rval = parse.createCons(parse.createCons(vstack[ vstack.length - 2 ])); 
	}
	break;
	case 8:
	{
		 rval = parse.createCons(parse.createCons(vstack[ vstack.length - 3 ]), vstack[ vstack.length - 2 ]); 
	}
	break;
	case 9:
	{
		 rval = parse.createCons(vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 10:
	{
		 rval = vstack[ vstack.length - 1 ]; 
	}
	break;
	case 11:
	{
		 rval = parse.createCons(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 12:
	{
		 rval = parse.createAtom('NUMBER', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 13:
	{
		 rval = parse.createAtom('SYMBOL', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 14:
	{
		 rval = parse.createAtom('STRING', vstack[ vstack.length - 1 ]); 
	}
	break;
}



			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( act == 0 )
				break;
				
			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
		
		if( NODEJS__dbg_withtrace )
		{	
				
			require('fs').writeSync(fd, NODEJS__dbg_string );
			NODEJS__dbg_string = new String();
		}
	}

	if( NODEJS__dbg_withtrace )
	{
		__NODEJS_dbg_print( "\nParse complete." );
		require('fs').writeSync(fd, NODEJS__dbg_string );
		NODEJS__dbg_string = new String();
	}
	
	return err_cnt;
}




var error_offsets = new Array();
var error_lookaheads = new Array();
var error_count = 0;
var evaluation = require('../src/eval.js');
var parse = require('../src/parse.js');

module.exports = {
	
	tokenize : function ( TEXT ) {
		
		if( ( error_count = __NODEJS_parse( TEXT.trim(), error_offsets, error_lookaheads ) ) > 0 ) {
		
			for( var i = 0; i < error_count; i++ )
				console.log( "Parse error near:_" + TEXT.substr( error_offsets[i] ) + ", expecting \"" + error_lookaheads[i].join() + "\"" );
		}
		else {
		
			var eval = evaluation.eval(parse.tokenized);
				
			if ( eval === undefined ) 
				return null;
				
			//
			// TODO: If we have a cons at this point then we need to turn it into "scheme" to be printed.
			//
			
			return eval;
		}
	}	
}

