import { combineReducers } from 'redux';
import SideNavReducer from './sideNavReducer';
import user from './userReducer';


const rootReducer = combineReducers({
    showSideNav: SideNavReducer
});

export default rootReducer
