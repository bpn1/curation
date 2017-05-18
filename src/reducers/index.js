import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

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
