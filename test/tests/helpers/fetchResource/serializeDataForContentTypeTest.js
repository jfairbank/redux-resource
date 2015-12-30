import test from 'tape';

import serializeDataForContentType
  from 'src/helpers/fetchResource/serializeDataForContentType';

test('serializing form data', t => {
  const contentType = 'application/x-www-form-urlencoded';
  const data = { hello: 'world' };

  t.equal(
    serializeDataForContentType(data, contentType),
    'hello=world'
  );

  t.end();
});

test('serializing json data', t => {
  const contentType = 'application/json';
  const data = { hello: 'world' };

  t.equal(
    serializeDataForContentType(data, contentType),
    JSON.stringify(data)
  );

  t.end();
});
