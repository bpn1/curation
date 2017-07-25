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
import createDuck, { apiPath, countParam, statuses } from './apiDuck';

export default createDuck({ namespace: 'curation', store: 'duplicates', path: '/duplicates' }).extend({
  types: ['STORE', 'FIND', 'FIND_PENDING', 'FIND_FULFILLED', 'FIND_REJECTED'],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.FIND_PENDING:
        return {
          ...state,
          status: { ...state.status, [types.FIND]: statuses.LOADING },
          error: { ...state.error, [types.FIND]: undefined }
        };
      case types.FIND_FULFILLED:
        return {
          ...state,
          entities: action.payload.data,
          status: { ...state.status, [types.FIND]: statuses.READY }
        };
      case types.FIND_REJECTED:
        return {
          ...state,
          entities: action.payload.data,
          status: { ...state.status, [types.FIND]: statuses.ERROR },
          error: { ...state.error, [types.FIND]: makeError(action.type, action.payload) }
        };
      case types.STORE:
        return { ...state, store: { ...state.store, ...action.payload } };
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    store: objects => ({ type: types.STORE, payload: objects }),
    findByName: (name, count) =>
      ({ type: types.FIND,
        payload: axios.get(`${apiPath}/duplicates?subject_name=${name}&` + countParam(count)) }),
  }),
  initialState: () => ({ store: {} })
});
