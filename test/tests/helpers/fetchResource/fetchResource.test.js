import test from '../../../support/httpRequestTest.js';
import fetchResource from 'src/helpers/fetchResource';

const URL = '/user';

test('making a request with the default options', (t, getRequests) => {
  fetchResource(URL);

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'make the request');
  t.equal(req.url, URL, 'make the request to correct url');
  t.equal(req.method, 'GET', 'make a GET request');

  t.deepEqual(
    Object.keys(req.requestHeaders),
    ['content-type'],
    'uses the defaults headers'
  );

  t.ok(
    /application\/json/.test(
      req.requestHeaders['content-type']
    ),
    'defaults to json content type'
  );

  t.end();
});

test('making a request with an explicit verb', (t, getRequests) => {
  fetchResource(URL, { method: 'POST' });

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'make the request');
  t.equal(req.url, URL, 'make the request to correct url');
  t.equal(req.method, 'POST', 'make a POST request');

  t.deepEqual(
    Object.keys(req.requestHeaders),
    ['content-type'],
    'uses the defaults headers'
  );

  t.ok(
    /application\/json/.test(
      req.requestHeaders['content-type']
    ),
    'defaults to json content type'
  );

  t.end();
});

test('making request with headers', (t, getRequests) => {
  fetchResource(URL, {
    headers: {
      'Content-Type': 'text/plain',
      'X-Custom': 'hello'
    }
  });

  const [req] = getRequests();

  t.deepEqual(
    req.requestHeaders,
    { 'content-type': 'text/plain', 'x-custom': 'hello' },
    'uses the supplied headers'
  );

  t.end();
});

test('sending request body data', (t, getRequests) => {
  const data = { name: 'Jeremy' };

  fetchResource(URL, { method: 'POST', data });

  const [req] = getRequests();

  t.deepEqual(JSON.parse(req.requestBody), data, 'call with request body');

  t.end();
});

test('sending request body form data', (t, getRequests) => {
  const data = { name: 'Jeremy' };

  fetchResource(URL, {
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const [req] = getRequests();

  t.equal(
    req.requestBody,
    'name=Jeremy',
    'called with request body'
  );

  t.end();
});
