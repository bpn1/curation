import React from 'react';
import PropTypes from 'prop-types';
import Provider from 'react-redux/es/components/Provider';
import Router from 'react-router/es/Router';
import Route from 'react-router/es/Route';
import hashHistory from 'react-router/es/hashHistory';

import MainLayout from './layout';
import SubjectsTableCard from './views/subjectsTableCard';
import StatisticsCard from './views/blockingStatisticsCard';
import SimMeasureStatisticsCard from './views/simMeasureStatisticsCard';
import TasksCard from './views/tasksCard';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={SubjectsTableCard} />
        <Route path="statistics/blocking" component={StatisticsCard} />
        <Route path="statistics/simmeasure" component={SimMeasureStatisticsCard} />
        <Route path="tasks" component={TasksCard} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
