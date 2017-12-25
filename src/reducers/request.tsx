import { FetchAction } from '../actions';
import { request } from '../types';
import * as constants from '../constants';
import initState from '../store/initState';

export function requestReducer(state: request = initState.request, action:FetchAction): request {
    switch (action.type) {
        case constants.FETCH_NO:
            return { ...state, editStatus: 'no' };
        case constants.FETCH_REQUEST:
            return { ...state, editStatus: 'loading' };
        case constants.FETCH_SUCCESS:
            return { ...state, editStatus: 'success' };
        case constants.FETCH_ERROR:
            return { ...state, editStatus: 'error' };
        case constants.VIDEO_FETCH_REQUEST:
            return { ...state };
        case constants.VIDEO_FETCH_SUCCESS:
            return { ...state, videos: action.preload, editStatus: 'success' };
        case constants.VIDEO_FETCH_ERROR:
            return { ...state, error: action.error, editStatus: 'error' };    
    }
    return state;
}