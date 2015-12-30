export default function mapKeys(object, fn) {
  return Object.keys(object).reduce((memo, key) => {
    memo[fn(key)] = object[key];
    return memo;
  }, {});
}
