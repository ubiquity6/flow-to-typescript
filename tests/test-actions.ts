
import { convert } from '../src/lib';


describe('actions', () => {
    it('main', () =>
      expect(convert(null, 'tests/src/actions.js', {dump_ast: true, 
        no_emit: true,
        print_types: false
    })).toMatchSnapshot()
  )
});
