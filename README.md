Super early build of a flow to typescript converter.

It uses a quirk that prettier's ast parser is an intersting union of flow and typescript's AST definitions. So i just load it, and convert a few problematic flow AST types to the equivalent typescript AST types, and print out again.

It's nowhere near perfect, but I'm able to use it to generate .d.ts files from a fairly large flow codebase, so it serves some purpose. It generates a ton of errors, but the typescript compiler can still output the .d.ts files anyways.


Note. This:
https://github.com/Kiikurage/babel-plugin-flow-to-typescript
Looks like a better idea in structure, eg: use babel.
But i've tried it and it doesn't do the same things. Using both may give you most juice.


CLI Usage
=============
node (root)/dist/src/cli *.js

this should write .ts files adjacent to your .js files.

Gulp plugin usage
==============


```
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json'); // this picks up desired settings from your tsconfig. consult gulp-typescript docs for more info.
const flowts = require('flow-to-typescript').gulp; 
const merge = require('merge2');
const print = require('gulp-print').default;

// can't use tsProject.src(), since that just picks up .ts files.
const srcFiles = ['**/*.js',  
  '!gulpfile.js', '!tests/**'];

gulp.task('default', function() {
  const tsResult = gulp.src(srcFiles)
    .pipe(print())
    .pipe(flowts())
    .pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest('ts')),
    //tsResult.js.pipe(gulp.dest('dist/js'))
  ]);
});

// use this to debug your flowts intermediates.
gulp.task('flowts', function() {
  return gulp.src(srcFiles)
    .pipe(print())
    .pipe(flowts())
    .pipe(gulp.dest('flowts'));
});
```