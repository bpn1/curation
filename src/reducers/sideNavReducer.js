import { SIDENAV_TOGGLED } from '../actions/index';

export default function(state = true, action) {
    switch(action.type) {
        case SIDENAV_TOGGLED:
        return !state;
    }
    return state;
}
