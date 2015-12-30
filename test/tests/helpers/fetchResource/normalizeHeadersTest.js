import test from 'tape';
import normalizeHeaders from 'src/helpers/fetchResource/normalizeHeaders';

test('keys become lower case', t => {
  const headers = {
    'Content-Type': 'application/json',
    'ACCEPT': '*/*',
    'host': 'localhost'
  };

  t.deepEqual(
    Object.keys(normalizeHeaders(headers)),
    ['content-type', 'accept', 'host']
  );

  t.end();
});
