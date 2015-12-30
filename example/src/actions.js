import { createResourceAction } from '../../src';

export const updateFetchId = (id) => ({
  type: 'UPDATE_FETCH_ID',
  payload: id
});

export const updateCreateName = (name) => ({
  type: 'UPDATE_CREATE_NAME',
  payload: name
});

export const fetchUser = createResourceAction(
  '/users/:id', 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

export const createUser = createResourceAction(
  { url: '/users/create', method: 'POST' },
  'ADD_USER', 'ADDED_USER', 'ERR_ADDING_USER'
);
