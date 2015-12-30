import '../support/jsdom';
import test from 'tape';
import sinon from 'sinon';

export default function httpRequestTest(name, fn) {
  test(name, t => {
    const dispatch = sinon.spy();
    const xhr = sinon.useFakeXMLHttpRequest();
    const requests = [];

    xhr.onCreate = (xhr) => requests.push(xhr);

    fn(t, () => requests.slice(0), dispatch);

    xhr.restore();
  });
}
