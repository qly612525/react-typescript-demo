import { FetchAction } from '../actions';
import { request } from '../types';
import * as constants from '../constants';
import initState from '../store/initState';

export function requestReducer(state: request = initState.request, action:FetchAction): request {
    switch (action.type) {
        case constants.FETCH_NO:
            return { ...state, status: 'no' };
        case constants.FETCH_REQUEST:
            return { ...state, status: 'loading' };
        case constants.FETCH_SUCCESS:
            return { ...state, status: 'success' };
        case constants.FETCH_ERROR:
            return { ...state, status: 'error' };
        case constants.VIDEO_FETCH_REQUEST:
            return { ...state };
        case constants.VIDEO_FETCH_SUCCESS:
            return { ...state, videos: action.preload, status: 'success' };
        case constants.VIDEO_FETCH_ERROR:
            return { ...state, error: action.error, status: 'error' };    
    }
    return state;
}