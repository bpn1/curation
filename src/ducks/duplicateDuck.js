import createDuck from './apiDuck';

export default createDuck({ namespace: 'curation', store: 'duplicates', path: '/duplicates' }).extend({
  types: ['STORE'],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.STORE:
        return { ...state, store: { ...state.store, ...action.payload } };
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    store: objects => ({ type: types.STORE, payload: objects }),
  }),
  initialState: () => ({ store: {} })
});
