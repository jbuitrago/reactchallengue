import './main.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

// dev tools
import { createDevTools } from 'redux-devtools';


// import a root component (the app!)
import AppContainer from './containers/AppContainer';

// the reducers are combined in ./reducers/index.js
// so they can be included as one thing
import myReducers from './reducers';



// persistant storage and middleware application
const createPersistentStore = compose(
  persistState(),
  applyMiddleware(thunk)
)(createStore);

// the store creation, using createPersistentStore instead createStore
let store = createPersistentStore(
  myReducers
);

// app render
render(
  <Provider store={store}>
    <div>
      <AppContainer />
      
    </div>
  </Provider>,
  document.getElementById('app')
);
