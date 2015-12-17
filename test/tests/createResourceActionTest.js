import 'babel-polyfill';
import '../support/jsdom';
import tapeTest from 'tape';
import sinon from 'sinon';
import createResourceAction from '../../src/createResourceAction';

const fetchUser = createResourceAction(
  '/users/:id', 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

const params = { id: 1 };

test('making a request', (t, dispatch, getRequests) => {
  fetchUser(params)(dispatch);

  t.equals(getRequests().length, 1);

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
