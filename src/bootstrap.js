import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloader } from 'react-hot-loader';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import Root from './index';

// Startup the application
injectTapEventPlugin();
moment.locale('de');

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
