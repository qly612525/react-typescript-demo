import { Dispatch } from 'redux';

import * as constants from '../constants';
import { initialize } from '../api/mapInit';
import { getVideos } from '../api/feature';

export interface MapInit {
    type: constants.MAP_INIT;
    map: ol.Map;
    source: ol.source.Vector;
    collection: ol.Collection<ol.Feature>;
}

export function initializeFn() { 
    const { map, source, collection } = initialize();
    return { type: constants.MAP_INIT, map, source, collection };
};

// marker 异步
export interface VideoFetchRequest {
    type: constants.VIDEO_FETCH_REQUEST;
}

export interface VideoFetchSuccess {
    type: constants.VIDEO_FETCH_SUCCESS;
    videos: Array<any>;
}

export interface VideoFetchError {
    type: constants.VIDEO_FETCH_ERROR;
    error: string;
}

export type VideoFetch = VideoFetchRequest | VideoFetchSuccess | VideoFetchError;
type videoFetchAction = () => (dispatch: Dispatch<any>) => void;

export const getVideosFn: videoFetchAction = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.VIDEO_FETCH_REQUEST });
        setTimeout(() => {
            const data = [];
            for (let i = 0; i < 8; i++){
                let is_modify = false;
                if (i === 0) is_modify = true;
                data.push({ id: i.toString(), name: i.toString(), o_x: 116 + Math.random(), o_y: 38 + Math.random(), n_x: 115.78, n_y: 38 + Math.random(), is_modify: is_modify });
            }
            const response = {
                data: data
            };
            const videos = getVideos(response.data);
            dispatch({ type: constants.VIDEO_FETCH_SUCCESS, preload: videos });
        }, 2000);
    }
}