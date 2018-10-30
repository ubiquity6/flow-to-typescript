
import { convert,analyseref } from '../src/index';

var result = convert('tests/src/generic_constraint.js', {dump_ast: true, 
    no_emit: true,
    print_types: true
});

console.log(result);

var result = analyseref('tests/out/generic_constraint.ts', {dump_ast: true, 
    no_emit: true,
    print_types: true
});