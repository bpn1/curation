import axios from 'axios';
import createDuck, { apiPath, makeError, makeAxiosTypes } from './apiDuck';

function extractSourceAndTarget(fetchedSubjects, sourceKey, targetKey) {
  const sourceSubjects = fetchedSubjects.filter(s => s.id === sourceKey);
  const targetSubjects = fetchedSubjects.filter(s => s.id === targetKey);

  if (!sourceSubjects.length || !targetSubjects.length) {
    console.error('Source or target subject not found!', fetchedSubjects, sourceSubjects, targetSubjects);
    return { source: null, target: null };
  }

  return { source: sourceSubjects[0], target: targetSubjects[0] };
}

function extractRelations(source, target) {
  let forwardRelations = source.relations[target.id];
  let backwardRelations = target.relations[source.id];

  if (!forwardRelations && !backwardRelations) {
    console.error('No relations found for subjects', source, target);
    return { relations: [] };
  }

  if (!forwardRelations) forwardRelations = {};
  if (!backwardRelations) backwardRelations = {};

  const editableForwardRelations = Object.keys(forwardRelations)
    .map(relationType => ({
      type: relationType,
      value: forwardRelations[relationType],
      isForward: true
    }));
  const editableBackwardRelations = Object.keys(backwardRelations)
    .map(relationType => ({
      type: relationType,
      value: backwardRelations[relationType],
      isForward: false
    }));

  const editableRelations = editableForwardRelations.concat(editableBackwardRelations);

  // sort relations alphabetically by type
  return editableRelations.sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });
}

const apiRoute = '/subjects';

export default createDuck({ namespace: 'curation', store: 'graph', path: apiRoute }).extend({
  types: [
    ...makeAxiosTypes('FETCH_RELATIONS'),
    ...makeAxiosTypes('UPDATE_RELATIONS'),
    ...makeAxiosTypes('FETCH_RELATIONS')
  ],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.FETCH_RELATIONS_FULFILLED:
        const source = action.payload[0].data[0];
        const target = action.payload[1].data[0];
        if (!source && !target) {
          return {
            ...state,
            status: { ...state.status, [types.FETCH_RELATIONS]: 'ERROR' },
            error: {
              ...state.error,
              [types.FETCH_RELATIONS]: makeError(action.type, 'Source and target not found')
            }
          };
        }

        const relations = state.relations;
        const extractedRelations = extractRelations(source, target);
        relations[[source.id, target.id]] = extractedRelations;
        console.log('Extracted relations', extractedRelations);
        const subjects = Object.assign({}, state.subjects);
        subjects[source.id] = source;
        subjects[target.id] = target;

        return {
          ...state,
          relations: { ...state.relations, ...relations },
          subjects: { ...state.subjects, ...subjects }
        };
      case types.FETCH_RELATIONS_REJECTED:
        return {
          ...state,
          status: { ...state.status, [types.FETCH_RELATIONS]: 'ERROR' },
          error: { ...state.error, [types.FETCH_RELATIONS]: makeError(action.type, action.payload) }
        };
      case types.UPDATE_RELATIONS_FULFILLED:
        return state; // TODO implement using commit reducer etc.
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    fetchRelations: (sourceKey, targetKey) => ({
      type: types.FETCH_RELATIONS,
      payload: axios.all([
        axios.get(`${apiPath}${apiRoute}?id=${sourceKey}&count=1`),
        axios.get(`${apiPath}${apiRoute}?id=${targetKey}&count=1`)
      ])
    }),
    updateRelations: (data) => {
      console.log('TODO implement updateRelations in graphDuck!');
      console.log('Edge data:', data);
    }
  }),
  initialState: () => ({ relations: {}, subjects: {}, status: {}, error: {} })
});
