import { combineReducers } from 'redux';
import { mapReducer } from './map';
import { requestReducer } from './request';

const rootReducer = combineReducers({
    map: mapReducer,
    request: requestReducer,
});

export default rootReducer;