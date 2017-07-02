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
