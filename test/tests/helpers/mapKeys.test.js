import test from 'tape';
import mapKeys from 'src/helpers/mapKeys';

test('transforming object with keys', t => {
  const before = { FOO: 'BAR', BAZ: 42 };
  const after = { foo: 'BAR', baz: 42 };

  t.deepEqual(
    mapKeys(before, key => key.toLowerCase()),
    after
  );

  t.end();
});

test('transforming empty object', t => {
  t.deepEqual(
    mapKeys({}, key => key.toUpperCase()),
    {}
  );

  t.end();
});
