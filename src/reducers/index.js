import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import each reducer
import app from './app';             // this will then be available as state.app
import users from './users';     // and this one as state.users



// combine all reducers, each one will then be available as state.someReducer
const myReducers = combineReducers({
  app,
  users,
  form: formReducer, // this is required by redux-form
});

export default myReducers;
