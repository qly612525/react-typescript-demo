import { FetchAction, CurrentAction, VideoClearAction, UpdateAction } from '../actions';
import { video } from '../types';
import * as constants from '../constants';
import initState from '../store/initState';

type ACTION = FetchAction | CurrentAction | VideoClearAction | UpdateAction;

export function requestReducer(state: video = initState.video, action: ACTION): video {
    switch (action.type) {
        case constants.VIDEO_FETCH_REQUEST:
            return { ...state };
        case constants.VIDEO_FETCH_SUCCESS:
            return { ...state, videos: action.preload };
        case constants.VIDEO_FETCH_ERROR:
            return { ...state, error: action.error };    
        case constants.VIDEO_SET_CURRENT:
            return { ...state, current: action.current };    
        case constants.VIDEO_CLEAR:
            return { ...state, videos: null };
    }
    return state;
}