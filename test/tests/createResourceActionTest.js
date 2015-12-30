import test from '../support/httpRequestTest';
import createResourceAction from '../../src/createResourceAction';

const users = {
  user: '/users/:id',
  create: {
    url: '/users/create',
    method: 'POST'
  }
};

users.createFromForm = {
  ...users.create,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Custom': 'hello world'
  }
};

const fetchUser = createResourceAction(
  users.user, 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

const createUser = createResourceAction(
  users.create, 'CREATE_USER', 'CREATED_USER', 'ERR_CREATING_USER'
);

const createUserFromForm = createResourceAction(
  users.createFromForm, 'CREATE_USER', 'CREATED_USER', 'ERR_CREATING_USER'
);

const params = { id: 1 };

test('making a request with the default verb', (t, getRequests, dispatch) => {
  fetchUser(params)(dispatch);

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'made the request');
  t.equal(req.url, `/users/${params.id}`, 'hit correct url');
  t.equal(req.method, 'GET', 'made a GET request');

  t.end();
});

test('making a request with an explicit verb', (t, getRequests, dispatch) => {
  createUser()(dispatch);

  const requests = getRequests();
  const [req] = requests;

  t.equal(requests.length, 1, 'made the request');
  t.equal(req.url, '/users/create', 'hit correct url');
  t.equal(req.method, 'POST', 'made a POST request');

  t.end();
});

test('making a request with an explicit verb and headers',
  (t, getRequests, dispatch) => {
    createUserFromForm()(dispatch);

    const requests = getRequests();
    const [req] = requests;

    t.equal(requests.length, 1, 'made the request');
    t.equal(req.url, '/users/create', 'hit correct url');
    t.equal(req.method, 'POST', 'made a POST request');

    t.deepEqual(
      Object.keys(req.requestHeaders),
      ['content-type', 'x-custom'],
      'uses the supplied headers'
    );

    t.ok(
      /application\/x-www-form-urlencoded/.test(
        req.requestHeaders['content-type']
      ),
      'uses the form content type header'
    );

    t.equal(
      req.requestHeaders['x-custom'],
      'hello world',
      'uses the custom header'
    );

    t.end();
  }
);

test('dispatching the send action', (t, getRequests, dispatch) => {
  fetchUser(params)(dispatch);

  t.ok(dispatch.calledOnce, 'called once');

  t.ok(
    dispatch.calledWith({ type: 'FETCH_USER' }),
    'dispatches send action'
  );

  t.end();
});

test('dispatching the resource upon success', async (t, getRequests, dispatch) => {
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

test('dispatching an error upon failure', async (t, getRequests, dispatch) => {
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

test('sending request body data', (t, getRequests, dispatch) => {
  const data = { name: 'Jeremy' };

  createUser(null, data)(dispatch);

  const [req] = getRequests();

  t.deepEqual(JSON.parse(req.requestBody), data, 'called with request body');

  t.end();
});

test('sending request body form data', (t, getRequests, dispatch) => {
  const data = { name: 'Jeremy' };

  createUserFromForm(null, data)(dispatch);

  const [req] = getRequests();

  t.equal(
    req.requestBody,
    'name=Jeremy',
    'called with request body'
  );

  t.end();
});
