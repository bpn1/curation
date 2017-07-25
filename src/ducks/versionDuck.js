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

import axios from 'axios';
import createDuck from './apiDuck';

const versionDuck = createDuck({ namespace: 'curation', store: 'version', path: '/versions' }).extend({
  types: ['RESTORE_VERSION', 'COMPUTE_DIFFERENCE'],
  creators: ({ types }) => ({
    restoreVersion: version => ({
      type: types.RESTORE_VERSION,
      payload: axios.get('/api/run/versionrestore/' + version)
    }),
    computeDifference: (oldVersion, newVersion) => ({
      type: types.COMPUTE_DIFFERENCE,
      payload: axios.get('/api/run/versiondiff/' + oldVersion + ',' + newVersion)
    })
  })
});

export default versionDuck;
