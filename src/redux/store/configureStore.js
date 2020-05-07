// @flow

// Redux Store Configuration
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = initialState => {
  const middleware = applyMiddleware(thunk);

  return createStore(rootReducer, initialState, composeEnhancers(middleware));
};

export default configureStore;
