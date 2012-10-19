(def fib (lambda (n) (if (< n 2) (+ 1) (+ (fib (- n 1)) (fib (- n 2))))))
(fib 5)
(fib 14)