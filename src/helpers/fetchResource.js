import Promise from 'pinkie-promise';
import tryResult from './tryResult';

export default function fetchResource(url, options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

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

    xhr.send(JSON.stringify(options.data));
  });
}
