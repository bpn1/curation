import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT,
  FETCH_BLOCKING_STATS, FETCH_BLOCKING_STATS_FULFILLED, FETCH_BLOCKING_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_FULFILLED, FETCH_SIM_MEASURE_STATS, FETCH_SIM_MEASURE_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_DATA, FETCH_SIM_MEASURE_STATS_DATA_FULFILLED, FETCH_SIM_MEASURE_STATS_DATA_REJECTED,
  FETCH_BLOCKING_STATS_DATA, FETCH_BLOCKING_STATS_DATA_REJECTED, FETCH_BLOCKING_STATS_DATA_FULFILLED,
  FETCH_SUBJECT, FETCH_SUBJECT_REJECTED, FETCH_SUBJECT_FULFILLED
} from '../constants/ActionTypes';

export default function reducer(state = {
  subjects: [],
  statsIds: [],
  stats: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_SUBJECTS: {
      return { ...state, fetching: true };
    }
    case FETCH_SUBJECTS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
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
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_SUBJECT_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        subject: action.payload
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
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_BLOCKING_STATS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        statsIds: {
          ...state.statsIds,
          blocking: action.payload
        }
      };
    }
    case FETCH_BLOCKING_STATS_DATA: {
      return { ...state, fetching: true };
    }
    case FETCH_BLOCKING_STATS_DATA_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_BLOCKING_STATS_DATA_FULFILLED: {
      const blockingId = action.payload.jobid;
      const blockingSchemeTag = action.payload.schemetag;
      const blockingData = action.payload.data
        .map(entry => Object.assign(entry, { comparision: entry.numsubjects * entry.numstaging }))
        // TODO make filtering configurable in the interface
        //.filter(entry => entry.numsubjects > 15 && entry.numstaging > 15 /*&& entry.key !== 'undefined'*/)
        .sort((a, b) => (a.numsubjects * a.numstaging > b.numsubjects * b.numstaging) ? -1 : ((b.numsubjects * b.numstaging > a.numsubjects * a.numstaging) ? 1 : 0))
        .slice(-5000);
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
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_SIM_MEASURE_STATS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        statsIds: {
          ...state.statsIds,
          similarity: action.payload
        }
      };
    }
    case FETCH_SIM_MEASURE_STATS_DATA: {
      return { ...state, fetching: true };
    }
    case FETCH_SIM_MEASURE_STATS_DATA_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
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
    default:
    // do nothing
  }
  return state;
}
