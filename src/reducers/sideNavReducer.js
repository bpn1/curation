import { SIDENAV_TOGGLED } from '../constants/ActionTypes';

export default function (state = true, action) {
  switch (action.type) {
    case SIDENAV_TOGGLED:
      return !state;
    default:
      return state;
  }
}
