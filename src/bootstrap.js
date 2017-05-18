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
