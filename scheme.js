
var sexprCount = 0;
var NIL = {type:'NIL', val: null};
var list = function (x, y) { return cons(x, cons(y, NIL)); };
var quote = function (x) { return list(intern("quote", x)); };
var backquote = function (x) {return list(intern("backquote", x)); };
var comma = function (x)  {return list(intern("comma", x)); };
var at = function (x)  {return list(intern("at", x)); };
var append_improper_tail = function (list, x) { return FIXME; };
var cons = function (x,y) {return {type:'CONS', val:[x,y]}; };
var intern = function (x) {return {type:'SYMBOL', val:x}; };
var dump = function (x) { print(JSON.stringify(x)); };

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
			return 17;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 8 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 12 ) || ( info.src.charCodeAt( pos ) >= 14 && info.src.charCodeAt( pos ) <= 31 ) || ( info.src.charCodeAt( pos ) >= 33 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 42 && info.src.charCodeAt( pos ) <= 43 ) || info.src.charCodeAt( pos ) == 45 || info.src.charCodeAt( pos ) == 47 || info.src.charCodeAt( pos ) == 58 || ( info.src.charCodeAt( pos ) >= 60 && info.src.charCodeAt( pos ) <= 63 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 95 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 32 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 39 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 4;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 5;
		else if( info.src.charCodeAt( pos ) == 44 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 7;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 8;
		else if( info.src.charCodeAt( pos ) == 64 ) state = 9;
		else if( info.src.charCodeAt( pos ) == 96 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 13 ) state = 11;
		else if( info.src.charCodeAt( pos ) == 59 ) state = 13;
		else state = -1;
		break;

	case 1:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 2:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 5:
		state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 7:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 12;
		else state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 8:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 8;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 12;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 10:
		state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 11:
		if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 254 ) ) state = 1;
		else if( info.src.charCodeAt( pos ) == 10 ) state = 2;
		else state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 12:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 12;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 13:
		if( info.src.charCodeAt( pos ) == 10 ) state = 2;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 254 ) ) state = 13;
		else state = -1;
		match = 10;
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
	case 9:
		{
		 info.att = parseFloat( info.att ); 
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
	new Array( 13/* readonce */, 1 ),
	new Array( 12/* sexpr */, 1 ),
	new Array( 12/* sexpr */, 1 ),
	new Array( 12/* sexpr */, 2 ),
	new Array( 12/* sexpr */, 2 ),
	new Array( 12/* sexpr */, 2 ),
	new Array( 12/* sexpr */, 2 ),
	new Array( 14/* list */, 2 ),
	new Array( 14/* list */, 3 ),
	new Array( 14/* list */, 5 ),
	new Array( 16/* members */, 2 ),
	new Array( 16/* members */, 1 ),
	new Array( 15/* atom */, 1 ),
	new Array( 15/* atom */, 1 ),
	new Array( 15/* atom */, 1 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 1 */ new Array( 17/* "$" */,0 ),
	/* State 2 */ new Array( 17/* "$" */,-1 ),
	/* State 3 */ new Array( 17/* "$" */,-2 , 2/* "RPAREN" */,-2 , 4/* "DOT" */,-2 , 5/* "QUOTE" */,-2 , 6/* "BACKQUOTE" */,-2 , 7/* "COMMA" */,-2 , 8/* "AT" */,-2 , 3/* "LPAREN" */,-2 , 9/* "NUMBER" */,-2 , 10/* "SYMBOL" */,-2 , 11/* "STRING" */,-2 ),
	/* State 4 */ new Array( 17/* "$" */,-3 , 2/* "RPAREN" */,-3 , 4/* "DOT" */,-3 , 5/* "QUOTE" */,-3 , 6/* "BACKQUOTE" */,-3 , 7/* "COMMA" */,-3 , 8/* "AT" */,-3 , 3/* "LPAREN" */,-3 , 9/* "NUMBER" */,-3 , 10/* "SYMBOL" */,-3 , 11/* "STRING" */,-3 ),
	/* State 5 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 6 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 7 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 8 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 9 */ new Array( 2/* "RPAREN" */,18 , 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 10 */ new Array( 17/* "$" */,-13 , 2/* "RPAREN" */,-13 , 4/* "DOT" */,-13 , 5/* "QUOTE" */,-13 , 6/* "BACKQUOTE" */,-13 , 7/* "COMMA" */,-13 , 8/* "AT" */,-13 , 3/* "LPAREN" */,-13 , 9/* "NUMBER" */,-13 , 10/* "SYMBOL" */,-13 , 11/* "STRING" */,-13 ),
	/* State 11 */ new Array( 17/* "$" */,-14 , 2/* "RPAREN" */,-14 , 4/* "DOT" */,-14 , 5/* "QUOTE" */,-14 , 6/* "BACKQUOTE" */,-14 , 7/* "COMMA" */,-14 , 8/* "AT" */,-14 , 3/* "LPAREN" */,-14 , 9/* "NUMBER" */,-14 , 10/* "SYMBOL" */,-14 , 11/* "STRING" */,-14 ),
	/* State 12 */ new Array( 17/* "$" */,-15 , 2/* "RPAREN" */,-15 , 4/* "DOT" */,-15 , 5/* "QUOTE" */,-15 , 6/* "BACKQUOTE" */,-15 , 7/* "COMMA" */,-15 , 8/* "AT" */,-15 , 3/* "LPAREN" */,-15 , 9/* "NUMBER" */,-15 , 10/* "SYMBOL" */,-15 , 11/* "STRING" */,-15 ),
	/* State 13 */ new Array( 17/* "$" */,-4 , 2/* "RPAREN" */,-4 , 4/* "DOT" */,-4 , 5/* "QUOTE" */,-4 , 6/* "BACKQUOTE" */,-4 , 7/* "COMMA" */,-4 , 8/* "AT" */,-4 , 3/* "LPAREN" */,-4 , 9/* "NUMBER" */,-4 , 10/* "SYMBOL" */,-4 , 11/* "STRING" */,-4 ),
	/* State 14 */ new Array( 17/* "$" */,-5 , 2/* "RPAREN" */,-5 , 4/* "DOT" */,-5 , 5/* "QUOTE" */,-5 , 6/* "BACKQUOTE" */,-5 , 7/* "COMMA" */,-5 , 8/* "AT" */,-5 , 3/* "LPAREN" */,-5 , 9/* "NUMBER" */,-5 , 10/* "SYMBOL" */,-5 , 11/* "STRING" */,-5 ),
	/* State 15 */ new Array( 17/* "$" */,-6 , 2/* "RPAREN" */,-6 , 4/* "DOT" */,-6 , 5/* "QUOTE" */,-6 , 6/* "BACKQUOTE" */,-6 , 7/* "COMMA" */,-6 , 8/* "AT" */,-6 , 3/* "LPAREN" */,-6 , 9/* "NUMBER" */,-6 , 10/* "SYMBOL" */,-6 , 11/* "STRING" */,-6 ),
	/* State 16 */ new Array( 17/* "$" */,-7 , 2/* "RPAREN" */,-7 , 4/* "DOT" */,-7 , 5/* "QUOTE" */,-7 , 6/* "BACKQUOTE" */,-7 , 7/* "COMMA" */,-7 , 8/* "AT" */,-7 , 3/* "LPAREN" */,-7 , 9/* "NUMBER" */,-7 , 10/* "SYMBOL" */,-7 , 11/* "STRING" */,-7 ),
	/* State 17 */ new Array( 2/* "RPAREN" */,21 , 4/* "DOT" */,22 , 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 18 */ new Array( 17/* "$" */,-8 , 2/* "RPAREN" */,-8 , 4/* "DOT" */,-8 , 5/* "QUOTE" */,-8 , 6/* "BACKQUOTE" */,-8 , 7/* "COMMA" */,-8 , 8/* "AT" */,-8 , 3/* "LPAREN" */,-8 , 9/* "NUMBER" */,-8 , 10/* "SYMBOL" */,-8 , 11/* "STRING" */,-8 ),
	/* State 19 */ new Array( 2/* "RPAREN" */,-12 , 4/* "DOT" */,-12 , 5/* "QUOTE" */,-12 , 6/* "BACKQUOTE" */,-12 , 7/* "COMMA" */,-12 , 8/* "AT" */,-12 , 3/* "LPAREN" */,-12 , 9/* "NUMBER" */,-12 , 10/* "SYMBOL" */,-12 , 11/* "STRING" */,-12 ),
	/* State 20 */ new Array( 2/* "RPAREN" */,-11 , 4/* "DOT" */,-11 , 5/* "QUOTE" */,-11 , 6/* "BACKQUOTE" */,-11 , 7/* "COMMA" */,-11 , 8/* "AT" */,-11 , 3/* "LPAREN" */,-11 , 9/* "NUMBER" */,-11 , 10/* "SYMBOL" */,-11 , 11/* "STRING" */,-11 ),
	/* State 21 */ new Array( 17/* "$" */,-9 , 2/* "RPAREN" */,-9 , 4/* "DOT" */,-9 , 5/* "QUOTE" */,-9 , 6/* "BACKQUOTE" */,-9 , 7/* "COMMA" */,-9 , 8/* "AT" */,-9 , 3/* "LPAREN" */,-9 , 9/* "NUMBER" */,-9 , 10/* "SYMBOL" */,-9 , 11/* "STRING" */,-9 ),
	/* State 22 */ new Array( 5/* "QUOTE" */,5 , 6/* "BACKQUOTE" */,6 , 7/* "COMMA" */,7 , 8/* "AT" */,8 , 3/* "LPAREN" */,9 , 9/* "NUMBER" */,10 , 10/* "SYMBOL" */,11 , 11/* "STRING" */,12 ),
	/* State 23 */ new Array( 2/* "RPAREN" */,24 ),
	/* State 24 */ new Array( 17/* "$" */,-10 , 2/* "RPAREN" */,-10 , 4/* "DOT" */,-10 , 5/* "QUOTE" */,-10 , 6/* "BACKQUOTE" */,-10 , 7/* "COMMA" */,-10 , 8/* "AT" */,-10 , 3/* "LPAREN" */,-10 , 9/* "NUMBER" */,-10 , 10/* "SYMBOL" */,-10 , 11/* "STRING" */,-10 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 13/* readonce */,1 , 12/* sexpr */,2 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array(  ),
	/* State 4 */ new Array(  ),
	/* State 5 */ new Array( 12/* sexpr */,13 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 6 */ new Array( 12/* sexpr */,14 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 7 */ new Array( 12/* sexpr */,15 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 8 */ new Array( 12/* sexpr */,16 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 9 */ new Array( 16/* members */,17 , 12/* sexpr */,19 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array(  ),
	/* State 12 */ new Array(  ),
	/* State 13 */ new Array(  ),
	/* State 14 */ new Array(  ),
	/* State 15 */ new Array(  ),
	/* State 16 */ new Array(  ),
	/* State 17 */ new Array( 12/* sexpr */,20 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 18 */ new Array(  ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  ),
	/* State 22 */ new Array( 12/* sexpr */,23 , 14/* list */,3 , 15/* atom */,4 ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"readonce'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"RPAREN" /* Terminal symbol */,
	"LPAREN" /* Terminal symbol */,
	"DOT" /* Terminal symbol */,
	"QUOTE" /* Terminal symbol */,
	"BACKQUOTE" /* Terminal symbol */,
	"COMMA" /* Terminal symbol */,
	"AT" /* Terminal symbol */,
	"NUMBER" /* Terminal symbol */,
	"SYMBOL" /* Terminal symbol */,
	"STRING" /* Terminal symbol */,
	"sexpr" /* Non-terminal symbol */,
	"readonce" /* Non-terminal symbol */,
	"list" /* Non-terminal symbol */,
	"atom" /* Non-terminal symbol */,
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
		act = 26;
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
		if( act == 26 )
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
			
			while( act == 26 && la != 17 )
			{
				if( NODEJS__dbg_withtrace )
					__NODEJS_dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 26 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 26;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 26 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __NODEJS_lex( info );
			}
			
			if( act == 26 )
			{
				if( NODEJS__dbg_withtrace )
					__NODEJS_dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( NODEJS__dbg_withtrace )
				__NODEJS_dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 26 )
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
		rval = vstack[ vstack.length - 1 ];
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
		 rval = quote(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 5:
	{
		 rval = backquote(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 6:
	{
		 rval = comma(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 7:
	{
		 rval = at(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 8:
	{
		 rval = null; 
	}
	break;
	case 9:
	{
		 rval = vstack[ vstack.length - 2 ]; 
	}
	break;
	case 10:
	{
		 rval = append_improper_tail(vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 11:
	{
		 rval = cons(vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 12:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 13:
	{
		 rval = {type:'number', val:vstack[ vstack.length - 1 ]}; 
	}
	break;
	case 14:
	{
		 rval = intern(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 15:
	{
		 rval = {type:'string', val:vstack[ vstack.length - 1 ]}; 
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

/* Switching one of these variables on will enable debug facilities
        of the various parser drivers */
//NODEJS__dbg_withtrace = true;
//NODEJS__dbg_withparsetree = true;
//NODEJS__dbg_withstepbystep = true;

console.log("Welcome to the Scheme REPL by Travis Hoover");

process.stdin.resume();
process.stdin.setEncoding('utf8'); 
process.stdout.write("> ");

process.stdin.on('data', function (text) {

  // Send text to scheme lex
  if( ( error_count = __NODEJS_parse( text, error_offsets, error_lookaheads ) ) > 0 )
  {
      for( var i = 0; i < error_count; i++ )
          console.log( "Parse error near " + text.substr( error_offsets[i] ) + ", expecting \"" + error_lookaheads[i].join() + "\"" );
  }



  console.log('> ' + text); // print the read stage text back as the print stage

  process.stdout.write("> "); // now loop or wait for user input again
 });

