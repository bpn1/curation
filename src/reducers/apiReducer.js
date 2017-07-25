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

import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT,
  FETCH_BLOCKING_STATS, FETCH_BLOCKING_STATS_FULFILLED, FETCH_BLOCKING_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_FULFILLED, FETCH_SIM_MEASURE_STATS, FETCH_SIM_MEASURE_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_DATA, FETCH_SIM_MEASURE_STATS_DATA_FULFILLED, FETCH_SIM_MEASURE_STATS_DATA_REJECTED,
  FETCH_BLOCKING_STATS_DATA, FETCH_BLOCKING_STATS_DATA_REJECTED, FETCH_BLOCKING_STATS_DATA_FULFILLED,
  FETCH_SUBJECT, FETCH_SUBJECT_REJECTED, FETCH_SUBJECT_FULFILLED, FETCH_CLASSIFIER_STATS,
  FETCH_CLASSIFIER_STATS_REJECTED, FETCH_CLASSIFIER_STATS_FULFILLED, FETCH_CLASSIFIER_STATS_DATA,
  FETCH_CLASSIFIER_STATS_DATA_REJECTED, FETCH_CLASSIFIER_STATS_DATA_FULFILLED
} from '../constants/ActionTypes';
import { getMillisecondsFromTimeUUID } from '../helpers/timeUUIDParser';

function makeError(actionType, payload) {
  let error = actionType;
  error = error.replace(/_/g, ' ').toLowerCase();         // spaces to underscore, all lower case
  error = error.charAt(0).toUpperCase() + error.slice(1); // first letter to upper case

  if (payload !== null) {
    error += ' ⇒ ' + payload.toString();
  }

  return error;
}

