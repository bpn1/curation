import { SIDENAV_TOGGLED } from '../constants/ActionTypes';

export default function toggleSideNav() {
  return {
    type: SIDENAV_TOGGLED,
    payload: null
  };
}
