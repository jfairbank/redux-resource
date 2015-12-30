import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Content from '../components/Content';
import Input from '../components/Input';
import * as actions from '../actions';

export const App = ({
  actions, fetchId, createName,
  fetching, error, user
}) => (
  <div>
    <Content {...{fetching, error, user}}/>

    <Input
      placeholder="ID"
      onUpdate={actions.updateFetchId}
      onSubmit={() => actions.fetchUser({ id: fetchId })}
    >
      Fetch User
    </Input>

    <Input
      placeholder="Name"
      onUpdate={actions.updateCreateName}
      onSubmit={() => actions.createUser(null, { name: createName })}
    >
      Create User
    </Input>
  </div>
);

export default connect(
  state => state,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(App);
