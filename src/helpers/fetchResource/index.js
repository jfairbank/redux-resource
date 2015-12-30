import Promise from 'pinkie-promise';
import tryResult from '../tryResult';
import assign from '../assign';
import setHeaders from './setHeaders';
import normalizeHeaders from './normalizeHeaders';
import serializeDataForContentType from './serializeDataForContentType';

const DEFAULT_HEADERS = {
  'content-type': 'application/json'
};

const DEFAULT_OPTIONS = {
  method: 'GET'
};

export default function fetchResource(url, options = {}) {
  return new Promise((resolve, reject) => {
    options = assign({}, DEFAULT_OPTIONS, options);

    options.headers = assign(
      {},
      DEFAULT_HEADERS,
      normalizeHeaders(options.headers)
    );

    const data = serializeDataForContentType(
      options.data,
      options.headers['content-type']
    );

    const xhr = new XMLHttpRequest();

    xhr.open(options.method, url);

    setHeaders(xhr, options.headers);

    xhr.onload = () => {
      if (xhr.statusText !== 'OK') {
        reject(tryResult(
          () => JSON.parse(xhr.responseText),
          () => xhr.responseText
        ));
      } else {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.send(data);
  });
}
