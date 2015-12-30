import test from 'tape';
import parseUrl from '../../../src/helpers/parseUrl';

test('returns a compiled function for generating a url', t => {
  t.ok(parseUrl('/users') instanceof Function);
  t.end();
});

test('parsing without placeholders', t => {
  const urlCompiler = parseUrl('/users');

  t.equal(urlCompiler(), '/users');

  t.end();
});

test('parsing with placeholder', t => {
  const urlCompiler = parseUrl('/users/:id');

  t.equal(urlCompiler({ id: 1 }), '/users/1', 'Uses id');

  t.end();
});


test('parsing with multiple placeholders', t => {
  const urlCompiler = parseUrl('/users/:userId/tasks/:taskId');
  const params = { userId: 1, taskId: 2 };

  t.equal(urlCompiler(params), '/users/1/tasks/2', 'Uses userId and taskId');

  t.end();
});

test('passing non-named params', t => {
  t.equal(
    parseUrl('/users')({ id: 1 }), '/users?id=1', 'Without named parameters'
  );

  t.equal(
    parseUrl('/users/:id')({ id: 1, name: 'Jeremy' }),
    '/users/1?name=Jeremy',
    'With named parameter'
  );

  t.end();
});
