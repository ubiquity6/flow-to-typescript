
import { convert,analyseref } from '../src/index';

describe('plus', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/plus.js', {dump_ast: true, 
        no_emit: true,
        print_types: false
    })).toMatchSnapshot()
  )
});
