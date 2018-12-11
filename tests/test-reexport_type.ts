
import { convert,analyseref } from '../src/index';


describe('reexport_type', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/reexport_type.js', {dump_ast: true, 
        no_emit: true,
        print_types: false
    })).toMatchSnapshot()
  )
});

