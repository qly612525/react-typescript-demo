import * as constants from '../constants';
import { Dispatch } from 'react-redux';

import { getMarginVideos, updateMarginVideo } from '../api/videos';

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
            .then((videos: any) => dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos.data }))
            .catch((err) => dispatch({ type: constants.VIDEO_FETCH_ERROR, preload: err }));
        // setTimeout(() => { 
        //     const videos = [
        //         {
        //             id: 1,
        //             department_1: "ttt",
        //             department_2: "tyty",
        //             category: "中朝边界",
        //             name: "与欧冠",
        //             type: "云台",
        //             x: 116,
        //             y: 39
        //         }
        //     ];
        //     dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos });
        // }, 500);
    }
}

// 视频异步更新
export interface VideoUpdateRequest {
    type: constants.VIDEO_UPDATE_REQUEST;
}

export interface VideoUpdateSuccess {
    type: constants.VIDEO_UPDATE_SUCCESS;
    preload: Array<any>;
}

export interface VideoUpdateError {
    type: constants.VIDEO_UPDATE_ERROR;
    error: string;
}

export type VideoUpdate = VideoUpdateRequest | VideoUpdateSuccess | VideoUpdateError;
type videoUpdateAction = (info:any) => (dispatch: Dispatch<any>) => void;
export const videoUpdateFn: videoUpdateAction = (info:any) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.VIDEO_UPDATE_REQUEST });
        updateMarginVideo(info)
            .then((result: any) => dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: null }))
            .catch((err) => dispatch({ type: constants.VIDEO_FETCH_ERROR, preload: err }));
    }
}

export interface VideoSetCurrent {
    type: constants.VIDEO_SET_CURRENT;
    current: number;
}

export interface VideoClear {
    type: constants.VIDEO_CLEAR;
}

export function setCurrentFn(num: number) {
    return {
        type: constants.VIDEO_SET_CURRENT,
        current: num
    }
}

export function clearVideosFn() {
    return {
        type: constants.VIDEO_CLEAR
    }
 }