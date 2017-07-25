/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
