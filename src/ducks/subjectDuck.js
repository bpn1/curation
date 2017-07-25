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
import createDuck, { apiPath, countParam, makeError, statuses } from './apiDuck';
import { commitExtension } from './commitDuck';
import graphExtension from './graphExtension';

const findByNameExtension = path => ({
  types: ['FIND', 'FIND_PENDING', 'FIND_FULFILLED', 'FIND_REJECTED',
    'GET_BY_ID', 'GET_BY_ID_PENDING', 'GET_BY_ID_FULFILLED', 'GET_BY_ID_REJECTED'],

  // TODO handle status of multiple actions started simultaneously

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
      case types.GET_BY_ID_PENDING:
        return {
          ...state,
          status: { ...state.status, [types.GET_BY_ID]: statuses.LOADING },
          error: { ...state.error, [types.GET_BY_ID]: undefined }
        };
      case types.GET_BY_ID_FULFILLED:
        return {
          ...state,
          entity: action.payload.data[0],
          status: { ...state.status, [types.GET_BY_ID]: statuses.READY }
        };
      case types.GET_BY_ID_REJECTED:
        return {
          ...state,
          entities: action.payload.data,
          status: { ...state.status, [types.GET_BY_ID]: statuses.ERROR },
          error: { ...state.error, [types.GET_BY_ID]: makeError(action.type, action.payload) }
        };
      case types.GET_MULTIPLE_FULFILLED:
        let fetchedData = action.payload;
        if (!(fetchedData instanceof Array)) {
          fetchedData = [fetchedData];
        }
        // concat entities fetched with axios.all
        const fetchedEntities = fetchedData
          .filter((payload) => {
            if (payload && payload.data && payload.data[0] === undefined) {
              console.warn(payload.config.url.split('=')[1].replace('&count', '') + ' was not found');
            }
            return payload.data[0] !== undefined;
          })
          .map(payload => payload.data[0]);
        return {
          ...state,
          entities: fetchedEntities,
          status: { ...state.status, [types.GET_MULTIPLE]: statuses.READY }
        };
      case types.GET_MULTIPLE_REJECTED:
        return {
          ...state,
          status: { ...state.status, [types.GET_MULTIPLE]: statuses.ERROR },
          error: { ...state.error, [types.GET_MULTIPLE]: makeError(action.type, action.payload) }
        };
      default:
        return state;
    }
  },

  creators: ({ types }) => ({
    findByName: (name, count) =>
      ({ type: types.FIND,
        payload: axios.get(`${apiPath}${path}?noHistory&name=${name}&` + countParam(count)) }),
    fetchOnlyMaster: count => ({
      type: types.FETCH,
      payload: axios.get(`${apiPath}${path}?noHistory&datasource=master&` + countParam(count))
    }),
    getById: id =>
      ({ type: types.GET_BY_ID, payload: axios.get(`${apiPath}${path}?noHistory&id=${id}&` + countParam(1)) }),
    getSome: ids => ({
      type: types.GET_MULTIPLE,
      payload: axios.all(ids.map(id => axios.get(`${apiPath}${path}?noHistory&id=${id}&` + countParam(1))))
    }),
  }),
  // parent initialState is overwritten, so define all needed here
  initialState:
    () => ({
      status: {},
      error: {},
      entities: [],
      editableSubjects: {},
      relations: {},
      created: {},
      deleted: {},
      updated: {}
    })
});

export const subjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects' })
// extensions overwrite some parent attributes
  .extend(findByNameExtension('/subjects'))
  .extend(graphExtension('/subjects'))
  .extend(commitExtension('/subjects'));
// Only use action creators and use subject reducer for all
export const tempSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_temp' });
export const graphSubjects = createDuck({ namespace: 'curation', store: 'graphSubject', path: '/subjects' })
  .extend(findByNameExtension('/subjects'));
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_dbpedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_wikidata' });
