import includes from './includes';

export default function splitParams(params, pathParamKeys) {
  const pathParams = {};
  const queryParams = [];

  Object.keys(params).forEach((paramKey) => {
    if (includes(pathParamKeys, paramKey)) {
      pathParams[paramKey] = params[paramKey];
    } else {
      queryParams.push(`${paramKey}=${encodeURIComponent(params[paramKey])}`);
    }
  });

  return [pathParams, queryParams.join('&')];
}
