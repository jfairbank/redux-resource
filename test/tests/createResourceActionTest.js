import 'babel-polyfill';
import '../support/jsdom';
import tapeTest from 'tape';
import sinon from 'sinon';
import createResourceAction from '../../src/createResourceAction';

const fetchUser = createResourceAction(
  '/users/:id', 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

const createUser = createResourceAction(
  { url: '/users/create', method: 'POST' },
  'CREATE_USER', 'CREATED_USER', 'ERR_CREATING_USER'
);

const params = { id: 1 };

test('making a request with the default verb', (t, dispatch, getRequests) => {
  fetchUser(params)(dispatch);

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'made the request');
  t.equal(req.url, `/users/${params.id}`, 'hit correct url');
  t.equal(req.method, 'GET', 'made a GET request');

  t.end();
});

test('making a request with an explicit verb', (t, dispatch, getRequests) => {
  createUser()(dispatch);

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'made the request');
  t.equal(req.url, '/users/create', 'hit correct url');
  t.equal(req.method, 'POST', 'made a POST request');

  t.end();
});

test('dispatching the send action', (t, dispatch) => {
  fetchUser(params)(dispatch);

  t.ok(dispatch.calledOnce, 'called once');

  t.ok(
    dispatch.calledWith({ type: 'FETCH_USER' }),
    'dispatches send action'
  );

  t.end();
});

test('dispatching the resource upon success', async (t, dispatch, getRequests) => {
  const promise = fetchUser(params)(dispatch);
  const [req] = getRequests();
  const user = { id: params.id, name: 'Jeremy' };

  req.respond(
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify(user)
  );

  await promise;

  t.ok(dispatch.calledTwice, 'called twice');

  t.ok(
    dispatch.calledWith({ type: 'RECEIVE_USER', payload: user }),
    'receives resource'
  );

  t.end();
});

test('dispatching an error upon failure', async (t, dispatch, getRequests) => {
  const promise = fetchUser(params)(dispatch);
  const [req] = getRequests();
  const error = { message: 'Internal Server Error' };

  req.respond(
    500,
    { 'Content-Type': 'application/json' },
    JSON.stringify(error)
  );

  await promise;

  t.ok(dispatch.calledTwice, 'called twice');

  t.ok(
    dispatch.calledWith({ type: 'ERR_RECEIVE_USER', payload: error }),
    'receives error'
  );

  t.end();
});

test('sending request body data', (t, dispatch, getRequests) => {
  const data = { name: 'Jeremy' };

  createUser(null, data)(dispatch);

  const [req] = getRequests();

  t.deepEqual(JSON.parse(req.requestBody), data, 'called with request body');

  t.end();
});

function test(name, fn) {
  tapeTest(name, t => {
    const dispatch = sinon.spy();
    const xhr = sinon.useFakeXMLHttpRequest();
    const requests = [];

    xhr.onCreate = (xhr) => requests.push(xhr);

    fn(t, dispatch, () => requests.slice(0));

    xhr.restore();
  });
}
