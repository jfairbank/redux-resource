import test from 'tape';
import includes from '../../../src/helpers/includes';

test('returns true if the value exists in the array', t => {
  t.ok(includes([1, 2, 3], 1));
  t.end();
});

test('checks based on strict equality', t => {
  t.notOk(includes([1, 2, 3], '1'));
  t.end();
});

test('returns false if the value is not in the array', t => {
  t.notOk(includes([1, 2, 3], 4));
  t.end();
});
