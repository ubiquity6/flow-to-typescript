
import { convert,analyseref } from '../src/index';

var result = convert('tests/src/reexport_type.js', {dump_ast: true, 
    no_emit: true,
    print_types: true
});

console.log(result);
