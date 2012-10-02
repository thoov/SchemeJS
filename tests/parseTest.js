

module.exports = {
		
	tests : [	
				"(2 3)",
				"(2 3 . (1 4))",
				"((2) 3)",
				'(("testing"))',
				'(def double5 (lambda (x) ( * x x ((lambda (y) (+ y 5)) 6))))'
			],
	
	expected :  [
					'{"type":"CONS","car":{"type":"NUMBER","val":2},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":3},"cdr":{"type":"NULL"}}}',
					'{"type":"CONS","car":{"type":"NUMBER","val":2},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":3},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":1},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":4},"cdr":{"type":"NULL"}}}}}',	
			 		'{"type":"CONS","car":{"type":"CONS","car":{"type":"CONS","car":{"type":"NUMBER","val":2},"cdr":{"type":"NULL"}},"cdr":{"type":"NULL"}},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":3},"cdr":{"type":"NULL"}}}',
			 		'{"type":"CONS","car":{"type":"CONS","car":{"type":"CONS","car":{"type":"STRING","val":"testing"},"cdr":{"type":"NULL"}},"cdr":{"type":"NULL"}},"cdr":{"type":"NULL"}}',
					'{"type":"CONS","car":{"type":"SYMBOL","val":"def"},"cdr":{"type":"CONS","car":{"type":"SYMBOL","val":"double5"},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"lambda"},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"x"},"cdr":{"type":"NULL"}},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"*"},"cdr":{"type":"CONS","car":{"type":"SYMBOL","val":"x"},"cdr":{"type":"CONS","car":{"type":"SYMBOL","val":"x"},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"lambda"},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"y"},"cdr":{"type":"NULL"}},"cdr":{"type":"CONS","car":{"type":"CONS","car":{"type":"SYMBOL","val":"+"},"cdr":{"type":"CONS","car":{"type":"SYMBOL","val":"y"},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":5},"cdr":{"type":"NULL"}}}},"cdr":{"type":"NULL"}}}},"cdr":{"type":"NULL"}},"cdr":{"type":"CONS","car":{"type":"NUMBER","val":6},"cdr":{"type":"NULL"}}},"cdr":{"type":"NULL"}}}}},"cdr":{"type":"NULL"}}}},"cdr":{"type":"NULL"}}}}'
			 	]
};