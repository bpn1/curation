import { combineReducers } from 'redux';

import SideNavReducer from './sideNavReducer';
import DetailNavReducer from './detailNavReducer';
import ApiReducer from './apiReducer';

const rootReducer = combineReducers({
  showSideNav: SideNavReducer,
  detailNav: DetailNavReducer,
  api: ApiReducer
});

export default rootReducer;
