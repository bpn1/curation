import axios from 'axios';
import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED,
  ADD_SUBJECT, ADD_SUBJECT_FULFILLED, ADD_SUBJECT_REJECTED,
  UPDATE_SUBJECT, UPDATE_SUBJECT_FULFILLED, UPDATE_SUBJECT_REJECTED,
  DELETE_SUBJECT, DELETE_SUBJECT_FULFILLED, DELETE_SUBJECT_REJECTED,
  FETCH_DEDUPLICATION_STATS, FETCH_DEDUPLICATION_STATS_FULFILLED, FETCH_DEDUPLICATION_STATS_REJECTED
} from '../constants/ActionTypes';

const apiPath = '/api/';

export function fetchSubjects() {
  return function (dispatch) {
    dispatch({ type: FETCH_SUBJECTS });
    axios.get(apiPath + 'subjects')
      .then((response) => {
        dispatch({ type: FETCH_SUBJECTS_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SUBJECTS_REJECTED, payload: err });
      });
  };
}

export function addSubject(subject) {
  return function (dispatch) {
    dispatch({ type: ADD_SUBJECT });
    axios.post(apiPath + 'subjects', subject)
      .then((response) => {
        dispatch({ type: ADD_SUBJECT_FULFILLED, payload: subject });
      })
      .catch((err) => {
        dispatch({ type: ADD_SUBJECT_REJECTED, payload: err });
      });
  };
}

export function updateSubject(subject) {
  return function (dispatch) {
    dispatch({ type: UPDATE_SUBJECT });
    axios.put(apiPath + 'subjects/' + subject.id, subject)
      .then((response) => {
        dispatch({ type: UPDATE_SUBJECT_FULFILLED, payload: subject });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_SUBJECT_REJECTED, payload: err });
      });
  };
}

export function deleteSubject(id) {
  return function (dispatch) {
    dispatch({ type: DELETE_SUBJECT });
    axios.put(apiPath + 'subjects/' + id)
      .then((response) => {
        dispatch({ type: DELETE_SUBJECT_FULFILLED, payload: id });
      })
      .catch((err) => {
        dispatch({ type: DELETE_SUBJECT_REJECTED, payload: err });
      });
  };
}
export function fetchDeduplicationStats() {
  return function (dispatch) {
    dispatch({ type: FETCH_DEDUPLICATION_STATS });
    axios.get(apiPath + 'deduplicationstats')
      .then((response) => {
        dispatch({ type: FETCH_DEDUPLICATION_STATS_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_DEDUPLICATION_STATS_REJECTED, payload: err });
      });
  };
}
