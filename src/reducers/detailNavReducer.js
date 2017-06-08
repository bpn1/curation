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
