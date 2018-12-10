
import { convert } from '../src/lib';

var result = convert(null, 'tests/src/actions.js', {dump_ast: true, no_emit: true});

console.log(result);