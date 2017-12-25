import * as constants from '../constants';
import * as axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { getVideosData, updateVideo, getVideos } from '../api/feature';
import * as ol from 'openlayers';

// 异步
export interface FetchNo {
    type: constants.FETCH_NO;
}

export interface FetchRequest {
    type: constants.FETCH_REQUEST;
}

export interface FetchSuccess {
    type: constants.FETCH_SUCCESS;
}

export interface FetchError {
    type: constants.FETCH_ERROR;
}

export type Fetch = FetchNo | FetchRequest | FetchSuccess | FetchError;
type thunkTestAction = (did: string, body: any) => (dispatch: Dispatch<any>) => void;
export const thunkTestActionFn:thunkTestAction = (did: string, body: any) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({type: constants.FETCH_REQUEST});
        updateVideo(did, body)
            .then(response => {
                dispatch({ type: constants.FETCH_SUCCESS, preload: response.data, isModify: true });
            })
            .catch(err => {
                dispatch({ type: constants.FETCH_ERROR, error: err, isModify: true });
            });
    }
}

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
type videoFetchAction = (source: ol.source.Vector) => (dispatch: Dispatch<any>) => void;

export const videoFetchFn: videoFetchAction = (source: ol.source.Vector) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.VIDEO_FETCH_REQUEST });
        getVideosData()
            .then(response => {
                const videos = getVideos(response.data);
                source.addFeatures(videos);
                source.changed();
                dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos });
            })
            .catch(err => {
                dispatch({ type: constants.VIDEO_FETCH_ERROR, error: err.toString() });
            });
    }
}