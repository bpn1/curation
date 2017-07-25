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
  DETAILNAV_TOGGLED, DETAILBAR_OPENED, DETAILBAR_CLOSED, DETAILNAV_UPDATE_CONTENT
} from '../constants/ActionTypes';

export default function(state = {
  isOpen: false,
  content: null,
  editorType: null,
  editorValue: null
}, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case DETAILNAV_TOGGLED:
      newState.isOpen = !state.isOpen;
      break;
    case DETAILBAR_OPENED:
      newState.editorType = action.payload.editorType;
      newState.editorValue = action.payload.editorValue;
      newState.isOpen = true;
      break;
    case DETAILBAR_CLOSED:
      newState.isOpen = false;
      break;
    case DETAILNAV_UPDATE_CONTENT:
      newState.content = action.payload;
      break;
    default:
      break;
  }

  return newState;
}
