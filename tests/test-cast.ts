
import { convert,analyseref } from '../src/index';

describe('cast', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/cast.js', {dump_ast: true, 
        no_emit: true,
        print_types: false
    })).toMatchSnapshot()
  )
});

// generate ast for comparison and debugging
var result = analyseref('tests/out/cast.ts', {dump_ast: true, 
    no_emit: true,
    print_types: false
});