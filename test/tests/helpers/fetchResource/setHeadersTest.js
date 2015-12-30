import test from 'tape';
import sinon from 'sinon';
import setHeaders from 'src/helpers/fetchResource/setHeaders';

test('setting headers', t => {
  const xhr = {
    setRequestHeader() {}
  };

  const spy = sinon.spy(xhr, 'setRequestHeader');

  const headers = {
    hello: 'world',
    hola: 'mundo'
  };

  setHeaders(xhr, headers);

  t.deepEqual(
    spy.args,
    [
      ['hello', 'world'],
      ['hola', 'mundo']
    ]
  );

  t.end();
});
