import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Content from '../components/Content';
import Input from '../components/Input';
import * as actions from '../actions';

export const App = ({ actions, fetching, error, user }) => (
  <div>
    <Content {...{fetching, error, user}}/>

    <Input
      placeholder="ID"
      onSubmit={id => actions.fetchUser({ id })}
    >
      Fetch User
    </Input>

    <Input
      placeholder="Name"
      onSubmit={name => actions.createUser(null, { name })}
    >
      Create User
    </Input>

    <Input
      placeholder="Name"
      onSubmit={name => actions.createUserFromForm(null, { name })}
    >
      Create User From Form
    </Input>
  </div>
);

export default connect(
  state => state,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(App);
