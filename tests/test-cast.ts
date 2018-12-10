
import { convert,analyseref } from '../src/index';

var result = convert('tests/src/cast.js', {dump_ast: true, 
    no_emit: true,
    print_types: true
});

console.log(result);

var result = analyseref('tests/out/cast.ts', {dump_ast: true, 
    no_emit: true,
    print_types: true
});