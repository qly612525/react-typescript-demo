import * as constants from '../constants';
import { Dispatch } from 'react-redux';

import { getMarginVideos } from '../api/videos';

// marker 异步
export interface VideoFetchRequest {
    type: constants.VIDEO_FETCH_REQUEST;
}

export interface VideoFetchSuccess {
    type: constants.VIDEO_FETCH_SUCCESS;
    preload: Array<any>;
}

export interface VideoFetchError {
    type: constants.VIDEO_FETCH_ERROR;
    error: string;
}

export type VideoFetch = VideoFetchRequest | VideoFetchSuccess | VideoFetchError;
type videoFetchAction = () => (dispatch: Dispatch<any>) => void;

export const videoFetchFn: videoFetchAction = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.VIDEO_FETCH_REQUEST });
        getMarginVideos()
            .then((videos: any) => dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos })).catch((err) => dispatch({ type: constants.VIDEO_FETCH_ERROR, preload: err }));
    }
}