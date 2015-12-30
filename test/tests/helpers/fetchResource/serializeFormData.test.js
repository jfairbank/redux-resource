import test from 'tape';
import serializeFormData from 'src/helpers/fetchResource/serializeFormData';

test('serializing form data', t => {
  const data = { hello: 'world', hola: 'mundo' };

  t.equal(
    serializeFormData(data),
    'hello=world&hola=mundo'
  );

  t.end();
});

test('encoding special chars', t => {
  const data = { '@hello': '#world' };

  t.equal(
    serializeFormData(data),
    '%40hello=%23world'
  );

  t.end();
});
