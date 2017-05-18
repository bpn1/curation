import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import applyMiddleware from 'redux/es/applyMiddleware';
import createStore from 'redux/es/createStore';
import compose from 'redux/es/compose';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

// Create Redux Store
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

const reduxMiddleware = applyMiddleware(promise(), thunk); // to enable Redux logger, add logger here
export default createStore(reducers, composeEnhancers(reduxMiddleware));
