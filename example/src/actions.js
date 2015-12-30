import * as users from './resources';
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
  users.user, 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

export const createUser = createResourceAction(
  users.create, 'ADD_USER', 'ADDED_USER', 'ERR_ADDING_USER'
);

export const createUserFromForm = createResourceAction(
  users.createFromForm, 'ADD_USER', 'ADDED_USER', 'ERR_ADDING_USER'
);
