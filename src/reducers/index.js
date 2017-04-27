import { combineReducers } from 'redux';
import SideNavReducer from './sideNavReducer';
import ApiReducer from './apiReducer';

const rootReducer = combineReducers({
  showSideNav: SideNavReducer,
  api: ApiReducer
});

export default rootReducer;
