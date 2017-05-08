import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT,
  FETCH_DEDUPLICATION_STATS, FETCH_DEDUPLICATION_STATS_FULFILLED, FETCH_DEDUPLICATION_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_FULFILLED, FETCH_SIM_MEASURE_STATS, FETCH_SIM_MEASURE_STATS_REJECTED
} from '../constants/ActionTypes';

export default function reducer(state = {
  subjects: [],
  deduplicationStats: [],
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
        subjects: action.payload,
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
    case FETCH_DEDUPLICATION_STATS: {
      return { ...state, fetching: true };
    }
    case FETCH_DEDUPLICATION_STATS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_DEDUPLICATION_STATS_FULFILLED: {
      console.time('Parsing deduplicationStats');

      const stats = action.payload.map(entry => entry.mapKeys((key) => {
        if (entry.hasOwnProperty(key)) {
          return { blockName: key, blockSize: entry[key] };
        }
        return { error: 'error' };
      }).filter(entry => !entry.hasOwnProperty('error')));

      console.time('Done parsing deduplicationStats');

      return {
        ...state,
        fetching: false,
        fetched: true,
        deduplicationStats: stats
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
        typeFetched: 'simstats',
        simstats: action.payload[0].data // TODO load all stats
      };
    }
    default:
    // do nothing
  }
  return state;
}
