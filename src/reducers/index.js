import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import SideNavReducer from './sideNavReducer';
import DetailNavReducer from './detailNavReducer';
import ApiReducer from './apiReducer';
import duckReducers from '../ducks/reducers';

const rootReducer = combineReducers({
  showSideNav: SideNavReducer,
  detailNav: DetailNavReducer,
  api: ApiReducer,
  form: FormReducer,
  ...duckReducers
});

export default rootReducer;
