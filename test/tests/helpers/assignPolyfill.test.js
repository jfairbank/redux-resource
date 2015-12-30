import test from 'tape';
import assign from '../../../src/helpers/assignPolyfill';

test('assigning from one object', t => {
  const source = { hello: 'world' };

  t.deepEqual(assign({}, source), source);

  t.end();
});

test('assigning from two objects', t => {
  const source1 = { hello: 'world' };
  const source2 = { hola: 'mundo' };

  t.deepEqual(assign({}, source1, source2), {
    hello: 'world',
    hola: 'mundo'
  });

  t.end();
});

test('mutation', t => {
  const object = {};
  const source = { hello: 'world' };

  assign(object, source);

  t.deepEqual(object, source);

  t.end();
});
