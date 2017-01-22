import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import {browserHistory, Router} from 'react-router';
import {AppContainer as HotReloader} from 'react-hot-loader';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware'
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './reducers'
import {routes} from './routes'

// Startup the application
injectTapEventPlugin();
moment.locale('de');

// Create Redux Store
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

const redux_middleware = applyMiddleware(promise(), thunk, logger());
const store = createStore(reducers,composeEnhancers(redux_middleware));

// Initialize App
const content = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
);

// Render the App including Hot Module Replacement
const renderRoot = () => ReactDOM.render(
  <HotReloader>{content}</HotReloader>,
  document.getElementsByTagName('body')[0]
);

renderRoot();

//---Hot Module Replacement
if (module.hot) module.hot.accept('./routes', renderRoot);
