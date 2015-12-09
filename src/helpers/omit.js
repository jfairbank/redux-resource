import includes from './includes';

export default function omit(object, omittedKeys) {
  return Object.keys(object).reduce((memo, key) => {
    if (!includes(omittedKeys, key)) {
      memo[key] = object[key];
    }

    return memo;
  }, {});
}