export default function reducer(state = {
  subjects: [],
  statsIds: {},
  stats: {},
  xAxis: {},
  yAxis: {},
  fetching: false,
  fetched: false,
  status: 'ok',
  error: '',
  subject: null,
  editableSubjects: {}
}, action) {
  switch (action.type) {
    case FETCH_SUBJECTS: {
      return { ...state, fetching: true };
    }
    case FETCH_SUBJECTS_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_SUBJECTS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        subjects: action.payload
      };
    }
    case FETCH_SUBJECT: {
      return { ...state, fetching: true };
    }
    case FETCH_SUBJECT_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_SUBJECT_FULFILLED: {
      if (action.payload && action.payload.hasOwnProperty('length')) {
        return {
          ...state,
          fetching: false,
          fetched: false,
          subject: null,
          error: 'Server returned a string in API reducer (Action: ' + action.type + ')!',
          status: 'warning'
        };
      }

      // transform fetched subject to the SubjectEditor format
      const transformedSubject = action.payload;
      const newProps = [];

      if (transformedSubject.hasOwnProperty('properties')) {
        Object.keys(transformedSubject.properties).map((key) => {
          newProps.push({
            name: key,
            value: transformedSubject.properties[key].join('; ') // TODO display differently?
          });
        });
      }

      transformedSubject.properties = newProps;
      console.log('Editable subject', transformedSubject);

      const editableSubjects = Object.assign({}, state.editableSubjects);
      editableSubjects[transformedSubject.id] = transformedSubject;

      return {
        ...state,
        fetching: false,
        fetched: true,
        subject: action.payload,
        editableSubjects: editableSubjects
      };
    }
    case ADD_SUBJECT: {
      return {
        ...state,
        subjects: [...state.subjects, action.payload]
      };
    }
    case UPDATE_SUBJECT: {
      const { id } = action.payload;
      const newSubjects = [...state.subjects];
      const subjectToUpdate = newSubjects.findIndex(subject => subject.id === id);
      newSubjects[subjectToUpdate] = action.payload;

      return {
        ...state,
        subjects: newSubjects
      };
    }
    case DELETE_SUBJECT: {
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== action.payload)
      };
    }
    case FETCH_BLOCKING_STATS: {
      return { ...state, fetching: true };
    }
    case FETCH_BLOCKING_STATS_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_BLOCKING_STATS_FULFILLED: {
      const xAxis = [];
      const yAxis = [];
      action.payload.forEach((entry) => {
        xAxis[entry.jobid + '+' + entry.schemetag] = entry.xaxis;
        yAxis[entry.jobid + '+' + entry.schemetag] = entry.yaxis;
      });
      return {
        ...state,
        fetching: false,
        fetched: true,
        statsIds: {
          ...state.statsIds,
          blocking: action.payload.sort((a, b) => getMillisecondsFromTimeUUID(b.jobid) - getMillisecondsFromTimeUUID(a.jobid))
        },
        xAxis: { ...state.xAxis, blocking: xAxis },
        yAxis: { ...state.yAxis, blocking: yAxis },
      };
    }
    case FETCH_BLOCKING_STATS_DATA: {
      return { ...state, fetching: true };
    }
    case FETCH_BLOCKING_STATS_DATA_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_BLOCKING_STATS_DATA_FULFILLED: {
      const blockingId = action.payload.jobid;
      const blockingSchemeTag = action.payload.schemetag;
      const blockingData = action.payload.data
        .map(entry => Object.assign(entry, { comparisons: entry.numsubjects * entry.numstaging }))
        .sort((a, b) => b.comparisons - a.comparisons);
      return {
        ...state,
        fetching: false,
        fetched: true,
        stats: {
          ...state.stats,
          blocking: {
            ...state.stats.blocking,
            [blockingId + '+' + blockingSchemeTag]: blockingData
          }
        }
      };
    }
    case FETCH_SIM_MEASURE_STATS: {
      return { ...state, fetching: true };
    }
    case FETCH_SIM_MEASURE_STATS_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_SIM_MEASURE_STATS_FULFILLED: {
      const xAxis = [];
      const yAxis = [];
      action.payload.forEach((entry) => {
        xAxis[entry.id] = entry.xaxis;
        yAxis[entry.id] = entry.yaxis;
      });
      return {
        ...state,
        fetching: false,
        fetched: true,
        statsIds: {
          ...state.statsIds,
          similarity: action.payload.sort((a, b) => getMillisecondsFromTimeUUID(b.id) - getMillisecondsFromTimeUUID(a.id))
        },
        xAxis: { ...state.xAxis, similarity: xAxis },
        yAxis: { ...state.yAxis, similarity: yAxis },
      };
    }
    case FETCH_SIM_MEASURE_STATS_DATA: {
      return { ...state, fetching: true };
    }
    case FETCH_SIM_MEASURE_STATS_DATA_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_SIM_MEASURE_STATS_DATA_FULFILLED: {
      const similarityId = action.payload.id;
      const similarityData = action.payload.data
        .sort((a, b) => (a.threshold > b.threshold) ? 1 : ((b.threshold > a.threshold) ? -1 : 0));
      return {
        ...state,
        fetching: false,
        fetched: true,
        stats: {
          ...state.stats,
          similarity: {
            ...state.stats.similarity,
            [similarityId]: similarityData
          }
        }
      };
    }
    case FETCH_CLASSIFIER_STATS: {
      return { ...state, fetching: true };
    }
    case FETCH_CLASSIFIER_STATS_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_CLASSIFIER_STATS_FULFILLED: {
      const xAxis = [];
      const yAxis = [];
      action.payload.forEach((entry) => {
        xAxis[entry.id] = entry.xaxis;
        yAxis[entry.id] = entry.yaxis;
      });
      return {
        ...state,
        fetching: false,
        fetched: true,
        statsIds: {
          ...state.statsIds,
          classifier: action.payload.sort((a, b) => getMillisecondsFromTimeUUID(b.id) - getMillisecondsFromTimeUUID(a.id))
        },
        xAxis: { ...state.xAxis, classifier: xAxis },
        yAxis: { ...state.yAxis, classifier: yAxis },
      };
    }
    case FETCH_CLASSIFIER_STATS_DATA: {
      return { ...state, fetching: true };
    }
    case FETCH_CLASSIFIER_STATS_DATA_REJECTED: {
      return { ...state, fetching: false, status: 'error', error: makeError(action.type, action.payload) };
    }
    case FETCH_CLASSIFIER_STATS_DATA_FULFILLED: {
      const classifierId = action.payload.id;
      const classifierData = action.payload.data
        .sort((a, b) => (a.threshold > b.threshold) ? 1 : ((b.threshold > a.threshold) ? -1 : 0));
      return {
        ...state,
        fetching: false,
        fetched: true,
        stats: {
          ...state.stats,
          classifier: {
            ...state.stats.classifier,
            [classifierId]: classifierData
          }
        }
      };
    }
    default: break;
  }

  return state;
}
