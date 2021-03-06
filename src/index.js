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
import PropTypes from 'prop-types';
import Provider from 'react-redux/es/components/Provider';
import Router from 'react-router/es/Router';
import Route from 'react-router/es/Route';
import hashHistory from 'react-router/es/hashHistory';

import MainLayout from './layout';
import SubjectsTableCard from './views/subjectsTableCard';
import VersionCard from './views/versionCard';
import VersionDiffCard from './views/versionDiffCard';
import BlockingStatisticsCard from './views/blockingStatisticsCard';
import SimMeasureStatisticsCard from './views/simMeasureStatisticsCard';
import GraphsCard from './views/graphsCard';
import EntityLinkingCard from './views/entityLinkingCard';
import ClassifierStatisticsCard from './views/classifierStatisticsCard';
import DuplicateTableCard from './views/duplicateTableCard';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={SubjectsTableCard} />
        <Route path="/duplicates" component={DuplicateTableCard} />
        <Route path="/versions" component={VersionCard} />
        <Route path="/versiondiff" component={VersionDiffCard} />
        <Route path="/statistics/blocking" component={BlockingStatisticsCard} />
        <Route path="/statistics/simmeasure" component={SimMeasureStatisticsCard} />
        <Route path="/graphs" component={GraphsCard} />
        <Route path="/entity_linking" component={EntityLinkingCard} />
        <Route path="/statistics/classifier" component={ClassifierStatisticsCard} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
