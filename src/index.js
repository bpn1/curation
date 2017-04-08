import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './layout';
import ServicesTableCard from './views/servicesTableCard';
import TasksCard from './views/tasksCard';
import DataTableCard from './views/dataTableCard';
import ModelsCard from './views/modelsCard';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout} >
        <Route path="/" component={ServicesTableCard} />
        <Route path="tasks" component={TasksCard} />
        <Route path="data" component={DataTableCard} />
        <Route path="models" component={ModelsCard} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
