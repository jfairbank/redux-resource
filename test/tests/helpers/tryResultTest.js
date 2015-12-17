import test from 'tape';
import tryResult from '../../../src/helpers/tryResult';

test('returning the value when no error is thrown', t => {
  t.equal(tryResult(() => 42), 42);
  t.end();
});

test('returning the catch value when an error is thrown', t => {
  const expressionFn = () => { throw new Error('error'); };
  const catchFn = (e) => e.message;

  t.equal(tryResult(expressionFn, catchFn), 'error');

  t.end();
});
