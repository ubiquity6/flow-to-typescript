
import { convert } from '../src/index';

var result = convert('tests/src/generic_constraint.js', {dump_ast: true, 
    no_emit: true,
    print_types: true
});

console.log(result);