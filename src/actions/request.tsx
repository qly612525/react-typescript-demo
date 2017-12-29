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
type thunkTestAction = (did: string, body: any, marker: ol.Feature, map:ol.Map) => (dispatch: Dispatch<any>) => void;
export const thunkTestActionFn:thunkTestAction = (did: string, body: any, marker: ol.Feature, map:ol.Map) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({type: constants.FETCH_REQUEST});
        updateVideo(did, body)
            .then(response => {
                const icon = marker.get('markerModifyIcon');
                const style = new ol.style.Style({ image: icon });
                marker.setStyle(style);
                marker.changed();
                map.render();
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
type videoFetchAction = (source: ol.source.Vector, map: ol.Map, collection: ol.Collection<ol.Feature>) => (dispatch: Dispatch<any>) => void;

export const videoFetchFn: videoFetchAction = (source: ol.source.Vector, map: ol.Map, collection: ol.Collection<ol.Feature>) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.VIDEO_FETCH_REQUEST });
        setTimeout(() => {
            const response = {
                data: [
                    { id: '1', name: '1', address: '1', o_x: '116.56', o_y: '39.5', is_modify: false },         
                    { id: '2', name: '2', address: '2', o_x: '116.86', o_y: '39.5', is_modify: false }
                ]
            };
            const videos = getVideos(response.data);
            source.addFeatures(videos);
            collection.push(videos[0]);
            map.render();
            dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos });
        },2000);
    }
}