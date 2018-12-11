
import { convert,analyseref } from '../src/index';

describe('generic_constraint', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/generic_constraint.js', {dump_ast: true, 
        no_emit: true,
        print_types: false
    })).toMatchSnapshot()
  )
});

var result = analyseref('tests/out/generic_constraint.ts', {dump_ast: true, 
    no_emit: true,
    print_types: false
});