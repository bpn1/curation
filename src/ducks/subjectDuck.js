import axios from 'axios';
import createDuck, { apiPath, countParam, makeError, statuses } from './apiDuck';
import { commitExtension } from './commitDuck';

const findByNameExtension = (path) => ({
  types: ['FIND', 'FIND_PENDING', 'FIND_FULFILLED', 'FIND_REJECTED'],

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
      default:
        return state;
    }
  },

  creators: ({ types }) => ({
    findByName: (name, count) =>
      ({ type: types.FIND, payload: axios.get(`${apiPath}${path}?name=${name}&` + countParam(count)) })
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
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_dpbedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_wikidata' });
