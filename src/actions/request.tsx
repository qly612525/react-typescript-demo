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