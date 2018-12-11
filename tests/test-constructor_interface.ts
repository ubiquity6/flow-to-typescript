
import { convert,analyseref } from '../src/index';

describe('constructor_interface', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/constructor_interface.js', {dump_ast: true, 
        no_emit: true,
        print_types: true
    })).toMatchSnapshot()
  )
});

