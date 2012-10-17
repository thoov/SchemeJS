Scheme Interpreter:
======

Basic Scheme interpreter written in javascript with help from jscc. Only a small subset of scheme has been implemented and some parts have been renamed or changed for convenience.

Requirements:
--------
* [NodeJS] (http://nodejs.org/) ( tested on v0.8+ ) 
* [JS/CC] (http://jscc.phorward-software.com/) ( v0.30 )

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
[View All Primitive Functions] (https://github.com/thoov/Scheme-REPL/tree/master/src/lib)

<pre><code>> (def helloWorld (+ "Hello" " " "World"))
#t
> helloWorld
Hello World
</code></pre>

<pre><code>> (def double (lambda (x) (+ x x)))
> (double 2)
4
</code></pre>

<pre><code>> (def double5 (lambda (x) ( * x x ((lambda (y) (+ y 5)) 6))))
#t
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
#t
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

License:
======

MIT License
Copyright (c) 2012 Travis Hoover thoov7@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.