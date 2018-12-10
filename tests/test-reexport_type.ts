
import { convert,analyseref } from '../src/index';

var result = convert(null, 'tests/src/reexport_type.js', {dump_ast: true, 
    no_emit: true,
    print_types: true
});

console.log(result);
