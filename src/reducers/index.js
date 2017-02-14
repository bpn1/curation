import { combineReducers } from 'redux';
import SideNavReducer from './sideNavReducer';

const rootReducer = combineReducers({
  showSideNav: SideNavReducer,
});

export default rootReducer;
