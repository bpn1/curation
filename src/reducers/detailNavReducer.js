import { DETAILNAV_TOGGLED, DETAILNAV_UPDATE_CONTENT } from '../constants/ActionTypes';

export default function(state = {isOpen: false, content: null}, action) {
  switch (action.type) {
    case DETAILNAV_TOGGLED:
      state.isOpen = !state.isOpen;
      break;
    case DETAILNAV_UPDATE_CONTENT:
      state.content = action.payload;
      break;
    default:
      break;
  }

  return state;
}
