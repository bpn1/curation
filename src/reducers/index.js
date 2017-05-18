import { combineReducers } from 'redux';
import FormReducer from 'redux-form/es/reducer';

import SideNavReducer from './sideNavReducer';
import DetailNavReducer from './detailNavReducer';
import ApiReducer from './apiReducer';

const rootReducer = combineReducers({
  showSideNav: SideNavReducer,
  detailNav: DetailNavReducer,
  api: ApiReducer,
  form: FormReducer
});

export default rootReducer;
