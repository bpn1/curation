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
import createDuck, { apiPath, countParam, makeAxiosTypes, makeError, statuses } from './apiDuck';

const path = '/versiondiffs';

const versionDiffDuck = createDuck({ namespace: 'curation', store: 'versiondiff', path: '/versiondiff' }).extend({
  types: [...makeAxiosTypes('FETCH_CHANGES')],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.FETCH_CHANGES_PENDING:
        return {
          ...state,
          status: { ...state.status, [types.FETCH_CHANGES]: statuses.LOADING },
          error: { ...state.error, [types.FETCH_CHANGES]: undefined }
        };
      case types.FETCH_CHANGES_FULFILLED:
        return {
          ...state,
          entities: action.payload.data,
          status: { ...state.status, [types.FETCH_CHANGES]: statuses.READY }
        };
      case types.FETCH_CHANGES_REJECTED:
        return {
          ...state,
          entities: action.payload.data,
          status: { ...state.status, [types.FETCH_CHANGES]: statuses.ERROR },
          error: { ...state.error, [types.FETCH_CHANGES]: makeError(action.type, action.payload) }
        };
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    fetchChanges: (oldVersion, newVersion, count) => ({
      type: types.FETCH_CHANGES,
      payload: axios.get(`${apiPath}${path}?oldversion=${oldVersion}&newversion=${newVersion}&` + countParam(count))
    })
  }),
  // parent initialState is overwritten, so define all needed here
  initialState:
    () => ({
      status: {},
      error: {},
      entities: [],
    })
});

export default versionDiffDuck;
