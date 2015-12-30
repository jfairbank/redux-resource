import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';

const HOST = '127.0.0.1';
const PORT = 3000;
const URL = `http://${HOST}:${PORT}`;

const createUser = (() => {
  let id = 1;

  return (name, email) => ({ name, email, id: id++ });
})();

const users = _([
  createUser('Bob', 'bob@example.com'),
  createUser('Alice', 'alice@example.com'),
  createUser('Jeremy', 'jeremy@example.com')
])
.map(user => [user.id, user])
.zipObject()
.value();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.send(_.values(users));
});

app.post('/users/create', (req, res) => {
  res.send({
    ...req.body,
    id: 4
  });
});

app.get('/users/:id', (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    res
      .status(404)
      .type('application/json')
      .send({ message: 'User not found' });
  } else {
    res
      .type('application/json')
      .send(user);
  }
});

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('Error starting server');
  } else {
    console.log(`Server listening at ${URL}`);
  }
});
