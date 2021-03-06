Scheme Interpreter:
======

Basic Scheme interpreter written in javascript with help from jscc. Only a small subset of scheme has been implemented and some parts have been renamed or changed for convenience.

Requirements:
--------
* [NodeJS] (http://nodejs.org/) ( tested on v0.8+ ) 

How to run:
--------

You can run the interpreter via: 
<pre><b>node scheme.js</b></pre>
</pre>

You can run tests which are located inside of the tests folder via the -t parameter:
<pre><b>node scheme.js -t</b></pre>
</pre>

You can run whole scheme files via the -f parameter (replace file_name with the relative file path): 
<pre><b>node scheme.js -f file_name</b></pre>
</pre>

Sample expressions:
--------
[View All Primitive Functions] (https://github.com/thoov/Scheme-REPL/tree/master/src/lib)

<pre><code>> (def helloWorld (+ "Hello" " " "World"))
> helloWorld
Hello World
</code></pre>

<pre><code>> (def double (lambda (x) (+ x x)))
> (double 2)
4
</code></pre>

<pre><code>> (def double5 (lambda (x) ( * x x ((lambda (y) (+ y 5)) 6))))
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

Recursion
--------
<pre><code>>(def factorial (lambda (n) (if (= 0 n) (+ 1) (* n (factorial (- n 1))))))

>(factorial 0)
1

>(factorial 2) 
2

>(factorial 5)
120
</code></pre>

Closure
--------
<pre><code>>(def mkadder (lambda (n) (lambda (x) (+ n x) ) ) )

>(def add100 ( mkadder 100 ))

>(def add8 ( mkadder 8 ))

>(add100 4)
104

>(add8 3)
11
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

--------
JS/CC LALR(1) Parser Generator <br>
Copyright (C) 2007-2012 by Phorward Software Technologies, Jan Max Meyer <br>
http://jscc.phorward-software.com / contact@phorward-software.com <br>
<br>
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:
<br>
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright
	  notice, this list of conditions and the following disclaimer in the
	  documentation and/or other materials provided with the distri-
	  bution.
	* Neither the name of Phorward Software Technologies nor the
	  names of its contributors may be used to endorse or promote
	  products derived from this software without specific prior
	  written permission.

THIS SOFTWARE IS PROVIDED BY JAN MAX MEYER (PHORWARD SOFTWARE TECHNOLOGIES)
''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JAN MAX MEYER (PHORWARD SOFTWARE
TECHNOLOGIES) BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.