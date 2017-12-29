import { FetchAction } from '../actions';
import { request } from '../types';
import * as constants from '../constants';
import initState from '../store/initState';

export function requestReducer(state: request = initState.request, action:FetchAction): request {
    switch (action.type) {
        case constants.VIDEO_FETCH_REQUEST:
            return { ...state };
        case constants.VIDEO_FETCH_SUCCESS:
            return { ...state, videos: action.preload };
        case constants.VIDEO_FETCH_ERROR:
            return { ...state, error: action.error };    
    }
    return state;
}