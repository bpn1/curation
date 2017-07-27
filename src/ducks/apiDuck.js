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

// use minified version of package, normal import is 500kb big
import Duck from 'extensible-duck/dist/extensible-duck.min';
import axios from 'axios';

export const apiPath = '/api';

export function countParam(count) {
  return count ? `count=${count}` : '';
}

export function makeError(actionType, payload) {
  let error = actionType;
  error = error.replace(/_/g, ' ').toLowerCase(); // spaces to underscore, all lower case
  error = error.charAt(0).toUpperCase() + error.slice(1); // first letter to upper case

  if (payload !== null) {
    error += ' ⇒ ' + payload.toString();
  }

  return error;
}

export const statuses = {
  NEW: 'NEW',
  LOADING: 'LOADING',
  READY: 'READY',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  ERROR: 'ERROR'
};

export function makeAxiosTypes(baseType) {
  return [baseType, baseType + '_PENDING', baseType + '_REJECTED', baseType + '_FULFILLED'];
}

export default function createDuck({ namespace, store, path }) {
  return new Duck({
    namespace,
    store,

    consts: { statuses },
    types: [
      ...makeAxiosTypes('GET'),
      ...makeAxiosTypes('GET_MULTIPLE'),
      ...makeAxiosTypes('FETCH'),
      ...makeAxiosTypes('POST'),
      ...makeAxiosTypes('PATCH')
    ],

    // TODO handle status of multiple actions started simultaneously

    reducer: (state, action, { types }) => {
      switch (action.type) {
        case types.FETCH_PENDING:
          return {
            ...state,
            status: { ...state.status, [types.FETCH]: statuses.LOADING },
            error: { ...state.error, [types.FETCH]: undefined }
          };
        case types.FETCH_FULFILLED:
          return {
            ...state,
            entities: action.payload.data,
            status: { ...state.status, [types.FETCH]: statuses.READY }
          };
        case types.FETCH_REJECTED:
          return {
            ...state,
            entities: action.payload.data,
            status: { ...state.status, [types.FETCH]: statuses.ERROR },
            error: { ...state.error, [types.FETCH]: makeError(action.type, action.payload) }
          };
        case types.GET_PENDING:
          return {
            ...state,
            status: { ...state.status, [types.GET]: statuses.LOADING },
            error: { ...state.error, [types.GET]: undefined }
          };
        case types.GET_FULFILLED:
          return {
            ...state,
            entity: action.payload.data,
            status: { ...state.status, [types.GET]: statuses.READY }
          };
        case types.GET_REJECTED:
          return {
            ...state,
            entities: action.payload.data,
            status: { ...state.status, [types.GET]: statuses.ERROR },
            error: { ...state.error, [types.GET]: makeError(action.type, action.payload) }
          };
        case types.GET_MULTIPLE_PENDING:
          return {
            ...state,
            status: { ...state.status, [types.GET_MULTIPLE]: statuses.LOADING },
            error: { ...state.error, [types.GET_MULTIPLE]: undefined }
          };
        case types.GET_MULTIPLE_FULFILLED:
          return {
            ...state,
            entities: action.payload.data,
            status: { ...state.status, [types.GET_MULTIPLE]: statuses.READY }
          };
        case types.GET_MULTIPLE_REJECTED:
          return {
            ...state,
            entities: action.payload.data,
            status: { ...state.status, [types.GET_MULTIPLE]: statuses.ERROR },
            error: { ...state.error, [types.GET_MULTIPLE]: makeError(action.type, action.payload) }
          };
        case types.POST_PENDING:
          return { ...state, status: { ...state.status, [types.POST]: statuses.SAVING } };
        case types.PATCH_PENDING:
          return { ...state, status: { ...state.status, [types.PATCH]: statuses.SAVING } };
        case types.POST_FULFILLED:
          return { ...state, status: { ...state.status, [types.POST]: statuses.SAVED } };
        case types.PATCH_FULFILLED:
          return { ...state, status: { ...state.status, [types.PATCH]: statuses.SAVED } };
        default:
          return state;
      }
    },

    creators: ({ types }) => ({
      fetch: count => ({
        type: types.FETCH,
        payload: axios.get(`${apiPath}${path}?noHistory&` + countParam(count))
      }),
      get: id => ({ type: types.GET, payload: axios.get(`${apiPath}${path}/${id}?noHistory`) }),
      getSome: (ids, count) => ({
        type: types.GET_MULTIPLE,
        payload: axios.get(`${apiPath}${path}?id=${ids.join(',')}&noHistory&` + countParam(count))
      }),
      post: () => ({ type: types.POST, payload: axios.post(`${apiPath}${path}`, obj) }),
      patch: id => ({ type: types.PATCH, payload: axios.patch(`${apiPath}${path}/${id}`, obj) })
    }),

    initialState: () => ({ status: {}, error: {}, entities: [] })
  });
}
