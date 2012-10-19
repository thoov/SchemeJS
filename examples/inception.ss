(def test (lambda (x) (+ x 10)))
((lambda (n) (if (= 0 n) (+ 1) (test n))) 2)  