import axios from 'axios';
import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED,
  FETCH_SUBJECT, FETCH_SUBJECT_FULFILLED, FETCH_SUBJECT_REJECTED,
  ADD_SUBJECT, ADD_SUBJECT_FULFILLED, ADD_SUBJECT_REJECTED,
  UPDATE_SUBJECT, UPDATE_SUBJECT_FULFILLED, UPDATE_SUBJECT_REJECTED,
  DELETE_SUBJECT, DELETE_SUBJECT_FULFILLED, DELETE_SUBJECT_REJECTED,
  FETCH_BLOCKING_STATS, FETCH_BLOCKING_STATS_FULFILLED, FETCH_BLOCKING_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS, FETCH_SIM_MEASURE_STATS_FULFILLED, FETCH_SIM_MEASURE_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_DATA_FULFILLED, FETCH_SIM_MEASURE_STATS_DATA_REJECTED, FETCH_SIM_MEASURE_STATS_DATA,
  FETCH_BLOCKING_STATS_DATA_FULFILLED, FETCH_BLOCKING_STATS_DATA, FETCH_BLOCKING_STATS_DATA_REJECTED
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

export function fetchSubject(id) {
  return function (dispatch) {
    dispatch({ type: FETCH_SUBJECT });
    axios.get(apiPath + 'subjects/' + id)
      .then((response) => {
        dispatch({ type: FETCH_SUBJECT_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SUBJECT_REJECTED, payload: err });
      });
  };
}

export function addSubject(subject) {
  return function (dispatch) {
    dispatch({ type: ADD_SUBJECT, payload: subject });
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
    dispatch({ type: UPDATE_SUBJECT, payload: subject });
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
    dispatch({ type: DELETE_SUBJECT, payload: id });
    axios.put(apiPath + 'subjects/' + id)
      .then((response) => {
        dispatch({ type: DELETE_SUBJECT_FULFILLED, payload: id });
      })
      .catch((err) => {
        dispatch({ type: DELETE_SUBJECT_REJECTED, payload: err });
      });
  };
}


export function fetchBlockingStatsIds() {
  return function (dispatch) {
    dispatch({ type: FETCH_BLOCKING_STATS });
    axios.get(apiPath + 'blockingstats?noData')
      .then((response) => {
        dispatch({ type: FETCH_BLOCKING_STATS_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_BLOCKING_STATS_REJECTED, payload: err });
      });
  };
}

export function fetchBlockingStatsData(primaryKeys) {
  return function (dispatch) {
    dispatch({ type: FETCH_BLOCKING_STATS_DATA });
    axios.get(apiPath + 'blockingstats/' + primaryKeys.join('/'))
      .then((response) => {
        dispatch({ type: FETCH_BLOCKING_STATS_DATA_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_BLOCKING_STATS_DATA_REJECTED, payload: err });
      });
  };
}

export function fetchSimMeasureStatsIds() {
  return function (dispatch) {
    dispatch({ type: FETCH_SIM_MEASURE_STATS });
    axios.get(apiPath + 'simstats?noData')
      .then((response) => {
        dispatch({ type: FETCH_SIM_MEASURE_STATS_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SIM_MEASURE_STATS_REJECTED, payload: err });
      });
  };
}

export function fetchSimMeasureData(primaryKeys) {
  return function (dispatch) {
    dispatch({ type: FETCH_SIM_MEASURE_STATS_DATA });
    axios.get(apiPath + 'simstats/' + primaryKeys.join('/'))
      .then((response) => {
        dispatch({ type: FETCH_SIM_MEASURE_STATS_DATA_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SIM_MEASURE_STATS_DATA_REJECTED, payload: err });
      });
  };
}

export const fetchStatsActions = {
  fetchSimMeasureStatsIds, fetchSimMeasureData, fetchBlockingStatsIds, fetchBlockingStatsData
};
