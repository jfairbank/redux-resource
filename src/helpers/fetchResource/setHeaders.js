export default function setHeaders(xhr, headers) {
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });
}
