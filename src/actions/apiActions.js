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
import {
  FETCH_SUBJECTS, FETCH_SUBJECTS_FULFILLED, FETCH_SUBJECTS_REJECTED,
  FETCH_SUBJECT, FETCH_SUBJECT_FULFILLED, FETCH_SUBJECT_REJECTED,
  ADD_SUBJECT, ADD_SUBJECT_FULFILLED, ADD_SUBJECT_REJECTED,
  UPDATE_SUBJECT, UPDATE_SUBJECT_FULFILLED, UPDATE_SUBJECT_REJECTED,
  DELETE_SUBJECT, DELETE_SUBJECT_FULFILLED, DELETE_SUBJECT_REJECTED,
  FETCH_BLOCKING_STATS, FETCH_BLOCKING_STATS_FULFILLED, FETCH_BLOCKING_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS, FETCH_SIM_MEASURE_STATS_FULFILLED, FETCH_SIM_MEASURE_STATS_REJECTED,
  FETCH_SIM_MEASURE_STATS_DATA_FULFILLED, FETCH_SIM_MEASURE_STATS_DATA_REJECTED, FETCH_SIM_MEASURE_STATS_DATA,
  FETCH_BLOCKING_STATS_DATA_FULFILLED, FETCH_BLOCKING_STATS_DATA, FETCH_BLOCKING_STATS_DATA_REJECTED,
  FETCH_CLASSIFIER_STATS, FETCH_CLASSIFIER_STATS_FULFILLED, FETCH_CLASSIFIER_STATS_REJECTED,
  FETCH_CLASSIFIER_STATS_DATA, FETCH_CLASSIFIER_STATS_DATA_FULFILLED, FETCH_CLASSIFIER_STATS_DATA_REJECTED
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
    axios.get(apiPath + 'blockingstats?noData&count=200')
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
    axios.get(apiPath + 'simstats?noData&count=200')
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

export function fetchClassifierStatsIds() {
  return function (dispatch) {
    dispatch({ type: FETCH_CLASSIFIER_STATS });
    axios.get(apiPath + 'wiki/classifierstats?noData&count=200')
      .then((response) => {
        dispatch({ type: FETCH_CLASSIFIER_STATS_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CLASSIFIER_STATS_REJECTED, payload: err });
      });
  };
}

export function fetchClassifierData(primaryKeys) {
  return function (dispatch) {
    dispatch({ type: FETCH_CLASSIFIER_STATS_DATA });
    axios.get(apiPath + 'wiki/classifierstats/' + primaryKeys.join('/'))
      .then((response) => {
        dispatch({ type: FETCH_CLASSIFIER_STATS_DATA_FULFILLED, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CLASSIFIER_STATS_DATA_REJECTED, payload: err });
      });
  };
}

export const fetchStatsActions = {
  fetchSimMeasureStatsIds,
  fetchSimMeasureData,
  fetchBlockingStatsIds,
  fetchBlockingStatsData,
  fetchClassifierStatsIds,
  fetchClassifierData
};
