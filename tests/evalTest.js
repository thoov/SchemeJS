

module.exports = {

	tests : [	
				"(* 3 5)",
				"(def fib (lambda (n) (if (< n 2) (+ 1) (+ (fib (- n 1)) (fib (- n 2))))))",
				"(fib 5)",
				"(fib 14)",
				"(def mkadder (lambda (n) (lambda (x) (+ n x) ) ) )",
				"(def add100 ( mkadder 100 ))",
				"(def add8 ( mkadder 8 ))",
				"(add100 4)",
				"(add8 3)"
			],

	expected :  [
					"15",
					undefined,
					"8",
					"610",
					undefined,
					undefined,
					undefined,
					"104",
					"11"
			 	]
};