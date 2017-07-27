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
import { apiPath, makeError, makeAxiosTypes } from './apiDuck';
import { replaceWithStaged } from './commitDuck';

function extractRelations(source, target) {
  let forwardRelations = source.relations[target.id];
  let backwardRelations = target.relations[source.id];

  if (!forwardRelations && !backwardRelations) {
    return [];
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

const relationExtension = path => ({
  types: [
    ...makeAxiosTypes('FETCH_RELATIONS')
  ],
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.FETCH_RELATIONS_FULFILLED:
        // use staged versions from commitExtension if they exist
        const source = Object.assign({}, replaceWithStaged(action.payload[0].data[0], state.updated, state.created));
        const target = Object.assign({}, replaceWithStaged(action.payload[1].data[0], state.updated, state.created));
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
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    fetchRelations: (sourceKey, targetKey) => ({
      type: types.FETCH_RELATIONS,
      payload: axios.all([
        axios.get(`${apiPath}${path}?id=${sourceKey}&count=1`),
        axios.get(`${apiPath}${path}?id=${targetKey}&count=1`)
      ])
    })
  }),
  initialState: () => ({ relations: {}, subjects: {}, status: {}, error: {} })
});

export default relationExtension;
