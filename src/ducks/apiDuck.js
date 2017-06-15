import axios from 'axios';
// use minified version of package, normal import is 500kb big
import Duck from 'extensible-duck/dist/extensible-duck.min';

export const apiPath = '/api';

function countParam(count) {
  return count ? `count=${count}` : '';
}

export function makeError(actionType, payload) {
  let error = actionType;
  error = error.replace(/_/g, ' ').toLowerCase();         // spaces to underscore, all lower case
  error = error.charAt(0).toUpperCase() + error.slice(1); // first letter to upper case

  if (payload !== null) {
    error += ' ⇒ ' + payload.toString();
  }

  return error;
}

export const statuses = ['NEW', 'LOADING', 'READY', 'SAVING', 'SAVED', 'ERROR'];

export default function createDuck({ namespace, store, path, initialState = {} }) {
  return new Duck({
    namespace,
    store,

    consts: { statuses },
    types: [
      'GET', 'GET_PENDING', 'GET_FULFILLED', 'GET_REJECTED',
      'GET_MULTIPLE', 'GET_MULTIPLE_PENDING', 'GET_MULTIPLE_FULFILLED', 'GET_MULTIPLE_REJECTED',
      'FETCH', 'FETCH_PENDING', 'FETCH_FULFILLED', 'FETCH_REJECTED',
      'POST', 'POST_PENDING', 'POST_FULFILLED', 'POST_REJECTED',
      'PATCH', 'PATCH_PENDING', 'PATCH_FULFILLED', 'PATCH_REJECTED',
    ],

    // TODO handle status of mutliple actions started simultaniously

    reducer: (state, action, { types, statuses, initialState }) => {
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
        payload: axios.get(`${apiPath}${path}?` + countParam(count))
      }),
      get: id => ({ type: types.GET, payload: axios.get(`${apiPath}${path}/${id}`) }),
      getSome: (ids, count) => ({
        type: types.GET_MULTIPLE,
        payload: axios.get(`${apiPath}${path}?id=${ids.join(',')}&` + countParam(count))
      }),
      post: () => ({ type: types.POST, payload: axios.post(`${apiPath}${path}`, obj) }),
      patch: id => ({ type: types.PATCH, payload: axios.patch(`${apiPath}${path}/${id}`, obj) })
    }),

    initialState:
      ({ statuses }) => ({ status: {}, error: {}, entities: [] })
  });
}
