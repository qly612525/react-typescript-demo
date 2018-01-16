import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { mapReducer } from './map';
import { requestReducer } from './request';

const rootReducer = combineReducers({
    map: mapReducer,
    video: requestReducer,
});

export default rootReducer;