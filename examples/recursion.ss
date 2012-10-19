(def factorial (lambda (n) (if (= 0 n) (+ 1) (* n (factorial (- n 1))))))
(factorial 0)
(factorial 2) 
