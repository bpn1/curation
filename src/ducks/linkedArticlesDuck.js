import axios from 'axios';

import createDuck, { makeAxiosTypes, makeError, apiPath } from './apiDuck';

const routePath = '/wiki/linkedarticles';

export default createDuck({ namespace: 'curation', store: 'wiki', path: routePath }).extend({
  types: [
    ...makeAxiosTypes('GET_TITLES'),
    ...makeAxiosTypes('GET_CONTENT')
  ],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.GET_TITLES_PENDING:
        return { ...state, isLoadingTitles: true };
      case types.GET_TITLES_FULFILLED:
        const titles = action.payload.data.map(obj => obj.title);
        return { ...state, titles, isLoadingTitles: false };
      case types.GET_TITLES_REJECTED:
        return {
          ...state,
          isLoadingTitles: false,
          status: { ...state.status, [types.GET_TITLES]: 'ERROR' },
          error: { ...state.error, [types.GET_TITLES]: makeError(action.type, action.payload) }
        };
      case types.GET_CONTENT_PENDING:
        return { ...state, isLoadingContent: true };
      case types.GET_CONTENT_FULFILLED:
        const data = action.payload.data;
        if (data.hasOwnProperty('length') && data.length >= 1 && data[0].hasOwnProperty('text')) {
          return {
            ...state,
            content: data[0].text,
            status: { ...state.status, [types.GET_CONTENT]: 'ok' },
            error: { ...state.error, [types.GET_CONTENT]: null },
            isLoadingContent: false
          };
        } else {
          const contentErrorText = 'Couldn\'t load article text!';
          return {
            ...state,
            isLoadingContent: false,
            // content: contentErrorText,
            status: { ...state.status, [types.GET_CONTENT]: 'warning' },
            error: { ...state.error, [types.GET_CONTENT]: makeError(action.type, contentErrorText) }
          };
        }
      case types.GET_CONTENT_REJECTED:
        return {
          ...state,
          isLoadingContent: false,
          status: { ...state.status, [types.GET_CONTENT]: 'error' },
          error: { ...state.error, [types.GET_CONTENT]: makeError(action.type, action.payload) }
        };
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    getTitles: () => ({
      type: types.GET_TITLES,
      payload: axios.get(`${apiPath}${routePath}?noData`)
    }),
    getContent: title => ({
      type: types.GET_CONTENT,
      payload: axios.get(`${apiPath}${routePath}?title=${title}`)
    })
  }),
  initialState: () => ({ titles: [], status: {}, error: {}, isLoadingTitles: false, content: 'Select an article...' })
});
