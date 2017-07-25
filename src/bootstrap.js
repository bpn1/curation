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

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloader } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import Root from './index';

// Startup the application
injectTapEventPlugin();

// Render the App including Hot Module Replacement
const renderRoot = () => ReactDOM.render(
  <HotReloader>
    <Root store={store} />
  </HotReloader>,
  document.getElementById('container')
);

renderRoot();

// ---Hot Module Replacement
if (module.hot) {
  module.hot.accept('./index', renderRoot);
}
