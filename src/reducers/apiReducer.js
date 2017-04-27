import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT
} from '../constants/ActionTypes';

export default function reducer(state = {
  subjects: [],
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
    default:
    // do nothing
  }
  return state;
}
