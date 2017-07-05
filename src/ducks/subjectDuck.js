import axios from 'axios';
import createDuck, { apiPath, countParam, makeError, statuses } from './apiDuck';
import { commitExtension } from './commitDuck';

const findByNameExtension = path => ({
  types: ['FIND', 'FIND_PENDING', 'FIND_FULFILLED', 'FIND_REJECTED',
    'GET_BY_ID', 'GET_BY_ID_PENDING', 'GET_BY_ID_FULFILLED', 'GET_BY_ID_REJECTED'],

  // TODO handle status of mutliple actions started simultaneously

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
      payload: axios.get(`${apiPath}${path}?datasource=master&` + countParam(count))
    }),
    getById: id =>
      ({ type: types.GET_BY_ID, payload: axios.get(`${apiPath}${path}?id=${id}&` + countParam(1)) }),
    getSome: ids => ({
      type: types.GET_MULTIPLE,
      payload: axios.all(ids.map(id => axios.get(`${apiPath}${path}?id=${id}&` + countParam(1))))
    }),
  }),
  // parent initialState is overwritten, so define all needed here
  initialState:
    () => ({
      status: {},
      error: {},
      entities: [],
      editableSubjects: {},
      created: {},
      deleted: {},
      updated: {}
    })
});

export const subjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects' })
// extensions overwrite some parent attributes
  .extend(findByNameExtension('/subjects'))
  .extend(commitExtension('/subjects'));
// Only use action creators and use subject reducer for all
export const tempSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_temp' });
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_dbpedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_wikidata' });
