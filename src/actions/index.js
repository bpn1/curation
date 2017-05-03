import { SIDENAV_TOGGLED, DETAILNAV_TOGGLED, DETAILNAV_UPDATE_CONTENT } from '../constants/ActionTypes';

export default function toggleSideNav() {
  return {
    type: SIDENAV_TOGGLED,
    payload: null
  };
}

export function toggleDetailNav() {
  return {
    type: DETAILNAV_TOGGLED,
    payload: null
  };
}

export function updateDetailNavContent(content) {
  return {
    type: DETAILNAV_UPDATE_CONTENT,
    payload: content
  }
}
