
import { convert } from '../src/index';

var result = convert('tests/src/actions.js', {dump_ast: true, no_emit: true});

console.log(result);