import test from 'tape';
import splitParams from '../../../src/helpers/splitParams';

test('splitting into named and query parameters', t => {
  const params = { id: 1, firstName: 'Jeremy', lastName: 'Fairbank' };
  const namedParamKeys = ['id'];
  const [namedParams, queryParams] = splitParams(params, namedParamKeys);

  t.deepEqual(namedParams, { id: 1 });
  t.equal(queryParams, 'firstName=Jeremy&lastName=Fairbank');

  t.end();
});

test('with no named parameters', t => {
  const params = { id: 1, name: 'Jeremy' };
  const [namedParams, queryParams] = splitParams(params, []);

  t.deepEqual(namedParams, {});
  t.equal(queryParams, 'id=1&name=Jeremy');

  t.end();
});

test('with no query params', t => {
  const params = { id: 1, name: 'Jeremy' };
  const namedParamKeys = ['id', 'name'];
  const [namedParams, queryParams] = splitParams(params, namedParamKeys);

  t.deepEqual(namedParams, { ...params });
  t.equal(queryParams, '');

  t.end();
});
