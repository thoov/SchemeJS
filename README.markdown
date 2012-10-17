Scheme Interpreter:
======

Basic Scheme interpreter written in javascript with help from jscc. Only a small subset of scheme has been implemented and some parts have been renamed or changed for convenience.

Requirements:
--------
* NodeJS ( tested on v0.8+ )
* JS/CC ( v0.30 )

How to run:
--------

For node, using JS/CC uses the following command line: 
<pre><b>node jscc.js -v -o scheme.js -p node -t driver_node.js_ scheme.par</b></pre>
</pre>

Once the javascript file has been compiled, you can run the interpreter via: 
<pre><b>node scheme.js -t</b></pre>
</pre>


Sample expressions:
--------
Current built-in standard functions: def, +, -, ., *, /,  and lambda.

<pre><code>> (def helloWorld (+ "Hello" " " "World"))
true
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

<pre><code>> (= 0 0 0 0 (- 1 1))
#t
</code></pre>

<pre><code>> (if (= 0 1) "foo" "bar")
bar
</code></pre>


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

http://icem-www.folkwang-hochschule.de/~finnendahl/cm_kurse/doc/schintro/schintro_93.html

http://download.plt-scheme.org/doc/html/guide/Pairs__Lists__and_Scheme_Syntax.html

http://www.cs.indiana.edu/scheme-repository/R4RS/r4rs_8.html

http://classes.soe.ucsc.edu/cmps112/Spring03/languages/scheme/SchemeTutorialB.html