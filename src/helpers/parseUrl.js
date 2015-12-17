import splitParams from './splitParams';

export default function parseUrl(url) {
  const regex = /:\w+/g;
  const statics = url.split(regex);
  const paramKeys = (url.match(regex) || [])
    .map((paramId) => paramId.replace(':', ''));

  return (params) => {
    const split = splitParams(params || {}, paramKeys);
    const pathParams = split[0];
    const queryParams = split[1];

    const finalUrl = statics.reduce((memo, piece, i) => {
      const paramKey = paramKeys[i] || '';
      const paramId = paramKey ? ':' + paramKey : '';

      return memo + piece + (pathParams[paramKey] || paramId);
    }, '');

    if (queryParams) {
      return finalUrl + '?' + queryParams;
    }

    return finalUrl;
  };
}
