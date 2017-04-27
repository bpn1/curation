import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './layout';
import SubjectsTableCard from './views/subjectsTableCard';
import StatisticsCard from './views/statisticsCard';
import TasksCard from './views/tasksCard';
import DataTableCard from './views/dataTableCard';
import ModelsCard from './views/modelsCard';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout} >
        <Route path="/" component={SubjectsTableCard} />
        <Route path="statistics" component={StatisticsCard} />
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
