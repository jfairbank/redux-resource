import test from 'tape';
import omit from '../../../src/helpers/omit';

test('removing excluded keys', t => {
  t.deepEqual(
    omit({ hello: 'world', hola: 'mundo' }, ['hello']),
    { hola: 'mundo' }
  );

  t.end();
});

test('removing nothing for no keys', t => {
  const object = { hello: 'world', hola: 'mundo' };

  t.deepEqual(omit(object, []), object);

  t.end();
});
