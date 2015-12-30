export const user = '/users/:id';

export const create = {
  url: '/users/create',
  method: 'POST'
};

export const createFromForm = {
  url: '/users/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
