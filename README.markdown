Scheme Interpreter by Travis Hoover:
======

Basic Scheme interpreter written in javascript with help from jscc. Only a small subset of scheme has been implemented and some parts have been renamed or changed for convenience.

How to run:
--------

First you must compile the jscc scheme.par file using node. This produces a scheme.js file which we will have node run.

<code>node jscc.js -o scheme.js scheme.par</code>

--------

Second we will have node run our newly compiled javascript file.

<code>node scheme.js</code>