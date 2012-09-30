Scheme Interpreter by Travis Hoover:
======

Basic Scheme interpreter written in javascript with help from jscc. Only a small subset of scheme has been implemented and some parts have been renamed or changed for convenience.

Requirements:
--------
* NodeJS ( tested on v0.8+ )

Sample expressions:
--------
Current built-in standard functions: def, +, -, ., *, /,  and lambda.

<pre><code>> (def helloWorld (+ "Hello" " " "World"))
> helloWorld
Hello World
</code></pre>

<pre><code>> (def double (lambda (x) (+ x x)))
> (double 2)
4
</code></pre>

<pre><code>> (def double5 (lambda (x) ( * x x ((lambda (y) (+ y 5)) 6))))
true
> (double5 3)
99
</code></pre>

<pre><code>> (+ 1 2 3 4 . (2 3 4 5))
24
</code></pre>


How to run:
--------

First you must compile the jscc scheme.par file using node. This produces a scheme.js file which we will have node run.

<code>node jscc.js -o scheme.js scheme.par</code>

--------

Second we will have node run our newly compiled javascript file.

<code>node scheme.js</code>


Debugging
--------

To print the tokenized string, use print tokens
<pre><code>> (* 3 5)
15
> print tokens 
> Tokenized: 
{"type":"LIST","val":[{"type":"SYMBOL","val":"*"},{"type":"NUMBER","val":3},{"type":"NUMBER","val":5}]}
</code></pre>

To print the alist also know as the symbol list, use print alist
<pre><code>> (def testing 23)    
true
> print alist
testing
/
*
lambda
PI
-
+
def
</code></pre>